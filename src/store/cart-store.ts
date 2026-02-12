import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
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
  /** Sync local cart to backend (call after login) */
  syncToServer: () => Promise<void>;
  /** Load cart from backend (call after login) */
  loadFromServer: () => Promise<void>;
}

/**
 * Push current cart state to backend.
 * Only runs when user is logged in (auth token exists).
 */
async function pushToServer(items: CartItem[]) {
  // TODO: Replace with actual API call
  // Example: await fetch("/api/cart", { method: "PUT", body: JSON.stringify({ items }) })
  console.log("[cart] sync to server:", items.length, "items");
}

/** Check if user is logged in by reading auth store from localStorage */
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

          // Sync to server if logged in
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
        // Push local cart items to backend (merges with server-side cart)
        // TODO: Replace with actual API call
        const { items } = get();
        await pushToServer(items);
      },

      loadFromServer: async () => {
        // TODO: Replace with actual API call
        // Example: const res = await fetch("/api/cart"); const data = await res.json();
        // For now, keep local items (server cart will override when API is ready)
        console.log("[cart] load from server (TODO)");
      },
    }),
    {
      name: "operis-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
