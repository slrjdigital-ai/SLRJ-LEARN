"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import { getAllNotes } from "@/data/notes";
import { getAllCourses } from "@/data/courses";
import { ROADMAP_STAGES } from "@/data/roadmap";
import { PRACTICAL_PROJECTS } from "@/data/projectsData";
import {
  User as UserIcon,
  BookOpen,
  Compass,
  Sparkles,
  Bookmark,
  ArrowRight,
  LogOut,
  Calendar,
  Award,
  Flame,
  CheckCircle2,
  Code2,
  BarChart3,
  Target,
  ChevronRight,
} from "lucide-react";

export default function DashboardClient() {
  const router = useRouter();
  const { user, logout, toggleBookmark } = useAuth();
  const { state: gamificationState, currentLevel } = useGamification();
  const allNotes = useMemo(() => getAllNotes(), []);
  const allCourses = useMemo(() => getAllCourses(), []);

  const [submittedProjects, setSubmittedProjects] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("slrj_submitted_projects");
      if (saved) setSubmittedProjects(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0b69ff] flex items-center justify-center mx-auto mb-4">
            <UserIcon size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-brand mb-2">
            Student Profile Access
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Sign in to track real-time course completions, XP points, weekly activity, and verified projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[#0b69ff] hover:bg-blue-600 transition-all"
            >
              Sign In Now
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const completedStepsCount = user.completedRoadmapSteps?.length || 0;
  const roadmapPct = Math.round((completedStepsCount / ROADMAP_STAGES.length) * 100);

  const userXp = gamificationState.xp.totalXP || 0;
  const userStreak = gamificationState.streak.currentStreak || 0;

  const weeklyActivity = [
    { day: "Mon", mins: 0 },
    { day: "Tue", mins: 0 },
    { day: "Wed", mins: 0 },
    { day: "Thu", mins: 0 },
    { day: "Fri", mins: 0 },
    { day: "Sat", mins: 0 },
    { day: "Sun", mins: 0 },
  ];

  const maxMins = 120;

  return (
    <div className="space-y-8">
      {/* ── Student Header Card ── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar || "/icon.jpg"}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-[#e8f1fd] text-[#0b69ff] text-[10px] font-bold uppercase tracking-wider font-mono border border-blue-200">
              {user.level || "Smart"}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900 font-brand">
                Welcome back, {user.name}!
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                {user.track}
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-2">
              <span>{user.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                <span>Joined {user.joinedDate}</span>
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/roadmap"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0b69ff] hover:bg-blue-600 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>My Journey</span>
            <ChevronRight size={14} />
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Sign Out"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* ── Metric Stats Overview Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total XP Points */}
        <Link
          href="/gamification"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-300 transition-all shadow-sm cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total XP
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Award size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand mb-1">
            {userXp} XP
          </div>
          <span className="text-[11px] font-semibold text-amber-600 flex items-center justify-between">
            <span>{currentLevel.title}</span>
            <ChevronRight size={13} />
          </span>
        </Link>

        {/* Current Learning Streak */}
        <Link
          href="/gamification"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 transition-all shadow-sm cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Day Streak
            </span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-500">
              <Flame size={16} className="animate-pulse" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand mb-1">
            {userStreak} Days
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center justify-between">
            <span>Consistent Learner</span>
            <ChevronRight size={13} />
          </span>
        </Link>

        {/* Roadmap Milestones */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Journey Progress
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-[#0b69ff]">
              <Compass size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand mb-1">
            {roadmapPct}%
          </div>
          <span className="text-[11px] font-semibold text-[#0b69ff]">
            {completedStepsCount} of {ROADMAP_STAGES.length} Stages
          </span>
        </div>

        {/* Daily Goal */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Daily Goal
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Target size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand mb-1">
            0 / 45m
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Not Started Today</span>
        </div>
      </div>

      {/* ── Continue Learning & Activity Chart ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#0b69ff] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} />
                <span>Current Course</span>
              </span>
              <span className="text-xs text-slate-400">{completedStepsCount > 0 ? "Recently Active" : "Not started yet"}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-brand mb-1">
              Web Development Foundations: HTML5, CSS3 & JavaScript
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Next Up: Introduction to HTML5 tags, document structures, and modern syntax.
            </p>

            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs text-slate-600 font-semibold">
                <span>Module Progress</span>
                <span className="text-[#0b69ff]">{roadmapPct}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0b69ff] rounded-full" style={{ width: `${roadmapPct}%` }} />
              </div>
            </div>
          </div>

          <Link
            href="/roadmap/frontend"
            className="w-full py-2.5 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white font-bold text-xs text-center transition-all shadow-sm"
          >
            {completedStepsCount > 0 ? "Resume Course" : "Start Course"}
          </Link>
        </div>

        {/* Weekly Activity Minutes */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 size={14} className="text-[#0b69ff]" />
                <span>Weekly Time Spent</span>
              </span>
              <span className="text-xs font-bold text-slate-600 font-mono">0.0 hrs</span>
            </div>

            <div className="flex items-end justify-between gap-2 h-32 pt-4">
              {weeklyActivity.map((item, idx) => {
                const heightPct = Math.round((item.mins / maxMins) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[9px] font-mono text-slate-400">{item.mins}m</span>
                    <div className="w-full bg-slate-100 rounded-t-md h-full flex items-end overflow-hidden">
                      <div
                        className="w-full bg-[#0b69ff] rounded-t-md transition-all duration-300"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
