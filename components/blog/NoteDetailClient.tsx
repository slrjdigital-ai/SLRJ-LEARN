"use client";

import { useState } from "react";
import { NoteItem } from "@/data/notes";
import { PdfResource } from "@/data/pdfs";
import PdfPreviewModal from "@/components/blog/PdfPreviewModal";
import NoteLevelsModal from "@/components/blog/NoteLevelsModal";
import { Download, Eye, FileText, CheckCircle2, Layers } from "lucide-react";

interface NoteDetailClientProps {
  note: NoteItem;
  pdfResource?: PdfResource;
}

export default function NoteDetailClient({
  note,
  pdfResource,
}: NoteDetailClientProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLevelsOpen, setIsLevelsOpen] = useState(false);

  if (!note.pdf?.hasPdf || !pdfResource) return null;

  return (
    <>
      {/* Top Prominent PDF Banner */}
      <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0D1527] via-[#0A101F] to-[#0D1527] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex-shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Downloadable Study Guide
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} />
                <span>Verified PDF</span>
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white">
              {pdfResource.title}
            </h4>
            <p className="text-xs text-gray-400">
              Format: {pdfResource.format} • Size: {pdfResource.fileSize} • Pages: {pdfResource.pageCount}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto flex-shrink-0">
          <button
            onClick={() => setIsLevelsOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-950/40 transition-all cursor-pointer active:scale-95"
          >
            <Layers size={14} className="text-white" />
            <span>Read Complete Notes</span>
          </button>

          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/15 text-xs font-semibold transition-all cursor-pointer"
          >
            <Eye size={14} className="text-cyan-400" />
            <span>Preview</span>
          </button>

          <a
            href={pdfResource.fileUrl}
            download={pdfResource.filename}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/15 text-xs font-semibold transition-all cursor-pointer"
          >
            <Download size={14} className="text-gray-300" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* PDF Modal */}
      <PdfPreviewModal
        pdf={pdfResource}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* 4 Levels Modal */}
      <NoteLevelsModal
        isOpen={isLevelsOpen}
        onClose={() => setIsLevelsOpen(false)}
        note={note}
      />
    </>
  );
}
