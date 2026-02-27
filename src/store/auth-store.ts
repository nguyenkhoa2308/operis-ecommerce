import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/lib/api";
import { mapUser } from "@/lib/api/auth";
import type { AuthUser } from "@/lib/api/auth";
import { useCartStore } from "./cart-store";

export type User = AuthUser;

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    data: { name: string; email: string; password: string },
  ) => Promise<{ success: boolean; error?: string }>;
  /** Fetch current user from /auth/me — refreshes stored profile on every page load */
  fetchMe: () => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  setTokenBalance: (balance: number) => void;
}

/* Hydration tracking — true once zustand has restored state from localStorage */
let _hasHydrated = false;
export const hasAuthHydrated = () => _hasHydrated;
export const onAuthHydrationFinish = new Promise<void>((resolve) => {
  const check = () => {
    if (_hasHydrated) return resolve();
    setTimeout(check, 10);
  };
  check();
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: async (email, password) => {
        try {
          const res = await authApi.login(email, password);
          set({ user: res.user, isLoggedIn: true });
          useCartStore.getState().syncToServer();
          return { success: true };
        } catch (err) {
          const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
          return { success: false, error: message };
        }
      },

      register: async (payload) => {
        try {
          const res = await authApi.register(payload);
          set({ user: res.user, isLoggedIn: true });
          useCartStore.getState().syncToServer();
          return { success: true };
        } catch (err) {
          const message = err instanceof Error ? err.message : "Đăng ký thất bại";
          return { success: false, error: message };
        }
      },

      fetchMe: async () => {
        if (!get().isLoggedIn) return;
        try {
          const current = get().user;
          const user = await authApi.fetchMe(current ?? undefined);
          set({ user, isLoggedIn: true });
        } catch {
          // Cookie expired or invalid → clear zustand state
          set({ user: null, isLoggedIn: false });
        }
      },

      logout: () => {
        // Call API to clear HttpOnly cookies server-side
        authApi.logout().catch(() => {});
        set({ user: null, isLoggedIn: false });
      },

      updateProfile: (data) => {
        const current = get().user;
        if (current) {
          set({ user: { ...current, ...data } });
        }
      },

      setTokenBalance: (balance) => {
        const current = get().user;
        if (current) {
          set({ user: { ...current, tokenBalance: balance } });
        }
      },
    }),
    {
      name: "operis-auth",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => () => {
        _hasHydrated = true;
      },
    }
  )
);

// Re-export mapUser for any external consumers
export { mapUser };
