import api from "@/lib/axios";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ProductSpec {
  id: string;
  value: string;
  sort_order: number;
}

export interface ProductFullSpec {
  id: string;
  group_name: string;
  label: string;
  value: string;
  sort_order: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  brand: string;
  specs: ProductSpec[];
  fullSpecs: ProductFullSpec[];
  stock: number;
  sku: string;
  description: string;
  rating: number;
  tokenBonus?: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  limit?: number;
  offset?: number;
}

/* ------------------------------------------------------------------ */
/*  Mappers                                                            */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSpec(raw: any): ProductSpec {
  return {
    id: raw.id ?? "",
    value: raw.value ?? "",
    sort_order: raw.sort_order ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFullSpec(raw: any): ProductFullSpec {
  return {
    id: raw.id ?? "",
    group_name: raw.group_name ?? "",
    label: raw.label ?? "",
    value: raw.value ?? "",
    sort_order: raw.sort_order ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(raw: any): Product {
  const specs = raw.specs ?? [];
  const fullSpecs = raw.full_specs ?? raw.fullSpecs ?? [];
  return {
    id: raw.id ?? raw._id ?? "",
    slug: raw.slug ?? "",
    name: raw.name ?? "",
    price: raw.price ?? 0,
    image: raw.image ?? "",
    category: raw.category ?? "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    brand: raw.brand ?? "Operis",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    specs: Array.isArray(specs) ? specs.map((s: any) => mapSpec(s)) : [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fullSpecs: Array.isArray(fullSpecs) ? fullSpecs.map((s: any) => mapFullSpec(s)) : [],
    stock: raw.stock ?? 0,
    sku: raw.sku ?? "",
    description: raw.description ?? "",
    rating: raw.rating ?? 0,
    tokenBonus: raw.token_bonus ?? raw.tokenBonus,
  };
}

/* ------------------------------------------------------------------ */
/*  API calls                                                          */
/* ------------------------------------------------------------------ */

/** GET /products — list products with optional filters */
export async function getProducts(filters?: ProductFilters): Promise<ProductListResponse> {
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
export async function getProduct(slug: string): Promise<Product> {
  const { data } = await api.get(`/products/${slug}`);
  return mapProduct(data);
}

/** GET /products/:slug/related — get related products */
export async function getRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
  const { data } = await api.get(`/products/${slug}/related`, { params: { limit } });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (Array.isArray(data) ? data : []).map((p: any) => mapProduct(p));
}
