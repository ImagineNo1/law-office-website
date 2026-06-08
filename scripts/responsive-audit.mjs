import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { chromium } from "playwright";

const routes = [
  "/",
  "/services",
  "/services/contract-drafting",
  "/contracts",
  "/legal-forms",
  "/requests/new",
  "/blog",
  "/news",
  "/admin",
  "/admin/requests",
  "/admin/lawyers",
  "/admin/users",
  "/admin/services",
  "/admin/contracts",
  "/admin/seo",
  "/dashboard",
  "/dashboard/requests",
  "/dashboard/contracts",
  "/dashboard/files",
  "/dashboard/messages",
  "/dashboard/profile",
];

const viewports = [
  { name: "xs", width: 320, height: 900 },
  { name: "mobile", width: 390, height: 1000 },
  { name: "large-mobile", width: 480, height: 1000 },
  { name: "tablet", width: 768, height: 1100 },
  { name: "laptop", width: 1024, height: 900 },
  { name: "desktop", width: 1440, height: 1000 },
];

const candidates = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

let executablePath;
for (const candidate of candidates) {
  try {
    await access(candidate);
    executablePath = candidate;
    break;
  } catch {}
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

async function readSecret() {
  try {
    const env = await readFile(path.join(process.cwd(), ".env"), "utf8");
    return env.match(/^JWT_SECRET=(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");
  } catch {
    return undefined;
  }
}

function createToken(secret, body) {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64url(JSON.stringify({ ...body, exp: Math.floor(Date.now() / 1000) + 3600 }));
  const signature = crypto.createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${signature}`;
}

const outDir = path.join(process.cwd(), ".playwright-cli", "responsive-audit");
await mkdir(outDir, { recursive: true });

const secret = (await readSecret()) ?? "development-secret";
const adminToken = createToken(secret, { userId: "qa-admin", email: "qa@example.com", role: "super_admin" });
const clientToken = createToken(secret, { clientId: "qa-client", phone: "09120000000", fullName: "کاربر تست" });
const browser = await chromium.launch(executablePath ? { executablePath } : undefined);
const results = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  await context.addCookies([
    { name: "admin_token", value: adminToken, domain: "localhost", path: "/", httpOnly: true, sameSite: "Lax" },
    { name: "client_token", value: clientToken, domain: "localhost", path: "/", httpOnly: true, sameSite: "Lax" },
  ]);
  const page = await context.newPage();

  for (const route of routes) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    const report = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const offenders = Array.from(document.querySelectorAll("body *"))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || "").trim().slice(0, 80),
            className: String(el.getAttribute("class") || "").slice(0, 120),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            position: style.position,
          };
        })
        .filter((item) => item.width > 0 && (item.right > width + 4 || item.left < -4))
        .slice(0, 12);

      return {
        dir:
          document.documentElement.dir ||
          document.documentElement.getAttribute("dir") ||
          document.body.dir ||
          document.body.getAttribute("dir") ||
          document.querySelector("[dir='rtl']")?.getAttribute("dir") ||
          getComputedStyle(document.documentElement).direction ||
          getComputedStyle(document.body).direction,
        textLength: document.body.textContent?.trim().length ?? 0,
        horizontalOverflow: scrollWidth > width + 4,
        scrollWidth,
        clientWidth: width,
        tables: document.querySelectorAll("table").length,
        offenders,
      };
    });
    results.push({ route, viewport: viewport.name, ...report });
  }
  await context.close();
}

await browser.close();

const failures = results.filter((result) => {
  if (result.textLength < 120) return true;
  if (result.horizontalOverflow) return true;
  return false;
});

const summary = { checked: results.length, failures, results };
await writeFile(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2), "utf8");

if (failures.length) {
  console.error(JSON.stringify({ checked: summary.checked, failures: summary.failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ checked: summary.checked, failures: [] }, null, 2));
