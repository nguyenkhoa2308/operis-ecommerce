import api from "@/lib/axios";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface Answer {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Question {
  id: string;
  productSlug: string;
  author: string;
  content: string;
  answer?: Answer;
  createdAt: string;
}

export interface QuestionsResponse {
  questions: Question[];
  total: number;
}

export interface QuestionFilters {
  limit?: number;
  offset?: number;
}

/* ------------------------------------------------------------------ */
/*  Mappers                                                            */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAnswer(raw: any): Answer {
  return {
    id: raw.id ?? raw._id ?? "",
    author: raw.author ?? "Operis Support",
    content: raw.content ?? "",
    createdAt: raw.createdAt ?? raw.created_at ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapQuestion(raw: any): Question {
  const ans = raw.answer ?? raw.answers?.[0];
  return {
    id: raw.id ?? raw._id ?? "",
    productSlug: raw.productSlug ?? raw.product_slug ?? "",
    author: raw.author ?? raw.authorName ?? raw.author_name ?? "Khách",
    content: raw.content ?? "",
    answer: ans ? mapAnswer(ans) : undefined,
    createdAt: raw.createdAt ?? raw.created_at ?? "",
  };
}

/* ------------------------------------------------------------------ */
/*  API calls                                                          */
/* ------------------------------------------------------------------ */

/** GET /products/:slug/questions — get Q&A for a product */
export async function getQuestions(productSlug: string, filters?: QuestionFilters): Promise<QuestionsResponse> {
  const { data } = await api.get(`/products/${productSlug}/questions`, { params: filters });
  const raw = data.questions ?? data.data ?? (Array.isArray(data) ? data : []);
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questions: raw.map((q: any) => mapQuestion(q)),
    total: data.total ?? raw.length,
  };
}

/** POST /products/:slug/questions — ask a question (logged in user) */
export async function createQuestion(
  productSlug: string,
  body: { content: string },
): Promise<Question> {
  const { data } = await api.post(`/products/${productSlug}/questions`, body);
  return mapQuestion(data);
}
