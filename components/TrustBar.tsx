"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Award, Clock, Sparkles } from "lucide-react";

export default function TrustBar() {
  const metrics = [
    {
      icon: Zap,
      value: "100/100",
      label: "Core Web Vitals",
      desc: "Sub-second speed & SEO priority",
      accent: "#06B6D4",
    },
    {
      icon: ShieldCheck,
      value: "99.8%",
      label: "Client Satisfaction",
      desc: "Milestone-verified delivery",
      accent: "#A855F7",
    },
    {
      icon: Award,
      value: "Next 16 & React 19",
      label: "Modern Stack",
      desc: "Zero legacy technical debt",
      accent: "#EC4899",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Support SLA",
      desc: "Direct engineer communication",
      accent: "#10B981",
    },
  ];

  const partners = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "Framer Motion",
    "Stripe",
    "Vercel",
    "Supabase",
    "AWS Cloud",
    "PostgreSQL",
    "OpenAI",
  ];

  return (
    <section className="relative py-12 bg-[#04020F] border-b border-white/5 overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[150px] bg-gradient-to-r from-purple-600/10 via-pink-600/5 to-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── 4 Authority Metrics Grid ──────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                  style={{
                    backgroundColor: `${item.accent}15`,
                    border: `1px solid ${item.accent}30`,
                    color: item.accent,
                  }}
                >
                  <item.icon size={18} />
                </div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={10} style={{ color: item.accent }} />
                  Verified
                </span>
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white font-brand tracking-tight mb-0.5">
                  {item.value}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-gray-200">
                  {item.label}
                </p>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Technology Partners & Ecosystem Ticker ────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gray-400 flex-shrink-0 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            ENGINEERED WITH MODERN STANDARDS
          </span>

          {/* Marquee ticker */}
          <div className="w-full sm:w-auto overflow-hidden relative mask-radial">
            <motion.div
              animate={{ x: [0, -400] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-6 whitespace-nowrap will-change-transform"
            >
              {[...partners, ...partners].map((partner, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors cursor-default font-mono flex items-center gap-2"
                >
                  <span className="text-purple-500/60">•</span>
                  {partner}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
