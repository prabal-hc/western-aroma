/**
 * SEO Metadata utilities
 * Helpers for dynamic meta tags and structured data
 */

export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
}

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(metadata: SEOMetadata): string {
  return `
    <meta name="title" content="${metadata.title}" />
    <meta name="description" content="${metadata.description}" />
    <meta property="og:type" content="${metadata.type || "website"}" />
    <meta property="og:title" content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    ${metadata.image ? `<meta property="og:image" content="${metadata.image}" />` : ""}
    ${metadata.url ? `<meta property="og:url" content="${metadata.url}" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${metadata.title}" />
    <meta name="twitter:description" content="${metadata.description}" />
    ${metadata.image ? `<meta name="twitter:image" content="${metadata.image}" />` : ""}
  `;
}

/**
 * Generate JSON-LD structured data for SEO
 */
export function generateStructuredData(type: string, data: unknown): string {
  return `
    <script type="application/ld+json">
      ${JSON.stringify(data)}
    </script>
  `;
}

/**
 * Page metadata for different sections
 */
export const PAGE_METADATA = {
  home: {
    title: "Western Aroma - Premium Coffee & Spices",
    description:
      "Discover premium coffee and spices sourced directly from our heritage estate in Kerala, India.",
    type: "website" as const,
  },
  coffee: {
    title: "Premium Coffee Selection - Western Aroma",
    description:
      "Crafted from the finest estates, our coffee collection brings the rich heritage of Indian coffee to your cup.",
    type: "product" as const,
  },
  spices: {
    title: "King of Spices - Western Aroma",
    description:
      "Finest whole spices sourced from the heartland of Indian spice cultivation. Each spice carries centuries of flavor heritage.",
    type: "product" as const,
  },
  estate: {
    title: "Our Estate Heritage - Western Aroma",
    description:
      "Discover our commitment to sustainable farming and heritage cultivation practices spanning over 150 years.",
    type: "article" as const,
  },
  stories: {
    title: "Our Stories - Western Aroma",
    description:
      "Behind every cup and spice blend are stories of passion, heritage, and dedication.",
    type: "article" as const,
  },
};
