"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllCourses, LEARNING_CATEGORIES } from "@/data/courses";
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  Compass,
} from "lucide-react";

export default function CoursesPage() {
  const allCourses = useMemo(() => getAllCourses(), []);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...LEARNING_CATEGORIES.map((c) => c.title)];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "All" || course.difficulty === selectedDifficulty;
      const matchesSearch =
        !searchQuery.trim() ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skillsGained.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [allCourses, selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20">
      {/* ── Hero Header ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <BookOpen size={14} className="text-cyan-400" />
            <span>Interactive Course Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white mb-4">
            Master Tech Skills from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Basic to Production.
            </span>
          </h1>
          <p className="text-slate-300 text-base leading-relaxed font-normal">
            Every course combines W3Schools-level comprehensive syntax explanations, SoloLearn bite-sized gamified quizzes, and NxtWave real-world project milestones.
          </p>
        </div>
      </section>

      {/* ── Search & Filter Bar ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="p-4 sm:p-6 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by topic, language, or concept (e.g. React, SQL, Python, DSA)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-all font-sans"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="w-full md:w-auto flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Difficulty:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff} className="bg-[#080D1A] text-white">
                    {diff}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1">
              <Filter size={13} className="text-cyan-400" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold shadow-md shadow-cyan-500/20"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Courses Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
          <span>
            Showing <strong className="text-white">{filteredCourses.length}</strong> available courses
          </span>
          {(searchQuery || selectedCategory !== "All" || selectedDifficulty !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedDifficulty("All");
              }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-[#080D1A] border border-white/10 hover:border-cyan-500/40 p-6 shadow-xl hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(6,182,212,0.12)] transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-2 rounded-2xl bg-white/5 border border-white/5">
                      {course.icon}
                    </span>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                        {course.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {course.difficulty}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                    +{course.totalXp} XP
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors font-brand mb-2.5">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {course.shortDescription}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {course.skillsGained.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                  {course.skillsGained.length > 3 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
                      +{course.skillsGained.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Footer Meta & Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-cyan-400" />
                    <span>{course.estimatedDuration}</span>
                  </span>
                  <span>•</span>
                  <span>{course.totalLessons} Lessons</span>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <span>Start Course</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
