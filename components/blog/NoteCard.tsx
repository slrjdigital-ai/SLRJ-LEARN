"use client";

import { useState } from "react";
import Link from "next/link";
import { NoteItem } from "@/data/notes";
import { useAuth } from "@/context/AuthContext";
import { Clock, Calendar, ArrowRight, Bookmark, FileText, BookOpen, Layers } from "lucide-react";
import NoteLevelsModal from "@/components/blog/NoteLevelsModal";

interface NoteCardProps {
  note: NoteItem;
}

const CATEGORY_COLORS: Record<string, {
  badge: string;
  glow: string;
  hoverBorder: string;
  topLine: string;
  topicPrefix: string;
}> = {
  "Data Structures & Algorithms": {
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(245,158,11,0.22)]",
    hoverBorder: "hover:border-amber-400/60",
    topLine: "via-amber-400/80",
    topicPrefix: "text-amber-400",
  },
  "Python & AI": {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(16,185,129,0.22)]",
    hoverBorder: "hover:border-emerald-400/60",
    topLine: "via-emerald-400/80",
    topicPrefix: "text-emerald-400",
  },
  "Computer Science Core": {
    badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(99,102,241,0.22)]",
    hoverBorder: "hover:border-indigo-400/60",
    topLine: "via-indigo-400/80",
    topicPrefix: "text-indigo-400",
  },
  "Cloud & DevOps": {
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(244,63,94,0.22)]",
    hoverBorder: "hover:border-rose-400/60",
    topLine: "via-rose-400/80",
    topicPrefix: "text-rose-400",
  },
  "Web Development": {
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(6,182,212,0.22)]",
    hoverBorder: "hover:border-cyan-400/60",
    topLine: "via-cyan-400/80",
    topicPrefix: "text-cyan-400",
  },
  "HTML": {
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(249,115,22,0.22)]",
    hoverBorder: "hover:border-orange-400/60",
    topLine: "via-orange-400/80",
    topicPrefix: "text-orange-400",
  },
  "CSS": {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(59,130,246,0.22)]",
    hoverBorder: "hover:border-blue-400/60",
    topLine: "via-blue-400/80",
    topicPrefix: "text-blue-400",
  },
  "JavaScript": {
    badge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(234,179,8,0.22)]",
    hoverBorder: "hover:border-yellow-400/60",
    topLine: "via-yellow-400/80",
    topicPrefix: "text-yellow-400",
  },
  "React": {
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(14,165,233,0.22)]",
    hoverBorder: "hover:border-sky-400/60",
    topLine: "via-sky-400/80",
    topicPrefix: "text-sky-400",
  },
  "Next.js": {
    badge: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(20,184,166,0.22)]",
    hoverBorder: "hover:border-teal-400/60",
    topLine: "via-teal-400/80",
    topicPrefix: "text-teal-400",
  },
  "Git & GitHub": {
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(244,63,94,0.22)]",
    hoverBorder: "hover:border-rose-400/60",
    topLine: "via-rose-400/80",
    topicPrefix: "text-rose-400",
  },
  "Backend & Databases": {
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(139,92,246,0.22)]",
    hoverBorder: "hover:border-violet-400/60",
    topLine: "via-violet-400/80",
    topicPrefix: "text-violet-400",
  },
  "Deployment": {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(16,185,129,0.22)]",
    hoverBorder: "hover:border-emerald-400/60",
    topLine: "via-emerald-400/80",
    topicPrefix: "text-emerald-400",
  },
};

export default function NoteCard({ note }: NoteCardProps) {
  const [isLevelsOpen, setIsLevelsOpen] = useState(false);
  const { user, toggleBookmark } = useAuth();
  const isBookmarked = user?.bookmarkedNotes.includes(note.slug);

  const colors = CATEGORY_COLORS[note.category] || {
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    glow: "hover:shadow-[0_14px_40px_rgba(6,182,212,0.18)]",
    hoverBorder: "hover:border-cyan-400/50",
    topLine: "via-cyan-400/70",
    topicPrefix: "text-cyan-400",
  };

  // Difficulty color badges
  const difficultyStyles = {
    Beginner: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    Intermediate: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    Advanced: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  }[note.difficulty];

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#0C0E23] to-[#070817] border border-indigo-950/60 ${colors.hoverBorder} ${colors.glow} p-6 transition-all duration-300 hover:-translate-y-1`}
    >
      {/* Ambient Top Glow on Hover */}
      <div
        className={`absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent ${colors.topLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div>
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${colors.badge}`}
            >
              {note.category}
            </span>
            {note.subCategory && note.subCategory !== note.category && (
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                note.subCategory === "HTML"
                  ? "bg-orange-500/15 text-orange-300 border-orange-500/30"
                  : note.subCategory === "CSS"
                  ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                  : "bg-teal-500/15 text-teal-300 border-teal-500/30"
              }`}>
                {note.subCategory}
              </span>
            )}
            <span
              className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${difficultyStyles}`}
            >
              {note.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {user && (
              <button
                type="button"
                onClick={() => toggleBookmark(note.slug)}
                className={`p-1.5 rounded-lg border transition-all ${
                  isBookmarked
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                    : "bg-white/5 text-gray-500 hover:text-white border-white/10"
                }`}
                title={isBookmarked ? "Remove Bookmark" : "Save Note to Dashboard"}
              >
                <Bookmark size={13} className={isBookmarked ? "fill-indigo-400" : ""} />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <Link href={`/notes/${note.slug}`} className="block group-hover:text-cyan-300 transition-colors">
          <h3 className="text-lg sm:text-xl font-bold text-white font-brand tracking-tight mb-2 leading-snug">
            {note.title}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
          {note.shortDescription}
        </p>

        {/* Topic Tag */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 font-mono">
          <span className={colors.topicPrefix}>{"//"}</span>
          <span className="truncate">{note.topic}</span>
        </div>
      </div>

      {/* Meta Footer & Action Buttons */}
      <div className="pt-4 border-t border-slate-800/80 mt-auto">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 font-mono">
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-gray-400" />
            <span>{note.readingTime}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-gray-400" />
            <span>{note.lastUpdated}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLevelsOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-indigo-950/40 transition-all duration-300 hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <FileText size={14} />
            <span>Read Complete Notes</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <Link
            href={`/notes/${note.slug}`}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-300 border border-white/10 transition-colors flex-shrink-0"
            title="Read Interactive Web Notes"
          >
            <BookOpen size={14} />
          </Link>
        </div>
      </div>

      {/* 4 Levels Modal */}
      <NoteLevelsModal
        isOpen={isLevelsOpen}
        onClose={() => setIsLevelsOpen(false)}
        note={note}
      />
    </div>
  );
}
