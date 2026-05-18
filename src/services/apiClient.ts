/**
 * API Client
 * Handles HTTP requests with error handling and debugging
 */

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
const debug = import.meta.env.VITE_DEBUG === "true";

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

/**
 * Generic API client for fetch requests
 * @template T - Response type
 * @param resource - API endpoint path
 * @param init - Fetch options
 * @returns Parsed JSON response
 */
export async function apiClient<T>(
  resource: string,
  init?: RequestInit,
): Promise<T> {
  try {
    const url = `${apiBaseUrl}${resource}`;

    if (debug) {
      console.log(`[API] ${init?.method || "GET"} ${url}`);
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      ...init,
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorMessage = `${response.status} ${response.statusText}: ${errorText}`;

      if (debug) {
        console.error(`[API] Error: ${errorMessage}`);
      }

      throw new APIError(response.status, response.statusText, errorMessage);
    }

    const data = (await response.json()) as T;

    if (debug) {
      console.log(`[API] Success:`, data);
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    if (debug) {
      console.error(`[API] Exception: ${message}`);
    }

    throw new APIError(0, "NETWORK_ERROR", message);
  }
}
