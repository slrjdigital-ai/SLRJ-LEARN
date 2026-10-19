"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CertificateRecord } from "@/data/certificatesStore";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Share2,
  Download,
  Eye,
  Check,
  Copy,
  AlertTriangle,
  QrCode,
  ExternalLink,
} from "lucide-react";

interface CertificateCardProps {
  certificate: CertificateRecord;
  onViewCertificate: (cert: CertificateRecord) => void;
}

export default function CertificateCard({
  certificate,
  onViewCertificate,
}: CertificateCardProps) {
  const [copied, setCopied] = useState(false);
  const isRevoked = certificate.status === "revoked";

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/verify-certificate/${certificate.id}`
        : `https://slrjlearn.in/verify-certificate/${certificate.id}`;

    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewCertificate(certificate);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div
      onClick={() => onViewCertificate(certificate)}
      className="group rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* ── Certificate Miniature Preview Canvas ── */}
      <div className="relative w-full aspect-[1.5/1] bg-gradient-to-br from-[#FCFDFE] via-slate-50 to-blue-50/30 p-4 border-b border-slate-200/80 flex flex-col justify-between overflow-hidden select-none">
        {/* Double Border Miniature */}
        <div className="absolute inset-2 border-2 border-double border-[#173B70]/30 rounded-lg pointer-events-none" />

        {/* Top Miniature Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#173B70] text-white flex items-center justify-center font-bold text-[10px]">
              S
            </div>
            <span className="font-brand font-black text-[11px] text-[#173B70] tracking-wider uppercase">
              SLRJ Learn
            </span>
          </div>

          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              isRevoked
                ? "bg-rose-50 text-rose-700 border border-rose-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}
          >
            {isRevoked ? "Revoked" : "Verified"}
          </span>
        </div>

        {/* Center Recipient & Title Preview */}
        <div className="relative z-10 text-center my-auto py-1">
          <span className="text-[9px] uppercase tracking-widest text-[#173B70] font-bold block">
            {certificate.title}
          </span>
          <div className="font-serif font-bold text-slate-900 text-sm sm:text-base mt-0.5 truncate">
            {certificate.learnerName}
          </div>
          <div className="text-[11px] font-brand font-bold text-[#173B70] line-clamp-1 mt-0.5">
            {certificate.sourceTitle}
          </div>
        </div>

        {/* Bottom Miniature Seal & QR Code */}
        <div className="relative z-10 flex items-center justify-between text-[9px] text-slate-500 border-t border-slate-200/60 pt-1">
          <span className="font-mono text-[9px] text-[#173B70] font-bold truncate max-w-[140px]">
            {certificate.id}
          </span>
          <div className="flex items-center gap-1 text-slate-400">
            <QrCode size={13} className="text-[#173B70]" />
            <span>Verified</span>
          </div>
        </div>

        {/* Revoked watermark if revoked */}
        {isRevoked && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs flex items-center justify-center z-20">
            <span className="rotate-[-20deg] px-3 py-1 rounded border-2 border-rose-600 text-rose-600 font-black text-xs uppercase tracking-widest">
              REVOKED
            </span>
          </div>
        )}
      </div>

      {/* ── Card Body & Metadata ── */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-xs">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-blue-50 text-[#173B70] font-bold">
              {certificate.category}
            </span>
            <span className="font-medium">{certificate.issueDate}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-[#173B70] transition-colors">
            {certificate.sourceTitle}
          </h3>

          <p className="text-slate-500 text-[11px] line-clamp-1">
            Issued by {certificate.issuer}
          </p>

          {/* Skills Preview */}
          {certificate.skillsGained && certificate.skillsGained.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {certificate.skillsGained.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Action Buttons ── */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => onViewCertificate(certificate)}
            className="flex-1 py-2 px-3 rounded-xl bg-[#173B70] hover:bg-[#122e58] text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Eye size={13} />
            <span>View Certificate</span>
          </button>

          <button
            onClick={handleDownload}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Download / Print PDF"
          >
            <Download size={14} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            title={copied ? "Link Copied!" : "Share Verification Link"}
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
