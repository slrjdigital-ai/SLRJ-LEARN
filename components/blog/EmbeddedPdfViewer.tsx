"use client";

import { useState } from "react";
import { NoteItem, NoteLevel, getNoteLevels } from "@/data/notes";
import {
  FileText,
  Download,
  Eye,
  Layers,
  Sparkles,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import NoteLevelsModal from "@/components/blog/NoteLevelsModal";

interface EmbeddedPdfViewerProps {
  note: NoteItem;
}

export default function EmbeddedPdfViewer({ note }: EmbeddedPdfViewerProps) {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [isLevelsModalOpen, setIsLevelsModalOpen] = useState(false);
  const levels = getNoteLevels(note);

  if (!note.pdf?.hasPdf || !note.pdf.fileUrl) return null;

  const handleSelectLevel = (lvl: NoteLevel) => {
    setSelectedPage(lvl.pageStart);
  };

  const iframeSrc = `${note.pdf.fileUrl}#page=${selectedPage}&toolbar=1&navpanes=0`;

  return (
    <>
      <section className="my-8 rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#0B0F1D] shadow-2xl">
        {/* Top Control Bar */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-[#0D1527] via-[#0A101F] to-[#0D1527] border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Complete Handwritten Notebook PDF</span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Live Interactive Viewer
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Exact Handwritten Structure • {note.pdf.pageCount} Pages • {note.pdf.fileSize}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsLevelsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-950/40 transition-all cursor-pointer active:scale-95"
            >
              <Layers size={13} />
              <span>Choose Level</span>
            </button>

            <a
              href={`${note.pdf.fileUrl}#page=${selectedPage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all cursor-pointer"
              title="Open current page in new tab"
            >
              <Eye size={13} />
              <span>Open in Tab</span>
            </a>

            <a
              href={note.pdf.fileUrl}
              download={note.pdf.filename}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold shadow-md shadow-amber-400/20 transition-all cursor-pointer active:scale-95"
            >
              <Download size={13} className="text-black" />
              <span>Download</span>
            </a>
          </div>
        </div>

        {/* Level Quick-Jump Navigation Tabs */}
        <div className="px-5 sm:px-6 py-3 bg-[#090D1A] border-b border-slate-800/80 flex items-center gap-2.5 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => setSelectedPage(1)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex-shrink-0 ${
              selectedPage === 1
                ? "bg-white/20 text-white border border-white/40 shadow-sm"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            Overview (p. 1)
          </button>

          {/* 4 Levels Tabs */}
          {levels.map((lvl) => {
            const isSelected = selectedPage === lvl.pageStart;
            return (
              <button
                key={lvl.levelNumber}
                onClick={() => setSelectedPage(lvl.pageStart)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-black transition-all cursor-pointer flex-shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg shadow-cyan-500/30 scale-[1.02]"
                    : "bg-white/5 text-gray-200 hover:text-cyan-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                <span>{lvl.levelName}</span>
                <span className="text-[11px] opacity-75 font-normal">(p. {lvl.pageStart})</span>
              </button>
            );
          })}
        </div>

        {/* Embedded Iframe */}
        <div className="w-full h-[700px] sm:h-[850px] bg-[#070A14] relative">
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            className="w-full h-full border-0"
            title={`${note.title} Complete PDF`}
          />
        </div>
      </section>

      {/* Levels Modal */}
      <NoteLevelsModal
        isOpen={isLevelsModalOpen}
        onClose={() => setIsLevelsModalOpen(false)}
        note={note}
        onSelectLevel={handleSelectLevel}
      />
    </>
  );
}
