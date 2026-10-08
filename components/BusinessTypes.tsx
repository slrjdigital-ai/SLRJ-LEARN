"use client";

import { Store, Rocket, ShoppingBag, UserCircle, Building2, Video, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import ScrollReveal from "./ScrollReveal";

export default function BusinessTypes() {
  const businesses = [
    { name: "Local Businesses", icon: Store, color: "#06B6D4", desc: "Shops, restaurants & services that need a strong local digital presence to attract nearby customers." },
    { name: "Startups", icon: Rocket, color: "#FF6B6B", desc: "Launch fast, scale smarter. We build MVPs and full products that grow with your vision." },
    { name: "E-Commerce", icon: ShoppingBag, color: "#4ECDC4", desc: "Online stores & marketplaces built for conversion, performance, and scalability." },
    { name: "Professionals", icon: UserCircle, color: "#A78BFA", desc: "Portfolios & personal brands that make you stand out and win more clients." },
    { name: "Companies", icon: Building2, color: "#60A5FA", desc: "Enterprise-grade solutions with complex integrations, dashboards, and team portals." },
    { name: "Creators", icon: Video, color: "#F472B6", desc: "Content & media platforms built for audiences, monetization, and community." },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            >
              Who We Serve
            </motion.span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              We Help Businesses{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4]">
                  Go Digital
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
              Whether you&apos;re a startup, local business, professional, creator, or growing company —
              we create digital solutions designed around{" "}
              <span className="text-gray-200 font-medium">your goals</span>.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {businesses.map((biz, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <SpotlightCard
                spotlightColor={`${biz.color}25`}
                className="group relative p-8 flex flex-col gap-5 overflow-hidden h-full min-h-[200px]"
              >
                {/* Watermark icon */}
                <div
                  className="absolute -bottom-6 -right-6 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none"
                  style={{ color: biz.color }}
                >
                  <biz.icon size={120} />
                </div>

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, ${biz.color}, transparent)` }}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: `${biz.color}12`,
                    border: `1px solid ${biz.color}25`,
                    boxShadow: `0 0 0px ${biz.color}00`,
                  }}
                >
                  <biz.icon size={32} style={{ color: biz.color }} />
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 25px ${biz.color}40, inset 0 0 20px ${biz.color}10` }}
                  />
                </motion.div>

                {/* Content */}
                <div className="flex-1 relative z-10">
                  <h3
                    className="text-lg font-bold mb-2 transition-colors duration-300"
                    style={{ color: biz.color }}
                  >
                    {biz.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {biz.desc}
                  </p>
                </div>

                {/* Hover CTA */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 relative z-10">
                  <span className="text-xs font-semibold" style={{ color: biz.color }}>Learn More</span>
                  <ArrowRight size={12} style={{ color: biz.color }} />
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom accent */}
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

