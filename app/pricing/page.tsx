import { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck, Sparkles, BookOpen, Award, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Plans | SLRJ Learn",
  description:
    "Transparent pricing for SLRJ Learn. Enjoy 100% free courses and verifiable certificates with optional future mentorship tiers.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Open Community",
      price: "$0",
      period: "forever free",
      description: "Complete access to all core computer science curriculum, notes, and certificates.",
      badge: "Current Standard",
      badgeColor: "bg-emerald-50 text-[#16865C] border-emerald-200",
      cta: "Start Free Today",
      href: "/courses",
      primary: true,
      features: [
        "All 6 Comprehensive Interactive Courses",
        "17 Curated Handwritten PDF Handbooks",
        "Full Access to Coding Playground",
        "Interactive Daily Challenges & Quizzes",
        "Server-Graded Course Assessments",
        "Official Verifiable Certificates with QR Codes",
        "Peer Learner Community Forum",
      ],
    },
    {
      name: "Pro Mentorship",
      price: "$19",
      period: "per month",
      description: "Dedicated 1-on-1 code reviews and mock technical interviews with industry engineers.",
      badge: "Gateway Pending",
      badgeColor: "bg-blue-50 text-[#12316B] border-blue-200",
      cta: "Join Mentorship Waitlist",
      href: "/contact",
      primary: false,
      note: "Payment gateway integration is currently pending. All core educational features remain 100% free.",
      features: [
        "Everything in Open Community Plan",
        "Personalized GitHub Portfolio Code Reviews",
        "Bi-Weekly 1-on-1 Mentorship Sessions",
        "Mock Technical & System Design Interviews",
        "Priority Assessment Evaluation",
        "Resume & LinkedIn Optimization",
      ],
    },
    {
      name: "University & Teams",
      price: "Custom",
      period: "annual cohort",
      description: "Institutional seats, progress dashboards, and custom assessment tracks for universities.",
      badge: "Institutions",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      cta: "Contact Academic Team",
      href: "/contact",
      primary: false,
      features: [
        "Unlimited Student Cohort Seats",
        "Dedicated Faculty Analytics Dashboard",
        "Custom Curricula & Private Assessments",
        "Bulk Verifiable Certificate Issuance",
        "Direct Support from SLRJ Digital",
      ],
    },
  ];

  return (
    <div className="space-y-10 pb-16 max-w-6xl mx-auto">
      {/* ── Page Header ── */}
      <section className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#12316B] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} className="text-[#18B6D2]" />
          <span>Transparent & Accessible Education</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-brand text-[#182230] tracking-tight">
          Simple Plans for Serious Learners
        </h1>

        <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
          We believe high-quality engineering education should be open to all. All courses, handwritten PDF handbooks, and verifiable certificates are 100% free.
        </p>
      </section>

      {/* ── Plans Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`clean-card p-6 sm:p-8 flex flex-col justify-between space-y-6 relative transition-all ${
              plan.primary
                ? "border-2 border-[#12316B] shadow-lg ring-1 ring-[#12316B]/10"
                : "border-[#E2E8F0]"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${plan.badgeColor}`}>
                  {plan.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#182230]">{plan.name}</h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{plan.description}</p>
              </div>

              <div className="pt-2 flex items-baseline gap-1.5">
                <span className="text-4xl font-black font-brand text-[#182230]">{plan.price}</span>
                <span className="text-xs text-[#64748B] font-medium">/ {plan.period}</span>
              </div>

              {plan.note && (
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-[#12316B] leading-relaxed">
                  {plan.note}
                </div>
              )}

              {/* Features List */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <span className="text-[11px] font-bold text-[#182230] uppercase tracking-wider block">
                  Included Capabilities:
                </span>
                <ul className="space-y-2 text-xs text-[#64748B]">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check size={14} className="text-[#16865C] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={plan.href}
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  plan.primary
                    ? "bg-[#12316B] text-white hover:bg-[#2456A6] shadow-md shadow-[#12316B]/20"
                    : "bg-[#F7F9FC] text-[#182230] hover:bg-slate-100 border border-[#E2E8F0]"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Trust Banner ── */}
      <section className="clean-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F7F9FC]">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-extrabold text-sm text-[#182230] flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck size={16} className="text-[#16865C]" />
            <span>SLRJ Digital Open Education Commitment</span>
          </h3>
          <p className="text-xs text-[#64748B] max-w-xl">
            Core educational materials, lessons, and verifiable completion certificates will never be paywalled.
          </p>
        </div>

        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#12316B] text-white text-xs font-bold hover:bg-[#2456A6] transition-colors whitespace-nowrap"
        >
          <span>Explore All Free Courses</span>
          <ArrowRight size={13} />
        </Link>
      </section>
    </div>
  );
}
