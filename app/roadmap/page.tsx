import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import RoadmapTracker from "@/components/blog/RoadmapTracker";
import { Compass, Sparkles, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Tech & Computer Science Learning Roadmaps (2026) | SLRJ Learn",
  description:
    "Structured career roadmaps for Full-Stack Web Development, Data Structures & Algorithms (DSA), Python & AI, Computer Science Core, and Cloud DevOps.",
  alternates: {
    canonical: "https://slrjlearn.in/roadmap",
  },
  openGraph: {
    title: "Learning Roadmaps & Career Paths | SLRJ Learn",
    description: "Structured engineering curricula with linked study notes and practical milestone projects.",
    url: "https://slrjlearn.in/roadmap",
    siteName: "SLRJ Learn",
  },
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-[#080C16] text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Learning Roadmaps" },
          ]}
        />

        {/* Page Header */}
        <div className="py-8 mb-8 border-b border-slate-800 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Compass size={13} className="text-cyan-400" />
            <span>5 STRUCTURED LEARNING TRACKS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-brand mb-6 leading-tight">
            Computer Science & Tech Learning Roadmaps
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
            Architectural curricula designed to take students from foundational concepts to production engineering across Web Development, DSA, Python & AI, CS Core, and Cloud DevOps.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles size={13} />
              <span>5 Specialization Tracks</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 size={13} />
              <span>Interactive Progress Tracking</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-teal-400">
              <BookOpen size={13} />
              <span>Comprehensive Notes & Code</span>
            </span>
          </div>
        </div>

        {/* Interactive Roadmap Tracker */}
        <RoadmapTracker />

        {/* Study Notes Callout */}
        <div className="my-16 p-8 sm:p-10 rounded-3xl bg-[#0D1527] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
              IN-DEPTH STUDY MATERIALS
            </span>
            <h3 className="text-2xl font-black text-white font-brand mb-2">
              Need In-Depth Notes for These Topics?
            </h3>
            <p className="text-gray-400 text-sm max-w-xl">
              Explore our structured study tutorials covering Web Fundamentals, HTML5, CSS Flexbox & Grid, Modern JavaScript, React 19, and Next.js.
            </p>
          </div>

          <Link
            href="/notes"
            className="flex-shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-400 text-black hover:from-emerald-300 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <BookOpen size={16} />
            <span>Browse All Notes</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
