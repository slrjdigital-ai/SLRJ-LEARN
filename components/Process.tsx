"use client";

import { motion } from "framer-motion";
import { Compass, Palette, Code2, FlaskConical, Rocket, TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function Process() {
  const steps = [
    { icon: Compass, title: "Discover", desc: "We dive deep into your business goals. You share your vision, and we map out the strategy together.", color: "#A855F7" },
    { icon: Palette, title: "Design", desc: "We create interactive prototypes. You review and approve the aesthetics before we write a single line of code.", color: "#A78BFA" },
    { icon: Code2, title: "Develop", desc: "Our team builds the site using modern tech. We keep you updated with preview links as it comes to life.", color: "#60A5FA" },
    { icon: FlaskConical, title: "Test", desc: "We perform exhaustive QA and you do the final walkthrough to ensure everything is flawless.", color: "#4ECDC4" },
    { icon: Rocket, title: "Launch", desc: "We handle the technical deployment and SEO setup, ensuring a smooth public release.", color: "#FF6B6B" },
    { icon: TrendingUp, title: "Grow", desc: "Post-launch support and analytics tracking to continually refine and scale your success.", color: "#F472B6" },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[150px] pointer-events-none" />

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
              Our Process
            </motion.span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              From Idea to{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4]">
                  Launch
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
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
              A streamlined six-step journey that takes your vision from{" "}
              <span className="text-white font-medium">concept to reality</span>.
            </p>
          </div>
        </ScrollReveal>

        {/* Process Steps — Dashboard timeline style */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[2px] pointer-events-none z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              className="w-full h-full bg-gradient-to-r from-[#A855F7]/40 via-[#A78BFA]/40 via-[#60A5FA]/40 via-[#4ECDC4]/40 via-[#FF6B6B]/40 to-[#F472B6]/40 origin-left"
            />
          </div>

          {/* Vertical line — mobile */}
          <div className="lg:hidden absolute top-0 bottom-0 left-[39px] w-[2px] bg-gradient-to-b from-[#A855F7]/20 via-[#A78BFA]/20 to-[#F472B6]/20 pointer-events-none z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative flex lg:flex-col items-start lg:items-center text-left lg:text-center group"
              >
                {/* Step Circle */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="relative z-10 flex-shrink-0 w-[80px] h-[80px] lg:w-[104px] lg:h-[104px] rounded-full flex items-center justify-center mb-0 lg:mb-6 mr-5 lg:mr-0 transition-all duration-300"
                  style={{
                    background: `radial-gradient(circle, ${step.color}12 0%, transparent 70%)`,
                    border: `2px solid ${step.color}30`,
                  }}
                >
                  <div
                    className="w-[52px] h-[52px] lg:w-[64px] lg:h-[64px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <step.icon size={26} style={{ color: step.color }} />
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${step.color}30, inset 0 0 15px ${step.color}10` }}
                  />

                  {/* Step number badge */}
                  <div
                    className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: step.color, boxShadow: `0 0 10px ${step.color}60` }}
                  >
                    {idx + 1}
                  </div>
                </motion.div>

                {/* Text */}
                <div className="flex flex-col lg:items-center">
                  <h3
                    className="text-lg font-bold mb-2 tracking-wide"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed max-w-[180px]">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 mx-auto w-48 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        />
      </div>
    </section>
  );
}


