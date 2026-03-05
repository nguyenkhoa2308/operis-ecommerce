import api from "@/lib/axios";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  lastChars: string;
  isActive: boolean;
  expiresAt: string | null;
  lastUsedAt: string | null;
  createdAt: string;
}

export interface ApiKeyCreateResponse extends ApiKey {
  /** Full key — only returned once at creation time */
  key: string;
}

/* ------------------------------------------------------------------ */
/*  API calls                                                          */
/* ------------------------------------------------------------------ */

export async function listKeys(): Promise<{ keys: ApiKey[]; total: number }> {
  const { data } = await api.get("/keys");
  return data;
}

export async function createKey(payload: {
  name: string;
  expiresAt?: string;
}): Promise<ApiKeyCreateResponse> {
  const { data } = await api.post("/keys", payload);
  return data;
}

export async function updateKey(
  id: string,
  payload: { name?: string; isActive?: boolean; expiresAt?: string },
): Promise<ApiKey> {
  const { data } = await api.patch(`/keys/${id}`, payload);
  return data;
}

export async function deleteKey(id: string): Promise<void> {
  await api.delete(`/keys/${id}`);
}
