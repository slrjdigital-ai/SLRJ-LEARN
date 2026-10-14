"use client";

import { useEffect } from "react";
import Link from "next/link";
import { NoteItem, NoteLevel, getNoteLevels } from "@/data/notes";
import {
  X,
  FileText,
  ExternalLink,
  BookOpen,
  Download,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface NoteLevelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: NoteItem;
  onSelectLevel?: (level: NoteLevel) => void;
}

const THEME_STYLES: Record<
  "emerald" | "cyan" | "violet" | "amber",
  {
    badge: string;
    border: string;
    hoverBorder: string;
    bg: string;
    glow: string;
    pill: string;
    accent: string;
    btn: string;
  }
> = {
  emerald: {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    border: "border-emerald-500/25",
    hoverBorder: "hover:border-emerald-400/60",
    bg: "bg-gradient-to-br from-emerald-950/20 via-[#0A121A] to-[#080D1A]",
    glow: "hover:shadow-[0_12px_32px_rgba(16,185,129,0.18)]",
    pill: "bg-emerald-500/10 text-emerald-300/90 border-emerald-500/20",
    accent: "text-emerald-400",
    btn: "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/25",
  },
  cyan: {
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    border: "border-cyan-500/25",
    hoverBorder: "hover:border-cyan-400/60",
    bg: "bg-gradient-to-br from-cyan-950/20 via-[#0A121A] to-[#080D1A]",
    glow: "hover:shadow-[0_12px_32px_rgba(6,182,212,0.18)]",
    pill: "bg-cyan-500/10 text-cyan-300/90 border-cyan-500/20",
    accent: "text-cyan-400",
    btn: "bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/25",
  },
  violet: {
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    border: "border-violet-500/25",
    hoverBorder: "hover:border-violet-400/60",
    bg: "bg-gradient-to-br from-violet-950/20 via-[#0A121A] to-[#080D1A]",
    glow: "hover:shadow-[0_12px_32px_rgba(139,92,246,0.18)]",
    pill: "bg-violet-500/10 text-violet-300/90 border-violet-500/20",
    accent: "text-violet-400",
    btn: "bg-violet-500 hover:bg-violet-400 text-white shadow-violet-500/25",
  },
  amber: {
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    border: "border-amber-500/25",
    hoverBorder: "hover:border-amber-400/60",
    bg: "bg-gradient-to-br from-amber-950/20 via-[#0A121A] to-[#080D1A]",
    glow: "hover:shadow-[0_12px_32px_rgba(245,158,11,0.18)]",
    pill: "bg-amber-500/10 text-amber-300/90 border-amber-500/20",
    accent: "text-amber-400",
    btn: "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black shadow-amber-500/25",
  },
};

export default function NoteLevelsModal({
  isOpen,
  onClose,
  note,
  onSelectLevel,
}: NoteLevelsModalProps) {
  const levels = getNoteLevels(note);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#080C16] border border-cyan-500/30 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 sm:px-8 py-5 bg-gradient-to-r from-[#0D1527] via-[#0A101F] to-[#0D1527] border-b border-cyan-500/20 flex items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-400 border border-cyan-500/30 flex-shrink-0 shadow-lg shadow-cyan-500/10">
              <Layers size={22} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                  <Sparkles size={11} />
                  <span>4 Structured Learning Levels</span>
                </span>
                {note.pdf?.pageCount && (
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>{note.pdf.pageCount}-Page Complete Notebook</span>
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white truncate">
                {note.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-6">
          {/* Subheader / Orientation */}
          <div className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800 text-xs sm:text-sm text-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-semibold text-white">Choose your target level.</span>{" "}
              Each level is organized sequentially from absolute beginner fundamentals to production-grade engineering.
            </div>
            <div className="text-xs font-mono text-cyan-400 flex-shrink-0">
              4 Distinct Chapters Available
            </div>
          </div>

          {/* 4 Levels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {levels.map((lvl) => {
              const theme = THEME_STYLES[lvl.colorTheme] || THEME_STYLES.cyan;
              const pageText =
                lvl.pageStart === lvl.pageEnd
                  ? `Page ${lvl.pageStart}`
                  : `Pages ${lvl.pageStart} – ${lvl.pageEnd}`;
              const pageCount = lvl.pageEnd - lvl.pageStart + 1;

              return (
                <div
                  key={lvl.levelNumber}
                  className={`relative rounded-2xl border ${theme.border} ${theme.hoverBorder} ${theme.bg} ${theme.glow} p-5 flex flex-col justify-between transition-all duration-300 group`}
                >
                  {/* Top Level Bar */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${theme.badge} tracking-wider`}
                      >
                        {lvl.levelName}
                      </span>
                      <span className="text-xs font-mono text-gray-400 bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
                        {pageText} ({pageCount} {pageCount === 1 ? "page" : "pages"})
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                      {lvl.tagline}
                    </h3>
                    <p className="text-xs text-gray-300/90 leading-relaxed mb-4">
                      {lvl.description}
                    </p>

                    {/* Topic Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {lvl.topics.slice(0, 5).map((topic, idx) => (
                        <span
                          key={idx}
                          className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${theme.pill}`}
                        >
                          {topic}
                        </span>
                      ))}
                      {lvl.topics.length > 5 && (
                        <span className="text-[10px] font-mono text-gray-500 self-center">
                          +{lvl.topics.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons for this Level */}
                  <div className="flex items-center gap-2 pt-3 border-t border-white/5 mt-auto">
                    {/* Read in PDF */}
                    <a
                      href={lvl.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (onSelectLevel) onSelectLevel(lvl);
                      }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95 ${theme.btn}`}
                    >
                      <FileText size={14} />
                      <span>Read PDF ({pageText.split(" ")[0]} {lvl.pageStart})</span>
                      <ArrowRight size={13} />
                    </a>

                    {/* Read in Web Notes */}
                    <Link
                      href={`/notes/${note.slug}#${lvl.sectionAnchor}`}
                      onClick={() => {
                        onClose();
                        if (onSelectLevel) onSelectLevel(lvl);
                      }}
                      className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
                      title="Read Web Notes"
                    >
                      <BookOpen size={13} />
                      <span className="hidden sm:inline">Web Notes</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer / Read Full Document Options */}
        <div className="px-5 sm:px-8 py-4 bg-[#0A0F1D] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-gray-400 flex items-center gap-2">
            <span>Want to start from page 1?</span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span className="hidden sm:inline text-gray-400">
              Overview Roadmap & Complete 27 Pages
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {note.pdf?.fileUrl && (
              <a
                href={`${note.pdf.fileUrl}#page=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 font-semibold transition-colors cursor-pointer"
              >
                <ExternalLink size={13} />
                <span>Read Full PDF (From Page 1)</span>
              </a>
            )}

            {note.pdf?.fileUrl && (
              <a
                href={note.pdf.fileUrl}
                download={note.pdf.filename}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 font-medium transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>Download ({note.pdf.fileSize})</span>
              </a>
            )}

            <Link
              href={`/notes/${note.slug}`}
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 font-medium transition-colors cursor-pointer"
            >
              <BookOpen size={13} />
              <span>Full Web Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
