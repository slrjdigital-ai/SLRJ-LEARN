"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: false,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current && !window.location.hash) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
