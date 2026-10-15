"use client";

import { Search, UserCheck, BookOpenCheck, CheckCircle2, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Discover a Course",
      description:
        "Explore curated offerings across Web Development, Python, DSA, AI Engineering, and Systems Architecture.",
    },
    {
      step: "02",
      icon: UserCheck,
      title: "Instant Free Enrolment",
      description:
        "One-click enrollment adds the track to your learner dashboard, unlocking full access to all lessons and resources.",
    },
    {
      step: "03",
      icon: BookOpenCheck,
      title: "Study Lessons & PDF Notes",
      description:
        "Read structured handwritten guides, run code examples in the interactive playground, and complete practice exercises.",
    },
    {
      step: "04",
      icon: CheckCircle2,
      title: "Pass Server-Side Assessment",
      description:
        "Complete the course evaluation with secure server-side scoring. Achieve 80% or higher to verify concept mastery.",
    },
    {
      step: "05",
      icon: Award,
      title: "Earn Verifiable Certificate",
      description:
        "Download your official landscape certificate with a unique certificate ID and authentic QR verification code.",
    },
  ];

  return (
    <section className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#18B6D2] tracking-wider uppercase">
          Proven Methodology
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-brand text-[#182230] tracking-tight mt-1">
          How Learning Works at SLRJ Learn
        </h2>
        <p className="text-sm text-[#64748B] mt-2">
          From foundational concept to authentic certification in five transparent steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="clean-card p-5 flex flex-col justify-between relative bg-white hover:border-[#12316B]/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#12316B]/5 border border-[#12316B]/10 flex items-center justify-center text-[#12316B] group-hover:bg-[#12316B] group-hover:text-white transition-colors">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-black text-[#18B6D2] font-mono">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-[#182230] mb-1.5 leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {s.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-300 pointer-events-none">
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#12316B] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2456A6] transition-colors shadow-sm"
        >
          <span>Start Your Journey Today</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
