"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Star,
  MessageCircleQuestion,
  ThumbsUp,
  Send,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";
import { reviewsApi, questionsApi } from "@/lib/api";
import type { Review } from "@/lib/api/reviews";
import type { Question } from "@/lib/api/questions";
import Link from "next/link";

type SubTab = "reviews" | "qa";

/* ------------------------------------------------------------------ */
/*  Star rating input                                                  */
/* ------------------------------------------------------------------ */

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-yellow-400 transition-transform hover:scale-110"
        >
          {""}
          <Star
            size={20}
            className={
              star <= (hover || value) ? "fill-yellow-400" : "fill-transparent"
            }
          />
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Star display (read-only)                                           */
/* ------------------------------------------------------------------ */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-transparent text-gray-300"
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function ProductReviews({ productSlug }: { productSlug: string }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const addToast = useToastStore((s) => s.addToast);

  const [subTab, setSubTab] = useState<SubTab>("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [distribution, setDistribution] = useState<Record<number, number>>({});
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);

  /* Review form state */
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  /* Q&A form state */
  const [qaContent, setQaContent] = useState("");
  const [submittingQuestion, setSubmittingQuestion] = useState(false);

  /* Purchase check */
  const [hasPurchased, setHasPurchased] = useState(false);

  /* Fetch data */
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [revRes, qaRes] = await Promise.all([
        reviewsApi.getReviews(productSlug),
        questionsApi.getQuestions(productSlug),
      ]);
      setReviews(revRes.reviews);
      setAvgRating(revRes.avgRating);
      setDistribution(revRes.distribution);
      setTotalReviews(revRes.total);
      setQuestions(qaRes.questions);
      setTotalQuestions(qaRes.total);
    } catch {
      /* keep empty state */
    } finally {
      setLoading(false);
    }
  }, [productSlug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /* Check purchase status */
  useEffect(() => {
    if (!isLoggedIn) return;
    (async () => {
      try {
        const result = await reviewsApi.checkPurchase(productSlug);
        setHasPurchased(result);
      } catch {
        /* ignore */
      }
    })();
  }, [isLoggedIn, productSlug]);

  const handleSubmitReview = async () => {
    if (!reviewContent.trim() || reviewRating === 0) return;
    setSubmittingReview(true);
    try {
      const newReview = await reviewsApi.createReview(productSlug, {
        rating: reviewRating,
        content: reviewContent.trim(),
      });
      setReviews((prev) => [newReview, ...prev]);
      setTotalReviews((t) => t + 1);
      setReviewRating(0);
      setReviewContent("");
      addToast("Cảm ơn bạn đã đánh giá!");
    } catch {
      addToast("Không thể gửi đánh giá. Vui lòng thử lại.", "error");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleSubmitQuestion = async () => {
    if (!qaContent.trim()) return;
    setSubmittingQuestion(true);
    try {
      const newQ = await questionsApi.createQuestion(productSlug, {
        content: qaContent.trim(),
      });
      setQuestions((prev) => [newQ, ...prev]);
      setTotalQuestions((t) => t + 1);
      setQaContent("");
      addToast("Câu hỏi đã được gửi!");
    } catch {
      addToast("Không thể gửi câu hỏi. Vui lòng thử lại.", "error");
    } finally {
      setSubmittingQuestion(false);
    }
  };

  const handleVoteHelpful = async (reviewId: string) => {
    try {
      const updated = await reviewsApi.voteHelpful(reviewId);
      setReviews((prev) => prev.map((r) => (r.id === reviewId ? updated : r)));
    } catch {
      addToast("Không thể bình chọn. Vui lòng thử lại.", "error");
    }
  };

  const subTabs: { key: SubTab; label: string; count: number }[] = [
    { key: "reviews", label: "Đánh giá", count: totalReviews },
    { key: "qa", label: "Hỏi đáp", count: totalQuestions },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin text-muted-foreground" size={24} />
      </div>
    );
  }

  return (
    <div>
      {/* Sub-tab switcher */}
      <div className="flex gap-6 mb-6">
        {subTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setSubTab(t.key)}
            className={`text-sm tracking-wider pb-2 border-b-2 transition-colors ${
              subTab === t.key
                ? "text-foreground border-foreground font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {t.label}{" "}
            <span className="text-xs text-muted-foreground">({t.count})</span>
          </button>
        ))}
      </div>

      {/* ============ ĐÁNH GIÁ ============ */}
      {subTab === "reviews" && (
        <div className="space-y-8">
          {/* Summary */}
          <div className="flex items-center gap-6 p-5 bg-muted/50 rounded-lg">
            <div className="text-center">
              <p className="text-4xl font-semibold text-primary">
                {avgRating.toFixed(1)}
              </p>
              <Stars rating={Math.round(avgRating)} />
              <p className="text-xs text-muted-foreground mt-1">
                {totalReviews} đánh giá
              </p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = distribution[star] ?? 0;
                const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-right text-muted-foreground">
                      {star}
                    </span>
                    <Star
                      size={10}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-muted-foreground">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review list */}
          <div className="space-y-6">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="border-b border-border pb-6 last:border-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-foreground text-white text-xs font-semibold flex items-center justify-center">
                      {r.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-sm font-medium">{r.author}</span>
                      <Stars rating={r.rating} />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleDateString("vi-VN")
                      : ""}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed ml-11">
                  {r.content}
                </p>
                <div className="flex items-center gap-4 ml-11 mt-3">
                  <button
                    onClick={() => handleVoteHelpful(r.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ThumbsUp size={12} /> Hữu ích ({r.helpful})
                  </button>
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Chưa có đánh giá nào.
              </p>
            )}
          </div>

          {/* Write review form */}
          <div className="border border-border rounded-lg p-5">
            <h4 className="text-sm font-semibold mb-4">Viết đánh giá</h4>
            {!isLoggedIn ? (
              <p className="text-sm text-muted-foreground">
                Vui lòng{" "}
                <Link
                  href="/login"
                  className="text-primary underline underline-offset-2"
                >
                  đăng nhập
                </Link>{" "}
                để đánh giá sản phẩm.
              </p>
            ) : !hasPurchased ? (
              <p className="text-sm text-muted-foreground">
                Chỉ khách hàng đã mua sản phẩm mới có thể đánh giá.
              </p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Đánh giá của bạn
                  </p>
                  <StarRating value={reviewRating} onChange={setReviewRating} />
                </div>
                <textarea
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm này..."
                  rows={4}
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-primary resize-none transition-colors"
                />
                <button
                  onClick={handleSubmitReview}
                  disabled={
                    !reviewContent.trim() ||
                    reviewRating === 0 ||
                    submittingReview
                  }
                  className="bg-foreground text-white text-xs tracking-widest px-6 py-2.5 hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submittingReview && (
                    <Loader2 size={12} className="animate-spin" />
                  )}
                  GỬI ĐÁNH GIÁ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============ HỎI ĐÁP ============ */}
      {subTab === "qa" && (
        <div className="space-y-6">
          {/* Ask form */}
          <div className="border border-border rounded-lg p-5">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <MessageCircleQuestion size={16} className="text-primary" />
              Đặt câu hỏi về sản phẩm
            </h4>
            <div className="flex gap-3">
              <input
                type="text"
                value={qaContent}
                onChange={(e) => setQaContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmitQuestion();
                }}
                placeholder={
                  isLoggedIn
                    ? "Bạn muốn hỏi gì về sản phẩm này?"
                    : "Đăng nhập để đặt câu hỏi..."
                }
                disabled={!isLoggedIn || submittingQuestion}
                className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <button
                onClick={handleSubmitQuestion}
                disabled={
                  !qaContent.trim() || !isLoggedIn || submittingQuestion
                }
                className="bg-foreground text-white px-4 py-2.5 rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submittingQuestion ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
            {!isLoggedIn && (
              <p className="text-xs text-muted-foreground mt-2">
                Vui lòng{" "}
                <Link
                  href="/login"
                  className="text-primary underline underline-offset-2"
                >
                  đăng nhập
                </Link>{" "}
                để đặt câu hỏi.
              </p>
            )}
          </div>

          {/* Questions list */}
          {questions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!
            </p>
          ) : (
            <div className="space-y-5">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  {/* Question */}
                  <div className="p-4 bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        Hỏi
                      </span>
                      <span className="text-xs font-medium">{q.author}</span>
                      <span className="text-xs text-muted-foreground">
                        —{" "}
                        {q.createdAt
                          ? new Date(q.createdAt).toLocaleDateString("vi-VN")
                          : ""}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{q.content}</p>
                  </div>

                  {/* Answer */}
                  {q.answer ? (
                    <div className="p-4 border-t border-border bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          Trả lời
                        </span>
                        <span className="text-xs font-medium">
                          {q.answer.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          —{" "}
                          {q.answer.createdAt
                            ? new Date(q.answer.createdAt).toLocaleDateString(
                                "vi-VN",
                              )
                            : ""}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {q.answer.content}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 border-t border-border bg-white">
                      <p className="text-xs text-muted-foreground italic">
                        Đang chờ phản hồi từ Operis Support...
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
