import { useEffect } from 'react';

export const SITE_URL = 'https://www.growthai.kr';
export const SITE_NAME = 'GrowthAI';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/ceo-photo-smooth.png`;

type SeoProps = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  robots?: string;
  noindex?: boolean;
  locale?: string;
  siteName?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

function normalizeUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"][data-seo-managed="true"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, key);
  el.setAttribute('content', content);
  return el;
}

function upsertLink(rel: string, href: string) {
  const selector = `link[rel="${rel}"][data-seo-managed="true"]`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(el);
  }
  el.rel = rel;
  el.href = href;
  return el;
}

function upsertScript(id: string, schema: Record<string, unknown> | Array<Record<string, unknown>>) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    el.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema);
  return el;
}

export function Seo({
  title,
  description,
  canonical,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords,
  robots,
  noindex = false,
  locale = 'ko_KR',
  siteName = SITE_NAME,
  schema,
}: SeoProps) {
  useEffect(() => {
    const canonicalUrl = normalizeUrl(canonical ?? '/');
    const imageUrl = normalizeUrl(image);
    const robotsContent =
      robots ?? (noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');

    document.title = title;

    upsertLink('canonical', canonicalUrl);
    upsertMeta('name', 'description', description);
    if (keywords?.length) upsertMeta('name', 'keywords', keywords.join(', '));
    upsertMeta('name', 'robots', robotsContent);
    upsertMeta('name', 'author', siteName);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:alt', title);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', siteName);
    upsertMeta('property', 'og:locale', locale);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    if (schema) {
      upsertScript('seo-jsonld', schema);
    } else {
      document.getElementById('seo-jsonld')?.remove();
    }
  }, [title, description, canonical, image, type, keywords, robots, noindex, locale, siteName, schema]);

  return null;
}
