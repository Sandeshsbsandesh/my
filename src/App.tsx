import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { AboutPage } from "./pages/AboutPage"
import { BestWebsiteMakerPage } from "./pages/BestWebsiteMakerPage"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { PrivacyPage } from "./pages/PrivacyPage"
import { RefundPage } from "./pages/RefundPage"
import { StartPage } from "./pages/StartPage"
import { TermsPage } from "./pages/TermsPage"
import { WorkPage } from "./pages/WorkPage"

const basename = import.meta.env.BASE_URL.replace(/\/$/, "")

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/best-website-maker" element={<BestWebsiteMakerPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
