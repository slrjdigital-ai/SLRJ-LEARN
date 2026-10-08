"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Palette, ShoppingBag, Award, Sparkles, TrendingUp } from "lucide-react";

export default function Hero3DVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for buttery 3D parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D rotations based on mouse position + base isometric angles
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [18, 4]); // Base around ~11deg
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-24, -8]); // Base around -16deg
  const translateZ = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[620px] h-[440px] sm:h-[540px] md:h-[580px] flex items-center justify-center select-none scale-[0.8] xs:scale-[0.88] sm:scale-100 origin-center transition-transform"
      style={{ perspective: 1200 }}
    >
      {/* ── Background Cosmic Glow / Lens Flare (Purple & Cyan Brand Colors) ─ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Core Purple/Cyan light flare */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.75, 0.95, 0.75],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.45)_0%,_rgba(6,182,212,0.22)_45%,_transparent_75%)] blur-2xl"
        />

        {/* Pink accent halo */}
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.35)_0%,_transparent_70%)] blur-2xl"
        />

        {/* Purple & Cyan light rays */}
        <div className="absolute w-[450px] sm:w-[650px] h-[100px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent rotate-[30deg] blur-xl opacity-75" />
        <div className="absolute w-[400px] sm:w-[550px] h-[80px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent -rotate-[22deg] blur-lg opacity-70" />

        {/* Anamorphic horizontal flare streak */}
        <div className="absolute top-[42%] right-[25%] w-[380px] h-[2px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent blur-[1px] opacity-85" />

        {/* Bright pinpoint flare center */}
        <motion.div
          animate={{
            scale: [0.9, 1.3, 0.9],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[38%] right-[32%] w-16 h-16 rounded-full bg-cyan-300 blur-md opacity-90"
        />
        <div className="absolute top-[40%] right-[34%] w-3.5 h-3.5 rounded-full bg-white blur-[1px] shadow-[0_0_20px_#38bdf8]" />
      </div>

      {/* ── Floating Brand-Colored Dust Particles ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "20%", y: "25%", size: 3, delay: 0, duration: 5, color: "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" },
          { x: "45%", y: "15%", size: 2, delay: 1.2, duration: 6, color: "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" },
          { x: "80%", y: "30%", size: 3.5, delay: 0.5, duration: 4.5, color: "bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.8)]" },
          { x: "70%", y: "75%", size: 2.5, delay: 2, duration: 5.5, color: "bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" },
          { x: "30%", y: "80%", size: 2, delay: 1.5, duration: 6.5, color: "bg-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.8)]" },
          { x: "85%", y: "60%", size: 3, delay: 0.8, duration: 4.8, color: "bg-pink-300 shadow-[0_0_8px_rgba(236,72,153,0.8)]" },
        ].map((p, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -25, 0],
              opacity: [0.25, 0.85, 0.25],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full ${p.color}`}
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* ── 3D Isometric / Perspective Container ──────────────────────── */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Continuous breathing / floating oscillation */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* ══════════════════════════════════════════════════════════
              LEFT SIDE OF CLUSTER: 3 STACKED SERVICE CARDS
             ══════════════════════════════════════════════════════════ */}
          <div
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 sm:gap-4 w-[220px] sm:w-[260px] md:w-[290px] z-20"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card 1: Web Development (Purple Accent) */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0,
              }}
              whileHover={{
                scale: 1.04,
                translateZ: 30,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative p-3.5 sm:p-4 rounded-2xl bg-[#09071c]/90 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400/80 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_35px_rgba(168,85,247,0.35)] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Top ambient purple light strip */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/70 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3 sm:gap-3.5">
                {/* Purple Outlined Icon Box */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center flex-shrink-0 text-purple-400 group-hover:text-purple-300 group-hover:border-purple-400 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                  <Code2 className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base tracking-wide group-hover:text-purple-200 transition-colors">
                    Web Development
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400/90 truncate mt-0.5 font-normal">
                    Next.js, React & modern web apps
                  </p>
                </div>
              </div>

              {/* Corner sparkle */}
              <div className="absolute bottom-2 right-2 text-purple-400/20 group-hover:text-purple-400/60 transition-colors">
                <Sparkles size={12} />
              </div>
            </motion.div>

            {/* Card 2: UI/UX Design (Pink Accent) */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              whileHover={{
                scale: 1.04,
                translateZ: 30,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative p-3.5 sm:p-4 rounded-2xl bg-[#09071c]/90 backdrop-blur-xl border border-pink-500/30 hover:border-pink-400/80 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(236,72,153,0.15)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_35px_rgba(236,72,153,0.35)] transition-all duration-300 cursor-pointer overflow-hidden ml-2 sm:ml-4"
            >
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-pink-400/70 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-pink-500/15 border border-pink-500/40 flex items-center justify-center flex-shrink-0 text-pink-400 group-hover:text-pink-300 group-hover:border-pink-400 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300">
                  <Palette className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base tracking-wide group-hover:text-pink-200 transition-colors">
                    UI/UX Design
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400/90 truncate mt-0.5 font-normal">
                    Futuristic & engaging interfaces
                  </p>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 text-pink-400/20 group-hover:text-pink-400/60 transition-colors">
                <Sparkles size={12} />
              </div>
            </motion.div>

            {/* Card 3: E-Commerce Solutions (Cyan Accent) */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              whileHover={{
                scale: 1.04,
                translateZ: 30,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative p-3.5 sm:p-4 rounded-2xl bg-[#09071c]/90 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_35px_rgba(6,182,212,0.35)] transition-all duration-300 cursor-pointer overflow-hidden ml-1 sm:ml-2"
            >
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300">
                  <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base tracking-wide group-hover:text-cyan-200 transition-colors">
                    E-Commerce Solutions
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400/90 truncate mt-0.5 font-normal">
                    High-converting online store experiences
                  </p>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 text-cyan-400/20 group-hover:text-cyan-400/60 transition-colors">
                <Sparkles size={12} />
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              TOP RIGHT: FLOATING GROWTH CHART WITH UPWARD CYAN/PURPLE ARROW
             ══════════════════════════════════════════════════════════ */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotateZ: [0, -1.5, 0],
            }}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            whileHover={{ scale: 1.05, translateZ: 40 }}
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(15px)",
            }}
            className="absolute right-6 sm:right-10 md:right-14 top-4 sm:top-8 w-[160px] sm:w-[190px] md:w-[210px] p-3 sm:p-3.5 rounded-2xl bg-[#09071c]/80 backdrop-blur-xl border border-cyan-500/35 hover:border-cyan-400/70 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.2)] z-10"
          >
            {/* Ambient edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

            {/* Growth Chart Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-300/90 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp size={12} className="text-cyan-400" />
                Performance
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                Optimized
              </span>
            </div>

            {/* SVG Brand Growth Chart with Upward Arrow */}
            <div className="relative w-full h-[70px] sm:h-[80px]">
              <svg
                viewBox="0 0 160 80"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Brand gradient for curve */}
                  <linearGradient id="chartBrandCurve" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="50%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>

                  {/* Gradient fill under curve */}
                  <linearGradient id="chartBrandFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                  </linearGradient>

                  {/* Filter for cyan/purple glow */}
                  <filter id="brandChartGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Filled Area */}
                <path
                  d="M 5,75 Q 40,65 75,50 T 130,22 L 142,12 L 142,75 Z"
                  fill="url(#chartBrandFill)"
                />

                {/* Background Grid Lines */}
                <line x1="5" y1="25" x2="145" y2="25" stroke="rgba(6,182,212,0.12)" strokeDasharray="3 3" />
                <line x1="5" y1="50" x2="145" y2="50" stroke="rgba(168,85,247,0.12)" strokeDasharray="3 3" />

                {/* Glowing Main Curve */}
                <path
                  d="M 5,75 Q 40,65 75,50 T 132,22"
                  fill="none"
                  stroke="url(#chartBrandCurve)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#brandChartGlow)"
                />

                {/* Bold Arrow Head pointing up-right */}
                <polygon
                  points="154,6 135,11 142,16 148,24"
                  fill="#06B6D4"
                  filter="url(#brandChartGlow)"
                />
              </svg>

              {/* Pulsing beacon on arrow tip */}
              <motion.div
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.9, 0, 0.9],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1 right-2 w-3 h-3 rounded-full bg-cyan-300 blur-[1px]"
              />
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT FOREGROUND: 3D FLOATING SMARTPHONE MOCKUP
             ══════════════════════════════════════════════════════════ */}
          <motion.div
            animate={{
              y: [0, 9, 0],
              rotateZ: [2, 0.5, 2],
            }}
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            whileHover={{ scale: 1.04, translateZ: 50 }}
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(35px)",
            }}
            className="absolute right-3 sm:right-6 md:right-10 bottom-6 sm:bottom-10 w-[170px] sm:w-[195px] md:w-[215px] h-[310px] sm:h-[350px] md:h-[380px] rounded-[2.6rem] p-2 sm:p-2.5 bg-gradient-to-br from-[#1E1B4B] via-[#0F0D24] to-[#04020F] border-2 border-purple-500/40 shadow-[0_25px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(168,85,247,0.3)] z-30 cursor-pointer overflow-hidden group"
          >
            {/* Phone Screen Outer */}
            <div className="relative w-full h-full rounded-[2.1rem] bg-[#070514] p-3 flex flex-col justify-between overflow-hidden border border-white/5">
              {/* Dynamic Island / Speaker Pill */}
              <div className="w-16 h-3.5 bg-black rounded-full mx-auto flex items-center justify-end px-2 border border-white/5 flex-shrink-0 z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              </div>

              {/* Screen Content: 2 Luxury Feature Mini Cards */}
              <div className="flex flex-col gap-3 my-auto z-10">
                {/* Mini Card 1 (Purple Theme) */}
                <div className="p-2.5 rounded-xl bg-[#0F0C24]/90 border border-purple-500/30 shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <ShoppingBag size={15} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                    <div className="h-1.5 w-10 bg-white/20 rounded-full" />
                  </div>
                </div>

                {/* Mini Card 2 (Cyan Theme) */}
                <div className="p-2.5 rounded-xl bg-[#0F0C24]/90 border border-cyan-500/30 shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Award size={15} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                    <div className="h-1.5 w-12 bg-white/20 rounded-full" />
                  </div>
                </div>

                {/* Mini Metric Banner */}
                <div className="mt-1 px-2.5 py-1.5 rounded-lg bg-purple-500/10 border border-cyan-500/20 flex items-center justify-between text-[10px]">
                  <span className="text-gray-300 font-medium">UX Flow</span>
                  <span className="text-cyan-400 font-bold">Streamlined</span>
                </div>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-14 h-1 bg-white/20 rounded-full mx-auto flex-shrink-0 z-20" />

              {/* Glass Sheen / Gloss reflection streak across screen */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500 rotate-12 scale-150" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
