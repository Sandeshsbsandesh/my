import { copyFileSync, cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs"

if (!existsSync("dist")) {
  throw new Error("dist is missing. Run the Vite build first.")
}

copyFileSync("dist/index.html", "dist/404.html")

const origin = String(process.env.VITE_SITE_URL || process.env.CF_PAGES_URL || "").replace(/\/$/, "")
const base = String(process.env.BASE_PATH || "/").replace(/\/$/, "")
if (origin) {
  const root = `${origin}${base}`
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = [
    { path: "/", priority: "1.0" },
    { path: "/work", priority: "0.9" },
    { path: "/start", priority: "0.8" },
  ]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) =>
      `  <url><loc>${root}${item.path}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${item.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`
  writeFileSync("dist/sitemap.xml", body)
  const robotsPath = "dist/robots.txt"
  if (existsSync(robotsPath)) {
    const robots = readFileSync(robotsPath, "utf8")
    if (!robots.includes("Sitemap:")) {
      writeFileSync(robotsPath, `${robots.trim()}\n\nSitemap: ${root}/sitemap.xml\n`)
    }
  }
}

if (existsSync("out")) rmSync("out", { recursive: true })
cpSync("dist", "out", { recursive: true })
