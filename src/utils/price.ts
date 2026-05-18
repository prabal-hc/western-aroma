/**
 * Price utility functions
 * Handles price parsing, formatting, and calculations
 */

/**
 * Parse price string to number
 * Supports formats like "₹650.00", "650.00", "650"
 */
export function parsePrice(priceString: string): number {
  if (typeof priceString !== "string") return 0;
  const cleaned = priceString.replace(/[₹,\s]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format number to price string
 * Returns format like "₹650.00"
 */
export function formatPrice(price: number): string {
  return `₹${price.toFixed(2)}`;
}

/**
 * Calculate total with GST (18%)
 */
export function calculatePriceWithGST(
  subtotal: number,
  gstRate: number = 0.18,
): { subtotal: number; gst: number; total: number } {
  const gst = subtotal * gstRate;
  return {
    subtotal,
    gst,
    total: subtotal + gst,
  };
}

/**
 * Calculate cart totals
 */
export interface CartTotals {
  subtotal: number;
  tax: number;
  total: number;
}

export function calculateCartTotals(
  items: Array<{ price: string; quantity: number }>,
  gstRate: number = 0.18,
): CartTotals {
  const subtotal = items.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.quantity;
  }, 0);

  const tax = subtotal * gstRate;
  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
}
