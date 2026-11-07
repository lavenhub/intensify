import { useEffect } from "react";
import { site } from "@/data/site";

type SeoProps = {
  title: string;
  description?: string;
  /** Path only, e.g. "/products". Used to build the canonical URL. */
  path?: string;
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Lightweight per-page document head manager (no extra dependencies). */
export function Seo({ title, description, path = "/" }: SeoProps) {
  useEffect(() => {
    const fullTitle =
      title === site.name ? title : `${title} — ${site.name}`;
    const desc = description ?? site.description;
    const url = `${site.url}${path}`;

    document.title = fullTitle;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setCanonical(url);
  }, [title, description, path]);

  return null;
}
