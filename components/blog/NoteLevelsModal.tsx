"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
    badge: string;
    numColor: string;
    arrowBg: string;
    arrowText: string;
  }
> = {
  1: {
    num: "01",
    border: "border-emerald-500/60",
    hoverBorder: "hover:border-emerald-400",
    bg: "bg-[#061A14]",
    hoverBg: "hover:bg-[#0A261E]",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
    numColor: "text-emerald-400",
    arrowBg: "bg-emerald-500 group-hover:bg-emerald-400",
    arrowText: "text-black",
  },
  2: {
    num: "02",
    border: "border-cyan-500/60",
    hoverBorder: "hover:border-cyan-400",
    bg: "bg-[#061626]",
    hoverBg: "hover:bg-[#0A223B]",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/50",
    numColor: "text-cyan-400",
    arrowBg: "bg-cyan-500 group-hover:bg-cyan-400",
    arrowText: "text-black",
  },
  3: {
    num: "03",
    border: "border-purple-500/60",
    hoverBorder: "hover:border-purple-400",
    bg: "bg-[#140D2B]",
    hoverBg: "hover:bg-[#1F1442]",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/50",
    numColor: "text-purple-400",
    arrowBg: "bg-purple-500 group-hover:bg-purple-400",
    arrowText: "text-white",
  },
  4: {
    num: "04",
    border: "border-amber-500/60",
    hoverBorder: "hover:border-amber-400",
    bg: "bg-[#241705]",
    hoverBg: "hover:bg-[#382407]",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/50",
    numColor: "text-amber-400",
    arrowBg: "bg-amber-400 group-hover:bg-amber-300",
    arrowText: "text-black",
  },
};

export default function NoteLevelsModal({
  isOpen,
  onClose,
  note,
  onSelectLevel,
}: NoteLevelsModalProps) {
  const [mounted, setMounted] = useState(false);
  const levels = getNoteLevels(note);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#0B0F19] border-2 border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {note.title}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
              Select a level to open the study notes
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* 4 Large Clean Level Cards */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
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
                className={`group flex items-center justify-between p-6 rounded-2xl border-2 ${theme.border} ${theme.hoverBorder} ${theme.bg} ${theme.hoverBg} transition-colors cursor-pointer`}
              >
                <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                  <span
                    className={`text-3xl sm:text-4xl font-mono font-black ${theme.numColor} flex-shrink-0`}
                  >
                    {theme.num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                      {lvl.levelName}
                    </h3>
                    <span
                      className={`inline-block mt-2 text-xs sm:text-sm font-mono font-bold px-3 py-1 rounded-md border ${theme.badge}`}
                    >
                      {pageText}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl ${theme.arrowBg} ${theme.arrowText} shadow-md flex-shrink-0 ml-4`}
                >
                  <ArrowRight size={20} className="stroke-[2.5]" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Minimal Footer */}
        {note.pdf?.fileUrl && (
          <div className="px-6 sm:px-8 py-4 bg-[#080C14] border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm text-slate-400">
            <span>Read complete handbook from the beginning?</span>
            <a
              href={`${note.pdf.fileUrl}#page=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Full PDF (Page 1)</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
