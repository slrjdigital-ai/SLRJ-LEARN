"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import * as motion from "framer-motion/client";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  
  const categories = ["All", "Business Website", "E-Commerce", "Web Apps", "UI/UX"];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <>
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-transparent grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Built With <span className="gold-gradient-text">Purpose.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12">
            Explore our portfolio of modern digital experiences.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  filter === cat 
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
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
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                key={project.id} 
                className="glass-card group overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-[#0A0D14] relative overflow-hidden flex items-center justify-center border-b border-white/5">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                  />
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-10 duration-500">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] scale-50 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <ExternalLink size={24} />
                    </div>
                  </a>
                  {project.concept && (
                    <span className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full border border-white/10 text-purple-400 z-20">
                      Concept Project
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col relative z-20 bg-gradient-to-t from-[#050505] to-transparent">
                  <div className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">{project.category}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10 group-hover:border-purple-500/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
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

      <ContactCTA />
    </>
  );
}



