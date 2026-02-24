import { serverFetch } from "@/lib/server-fetch";
import {
  mapProduct,
  type Product,
  type ProductListResponse,
  type ProductFilters,
} from "./product-mappers";

const REVALIDATE = 300; // 5 minutes

/** GET /products/:slug — server-side */
export async function getProductServer(slug: string): Promise<Product> {
  const data = await serverFetch<Record<string, unknown>>(
    `/products/${slug}`,
    { next: { revalidate: REVALIDATE } },
  );
  return mapProduct(data);
}

/** GET /products/:slug/related — server-side */
export async function getRelatedProductsServer(
  slug: string,
  limit = 4,
): Promise<Product[]> {
  const data = await serverFetch<unknown>(`/products/${slug}/related`, {
    params: { limit },
    next: { revalidate: REVALIDATE },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (Array.isArray(data) ? data : []).map((p: any) => mapProduct(p));
}

/** GET /products — server-side with optional filters */
export async function getProductsServer(
  filters?: ProductFilters,
): Promise<ProductListResponse> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await serverFetch<any>("/products", {
    params: filters as Record<string, string | number | undefined>,
    next: { revalidate: REVALIDATE },
  });
  const raw = data.products ?? data.data ?? (Array.isArray(data) ? data : []);
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: raw.map((p: any) => mapProduct(p)),
    total: data.total ?? raw.length,
    page: data.page ?? 1,
    limit: data.limit ?? 20,
    totalPages: data.totalPages ?? 1,
  };
}

/** GET /products/categories — server-side */
export async function getCategoriesServer(): Promise<string[]> {
  const data = await serverFetch<unknown>("/products/categories", {
    next: { revalidate: REVALIDATE },
  });
  return Array.isArray(data) ? data : [];
}

/** Get all product slugs — for generateStaticParams */
export async function getAllProductSlugs(): Promise<string[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await serverFetch<any>("/products", {
    params: { limit: 1000 },
    next: { revalidate: 3600 },
  });
  const raw = data.products ?? data.data ?? (Array.isArray(data) ? data : []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return raw.map((p: any) => p.slug).filter(Boolean);
}
