"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, CornerDownLeft, Zap, Code2, Palette, ShoppingBag } from "lucide-react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const hasSeenSplash = sessionStorage.getItem("splashSeen");
    if (hasSeenSplash) {
      setShowSplash(false);
      return;
    }

    // 1. Cyber Loading Progress (0% to 100% in ~1.8s)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // 2. Interactive Mouse Parallax Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3. Keyboard Shortcut [Enter] or [Space] or [Esc] to Enter Instantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        handleExplore();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleExplore = () => {
    sessionStorage.setItem("splashSeen", "true");
    setShowSplash(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] text-white overflow-y-auto overflow-x-hidden py-8 px-4 select-none touch-none"
        >
          {/* --- TOP BAR: SKIP BUTTON & SYSTEM STATUS --- */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-30 pointer-events-auto">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-gray-300 font-semibold tracking-wider uppercase">SYS.ONLINE // v2.6</span>
            </div>

            <button
              onClick={handleExplore}
              className="text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-1.5 backdrop-blur-md"
              aria-label="Skip Intro"
            >
              <span>Skip Intro</span>
              <span className="hidden sm:inline text-gray-500 font-mono text-[10px]">[Esc]</span>
            </button>
          </div>

          {/* --- DYNAMIC COSMIC BACKGROUND (PARALLAX ENHANCED) --- */}
          <div className="absolute inset-0 overflow-hidden bg-[#030712] pointer-events-none">
            {/* Base Mesh */}
            <motion.div 
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 15% 10%, rgba(88, 28, 135, 0.28) 0%, transparent 45%),
                  radial-gradient(circle at 85% 30%, rgba(29, 78, 216, 0.25) 0%, transparent 45%),
                  radial-gradient(circle at 50% 80%, rgba(14, 165, 233, 0.2) 0%, transparent 45%)
                `
              }}
            />
            
            {/* Floating Orbs with Subtle Mouse Parallax */}
            <motion.div 
              animate={{
                x: -mousePos.x * 25,
                y: -mousePos.y * 25,
              }}
              transition={{ type: "spring", damping: 30, stiffness: 100 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div 
                className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-35 mix-blend-screen animate-float-slow will-change-transform"
                style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)' }}
              />
              <div 
                className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full opacity-30 mix-blend-screen animate-float-medium will-change-transform"
                style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)', animationDelay: '-5s' }}
              />
              <div 
                className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full opacity-25 mix-blend-screen animate-float-fast will-change-transform"
                style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)', animationDelay: '-10s' }}
              />
            </motion.div>

            {/* Drifting Stars */}
            <div className="absolute inset-[-50%] z-0">
              <div 
                className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMjAiIHI9IjAuNSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxODAiIHI9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjE5MCIgY3k9IjIwIiByPSIwLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==')] bg-repeat animate-star-drift-slow"
                style={{ backgroundSize: '150px 150px' }}
              />
            </div>
          </div>

          {/* Large Hollow Background Text with Parallax */}
          <motion.div
            animate={{
              x: mousePos.x * 20,
              y: mousePos.y * 20,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
            className="absolute left-[-2%] md:left-[2%] top-1/3 md:top-[40%] -translate-y-1/2 flex flex-col font-black text-transparent uppercase pointer-events-none select-none z-0 tracking-tighter"
            style={{
              WebkitTextStroke: "2px rgba(168, 85, 247, 0.12)",
              fontSize: "clamp(6rem, 16vw, 14rem)",
              lineHeight: "0.85"
            }}
          >
            <span>Imagine</span>
            <span>Create</span>
            <span>Build</span>
          </motion.div>

          {/* --- MAIN 3D PARALLAX TILT CONTAINER --- */}
          <motion.div
            animate={{
              rotateX: -mousePos.y * 6,
              rotateY: mousePos.x * 6,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 120 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto my-auto"
          >
            {/* Top Subheader */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-gray-300 text-[10px] md:text-xs font-bold tracking-[0.25em] md:tracking-[0.35em] uppercase mb-6"
            >
              INNOVATION <span className="text-purple-400 mx-1 md:mx-2">•</span> CREATIVITY <span className="text-cyan-400 mx-1 md:mx-2">•</span> TECHNOLOGY
            </motion.div>

            {/* Logo Emblem & Brand Title */}
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center mb-4 relative"
            >
              {/* Glowing Aura Behind Logo */}
              <motion.div
                animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.95, 1.15, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-[60px] md:blur-[80px] -z-10 rounded-full pointer-events-none"
              />

              {/* SLRJ Logo Emblem & Rainbow Text */}
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5 drop-shadow-[0_0_35px_rgba(168,85,247,0.6)]">
                <Image
                  src="/logo.png?v=5"
                  alt="SLRJ Digital Logo"
                  width={140}
                  height={140}
                  unoptimized
                  className="w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 object-contain bg-transparent filter drop-shadow-[0_0_35px_rgba(168,85,247,0.8)] drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                />
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
                <motion.span 
                  animate={{ opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white text-xs sm:text-base md:text-2xl font-bold tracking-[0.5em] sm:tracking-[1em] md:tracking-[1.2em] font-brand drop-shadow-md pl-[0.25em] sm:pl-[0.5em]"
                >
                  DIGITAL
                </motion.span>
                <div className="w-8 sm:w-16 md:w-28 h-[1px] bg-gradient-to-l from-transparent via-cyan-500/50 to-cyan-400" />
              </div>
            </motion.div>

            {/* Slogan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white text-base sm:text-xl md:text-2xl font-bold tracking-wide mb-2 px-2"
            >
              We Imagine. We Create. We Build.
            </motion.div>

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

            {/* Founder & Team */}
            <div className="flex flex-col items-center gap-1 mb-5">
              <div className="flex items-center gap-1.5">
                <span className="text-purple-400 text-[9px] md:text-[11px] font-semibold tracking-[0.25em] uppercase">FOUNDED BY</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 font-bold text-[10px] md:text-xs tracking-[0.25em] uppercase">
                  SHAHID KOULURI
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-gray-400 text-[9px] md:text-[11px] font-medium tracking-[0.2em] uppercase mt-0.5">
                <span>Lokeish Pamarthi</span>
                <Sparkles className="w-2.5 h-2.5 text-pink-400 inline" />
                <span>Subhash Kasani</span>
                <Sparkles className="w-2.5 h-2.5 text-purple-400 inline" />
                <span>Rupesh Chaluvadi</span>
                <Sparkles className="w-2.5 h-2.5 text-cyan-400 inline" />
                <span>Jaswanth Pula</span>
              </div>
            </div>

            {/* --- FEATURE 3: AGENCY CAPABILITY BADGES --- */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 max-w-xl"
            >
              <div className="px-3 py-1 rounded-full bg-white/5 border border-cyan-500/30 text-[10px] sm:text-xs font-medium text-cyan-300 flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                <Code2 size={12} className="text-cyan-400" />
                <span>Next.js 16 & React 19</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-white/5 border border-purple-500/30 text-[10px] sm:text-xs font-medium text-purple-300 flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_10px_rgba(168,85,247,0.15)]">
                <Palette size={12} className="text-purple-400" />
                <span>Futuristic UI/UX</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-white/5 border border-pink-500/30 text-[10px] sm:text-xs font-medium text-pink-300 flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_10px_rgba(236,72,153,0.15)]">
                <ShoppingBag size={12} className="text-pink-400" />
                <span>E-Commerce & SaaS</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-white/5 border border-emerald-500/30 text-[10px] sm:text-xs font-medium text-emerald-300 flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                <Zap size={12} className="text-emerald-400" />
                <span>100/100 Core Web Vitals</span>
              </div>
            </motion.div>

            {/* --- FEATURE 1: CYBER PROGRESS COUNTER & EXPLORE BUTTON --- */}
            <div className="flex flex-col items-center">
              {!isLoaded ? (
                /* High-tech Loading Progress Bar */
                <div className="flex flex-col items-center gap-2 w-64 sm:w-72">
                  <div className="flex items-center justify-between w-full text-xs font-mono">
                    <span className="text-gray-400 tracking-wider">INITIALIZING</span>
                    <span className="text-cyan-400 font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">Loading digital experience...</span>
                </div>
              ) : (
                /* Pulsing Explore Button */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.button
                    onClick={handleExplore}
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 35px rgba(168,85,247,0.8)" }}
                    whileTap={{ scale: 0.96 }}
                    animate={{ boxShadow: ["0px 0px 0px rgba(168,85,247,0)", "0px 0px 30px rgba(168,85,247,0.5)", "0px 0px 0px rgba(168,85,247,0)"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-[#0e1322] hover:bg-[#1a1f36] border border-purple-500/50 backdrop-blur-md rounded-full transition-all duration-300 overflow-hidden cursor-pointer shadow-lg"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-cyan-500/30 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
                    <span className="relative text-white font-extrabold tracking-wider uppercase text-sm">
                      Enter SLRJ Digital
                    </span>
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] overflow-hidden">
                      <ArrowUpRight size={16} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </motion.button>

                  {/* Press Enter hint */}
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
