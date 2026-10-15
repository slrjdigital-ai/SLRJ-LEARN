import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import RoadmapTracker from "@/components/blog/RoadmapTracker";
import { Compass, Sparkles, ArrowRight, BookOpen, CheckCircle2, Bot, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Career Learning Paths & Roadmaps | SLRJ Learn",
  description:
    "Follow step-by-step programming roadmaps for Full-Stack Web Development, DSA, Python & AI, CS Fundamentals, and Cloud DevOps.",
  alternates: {
    canonical: "https://slrjlearn.in/roadmap",
  },
  openGraph: {
    title: "Career Learning Paths & Roadmaps | SLRJ Learn",
    description: "Structured step-by-step programming paths with milestone projects and interactive progress tracking.",
    url: "https://slrjlearn.in/roadmap",
    siteName: "SLRJ Learn",
  },
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20">
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Learning Paths" }]} />

        {/* ─── Hero Header (Punchy & Easy to Understand) ─── */}
        <div className="text-center max-w-3xl mx-auto pt-6 pb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-cyan-500/10">
            <Compass size={14} className="text-cyan-400" />
            <span>Structured Career Roadmaps</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-brand mb-4 tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Learning Path</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
            Follow clear, bite-sized stages from absolute beginner to industry-ready. Check off skills, build practical portfolio projects, and ask <strong className="text-cyan-300 font-bold">Lumio AI</strong> whenever you get stuck.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-cyan-300">
              <Sparkles size={13} className="text-cyan-400" />
              <span>5 Career Tracks</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-emerald-300">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>33 Hands-On Stages</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-purple-300">
              <Bot size={13} className="text-purple-400" />
              <span>Lumio AI Socratic Mentor</span>
            </span>
          </div>
        </div>

        {/* ─── Interactive Roadmap Tracker ─── */}
        <RoadmapTracker />

        {/* ─── Next Steps Callout (Free Developer Notes & Practice) ─── */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#060e20] via-[#09152b] to-[#060e20] border border-cyan-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-40 bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
              FREE STUDY MATERIALS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-brand mb-2">
              Ready to Dive Deep into the Concepts?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Read handwritten notes, comprehensive cheat sheets, and practical code tutorials for every stage of your journey.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              href="/notes"
              className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <BookOpen size={16} />
              <span>Browse Free Notes</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/practice"
              className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Code size={16} className="text-cyan-400" />
              <span>Open Playground</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
