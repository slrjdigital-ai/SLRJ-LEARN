"use client";

import { Target, Eye, Code2, Users } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutContent() {
  const values = [
    { letter: "S", name: "SANKALP", title: "Vision & Determination", desc: "We approach every project with strong determination and a clear vision of success. We don't just write code; we build the future you envision." },
    { letter: "L", name: "LAKSHYA", title: "Goals & Direction", desc: "Every line of code and design decision is aligned with your business goals. We focus on results, growth, and long-term success." },
    { letter: "R", name: "RACHNA", title: "Creation & Innovation", desc: "We embrace creativity and innovation to build unique digital experiences that stand out in the crowded online space." },
    { letter: "J", name: "JOSH", title: "Passion & Energy", desc: "We are passionate about technology and bring high energy to every project. Your success is our ultimate motivation." },
  ];

  return (
    <>
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[purple-600/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-xs md:text-sm font-semibold text-gray-200 tracking-[0.2em] uppercase">Who We Are</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
            Four Values. <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4] animate-[gradient_3s_linear_infinite] bg-[length:200%_auto]">
              One Vision.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            SLRJ Digital is a modern web development agency dedicated to helping businesses establish their online presence, reach more customers, and grow.
          </p>
        </motion.div>
      </section>

      <section className="py-12 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-32">
            <ScrollReveal direction="right">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Our Mission</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  To build high-quality, modern digital experiences that empower businesses to thrive in the digital age. We bridge the gap between complex technology and business growth through scalable, beautiful, and performant solutions.
                </p>
                <div className="flex gap-4 mt-8">
                  {[
                    { icon: Target, color: "#A855F7" },
                    { icon: Eye, color: "#4ECDC4" },
                    { icon: Code2, color: "#A78BFA" },
                    { icon: Users, color: "#F472B6" }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center cursor-default shadow-lg transition-colors duration-300 hover:bg-white/10"
                      style={{ color: item.color }}
                    >
                      <item.icon size={26} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <SpotlightCard 
                spotlightColor="rgba(168, 85, 247, 0.2)"
                className="p-8 md:p-10 relative overflow-hidden group"
              >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />
                 <h3 className="text-2xl font-bold mb-6 relative z-10">Development Philosophy</h3>
                 <ul className="space-y-6 relative z-10">
                   {[
                     "Clean, maintainable, and scalable code.",
                     "User-centric design and intuitive interfaces.",
                     "Performance optimization and SEO readiness.",
                     "Transparent communication and collaborative approach."
                   ].map((item, idx) => (
                     <motion.li 
                       key={idx}
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.3 + (idx * 0.1) }}
                       className="flex items-center gap-4 group/item"
                     >
                       <div className="w-3 h-3 rounded-full bg-purple-500/20 border border-purple-500 shrink-0 group-hover/item:scale-150 transition-transform duration-300 flex items-center justify-center">
                         <div className="w-1 h-1 bg-purple-500 rounded-full" />
                       </div>
                       <p className="text-gray-300 font-medium group-hover/item:text-white transition-colors">{item}</p>
                     </motion.li>
                   ))}
                 </ul>
              </SpotlightCard>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">What SLRJ Stands For</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">The core pillars that drive our engineering and design decisions every single day.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((val, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <SpotlightCard 
                  spotlightColor="rgba(168, 85, 247, 0.15)"
                  className="p-10 relative overflow-hidden group h-full flex flex-col justify-center"
                >
                  <span className="absolute -bottom-4 -right-2 text-[200px] font-black text-white/[0.02] group-hover:text-purple-400/5 transition-colors duration-500 pointer-events-none leading-none select-none">
                    {val.letter}
                  </span>
                  
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black text-xl">
                      {val.letter}
                    </div>
                    <div className="text-purple-400 font-bold tracking-[0.2em]">{val.name}</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-purple-400 transition-colors duration-300">{val.title}</h3>
                  <p className="text-gray-400 leading-relaxed relative z-10 flex-1">{val.desc}</p>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

