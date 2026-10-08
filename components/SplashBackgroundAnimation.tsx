"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  phase: number;
  isShimmer: boolean;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SplashBackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  // ── Canvas Particle Engine (60 FPS, Low CPU) ────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Neon palette matching brand: Cyan, Purple, Magenta, Shimmer White
    const palette = [
      { color: "56, 189, 248", glow: "rgba(56, 189, 248, 0.8)" },  // Cyan
      { color: "168, 85, 247", glow: "rgba(168, 85, 247, 0.8)" }, // Purple
      { color: "236, 72, 153", glow: "rgba(236, 72, 153, 0.8)" }, // Magenta
      { color: "255, 255, 255", glow: "rgba(255, 255, 255, 0.9)" }, // White shimmer
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      const isMobile = width < 768;
      // On mobile: significantly reduced count (10-12 dots) so screen feels clean and minimal
      const particleCount = isMobile ? 11 : Math.min(48, Math.floor((width * height) / 25000) + 15);
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        // On mobile, only 1 or 2 rare shimmering stars, rest are soft ambient dots
        const isShimmer = isMobile ? (i === 0 || i === 6) : Math.random() < 0.2;
        const col = isShimmer ? palette[3] : palette[Math.floor(Math.random() * 3)];
        const baseAlpha = isMobile
          ? (isShimmer ? 0.35 : 0.18 + Math.random() * 0.25)
          : (isShimmer ? 0.3 + Math.random() * 0.4 : 0.2 + Math.random() * 0.5);

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: isMobile
            ? (isShimmer ? 1.3 : 0.8 + Math.random() * 1.0)
            : (isShimmer ? 1.5 + Math.random() * 2 : 1 + Math.random() * 2.5),
          vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3),
          vy: isMobile ? -0.12 - Math.random() * 0.2 : -0.2 - Math.random() * 0.45, // Gentle float
          color: col.color,
          glowColor: col.glow,
          alpha: baseAlpha,
          baseAlpha,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          phase: Math.random() * Math.PI * 2,
          isShimmer,
        });
      }
    };

    initParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener("resize", handleResize);

    if (prefersReducedMotion) {
      // Draw static particles once if reduced motion requested
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha})`;
        ctx.fill();
      });
      return () => window.removeEventListener("resize", handleResize);
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx + Math.sin(time + p.phase) * 0.15;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Pulse alpha
        p.alpha = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.25;
        const currentAlpha = Math.max(0.05, Math.min(1, p.alpha));

        // Draw particle glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = p.isShimmer ? 12 : 8;
        ctx.fill();

        // Shimmer cross flare for special specks
        if (p.isShimmer && currentAlpha > 0.45) {
          const flareLen = p.size * 3.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.7})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x - flareLen, p.y);
          ctx.lineTo(p.x + flareLen, p.y);
          ctx.moveTo(p.x, p.y - flareLen);
          ctx.lineTo(p.x, p.y + flareLen);
          ctx.stroke();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ── 1. Deep Midnight Navy & Black Gradient Canvas ───────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 35%, #0B0826 0%, #050314 45%, #020108 100%)
          `,
        }}
      />

      {/* ── 2. Volumetric Light Beams (Radiating from behind emblem) ── */}
      {!prefersReducedMotion && (
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1100px] h-[750px] sm:h-[1100px] opacity-40 mix-blend-screen pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
            style={{
              background: `
                conic-gradient(
                  from 0deg at 50% 50%,
                  transparent 0deg,
                  rgba(168, 85, 247, 0.22) 18deg,
                  transparent 40deg,
                  rgba(6, 182, 212, 0.2) 65deg,
                  transparent 90deg,
                  rgba(236, 72, 153, 0.18) 120deg,
                  transparent 150deg,
                  rgba(168, 85, 247, 0.22) 180deg,
                  transparent 210deg,
                  rgba(6, 182, 212, 0.2) 245deg,
                  transparent 270deg,
                  rgba(236, 72, 153, 0.18) 305deg,
                  transparent 335deg,
                  rgba(168, 85, 247, 0.22) 360deg
                )
              `,
              maskImage: "radial-gradient(circle at center, black 0%, black 25%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 25%, transparent 70%)",
            }}
          />
        </div>
      )}

      {/* ── 3. Flowing Aurora Waves (Purple, Cyan, Magenta) ──────────── */}
      {!prefersReducedMotion ? (
        <>
          {/* Aurora Wave 1: Purple Ambient Wave */}
          <motion.div
            animate={{
              x: [-40, 50, -40],
              y: [-30, 40, -30],
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[100px] opacity-35 mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(124, 58, 237, 0.2) 50%, transparent 70%)",
            }}
          />

          {/* Aurora Wave 2: Electric Cyan Wave */}
          <motion.div
            animate={{
              x: [50, -35, 50],
              y: [30, -40, 30],
              scale: [1.1, 0.95, 1.1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] -right-[15%] w-[50vw] h-[50vw] rounded-full blur-[95px] opacity-30 mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(14, 165, 233, 0.18) 50%, transparent 70%)",
            }}
          />

          {/* Aurora Wave 3: Magenta Floating Wave */}
          <motion.div
            animate={{
              x: [-20, 30, -20],
              y: [40, -20, 40],
              scale: [0.95, 1.1, 0.95],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="absolute -bottom-[20%] left-[25%] w-[55vw] h-[55vw] rounded-full blur-[90px] opacity-25 mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 70%)",
            }}
          />
        </>
      ) : (
        /* Static fallback for reduced motion */
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(168,85,247,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 40%, rgba(6,182,212,0.25) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(236,72,153,0.2) 0%, transparent 50%)
            `,
          }}
        />
      )}



      {/* ── 5. Subtle Digital Cyber Grid Floor ──────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45vh] overflow-hidden pointer-events-none"
        style={{ perspective: "500px" }}
      >
        <motion.div
          animate={!prefersReducedMotion ? { opacity: [0.2, 0.45, 0.2] } : { opacity: 0.3 }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full origin-bottom"
          style={{
            transform: "rotateX(68deg)",
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.16) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(168, 85, 247, 0.16) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(to top, black 25%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to top, black 25%, transparent 85%)",
          }}
        />
      </div>

      {/* ── 6. Slow-Moving Background Cosmic Light Streaks ──────────── */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Light Streak 1: Cyan/Purple */}
          <motion.div
            animate={{
              x: ["-50vw", "120vw"],
              y: ["-20vh", "90vh"],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 3.5,
            }}
            className="absolute w-[240px] h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rotate-[32deg] shadow-[0_0_12px_#38bdf8]"
          />

          {/* Light Streak 2: Purple/Magenta (Desktop only) */}
          <motion.div
            animate={{
              x: ["110vw", "-40vw"],
              y: ["10vh", "80vh"],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
              repeatDelay: 4,
            }}
            className="hidden sm:block absolute w-[200px] h-[1.5px] bg-gradient-to-r from-transparent via-purple-400 to-transparent -rotate-[28deg] shadow-[0_0_12px_#c084fc]"
          />
        </div>
      )}

      {/* ── 7. Interactive Canvas Neon Particles & Twinkling Specks ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      />
    </div>
  );
}
