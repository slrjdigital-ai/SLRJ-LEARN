"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import {
  Sparkles,
  ArrowRight,
  Flame,
  Target,
  Compass,
  Terminal,
  Clock,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  PlayCircle,
} from "lucide-react";

export default function HomeWelcomeBanner() {
  const { user } = useAuth();
  const { state, currentLevel } = useGamification();

  const studentName = user?.name || "Shahid";
  const currentTrack = user?.track || "Full-Stack Software Development";
  const streakDays = state.streak.currentStreak || 0;

  // Real or calculated goals (0 completed for fresh user)
  const todayGoalTarget = 3;
  const todayGoalDone = state.completedActivityIds.length || 0;

  const nextRecommendedLesson = {
    title: "1. Introduction to Web Development & HTML Basics",
    stage: "Stage 01 • HTML & Web Foundations",
    duration: "15 mins estimated",
    link: "/roadmap/frontend",
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
      {/* Soft gradient accent decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 via-indigo-50/20 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Greeting, Subtitle, Highlights */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0b69ff] border border-blue-200/70 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} className="text-[#0b69ff]" />
            <span>SLRJ 4.0 Transformation Program</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-brand tracking-tight">
              Welcome, {studentName}!
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Ready to begin your coding journey? Master modern full-stack software development from the ground up and build real projects.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold">
              <Compass size={14} className="text-[#0b69ff]" />
              <span className="text-slate-500">Track:</span>
              <span className="text-slate-900 font-bold">{currentTrack}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
              <Flame size={14} className="text-orange-500 fill-orange-500" />
              <span suppressHydrationWarning>{streakDays} Day Streak</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0b69ff] font-semibold">
              <Target size={14} className="text-[#0b69ff]" />
              <span suppressHydrationWarning>Today&apos;s Goal: {todayGoalDone}/{todayGoalTarget} Completed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Next Lesson Highlight & Quick Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[280px]">
          {/* Next Lesson Snapshot Card */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>First Lesson</span>
              <span className="flex items-center gap-1 text-[#0b69ff]">
                <Clock size={12} />
                <span>{nextRecommendedLesson.duration}</span>
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 line-clamp-1">
              {nextRecommendedLesson.title}
            </div>
            <div className="text-xs text-slate-500">
              {nextRecommendedLesson.stage}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Link
              href={nextRecommendedLesson.link}
              className="w-full px-5 py-3 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white font-extrabold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <PlayCircle size={16} />
              <span>Start Learning Now</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/roadmap"
                className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-1 shadow-xs"
              >
                <Compass size={13} className="text-[#0b69ff]" />
                <span>Roadmaps</span>
              </Link>

              <Link
                href="/practice"
                className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-1 shadow-xs"
              >
                <Terminal size={13} className="text-emerald-600" />
                <span>Playground</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
