/**
 * Application Constants
 * Centralized configuration values
 */

// Price and Tax Configuration
export const PRICE_CONFIG = {
  CURRENCY: "₹",
  GST_RATE: 0.18, // 18% GST
  DECIMAL_PLACES: 2,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PRODUCT_PAGE_SIZE: 6,
  STORIES_PAGE_SIZE: 6,
};

// Animation Timings
export const ANIMATION_TIMINGS = {
  FAST: 0.2,
  NORMAL: 0.4,
  SLOW: 0.6,
  VERY_SLOW: 0.8,
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  MAX_WIDTH: 1440,
};

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Image Optimization
export const IMAGE_CONFIG = {
  DEFAULT_QUALITY: 80,
  HERO_SIZES: [400, 800, 1200],
  THUMBNAIL_SIZES: [200, 400],
  LAZY_LOAD_THRESHOLD: 0.1, // 10% of image in viewport before loading
};

// Common dimensions
export const DIMENSIONS = {
  NAVBAR_HEIGHT: 80,
  HERO_HEIGHT_MOBILE: 400,
  HERO_HEIGHT_DESKTOP: 600,
};

// Cache durations (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
};
