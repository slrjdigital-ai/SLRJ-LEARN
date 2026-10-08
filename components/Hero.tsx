"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Hero3DVisual from "./Hero3DVisual";
import PlanetHorizon from "./PlanetHorizon";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-24 sm:pb-32 overflow-hidden bg-[#04020F]">
      {/* ── Subtle Top Brand Ambient Glow (Purple & Cyan) ─────────────── */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.18)_0%,_rgba(6,182,212,0.08)_50%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-[radial-gradient(circle,_rgba(236,72,153,0.12)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      {/* ── Main Container (2 Columns) ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ══════════════════════════════════════════════════════════
              LEFT COLUMN: HEADLINE, DESCRIPTION & BUTTONS
             ══════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left"
          >
            {/* Brand Tagline Micro-badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              <span className="text-xs font-semibold text-purple-300 tracking-wider uppercase">
                Sankalp &bull; Lakshya &bull; Rachna &bull; Josh
              </span>
            </motion.div>

            {/* Main Headline with Website's Signature Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] font-bold tracking-tight leading-[1.08] text-white"
            >
              Turning Ideas Into{" "}
              <span className="block mt-1 sm:mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                Digital Experiences
              </span>
            </motion.h1>

            {/* Subtitle with Color Accents */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300/90 max-w-xl leading-relaxed font-normal"
            >
              We design, develop, and deliver modern digital solutions that help businesses grow.
            </motion.p>

            {/* CTA Buttons with Brand Gradients & Borders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary Button: Start a Project */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] hover:bg-right shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 overflow-hidden"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
                <span className="relative flex items-center gap-2">
                  Start a Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {/* Secondary Button: View Our Work */}
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-cyan-200 hover:text-white bg-[#0A0A1A]/80 hover:bg-cyan-500/10 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT COLUMN: 3D ANIMATED VISUAL (WEBSITE COLOR PALETTE)
             ══════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end relative"
          >
            <Hero3DVisual />
          </motion.div>
        </div>
      </div>

      {/* ── Planetary Horizon Arc at Bottom (Cyber Cosmic Theme) ─────── */}
      <PlanetHorizon />
    </section>
  );
}
