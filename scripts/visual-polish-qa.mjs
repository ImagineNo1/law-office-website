import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { chromium } from "playwright";

const shots = [
  { name: "desktop-home", route: "/", viewport: { width: 1440, height: 1100 } },
  { name: "mobile-home", route: "/", viewport: { width: 390, height: 1100 } },
  { name: "desktop-services", route: "/services", viewport: { width: 1440, height: 1100 } },
  { name: "desktop-service-detail", route: "/services/contract-drafting", viewport: { width: 1440, height: 1100 } },
  { name: "desktop-contracts", route: "/contracts", viewport: { width: 1440, height: 1100 } },
  { name: "desktop-contract-detail", route: "/contracts/ملکی/property-lease", viewport: { width: 1440, height: 1100 } },
  { name: "desktop-admin-requests", route: "/admin/requests", viewport: { width: 1440, height: 1100 } },
  { name: "desktop-dashboard", route: "/dashboard", viewport: { width: 1440, height: 1100 } },
  { name: "desktop-dashboard-documents", route: "/dashboard/documents", viewport: { width: 1440, height: 1100 } },
  { name: "desktop-dashboard-signatures", route: "/dashboard/signatures", viewport: { width: 1440, height: 1100 } },
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

function createAdminToken(secret) {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64url(JSON.stringify({ sub: "visual-polish-admin", exp: Math.floor(Date.now() / 1000) + 3600 }));
  const signature = crypto.createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${signature}`;
}

const outDir = path.join(process.cwd(), ".playwright-cli", "visual-polish");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch(executablePath ? { executablePath } : undefined);
const adminToken = createAdminToken((await readSecret()) ?? "development-secret");
const results = [];

for (const shot of shots) {
  const context = await browser.newContext({ viewport: shot.viewport });
  await context.addCookies([{ name: "admin_token", value: adminToken, domain: "localhost", path: "/", httpOnly: true, sameSite: "Lax" }]);
  const page = await context.newPage();
  await page.goto(`http://localhost:3000${shot.route}`, { waitUntil: "networkidle" });
  const metrics = await page.evaluate(() => ({
    dir: document.documentElement.getAttribute("dir"),
    cards: document.querySelectorAll("[class*='rounded-2xl'],[class*='rounded-[30px]'],[class*='rounded-[28px]']").length,
    tables: document.querySelectorAll("table").length,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 4,
    textLength: document.body.textContent?.trim().length ?? 0,
  }));
  const screenshot = path.join(outDir, `${shot.name}.png`);
  await page.screenshot({ path: screenshot, fullPage: true });
  results.push({ ...shot, screenshot, ...metrics });
  await context.close();
}

await browser.close();

const failures = results.filter((result) => result.dir !== "rtl" || result.cards < 3 || result.horizontalOverflow || result.textLength < 500);
const summary = { checked: results.length, failures, results };
await writeFile(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2), "utf8");

if (failures.length) {
  console.error(JSON.stringify(summary, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(summary, null, 2));
