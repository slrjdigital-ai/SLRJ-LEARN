"use client";

import { PdfItem, getPdfCategoryColors } from "@/data/pdfs";
import { useAuth } from "@/context/AuthContext";
import { Download, Eye, CheckCircle2, Globe } from "lucide-react";

interface PdfCardProps {
  pdf: PdfItem;
  onPreview: (pdf: PdfItem) => void;
}

export default function PdfCard({ pdf, onPreview }: PdfCardProps) {
  const { markPdfDownloaded } = useAuth();
  const colors = getPdfCategoryColors(pdf.category);

  const handleDownload = () => {
    markPdfDownloaded(pdf.slug);
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#0D1527] to-[#090E1A] border border-slate-800 ${colors.hoverBorder} ${colors.glow} p-6 transition-all duration-300 hover:-translate-y-1`}
    >
      {/* Ambient Top Glow on Hover */}
      <div
        className={`absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent ${colors.topLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span
            className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${colors.badge}`}
          >
            {pdf.category}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-gray-400 px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
              {pdf.fileSize}
            </span>
            <span className="text-[11px] font-mono text-teal-300 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
              {pdf.pageCount} Pages
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white font-brand mb-2 leading-snug">
          {pdf.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
          {pdf.description}
        </p>

        {/* Key Topics List */}
        <div className="mb-4 space-y-1.5">
          <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider block">
            Topics Included:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(pdf.topicsCovered || pdf.topics || []).slice(0, 3).map((topic: string, idx: number) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-300 border border-white/5"
              >
                {topic}
              </span>
            ))}
            {(pdf.topicsCovered || pdf.topics || []).length > 3 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 text-gray-500">
                +{(pdf.topicsCovered || pdf.topics || []).length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-4 border-t border-slate-800/80 mt-auto">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 font-mono">
          <span className="flex items-center gap-1">
            <Globe size={12} className="text-cyan-400" />
            <span>Language: {pdf.language}</span>
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 size={12} />
            <span>100% Free</span>
          </span>
        </div>

        {/* Action Buttons: Preview & Download */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onPreview(pdf)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/10 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-98"
          >
            <Eye size={13} className="text-cyan-400" />
            <span>Preview</span>
          </button>

          <a
            href={pdf.fileUrl}
            download={pdf.filename}
            onClick={handleDownload}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r ${colors.buttonGrad} text-slate-950 font-bold text-xs shadow-lg transition-all duration-200 active:scale-98`}
          >
            <Download size={13} className="text-slate-950" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>
  );
}
