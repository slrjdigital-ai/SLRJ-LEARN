"use client";

import { useEffect } from "react";
import { NoteItem, NoteLevel, getNoteLevels } from "@/data/notes";
import { X, ArrowRight, ExternalLink } from "lucide-react";

interface NoteLevelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: NoteItem;
  onSelectLevel?: (level: NoteLevel) => void;
}

const LEVEL_THEMES: Record<
  number,
  {
    num: string;
    border: string;
    hoverBorder: string;
    bg: string;
    hoverBg: string;
    glow: string;
    badge: string;
    textColor: string;
    arrowBg: string;
    arrowText: string;
  }
> = {
  1: {
    num: "01",
    border: "border-emerald-500/40",
    hoverBorder: "hover:border-emerald-400",
    bg: "bg-emerald-950/20",
    hoverBg: "hover:bg-emerald-950/40",
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    textColor: "text-emerald-400",
    arrowBg: "bg-emerald-500 group-hover:bg-emerald-400",
    arrowText: "text-black",
  },
  2: {
    num: "02",
    border: "border-cyan-500/40",
    hoverBorder: "hover:border-cyan-400",
    bg: "bg-cyan-950/20",
    hoverBg: "hover:bg-cyan-950/40",
    glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.35)]",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    textColor: "text-cyan-400",
    arrowBg: "bg-cyan-500 group-hover:bg-cyan-400",
    arrowText: "text-black",
  },
  3: {
    num: "03",
    border: "border-violet-500/40",
    hoverBorder: "hover:border-violet-400",
    bg: "bg-violet-950/20",
    hoverBg: "hover:bg-violet-950/40",
    glow: "hover:shadow-[0_0_40px_rgba(139,92,246,0.35)]",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    textColor: "text-violet-400",
    arrowBg: "bg-violet-500 group-hover:bg-violet-400",
    arrowText: "text-white",
  },
  4: {
    num: "04",
    border: "border-amber-500/40",
    hoverBorder: "hover:border-amber-400",
    bg: "bg-amber-950/20",
    hoverBg: "hover:bg-amber-950/40",
    glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    textColor: "text-amber-400",
    arrowBg: "bg-gradient-to-r from-amber-400 to-amber-500 group-hover:from-amber-300 group-hover:to-amber-400",
    arrowText: "text-black",
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
      <div className="relative w-full max-w-4xl bg-[#080C16] border-2 border-cyan-500/40 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-[#0D1527] border-b border-slate-800 flex items-center justify-between gap-4 select-none">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              {note.title}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Select a level to start reading
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Big 4 Levels */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {levels.map((lvl) => {
            const theme = LEVEL_THEMES[lvl.levelNumber] || LEVEL_THEMES[1];
            const pageText =
              lvl.pageStart === lvl.pageEnd
                ? `Page ${lvl.pageStart}`
                : `Pages ${lvl.pageStart} – ${lvl.pageEnd}`;

            return (
              <a
                key={lvl.levelNumber}
                href={lvl.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (onSelectLevel) onSelectLevel(lvl);
                  onClose();
                }}
                className={`group relative flex items-center justify-between p-6 sm:p-8 rounded-3xl border-2 ${theme.border} ${theme.hoverBorder} ${theme.bg} ${theme.hoverBg} ${theme.glow} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <div
                    className={`text-3xl sm:text-4xl font-mono font-black ${theme.textColor} opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0`}
                  >
                    {theme.num}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-2xl font-black text-white tracking-wide group-hover:text-cyan-300 transition-colors truncate">
                      {lvl.levelName}
                    </h3>
                    <span
                      className={`inline-block mt-2 text-xs sm:text-sm font-mono font-bold px-3 py-1 rounded-full border ${theme.badge}`}
                    >
                      {pageText}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3.5 sm:p-4 rounded-2xl ${theme.arrowBg} ${theme.arrowText} transition-all group-hover:translate-x-1 shadow-lg flex-shrink-0 ml-4`}
                >
                  <ArrowRight size={22} className="stroke-[2.5]" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Clean Minimal Footer */}
        {note.pdf?.fileUrl && (
          <div className="px-6 sm:px-8 py-4 bg-[#0A0F1D] border-t border-slate-800/80 flex items-center justify-between text-xs text-gray-400">
            <span>Prefer starting from page 1?</span>
            <a
              href={`${note.pdf.fileUrl}#page=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Read Full Document (From Page 1)</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
