"use client";

import Link from "next/link";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import * as motion from "framer-motion/client";
import SpotlightCard from "./SpotlightCard";
import ScrollReveal from "./ScrollReveal";

const cardColors = [
  { accent: "#A855F7", bg: "from-[#A855F7]/10 to-[#7C3AED]/5" },
  { accent: "#4ECDC4", bg: "from-[#4ECDC4]/10 to-[#2AB7A9]/5" },
  { accent: "#A78BFA", bg: "from-[#A78BFA]/10 to-[#7C5FD3]/5" },
  { accent: "#F472B6", bg: "from-[#F472B6]/10 to-[#E04899]/5" },
  { accent: "#60A5FA", bg: "from-[#60A5FA]/10 to-[#3B82F6]/5" },
  { accent: "#FF6B6B", bg: "from-[#FF6B6B]/10 to-[#E04848]/5" },
];

export default function Services() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
          >
            Our Services
          </motion.span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 leading-tight">
            What We{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4]">
                Build
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent origin-left"
              />
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
            Digital solutions built for <span className="text-cyan-400 font-medium">growth</span>. From concept to launch, we craft every pixel with purpose.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const color = cardColors[idx % cardColors.length];
            return (
              <ScrollReveal key={service.id} delay={idx * 0.1}>
                <SpotlightCard
                  spotlightColor={`${color.accent}20`}
                  className="group flex flex-col p-8 h-full transition-all duration-300 hover:border-white/10"
                >
                {/* Decorative corner accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${color.accent}15 0%, transparent 70%)`,
                  }}
                />

                {/* Number tag */}
                <span
                  className="absolute top-6 right-6 text-5xl font-black opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none select-none"
                  style={{ color: color.accent }}
                >
                  0{idx + 1}
                </span>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                  style={{
                    backgroundColor: `${color.accent}10`,
                    border: `1px solid ${color.accent}20`,
                  }}
                >
                  <service.icon size={28} style={{ color: color.accent }} />
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 25px ${color.accent}25` }}
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors relative z-10">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-5 flex-grow leading-relaxed relative z-10">
                  {service.description}
                </p>

                {/* Deliverables */}
                {(service as any).deliverables && (
                  <div className="mb-8 border-t border-white/5 pt-4">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">Key Deliverables</p>
                    <p className="text-sm text-gray-300">{(service as any).deliverables}</p>
                  </div>
                )}

                {/* CTA Link */}
                <Link
                  href={service.link}
                  className="inline-flex items-center text-sm font-semibold mt-auto relative z-10 transition-all group/link"
                  style={{ color: color.accent }}
                >
                  <span className="group-hover/link:mr-1 transition-all">Inquire</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{
                    background: `linear-gradient(to right, ${color.accent}, transparent)`,
                  }}
                />
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 mx-auto w-48 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        />
      </div>
    </section>
  );
}

