"use client";

import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { ArrowRight, ExternalLink } from "lucide-react";
import * as motion from "framer-motion/client";
import SpotlightCard from "./SpotlightCard";
import ScrollReveal from "./ScrollReveal";

export default function Projects() {
  const displayProjects = projects.slice(0, 6);

  return (
    <section className="relative py-28 overflow-hidden bg-[#050B14]/80 border-y border-white/5 backdrop-blur-xl">
      {/* Background ambient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            >
              Our Work
            </motion.span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
              Projects That{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4]">
                  Speak
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
              A selection of concept projects showcasing what we can <span className="text-white font-medium">build for you</span>.
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
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400 font-semibold transition-all duration-300 hover:border-purple-500/40"
            >
              View All Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.1}>
              <SpotlightCard
                spotlightColor="rgba(168, 85, 247, 0.15)"
                className="group flex flex-col h-full rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/10"
              >
                {/* Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020101] via-[#020101]/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Hover overlay with icon */}
                  <a href={project.url || "#"} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] scale-50 group-hover:scale-100 transition-transform duration-500 delay-100"
                    >
                      <ExternalLink size={22} />
                    </motion.div></a>{/* Concept badge */}
                  {project.concept && (
                    <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-[10px] font-bold px-3 py-1.5 rounded-full border border-purple-500/20 text-purple-400 z-20 tracking-wider uppercase">
                      Concept
                    </span>
                  )}

                  {/* Category badge */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-purple-500/10 backdrop-blur-md text-purple-400 text-[10px] font-bold px-3 py-1.5 rounded-full border border-purple-500/20 tracking-wider uppercase">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Project Metric / Result */}
                  {(project as any).metric && (
                    <div className="mb-4 bg-white/[0.02] border border-white/5 p-3 rounded-lg flex items-center gap-2 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/5 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-emerald-400/90 tracking-wide uppercase">
                        {(project as any).metric}
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] text-gray-400 border border-white/5 group-hover:border-purple-500/15 group-hover:text-gray-300 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href={project.url || "/projects"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-white hover:text-purple-400 transition-colors mt-auto group/btn"
                  >
                    View Project
                    <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                </div>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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





