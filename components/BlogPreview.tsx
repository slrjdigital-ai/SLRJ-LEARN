"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function BlogPreview() {
  const displayPosts = blogPosts.slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-5">
                <BookOpen size={14} className="text-cyan-400" />
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Web Development Notes</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Learn.{" "}
                <span className="text-gray-400">Build.</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#06B6D4] animate-[gradient_3s_linear_infinite] bg-[length:200%_auto]">
                  Grow.
                </span>
              </h2>
            </div>
            <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:border-purple-500/40 hover:bg-white/10 text-white font-medium transition-all duration-300"
              >
                View All Notes
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayPosts.map((post, idx) => {
            const isFeatured = idx === 0;
            return (
              <ScrollReveal key={post.id} delay={idx * 0.1} className={isFeatured ? "lg:col-span-2" : ""}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full"
                >
                  <SpotlightCard
                    spotlightColor="rgba(255, 184, 0, 0.15)"
                    className={`h-full flex overflow-hidden ${isFeatured ? "flex-row" : "flex-col"}`}
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden bg-[#0A0D14] flex-shrink-0 ${
                        isFeatured
                          ? "w-1/2 min-h-[280px]"
                          : "aspect-[16/10] w-full"
                      }`}
                    >
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-black/30 to-transparent" />

                      {/* Badges on image */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-gray-300 backdrop-blur-md">
                          <Clock size={10} />
                          5 min read
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 z-10">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 backdrop-blur-md uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="text-purple-400 text-[11px] font-bold uppercase tracking-widest mb-2">
                        {post.category}
                      </div>
                      <h3
                        className={`font-bold text-white mb-3 group-hover:text-purple-400 transition-colors leading-snug ${
                          isFeatured ? "text-2xl" : "text-lg"
                        }`}
                      >
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-5 flex-1 leading-relaxed line-clamp-3">
                        {post.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
                        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                          Read Notes
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                        {/* Avatar placeholder */}
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-[10px] font-black">
                          SL
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


