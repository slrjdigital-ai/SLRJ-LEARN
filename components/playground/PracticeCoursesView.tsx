"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getAllCourses,
  Course,
  COURSE_LEVELS,
  CourseLevelInfo,
  getCourseLevel,
} from "@/data/courses";
import {
  Code2,
  Terminal,
  Play,
  Search,
  Sparkles,
  Layers,
  Rocket,
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Filter,
} from "lucide-react";

const CATEGORY_FILTERS = [
  "All Courses",
  "Programming Languages",
  "Web Development",
  "Data Structures & Algorithms",
  "Databases",
  "Cloud & DevOps",
  "Artificial Intelligence & Machine Learning",
] as const;

type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export default function PracticeCoursesView() {
  const allCourses = useMemo(() => getAllCourses(), []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<"all" | "basic" | "intermediate" | "pro">("all");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All Courses");

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Courses": allCourses.length };
    CATEGORY_FILTERS.forEach((cat) => {
      if (cat !== "All Courses") {
        counts[cat] = allCourses.filter((c) => c.category === cat).length;
      }
    });
    return counts;
  }, [allCourses]);

  // Level counts
  const levelCounts = useMemo(() => {
    return {
      all: allCourses.length,
      basic: allCourses.filter((c) => getCourseLevel(c).id === "basic").length,
      intermediate: allCourses.filter((c) => getCourseLevel(c).id === "intermediate").length,
      pro: allCourses.filter((c) => getCourseLevel(c).id === "pro").length,
    };
  }, [allCourses]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      // 1. Level filter
      if (selectedLevel !== "all") {
        const lvl = getCourseLevel(course);
        if (lvl.id !== selectedLevel) return false;
      }

      // 2. Category filter
      if (selectedCategory !== "All Courses") {
        if (course.category !== selectedCategory) return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchDesc = course.shortDescription.toLowerCase().includes(q);
        const matchCategory = course.category.toLowerCase().includes(q);
        const matchSkills = (course.skillsGained || course.skills || []).some((s) =>
          s.toLowerCase().includes(q)
        );
        const matchSlug = course.slug.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCategory && !matchSkills && !matchSlug) {
          return false;
        }
      }

      return true;
    });
  }, [allCourses, selectedLevel, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* ── 1. HERO HEADER ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1e40] via-[#12316B] to-[#173B70] text-white p-6 sm:p-8 lg:p-9 shadow-lg border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#18B6D2]/20 via-blue-400/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -mb-20" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#18B6D2] border border-white/20 text-xs font-bold uppercase tracking-wider font-mono">
              <Terminal size={14} className="text-[#18B6D2]" />
              <span>SLRJ Learn • Hands-On Practice Hub</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-blue-200">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                21 Courses
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold">
                Live IDE Available
              </span>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-brand tracking-tight text-white leading-tight">
              Interactive Coding Practice
            </h1>
            <p className="text-blue-100/95 text-sm sm:text-base leading-relaxed font-normal">
              Practice real code across all <strong className="text-white font-bold">21 comprehensive courses</strong>. Select any course to open the interactive coding workspace, solve guided challenges, run programs live, and master core concepts hands-on.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/15">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-[#18B6D2] flex items-center justify-center shrink-0">
                <Code2 size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white truncate">21 Courses</div>
                <p className="text-[11px] text-blue-200/80 truncate">Interactive labs</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center shrink-0">
                <Terminal size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white truncate">Live Execution</div>
                <p className="text-[11px] text-blue-200/80 truncate">Real-time output</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-amber-300 flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white truncate">Automated Tests</div>
                <p className="text-[11px] text-blue-200/80 truncate">Instant evaluation</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-purple-300 flex items-center justify-center shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white truncate">Hints &amp; Solution</div>
                <p className="text-[11px] text-blue-200/80 truncate">Guided learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. SEARCH & CONTROLS ── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-brand">
              Select a Course to Practice
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Showing {filteredCourses.length} of {allCourses.length} courses available for hands-on practice
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search course or language (C, Python, React...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/70 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-hidden focus:border-[#12316B] focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Level Filter Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setSelectedLevel("all")}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              selectedLevel === "all"
                ? "bg-[#12316B] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
            }`}
          >
            All Levels ({levelCounts.all})
          </button>
          <button
            type="button"
            onClick={() => setSelectedLevel("basic")}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              selectedLevel === "basic"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
            }`}
          >
            Level 1: Basic ({levelCounts.basic})
          </button>
          <button
            type="button"
            onClick={() => setSelectedLevel("intermediate")}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              selectedLevel === "intermediate"
                ? "bg-[#173B70] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
            }`}
          >
            Level 2: Intermediate ({levelCounts.intermediate})
          </button>
          <button
            type="button"
            onClick={() => setSelectedLevel("pro")}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              selectedLevel === "pro"
                ? "bg-purple-700 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
            }`}
          >
            Level 3: Pro ({levelCounts.pro})
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            if (count === 0 && cat !== "All Courses") return null;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#12316B] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
                }`}
              >
                {cat} {cat !== "All Courses" && `(${count})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. ALL 21 COURSES PRACTICE GRID ── */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const level = getCourseLevel(course);
            const totalModules = course.modules?.length || 0;
            const totalLessons =
              course.totalLessons ||
              course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) ||
              course.pdfLessons?.length ||
              0;

            const practiceHref = `/practice/${course.slug}`;

            return (
              <div
                key={course.id}
                className="flex flex-col justify-between overflow-hidden bg-white rounded-2xl border-2 border-slate-200/90 hover:border-[#12316B] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out group relative"
              >
                {/* Top Level Accent Stripe */}
                <div
                  className={`h-1.5 w-full transition-all duration-300 group-hover:h-2 ${
                    level.id === "basic"
                      ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400"
                      : level.id === "intermediate"
                      ? "bg-gradient-to-r from-[#173B70] via-[#12316B] to-[#18B6D2]"
                      : "bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-500"
                  }`}
                />

                <div className="p-5 sm:p-6 space-y-4">
                  {/* Header: Icon, Category & Difficulty */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                        {course.icon || "💻"}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-black text-[#12316B] uppercase tracking-wider block truncate">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider border ${level.badgeClass}`}
                          >
                            {level.badgeLabel}
                          </span>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            {course.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                      IDE Active
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <Link
                      href={practiceHref}
                      className="block text-lg font-black font-brand text-slate-950 group-hover:text-[#12316B] transition-colors leading-snug line-clamp-2"
                    >
                      {course.title}
                    </Link>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  {/* Modules & Duration Metadata */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Layers size={14} className="text-[#12316B]" />
                      <span>{totalModules} Modules • {totalLessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-slate-400" />
                      <span>{course.estimatedDuration}</span>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  {course.skillsGained && course.skillsGained.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {course.skillsGained.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/80"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skillsGained.length > 3 && (
                        <span className="text-[10px] font-bold text-slate-400 px-1 py-0.5">
                          +{course.skillsGained.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Action Button */}
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <Link
                    href={practiceHref}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#173B70] to-[#12316B] hover:from-[#12316B] hover:to-[#0b69ff] text-white text-xs sm:text-sm font-black transition-all duration-200 text-center flex items-center justify-center gap-2 group/btn cursor-pointer shadow-xs hover:shadow-md active:scale-98"
                  >
                    <Terminal size={14} className="text-cyan-300" />
                    <span>Start Coding Practice</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <Code2 size={36} className="mx-auto text-slate-400" />
          <h3 className="text-lg font-bold text-slate-900">No courses match your search</h3>
          <p className="text-sm text-slate-500">
            Try adjusting your search query or reset the level and category filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedLevel("all");
              setSelectedCategory("All Courses");
            }}
            className="px-4 py-2 rounded-xl bg-[#12316B] text-white text-xs font-bold transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
