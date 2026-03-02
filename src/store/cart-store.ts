import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/axios";
import type { Product } from "@/data/products";
import { useToastStore } from "./toast-store";

export interface CartItem {
  product: Product;
  quantity: number;
}

/** Slim payload sent to / received from backend */
interface CartItemPayload {
  product_slug: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  /** Merge local cart with server cart (call after login/register) */
  syncToServer: () => Promise<void>;
  /** Load cart from server, replacing local (call on session restore) */
  loadFromServer: () => Promise<void>;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toPayload(items: CartItem[]): CartItemPayload[] {
  return items.map((i) => ({ product_slug: i.product.slug, quantity: i.quantity }));
}

function isLoggedIn(): boolean {
  try {
    const raw = localStorage.getItem("operis-auth");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed?.state?.isLoggedIn === true;
  } catch {
    return false;
  }
}

/** PUT /api/cart — sync full cart to server after each change */
async function pushToServer(items: CartItem[]) {
  try {
    await api.put("/cart", { items: toPayload(items) });
  } catch (err) {
    console.error("[cart] push failed:", err);
  }
}

/**
 * Map server slugs → full Product objects.
 * Uses local items as cache, lazy-fetches any missing products.
 */
function resolveItems(
  serverItems: CartItemPayload[],
  localItems: CartItem[],
): CartItem[] {
  const localMap = new Map(localItems.map((i) => [i.product.slug, i.product]));
  const resolved: CartItem[] = [];
  const missing: CartItemPayload[] = [];

  for (const si of serverItems) {
    const product = localMap.get(si.product_slug);
    if (product) {
      resolved.push({ product, quantity: si.quantity });
    } else {
      missing.push(si);
    }
  }

  if (missing.length > 0) {
    fetchMissingProducts(missing);
  }

  return resolved;
}

async function fetchMissingProducts(missing: CartItemPayload[]) {
  try {
    const { getProduct } = await import("@/lib/api/products");
    const fetched = await Promise.all(
      missing.map(async (si) => {
        try {
          const product = await getProduct(si.product_slug);
          return { product, quantity: si.quantity } as CartItem;
        } catch {
          console.warn("[cart] product not found:", si.product_slug);
          return null;
        }
      }),
    );
    const valid = fetched.filter((i): i is CartItem => i !== null);
    if (valid.length > 0) {
      useCartStore.setState((s) => ({ items: [...s.items, ...valid] }));
    }
  } catch (err) {
    console.error("[cart] fetch missing products failed:", err);
  }
}

/* ------------------------------------------------------------------ */
/*  Store                                                              */
/* ------------------------------------------------------------------ */

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.slug === product.slug);
          const next = existing
            ? {
                items: state.items.map((i) =>
                  i.product.slug === product.slug
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                ),
              }
            : { items: [...state.items, { product, quantity: 1 }] };

          if (isLoggedIn()) pushToServer(next.items);
          return next;
        }),

      removeItem: (slug) =>
        set((state) => {
          const next = { items: state.items.filter((i) => i.product.slug !== slug) };
          if (isLoggedIn()) pushToServer(next.items);
          return next;
        }),

      updateQuantity: (slug, quantity) =>
        set((state) => {
          const next = {
            items:
              quantity <= 0
                ? state.items.filter((i) => i.product.slug !== slug)
                : state.items.map((i) =>
                    i.product.slug === slug ? { ...i, quantity } : i
                  ),
          };
          if (isLoggedIn()) pushToServer(next.items);
          return next;
        }),

      clearCart: () => {
        if (isLoggedIn()) pushToServer([]);
        set({ items: [] });
      },

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      syncToServer: async () => {
        const toast = useToastStore.getState().addToast;
        try {
          const { data } = await api.post<{ items: CartItemPayload[] }>("/cart/merge", {
            local_items: toPayload(get().items),
          });
          set({ items: resolveItems(data.items, get().items) });
          toast("Đã đồng bộ giỏ hàng");
        } catch (err) {
          console.error("[cart] merge failed:", err);
          toast("Không thể đồng bộ giỏ hàng", "error");
        }
      },

      loadFromServer: async () => {
        try {
          const { data } = await api.get<{ items: CartItemPayload[] }>("/cart");
          set({ items: resolveItems(data.items, get().items) });
        } catch (err) {
          console.error("[cart] load failed:", err);
        }
      },
    }),
    {
      name: "operis-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
