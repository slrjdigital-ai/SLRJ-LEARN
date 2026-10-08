"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Rocket, Globe, Code } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

export default function ContactCTA() {
  const floatingIcons = [
    { Icon: Rocket, top: "15%", left: "10%", delay: 0, color: "#A855F7" },
    { Icon: Globe, top: "20%", right: "15%", delay: 0.2, color: "#06B6D4" },
    { Icon: Code, bottom: "25%", left: "15%", delay: 0.4, color: "#EC4899" },
    { Icon: Sparkles, bottom: "20%", right: "10%", delay: 0.6, color: "#10B981" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <SpotlightCard 
          spotlightColor="rgba(168, 85, 247, 0.25)"
          className="relative py-12 px-5 sm:py-16 sm:px-10 md:py-20 md:px-16 rounded-3xl sm:rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none bg-gradient-to-r from-purple-600/10 via-pink-500/8 to-cyan-500/10" />

          {/* Floating Icons */}
          {floatingIcons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ 
                y: ["-10px", "10px", "-10px"],
                rotate: [-5, 5, -5]
              }}
              style={{
                position: "absolute",
                top: item.top,
                bottom: item.bottom,
                left: item.left,
                right: item.right,
                color: item.color,
                boxShadow: `0 0 20px ${item.color}25`
              }}
              transition={{
                opacity: { delay: item.delay, duration: 0.8 },
                scale: { delay: item.delay, duration: 0.8 },
                y: { duration: 3 + idx, repeat: Infinity, ease: "easeInOut", delay: item.delay + 0.8 },
                rotate: { duration: 4 + idx, repeat: Infinity, ease: "easeInOut", delay: item.delay + 0.8 },
              }}
              className="hidden md:flex p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl pointer-events-none"
            >
              <item.Icon size={28} />
            </motion.div>
          ))}

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight relative z-10"
          >
            Ready to take your business <br className="hidden sm:block" />
            <span className="relative inline-block mt-1 sm:mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4] animate-[gradient_3s_linear_infinite] bg-[length:200%_auto]">
                online?
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-2 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-purple-500 to-transparent origin-center"
              />
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed px-2"
          >
            Tell us about your business and let&apos;s build a digital experience that works for you. Elevate your brand today.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-10 inline-block w-full sm:w-auto"
          >
            <Link 
              href="/contact" 
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-7 sm:px-10 py-3.5 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
            >
              {/* Button sweep effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
              
              <span className="relative flex items-center">
                Start a Project
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </SpotlightCard>
      </div>
    </section>
  );
}
