"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllMicroTopics, MicroTopicSeries } from "@/data/microTopics";
import { useGamification } from "@/context/GamificationContext";
import {
  Sparkles,
  Flame,
  Award,
  Clock,
  BookOpen,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Zap,
  Terminal,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopicsDashboard() {
  const allTopics = useMemo(() => getAllMicroTopics(), []);
  const { state, currentLevel } = useGamification();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Programming & Technology",
    "Soft Skills",
    "Career-Oriented",
    "Fun & Creative",
  ];

  const filteredTopics = useMemo(() => {
    return allTopics.filter((topic) => {
      const matchesCategory =
        selectedCategory === "All" || topic.category === selectedCategory;
      const matchesSearch =
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.seriesTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allTopics, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-28 pb-20 selection:bg-cyan-500/30">
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* ─── Gamified Top Streak & XP Banner ─── */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#09152C] via-[#050B18] to-[#040812] border border-cyan-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/20 flex-shrink-0">
              <Flame size={28} className="animate-pulse text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xl sm:text-2xl font-black text-white font-brand">
                  {state.streak.currentStreak}-Day Streak Active!
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                  {currentLevel.title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Complete 1 micro-lesson today to extend your streak and keep your flame alive.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Total XP</span>
              <span className="text-lg font-bold text-amber-300 font-brand">
                {state.xp.totalXP} XP
              </span>
            </div>

            <Link
              href="/gamification"
              className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold font-mono bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Trophy size={15} />
              <span>Gamification Hub & Challenges</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ─── Hero Title Section ─── */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-cyan-400" />
            <span>Micro-Learning Library</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white mb-3">
            Explore Topics
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Short, engaging learning activities designed for maximum retention. Master programming,
            essential soft skills, career readiness, and creative puzzles in bite-sized, 5 to 15-minute lessons.
          </p>
        </div>

        {/* ─── Filters & Search Bar ─── */}
        <div className="p-3 sm:p-4 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-md shadow-cyan-500/20"
                    : "bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative md:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, skills, or puzzles..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400/50 transition-all font-sans"
            />
          </div>
        </div>

        {/* ─── Series Cards Grid ─── */}
        {filteredTopics.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-[#080D1A] border border-white/5">
            <Search size={36} className="text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No topics found</h3>
            <p className="text-xs text-slate-400 mb-4">
              Try adjusting your search query or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTopics.map((topic) => (
              <motion.div
                key={topic.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-3xl bg-[#080D1A] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="p-6 sm:p-7 relative z-10">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {topic.level}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                        {topic.dailyCommitment}
                      </span>
                    </div>
                  </div>

                  {/* Series Subtitle & Main Title */}
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    {topic.seriesTitle}
                  </span>
                  <h3 className="text-xl font-bold text-white font-brand mb-2.5 group-hover:text-cyan-200 transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-5">
                    {topic.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {topic.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/5 text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Card */}
                <div className="p-5 sm:p-6 pt-4 border-t border-white/10 bg-[#050A14] flex items-center justify-between relative z-10">
                  <div className="text-xs font-mono">
                    <span className="text-slate-400 block">{topic.totalLessons} Micro-Lessons</span>
                    <span className="text-amber-300 font-bold">+{topic.totalXP} XP Available</span>
                  </div>

                  <Link
                    href={`/topics/${topic.slug}`}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-emerald-400 text-white hover:text-black border border-white/15 hover:border-transparent transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group-hover:scale-105"
                  >
                    <span>Start Lessons</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
