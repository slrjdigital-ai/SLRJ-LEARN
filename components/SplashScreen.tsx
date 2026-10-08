"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, CornerDownLeft, Code2, Palette, ShoppingBag, Zap } from "lucide-react";
import SplashBackgroundAnimation from "./SplashBackgroundAnimation";

const emptySubscribe = () => () => {};

function subscribeSplashSeen(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSplashSeenSnapshot() {
  if (typeof window === "undefined") return false;
  return Boolean(sessionStorage.getItem("splashSeen"));
}

export default function SplashScreen() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const alreadySeen = useSyncExternalStore(subscribeSplashSeen, getSplashSeenSnapshot, () => false);
  const [dismissed, setDismissed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const showSplash = mounted && !alreadySeen && !dismissed;

  // High performance MotionValues: updates compositor directly without React re-renders!
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), { stiffness: 120, damping: 20 });

  const handleExplore = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("splashSeen", "true");
    }
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (alreadySeen || dismissed) {
      return;
    }

    // Smooth, cinematic 1.8-second progress progression with automatic smooth reveal
    const totalDuration = 1800;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextVal = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
      setProgress(nextVal);

      if (nextVal >= 100) {
        clearInterval(interval);
        setIsLoaded(true);
        setTimeout(() => {
          handleExplore();
        }, 600);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [alreadySeen, dismissed, handleExplore]);

  // Keyboard shortcut [Enter], [Space], [Esc]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        handleExplore();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleExplore]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX / innerWidth - 0.5) * 2);
    mouseY.set((e.clientY / innerHeight - 0.5) * 2);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(14px)",
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020108] text-white overflow-y-auto overflow-x-hidden py-8 px-4 select-none"
        >
          {/* ── CINEMATIC 3D BACKGROUND ANIMATION ──────────────────────── */}
          <SplashBackgroundAnimation />

          {/* ── TOP BAR: SKIP BUTTON & SYSTEM STATUS ───────────────────── */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-30 pointer-events-auto">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-gray-300 font-semibold tracking-wider uppercase">SYS.ONLINE // v2.6</span>
            </div>

            <button
              onClick={handleExplore}
              className="text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
              aria-label="Skip Intro"
            >
              <span>Skip Intro</span>
              <span className="hidden sm:inline text-gray-500 font-mono text-[10px]">[Esc]</span>
            </button>
          </div>

          {/* ── MAIN 3D PARALLAX CONTAINER (FOREGROUND CONTENT) ────────── */}
          <motion.div
            style={{ 
              rotateX, 
              rotateY, 
              transformStyle: "preserve-3d" 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto my-auto will-change-transform"
          >
            {/* Top Subheader */}
            <div className="text-gray-300 text-[10px] md:text-xs font-bold tracking-[0.25em] md:tracking-[0.35em] uppercase mb-6 drop-shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              INNOVATION <span className="text-purple-400 mx-1 md:mx-2">•</span> CREATIVITY <span className="text-cyan-400 mx-1 md:mx-2">•</span> TECHNOLOGY
            </div>

            {/* Logo Emblem & Brand Title */}
            <div className="flex flex-col items-center mb-4 relative">
              {/* SLRJ Logo Emblem & Rainbow Text */}
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5 drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
                {/* Logo Image with Shimmer Light Sweep */}
                <div className="relative group flex items-center justify-center">
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src="/logo.png?v=5"
                      alt="SLRJ Digital Logo"
                      width={140}
                      height={140}
                      priority
                      unoptimized
                      className="w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 object-contain bg-transparent filter drop-shadow-[0_0_35px_rgba(168,85,247,0.85)] drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                    />

                    {/* Gentle diagonal light sweep across logo */}
                    <motion.div
                      animate={{ x: ["-140%", "240%"] }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        repeatDelay: 1.6,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-25deg] pointer-events-none"
                    />
                  </div>
                </div>

                <h1 className="text-[3.5rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9.5rem] font-black tracking-tight flex items-center uppercase leading-none font-brand">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-purple-400 to-purple-700">
                    SL
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-pink-300 via-pink-500 to-fuchsia-700 ml-[-0.05em]">
                    RJ
                  </span>
                </h1>
              </div>

              {/* DIGITAL Text */}
              <div className="flex items-center gap-3 sm:gap-6 md:gap-8 mt-3 sm:mt-4 md:mt-5 max-w-full">
                <div className="w-8 sm:w-16 md:w-28 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-purple-400" />
                <span className="text-white text-xs sm:text-base md:text-2xl font-bold tracking-[0.5em] sm:tracking-[1em] md:tracking-[1.2em] font-brand drop-shadow-md pl-[0.25em] sm:pl-[0.5em]">
                  DIGITAL
                </span>
                <div className="w-8 sm:w-16 md:w-28 h-[1px] bg-gradient-to-l from-transparent via-cyan-500/50 to-cyan-400" />
              </div>
            </div>

            {/* Slogan */}
            <div className="text-white text-base sm:text-xl md:text-2xl font-bold tracking-wide mb-2 px-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              We Imagine. We Create. We Build.
            </div>

            {/* SLRJ Meaning */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3.5 text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-600 font-bold">S<span className="text-gray-400 font-normal">ankalp</span></span>
              <span className="text-purple-400/60">•</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-300 via-purple-400 to-purple-600 font-bold">L<span className="text-gray-400 font-normal">akshya</span></span>
              <span className="text-pink-400/60">•</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-pink-300 via-pink-500 to-fuchsia-600 font-bold">R<span className="text-gray-400 font-normal">achna</span></span>
              <span className="text-cyan-400/60">•</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-700 font-bold">J<span className="text-gray-400 font-normal">osh</span></span>
            </div>

            {/* Founder & Team Section */}
            <div className="flex flex-col items-center gap-3 mb-6">
              {/* Founder */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-purple-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
                  FOUNDED BY
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 font-extrabold text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]">
                  SHAHID KOULURI
                </span>
              </div>

              {/* Subtle separator */}
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-0.5" />

              {/* Team Members */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-cyan-400 text-[9px] md:text-[11px] font-bold tracking-[0.3em] uppercase flex items-center gap-1.5">
                  <Sparkles size={11} className="text-cyan-400 inline" />
                  TEAM MEMBERS
                  <Sparkles size={11} className="text-cyan-400 inline" />
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-gray-200 text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] md:tracking-[0.25em] uppercase">
                  <span className="hover:text-cyan-300 transition-colors">Lokeish Pamarthi</span>
                  <span className="text-purple-400/60 font-normal">•</span>
                  <span className="hover:text-purple-300 transition-colors">Subhash Kasani</span>
                  <span className="text-pink-400/60 font-normal">•</span>
                  <span className="hover:text-pink-300 transition-colors">Rupesh Chaluvadi</span>
                  <span className="text-cyan-400/60 font-normal">•</span>
                  <span className="hover:text-emerald-300 transition-colors">Jaswanth Pula</span>
                </div>
              </div>
            </div>

            {/* Capability Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 max-w-xl">
              <div className="px-3 py-1 rounded-full bg-white/5 border border-cyan-500/30 text-[10px] sm:text-xs font-medium text-cyan-300 flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                <Code2 size={12} className="text-cyan-400" />
                <span>Next.js 16 & React 19</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-white/5 border border-purple-500/30 text-[10px] sm:text-xs font-medium text-purple-300 flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(168,85,247,0.15)]">
                <Palette size={12} className="text-purple-400" />
                <span>Futuristic UI/UX</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-white/5 border border-pink-500/30 text-[10px] sm:text-xs font-medium text-pink-300 flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(236,72,153,0.15)]">
                <ShoppingBag size={12} className="text-pink-400" />
                <span>E-Commerce & SaaS</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-white/5 border border-emerald-500/30 text-[10px] sm:text-xs font-medium text-emerald-300 flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                <Zap size={12} className="text-emerald-400" />
                <span>100/100 Core Web Vitals</span>
              </div>
            </div>

            {/* Cyber Progress Counter & Explore Button */}
            <div className="flex flex-col items-center">
              {!isLoaded ? (
                <div className="flex flex-col items-center gap-2 w-64 sm:w-72">
                  <div className="flex items-center justify-between w-full text-xs font-mono">
                    <span className="text-gray-400 tracking-wider">INITIALIZING</span>
                    <span className="text-cyan-400 font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">Loading digital experience...</span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.button
                    onClick={handleExplore}
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 35px rgba(168,85,247,0.8)" }}
                    whileTap={{ scale: 0.96 }}
                    className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-[#0e1322] hover:bg-[#1a1f36] border border-purple-500/50 backdrop-blur-md rounded-full transition-all duration-300 overflow-hidden cursor-pointer shadow-lg"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-cyan-500/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative text-white font-extrabold tracking-wider uppercase text-sm">
                      Enter SLRJ Digital
                    </span>
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] overflow-hidden">
                      <ArrowUpRight size={16} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </motion.button>

                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mono">
                    <span>Press</span>
                    <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-semibold text-[10px] flex items-center gap-1">
                      Enter <CornerDownLeft size={10} />
                    </kbd>
                    <span>to explore</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
