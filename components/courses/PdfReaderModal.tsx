"use client";

import { useState, useEffect, useRef } from "react";
import { Course, PdfLesson } from "@/data/courses";
import {
  X,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  BookOpen,
  ShieldCheck,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface PdfReaderModalProps {
  course: Course;
  lesson: PdfLesson | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateLesson?: (direction: "prev" | "next") => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function PdfReaderModal({
  course,
  lesson,
  isOpen,
  onClose,
  onNavigateLesson,
  hasPrev = false,
  hasNext = false,
}: PdfReaderModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !lesson) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 15, 175));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 15, 60));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`PDF Reader - ${lesson.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-2 sm:p-4 md:p-6 transition-all"
    >
      <div
        ref={containerRef}
        className={`bg-white rounded-2xl shadow-2xl flex flex-col w-full overflow-hidden border border-slate-200 transition-all ${
          isFullscreen ? "fixed inset-2 z-50 rounded-xl" : "max-w-6xl h-[92vh]"
        }`}
      >
        {/* ── Top Header Toolbar ── */}
        <header className="px-4 py-3 sm:px-6 bg-[#12316B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900 shadow-xs">
          {/* Left: Document Metadata */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#18B6D2]">
              <FileText size={18} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-2 py-0.5 rounded">
                  {lesson.moduleTitle}
                </span>
                <span className="text-[10px] text-blue-200">
                  {lesson.pageCount} Pages • {lesson.fileSize}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md sm:max-w-xl font-brand">
                {lesson.title}
              </h2>
            </div>
          </div>

          {/* Right: Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-between sm:justify-end">
            {/* Zoom Controls */}
            <div className="flex items-center bg-white/10 rounded-xl p-0.5 text-xs text-blue-100">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 60}
                className="p-1.5 hover:bg-white/15 rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut size={14} />
              </button>
              <button
                onClick={handleZoomReset}
                className="px-2 py-1 font-mono text-[11px] font-semibold hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
                title="Reset Zoom"
                aria-label="Reset Zoom to 100%"
              >
                {zoomLevel}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 175}
                className="p-1.5 hover:bg-white/15 rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn size={14} />
              </button>
            </div>

            {/* Open in New Tab Fallback */}
            <a
              href={lesson.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title="Open PDF in new browser tab"
              aria-label="Open PDF in new tab"
            >
              <ExternalLink size={16} />
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="hidden sm:block p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-blue-200 hover:text-white hover:bg-rose-500/80 rounded-xl transition-colors cursor-pointer"
              title="Close PDF Reader (Esc)"
              aria-label="Close PDF Reader"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* ── Reader Main Display Pane ── */}
        <main className="flex-1 bg-slate-100/90 overflow-auto flex items-center justify-center p-2 sm:p-4 relative">
          <div
            className="w-full h-full bg-white rounded-xl shadow-inner border border-slate-200/80 overflow-hidden flex flex-col transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
              maxHeight: zoomLevel > 100 ? `${100 * (zoomLevel / 100)}%` : "100%",
            }}
          >
            {/* Embedded Native PDF Viewer */}
            <iframe
              src={`${lesson.fileUrl}#toolbar=0&navpanes=0`}
              title={lesson.title}
              className="w-full flex-1 border-0"
              loading="lazy"
            />
          </div>

          {/* Navigation Overlay Buttons (Prev / Next) */}
          {onNavigateLesson && (
            <>
              {hasPrev && (
                <button
                  onClick={() => onNavigateLesson("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg border border-slate-200 hover:scale-105 transition-all cursor-pointer z-10"
                  title="Previous PDF Lesson"
                  aria-label="Previous Lesson"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {hasNext && (
                <button
                  onClick={() => onNavigateLesson("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg border border-slate-200 hover:scale-105 transition-all cursor-pointer z-10"
                  title="Next PDF Lesson"
                  aria-label="Next Lesson"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </>
          )}
        </main>

        {/* ── Bottom Status Bar ── */}
        <footer className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">{course.title}</span>
            <span>•</span>
            <span className="text-slate-500">Order: Lesson #{lesson.displayOrder}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-[10px] text-slate-700">Esc</kbd> to exit reader</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
