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
  CheckCircle2,
  FolderOpen,
} from "lucide-react";

export default function CoursesPage() {
  const allCourses = useMemo(() => getAllCourses(), []);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedAccess, setSelectedAccess] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...LEARNING_CATEGORIES.map((c) => c.title)];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
  const accessTypes = ["All", "Free Access", "With Certificate"];

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
    <div className="space-y-8 pb-16">
      {/* ── Page Header ── */}
      <section className="rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#18B6D2]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-xs font-bold uppercase tracking-wider">
            <BookOpen size={14} className="text-[#18B6D2]" />
            <span>Interactive Course Catalog • 100% Free</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white">
            Explore Courses & Curricula
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Every course combines comprehensive computer science syntax, handwritten PDF study notes, interactive in-browser coding exercises, and verified assessments leading to verifiable certificates.
          </p>
        </div>
      </section>

      {/* ── Search & Filter Controls ── */}
      <section className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by title, skill, or concept (e.g. HTML, React, Python, DSA, SQL)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#E2E8F0] text-[#182230] placeholder-[#64748B] text-xs sm:text-sm focus:outline-none focus:border-[#12316B] focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <span className="text-xs font-bold text-[#64748B]">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#F7F9FC] border border-[#E2E8F0] text-[#182230] text-xs font-semibold focus:outline-none focus:border-[#12316B] cursor-pointer"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#64748B] mr-2 flex items-center gap-1">
            <Filter size={13} className="text-[#12316B]" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#12316B] text-white shadow-xs"
                    : "bg-[#F7F9FC] text-[#64748B] hover:text-[#182230] hover:bg-slate-100 border border-[#E2E8F0]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Results Bar ── */}
      <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
        <span>
          Showing <strong className="text-[#182230]">{filteredCourses.length}</strong> published courses •{" "}
          <span className="text-[#16865C] font-bold">100% Free Open Access</span>
        </span>

        {(searchQuery || selectedCategory !== "All" || selectedDifficulty !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedDifficulty("All");
            }}
            className="text-[#12316B] font-bold hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* ── Courses Grid ── */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-[#E2E8F0] space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-[#64748B]">
            <FolderOpen size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#182230]">No courses found</h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Try adjusting your search query or selecting a different category filter.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedDifficulty("All");
            }}
            className="px-4 py-2 rounded-xl bg-[#12316B] text-white text-xs font-bold hover:bg-[#2456A6] transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const difficultyBadge =
              course.difficulty === "Beginner"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : course.difficulty === "Intermediate"
                ? "bg-blue-50 text-[#12316B] border-blue-200"
                : "bg-purple-50 text-purple-700 border-purple-200";

            return (
              <div
                key={course.id}
                className="clean-card flex flex-col justify-between overflow-hidden group hover:border-[#12316B]/30 transition-all hover:-translate-y-1"
              >
                <div className="p-6 space-y-4">
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-2 rounded-xl bg-[#F7F9FC] border border-[#E2E8F0]">
                        {course.icon || "💻"}
                      </span>
                      <div>
                        <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded border ${difficultyBadge}`}>
                            {course.difficulty}
                          </span>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-50 text-[#16865C] border border-emerald-200">
                            FREE
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#12316B]">
                      +{course.totalXp} XP
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-extrabold text-[#182230] group-hover:text-[#12316B] transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-2 line-clamp-3 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  {/* Skills Chips */}
                  {course.skillsGained && course.skillsGained.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.skillsGained.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-[#182230]"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skillsGained.length > 3 && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-[#64748B]">
                          +{course.skillsGained.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Meta & Action */}
                <div className="p-4 sm:px-6 bg-[#F7F9FC] border-t border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock size={13} className="text-[#64748B]" />
                      <span>{course.estimatedDuration}</span>
                    </span>
                    <span>•</span>
                    <span>{course.totalLessons} Lessons</span>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#12316B] hover:bg-[#2456A6] transition-colors shadow-2xs"
                  >
                    <span>View Course</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
