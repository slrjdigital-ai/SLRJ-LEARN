"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  ShieldCheck,
  BookOpen,
  Sparkles,
  ArrowRight,
  Search,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

interface CertificatesHeaderProps {
  totalCertificates: number;
  verifiedCount: number;
  coursesCompletedCount: number;
  recentAchievementsCount: number;
  onExploreCourses?: () => void;
}

export default function CertificatesHeader({
  totalCertificates,
  verifiedCount,
  coursesCompletedCount,
  recentAchievementsCount,
  onExploreCourses,
}: CertificatesHeaderProps) {
  const router = useRouter();
  const [lookupId, setLookupId] = useState("");

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = lookupId.trim();
    if (trimmed) {
      router.push(`/verify-certificate/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border border-slate-200/90 shadow-sm p-6 sm:p-8">
      {/* Soft Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#173B70]/5 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Title, Subtitle, & Stats */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#173B70] border border-blue-200/70 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-[#173B70]" />
            <span>Digital Credential Wallet</span>
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span>SLRJ Learn Academy</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-brand">
            My Certificates
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Your achievements, skills, and learning milestones — all in one place.
            View, verify, download, and share verifiable credentials earned through completed courses, career roadmaps, projects, and hackathons.
          </p>

          {/* Real Statistics Chips */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-[#173B70]" />
              <span>Total Certificates:</span>
              <span className="font-bold text-slate-900">{totalCertificates}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-xs font-medium text-emerald-800 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Credentials:</span>
              <span className="font-bold text-emerald-900">{verifiedCount}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Courses Completed:</span>
              <span className="font-bold text-slate-900">{coursesCompletedCount}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200/80 text-xs font-medium text-purple-800 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Recent Achievements:</span>
              <span className="font-bold text-purple-900">{recentAchievementsCount}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Instant Verification Lookup & Explore Courses CTA */}
        <div className="flex flex-col gap-3 min-w-[260px] sm:min-w-[320px]">
          {/* Quick Credential ID Verification Form */}
          <form
            onSubmit={handleLookupSubmit}
            className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#173B70]" />
                Verify Credential ID
              </span>
              <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider">
                Public Check
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={lookupId}
                onChange={(e) => setLookupId(e.target.value)}
                placeholder="e.g. SLRJ-CERT-2026-WD101"
                className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#173B70]"
              />
              <button
                type="submit"
                suppressHydrationWarning
                className="px-3 py-1.5 rounded-lg bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                Verify
              </button>
            </div>
          </form>

          {/* Primary CTA */}
          <Link
            href="/courses"
            onClick={onExploreCourses}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs sm:text-sm font-bold shadow-sm transition-all text-center group cursor-pointer"
          >
            <BookOpen size={16} />
            <span>Explore Courses to Earn More</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
