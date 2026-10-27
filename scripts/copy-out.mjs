import { copyFileSync, cpSync, existsSync, rmSync } from "node:fs"

if (!existsSync("dist")) {
  throw new Error("dist is missing. Run the Vite build first.")
}

copyFileSync("dist/index.html", "dist/404.html")
if (existsSync("out")) rmSync("out", { recursive: true })
cpSync("dist", "out", { recursive: true })
