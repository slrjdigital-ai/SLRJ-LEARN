"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllNotes } from "@/data/notes";
import { ROADMAP_STAGES } from "@/data/roadmap";
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
} from "lucide-react";

export default function DashboardClient() {
  const router = useRouter();
  const { user, logout, toggleBookmark } = useAuth();
  const allNotes = getAllNotes();

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1527] border border-cyan-500/20 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <UserIcon size={32} />
          </div>
          <h2 className="text-2xl font-black text-white font-brand mb-2">
            Student Dashboard Access
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Sign in to access your personal bookmarked study notes, progress tracking across 5 career roadmaps, and PDF study library.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              Sign In Now
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get bookmarked note objects
  const bookmarkedNoteObjects = allNotes.filter((note) =>
    user.bookmarkedNotes.includes(note.slug)
  );

  // Roadmap percentage
  const roadmapPct = Math.round(
    (user.completedRoadmapSteps.length / ROADMAP_STAGES.length) * 100
  );

  return (
    <div className="space-y-10">
      {/* ── Student Header Card ───────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1527] border border-cyan-500/20 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20"
              />
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-wider font-mono">
                {user.level}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-brand">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                  {user.track}
                </span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm font-mono flex items-center gap-2">
                <span>{user.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Calendar size={12} />
                  <span>Enrolled {user.joinedDate}</span>
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/notes"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <BookOpen size={14} />
              <span>Browse Notes</span>
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Metric Stats Cards ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Roadmap Progress */}
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Roadmap Progress
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Compass size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-white font-brand">
              {roadmapPct}%
            </span>
            <span className="text-xs text-gray-400 font-mono">
              ({user.completedRoadmapSteps.length} of {ROADMAP_STAGES.length} stages)
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${roadmapPct}%` }}
            />
          </div>
        </div>

        {/* Saved Bookmarks */}
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Saved Notes
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Bookmark size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-white font-brand">
              {user.bookmarkedNotes.length}
            </span>
            <span className="text-xs text-gray-400 font-mono">articles saved</span>
          </div>
          <Link
            href="/notes"
            className="text-[11px] font-semibold text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Explore more notes</span>
            <ArrowRight size={11} />
          </Link>
        </div>

        {/* Total Available Tutorials */}
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Curriculum Notes
            </span>
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
              <BookOpen size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-white font-brand">
              {allNotes.length}+
            </span>
            <span className="text-xs text-gray-400 font-mono">topics available</span>
          </div>
          <Link
            href="/notes"
            className="text-[11px] font-semibold text-violet-400 hover:underline flex items-center gap-1"
          >
            <span>Browse library</span>
            <ArrowRight size={11} />
          </Link>
        </div>

        {/* Learning Track Milestone */}
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Current Focus
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="text-sm font-bold text-white mb-2 line-clamp-1">
            React 19 & Next.js Architecture
          </div>
          <Link
            href="/roadmap"
            className="text-[11px] font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>View curriculum track</span>
            <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── Saved Notes Section ──────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark size={18} className="text-emerald-400" />
            <h2 className="text-xl font-bold text-white font-brand">
              My Saved Notes ({bookmarkedNoteObjects.length})
            </h2>
          </div>
          <Link
            href="/notes"
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View all notes</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {bookmarkedNoteObjects.length === 0 ? (
          <div className="p-10 rounded-2xl bg-[#0D1527] border border-slate-800 text-center">
            <Bookmark size={32} className="text-gray-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No notes bookmarked yet</h3>
            <p className="text-gray-400 text-xs mb-4 max-w-sm mx-auto">
              When reading any note or tutorial, click the bookmark icon to save it here for fast revision.
            </p>
            <Link
              href="/notes"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors"
            >
              Browse Developer Library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarkedNoteObjects.map((note) => (
              <div
                key={note.slug}
                className="p-5 rounded-2xl bg-[#0D1527] border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      {note.category}
                    </span>
                    <button
                      onClick={() => toggleBookmark(note.slug)}
                      className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <Link href={`/notes/${note.slug}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
                      {note.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                    {note.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-gray-500 font-mono">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Clock size={12} />
                    <span>{note.readingTime} read</span>
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

      {/* ── Learning Roadmap Shortcut ─────────────────────────── */}
      <section className="p-6 rounded-3xl bg-gradient-to-r from-[#0D1527] via-[#101D38] to-[#0D1527] border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <Compass size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-brand mb-1">
              Resume Your 12-Step Web Development Path
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              You are currently making steady progress! Track completed stages and milestones.
            </p>
          </div>
        </div>
        <Link
          href="/roadmap"
          className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 flex-shrink-0"
        >
          <span>Continue Roadmap</span>
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
