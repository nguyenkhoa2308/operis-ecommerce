import api from "@/lib/axios";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
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
/*  Mapper (API returns snake_case)                                    */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapKey(raw: any): ApiKey {
  return {
    id: raw.id,
    name: raw.name,
    prefix: raw.key_prefix ?? raw.prefix ?? "",
    isActive: raw.is_active ?? raw.isActive ?? true,
    expiresAt: raw.expires_at ?? raw.expiresAt ?? null,
    lastUsedAt: raw.last_used_at ?? raw.lastUsedAt ?? null,
    createdAt: raw.created_at ?? raw.createdAt ?? "",
  };
}

/* ------------------------------------------------------------------ */
/*  API calls                                                          */
/* ------------------------------------------------------------------ */

export async function listKeys(): Promise<ApiKey[]> {
  const { data } = await api.get("/keys");
  const arr = Array.isArray(data) ? data : data.keys ?? [];
  return arr.map(mapKey);
}

export async function createKey(payload: {
  name: string;
  expiresAt?: string;
}): Promise<ApiKeyCreateResponse> {
  const body: Record<string, unknown> = { name: payload.name };
  if (payload.expiresAt) body.expires_at = payload.expiresAt;
  const { data } = await api.post("/keys", body);
  return { ...mapKey(data), key: data.key };
}

export async function updateKey(
  id: string,
  payload: { name?: string; isActive?: boolean; expiresAt?: string },
): Promise<ApiKey> {
  // API expects snake_case
  const body: Record<string, unknown> = {};
  if (payload.name !== undefined) body.name = payload.name;
  if (payload.isActive !== undefined) body.is_active = payload.isActive;
  if (payload.expiresAt !== undefined) body.expires_at = payload.expiresAt;
  const { data } = await api.patch(`/keys/${id}`, body);
  return mapKey(data);
}

export async function deleteKey(id: string): Promise<void> {
  await api.delete(`/keys/${id}`);
}
