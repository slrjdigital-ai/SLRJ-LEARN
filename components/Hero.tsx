"use client";

import Link from "next/link";
import { ArrowRight, Code, Sparkles, Zap, Target, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SpotlightCard from "./SpotlightCard";



/* ─── Typing effect ────────────────────────────────────────────────────── */
function TypedText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => i + 1);
    }

    return () => clearTimeout(timer);
  }, [displayed, deleting, index, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4] animate-[gradient_3s_linear_infinite] bg-[length:200%_auto]">
      {displayed}
      <span className="animate-pulse text-purple-400">|</span>
    </span>
  );
}

/* ─── Floating badge ─────────────────────────────────────────────────────── */
function FloatingBadge({
  children,
  className,
  delay = 0,
  x = 0,
  y = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [y, y - 10, y] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { delay, duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`absolute hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl border backdrop-blur-xl text-sm font-semibold pointer-events-none select-none ${className}`}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const features = [
    { icon: Code,     title: "Development", desc: "High-performance React & Next.js architectures",      accent: "#A855F7" },
    { icon: Sparkles, title: "Design", desc: "Premium, futuristic and accessible aesthetics",       accent: "#EC4899" },
    { icon: Zap,      title: "Performance", desc: "Lightning-fast speeds and optimized SEO",      accent: "#06B6D4" },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* ── Floating decorative badges ─────────────────────────────────── */}
      <FloatingBadge
        className="top-[22%] left-[7%] bg-black/20 backdrop-blur-md border-purple-500/20 text-purple-400 shadow-none"
        delay={1.2}
        y={0}
      >
        <Target size={14} className="text-purple-400" />
        Data-Driven Strategy
      </FloatingBadge>

      <FloatingBadge
        className="top-[18%] right-[7%] bg-black/20 backdrop-blur-md border-emerald-500/20 text-emerald-400 shadow-none"
        delay={1.5}
        y={-10}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        Available for Projects
      </FloatingBadge>

      <FloatingBadge
        className="bottom-[32%] left-[5%] bg-black/20 backdrop-blur-md border-cyan-500/20 text-cyan-400 shadow-none"
        delay={1.8}
        y={5}
      >
        <Layers size={14} />
        Scalable Architecture
      </FloatingBadge>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center"
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-md mb-6 sm:mb-8 max-w-[95vw]"
        >
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
          <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-200 tracking-wider sm:tracking-[0.2em] uppercase truncate sm:whitespace-normal">
            Sankalp &bull; Lakshya &bull; Rachna &bull; Josh
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 sm:mb-6 max-w-full"
        >
          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.08] sm:leading-[1.05] mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">
              We Build Digital Experiences
            </span>
          </h1>
          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.08] sm:leading-[1.05]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4] animate-[gradient_3s_linear_infinite] bg-[length:200%_auto]">
              That Inspire.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0"
        >
          We engineer stunning, high-performance digital experiences rooted in{" "}
          <span className="text-purple-300 font-medium">determination</span>,{" "}
          <span className="text-cyan-300 font-medium">goals</span>,{" "}
          <span className="text-pink-300 font-medium">creation</span>, and{" "}
          <span className="text-emerald-300 font-medium">passion</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-14 sm:mb-20"
        >
          <Link
            href="/contact"
            className="group relative w-full sm:w-auto px-7 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_45px_rgba(168,85,247,0.55)] flex items-center justify-center gap-2"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
            <span className="relative">Start a Project</span>
            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/projects"
            className="group w-full sm:w-auto px-7 sm:px-10 py-3.5 sm:py-4 bg-transparent border border-white/15 text-white hover:bg-white/5 hover:border-cyan-400/30 rounded-full font-medium text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            Explore Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-60" />
          </Link>
        </motion.div>

        {/* Feature Highlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
        >
          {features.map((feature, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor={`${feature.accent}30`}
              className="p-6 flex flex-col items-center text-center group"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
                style={{ background: `linear-gradient(to right, transparent, ${feature.accent}, transparent)` }}
              />

              <motion.div
                whileHover={{ scale: 1.15, rotate: 8 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
                style={{
                  backgroundColor: `${feature.accent}15`,
                  border: `1px solid ${feature.accent}30`,
                  boxShadow: `0 0 20px ${feature.accent}20`,
                  color: feature.accent,
                }}
              >
                <feature.icon size={24} />
              </motion.div>
              <h3 className="text-white font-bold mb-1.5 text-lg">{feature.title}</h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{feature.desc}</p>
            </SpotlightCard>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <span className="text-[11px] text-gray-600 uppercase tracking-widest font-semibold">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-purple-500/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}


