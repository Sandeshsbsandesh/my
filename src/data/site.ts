/** Brand, contact, and marketing copy. Edit this file to change the site. */

export const site = {
  name: "Zebriyo",
  /**
   * Production origin with no trailing slash, e.g. "https://zebriyo.com".
   * Leave empty to use the current host for canonical URLs.
   */
  url: "",
  /**
   * Inbox that receives briefs. When set, the form can open the visitor's email app.
   * Leave empty to offer copy and download only.
   * Example: "hello@yourstudio.com"
   */
  email: "sandeshsb0219@gmail.com",
  /**
   * Country code + number, digits only. Example: "919876543210".
   * Leave empty to hide the WhatsApp link.
   */
  whatsapp: "",
  description:
    "Affordable website maker for business websites, Instagram websites, influencer websites, and portfolios.",
}

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
]

export const footerNav = [
  { label: "Work", href: "/work" },
  { label: "Who it’s for", href: "/#make" },
  { label: "The first 24 hours", href: "/#prototype" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
]

export const footerServices = [
  { label: "Affordable website maker", href: "/#make" },
  { label: "Business websites", href: "/work" },
  { label: "Instagram websites", href: "/work?preview=influencer" },
  { label: "Influencer websites", href: "/work?preview=influencer" },
  { label: "Portfolio websites", href: "/work" },
  { label: "Hotel, clinic, shop samples", href: "/work" },
  { label: "CA and CS websites", href: "/#sectors" },
  { label: "NGO, school, college", href: "/#sectors" },
  { label: "Animated websites", href: "/#make" },
]

export const promises = [
  {
    index: "01",
    title: "Ready in 24 hours",
    text: "You see a working preview the day after you send your details.",
  },
  {
    index: "02",
    title: "No calls needed",
    text: "Share your changes by email or WhatsApp.",
  },
  {
    index: "03",
    title: "One fixed price",
    text: "Care starts at ₹1,999 a month. A new site is a separate fixed quote, shown before you pay.",
  },
]

export const prototypeNeeds = [
  "What your website should do (sell, get enquiries, show your work)",
  "The pages you want",
  "Your logo, photos and links, if you have them",
]

export const projectTypes = [
  {
    id: "creator",
    label: "Creator or influencer",
    detail: "A portfolio for a channel, page, or personal brand.",
  },
  {
    id: "startup",
    label: "Startup",
    detail: "A product site or company site for something new.",
  },
  {
    id: "business",
    label: "Business",
    detail: "A site for a studio, shop, practice, or operating business.",
  },
  {
    id: "landing",
    label: "Landing page",
    detail: "One page for an offer, launch, or campaign.",
  },
  {
    id: "revamp",
    label: "Revamp",
    detail: "Replace a website that already exists.",
  },
] as const

export type ProjectType = (typeof projectTypes)[number]["id"]

export function isProjectType(value: unknown): value is ProjectType {
  return typeof value === "string" && projectTypes.some((item) => item.id === value)
}

export type MockName = "creator" | "startup" | "business" | "landing" | "revamp"

export const works: Array<{
  id: ProjectType
  index: string
  title: string
  summary: string
  detail: string
  points: string[]
  mock: MockName
}> = [
  {
    id: "creator",
    index: "01",
    title: "Creator portfolios",
    summary: "For YouTubers, artists, writers",
    detail:
      "Instagram websites and creator portfolios for people who have outgrown a link-in-bio page. The sample has four pages: reels and a YouTube preview, views, sponsored work, and contact.",
    points: ["Reels, a review, and a YouTube preview", "Instagram and YouTube views", "Brand sponsored", "Contact"],
    mock: "creator",
  },
  {
    id: "startup",
    index: "02",
    title: "Startup sites",
    summary: "For new products and teams",
    detail:
      "For new companies that need a home for the product. Visitors should understand what it is, who it is for, and what to do next without a sales call.",
    points: ["A clear offer", "Who it is for", "Product proof in the layout", "One next step"],
    mock: "startup",
  },
  {
    id: "business",
    index: "03",
    title: "Business websites",
    summary: "For shops, clinics, services",
    detail:
      "Business websites for shops, clinics, hotels, and services that need more than a brochure. The site explains the work and lets a visitor enquire or book without hunting for a phone number.",
    points: ["Services", "Location and hours", "WhatsApp or a form", "A page for each core offer"],
    mock: "business",
  },
  {
    id: "landing",
    index: "04",
    title: "Landing pages",
    summary: "One page for one offer",
    detail:
      "For a single offer that does not need a whole website around it. The page states the point, answers the obvious questions, and asks for one action.",
    points: ["One offer", "Short supporting points", "A single call to action", "Mobile-first layout"],
    mock: "landing",
  },
  {
    id: "revamp",
    index: "05",
    title: "Website revamps",
    summary: "Your site, but better",
    detail:
      "For businesses whose current site no longer fits. We prototype the new first screen before taking the old one apart, and keep the pages that still bring people in.",
    points: ["Review of the current site", "A prototype of the new direction", "Redesigned key pages", "Guidance on what to keep"],
    mock: "revamp",
  },
]

export const processSteps = [
  {
    index: "01",
    title: "Send your requirements",
    text: "One form asks what the site is for, which pages you want, any links you already have, and how we should reply.",
  },
  {
    index: "02",
    title: "A first look in 24 hours",
    text: "The next day you get a link to the main page. Open it on your phone or laptop and click through it when you have time.",
  },
  {
    index: "03",
    title: "Changes by message",
    text: "Tell us what to change by email or WhatsApp. We update the page from that. We call only if you ask.",
  },
  {
    index: "04",
    title: "Your site goes live",
    text: "We finish the other pages, connect the tools you asked for, and publish the site on your web address.",
  },
]

export const integrations = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    text: "Click-to-chat for visitors who will not fill in a form.",
  },
  {
    id: "payments",
    label: "Payments",
    text: "A gateway for deposits, bookings, or a simple checkout.",
  },
  {
    id: "booking",
    label: "Booking",
    text: "A form or scheduler so people can request a time.",
  },
  {
    id: "analytics",
    label: "Analytics",
    text: "A clear view of what visitors actually do.",
  },
  {
    id: "api",
    label: "Other tools",
    text: "A connection to a third-party service you already use.",
  },
] as const

const rupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export function formatRupees(amount: number) {
  return rupee.format(amount)
}

export const pricingGroups = [
  {
    id: "once",
    label: "One-Time Packages",
    summary: "Own your website project with a one-time development payment.",
    cta: "Get My Preview",
    starting: true,
    plans: [
      {
        id: "basic",
        name: "Basic",
        amount: 9999,
        popular: false,
        includes: [
          "1–3 pages",
          "Clean, mobile-responsive design",
          "Contact form and social links",
          "Basic SEO setup",
          "1 revision round",
          "Initial preview within 24 hours",
        ],
      },
      {
        id: "upscale",
        name: "Upscale",
        amount: 14999,
        popular: true,
        includes: [
          "4–6 pages",
          "Custom UI/UX design",
          "Scroll animations and polished interactions",
          "WhatsApp, Instagram, or YouTube, where it fits",
          "Enquiry forms",
          "Appointment booking, other booking, or add to cart",
          "Payment gateway. The amount is credited directly to your bank.",
          "Basic SEO and analytics setup",
          "2 revision rounds",
          "Initial preview within 24 hours",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        amount: 24999,
        popular: false,
        includes: [
          "7–10 pages, or a custom scope",
          "Bespoke design",
          "Advanced animations and interactions",
          "Appointment booking, other booking, or add to cart",
          "Payment gateway. The amount is credited directly to your bank.",
          "Advanced SEO: pages are set up so search engines can find and rank them.",
          "GEO, generative engine optimization: written so AI tools can cite the site.",
          "AEO, answer engine optimization: structured so answer engines can quote a direct reply.",
          "WhatsApp alerts when someone enquires or books.",
          "Lead generation from visitors on the site.",
          "CMS or a blog, where it applies",
          "Performance optimization",
          "3 revision rounds",
          "Priority support during development",
        ],
      },
    ],
  },
  {
    id: "month",
    label: "Monthly Plans",
    summary: "Keep your website updated, maintained, and running smoothly with ongoing support.",
    cta: "Choose Monthly Plan",
    starting: false,
    plans: [
      {
        id: "starter-care",
        name: "Starter Care",
        amount: 1999,
        popular: false,
        includes: [
          "Hosting and uptime checks",
          "Basic backups and monitoring",
          "Up to 30 minutes of small content updates a month",
          "Technical support",
        ],
      },
      {
        id: "growth-care",
        name: "Growth Care",
        amount: 2799,
        popular: true,
        includes: [
          "Everything in Starter Care",
          "Up to 2 hours of website updates a month",
          "4–6 pages",
          "Custom UI/UX design",
          "Scroll animations and polished interactions",
          "WhatsApp, Instagram, or YouTube, where it fits",
          "Enquiry forms",
          "Appointment booking, other booking, or add to cart",
          "Payment gateway. The amount is credited directly to your bank.",
          "Basic SEO and analytics setup",
          "Monthly website and contact-form checks",
          "Basic performance monitoring",
          "Priority support",
        ],
      },
      {
        id: "business-plus",
        name: "Business Plus",
        amount: 4999,
        popular: false,
        includes: [
          "Everything in Growth Care",
          "Up to 5 hours of updates and small improvements a month",
          "Appointment booking, other booking, or add to cart",
          "Payment gateway. The amount is credited directly to your bank.",
          "Advanced SEO: pages are set up so search engines can find and rank them.",
          "GEO, generative engine optimization: written so AI tools can cite the site.",
          "AEO, answer engine optimization: structured so answer engines can quote a direct reply.",
          "WhatsApp alerts when someone enquires or books.",
          "Lead generation from visitors on the site.",
          "Landing-page and banner updates",
          "Priority technical support",
        ],
      },
    ],
  },
] as const

export const pricingNotes = [
  "One-time prices are starting prices. The final price follows the agreed scope.",
  "The 24-hour step is the initial preview, not the finished website.",
  "Monthly plans look after a site you already have. A new website is not included.",
  "Domain registration and renewal may be charged separately.",
  "Third-party subscriptions, premium plugins, and paid integrations may cost extra.",
  "Monthly update time resets each billing cycle. Unused time does not roll over.",
  "Major redesigns, new pages beyond the plan, and new features are quoted separately.",
  "Hosting is included only on plans that list it.",
]

export function findPricingPlan(id: string | null) {
  if (!id) return undefined
  for (const group of pricingGroups) {
    const plan = group.plans.find((item) => item.id === id)
    if (plan) return { plan, group }
  }
  return undefined
}

export const faqs = [
  {
    q: "What actually happens in the first 24 hours?",
    a: "Zebriyo reads your details and designs a preview of the main page you can click through. You get a link the next day and look at it in your own time. That is a preview, not the finished website.",
  },
  {
    q: "How much does a website cost?",
    a: "Zebriyo website care starts at ₹1,999 a month. A new Basic website starts at ₹9,999 one-time. Upscale is ₹14,999. Premium is ₹24,999. The price is fixed before you pay.",
  },
  {
    q: "Is Zebriyo a cheap website maker?",
    a: "Zebriyo is an affordable website maker, not a free builder. If you are comparing cheap website makers, Starter Care is ₹1,999 a month and a new Basic site is ₹9,999. The preview still has to look like a real business.",
  },
  {
    q: "Who is the best website maker for a small business?",
    a: "The best website maker is the one that ships a clear site you can afford and change. Zebriyo is built for small business websites, Instagram websites, influencer websites, and portfolios: a 24-hour preview, fixed prices, and care from ₹1,999 a month.",
  },
  {
    q: "Can you make a business website?",
    a: "Yes. Zebriyo makes business websites for shops, clinics, hotels, studios, and services. The site lists what you do, where you are, and how to enquire or book.",
  },
  {
    q: "Can you make an Instagram website?",
    a: "Yes. Zebriyo is an Instagram website maker for creators who have outgrown a link-in-bio page. The site can hold your work, views, brand deals, and a contact path that is yours.",
  },
  {
    q: "Do influencers need a website?",
    a: "An influencer website is the page you own when Instagram changes. Brands, bookings, and media kits live there. Zebriyo makes influencer websites and creator portfolios without a long agency process.",
  },
  {
    q: "Can you make a portfolio website?",
    a: "Yes. Zebriyo is a portfolio maker for photographers, designers, writers, and creators. You get a clean portfolio website for the work, plus a way for people to contact you.",
  },
  {
    q: "Do we need to get on calls?",
    a: "No. You send your details once. If something is missing, we ask by email or WhatsApp. A call only happens if you request one.",
  },
  {
    q: "What do you need from me?",
    a: "The goal of the site, the pages you have in mind, and any links, logos, or photos you already have. Rough notes are enough. You do not need a finished script.",
  },
  {
    q: "Can you add WhatsApp, payments, booking, or analytics?",
    a: "Yes. Name them in your details. Common connections are WhatsApp chat, a payment gateway, a booking form, analytics, and other tools you already use. The quote lists what is included.",
  },
  {
    q: "Can you rebuild a site we already have?",
    a: "Yes. Send the current address and what is no longer working. We prototype the new direction before taking the old site apart.",
  },
  {
    q: "Who is this for?",
    a: "Creators, influencers, startups, and businesses that want a professional site without a long agency process. If you need a large web application or months of custom software, we are the wrong studio.",
  },
  {
    q: "Can you make a CA or CS website?",
    a: "Yes. Zebriyo makes CA websites for chartered accountants and CS websites for company secretaries. The site can list services, the team, and a way for clients to enquire.",
  },
  {
    q: "Do you make hotel websites?",
    a: "Yes. Zebriyo makes hotel websites with rooms, stay dates, and book now. There is a sample hotel layout on the work page. It is a sample, not a client project.",
  },
  {
    q: "Can you make an NGO website?",
    a: "Yes. Zebriyo is an NGO website maker for organisations that need the mission, programmes, donate or volunteer, and contact on a phone-friendly site.",
  },
  {
    q: "Do you make school and college websites?",
    a: "Yes. Zebriyo makes school websites and college websites for admissions, notices, courses, and parent or student enquiries.",
  },
  {
    q: "Can you make a clinic website?",
    a: "Yes. Zebriyo makes clinic websites with services, doctors, and book appointment. There is a sample clinic layout on the work page. It is a sample, not a client project.",
  },
  {
    q: "Do you make animated or the best looking websites?",
    a: "Zebriyo designs animated, best-looking websites for people searching for the coolest website without an agency wait. Motion is used where it helps. The 24-hour step is still a preview of the main page, not the finished site.",
  },
  {
    q: "How does pricing work?",
    a: "The plans, including monthly care, are listed under Pricing. The price is fixed before you pay. There is no hourly meter. The 24-hour step is a preview of the main page, not the finished site.",
  },
]

export const pageOptions = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work or portfolio" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
  { id: "booking", label: "Booking" },
  { id: "shop", label: "Shop" },
  { id: "other", label: "Other or not sure" },
]

export const integrationOptions = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "payments", label: "Payment gateway" },
  { id: "booking", label: "Booking" },
  { id: "analytics", label: "Analytics" },
  { id: "form", label: "Contact form" },
  { id: "api", label: "Another tool or API" },
  { id: "unsure", label: "Not sure yet" },
]

export const timingOptions = [
  "As soon as possible",
  "Within two weeks",
  "Within a month",
  "Flexible",
  "I want to see the preview first",
]

export function whatsappHref(text?: string) {
  if (!site.whatsapp) return ""
  const base = `https://wa.me/${site.whatsapp}`
  if (!text) return base
  return `${base}?text=${encodeURIComponent(text)}`
}
