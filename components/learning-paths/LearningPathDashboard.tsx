"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ROADMAP_TRACKS, RoadmapTrack } from "@/data/roadmap";
import CircularProgress from "@/components/ui/CircularProgress";
import {
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Smartphone,
  Globe,
  Layers,
  Code2,
  Coffee,
  BarChart3,
  Bot,
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  Lock,
  Play,
  RotateCcw,
  Compass,
  Tag,
  ChevronDown,
  X,
} from "lucide-react";

export interface GrowthCourse {
  id: string;
  stepNumber: number;
  title: string;
  badge?: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  modulesCount: number;
  lessonsCount: number;
  topicsCount: number;
  tags: string[];
  progressPercent: number;
  status: "Completed" | "In Progress" | "Not Started" | "Locked";
  estimatedRemaining?: string;
  prerequisite?: string;
  link: string;
}

export default function LearningPathDashboard() {
  const [activeTab, setActiveTab] = useState<
    "role_roadmaps" | "recommended" | "completed"
  >("role_roadmaps");

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");

  // Comprehensive Courses Dataset
  const allCourses: GrowthCourse[] = [
    {
      id: "course-1",
      stepNumber: 1,
      title: "1. Build Your Own Static Website",
      category: "Frontend Foundations",
      difficulty: "Beginner",
      description: "Build semantic, responsive websites with HTML5, CSS3, modern box model, flexbox, and Bootstrap.",
      modulesCount: 4,
      lessonsCount: 16,
      topicsCount: 8,
      tags: ["HTML", "CSS", "BOOTSTRAP"],
      progressPercent: 0,
      status: "Not Started",
      estimatedRemaining: "4 hours (Not Started)",
      link: "/roadmap/frontend",
    },
    {
      id: "course-2",
      stepNumber: 2,
      title: "2. Build Your Own Responsive Website",
      category: "Frontend Engineering",
      difficulty: "Beginner",
      description: "Master responsive design patterns, media queries, CSS flexbox alignment, and mobile-first layouts.",
      modulesCount: 6,
      lessonsCount: 22,
      topicsCount: 11,
      tags: ["HTML", "CSS", "FLEXBOX"],
      progressPercent: 0,
      status: "Not Started",
      estimatedRemaining: "5 hours 30 mins",
      link: "/roadmap/frontend",
    },
    {
      id: "course-3",
      stepNumber: 3,
      badge: "SLRJ 4.0",
      title: "3. Developer Foundations & Git CLI",
      category: "Core Engineering",
      difficulty: "Beginner",
      description: "Master developer environments, terminal commands, Git version control, branching, and GitHub workflows.",
      modulesCount: 4,
      lessonsCount: 14,
      topicsCount: 12,
      tags: ["DEVELOPER TOOLS", "GIT", "CLI"],
      progressPercent: 0,
      status: "Not Started",
      estimatedRemaining: "3 hours 40 mins",
      link: "/roadmap/frontend",
    },
    {
      id: "course-4",
      stepNumber: 4,
      title: "4. Programming Foundations with Python",
      category: "Backend & Scripting",
      difficulty: "Beginner",
      description: "Master computational thinking, control flow, loops, functions, lists, dictionaries, and problem-solving.",
      modulesCount: 6,
      lessonsCount: 26,
      topicsCount: 14,
      tags: ["PYTHON", "ALGORITHMS", "DATA TYPES"],
      progressPercent: 0,
      status: "Not Started",
      estimatedRemaining: "6 hours",
      link: "/roadmap/python",
    },
    {
      id: "course-5",
      stepNumber: 5,
      title: "5. Introduction to Databases (SQL)",
      category: "Database Systems",
      difficulty: "Intermediate",
      description: "Design relational database schemas, write analytical queries, joins, groupings, and optimize records.",
      modulesCount: 5,
      lessonsCount: 20,
      topicsCount: 10,
      tags: ["SQL", "POSTGRESQL", "RELATIONAL DB"],
      progressPercent: 0,
      status: "Not Started",
      estimatedRemaining: "5 hours",
      link: "/roadmap/fullstack",
    },
    {
      id: "course-6",
      stepNumber: 6,
      badge: "SLRJ 4.0",
      title: "6. Modern JavaScript & React UI",
      category: "Modern Frontend",
      difficulty: "Intermediate",
      description: "Build reactive, component-driven user interfaces with state, hooks, virtual DOM, and dynamic REST APIs.",
      modulesCount: 8,
      lessonsCount: 32,
      topicsCount: 16,
      tags: ["JAVASCRIPT", "REACT", "REST APIS"],
      progressPercent: 0,
      status: "Locked",
      prerequisite: "Complete Course 2 & 3",
      estimatedRemaining: "8 hours",
      link: "/roadmap/frontend",
    },
  ];

  // Tab Filtering
  const coursesForCurrentTab = useMemo(() => {
    switch (activeTab) {
      case "completed":
        return allCourses.filter((c) => c.status === "Completed");
      case "recommended":
        return allCourses.filter((c) => c.status === "In Progress" || c.status === "Not Started");
      default:
        return allCourses;
    }
  }, [activeTab]);

  // Topic & Search Filtering
  const filteredCourses = useMemo(() => {
    return coursesForCurrentTab.filter((c) => {
      const matchesSearch =
        !searchQuery.trim() ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLevel =
        selectedLevel === "All" || c.difficulty === selectedLevel;

      const matchesTopic =
        selectedTopic === "All" ||
        c.tags.some((t) => t.toUpperCase().includes(selectedTopic.toUpperCase()));

      return matchesSearch && matchesLevel && matchesTopic;
    });
  }, [coursesForCurrentTab, searchQuery, selectedLevel, selectedTopic]);

  const topicsList = ["All", "HTML", "CSS", "JAVASCRIPT", "PYTHON", "SQL", "GIT"];
  const levelsList = ["All", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="space-y-8">
      {/* ─── Top Tabs: Modern Dark Navy Segmented Navigation ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="p-1.5 bg-[#12316B] border border-[#0d2757] rounded-2xl flex flex-wrap items-center gap-2 sm:gap-2.5 shadow-lg shadow-[#12316B]/15">
          {/* Tab 1: Role Roadmaps */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setActiveTab("role_roadmaps")}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === "role_roadmaps"
                ? "bg-white text-[#12316B] shadow-md"
                : "text-blue-100/90 hover:text-white hover:bg-white/10"
            }`}
          >
            <Compass
              size={17}
              className={activeTab === "role_roadmaps" ? "text-[#12316B]" : "text-blue-300"}
            />
            <span>Role Roadmaps</span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider transition-all ${
              activeTab === "role_roadmaps"
                ? "bg-[#12316B] text-white"
                : "bg-[#18B6D2] text-[#12316B]"
            }`}>
              8 Paths
            </span>
          </button>

          {/* Tab 3: Recommended Courses */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setActiveTab("recommended")}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === "recommended"
                ? "bg-white text-[#12316B] shadow-md"
                : "text-blue-100/90 hover:text-white hover:bg-white/10"
            }`}
          >
            <Sparkles
              size={17}
              className={activeTab === "recommended" ? "text-amber-500" : "text-blue-300"}
            />
            <span>Recommended Courses</span>
          </button>

          {/* Tab 4: Completed Courses */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setActiveTab("completed")}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === "completed"
                ? "bg-white text-[#12316B] shadow-md"
                : "text-blue-100/90 hover:text-white hover:bg-white/10"
            }`}
          >
            <CheckCircle2
              size={17}
              className={activeTab === "completed" ? "text-emerald-500" : "text-blue-300"}
            />
            <span>Completed Courses</span>
          </button>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#12316B] border border-[#0d2757] text-xs font-semibold text-white self-start lg:self-auto shadow-md shadow-[#12316B]/10">
          <Layers size={15} className="text-[#18B6D2]" />
          <span>
            Showing <strong className="text-[#18B6D2] font-black">{activeTab === "role_roadmaps" ? ROADMAP_TRACKS.length : filteredCourses.length}</strong> items
          </span>
        </div>
      </div>

      {/* ─── Search & Filter Bar (for course tabs) ─── */}
      {activeTab !== "role_roadmaps" && (
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by course, skill, or keyword..."
              className="w-full pl-10 pr-9 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#12316B] focus:ring-2 focus:ring-[#12316B]/15 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Controls Right Group */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Topic Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 flex-shrink-0">
                <Tag size={13} className="text-[#18B6D2]" />
                Topic:
              </span>
              <div className="flex items-center gap-1.5">
                {topicsList.map((top) => {
                  const isActive = selectedTopic === top;
                  return (
                    <button
                      key={top}
                      onClick={() => setSelectedTopic(top)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                        isActive
                          ? "bg-[#12316B] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950"
                      }`}
                    >
                      {top}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level Filter Dropdown */}
            <div className="flex items-center gap-1.5 flex-shrink-0 border-l border-slate-200 pl-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Level:</span>
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#18B6D2]/20 cursor-pointer transition-colors"
                >
                  {levelsList.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 1, 3, 4: COURSE CARDS GRID (3 cols desktop, 2 medium, 1 mobile) ─── */}
      {activeTab !== "role_roadmaps" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isCompleted = course.status === "Completed";
            const isLocked = course.status === "Locked";
            const isInProgress = course.status === "In Progress";

            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between group ${
                  isCompleted
                    ? "border-emerald-200/90"
                    : isLocked
                    ? "border-slate-200/60 opacity-80"
                    : "border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <div>
                  {/* Top Row: Illustration / Badge + Visual Progress State */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {course.badge ? (
                        <span className="font-extrabold text-sm text-[#0b69ff] tracking-tight">
                          {course.badge}
                        </span>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0b69ff] flex items-center justify-center font-bold text-sm">
                          <Smartphone size={20} />
                        </div>
                      )}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">
                        {course.difficulty}
                      </span>
                    </div>

                    {/* Progress Indicator */}
                    {isCompleted ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm" title="Completed">
                        <CheckCircle2 size={18} className="fill-emerald-500 text-white" />
                      </div>
                    ) : isLocked ? (
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400" title="Locked Prerequisite">
                        <Lock size={15} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0b69ff] font-mono">
                          {course.progressPercent}%
                        </span>
                        <CircularProgress
                          percentage={course.progressPercent}
                          size={28}
                          strokeWidth={3}
                          color="#0b69ff"
                        />
                      </div>
                    )}
                  </div>

                  {/* Category Label */}
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    {course.category}
                  </span>

                  {/* Course Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0b69ff] transition-colors">
                    {course.title}
                  </h3>

                  {/* Description - legible and clear */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Modules & Topics Info */}
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600 mb-3">
                    <span>{course.modulesCount} Modules • {course.lessonsCount} Lessons</span>
                    {course.estimatedRemaining && (
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <Clock size={12} />
                        {course.estimatedRemaining}
                      </span>
                    )}
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#e8f1fd] text-[#0b69ff] text-xs font-bold tracking-wider uppercase font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Link & Status Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {isLocked ? (
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <Lock size={13} />
                      <span>{course.prerequisite}</span>
                    </span>
                  ) : (
                    <Link
                      href={course.link}
                      className="text-xs font-bold text-[#0b69ff] hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                      <span>
                        {isCompleted
                          ? "Review Course"
                          : isInProgress
                          ? "Continue Learning"
                          : "Start Course"}
                      </span>
                      <ChevronRight size={14} />
                    </Link>
                  )}

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? "bg-emerald-100 text-emerald-800"
                        : isInProgress
                        ? "bg-blue-100 text-blue-800"
                        : isLocked
                        ? "bg-slate-100 text-slate-500"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ─── TAB 2: ROLE ROADMAPS (8 Structured Career Paths) ─── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {ROADMAP_TRACKS.map((track) => (
            <div
              key={track.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#e8f1fd] text-[#0b69ff] uppercase font-mono">
                    {track.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{track.level}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{track.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {track.description}
                </p>

                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600 mb-4">
                  <span>{track.totalStages} Stages</span>
                  <span>{track.duration}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(track.skills || []).slice(0, 4).map((s: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/roadmap/${track.id}`}
                  className="w-full py-3 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold font-mono text-center transition-all shadow-sm shadow-blue-500/20"
                >
                  Explore Roadmap
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
