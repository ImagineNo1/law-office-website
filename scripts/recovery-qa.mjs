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
  "/admin/requests",
  "/admin/legal-forms",
  "/admin/faqs",
  "/dashboard",
  "/dashboard/documents",
  "/dashboard/signatures",
];

const viewports = [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "tablet", width: 834, height: 1100 },
  { name: "mobile", width: 390, height: 1100 },
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

const outDir = path.join(process.cwd(), ".playwright-cli", "recovery");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch(executablePath ? { executablePath } : undefined);
const results = [];

async function readEnvSecret() {
  try {
    const env = await readFile(path.join(process.cwd(), ".env"), "utf8");
    const match = env.match(/^JWT_SECRET=(.+)$/m);
    return match?.[1]?.trim().replace(/^["']|["']$/g, "");
  } catch {
    return undefined;
  }
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function createAdminToken(secret) {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64url(JSON.stringify({ sub: "qa-admin", exp: Math.floor(Date.now() / 1000) + 3600 }));
  const signature = crypto.createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${signature}`;
}

const adminToken = createAdminToken((await readEnvSecret()) ?? "development-secret");

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  await context.addCookies([
    {
      name: "admin_token",
      value: adminToken,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    const report = await page.evaluate(() => ({
      dir: document.documentElement.getAttribute("dir"),
      textLength: document.body.textContent?.trim().length ?? 0,
      links: document.querySelectorAll("a").length,
      cards: document.querySelectorAll("[class*='rounded-2xl'],[class*='rounded-[28px]']").length,
      tables: document.querySelectorAll("table").length,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 4,
    }));
    const name = route === "/" ? "home" : route.replaceAll("/", "-").replace(/^-/, "");
    const screenshot = path.join(outDir, `${viewport.name}-${name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    results.push({ route, viewport: viewport.name, screenshot, ...report });
  }
  await context.close();
}

await browser.close();

const failures = results.filter((result) => {
  if (result.dir !== "rtl") return true;
  if (result.textLength < 500) return true;
  if (result.cards < 3) return true;
  if (result.horizontalOverflow) return true;
  if ((result.route.includes("admin/requests") || result.route.includes("documents")) && result.tables < 1) return true;
  return false;
});

const summary = { checked: results.length, failures, results };
await writeFile(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2), "utf8");

if (failures.length) {
  console.error(JSON.stringify(summary, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(summary, null, 2));
