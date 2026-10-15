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
    "my_learning" | "role_roadmaps" | "recommended" | "completed"
  >("my_learning");

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
      progressPercent: 100,
      status: "Completed",
      estimatedRemaining: "0 mins (Finished)",
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
      progressPercent: 55,
      status: "In Progress",
      estimatedRemaining: "1 hour 15 mins",
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
      progressPercent: 12,
      status: "In Progress",
      estimatedRemaining: "2 hours 40 mins",
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
      progressPercent: 4,
      status: "In Progress",
      estimatedRemaining: "4 hours 30 mins",
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
      case "my_learning":
        return allCourses;
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
      {/* ─── Top Tabs: 4-Way Split ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("my_learning")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "my_learning"
                ? "bg-[#e8f1fd] text-[#0b69ff] shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            My Learning
          </button>

          <button
            onClick={() => setActiveTab("role_roadmaps")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "role_roadmaps"
                ? "bg-[#e8f1fd] text-[#0b69ff] shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <span>Role Roadmaps</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#0b69ff] text-white font-mono">
              8 Paths
            </span>
          </button>

          <button
            onClick={() => setActiveTab("recommended")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "recommended"
                ? "bg-[#e8f1fd] text-[#0b69ff] shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Recommended Courses
          </button>

          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "completed"
                ? "bg-[#e8f1fd] text-[#0b69ff] shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Completed Courses
          </button>
        </div>

        <div className="text-xs text-slate-500 font-semibold">
          Showing <strong className="text-slate-800">{activeTab === "role_roadmaps" ? ROADMAP_TRACKS.length : filteredCourses.length}</strong> items
        </div>
      </div>

      {/* ─── Search & Filter Bar (for course tabs) ─── */}
      {activeTab !== "role_roadmaps" && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by course, skill, or keyword..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b69ff]"
            />
          </div>

          {/* Topic Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Topic:</span>
            {topicsList.map((top) => (
              <button
                key={top}
                onClick={() => setSelectedTopic(top)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTopic === top
                    ? "bg-[#0b69ff] text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {top}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-semibold focus:outline-none"
            >
              {levelsList.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
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
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    {course.category}
                  </span>

                  {/* Course Title */}
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0b69ff] transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Modules & Topics Info */}
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-3">
                    <span>{course.modulesCount} Modules • {course.lessonsCount} Lessons</span>
                    {course.estimatedRemaining && (
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <Clock size={11} />
                        {course.estimatedRemaining}
                      </span>
                    )}
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-[#e8f1fd] text-[#0b69ff] text-[10px] font-bold tracking-wider uppercase font-mono"
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

                <h3 className="text-lg font-bold text-slate-900 mb-2">{track.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                  {track.description}
                </p>

                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-4">
                  <span>{track.totalStages} Stages</span>
                  <span>{track.duration}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(track.skills || []).slice(0, 4).map((s: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/roadmap/${track.id}`}
                  className="w-full py-2.5 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white text-xs font-bold font-mono text-center transition-all shadow-sm shadow-blue-500/20"
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
