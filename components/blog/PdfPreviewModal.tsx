"use client";

import { useEffect, useState } from "react";
import { PdfResource } from "@/data/pdfs";
import { X, Download, ExternalLink, FileText, Loader2, AlertCircle } from "lucide-react";

interface PdfPreviewModalProps {
  pdf: PdfResource | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfPreviewModal({
  pdf,
  isOpen,
  onClose,
}: PdfPreviewModalProps) {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !pdf) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#080C16] border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0D1527] border-b border-slate-800 select-none">
          <div className="flex items-center gap-3 truncate pr-4">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
              <FileText size={18} />
            </div>
            <div className="truncate">
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {pdf.title}
              </h3>
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <span>{pdf.category}</span>
                <span>•</span>
                <span>{pdf.fileSize}</span>
                <span>•</span>
                <span>{pdf.pageCount} Pages</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={pdf.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-medium transition-colors"
              title="Open PDF in new tab"
            >
              <ExternalLink size={13} />
              <span>Open Tab</span>
            </a>

            <a
              href={pdf.fileUrl}
              download={pdf.filename}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20"
            >
              <Download size={13} className="text-black" />
              <span>Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close PDF preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body / Viewer */}
        <div className="relative flex-1 bg-[#050811] w-full h-full flex flex-col">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080C16] z-10 text-slate-400">
              <Loader2 size={36} className="animate-spin text-cyan-400 mb-3" />
              <p className="text-sm font-medium text-slate-200">
                Loading study guide preview...
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Preparing high-resolution vector view
              </p>
            </div>
          )}

          {loadError ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle size={40} className="text-amber-400 mb-3" />
              <h4 className="text-lg font-bold text-white mb-2">
                Inline Preview Unavailable on this Device
              </h4>
              <p className="text-sm text-slate-400 max-w-md mb-5">
                Your browser or mobile operating system may block embedded PDF rendering. You can open or download the complete PDF directly.
              </p>
              <div className="flex gap-3">
                <a
                  href={pdf.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Open in New Tab
                </a>
                <a
                  href={pdf.fileUrl}
                  download={pdf.filename}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs"
                >
                  Download PDF
                </a>
              </div>
            </div>
          ) : (
            <iframe
              key={pdf.fileUrl}
              src={`${pdf.fileUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              title={pdf.title}
              className="w-full h-full border-0"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setLoadError(true);
              }}
            />
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 bg-[#0D1527] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 select-none">
          <span className="font-mono text-[11px]">
            SLRJ Digital Educational Series • Free for non-commercial study
          </span>
          <span className="font-mono text-[11px] text-cyan-400 hidden sm:inline">
            Think. Build. Grow.
          </span>
        </div>
      </div>
    </div>
  );
}
