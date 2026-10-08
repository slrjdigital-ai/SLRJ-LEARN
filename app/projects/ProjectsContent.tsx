"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, TrendingUp, X, CheckCircle2, Sparkles, Code2, ArrowRight } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import * as motion from "framer-motion/client";
import { AnimatePresence } from "framer-motion";

export default function ProjectsContent() {
  const [filter, setFilter] = useState("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  
  const categories = ["All", "Business Website", "E-Commerce", "Web Apps", "UI/UX"];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <>
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 bg-transparent grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-4 backdrop-blur-md">
            Architectural Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 font-brand">
            Engineered With <span className="gold-gradient-text">Precision.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-12">
            Explore our architectural blueprints, production prototypes, and high-performance digital systems.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filter === cat 
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105" 
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-transparent min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                key={project.id} 
                className="glass-card group overflow-hidden flex flex-col justify-between border border-white/10 hover:border-purple-500/40 transition-all duration-300"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#0A0D14] relative overflow-hidden flex items-center justify-center border-b border-white/5">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill
                      className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-108 transition-all duration-700" 
                    />
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-10 duration-300">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.6)] scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ExternalLink size={20} />
                      </div>
                    </a>
                    
                    <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-300 z-20 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      Production Prototype
                    </span>

                    <span className="absolute top-4 right-4 bg-purple-900/70 backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-full border border-purple-400/30 text-purple-200 z-20 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors font-brand">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                    
                    {project.metric && (
                      <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300 flex items-center gap-2">
                        <TrendingUp size={14} className="text-emerald-400 shrink-0" />
                        <span>{project.metric}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-auto">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold text-cyan-300 hover:text-white transition-colors"
                  >
                    <span>Live Prototype</span>
                    <ArrowRight size={13} className="ml-1" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveCaseStudy(project)}
                    className="text-[10px] font-mono font-bold text-purple-300 hover:text-white bg-purple-500/15 hover:bg-purple-500/30 px-3 py-1.5 rounded-lg border border-purple-500/30 transition-all cursor-pointer"
                  >
                    Inspect Architecture →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveCaseStudy(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#0b081e] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setActiveCaseStudy(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Case Study"
              >
                <X size={20} />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-4">
                <Code2 size={13} />
                <span>Architecture Case Study</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-brand mb-2">
                {activeCaseStudy.title}
              </h3>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                {activeCaseStudy.overview || activeCaseStudy.description}
              </p>

              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase mb-1 flex items-center gap-1.5">
                  <Sparkles size={13} /> Technical Benchmark
                </div>
                <div className="text-base font-bold text-white">
                  {activeCaseStudy.metric}
                </div>
              </div>

              {activeCaseStudy.architectureHighlights && (
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-3">
                    Architectural Highlights &amp; Solutions
                  </h4>
                  <div className="space-y-2">
                    {activeCaseStudy.architectureHighlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={activeCaseStudy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  <span>Launch Prototype Live</span>
                  <ExternalLink size={14} />
                </a>

                <Link
                  href="/contact"
                  className="text-xs text-gray-300 hover:text-white font-semibold underline underline-offset-4"
                >
                  Request Similar Architecture →
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ContactCTA />
    </>
  );
}
