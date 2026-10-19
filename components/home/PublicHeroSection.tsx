"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Compass, Award, CheckCircle2, ShieldCheck, Sparkles, Terminal } from "lucide-react";

export default function PublicHeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-6 sm:p-10 lg:p-14 shadow-xl border border-blue-900/40">
      {/* ── Background Subtle Shapes & Accents ── */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#18B6D2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Heading & Value Proposition */}
        <div className="lg:col-span-7 space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-xs font-bold tracking-wide uppercase">
            <Sparkles size={14} className="text-[#18B6D2]" />
            <span>SLRJ Learn Platform • Free & Open Access</span>
          </div>

          {/* Heading strictly as specified in brief */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-brand tracking-tight text-white leading-[1.1]">
            Learn Skills. Build Projects.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#18B6D2] via-cyan-200 to-white">
              Grow Your Future.
            </span>
          </h1>

          {/* Supporting text strictly adhering to brief */}
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Study structured courses, master foundational engineering concepts, complete practical programming projects, test your knowledge through assessments, and earn verifiable certificates.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#18B6D2] text-[#12316B] font-extrabold text-sm hover:bg-cyan-300 shadow-lg shadow-[#18B6D2]/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <BookOpen size={18} />
              <span>Explore Courses</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold text-sm backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Compass size={18} className="text-[#18B6D2]" />
              <span>Start Learning Paths</span>
            </Link>

            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-blue-200 hover:text-white font-semibold text-sm transition-colors"
            >
              <Terminal size={16} />
              <span>Open Playground</span>
            </Link>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">Interactive</div>
              <div className="text-xs text-blue-200">Structured Lessons</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">8 Career Tracks</div>
              <div className="text-xs text-blue-200">Role Roadmaps</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#18B6D2]">Verifiable</div>
              <div className="text-xs text-blue-200">QR-Linked Certificates</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300">100% Free</div>
              <div className="text-xs text-blue-200">No Hidden Paywalls</div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Learning Card */}
        <div className="lg:col-span-5">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-7 shadow-2xl relative space-y-5">
            {/* Top brand header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs">
                  <Image
                    src="/logo.png"
                    alt="SLRJ Learn Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white leading-tight">SLRJ Learn Academy</h3>
                  <p className="text-[11px] text-[#18B6D2] font-semibold">Structured Tech Education</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 uppercase tracking-wider">
                Live & Active
              </span>
            </div>

            {/* Quick Feature Checklist */}
            <div className="space-y-3 text-xs sm:text-sm text-blue-100">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                <span><strong>Comprehensive PDF Notes:</strong> Handwritten and structured guides covering Web, Python, DSA & AI.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                <span><strong>Hands-On Coding:</strong> In-browser code playground with HTML, CSS, JavaScript & Python engines.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                <span><strong>Server-Scored Assessments:</strong> Rigorous knowledge evaluations to validate technical mastery.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                <span><strong>Authentic Certificates:</strong> Verifiable credential with instant online QR code confirmation.</span>
              </div>
            </div>

            {/* Live Interactive Action */}
            <div className="pt-2">
              <Link
                href="/courses"
                className="w-full py-3 rounded-xl bg-white text-[#12316B] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-sm"
              >
                <Award size={15} className="text-[#18B6D2]" />
                <span>Browse Published Curriculum</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
