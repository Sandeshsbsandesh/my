import { copyFileSync, cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs"

if (!existsSync("dist")) {
  throw new Error("dist is missing. Run the Vite build first.")
}

copyFileSync("dist/index.html", "dist/404.html")

// Always use the custom domain for sitemap. CF_PAGES_URL is the *.pages.dev
// preview host and Google Search Console rejects those URLs on zebriyo.com.
const PRODUCTION = "https://zebriyo.com"
const fromEnv = String(process.env.VITE_SITE_URL || "").replace(/\/$/, "")
const origin = fromEnv && !fromEnv.includes("pages.dev") ? fromEnv : PRODUCTION
const base = String(process.env.BASE_PATH || "/").replace(/\/$/, "")
const root = `${origin}${base}`
const lastmod = new Date().toISOString().slice(0, 10)
const urls = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/work", priority: "0.9", changefreq: "weekly" },
  { path: "/start", priority: "0.9", changefreq: "monthly" },
  { path: "/work?preview=influencer", priority: "0.7", changefreq: "monthly" },
  { path: "/work?preview=boutique", priority: "0.7", changefreq: "monthly" },
  { path: "/work?preview=clinic", priority: "0.7", changefreq: "monthly" },
  { path: "/work?preview=jewellery", priority: "0.7", changefreq: "monthly" },
  { path: "/work?preview=hotel", priority: "0.7", changefreq: "monthly" },
]
const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) =>
      `  <url>
    <loc>${root}${item.path === "/" ? "/" : item.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`
writeFileSync("dist/sitemap.xml", body)

const robotsPath = "dist/robots.txt"
if (existsSync(robotsPath)) {
  let robots = readFileSync(robotsPath, "utf8")
  robots = robots.replace(/Sitemap:\s*\S+/gi, "").trimEnd()
  writeFileSync(robotsPath, `${robots}\n\nSitemap: ${root}/sitemap.xml\n`)
}

if (existsSync("out")) rmSync("out", { recursive: true })
cpSync("dist", "out", { recursive: true })
