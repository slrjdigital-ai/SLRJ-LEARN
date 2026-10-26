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
import { PRACTICAL_PROJECTS, getLevel2PracticalProjects } from "@/data/projectsData";
import { useCourseProgress, LearnerCourseProgress } from "@/lib/courseProgress";
import { getLevelProgressionStats, getRecommendedNextCourse } from "@/lib/courseDependencies";
import { getStoredProjectRecords } from "@/lib/projectProgress";
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
  Layers,
  FileText,
  Lock,
  Unlock,
  FolderGit2,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function DashboardClient() {
  const router = useRouter();
  const { user, logout, toggleBookmark } = useAuth();
  const { state: gamificationState, currentLevel } = useGamification();
  const allNotes = useMemo(() => getAllNotes(), []);
  const allCourses = useMemo(() => getAllCourses(), []);
  const { allProgress } = useCourseProgress();

  const enrolledList: LearnerCourseProgress[] = useMemo(() => {
    return Object.values(allProgress).sort(
      (a: LearnerCourseProgress, b: LearnerCourseProgress) =>
        new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime()
    );
  }, [allProgress]);

  const [submittedProjects, setSubmittedProjects] = useState<Record<string, string>>({});
  const [projectRecords, setProjectRecords] = useState<Record<string, any>>({});
  const [dashboardTab, setDashboardTab] = useState<"all" | "roadmap" | "courses" | "activity">("all");
  const [selectedStageTab, setSelectedStageTab] = useState<number>(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("slrj_submitted_projects");
      if (saved) setSubmittedProjects(JSON.parse(saved));
      setProjectRecords(getStoredProjectRecords());
    } catch (e) {
      console.error(e);
    }
  }, []);

  const levelStats = useMemo(
    () => getLevelProgressionStats(allCourses, allProgress),
    [allCourses, allProgress]
  );
  const recommendedNextCourse = useMemo(
    () => getRecommendedNextCourse(allCourses, allProgress),
    [allCourses, allProgress]
  );
  const level2Projects = useMemo(() => getLevel2PracticalProjects(), []);
  const completedProjectsCount = useMemo(() => {
    return Object.values(projectRecords).filter(
      (p: any) => p?.status === "Submitted" || p?.status === "Completed"
    ).length;
  }, [projectRecords]);

  const activeCourseProgress = enrolledList[0] ?? null;

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

      {/* ── Segmented Navigation Tabs (Modern Attractive Pill Controls) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 backdrop-blur-xs border border-slate-200/90 shadow-inner w-full sm:w-fit overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setDashboardTab("all")}
            className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              dashboardTab === "all"
                ? "bg-gradient-to-r from-[#12316B] via-[#173B70] to-[#12316B] text-white shadow-md shadow-[#12316B]/25 ring-1 ring-white/10 font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-2xs"
            }`}
          >
            <span
              className={`p-1 rounded-lg transition-colors ${
                dashboardTab === "all"
                  ? "bg-white/15 text-cyan-300"
                  : "bg-slate-200/70 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#0b69ff]"
              }`}
            >
              <Layers size={14} />
            </span>
            <span>All Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setDashboardTab("roadmap")}
            className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              dashboardTab === "roadmap"
                ? "bg-gradient-to-r from-[#12316B] via-[#173B70] to-[#12316B] text-white shadow-md shadow-[#12316B]/25 ring-1 ring-white/10 font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-2xs"
            }`}
          >
            <span
              className={`p-1 rounded-lg transition-colors ${
                dashboardTab === "roadmap"
                  ? "bg-white/15 text-cyan-300"
                  : "bg-slate-200/70 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#0b69ff]"
              }`}
            >
              <Compass size={14} />
            </span>
            <span>Roadmap Pathway</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold transition-all ${
                dashboardTab === "roadmap"
                  ? "bg-[#18B6D2] text-[#12316B] shadow-2xs"
                  : "bg-blue-50 text-[#0b69ff] border border-blue-200/60"
              }`}
            >
              {roadmapPct}%
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDashboardTab("courses")}
            className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              dashboardTab === "courses"
                ? "bg-gradient-to-r from-[#12316B] via-[#173B70] to-[#12316B] text-white shadow-md shadow-[#12316B]/25 ring-1 ring-white/10 font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-2xs"
            }`}
          >
            <span
              className={`p-1 rounded-lg transition-colors ${
                dashboardTab === "courses"
                  ? "bg-white/15 text-cyan-300"
                  : "bg-slate-200/70 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#0b69ff]"
              }`}
            >
              <BookOpen size={14} />
            </span>
            <span>Enrolled Courses</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold transition-all ${
                dashboardTab === "courses"
                  ? "bg-white/20 text-cyan-200 ring-1 ring-white/20"
                  : "bg-slate-200/80 text-slate-700"
              }`}
            >
              {enrolledList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDashboardTab("activity")}
            className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              dashboardTab === "activity"
                ? "bg-gradient-to-r from-[#12316B] via-[#173B70] to-[#12316B] text-white shadow-md shadow-[#12316B]/25 ring-1 ring-white/10 font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-2xs"
            }`}
          >
            <span
              className={`p-1 rounded-lg transition-colors ${
                dashboardTab === "activity"
                  ? "bg-white/15 text-cyan-300"
                  : "bg-slate-200/70 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#0b69ff]"
              }`}
            >
              <BarChart3 size={14} />
            </span>
            <span>Weekly Activity</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time learning analytics</span>
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

      {/* ── Structured Learning Roadmap Progression Banner ── */}
      {(dashboardTab === "all" || dashboardTab === "roadmap") && (
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#12316B] via-[#173B70] to-[#1F4A8A] text-white shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[#18B6D2] text-[10px] font-bold uppercase tracking-wider font-mono">
              <Compass size={12} className="text-[#18B6D2]" />
              <span>SLRJ Learn • Structured Roadmap Pathway</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-brand">
              My Learning Roadmap Progression
            </h2>
            <p className="text-xs text-blue-100 max-w-xl">
              Currently progressing through <strong>Level {levelStats.currentLevelNumber}</strong> in the {user.track || "Full-Stack Developer"} curriculum.
            </p>
          </div>

          <Link
            href="/roadmap"
            className="px-5 py-2.5 rounded-xl bg-[#18B6D2] hover:bg-[#15a2bc] text-[#12316B] font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Open Roadmap Hub</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* 5-Step Visual Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-white/10">
          {[
            {
              label: "1. Foundation",
              status: levelStats.level1.progressPercentage >= 80 ? "completed" : "current",
              desc: `${levelStats.level1.completedCount}/${levelStats.level1.totalCourses} Passed`,
            },
            {
              label: "2. Intermediate",
              status:
                levelStats.level2.progressPercentage >= 80
                  ? "completed"
                  : levelStats.level2.isUnlocked
                  ? "current"
                  : "locked",
              desc: `${levelStats.level2.completedCount}/${levelStats.level2.totalCourses} Courses`,
            },
            {
              label: "3. Professional",
              status:
                levelStats.level3.progressPercentage >= 80
                  ? "completed"
                  : levelStats.level3.isUnlocked
                  ? "current"
                  : "locked",
              desc: "Specialization",
            },
            {
              label: "4. Practical Projects",
              status: completedProjectsCount >= 6 ? "completed" : "current",
              desc: `${completedProjectsCount}/6 Submitted`,
            },
            {
              label: "5. Capstone Defense",
              status: completedProjectsCount >= 6 && levelStats.level3.completedCount >= 4 ? "current" : "locked",
              desc: "Certification",
            },
          ].map((st, sIdx) => {
            const isDone = st.status === "completed";
            const isCurr = st.status === "current";
            return (
              <div
                key={sIdx}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  isDone
                    ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-200"
                    : isCurr
                    ? "bg-white/15 border-[#18B6D2] text-white shadow-2xs"
                    : "bg-white/5 border-white/10 text-white/50"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold mb-0.5">
                  <span>{st.label}</span>
                  {isDone ? (
                    <CheckCircle2 size={12} className="text-emerald-300" />
                  ) : isCurr ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18B6D2] animate-ping" />
                  ) : (
                    <Lock size={11} className="text-white/40" />
                  )}
                </div>
                <div className="text-[10px] opacity-75 font-mono">{st.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* ── Roadmap Detailed Milestones (Only in Roadmap Tab) ── */}
      {dashboardTab === "roadmap" && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-brand flex items-center gap-2">
                <Compass size={17} className="text-[#0b69ff]" />
                <span>Curriculum Milestone Stages</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Detailed stage progression for your enrolled track: <span className="font-semibold text-slate-700">{user.track || "Full-Stack Developer"}</span>
              </p>
            </div>
            <Link
              href="/roadmap"
              className="text-xs font-bold text-[#0b69ff] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Interactive Roadmap Graph</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level 1 Card */}
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Stage 01</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  levelStats.level1.progressPercentage >= 80 ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-[#0b69ff]"
                }`}>
                  {levelStats.level1.progressPercentage}%
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Foundations &amp; Syntax</h4>
                <p className="text-xs text-slate-500 mt-0.5">Core computer science principles &amp; programming constructs.</p>
              </div>
              <div className="text-[11px] font-semibold text-slate-600 flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span>{levelStats.level1.completedCount} of {levelStats.level1.totalCourses} Passed</span>
                <Link href="/courses" className="text-[#0b69ff] hover:underline font-bold">Review</Link>
              </div>
            </div>

            {/* Level 2 Card */}
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Stage 02</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  levelStats.level2.progressPercentage >= 80 ? "bg-emerald-100 text-emerald-800" : levelStats.level2.isUnlocked ? "bg-blue-100 text-[#0b69ff]" : "bg-slate-200 text-slate-600"
                }`}>
                  {levelStats.level2.isUnlocked ? `${levelStats.level2.progressPercentage}%` : "Locked"}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Intermediate Engineering</h4>
                <p className="text-xs text-slate-500 mt-0.5">Frameworks, relational persistence, and full-stack APIs.</p>
              </div>
              <div className="text-[11px] font-semibold text-slate-600 flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span>{levelStats.level2.completedCount} of {levelStats.level2.totalCourses} Courses</span>
                <Link href="/courses" className="text-[#0b69ff] hover:underline font-bold">Explore</Link>
              </div>
            </div>

            {/* Level 3 & Projects Card */}
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Stage 03 &amp; Projects</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                  {completedProjectsCount}/6 Projects
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Portfolio &amp; Defense</h4>
                <p className="text-xs text-slate-500 mt-0.5">Real-world production builds and senior capstone review.</p>
              </div>
              <div className="text-[11px] font-semibold text-slate-600 flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span>Projects Portfolio</span>
                <Link href="/projects" className="text-[#0b69ff] hover:underline font-bold">Projects Hub</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Continue Learning & Activity Chart (Overview Tab) ── */}
      {dashboardTab === "all" && (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#173B70] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} />
                <span>Continue Learning</span>
              </span>
              <span className="text-xs text-slate-400">
                {activeCourseProgress ? "Recently Active" : "Ready to Start"}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-brand mb-1">
              {activeCourseProgress
                ? activeCourseProgress.courseTitle
                : "Python Programming: Fundamentals to Applied Problem Solving"}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              {activeCourseProgress
                ? `Next Up: ${activeCourseProgress.currentLessonTitle || "Next lesson in curriculum"}`
                : "Begin with Python variables, syntax, data types, and core algorithmic thinking."}
            </p>

            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs text-slate-600 font-semibold">
                <span>Course Progress</span>
                <span className="text-[#173B70]">
                  {activeCourseProgress ? activeCourseProgress.progressPercentage : 0}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#18B6D2] to-[#173B70] rounded-full transition-all"
                  style={{
                    width: `${activeCourseProgress ? activeCourseProgress.progressPercentage : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <Link
            href={
              activeCourseProgress
                ? `/courses/${activeCourseProgress.courseSlug}`
                : "/courses/python-programming"
            }
            className="w-full py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white font-bold text-xs text-center transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{activeCourseProgress ? "Continue Learning" : "Start Learning"}</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Weekly Activity Minutes */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 size={14} className="text-[#173B70]" />
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
                        className="w-full bg-[#173B70] rounded-t-md transition-all duration-300"
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
      )}

      {/* ── Active Hero Card (Courses Tab) ── */}
      {dashboardTab === "courses" && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-[#173B70] uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={14} />
              <span>Currently In Progress</span>
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-brand">
              {activeCourseProgress
                ? activeCourseProgress.courseTitle
                : "Python Programming: Fundamentals to Applied Problem Solving"}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {activeCourseProgress
                ? `Next Up: ${activeCourseProgress.currentLessonTitle || "Next lesson in curriculum"}`
                : "Begin with Python variables, syntax, data types, and core algorithmic thinking."}
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-slate-600 font-semibold">
                <span>Course Completion</span>
                <span className="text-[#173B70]">
                  {activeCourseProgress ? activeCourseProgress.progressPercentage : 0}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#18B6D2] to-[#173B70] rounded-full transition-all"
                  style={{
                    width: `${activeCourseProgress ? activeCourseProgress.progressPercentage : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <Link
            href={
              activeCourseProgress
                ? `/courses/${activeCourseProgress.courseSlug}`
                : "/courses/python-programming"
            }
            className="px-6 py-3 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white font-bold text-xs text-center transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <span>{activeCourseProgress ? "Continue Lesson" : "Start Course"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* ── Expanded Weekly Activity Analytics (Activity Tab) ── */}
      {dashboardTab === "activity" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#173B70] uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 size={15} />
                  <span>Weekly Study Analytics</span>
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-brand mt-1">
                  Learning Velocity &amp; Focus Time
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track daily study habits, active days, and stay on track toward your target milestones.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0b69ff] text-xs font-bold flex items-center gap-1.5">
                  <Clock size={13} />
                  <span>Weekly Total: 0.0 hrs</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                  <TrendingUp size={13} />
                  <span>Target: 5.25 hrs/wk</span>
                </div>
              </div>
            </div>

            {/* Expanded 7-Day Visual Bars */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="flex items-end justify-between gap-3 sm:gap-6 h-48 pt-4">
                {weeklyActivity.map((item, idx) => {
                  const heightPct = Math.round((item.mins / maxMins) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">{item.mins}m</span>
                      <div className="w-full max-w-[42px] bg-slate-200/80 rounded-t-lg h-full flex items-end overflow-hidden shadow-inner">
                        <div
                          className="w-full bg-gradient-to-t from-[#12316B] to-[#18B6D2] rounded-t-lg transition-all duration-300"
                          style={{ height: `${Math.max(heightPct, 6)}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{item.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3 Activity Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-semibold text-slate-500 mb-1">Consistency Score</div>
                <div className="text-xl font-black text-slate-900 font-brand">0% This Week</div>
                <p className="text-[11px] text-slate-500 mt-1">Study 15 minutes today to trigger your streak!</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-semibold text-slate-500 mb-1">Current Study Streak</div>
                <div className="text-xl font-black text-emerald-600 font-brand flex items-center gap-1.5">
                  <Flame size={18} className="text-rose-500" />
                  <span>{userStreak} Consecutive Days</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Keep learning daily to earn Streak Badges.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-semibold text-slate-500 mb-1">Daily Commitment</div>
                <div className="text-xl font-black text-[#173B70] font-brand">45 mins / day</div>
                <p className="text-[11px] text-slate-500 mt-1">Recommended pacing for optimal concept retention.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Enrolled Courses Section ── */}
      {(dashboardTab === "all" || dashboardTab === "courses") && enrolledList.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-brand flex items-center gap-2">
              <BookOpen size={18} className="text-[#173B70]" />
              <span>My Enrolled Courses ({enrolledList.length})</span>
            </h2>
            <Link
              href="/courses"
              className="text-xs font-bold text-[#173B70] hover:underline flex items-center gap-1"
            >
              <span>Explore All Courses</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledList.map((item) => (
              <div
                key={item.courseId}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-[#173B70] border border-blue-200">
                      {item.progressPercentage}% Complete
                    </span>
                  </div>
                  <Link
                    href={`/courses/${item.courseSlug}`}
                    className="font-bold text-sm text-[#182230] hover:text-[#173B70] line-clamp-2"
                  >
                    {item.courseTitle}
                  </Link>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    Current: {item.currentLessonTitle}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#18B6D2] to-[#173B70] rounded-full"
                      style={{ width: `${item.progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                    <span>
                      {item.completedPdfLessonIds.length} of {item.totalPdfLessons} lessons
                    </span>
                    <Link
                      href={`/courses/${item.courseSlug}`}
                      className="font-bold text-[#173B70] hover:underline flex items-center gap-1"
                    >
                      <span>Resume</span>
                      <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Empty State if No Enrolled Courses (Courses Tab) ── */}
      {dashboardTab === "courses" && enrolledList.length === 0 && (
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/90 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0b69ff] flex items-center justify-center mx-auto">
            <BookOpen size={26} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 font-brand">No Enrolled Courses Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You haven&apos;t enrolled in any courses yet. Choose a recommended course below or explore our full curriculum to begin.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0b69ff] hover:bg-blue-600 transition-all shadow-sm"
          >
            <span>Explore All Courses</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* ── Recommended Next Courses ── */}
      {(dashboardTab === "all" || dashboardTab === "courses") && (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 font-brand flex items-center gap-2">
            <Sparkles size={18} className="text-[#18B6D2]" />
            <span>Recommended Next Courses</span>
          </h2>
          <Link
            href="/courses"
            className="text-xs font-bold text-[#173B70] hover:underline flex items-center gap-1"
          >
            <span>View All {allCourses.length} Courses</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allCourses.slice(0, 3).map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#173B70]/30 transition-all shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                    {c.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                    {c.difficulty}
                  </span>
                </div>
                <Link
                  href={`/courses/${c.slug}`}
                  className="font-bold text-sm text-[#182230] hover:text-[#173B70] line-clamp-2"
                >
                  {c.title}
                </Link>
                <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                  {c.shortDescription}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{c.estimatedDuration}</span>
                <Link
                  href={`/courses/${c.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Start</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* ── Assessments & Certificates Hub Banner ── */}
      {(dashboardTab === "all" || dashboardTab === "roadmap" || dashboardTab === "courses") && (
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#12316B] to-[#1F4A8A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-[#18B6D2]" />
            <h3 className="text-base sm:text-lg font-bold font-brand">
              Official Course Assessments &amp; Certificates
            </h3>
          </div>
          <p className="text-xs text-blue-100 max-w-xl">
            Validate your skills with rigorous timed evaluations across our sequenced curriculum. Earn cryptographic digital credentials with instant QR verification.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/certificates"
            className="px-4 py-2.5 rounded-xl bg-white text-[#12316B] hover:bg-blue-50 font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>My Certificates</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
      )}
    </div>
  );
}
