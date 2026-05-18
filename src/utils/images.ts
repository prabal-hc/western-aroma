/**
 * Image optimization utilities
 * Helpers for lazy loading, responsive images, and performance
 */

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  loading?: "lazy" | "eager";
}

/**
 * Get optimized image URL with quality parameter
 */
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  quality: number = 80,
): string {
  try {
    const urlObj = new URL(url);

    // For Google Images, add quality parameter
    if (urlObj.hostname.includes("googleusercontent.com")) {
      urlObj.searchParams.set("w", width?.toString() || "800");
      urlObj.searchParams.set("q", quality.toString());
    }

    // For Unsplash, add optimization
    if (urlObj.hostname.includes("unsplash.com")) {
      urlObj.searchParams.set("q", quality.toString());
      if (width) urlObj.searchParams.set("w", width.toString());
    }

    return urlObj.toString();
  } catch {
    return url;
  }
}

/**
 * Get srcSet for responsive images
 */
export function getImageSrcSet(
  url: string,
  sizes: number[] = [400, 800, 1200],
): string {
  return sizes
    .map((size) => `${getOptimizedImageUrl(url, size)} ${size}w`)
    .join(", ");
}

/**
 * Generate lazy loading image config
 */
export function getLazyImageConfig(config: ImageConfig): ImageConfig {
  return {
    ...config,
    loading: "lazy",
  };
}
