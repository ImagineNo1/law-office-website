import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const routes = [
  "/dashboard",
  "/dashboard/documents",
  "/dashboard/signatures",
  "/dashboard/templates",
  "/dashboard/contacts",
  "/dashboard/workflows",
  "/dashboard/reports",
];

const viewports = [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "tablet", width: 834, height: 1100 },
  { name: "mobile", width: 390, height: 1100 },
];

const outDir = path.join(process.cwd(), ".playwright-cli", "phase6");
await mkdir(outDir, { recursive: true });

const executableCandidates = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

let executablePath;
for (const candidate of executableCandidates) {
  try {
    await access(candidate);
    executablePath = candidate;
    break;
  } catch {
    // Try the next installed browser candidate.
  }
}

const browser = await chromium.launch(executablePath ? { executablePath } : undefined);
const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  for (const route of routes) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    const report = await page.evaluate(() => {
      const root = document.documentElement;
      const body = document.body;
      const main = document.querySelector("main");
      const tables = document.querySelectorAll("table").length;
      const charts = document.querySelectorAll(".recharts-wrapper svg").length;
      const navLinks = document.querySelectorAll("aside nav a").length;
      const horizontalOverflow = root.scrollWidth > root.clientWidth + 4;
      const mainText = main?.textContent ?? "";
      return {
        dir: root.getAttribute("dir"),
        bodyTextLength: body.textContent?.trim().length ?? 0,
        tables,
        charts,
        navLinks,
        horizontalOverflow,
        hasGold: getComputedStyle(root).getPropertyValue("--gold").trim() === "#c9973f",
        hasWorkflow: mainText.includes("گردش"),
        hasStorage: mainText.includes("ذخیره"),
      };
    });
    const slug = route.replaceAll("/", "-").replace(/^-/, "") || "home";
    const screenshot = path.join(outDir, `${viewport.name}-${slug}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    results.push({ route, viewport: viewport.name, screenshot, ...report });
  }
  await page.close();
}

await browser.close();

const failures = results.filter((result) => {
  if (result.dir !== "rtl") return true;
  if (result.bodyTextLength < 1000) return true;
  if (result.navLinks < 8) return true;
  if (result.horizontalOverflow) return true;
  if (result.route.includes("documents") && result.tables < 1) return true;
  if (result.route.includes("reports") && result.charts < 2) return true;
  if (result.route.includes("workflows") && !result.hasWorkflow) return true;
  return false;
});

const summary = { checked: results.length, failures, results };
await writeFile(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2), "utf8");

if (failures.length) {
  console.error(JSON.stringify(summary, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(summary, null, 2));
