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
  CheckCircle2,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="space-y-8">
      {/* ─── Gamified Top Streak & XP Banner ─── */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm flex-shrink-0">
            <Flame size={24} className="animate-pulse text-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xl font-bold text-slate-900 font-brand">
                {state.streak.currentStreak}-Day Streak Active!
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
                {currentLevel.title}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Complete 1 micro-lesson today to extend your streak and keep your flame alive.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Total XP</span>
            <span className="text-base font-bold text-amber-600 font-brand">
              {state.xp.totalXP} XP
            </span>
          </div>

          <Link
            href="/gamification"
            className="px-4 py-2.5 rounded-xl text-xs font-bold font-mono bg-[#0b69ff] hover:bg-blue-600 text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Trophy size={14} />
            <span>Weekly Challenges</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* ─── Hero Title Section ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-brand">
            Course Library & Topics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Short, engaging micro-lessons in programming, soft skills, and career readiness.
          </p>
        </div>
      </div>

      {/* ─── Filters & Search Bar ─── */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0b69ff] text-white shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, skills..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b69ff] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* ─── Series Cards Grid ─── */}
      {filteredTopics.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-white border border-slate-200">
          <Search size={32} className="text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No topics found</h3>
          <p className="text-xs text-slate-500 mb-4">
            Try adjusting your search query or reset the filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0b69ff] hover:bg-blue-600 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.slug}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Icon & Level */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {topic.level}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#e8f1fd] text-[#0b69ff]">
                      {topic.dailyCommitment}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#0b69ff] uppercase tracking-wider block mb-1">
                  {topic.seriesTitle}
                </span>
                <h3 className="text-base font-bold text-slate-900 font-brand mb-2 group-hover:text-[#0b69ff] transition-colors">
                  {topic.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                  {topic.description}
                </p>

                {/* Skills pills */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {topic.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs font-mono">
                  <span className="text-slate-500 block">{topic.totalLessons} Lessons</span>
                  <span className="text-amber-600 font-bold">+{topic.totalXP} XP</span>
                </div>

                <Link
                  href={`/topics/${topic.slug}`}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#e8f1fd] text-[#0b69ff] hover:bg-[#0b69ff] hover:text-white transition-all flex items-center gap-1"
                >
                  <span>Start</span>
                  <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
