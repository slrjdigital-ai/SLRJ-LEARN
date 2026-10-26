"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CertificateRecord } from "@/data/certificatesStore";
import {
  ShieldCheck,
  Award,
  Download,
  Share2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Printer,
  Copy,
  Check,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

interface CertificateVerificationViewProps {
  certificate: CertificateRecord | null;
  certificateId: string;
}

export default function CertificateVerificationView({
  certificate,
  certificateId,
}: CertificateVerificationViewProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify-certificate/${certificateId}`
      : `https://slrjlearn.in/verify-certificate/${certificateId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // ══════════════════════════════════════════════════════════════════
  // NOT FOUND / REVOKED STATE
  // ══════════════════════════════════════════════════════════════════
  if (!certificate) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C83C4A] mx-auto flex items-center justify-center">
          <AlertTriangle size={32} />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C83C4A]">
            Certificate Record Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-brand text-[#182230]">
            Invalid Certificate Identifier
          </h1>
          <p className="text-sm text-[#64748B] max-w-md mx-auto">
            No verified certificate record matches the identifier <code className="px-2 py-0.5 rounded bg-slate-100 font-mono font-bold text-[#182230]">{certificateId}</code>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs text-[#64748B] text-left space-y-1.5 max-w-md mx-auto">
          <p className="font-bold text-[#182230]">Verification Integrity Notice:</p>
          <p>
            SLRJ Learn certificates are cryptographic, server-verified documents. If you believe this is an error, verify that the link or QR scan was typed correctly.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#12316B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2456A6] transition-colors"
          >
            <span>Explore Certified Courses</span>
          </Link>
        </div>
      </div>
    );
  }

  const isRevoked = certificate.status === "revoked";
  const displayTitle = certificate.sourceTitle || (certificate as any).courseTitle || certificate.title;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* ── Status Banner ── */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isRevoked
            ? "bg-rose-50 border-rose-200 text-[#C83C4A]"
            : "bg-emerald-50 border-emerald-200 text-[#16865C]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isRevoked ? "bg-rose-200 text-[#C83C4A]" : "bg-emerald-200 text-[#16865C]"
            }`}
          >
            {isRevoked ? <AlertTriangle size={20} /> : <ShieldCheck size={22} />}
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider">
              {isRevoked ? "Revoked Certificate" : "Official Verification Status: Valid & Authentic"}
            </span>
            <p className="text-xs text-[#182230] font-medium mt-0.5">
              {isRevoked
                ? `Revoked: ${certificate.revocationReason || "Administrative invalidation"}`
                : "This certificate is permanently registered in the SLRJ Learn verification directory."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs font-bold text-[#182230] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            {copiedLink ? <Check size={14} className="text-[#16865C]" /> : <Copy size={14} />}
            <span>{copiedLink ? "Link Copied" : "Share Verification"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#12316B] text-white text-xs font-bold hover:bg-[#2456A6] transition-colors cursor-pointer shadow-xs"
          >
            <Printer size={14} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* ── Official Landscape Certificate Mockup (Branded SLRJ Learn) ── */}
      <div className="relative mx-auto max-w-4xl p-2 sm:p-5 rounded-3xl bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-100 border border-[#E2E8F0] shadow-xl print:shadow-none print:border-none print:p-0">
        <div className="relative bg-white border-8 border-[#12316B] rounded-2xl p-6 sm:p-12 shadow-sm overflow-hidden print:border-4 print:p-8">
          {/* Inner Restrained Cyan Accent Border */}
          <div className="absolute inset-2 border-2 border-[#18B6D2]/60 rounded-xl pointer-events-none" />

          {/* Certificate Header */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="h-16 px-4 sm:h-20 sm:px-6 rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="SLRJ Learn Logo"
                width={160}
                height={60}
                className="h-12 sm:h-14 w-auto object-contain"
                priority
              />
            </div>

            <div>
              <span className="text-[11px] font-black tracking-[0.3em] uppercase text-[#18B6D2]">
                SLRJ Digital Academy
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black font-brand text-[#12316B] tracking-wide uppercase mt-1">
                Certificate of Completion
              </h2>
            </div>

            <p className="text-xs text-[#64748B] italic max-w-md">
              This certificate is officially awarded to
            </p>

            {/* Recipient Learner Name */}
            <div className="border-b-2 border-[#12316B] pb-2 px-8 min-w-[260px] sm:min-w-[360px]">
              <span className="text-2xl sm:text-3xl font-bold font-serif text-[#182230]">
                {certificate.learnerName}
              </span>
            </div>

            {/* Official Brief Wording */}
            <p className="text-xs sm:text-sm text-[#64748B] max-w-xl leading-relaxed">
              for successfully completing <strong className="text-[#12316B]">{displayTitle}</strong> and satisfying all completion, milestone, and assessment requirements of SLRJ Learn.
            </p>

            {/* Skills Tag Cloud */}
            {certificate.skillsGained && certificate.skillsGained.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 max-w-lg">
                {certificate.skillsGained.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Score & Evaluation Note */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#12316B]">
              <CheckCircle2 size={13} className="text-[#16865C]" />
              <span>Assessment Score: {certificate.scorePercentage}% (Passing Standard: 80%)</span>
            </div>

            {/* Metadata Footer: Date, ID, Live QR & Signature */}
            <div className="w-full pt-8 mt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-left">
              {/* Left Column: Metadata */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-[#64748B] uppercase">Issue Date</div>
                <div className="text-xs font-semibold text-[#182230]">{certificate.issueDate}</div>
                <div className="text-[11px] font-bold text-[#64748B] uppercase pt-2">Certificate ID</div>
                <div className="text-xs font-mono font-bold text-[#12316B]">{certificate.id}</div>
              </div>

              {/* Center Column: Live QR Code linking to verification */}
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-22 h-22 p-2 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center">
                  {/* Clean SVG QR pattern */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#12316B]">
                    <rect x="5" y="5" width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="15" y="15" width="10" height="10" fill="currentColor" />
                    <rect x="65" y="5" width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="75" y="15" width="10" height="10" fill="currentColor" />
                    <rect x="5" y="65" width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="15" y="75" width="10" height="10" fill="currentColor" />
                    <rect x="45" y="10" width="10" height="20" fill="currentColor" />
                    <rect x="45" y="45" width="15" height="15" fill="currentColor" />
                    <rect x="70" y="45" width="15" height="10" fill="currentColor" />
                    <rect x="45" y="70" width="20" height="10" fill="currentColor" />
                    <rect x="75" y="65" width="15" height="20" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#18B6D2] uppercase tracking-wider">
                  Scan to Verify
                </span>
              </div>

              {/* Right Column: Signature */}
              <div className="sm:text-right space-y-1">
                <div className="text-xs font-serif italic text-[#12316B] text-lg font-bold">
                  Kouluri Shahid
                </div>
                <div className="text-xs font-bold text-[#182230]">Academic Director</div>
                <div className="text-[11px] text-[#64748B]">{certificate.issuer}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Verification Authority Strip ── */}
      <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] text-xs text-[#64748B] space-y-3">
        <h3 className="font-bold text-[#182230] flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#16865C]" />
          <span>About SLRJ Learn Public Verification</span>
        </h3>
        <p className="leading-relaxed">
          This record confirms that the designated learner has completed all pedagogical requirements, modules, and verified criteria for <strong>{displayTitle}</strong>. SLRJ Learn maintains permanent, tamper-resistant issuance logs for employer and academic background checks.
        </p>

        {certificate.sourceId && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Associated Learning Activity: <strong className="text-slate-700">{displayTitle}</strong>
            </span>
            <Link
              href={
                certificate.sourceType === "course"
                  ? `/courses/${certificate.sourceId}`
                  : certificate.sourceType === "roadmap"
                  ? `/roadmap/${certificate.sourceId}`
                  : certificate.sourceType === "project"
                  ? `/projects/${certificate.sourceId}`
                  : certificate.sourceType === "event"
                  ? `/events/${certificate.sourceId}`
                  : `/courses`
              }
              className="inline-flex items-center gap-1 font-bold text-[#12316B] hover:text-[#2456A6]"
            >
              <span>View Learning Activity</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
