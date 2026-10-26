"use client";

import React from "react";
import { CertificateRecord } from "@/data/certificatesStore";
import CertificateDocument from "./CertificateDocument";
import { X, Award } from "lucide-react";

interface CertificateModalProps {
  certificate: CertificateRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  isOpen,
  onClose,
}: CertificateModalProps) {
  if (!isOpen || !certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-4 sm:p-6 lg:p-8 space-y-6 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-[#173B70]">
              <Award size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base font-brand">
                {certificate.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Credential ID: <strong className="text-[#173B70]">{certificate.id}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close certificate"
          >
            <X size={20} />
          </button>
        </div>

        {/* Certificate Landscape Canvas Document */}
        <div className="w-full max-w-4xl mx-auto overflow-hidden">
          <CertificateDocument certificate={certificate} />
        </div>

        {/* Modal Bottom Controls */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white font-bold transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
