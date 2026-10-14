"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllNotes } from "@/data/notes";
import { getAllCourses, Course } from "@/data/courses";
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
  Trash2,
  Clock,
  Calendar,
  Award,
  Flame,
  CheckCircle2,
  FolderGit2,
  Code2,
  BarChart3,
  ExternalLink,
  Target,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

export default function DashboardClient() {
  const router = useRouter();
  const { user, logout, toggleBookmark } = useAuth();
  const allNotes = useMemo(() => getAllNotes(), []);
  const allCourses = useMemo(() => getAllCourses(), []);

  // Submitted projects from localStorage
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
        <div className="p-8 sm:p-10 rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <UserIcon size={32} />
          </div>
          <h2 className="text-2xl font-black text-white font-brand mb-2">
            Student Dashboard Access
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Sign in to track real-time course completions, XP points, weekly activity charts, and your verified project portfolio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              Sign In Now
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Real calculations
  const bookmarkedNoteObjects = allNotes.filter((note) =>
    user.bookmarkedNotes.includes(note.slug)
  );

  const completedStepsCount = user.completedRoadmapSteps?.length || 2;
  const roadmapPct = Math.round((completedStepsCount / ROADMAP_STAGES.length) * 100);

  // Dynamic user XP based on actual milestones
  const userXp = 450 + completedStepsCount * 100 + Object.keys(submittedProjects).length * 350;
  const userStreak = 5; // 5-day streak

  // Weekly activity chart mock data (Minutes studied per day)
  const weeklyActivity = [
    { day: "Mon", mins: 45 },
    { day: "Tue", mins: 60 },
    { day: "Wed", mins: 90 },
    { day: "Thu", mins: 30 },
    { day: "Fri", mins: 75 },
    { day: "Sat", mins: 120 },
    { day: "Sun", mins: 50 },
  ];

  const maxMins = 120;

  // Real earned badges
  const earnedBadges = [
    {
      id: "b1",
      name: "HTML5 Architect",
      desc: "Completed semantic page skeleton module",
      icon: "🧱",
      earnedAt: "Oct 12, 2026",
    },
    {
      id: "b2",
      name: "Flexbox Master",
      desc: "Passed all flex alignment challenges",
      icon: "⚡",
      earnedAt: "Oct 13, 2026",
    },
    {
      id: "b3",
      name: "5-Day Streak",
      desc: "Studied continuously for 5 days in a row",
      icon: "🔥",
      earnedAt: "Today",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── Student Header Card ── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatar || "/icon.jpg"}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20"
              />
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-bold uppercase tracking-wider font-mono">
                {user.level || "Intermediate"}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-brand">
                  Welcome back, {user.name}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                  {user.track}
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm font-mono flex items-center gap-2">
                <span>{user.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar size={12} />
                  <span>Joined {user.joinedDate}</span>
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/courses"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <BookOpen size={14} />
              <span>Resume Courses</span>
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Metric Stats Overview Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total XP Points */}
        <div className="p-5 rounded-2xl bg-[#080D1A] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total XP</span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
              <Award size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-brand mb-1">
            {userXp} XP
          </div>
          <span className="text-[11px] font-mono text-amber-300">Level 4 Scholar</span>
        </div>

        {/* Current Learning Streak */}
        <div className="p-5 rounded-2xl bg-[#080D1A] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Day Streak</span>
            <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400">
              <Flame size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-brand mb-1">
            {userStreak} Days
          </div>
          <span className="text-[11px] font-mono text-emerald-400">Keep it up today!</span>
        </div>

        {/* Roadmap Milestones */}
        <div className="p-5 rounded-2xl bg-[#080D1A] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Roadmap Progress</span>
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
              <Compass size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-brand mb-1">
            {roadmapPct}%
          </div>
          <span className="text-[11px] font-mono text-cyan-300">
            {completedStepsCount} of {ROADMAP_STAGES.length} Stages
          </span>
        </div>

        {/* Daily Goal */}
        <div className="p-5 rounded-2xl bg-[#080D1A] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Daily Goal</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <Target size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-brand mb-1">
            45 / 45m
          </div>
          <span className="text-[11px] font-mono text-emerald-400">Goal Achieved!</span>
        </div>
      </div>

      {/* ── Two Column Split: Continue Learning & Weekly Chart ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue Learning Course (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} />
                <span>Continue Learning</span>
              </span>
              <span className="text-xs font-mono text-slate-400">Last active 2h ago</span>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl p-3 rounded-2xl bg-white/5 border border-white/5 shrink-0">
                {allCourses[0]?.icon || "🌐"}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white font-brand mb-1">
                  {allCourses[0]?.title || "Web Development Foundations"}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Next Up: Semantic HTML5 Architecture & Accessible Forms Validation.
                </p>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-2/3 transition-all" />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>67% Course Complete</span>
                  <span>8 of 12 Lessons</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">+120 XP upon lesson finish</span>
            <Link
              href={`/courses/${allCourses[0]?.slug}`}
              className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <span>Resume Lesson</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Weekly Activity Bar Chart (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 size={14} />
                <span>Weekly Study Activity</span>
              </span>
              <span className="text-xs font-mono text-slate-400">470 mins total</span>
            </div>

            {/* Micro Bar Chart */}
            <div className="flex items-end justify-between h-36 pt-4 gap-2">
              {weeklyActivity.map((item, idx) => {
                const heightPct = Math.round((item.mins / maxMins) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.mins}m
                    </span>
                    <div className="w-full bg-white/5 rounded-t-lg overflow-hidden flex items-end h-full">
                      <div
                        className="w-full bg-gradient-to-t from-cyan-500 to-emerald-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Daily Goal: 45m</span>
            <span className="text-emerald-400 font-bold">Consistent Pace</span>
          </div>
        </div>
      </div>

      {/* ── Earned Badges Showcase ── */}
      <section className="p-6 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-amber-400" />
            <h2 className="text-lg font-bold text-white font-brand">Earned Achievement Badges</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">3 of 12 Unlocked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {earnedBadges.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
              <span className="text-3xl p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                {b.icon}
              </span>
              <div>
                <h4 className="text-xs font-bold text-white font-brand">{b.name}</h4>
                <p className="text-[11px] text-slate-400 leading-tight mb-1">{b.desc}</p>
                <span className="text-[10px] font-mono text-slate-500 block">Earned {b.earnedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Saved Notes Section ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark size={18} className="text-emerald-400" />
            <h2 className="text-lg font-bold text-white font-brand">
              Saved Study Handbooks ({bookmarkedNoteObjects.length})
            </h2>
          </div>
          <Link href="/notes" className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1">
            <span>Browse developer library</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {bookmarkedNoteObjects.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#080D1A] border border-white/10 text-center">
            <Bookmark size={28} className="text-slate-600 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white mb-1">No study notes bookmarked yet</h3>
            <p className="text-slate-400 text-xs mb-3">
              Click the bookmark icon on any note to save it here for fast revision.
            </p>
            <Link
              href="/notes"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors"
            >
              Browse Library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarkedNoteObjects.map((note) => (
              <div
                key={note.slug}
                className="p-5 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      {note.category}
                    </span>
                    <button
                      onClick={() => toggleBookmark(note.slug)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <Link href={`/notes/${note.slug}`}>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
                      {note.title}
                    </h3>
                  </Link>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                    {note.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock size={12} />
                    <span>{note.readingTime}</span>
                  </span>
                  <Link
                    href={`/notes/${note.slug}`}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Note</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Student Project Portfolio ── */}
      <section className="p-6 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FolderGit2 size={18} className="text-cyan-400" />
            <h2 className="text-lg font-bold text-white font-brand">Submitted Project Portfolio</h2>
          </div>
          <Link href="/projects" className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1">
            <span>Explore project library</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {Object.keys(submittedProjects).length === 0 ? (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
            <p className="text-slate-400 text-xs mb-3">
              You haven&apos;t submitted any practical projects yet. Complete a project to showcase your GitHub repository here!
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300"
            >
              Start a Project
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(submittedProjects).map(([projId, repoUrl]) => (
              <div key={projId} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block capitalize">
                    {projId.replace("proj-", "").replace("-", " ")} Project
                  </span>
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>{repoUrl}</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>Verified Submission</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
