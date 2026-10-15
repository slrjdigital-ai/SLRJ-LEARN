"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award, QrCode, ExternalLink, CheckCircle } from "lucide-react";

export default function CertificatePreviewSection() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#18B6D2] tracking-wider uppercase">
            Recognized Achievement
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-brand text-[#182230] tracking-tight mt-1">
            Verifiable Certificates of Completion
          </h2>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
            Every certificate issued by SLRJ Learn includes a unique, tamper-proof ID and a live QR code linking directly to public verification.
          </p>
        </div>

        <Link
          href="/certificates"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#12316B] hover:text-[#2456A6] transition-colors"
        >
          <span>View My Certificates</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      {/* ── Landscape Certificate Mockup ── */}
      <div className="relative mx-auto max-w-4xl p-2 sm:p-4 rounded-3xl bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-100 border border-[#E2E8F0] shadow-xl">
        <div className="relative bg-white border-8 border-[#12316B] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-md overflow-hidden">
          {/* Inner Cyan Border Accent */}
          <div className="absolute inset-2 border-2 border-[#18B6D2]/60 rounded-xl pointer-events-none" />

          {/* Certificate Header: Brand Logo & Title */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-xs p-1 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="SLRJ Learn Logo"
                width={70}
                height={70}
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <span className="text-[11px] font-black tracking-[0.3em] uppercase text-[#18B6D2]">
                SLRJ Digital Academy
              </span>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-black font-brand text-[#12316B] tracking-wide uppercase mt-1">
                Certificate of Completion
              </h3>
            </div>

            <p className="text-xs text-[#64748B] italic max-w-md">
              This certificate is officially awarded to
            </p>

            {/* Recipient Name */}
            <div className="border-b-2 border-[#12316B] pb-2 px-8 min-w-[260px] sm:min-w-[340px]">
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#182230]">
                Alex Morgan
              </span>
            </div>

            {/* Award Text strictly from brief */}
            <p className="text-xs sm:text-sm text-[#64748B] max-w-xl leading-relaxed">
              for successfully completing <strong className="text-[#12316B]">Web Development Foundations: HTML5, CSS3 & JavaScript</strong> and satisfying all course completion and assessment requirements of SLRJ Learn.
            </p>

            {/* Metadata Footer: Issue Date, Unique ID, QR Code & Signature */}
            <div className="w-full pt-8 mt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-left">
              {/* Left: Issue Details */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-[#64748B] uppercase">Issue Date</div>
                <div className="text-xs font-semibold text-[#182230]">October 15, 2026</div>
                <div className="text-[11px] font-bold text-[#64748B] uppercase pt-2">Certificate ID</div>
                <div className="text-xs font-mono font-bold text-[#12316B]">SLRJ-CERT-2026-WD101</div>
              </div>

              {/* Center: Live Verification QR Mockup */}
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-20 h-20 p-2 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center">
                  {/* SVG QR Code Simulation */}
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

              {/* Right: Signature */}
              <div className="sm:text-right space-y-1">
                <div className="text-xs font-serif italic text-[#12316B] text-lg font-bold">
                  Kouluri Shahid
                </div>
                <div className="text-xs font-bold text-[#182230]">Academic Director</div>
                <div className="text-[11px] text-[#64748B]">SLRJ Digital Education</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
