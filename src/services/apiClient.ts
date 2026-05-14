const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

export async function apiClient<T>(
  resource: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${resource}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed (${response.status}): ${errorText}`);
  }

  return (await response.json()) as T;
}
