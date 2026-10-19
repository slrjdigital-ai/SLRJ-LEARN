"use client";

import React from "react";
import Link from "next/link";
import { CertificateRecord } from "@/data/certificatesStore";
import CertificateCard from "./CertificateCard";
import {
  Award,
  BookOpen,
  Compass,
  Trophy,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface CertificateGridProps {
  certificates: CertificateRecord[];
  totalLearnerCertificates: number;
  onViewCertificate: (cert: CertificateRecord) => void;
  onResetFilters: () => void;
}

export default function CertificateGrid({
  certificates,
  totalLearnerCertificates,
  onViewCertificate,
  onResetFilters,
}: CertificateGridProps) {
  // ── CASE 1: True Zero State (Learner has 0 earned credentials) ──
  if (totalLearnerCertificates === 0) {
    return (
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-8 sm:p-12 text-center max-w-2xl mx-auto my-6 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#173B70] flex items-center justify-center mx-auto border border-blue-100 shadow-2xs">
          <Award size={32} />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold font-brand text-slate-900 tracking-tight">
            Your achievements start here
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Complete courses, follow a career roadmap, build practical projects, or participate in eligible challenges to earn your first verifiable certificate.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/courses"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all shadow-xs group"
          >
            <BookOpen size={15} />
            <span>Explore Courses</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/roadmap"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs"
          >
            <Compass size={15} className="text-slate-500" />
            <span>Explore Role Roadmaps</span>
          </Link>

          <Link
            href="/events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs"
          >
            <Trophy size={15} className="text-amber-500" />
            <span>Find Challenges</span>
          </Link>
        </div>
      </div>
    );
  }

  // ── CASE 2: No search/filter match ──
  if (certificates.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-8 sm:p-12 text-center max-w-xl mx-auto my-6 space-y-4">
        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Sparkles size={24} />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold font-brand text-slate-900">
            No certificates match your filters
          </h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search terms, changing the category, or resetting all applied filters.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            suppressHydrationWarning
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>
    );
  }

  // ── CASE 3: Standard Responsive Certificate Cards Grid ──
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificates.map((cert) => (
        <CertificateCard
          key={cert.id}
          certificate={cert}
          onViewCertificate={onViewCertificate}
        />
      ))}
    </div>
  );
}
