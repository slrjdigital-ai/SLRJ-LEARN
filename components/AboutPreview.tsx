"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

export default function AboutPreview() {
  const values = [
    { letter: "S", name: "SANKALP", desc: "Vision & Determination" },
    { letter: "L", name: "LAKSHYA", desc: "Goals & Direction" },
    { letter: "R", name: "RACHNA", desc: "Creation & Innovation" },
    { letter: "J", name: "JOSH", desc: "Passion & Energy" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <ScrollReveal direction="right">
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
              >
                Our Core Values
              </motion.div>
              
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight">
                Four Values.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4] animate-[gradient_3s_linear_infinite] bg-[length:200%_auto]">
                  One Vision.
                </span>
              </h2>
              
              <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-10 leading-relaxed max-w-lg text-gray-400">
                SLRJ Learn is a web development and computer science learning platform built on strong foundational values. We believe in creating premium, modern learning experiences that help developers master engineering skills, build production apps, and achieve their career goals.
              </p>
              
              <Link 
                href="/about" 
                className="group inline-flex items-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 text-white rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] text-sm sm:text-base"
              >
                About SLRJ 
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {values.map((val, idx) => (
              <ScrollReveal key={idx} delay={0.2 + (idx * 0.1)}>
                <SpotlightCard 
                  spotlightColor="rgba(255, 184, 0, 0.2)"
                  className="p-4 sm:p-6 md:p-8 flex flex-col justify-center text-center group h-full"
                >
                  <span className="text-3xl sm:text-5xl md:text-6xl font-black mb-2 sm:mb-4 text-white/10 group-hover:text-purple-400 transition-colors duration-500 scale-95 group-hover:scale-110 drop-shadow-md">
                    {val.letter}
                  </span>
                  <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2 tracking-wider sm:tracking-widest">{val.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">{val.desc}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}



