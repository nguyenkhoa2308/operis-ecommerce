import api from "@/lib/axios";
import { mapProduct } from "./product-mappers";

/* Re-export types so existing imports keep working */
export type {
  Product,
  ProductSpec,
  ProductFullSpec,
  ProductListResponse,
  ProductFilters,
} from "./product-mappers";

/* ------------------------------------------------------------------ */
/*  API calls (client-side, uses axios with auth interceptors)         */
/* ------------------------------------------------------------------ */

/** GET /products — list products with optional filters */
export async function getProducts(
  filters?: import("./product-mappers").ProductFilters,
): Promise<import("./product-mappers").ProductListResponse> {
  const { data } = await api.get("/products", { params: filters });
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

/** GET /products/categories — get category list */
export async function getCategories(): Promise<string[]> {
  const { data } = await api.get("/products/categories");
  return Array.isArray(data) ? data : [];
}

/** GET /products/:slug — get single product by slug */
export async function getProduct(
  slug: string,
): Promise<import("./product-mappers").Product> {
  const { data } = await api.get(`/products/${slug}`);
  return mapProduct(data);
}

/** GET /products/:slug/related — get related products */
export async function getRelatedProducts(
  slug: string,
  limit = 4,
): Promise<import("./product-mappers").Product[]> {
  const { data } = await api.get(`/products/${slug}/related`, {
    params: { limit },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (Array.isArray(data) ? data : []).map((p: any) => mapProduct(p));
}
