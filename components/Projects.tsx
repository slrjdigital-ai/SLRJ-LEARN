"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Business Website", "E-Commerce", "Web Apps"];

  const filteredProjects =
    activeCategory === "All"
      ? projects.slice(0, 6)
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="relative py-28 overflow-hidden bg-[#050B14]/80 border-y border-white/5 backdrop-blur-xl">
      {/* Background ambient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            >
              Proven Track Record
            </motion.span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight font-brand">
              Projects That{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4]">
                  Deliver Real ROI
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

            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xl">
              High-converting digital platforms engineered to maximize user engagement, speed, and business revenue.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-purple-500/25 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-semibold transition-all duration-300 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            >
              <span>Explore All Work</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Category Filter Tabs ──────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              suppressHydrationWarning
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105"
                  : "bg-white/[0.03] text-gray-400 border border-white/5 hover:border-white/15 hover:text-white"
              }`}
            >
              {cat === "All" ? "All Masterpieces" : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <SpotlightCard
                  spotlightColor="rgba(168, 85, 247, 0.2)"
                  className="group flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 bg-[#080718]/90 backdrop-blur-md transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.25)]"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-108 transition-all duration-700"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080718] via-[#080718]/40 to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />

                    {/* Hover overlay with button */}
                    <a
                      href={project.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 backdrop-blur-[2px] bg-black/40"
                    >
                      <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.6)] transform translate-y-3 group-hover:translate-y-0 transition-transform">
                        <span>Launch Live Demo</span>
                        <ExternalLink size={14} />
                      </div>
                    </a>

                    {/* Top verified live badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-400/30 text-[10px] font-bold text-cyan-300 tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>Live Production</span>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-purple-900/60 backdrop-blur-md text-purple-300 text-[10px] font-bold px-3 py-1 rounded-full border border-purple-400/30 tracking-wider uppercase">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300 font-brand">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Prominent High-Impact ROI Metric */}
                      <div className="mb-4 p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent border border-emerald-500/25 flex items-center gap-2.5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                          <TrendingUp size={13} />
                        </div>
                        <span className="text-[11px] font-bold text-emerald-300 tracking-wide">
                          {project.metric || "100/100 Core Web Vitals & Sub-Second Speed"}
                        </span>
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-gray-300 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Link */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <a
                        href={project.url || "/projects"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold text-cyan-300 hover:text-white transition-colors group/btn"
                      >
                        <span>View Live Application</span>
                        <ArrowRight size={14} className="ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Case Study</span>
                    </div>
                  </div>

                  {/* Bottom accent glow line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 mx-auto w-48 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        />
      </div>
    </section>
  );
}
