"use client";

import { useState } from "react";
import { NoteItem } from "@/data/notes";
import { PdfResource } from "@/data/pdfs";
import PdfPreviewModal from "@/components/blog/PdfPreviewModal";
import { Download, Eye, FileText, CheckCircle2 } from "lucide-react";

interface NoteDetailClientProps {
  note: NoteItem;
  pdfResource?: PdfResource;
}

export default function NoteDetailClient({
  note,
  pdfResource,
}: NoteDetailClientProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-shrink-0">
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
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-400/20 transition-all cursor-pointer active:scale-95"
          >
            <Download size={14} className="text-black" />
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
    </>
  );
}
