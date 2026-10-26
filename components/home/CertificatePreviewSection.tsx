"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award, QrCode, ExternalLink, CheckCircle } from "lucide-react";

export default function CertificatePreviewSection() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs sm:text-sm font-bold text-[#18B6D2] tracking-wider uppercase">
            Recognized Achievement
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-brand text-[#182230] tracking-tight mt-1.5">
            Verifiable Certificates of Completion
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Every certificate issued by SLRJ Learn includes a unique, tamper-proof ID and a live QR code linking directly to public verification.
          </p>
        </div>

        <Link
          href="/certificates"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#12316B] hover:text-[#2456A6] transition-colors py-1"
        >
          <span>View My Certificates</span>
          <ExternalLink size={16} />
        </Link>
      </div>

      {/* ── Official Certificate Preview Frame ── */}
      <div className="relative mx-auto max-w-4xl p-2 sm:p-4 rounded-3xl bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-100 border border-[#E2E8F0] shadow-xl">
        <Link
          href="/certificates"
          className="block relative rounded-2xl overflow-hidden border-2 border-slate-200/90 shadow-md bg-white hover:border-[#12316B]/40 transition-all group p-1"
          title="Explore SLRJ Learn Certificates"
        >
          <div className="relative aspect-[1024/682] w-full rounded-xl overflow-hidden bg-slate-900/5">
            <Image
              src="/sample-certificate.jpg"
              alt="SLRJ Learn Official Certificate of Completion"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain group-hover:scale-[1.01] transition-transform duration-300"
              priority
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
