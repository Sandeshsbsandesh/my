import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { previewMailPlugin } from "./server/vite-preview-api.mjs"

const base = process.env.BASE_PATH || "/"

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), previewMailPlugin()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 700,
  },
})
