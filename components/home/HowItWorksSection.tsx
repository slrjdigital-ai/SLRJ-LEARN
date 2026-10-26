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
        <span className="text-xs sm:text-sm font-bold text-[#18B6D2] tracking-wider uppercase">
          Proven Methodology
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-brand text-[#182230] tracking-tight mt-1.5">
          How Learning Works at SLRJ Learn
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mt-2.5 leading-relaxed">
          From foundational concept to authentic certification in five transparent steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="clean-card p-5 sm:p-6 flex flex-col justify-between relative bg-white hover:border-[#12316B]/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#12316B]/5 border border-[#12316B]/10 flex items-center justify-center text-[#12316B] group-hover:bg-[#12316B] group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-[#18B6D2] font-mono">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-[#182230] mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-slate-300 pointer-events-none">
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center pt-3">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#12316B] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#2456A6] transition-colors shadow-sm"
        >
          <span>Start Your Journey Today</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
