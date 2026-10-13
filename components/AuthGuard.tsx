"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      const publicPaths = ["/login", "/register"];
      if (!publicPaths.includes(pathname)) {
        router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
      }
    }
  }, [mounted, isLoading, user, pathname, router]);

  // While checking authentication state on client mount
  if (!mounted || isLoading) {
    const publicPaths = ["/login", "/register"];
    if (publicPaths.includes(pathname)) {
      return <>{children}</>;
    }
    return (
      <div className="min-h-screen bg-[#080C16] flex items-center justify-center text-cyan-400 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Verifying authentication...</span>
        </div>
      </div>
    );
  }

  // If unauthenticated and on protected page, show redirect indicator
  if (!user) {
    const publicPaths = ["/login", "/register"];
    if (!publicPaths.includes(pathname)) {
      return (
        <div className="min-h-screen bg-[#080C16] flex items-center justify-center text-cyan-400 font-mono text-sm">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span>Redirecting to Sign In / Log In...</span>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
