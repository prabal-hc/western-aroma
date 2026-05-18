/**
 * Class name utility for combining Tailwind classes
 * Simple utility for conditional class merging
 */

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter((c) => typeof c === "string").join(" ");
}
