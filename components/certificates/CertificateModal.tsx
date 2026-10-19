"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CertificateRecord } from "@/data/certificatesStore";
import CertificateDocument from "./CertificateDocument";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import {
  X,
  Printer,
  Download,
  Share2,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Award,
  ArrowRight,
  BookOpen,
  Compass,
  FolderGit2,
  Trophy,
} from "lucide-react";

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
  const [copied, setCopied] = useState(false);

  if (!isOpen || !certificate) return null;

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify-certificate/${certificate.id}`
      : `https://slrjlearn.in/verify-certificate/${certificate.id}`;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(verificationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // LinkedIn Add-to-Profile URL generator
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    verificationUrl
  )}`;

  // Activity URL resolution
  const activityUrl =
    certificate.sourceType === "course"
      ? `/courses/${certificate.sourceId}`
      : certificate.sourceType === "roadmap"
      ? `/roadmap/${certificate.sourceId}`
      : certificate.sourceType === "project"
      ? `/projects/${certificate.sourceId}`
      : certificate.sourceType === "event"
      ? `/events/${certificate.sourceId}`
      : `/courses`;

  const ActivityIcon =
    certificate.sourceType === "course"
      ? BookOpen
      : certificate.sourceType === "roadmap"
      ? Compass
      : certificate.sourceType === "project"
      ? FolderGit2
      : Trophy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-4 sm:p-6 lg:p-8 space-y-6 my-auto">
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

        {/* Modal Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs">
          {/* Left Actions: Print & Copy Link */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#173B70] hover:bg-[#122e58] text-white font-bold transition-all shadow-2xs cursor-pointer"
            >
              <Printer size={14} />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold transition-all shadow-2xs cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? "Verification Link Copied!" : "Copy Link"}</span>
            </button>

            <a
              href={linkedinShareUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/30 font-bold transition-all cursor-pointer"
            >
              <LinkedinIcon className="w-3.5 h-3.5 fill-[#0077b5]" />
              <span>Share on LinkedIn</span>
            </a>
          </div>

          {/* Right Actions: Verify Online & View Associated Activity */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/verify-certificate/${certificate.id}`}
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold transition-colors"
            >
              <ShieldCheck size={14} className="text-[#173B70]" />
              <span>Public Verification</span>
              <ExternalLink size={12} className="text-slate-400" />
            </Link>

            <Link
              href={activityUrl}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#173B70] font-bold transition-colors"
            >
              <ActivityIcon size={14} />
              <span>View Associated {certificate.category}</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
