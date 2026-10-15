"use client";

import { FileText, Clock, CheckCircle2, TrendingUp, Award } from "lucide-react";

export default function LearningBenefitsSection() {
  const benefits = [
    {
      icon: FileText,
      title: "Structured Learning Materials",
      description:
        "Access curated, handwritten digital notes and comprehensive PDF handbooks designed by engineers for clarity and deep retention.",
      tag: "Handbooks & Notes",
      color: "bg-blue-50 text-[#12316B] border-blue-200",
    },
    {
      icon: Clock,
      title: "Learn at Your Own Pace",
      description:
        "Study self-paced modules without rigid schedules. Bookmark complex concepts, revisit code examples, and practice when convenient.",
      tag: "Flexible Learning",
      color: "bg-cyan-50 text-[#12316B] border-cyan-200",
    },
    {
      icon: CheckCircle2,
      title: "Practice Through Assessments",
      description:
        "Reinforce understanding through multiple-choice evaluations, interactive coding challenges, and server-graded assessments.",
      tag: "Evaluated Practice",
      color: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      icon: TrendingUp,
      title: "Track Your Learning Progress",
      description:
        "Monitor consecutive learning streaks, level up your verified XP, and see real milestone completion across all 8 career roadmaps.",
      tag: "Real Analytics",
      color: "bg-amber-50 text-amber-800 border-amber-200",
    },
    {
      icon: Award,
      title: "Earn Verifiable Certificates",
      description:
        "Earn official landscape certificates with unique serial numbers and authentic QR codes verified instantly by employers and peers.",
      tag: "Verifiable Credential",
      color: "bg-indigo-50 text-indigo-800 border-indigo-200",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#18B6D2] tracking-wider uppercase">
            Designed For Serious Learners
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-brand text-[#182230] tracking-tight mt-1">
            Why Learn With SLRJ Learn
          </h2>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
            A complete educational ecosystem combining theoretical computer science foundations with practical software engineering execution.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className={`clean-card p-6 flex flex-col justify-between transition-all hover:-translate-y-1 ${
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#12316B]/5 border border-[#12316B]/10 flex items-center justify-center text-[#12316B]">
                    <Icon size={22} className="text-[#12316B]" />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${b.color}`}>
                    {b.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#182230] mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
