"use client";

import { useState } from "react";
import { blogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind",
    "APIs",
    "Database",
    "Git & GitHub",
    "Deployment",
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="pt-32 sm:pt-36 pb-14 bg-transparent grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 backdrop-blur-md">
            <BookOpen size={14} className="text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
              Architectural &amp; Engineering Notes
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 font-brand">
            Engineering &bull; <span className="gold-gradient-text">Insights.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10">
            Learn, build, and master modern full-stack web engineering with our technical documentation and architectural blueprints.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, tutorials & topics..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.08] transition-all backdrop-blur-md"
            />
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-transparent min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={post.id}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="glass-card group overflow-hidden flex flex-col h-full border border-white/10 hover:border-purple-500/40 transition-all duration-300 rounded-3xl"
                  >
                    <div className="aspect-video bg-[#0A0D14] relative overflow-hidden flex items-center justify-center border-b border-white/5">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-108 transition-all duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/40 to-transparent" />

                      {/* Topic tag badge */}
                      <div className="relative z-10 text-center px-4 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-purple-500/40 shadow-lg group-hover:border-purple-400 group-hover:scale-105 transition-all duration-300">
                        <span className="text-sm font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-purple-400 uppercase tracking-widest">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-purple-400 text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                          {post.category}
                        </span>
                        <span className="text-gray-400 text-xs font-mono">
                          {post.date}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors font-brand">
                        {post.title}
                      </h3>

                      <p className="text-gray-300 text-sm mb-6 flex-1 leading-relaxed">
                        {post.description}
                      </p>

                      <div className="inline-flex items-center text-xs font-bold text-cyan-300 group-hover:text-white transition-colors mt-auto pt-4 border-t border-white/5">
                        <span>Read Technical Notes</span>
                        <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No notes found matching your selection.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-5 py-2 rounded-full bg-purple-600/30 text-purple-300 hover:bg-purple-600/50 text-xs font-mono font-bold transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
