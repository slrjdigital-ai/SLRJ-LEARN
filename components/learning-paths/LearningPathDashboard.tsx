"use client";

import { useState } from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";

interface GrowthCourse {
  id: string;
  stepNumber: number;
  title: string;
  badge?: string;
  category: string;
  description: string;
  topicsCount: number;
  tags: string[];
  progressPercent: number;
  isCompleted: boolean;
  link: string;
}

export default function LearningPathDashboard() {
  const [activeTab, setActiveTab] = useState<"growth_cycles" | "all_roadmaps">("growth_cycles");
  const [selectedTrack, setSelectedTrack] = useState<string>("frontend");

  // Cycle 1: Growth Cycle Courses (as seen in photo)
  const growthCycleCourses: GrowthCourse[] = [
    {
      id: "course-1",
      stepNumber: 1,
      title: "1. Build Your Own Static Website",
      category: "COURSE",
      description: "Build a static website that appears beautifully on desktop and mobile with clean semantic HTML.",
      topicsCount: 8,
      tags: ["HTML", "CSS", "BOOTSTRAP"],
      progressPercent: 100,
      isCompleted: true,
      link: "/roadmap/frontend",
    },
    {
      id: "course-2",
      stepNumber: 2,
      title: "2. Build Your Own Responsive Website",
      category: "COURSE",
      description: "Build a responsive website that appears beautifully on any screen resolution with fluid flexbox.",
      topicsCount: 11,
      tags: ["HTML", "CSS", "BOOTSTRAP"],
      progressPercent: 12,
      isCompleted: false,
      link: "/roadmap/frontend",
    },
    {
      id: "course-3",
      stepNumber: 3,
      badge: "CCBP 4.0",
      title: "3. Welcome to Academy",
      category: "COURSE",
      description: "Welcome to Academy. Master core engineering mindsets, development tools, and code environments.",
      topicsCount: 12,
      tags: ["DEVELOPER TOOLS", "GIT", "CLI"],
      progressPercent: 55,
      isCompleted: false,
      link: "/roadmap/frontend",
    },
  ];

  // Cycle 2: Master Growth Cycle Courses (as seen in photo)
  const masterCycleCourses: GrowthCourse[] = [
    {
      id: "course-4",
      stepNumber: 4,
      title: "4. Programming Foundations with Python",
      category: "COURSE",
      description: "Master algorithmic problem solving, loops, conditionals, functions, and memory manipulation.",
      topicsCount: 14,
      tags: ["PYTHON", "ALGORITHMS", "DATA TYPES"],
      progressPercent: 4,
      isCompleted: false,
      link: "/roadmap/python",
    },
    {
      id: "course-5",
      stepNumber: 5,
      title: "5. Introduction to Databases (SQL)",
      category: "COURSE",
      description: "Design relational database schemas, write optimized queries, and manage relational records.",
      topicsCount: 10,
      tags: ["SQL", "POSTGRESQL", "RELATIONAL DB"],
      progressPercent: 0,
      isCompleted: false,
      link: "/roadmap/fullstack",
    },
    {
      id: "course-6",
      stepNumber: 6,
      badge: "CCBP 4.0",
      title: "6. Modern JavaScript & React UI",
      category: "COURSE",
      description: "Build reactive, component-driven user interfaces with state, hooks, and dynamic data APIs.",
      topicsCount: 16,
      tags: ["JAVASCRIPT", "REACT", "REST APIS"],
      progressPercent: 0,
      isCompleted: false,
      link: "/roadmap/frontend",
    },
  ];

  return (
    <div className="space-y-10">
      {/* ─── Top Tabs: Growth Cycles vs All Roadmaps ─── */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("growth_cycles")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "growth_cycles"
                ? "bg-[#e8f1fd] text-[#0b69ff] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            My Growth Cycles
          </button>
          <button
            onClick={() => setActiveTab("all_roadmaps")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "all_roadmaps"
                ? "bg-[#e8f1fd] text-[#0b69ff] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Role Roadmaps (7 Career Tracks)
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Current Track:</span>
          <span className="font-bold text-slate-800">Full-Stack Web Developer</span>
        </div>
      </div>

      {activeTab === "growth_cycles" ? (
        /* ══════════════════════════════════════════════════════════════════
           GROWTH CYCLES (Exact Design as in Photo)
           ══════════════════════════════════════════════════════════════════ */
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* ── Section 1: Growth Cycle ── */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-brand">
                Growth Cycle
              </h2>
              <span className="text-xs font-semibold text-slate-500">24 Days</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {growthCycleCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Illustration / Badge on Left, Progress Circle on Right */}
                    <div className="flex items-center justify-between mb-4">
                      {course.badge ? (
                        <span className="font-extrabold text-sm text-[#0b69ff] tracking-tight">
                          {course.badge}
                        </span>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0b69ff] flex items-center justify-center font-bold text-sm">
                          <Smartphone size={20} />
                        </div>
                      )}

                      {/* Progress Circle Ring or Green Checkmark */}
                      {course.isCompleted ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                          <CheckCircle2 size={18} className="fill-emerald-500 text-white" />
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

                    {/* Topics Count */}
                    <div className="text-xs font-semibold text-slate-600 mb-3">
                      {course.topicsCount} Topics
                    </div>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {course.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-[#e8f1fd] text-[#0b69ff] text-[10px] font-bold tracking-wider uppercase font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={course.link}
                      className="text-xs font-bold text-[#0b69ff] hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                      <span>{course.isCompleted ? "Review Course" : "Continue Learning"}</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 2: Master Growth Cycle ── */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-brand">
                Master Growth Cycle
              </h2>
              <span className="text-xs font-semibold text-slate-500">Upcoming Cycle</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {masterCycleCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Illustration / Badge on Left, Progress Circle on Right */}
                    <div className="flex items-center justify-between mb-4">
                      {course.badge ? (
                        <span className="font-extrabold text-sm text-[#0b69ff] tracking-tight">
                          {course.badge}
                        </span>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                          <Code2 size={20} />
                        </div>
                      )}

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
                    </div>

                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {course.category}
                    </span>

                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0b69ff] transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="text-xs font-semibold text-slate-600 mb-3">
                      {course.topicsCount} Topics
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {course.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-[#e8f1fd] text-[#0b69ff] text-[10px] font-bold tracking-wider uppercase font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={course.link}
                      className="text-xs font-bold text-[#0b69ff] hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                      <span>Start Course</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════════════
           ROLE ROADMAPS (7 Career Tracks in Clean White Style)
           ══════════════════════════════════════════════════════════════════ */
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
                  {(track.skills || []).slice(0, 3).map((s: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
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
