"use client";

import { useEffect, useState, useRef, createContext, useContext, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Helper to format clean, high-tech destination titles from pathnames
function getRouteLabel(path: string): string {
  if (path === "/" || path === "") return "HOME";
  const clean = path.replace(/^\//, "").split("/")[0].replace(/-/g, " ");
  if (clean === "about") return "ABOUT US";
  if (clean === "services") return "OUR SERVICES";
  if (clean === "projects") return "PORTFOLIO & WORK";
  if (clean === "contact") return "GET IN TOUCH";
  if (clean === "blog") return "INSIGHTS & BLOG";
  if (clean === "privacy policy") return "PRIVACY POLICY";
  if (clean === "terms and conditions") return "TERMS & CONDITIONS";
  return clean.toUpperCase();
}

interface PageTransitionContextType {
  navigateWithTransition: (url: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigateWithTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const [targetRoute, setTargetRoute] = useState("");
  const currentPathRef = useRef(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Navigate function with transition
  const navigateWithTransition = useCallback((url: string) => {
    if (isTransitioning) return;

    setTargetRoute(url);
    setIsTransitioning(true);
    setPhase("covering");

    // Phase 1: Curtains sweep down to cover the screen
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      // Screen is now fully covered by the cosmic void layer
      router.push(url);
      window.scrollTo(0, 0);

      // Phase 2: Hold to clearly display the transition page & route telemetry
      setTimeout(() => {
        setPhase("revealing");

        // Phase 3: Transition finishes and restores interactivity
        setTimeout(() => {
          setIsTransitioning(false);
          setPhase("idle");
        }, 650);
      }, 850);
    }, 550);
  }, [isTransitioning, router]);

  // Synchronize path updates (e.g., when route change completes or back/forward pressed)
  useEffect(() => {
    if (currentPathRef.current !== pathname) {
      currentPathRef.current = pathname;

      // If navigation happened via browser back/forward (not via link interceptor)
      if (phase === "idle") {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, phase]);

  // Safety fallback: Never leave user stuck on screen curtain
  useEffect(() => {
    if (isTransitioning) {
      const safetyTimer = setTimeout(() => {
        setIsTransitioning(false);
        setPhase("idle");
      }, 3000);
      return () => clearTimeout(safetyTimer);
    }
  }, [isTransitioning]);

  // Intercept all internal <a> and Next.js <Link> clicks globally
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore special/external protocols
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      ) {
        return;
      }

      // Check URL domain
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;

        // Same page with hash only (e.g., /#feedback on the home page)
        if (url.pathname === pathname && url.hash) {
          return; // Let standard smooth-scroll handle it
        }

        // Exact same page without hash: scroll smoothly to top
        if (url.pathname === pathname && !url.hash) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        // Valid internal route change: Trigger unique transition!
        e.preventDefault();
        navigateWithTransition(url.pathname + url.search + url.hash);
      } catch {
        // Fallback for malformed URLs
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => document.removeEventListener("click", handleLinkClick, { capture: true });
  }, [pathname, isTransitioning, navigateWithTransition]);

  const destinationLabel = getRouteLabel(targetRoute || pathname);

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {/* ── Main Page Content with Perspective De-blur Entrance ───────── */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 22, filter: "blur(10px)", scale: 0.985 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex-grow flex flex-col"
      >
        {children}
      </motion.div>

      {/* ── Liquid Cyber Portal Shutter Overlay ───────────────────────── */}
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden">
            {/* ── Wave Layer 1: Electric Purple ─────────────────────── */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={phase === "covering" ? { y: "0%" } : { y: "100%" }}
              transition={{
                duration: phase === "covering" ? 0.52 : 0.62,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-0 bg-gradient-to-b from-[#581C87] via-[#7C3AED] to-[#A855F7] z-10"
            />

            {/* ── Wave Layer 2: Neon Pink ───────────────────────────── */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={phase === "covering" ? { y: "0%" } : { y: "100%" }}
              transition={{
                duration: phase === "covering" ? 0.55 : 0.65,
                delay: phase === "covering" ? 0.04 : 0.02,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-0 bg-gradient-to-b from-[#9D174D] via-[#DB2777] to-[#EC4899] z-20"
            />

            {/* ── Wave Layer 3: Cosmic Void Canvas with Cyan Leading Edge */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={phase === "covering" ? { y: "0%" } : { y: "100%" }}
              transition={{
                duration: phase === "covering" ? 0.58 : 0.68,
                delay: phase === "covering" ? 0.08 : 0.04,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-0 bg-[#04020F] z-30 flex items-center justify-center overflow-hidden"
            >
              {/* Cyan Laser Beam at leading edge */}
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#06B6D4,0_0_12px_#38BDF8]" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_20px_#A855F7]" />

              {/* Background Cyber Grid */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(168, 85, 247, 0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Central Glowing Ambient Orb */}
              <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.3)_0%,_rgba(6,182,212,0.15)_45%,_transparent_75%)] blur-3xl pointer-events-none" />

              {/* ══════════════════════════════════════════════════════
                  CENTRAL HOLOGRAPHIC HUD & ROUTE TELEMETRY
                 ══════════════════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
                transition={{ duration: 0.4 }}
                className="relative z-40 flex flex-col items-center justify-center text-center px-6"
              >
                {/* Concentric Rotating Cyber Rings */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-5 flex items-center justify-center">
                  {/* Outer spinning ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-[spin_6s_linear_infinite]" />
                  {/* Middle reverse spinning ring */}
                  <div className="absolute inset-2 rounded-full border border-dotted border-purple-400/50 animate-[spin_4s_linear_infinite_reverse]" />
                  {/* Inner glowing pill */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600/30 to-cyan-500/20 backdrop-blur-md border border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center" />

                  {/* SLRJ Monogram Logo */}
                  <div className="relative font-brand font-black text-xl sm:text-2xl tracking-tighter flex items-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-purple-300 to-purple-500">
                      SL
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-pink-300 via-pink-400 to-purple-600">
                      RJ
                    </span>
                  </div>
                </div>

                {/* Subtitle / Telemetry Header */}
                <div className="flex items-center gap-2 mb-2 text-[10px] sm:text-xs font-mono font-medium text-cyan-300/80 tracking-[0.25em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>{"// QUANTUM GATEWAY ROUTING //"}</span>
                </div>

                {/* Destination Badge */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-purple-200 tracking-tight font-brand mb-4">
                  {destinationLabel}
                </h2>

                {/* High-Tech Progress Bar */}
                <div className="w-56 sm:w-72 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 0.85, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_12px_#06B6D4]"
                  />
                </div>

                {/* Status Indicator */}
                <div className="mt-3 flex items-center gap-3 text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                  <span>INITIATING LINK</span>
                  <span className="text-cyan-400 font-bold">&bull; 100% READY</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
}
