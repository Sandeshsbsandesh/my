import { faqs, formatRupees, pricingGroups, site } from "./site"

export const SEO_KEYWORDS = [
  "affordable website maker",
  "cheap website maker",
  "best website maker",
  "best animated website",
  "best looking websites",
  "coolest website",
  "animated website maker",
  "business website",
  "CA website",
  "chartered accountant website",
  "CS website",
  "company secretary website",
  "startup website",
  "hotel website",
  "hotel website maker",
  "NGO website",
  "NGO website makers",
  "school website",
  "college website",
  "clinic website",
  "Instagram website",
  "influencer website",
  "portfolio maker",
  "website maker India",
]

export const HOME_TITLE = "Affordable Website Maker for Business, Instagram & Portfolios | Zebriyo"
export const HOME_DESCRIPTION =
  "Zebriyo is an affordable website maker for business websites, Instagram websites, influencer websites, and portfolios. Care from ₹1,999/month. Preview in 24 hours."

export const audiences = [
  {
    id: "affordable",
    title: "Affordable website maker",
    text: "From ₹1,999/month.",
  },
  {
    id: "business",
    title: "Business websites",
    text: "Shops, clinics, hotels, studios.",
  },
  {
    id: "instagram",
    title: "Instagram websites",
    text: "More than a link in bio.",
  },
  {
    id: "influencer",
    title: "Influencer websites",
    text: "A site you own.",
  },
  {
    id: "portfolio",
    title: "Portfolio makers",
    text: "The work, then contact.",
  },
  {
    id: "startup",
    title: "Startup websites",
    text: "Product, audience, one next step.",
  },
  {
    id: "landing",
    title: "Landing pages",
    text: "One offer. One action.",
  },
  {
    id: "cheap",
    title: "Cheap website maker",
    text: "Starter Care at ₹1,999/month.",
  },
  {
    id: "animated",
    title: "Animated websites",
    text: "The coolest look, without the wait.",
  },
] as const

export const sectors = [
  {
    id: "ca",
    title: "CA websites",
    text: "Firm, services, enquire.",
  },
  {
    id: "cs",
    title: "CS websites",
    text: "Filings, retainers, contact.",
  },
  {
    id: "startups",
    title: "Startup websites",
    text: "Product and one next step.",
  },
  {
    id: "hotels",
    title: "Hotel websites",
    text: "Rooms and book now.",
    href: "/work?preview=hotel",
  },
  {
    id: "ngo",
    title: "NGO websites",
    text: "Mission, donate, volunteer.",
  },
  {
    id: "school",
    title: "School websites",
    text: "Admissions and notices.",
  },
  {
    id: "college",
    title: "College websites",
    text: "Courses and enquiries.",
  },
  {
    id: "clinic",
    title: "Clinic websites",
    text: "Doctors and book appointment.",
    href: "/work?preview=clinic",
  },
] as const

export const previewSeo: Record<string, { title: string; description: string }> = {
  influencer: {
    title: "Instagram Influencer Website Sample | Zebriyo",
    description: "Sample influencer website by Zebriyo. See how an Instagram creator site can hold work, views, and contact — not a client project.",
  },
  boutique: {
    title: "Boutique Website Sample | Zebriyo",
    description: "Sample clothing boutique website with cart and buy now. An example layout from Zebriyo, not a client project.",
  },
  clinic: {
    title: "Clinic Website Sample | Zebriyo",
    description: "Sample clinic website with appointment booking. An example business website layout from Zebriyo, not a client project.",
  },
  jewellery: {
    title: "Jewellery Shop Website Sample | Zebriyo",
    description: "Sample jewellery shop website with buy now and cart. An example business website from Zebriyo, not a client project.",
  },
  hotel: {
    title: "Hotel Website Sample | Zebriyo",
    description: "Sample hotel website with book now. An example business website layout from Zebriyo, not a client project.",
  },
}

export function siteOrigin() {
  const fromSite = site.url.replace(/\/$/, "")
  if (fromSite) return fromSite
  const fromEnv = String(import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "")
  if (fromEnv) return fromEnv
  if (typeof window !== "undefined") return window.location.origin
  return ""
}

export function absoluteUrl(path: string) {
  const origin = siteOrigin()
  const suffix = path.startsWith("/") ? path : `/${path}`
  return origin ? `${origin}${suffix}` : suffix
}

function offers() {
  return pricingGroups.flatMap((group) =>
    group.plans.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} — ${group.label}`,
      price: plan.amount,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/start"),
      description: `${plan.name} website plan from ${formatRupees(plan.amount)}${group.id === "month" ? " per month" : ""}.`,
    })),
  )
}

export function homeJsonLd() {
  const url = absoluteUrl("/")
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${url}#organization`,
      name: site.name,
      legalName: site.name,
      url,
      logo: absoluteUrl("/zebriyo-logo.png"),
      image: absoluteUrl("/og.png"),
      description: HOME_DESCRIPTION,
      slogan: "Go Beyond. Grow Bigger.",
      email: site.email || undefined,
      areaServed: ["IN", "Worldwide"],
      knowsAbout: [
        "Affordable website maker",
        "Animated websites",
        "Best looking websites",
        "CA websites",
        "CS websites",
        "Startup websites",
        "Hotel websites",
        "NGO websites",
        "School websites",
        "College websites",
        "Clinic websites",
        "Instagram websites",
        "Influencer websites",
        "Portfolio websites",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${url}#service`,
      name: "Zebriyo website maker",
      url,
      image: absoluteUrl("/og.png"),
      description: HOME_DESCRIPTION,
      priceRange: "₹₹",
      areaServed: { "@type": "Country", name: "India" },
      serviceType: [
        "Affordable website maker",
        "Animated website design",
        "CA website design",
        "CS website design",
        "Startup website design",
        "Hotel website design",
        "NGO website design",
        "School website design",
        "College website design",
        "Clinic website design",
        "Instagram website design",
        "Influencer website design",
        "Portfolio website design",
      ],
      brand: { "@id": `${url}#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Zebriyo website plans",
        itemListElement: offers(),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${url}#website`,
      url,
      name: site.name,
      description: HOME_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": `${url}#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ]
}

export function workJsonLd() {
  const url = absoluteUrl("/work")
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Website examples — business, Instagram, influencer, portfolio",
      url,
      description:
        "Sample business websites, Instagram websites, influencer websites, and portfolio websites from Zebriyo. Placeholder layouts, not client projects.",
      isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    },
  ]
}

export function startJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Get a website preview in 24 hours",
      url: absoluteUrl("/start"),
      description:
        "Send your details to Zebriyo, an affordable website maker. You get a working preview of the main page the next day.",
    },
  ]
}
