import { useEffect } from "react"
import { publicUrl } from "../lib/publicUrl"
import { HOME_TITLE, SEO_KEYWORDS, absoluteUrl } from "../data/seo"

type SeoProps = {
  title: string
  description: string
  path: string
  jsonLd?: unknown
  index?: boolean
}

function upsertMeta(kind: "name" | "property", key: string, content: string) {
  const selector = `meta[${kind}="${key}"]`
  let node = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!node) {
    node = document.createElement("meta")
    node.setAttribute(kind, key)
    document.head.appendChild(node)
  }
  node.content = content
}

function upsertLink(rel: string, href: string) {
  let node = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!node) {
    node = document.createElement("link")
    node.rel = rel
    document.head.appendChild(node)
  }
  node.href = href
}

function upsertJsonLd(data: unknown) {
  const id = "zebriyo-jsonld"
  let node = document.getElementById(id) as HTMLScriptElement | null
  if (!data) {
    node?.remove()
    return
  }
  if (!node) {
    node = document.createElement("script")
    node.id = id
    node.type = "application/ld+json"
    document.head.appendChild(node)
  }
  node.text = JSON.stringify(data)
}

export function Seo({ title, description, path, jsonLd, index = true }: SeoProps) {
  const packed = JSON.stringify(jsonLd ?? null)

  useEffect(() => {
    const url = absoluteUrl(path)
    const image = absoluteUrl(publicUrl("og.png"))
    document.title = title
    document.documentElement.lang = "en-IN"
    upsertMeta("name", "description", description)
    upsertMeta("name", "keywords", SEO_KEYWORDS.join(", "))
    upsertMeta("name", "author", "Zebriyo")
    upsertMeta(
      "name",
      "robots",
      index
        ? "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        : "noindex,follow",
    )
    upsertMeta("name", "googlebot", index ? "index,follow" : "noindex,follow")
    if (index) upsertLink("canonical", url)
    upsertMeta("property", "og:site_name", "Zebriyo")
    upsertMeta("property", "og:locale", "en_IN")
    upsertMeta("property", "og:type", "website")
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:url", url)
    upsertMeta("property", "og:image", image)
    upsertMeta("property", "og:image:alt", HOME_TITLE)
    upsertMeta("name", "twitter:card", "summary_large_image")
    upsertMeta("name", "twitter:title", title)
    upsertMeta("name", "twitter:description", description)
    upsertMeta("name", "twitter:image", image)
    upsertJsonLd(jsonLd)
  }, [title, description, path, packed, jsonLd, index])

  return null
}
