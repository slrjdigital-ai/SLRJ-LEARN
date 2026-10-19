"use client";

import React from "react";
import { CertificateRecord } from "@/data/certificatesStore";
import { Award, ShieldCheck, CheckCircle2, QrCode } from "lucide-react";

interface CertificateDocumentProps {
  certificate: CertificateRecord;
  className?: string;
}

export default function CertificateDocument({
  certificate,
  className = "",
}: CertificateDocumentProps) {
  const isRevoked = certificate.status === "revoked";
  const verificationPath = `/verify-certificate/${certificate.id}`;

  return (
    <div
      id={`cert-doc-${certificate.id}`}
      className={`relative w-full aspect-[1.414/1] bg-[#FCFDFE] text-slate-900 p-6 sm:p-10 lg:p-12 rounded-2xl shadow-xl border-8 border-double border-[#173B70] flex flex-col justify-between overflow-hidden print:m-0 print:p-8 print:shadow-none print:rounded-none print:border-8 select-none ${className}`}
    >
      {/* Decorative Corner Filigrees & Security Watermark */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#173B70]" />
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#173B70]" />
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#173B70]" />
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#173B70]" />

      {/* Subtle Background Radial Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#173B70_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Revoked Watermark Overlay if applicable */}
      {isRevoked && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="rotate-[-25deg] px-8 py-3 rounded-2xl border-4 border-rose-600/40 bg-rose-500/10 text-rose-600 font-black text-4xl sm:text-6xl uppercase tracking-widest backdrop-blur-2xs shadow-lg">
            REVOKED
          </div>
        </div>
      )}

      {/* ── Header: Issuer Branding & Seal ── */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-[#173B70]/15 pb-4 sm:pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#173B70] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-md">
            S
          </div>
          <div>
            <div className="font-brand font-black text-base sm:text-xl text-[#173B70] tracking-wider uppercase">
              SLRJ Learn
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wide">
              Academy of Advanced Software Engineering
            </div>
          </div>
        </div>

        {/* Verification & Category Badge */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#173B70] border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} className="text-[#173B70]" />
            <span>Verifiable Credential</span>
          </span>

          <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase">
            {certificate.category}
          </span>
        </div>
      </div>

      {/* ── Main Body: Award Statement & Recipient ── */}
      <div className="relative z-10 text-center my-auto py-2 sm:py-4 space-y-2 sm:space-y-3">
        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#173B70] block">
          This is to certify that
        </span>

        {/* Recipient Name */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight underline decoration-amber-400/60 decoration-2 underline-offset-8">
          {certificate.learnerName}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto pt-1 leading-relaxed">
          has successfully satisfied all rigorous curriculum assessments, practical milestone tasks, and technical criteria for:
        </p>

        {/* Course / Program Title */}
        <h2 className="text-base sm:text-2xl lg:text-3xl font-brand font-black text-[#173B70] max-w-2xl mx-auto leading-tight">
          {certificate.sourceTitle}
        </h2>

        {/* Skills Tag Cloud */}
        {certificate.skillsGained && certificate.skillsGained.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
            {certificate.skillsGained.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-xs text-slate-700 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer: Signature, Seal, Date, QR Code & Credential ID ── */}
      <div className="relative z-10 pt-4 sm:pt-6 border-t-2 border-[#173B70]/15 flex items-end justify-between gap-4 text-xs">
        {/* Left: Authorized Signature */}
        <div className="space-y-1 text-left">
          <div className="font-serif italic text-base sm:text-xl text-[#173B70] font-bold">
            K. Shahid & Academic Board
          </div>
          <div className="w-36 sm:w-44 h-0.5 bg-slate-300" />
          <div className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Director of Academic Standards
          </div>
          <div className="text-[9px] sm:text-[10px] text-slate-400">
            {certificate.issuer}
          </div>
        </div>

        {/* Center: Gold Embossed Seal */}
        <div className="hidden sm:flex flex-col items-center">
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-amber-950 flex items-center justify-center shadow-md border-2 border-white">
            <Award size={28} />
          </div>
          <span className="text-[8px] font-black uppercase tracking-wider text-amber-900 mt-1">
            Official Seal
          </span>
        </div>

        {/* Right: Date, QR Code & Credential ID */}
        <div className="space-y-1 text-right flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase">
                Date Issued: {certificate.issueDate}
              </div>
              <div className="font-mono text-[9px] sm:text-[11px] font-bold text-[#173B70]">
                ID: {certificate.id}
              </div>
            </div>

            {/* Verification QR Icon badge */}
            <div className="p-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <QrCode size={26} className="text-[#173B70]" />
            </div>
          </div>
          <div className="text-[8px] sm:text-[9px] text-slate-400 font-mono">
            Verify at: slrjlearn.in{verificationPath}
          </div>
        </div>
      </div>
    </div>
  );
}
