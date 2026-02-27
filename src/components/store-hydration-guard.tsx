"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

/**
 * Blocks rendering until zustand stores finish hydrating from localStorage,
 * then calls /auth/me to refresh user data.
 * Shows a minimal full-page loader on first load / F5 to prevent
 * the flash between unauthenticated and authenticated UI states.
 * Client-side navigations are unaffected (no loader shown).
 */
export default function StoreHydrationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    // Clean up legacy localStorage tokens (migrated to HttpOnly cookies)
    localStorage.removeItem("operis-tokens");

    const id = requestAnimationFrame(async () => {
      fetchMe();
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, [fetchMe]);

  if (!ready) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-semibold tracking-tight">
            Operis<span className="text-primary">.</span>
          </p>
          <div className="w-6 h-6 border-2 border-muted-foreground/20 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
