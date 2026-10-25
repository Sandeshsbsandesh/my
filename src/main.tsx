import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource/outfit/latin-400.css"
import "@fontsource/outfit/latin-500.css"
import "@fontsource/outfit/latin-600.css"
import "@fontsource/fraunces/latin-400.css"
import "@fontsource/fraunces/latin-500.css"
import "@fontsource/fraunces/latin-400-italic.css"
import "@fontsource/fraunces/latin-500-italic.css"
import "lenis/dist/lenis.css"
import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
