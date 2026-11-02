import { copyFileSync, cpSync, existsSync, rmSync } from "node:fs"

if (!existsSync("dist")) {
  throw new Error("dist is missing. Run the Vite build first.")
}

copyFileSync("dist/index.html", "dist/404.html")

// Sitemap + robots stay as static files from /public (hardcoded https://zebriyo.com).
// Do not rewrite them from CF_PAGES_URL — Google rejects *.pages.dev on the zebriyo.com property.

if (existsSync("out")) rmSync("out", { recursive: true })
cpSync("dist", "out", { recursive: true })
