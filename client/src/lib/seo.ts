/**
 * useSEO — Dynamic per-page SEO meta tag manager
 * Sets <title>, <meta description>, canonical, Open Graph, Twitter Card,
 * and injects JSON-LD structured data into the document head.
 *
 * Usage:
 *   useSEO({ title: "...", description: "...", schema: {...} });
 */

import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  /** JSON-LD structured data object(s) */
  schema?: Record<string, unknown> | Record<string, unknown>[];
  keywords?: string;
}

const SITE_NAME = "Shiva Group Events";
const BASE_URL = "https://www.shivagroupevents.in";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

function setMeta(property: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const SCHEMA_SCRIPT_ID = "sge-json-ld";

function setSchema(schema: Record<string, unknown> | Record<string, unknown>[]) {
  let el = document.getElementById(SCHEMA_SCRIPT_ID) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = SCHEMA_SCRIPT_ID;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(Array.isArray(schema) ? schema : [schema]);
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schema,
  keywords,
}: SEOProps) {
  useEffect(() => {
    // Page title
    document.title = `${title} | ${SITE_NAME}`;

    // Core meta
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);

    // Canonical
    const canonicalHref = canonical ? `${BASE_URL}${canonical}` : window.location.href.split("?")[0];
    setLink("canonical", canonicalHref);

    // Open Graph
    setMeta("og:title", `${title} | ${SITE_NAME}`, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:url", canonicalHref, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:locale", "en_IN", "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", `${title} | ${SITE_NAME}`);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Robots
    setMeta("robots", "index, follow");

    // JSON-LD schema
    if (schema) {
      setSchema(schema as Record<string, unknown> | Record<string, unknown>[]);
    }
  }, [title, description, canonical, ogImage, ogType, keywords]);
}

/** Reusable schema fragments */
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shiva Group Events",
  alternateName: ["Shiva Group Events Meerut", "SGE Events"],
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/opengraph.jpg`,
  description:
    "Premier luxury event management company in Meerut, North India. Specializing in weddings, corporate events, celebrity shows, concerts, and more since 2012.",
  foundingDate: "2012",
  founder: {
    "@type": "Person",
    name: "Rajeev Gupta",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Meerut",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-98970-15153",
      contactType: "customer service",
      availableLanguage: ["Hindi", "English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-92197-08567",
      contactType: "customer service",
      availableLanguage: ["Hindi", "English"],
    },
  ],
  sameAs: [
    "https://www.instagram.com/shivagroupevents",
    "https://www.facebook.com/shivagroupevents",
    "https://www.youtube.com/@shivagroupevents",
  ],
  areaServed: [
    "Meerut", "Delhi", "Noida", "Greater Noida", "Ghaziabad",
    "Gurugram", "Faridabad", "Jaipur", "Chandigarh", "Dehradun",
  ],
};

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "EventVenueOperator",
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Shiva Group Events",
  url: BASE_URL,
  telephone: "+91-98970-15153",
  image: `${BASE_URL}/opengraph.jpg`,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Top-rated luxury event management company in Meerut. Expert wedding planners, corporate event organizers, celebrity show managers across North India since 2012.",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Meerut",
    addressLocality: "Meerut",
    addressRegion: "Uttar Pradesh",
    postalCode: "250001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.9845,
    longitude: 77.7064,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "21:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "850",
    bestRating: "5",
  },
  hasMap: "https://maps.google.com/?q=Meerut,Uttar+Pradesh,India",
};

export function serviceSchema(name: string, description: string, url: string, category: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${BASE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: "Shiva Group Events",
      url: BASE_URL,
    },
    serviceType: category,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "North India",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}
