import api from "@/lib/axios";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface Review {
  id: string;
  productSlug: string;
  author: string;
  rating: number;
  content: string;
  helpful: number;
  createdAt: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  avgRating: number;
  distribution: Record<number, number>;
}

export interface ReviewFilters {
  sort?: "newest" | "helpful";
  limit?: number;
  offset?: number;
}

/* ------------------------------------------------------------------ */
/*  Mappers                                                            */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapReview(raw: any): Review {
  return {
    id: raw.id ?? raw._id ?? "",
    productSlug: raw.productSlug ?? raw.product_slug ?? "",
    author: raw.author ?? raw.userName ?? raw.user_name ?? "Ẩn danh",
    rating: raw.rating ?? 0,
    content: raw.content ?? raw.text ?? "",
    helpful: raw.helpful ?? raw.helpful_count ?? 0,
    createdAt: raw.createdAt ?? raw.created_at ?? "",
  };
}

/* ------------------------------------------------------------------ */
/*  API calls                                                          */
/* ------------------------------------------------------------------ */

/** GET /products/:slug/reviews — get reviews for a product */
export async function getReviews(productSlug: string, filters?: ReviewFilters): Promise<ReviewsResponse> {
  const { data } = await api.get(`/products/${productSlug}/reviews`, { params: filters });
  const raw = data.reviews ?? data.data ?? (Array.isArray(data) ? data : []);
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviews: raw.map((r: any) => mapReview(r)),
    total: data.total ?? raw.length,
    avgRating: data.avgRating ?? data.avg_rating ?? 0,
    distribution: data.distribution ?? {},
  };
}

/** POST /products/:slug/reviews — create a review (must have purchased) */
export async function createReview(
  productSlug: string,
  body: { rating: number; content?: string },
): Promise<Review> {
  const { data } = await api.post(`/products/${productSlug}/reviews`, body);
  return mapReview(data);
}

/** POST /reviews/:id/helpful — vote a review as helpful */
export async function voteHelpful(reviewId: string): Promise<Review> {
  const { data } = await api.post(`/reviews/${reviewId}/helpful`);
  return mapReview(data);
}

/** GET /products/:slug/check-purchase — check if current user purchased */
export async function checkPurchase(productSlug: string): Promise<boolean> {
  try {
    const { data } = await api.get(`/products/${productSlug}/check-purchase`);
    return data.purchased ?? false;
  } catch {
    return false;
  }
}
