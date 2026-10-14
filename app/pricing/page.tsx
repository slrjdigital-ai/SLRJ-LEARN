import { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparent Plans & Pricing | SLRJ Learn",
  description:
    "Explore transparent learning plans at SLRJ Learn. Free community access, Pro developer tools, and comprehensive career accelerator mentorship.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Free Community",
      tagline: "Essential access for hobbyists & self-learners starting out.",
      price: "₹0",
      period: "forever",
      badge: "Free Starter",
      highlight: false,
      ctaText: "Start Learning Free",
      ctaHref: "/register",
      features: [
        "Access to all 16+ core study handbooks & notes",
        "Interactive browser code playground (HTML/CSS/JS/Python)",
        "Daily coding quests & community discussion forum",
        "Public roadmap tracks & progress checklist",
        "10 AI tutor queries per day",
      ],
    },
    {
      name: "Pro Developer",
      tagline: "For ambitious students mastering full-stack & interview skills.",
      price: "₹499",
      period: "/ month",
      badge: "Most Popular",
      highlight: true,
      ctaText: "Upgrade to Pro",
      ctaHref: "/register?plan=pro",
      features: [
        "Everything in Free Community",
        "Unlimited 24/7 AI Coding Tutor queries & bug diagnosis",
        "Full access to interactive course curricula & practice modules",
        "Starter source code for all practical portfolio projects",
        "Verified course completion digital certificates",
        "Technical interview practice question sets",
      ],
    },
    {
      name: "Career Accelerator",
      tagline: "Intensive 1-on-1 mentorship, resume reviews & mock interviews.",
      price: "₹1,499",
      period: "/ month",
      badge: "Career Ready",
      highlight: false,
      ctaText: "Join Accelerator",
      ctaHref: "/register?plan=career",
      features: [
        "Everything in Pro Developer",
        "Weekly live mentor office hours & live Q&A",
        "Personalized GitHub portfolio code reviews",
        "Live 1-on-1 technical mock interview sessions",
        "Resume and technical profile optimization guidance",
        "Priority instructor support in private forum",
      ],
    },
  ];

  const faqs = [
    {
      q: "Can I learn to code entirely for free?",
      a: "Yes! All foundational study notes, daily challenges, the interactive code playground, and learning roadmaps are completely free for everyone with no credit card required.",
    },
    {
      q: "Are platform certificates accredited degrees?",
      a: "No. Our completion certificates verify your demonstrable project completions and quiz passing on the platform. They are not accredited university degrees, but serve as authentic portfolio proof for employers.",
    },
    {
      q: "Can I cancel my subscription at any time?",
      a: "Yes, you can cancel or switch plans at any time from your account settings with zero cancellation fees or lock-ins.",
    },
    {
      q: "Does SLRJ Learn guarantee job placement or salaries?",
      a: "No. We believe in honest education. We equip you with rigorous, practical engineering skills, code portfolios, and interview practice, but we do not make false guarantees of employment or salaries.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-cyan-400" />
            <span>Honest, Transparent Pricing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white mb-4">
            Invest in Your Coding Future
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Choose the plan that fits your ambition. Start for free, upgrade when you want deeper mentorship, verified certificates, and unlimited AI tutoring.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.highlight
                  ? "bg-[#091124] border-2 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.2)] lg:-translate-y-2 relative"
                  : "bg-[#080D1A] border border-white/10 shadow-xl"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-black text-xs font-bold uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold font-brand text-white">{plan.name}</h3>
                  {!plan.highlight && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-6 min-h-[36px]">{plan.tagline}</p>

                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/10">
                  <span className="text-4xl font-black font-brand text-white">{plan.price}</span>
                  <span className="text-xs font-mono text-slate-400">{plan.period}</span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">
                    What&apos;s Included:
                  </span>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={plan.ctaHref}
                className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  plan.highlight
                    ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:from-cyan-300 hover:to-emerald-300 shadow-md shadow-cyan-500/20"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black font-brand text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-xs">Got questions about our plans? Here is everything you need to know.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#080D1A] border border-white/10">
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                  <HelpCircle size={15} className="text-cyan-400 shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
