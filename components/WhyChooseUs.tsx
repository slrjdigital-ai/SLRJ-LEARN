"use client";

import { motion } from "framer-motion";
import { Target, Smartphone, Sparkles, Search, Headphones, TrendingUp } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import ScrollReveal from "./ScrollReveal";

const ticker = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Vercel", "Figma", "GraphQL", "REST API"];

export default function WhyChooseUs() {
  const features = [
    {
      icon: Target,
      title: "Custom Solutions",
      desc: "We build around your actual business goals without generic templates. Every decision is intentional and tailored.",
      gradient: "from-[#FF6B35] to-[#F7931E]",
      accent: "#FF6B35",
    },
    {
      icon: Sparkles,
      title: "Modern Technology",
      desc: "Engineered with modern, reliable stacks like Next.js 16, React 19, TypeScript, and clean component systems.",
      gradient: "from-[#FF007A] to-[#7000FF]",
      accent: "#FF007A",
    },
    {
      icon: Search,
      title: "Transparent Process",
      desc: "Clear milestones, honest timelines, regular preview links, and collaborative communication throughout the build.",
      gradient: "from-[#00FF87] to-[#00B8FF]",
      accent: "#00FF87",
    },
    {
      icon: TrendingUp,
      title: "Performance Focused",
      desc: "Built for speed, clean architecture, search visibility, and smooth interactions from the ground up.",
      gradient: "from-[#9D00FF] to-[#FF00E5]",
      accent: "#9D00FF",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      desc: "Your website works reliably across mobile phones, tablets, laptops, and desktop displays.",
      gradient: "from-[#00E5FF] to-[#007AFF]",
      accent: "#00E5FF",
    },
    {
      icon: Headphones,
      title: "Long-Term Support",
      desc: "Direct communication with our engineering team, maintenance options, and code that scales as you grow.",
      gradient: "from-[#FF4D4D] to-[#FF0000]",
      accent: "#FF4D4D",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-purple-500/8 via-pink-500/8 to-purple-500/8 blur-[150px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            >
              Why Work With SLRJ?
            </motion.span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              Built with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-pink-500 to-cyan-500">
                Purpose &amp; Clarity
              </span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
              We design and develop digital experiences with honest communication, modern code, and
              <span className="text-white font-medium"> client-focused dedication</span>.
            </p>
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <SpotlightCard
                spotlightColor={`${feat.accent}25`}
                className="group relative p-8 rounded-3xl overflow-hidden cursor-default h-full flex flex-col"
              >
                {/* Dashboard number watermark */}
                <span
                  className="absolute -top-4 -right-2 text-[130px] font-black pointer-events-none select-none leading-none transition-all duration-500"
                  style={{ color: `${feat.accent}06` }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Top gradient accent line — always subtly visible */}
                <div
                  className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${feat.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`relative w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feat.gradient} text-white mb-6 shadow-lg`}
                  style={{ boxShadow: `0 8px 25px ${feat.accent}30` }}
                >
                  <feat.icon size={26} />
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${feat.accent}50` }}
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed relative z-10 flex-1">
                  {feat.desc}
                </p>

                {/* Status badge */}
                <div className="mt-6 flex items-center gap-2 relative z-10 border-t border-white/5 pt-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">Active</span>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 relative overflow-hidden border-y border-white/5 py-5">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#04020F] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#04020F] to-transparent z-10 pointer-events-none" />
            <div
              className="flex gap-0 w-max"
              style={{ animation: "marquee 25s linear infinite" }}
            >
              {[...ticker, ...ticker, ...ticker].map((tech, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap text-xs font-semibold text-gray-600 uppercase tracking-[0.3em] px-8 border-r border-white/5 last:border-none hover:text-purple-400 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

