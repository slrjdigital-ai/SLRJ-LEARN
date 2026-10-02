"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSeenSplash = sessionStorage.getItem("splashSeen");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
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
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] text-white overflow-hidden touch-none"
        >
          {/* --- 1. DYNAMIC COLORFUL BACKGROUND (FULLY ANIMATED & HIGH PERFORMANCE) --- */}
          <div className="absolute inset-0 overflow-hidden bg-[#030712] pointer-events-none">
            {/* Base Mesh with subtle breathing */}
            <motion.div 
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 15% 10%, rgba(88, 28, 135, 0.25) 0%, transparent 45%),
                  radial-gradient(circle at 85% 30%, rgba(29, 78, 216, 0.2) 0%, transparent 45%),
                  radial-gradient(circle at 50% 80%, rgba(14, 165, 233, 0.15) 0%, transparent 45%)
                `
              }}
            />
            
            {/* Animated Floating Orbs (Navy to Purple to Blue theme) */}
            <div 
              className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-30 mix-blend-screen animate-float-slow will-change-transform"
              style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.3) 0%, transparent 70%)' }}
            />
            <div 
              className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full opacity-25 mix-blend-screen animate-float-medium will-change-transform"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)', animationDelay: '-5s' }}
            />
            <div 
              className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full opacity-25 mix-blend-screen animate-float-fast will-change-transform"
              style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)', animationDelay: '-10s' }}
            />

            {/* Subtle Glowing Particles */}
            <motion.div 
              animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[30%] left-[30%] w-2 h-2 bg-blue-400 rounded-full blur-[2px]"
            />
            <motion.div 
              animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-[40%] right-[25%] w-3 h-3 bg-purple-400 rounded-full blur-[3px]"
            />
            <motion.div 
              animate={{ y: [0, -50, 0], opacity: [0, 0.7, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
              className="absolute bottom-[20%] right-[40%] w-1.5 h-1.5 bg-cyan-300 rounded-full blur-[1px]"
            />

            {/* Drifting Star Pattern Layer 1 (Slow & smaller for depth) */}
            <div className="absolute inset-[-50%] z-0">
              <div 
                className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMjAiIHI9IjAuNSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxODAiIHI9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjE5MCIgY3k9IjIwIiByPSIwLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==')] bg-repeat animate-star-drift-slow"
                style={{ backgroundSize: '150px 150px' }}
              />
            </div>

            {/* Drifting Star Pattern Layer 2 (Faster & larger for parallax) */}
            <div className="absolute inset-[-50%] z-0">
              <div 
                className="absolute inset-0 opacity-60 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMjAiIHI9IjAuNSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxODAiIHI9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNCIvPjxjaXJjbGUgY3g9IjE5MCIgY3k9IjIwIiByPSIwLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==')] bg-repeat animate-star-drift"
                style={{ backgroundSize: '250px 250px' }}
              />
            </div>
          </div>

          {/* Large Hollow Background Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: [-20, 10, -20] }}
            transition={{ 
              opacity: { duration: 2, delay: 0.5, ease: "easeOut" },
              x: { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
            className="absolute left-[-2%] md:left-[2%] top-1/3 md:top-[40%] -translate-y-1/2 flex flex-col font-black text-transparent uppercase pointer-events-none select-none z-0 tracking-tighter"
            style={{
              WebkitTextStroke: "2px rgba(168, 85, 247, 0.15)",
              fontSize: "clamp(6rem, 16vw, 14rem)",
              lineHeight: "0.85"
            }}
          >
            <span>Imagine</span>
            <span>Create</span>
            <span>Build</span>
          </motion.div>


          {/* --- 2. FOREGROUND CONTENT --- */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 flex flex-col items-center text-center px-4 mt-0"
          >
            {/* Top Subheader */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-gray-300 text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8"
            >
              INNOVATION <span className="text-purple-400 mx-1 md:mx-2">•</span> CREATIVITY <span className="text-cyan-400 mx-1 md:mx-2">•</span> TECHNOLOGY
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center mb-6 relative"
            >
              {/* Subtle Glowing Aura Behind Logo */}
              <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-[60px] md:blur-[80px] -z-10 rounded-full pointer-events-none"
              />

              {/* SLRJ Logo Emblem & Rainbow Text */}
              <motion.div 
                animate={{ scale: [1, 1.02, 1], filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2.5 sm:gap-4 md:gap-5 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
              >
                <Image
                  src="/logo.png?v=4"
                  alt="SLRJ Digital Logo"
                  width={140}
                  height={140}
                  unoptimized
                  className="w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 object-contain bg-transparent filter drop-shadow-[0_0_30px_rgba(250,204,21,0.75)]"
                />
                <h1 className="text-[3.5rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9.5rem] font-black tracking-tight flex items-center uppercase leading-none font-brand">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-purple-400 to-purple-700">
                    SL
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-pink-300 via-pink-500 to-fuchsia-700 ml-[-0.05em]">
                    RJ
                  </span>
                </h1>
              </motion.div>

              {/* --- DIGITAL --- */}
              <div className="flex items-center gap-3 sm:gap-6 md:gap-8 mt-3 sm:mt-4 md:mt-6 max-w-full">
                <div className="w-8 sm:w-16 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-purple-400" />
                <motion.span 
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white text-xs sm:text-base md:text-2xl font-bold tracking-[0.5em] sm:tracking-[1em] md:tracking-[1.2em] font-brand drop-shadow-md pl-[0.25em] sm:pl-[0.5em]"
                >
                  DIGITAL
                </motion.span>
                <div className="w-8 sm:w-16 md:w-32 h-[1px] bg-gradient-to-l from-transparent via-cyan-500/50 to-cyan-400" />
              </div>
            </motion.div>
            
            {/* We Imagine. We Create. We Build. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-white text-base sm:text-xl md:text-3xl font-bold tracking-wide mb-3 px-2"
            >
              We Imagine. We Create. We Build.
            </motion.div>
            
            {/* SLRJ Definition, Founder & Co-Founders */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex flex-col items-center gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16 drop-shadow-md px-2"
            >
              {/* SLRJ Definition */}
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-600 font-bold">S<span className="text-gray-400 font-normal">ankalp</span></span>
                <span className="text-purple-400/60">•</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-300 via-purple-400 to-purple-600 font-bold">L<span className="text-gray-400 font-normal">akshya</span></span>
                <span className="text-pink-400/60">•</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-pink-300 via-pink-500 to-fuchsia-600 font-bold">R<span className="text-gray-400 font-normal">achna</span></span>
                <span className="text-cyan-400/60">•</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-700 font-bold">J<span className="text-gray-400 font-normal">osh</span></span>
              </div>

              {/* Thin separator */}
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

              {/* Founder */}
              <div className="flex flex-col items-center gap-1 mt-4">
                <span className="text-purple-400 text-[9px] md:text-xs font-semibold tracking-[0.3em] uppercase">FOUNDED BY</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] text-[11px] md:text-sm lg:text-base font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                  SHAHID KOULURI
                </span>
              </div>

              {/* Co-Founders */}
              <div className="flex flex-col items-center gap-1.5 mt-2">
                <span className="text-cyan-400 text-[9px] md:text-xs font-semibold tracking-[0.3em] uppercase">CREATED WITH OUR TEAM</span>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-gray-300 text-[10px] md:text-sm font-medium tracking-[0.25em] md:tracking-[0.35em] uppercase">
                  <span>Lokeish Pamarthi</span>
                  <motion.div animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-pink-400" />
                  </motion.div>
                  <span>Subhash Kasani</span>
                  <motion.div animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.3, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                    <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-purple-400" />
                  </motion.div>
                  <span>Rupesh Chaluvadi</span>
                  <motion.div animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                    <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-cyan-400" />
                  </motion.div>
                  <span>Jaswanth Pula</span>
                </div>
              </div>
            </motion.div>

            {/* Pulsing Enter Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-6 md:mt-8"
            >
              <motion.button
                onClick={handleExplore}
                whileHover={{ boxShadow: "0px 0px 30px rgba(168,85,247,0.7)", borderColor: "rgba(168,85,247,0.8)" }}
                animate={{ boxShadow: ["0px 0px 0px rgba(168,85,247,0)", "0px 0px 25px rgba(168,85,247,0.4)", "0px 0px 0px rgba(168,85,247,0)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#111]/40 hover:bg-[#1a1a2e]/80 border border-purple-500/30 backdrop-blur-md rounded-full transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-cyan-500/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative text-white font-bold tracking-wider uppercase text-sm">
                  Explore
                </span>
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] overflow-hidden">
                  <div className="relative flex items-center justify-center w-full h-full transform transition-transform duration-500 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                  <div className="absolute flex items-center justify-center w-full h-full transform -translate-x-[150%] translate-y-[150%] transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
