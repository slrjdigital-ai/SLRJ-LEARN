import { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles, ShieldCheck, HelpCircle, ArrowRight, BookOpen, Code2, FolderGit2, Bot, Award, Heart, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "100% Free Coding Education | SLRJ Learn",
  description:
    "SLRJ Learn is 100% free forever for all students and developers worldwide. Master web development, Python, DSA, and AI with zero paywalls and zero credit cards.",
};

export default function PricingPage() {
  const freePillars = [
    {
      title: "Interactive Courses",
      desc: "54+ in-depth lessons covering Web Development, Python, JavaScript, and DSA.",
      icon: BookOpen,
      status: "100% Free",
    },
    {
      title: "Code Playground",
      desc: "Real-time HTML/CSS/JS sandbox and Python 3.12 compiler in the browser.",
      icon: Code2,
      status: "100% Free",
    },
    {
      title: "Portfolio Projects",
      desc: "8 production-grade engineering applications with starter source code.",
      icon: FolderGit2,
      status: "100% Free",
    },
    {
      title: "AI Coding Tutor",
      desc: "Socratic AI assistant that diagnoses syntax errors and explains code step-by-step.",
      icon: Bot,
      status: "100% Free",
    },
    {
      title: "Digital Certificates",
      desc: "Verified course completion certificates and technical skill badges.",
      icon: Award,
      status: "100% Free",
    },
    {
      title: "Learning Community",
      desc: "Peer discussion forums, daily coding quests, and mentor code reviews.",
      icon: Heart,
      status: "100% Free",
    },
  ];

  const faqs = [
    {
      q: "Is SLRJ Learn truly 100% free?",
      a: "Yes! Every single course, interactive exercise, project starter template, note handbook, and compiler sandbox is completely free for all students, self-learners, and educators worldwide.",
    },
    {
      q: "Do I need a credit card to register?",
      a: "No credit card or payment information is ever required. You can start learning immediately by creating a free account with your email.",
    },
    {
      q: "Are the digital certificates free to claim?",
      a: "Yes. Once you complete all lessons, pass the quizzes, and build the required milestone project for a course, you can claim your verified completion certificate with a shareable digital credential ID for free.",
    },
    {
      q: "How can I support the platform?",
      a: "You can support us by sharing SLRJ Learn with fellow learners, contributing open-source tutorials, helping peers in the community forum, and providing product feedback.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20">
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
            <Sparkles size={14} className="text-emerald-400" />
            <span>Open Access Education • Zero Paywalls</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-brand tracking-tight text-white mb-5">
            100% Free Coding Education.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              For Everyone, Forever.
            </span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            High-quality programming education should be universally accessible. Master computer science, web development, data structures, and modern AI with zero paywalls, zero subscription locks, and zero credit cards.
          </p>
        </div>

        {/* ── Hero Free Plan Card (Expansive Landscape Layout) ── */}
        <div className="rounded-3xl bg-gradient-to-b from-[#09152E] to-[#080D1A] border-2 border-cyan-400/50 shadow-[0_0_60px_rgba(6,182,212,0.18)] p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Plan Title & Pricing (5 cols) */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400 text-black text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <span>Free Community Access</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-brand text-white mb-2">
                Student & Developer Plan
              </h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Full unlimited access to the entire SLRJ Learn curriculum, interactive compiler sandboxes, real projects, and community mentorship.
              </p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl sm:text-6xl font-black font-brand text-white">₹0</span>
                <span className="text-emerald-400 font-mono font-bold text-sm uppercase tracking-wider">Free Forever</span>
              </div>

              <div className="space-y-3">
                <Link
                  href="/register"
                  className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 text-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  <span>Create Free Account</span>
                  <ArrowRight size={16} />
                </Link>
                <p className="text-center text-[11px] font-mono text-slate-400">
                  Instant registration • No credit card required • Instant access
                </p>
              </div>
            </div>

            {/* Right Column: Complete Feature Grid (7 cols) */}
            <div className="lg:col-span-7 lg:pl-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4">
                Everything Included In Your Free Account:
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Access to all 54+ interactive course lessons",
                  "Full browser code playground (Web + Python 3.12)",
                  "8 portfolio engineering projects with starter code",
                  "AI Coding Tutor for instant error diagnosis",
                  "Verified digital course completion certificates",
                  "16+ deep-dive study handbooks & quick references",
                  "Complete career roadmaps & progress checklists",
                  "Community forums, code sharing & peer reviews",
                  "Daily coding challenges with XP & streak rewards",
                  "Global Ctrl+K search across courses and docs",
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Pillars Grid ── */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black font-brand text-white mb-2">
              All Platform Pillars Are 100% Free
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              We never gate coding tutorials or lock interactive exercises behind paywalls.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {freePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-300 w-fit mb-3">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-white font-brand mb-1">{pillar.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{pillar.desc}</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 text-center">
                    {pillar.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── FAQs ── */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black font-brand text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Common questions about our free learning model and mission.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#080D1A] border border-white/10">
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                  <HelpCircle size={16} className="text-cyan-400 shrink-0" />
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
