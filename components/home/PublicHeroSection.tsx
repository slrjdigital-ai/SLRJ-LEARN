"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Compass, Award, CheckCircle2, Sparkles, Terminal } from "lucide-react";

export default function PublicHeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-5 sm:p-7 lg:p-8 shadow-lg border border-blue-900/40">
      {/* ── Background Subtle Shapes & Accents ── */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#18B6D2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Heading & Value Proposition */}
        <div className="lg:col-span-7 space-y-4">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-[11px] font-bold tracking-wide uppercase">
            <Sparkles size={13} className="text-[#18B6D2]" />
            <span>SLRJ Learn Platform • Free & Open Access</span>
          </div>

          {/* Compact Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-brand tracking-tight text-white leading-snug">
            Learn Skills. Build Projects.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#18B6D2] via-cyan-200 to-white">
              Grow Your Future.
            </span>
          </h1>

          {/* Compact Supporting text */}
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
            Study structured courses, master foundational engineering concepts, complete practical programming projects, test your knowledge through assessments, and earn verifiable certificates.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#18B6D2] text-[#12316B] font-extrabold text-xs sm:text-sm hover:bg-cyan-300 shadow-md shadow-[#18B6D2]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <BookOpen size={16} />
              <span>Explore Courses</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Compass size={16} className="text-[#18B6D2]" />
              <span>Start Learning Paths</span>
            </Link>

            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-blue-200 hover:text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              <Terminal size={15} />
              <span>Open Playground</span>
            </Link>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <div className="text-base sm:text-lg font-extrabold text-white">Interactive</div>
              <div className="text-[11px] text-blue-200 font-medium">Structured Lessons</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-white">8 Career Tracks</div>
              <div className="text-[11px] text-blue-200 font-medium">Role Roadmaps</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-[#18B6D2]">Verifiable</div>
              <div className="text-[11px] text-blue-200 font-medium">QR Certificates</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-emerald-300">100% Free</div>
              <div className="text-[11px] text-blue-200 font-medium">No Hidden Paywalls</div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Learning Card */}
        <div className="lg:col-span-5">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 sm:p-5 shadow-xl relative space-y-3.5">
            {/* Top brand header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shadow-xs">
                  <Image
                    src="/logo.png"
                    alt="SLRJ Learn Logo"
                    width={28}
                    height={28}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-white leading-tight">SLRJ Learn Academy</h3>
                  <p className="text-[10px] text-[#18B6D2] font-semibold">Structured Tech Education</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-400/30 uppercase tracking-wider">
                Live & Active
              </span>
            </div>

            {/* Quick Feature Checklist */}
            <div className="space-y-2 text-xs text-blue-100">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                <span className="leading-snug"><strong>PDF Notes:</strong> Handwritten and structured guides.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                <span className="leading-snug"><strong>Hands-On Coding:</strong> In-browser interactive playground.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                <span className="leading-snug"><strong>Server-Scored Assessments:</strong> Rigorous knowledge evaluations.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                <span className="leading-snug"><strong>Authentic Certificates:</strong> Verifiable with online QR check.</span>
              </div>
            </div>

            {/* Live Interactive Action */}
            <div className="pt-1">
              <Link
                href="/courses"
                className="w-full py-2.5 rounded-lg bg-white text-[#12316B] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-blue-50 transition-colors shadow-xs"
              >
                <Award size={14} className="text-[#18B6D2]" />
                <span>Browse Published Curriculum</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
