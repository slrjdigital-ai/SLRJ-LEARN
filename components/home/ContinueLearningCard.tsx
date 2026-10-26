"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Play,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function ContinueLearningCard() {
  const { user } = useAuth();

  const totalStages = 14;
  const completedStages = user?.completedRoadmapSteps?.length || 0;
  const progressPercent = Math.round((completedStages / totalStages) * 100);

  // Active course data based on user track / progress
  const activeCourse = {
    title: "Build Your Own Responsive Website",
    category: "Frontend Development",
    track: "Full-Stack Software Development",
    currentModule: "Module 1: HTML5 Document Structure & Semantic Web",
    nextLesson: "Stage 01 • Introduction to Web Development & HTML Basics",
    progressPercent,
    totalStages,
    completedStages,
    lastActivity: completedStages > 0 ? "Recently active" : "Not started yet",
    estimatedRemaining: "14 stages to complete",
    targetHref: "/roadmap/frontend",
  };

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
      {/* Background soft highlight */}
      <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-blue-50/60 to-transparent pointer-events-none" />

      <div className="flex items-center justify-between gap-4 mb-5 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0b69ff]" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider font-brand">
            {completedStages > 0 ? "Continue Learning" : "Start Your First Course"}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <Clock size={14} className="text-slate-400" />
          <span>Status: <strong className="text-slate-700 font-semibold">{activeCourse.lastActivity}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left 8 Cols: Course title, module, next lesson & progress */}
        <div className="lg:col-span-8 space-y-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#0b69ff] border border-blue-200 uppercase tracking-wider">
              {activeCourse.category}
            </span>
            <span className="text-sm text-slate-400">•</span>
            <span className="text-sm font-semibold text-slate-600">
              {activeCourse.currentModule}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-brand tracking-tight">
            {activeCourse.title}
          </h3>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-blue-100/70 text-[#0b69ff] mt-0.5">
              <BookOpen size={18} />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b69ff] uppercase tracking-wider block">
                Next Up:
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug mt-0.5">
                {activeCourse.nextLesson}
              </p>
            </div>
          </div>

          {/* Progress bar with percentage */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-600 font-medium">
                Overall Course Progress ({activeCourse.completedStages} of {activeCourse.totalStages} stages completed)
              </span>
              <span className="font-mono font-bold text-[#0b69ff] text-base">
                {activeCourse.progressPercent}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70">
              <div
                className="h-full bg-gradient-to-r from-[#0b69ff] via-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${activeCourse.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right 4 Cols: CTA Button & Quick info */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100/80">
          <div className="text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Estimated Left:</span>
              <span className="font-bold text-slate-800">{activeCourse.estimatedRemaining}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">XP Reward:</span>
              <span className="font-bold text-[#0b69ff]">+120 XP upon stage finish</span>
            </div>
          </div>

          <Link
            href={activeCourse.targetHref}
            className="w-full py-3 px-5 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Play size={15} className="fill-white" />
            <span>{completedStages > 0 ? "Resume Lesson Now" : "Begin Lesson Now"}</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/roadmap"
            className="text-center text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors py-1"
          >
            View all 14 stages in roadmap →
          </Link>
        </div>
      </div>
    </div>
  );
}
