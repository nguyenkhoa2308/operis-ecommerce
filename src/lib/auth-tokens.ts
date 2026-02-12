/**
 * Standalone token storage — decoupled from Zustand to avoid
 * persist middleware overwriting tokens after refresh.
 */

const TOKEN_KEY = "operis-tokens";

interface StoredTokens {
  token: string;
  refreshToken: string;
}

export function getTokens(): StoredTokens | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setTokens(token: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, refreshToken }));
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}
