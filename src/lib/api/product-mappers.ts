/* ------------------------------------------------------------------ */
/*  Shared types & mappers — used by both client (axios) & server      */
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSpec(raw: any): ProductSpec {
  return {
    id: raw.id ?? "",
    value: raw.value ?? "",
    sort_order: raw.sort_order ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapFullSpec(raw: any): ProductFullSpec {
  return {
    id: raw.id ?? "",
    group_name: raw.group_name ?? "",
    label: raw.label ?? "",
    value: raw.value ?? "",
    sort_order: raw.sort_order ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapProduct(raw: any): Product {
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
