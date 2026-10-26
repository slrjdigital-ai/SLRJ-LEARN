"use client";

import { Suspense } from "react";
import Link from "next/link";
import CodePlayground from "@/components/playground/CodePlayground";
import { Terminal, Trophy, BookOpen, Sparkles, Compass } from "lucide-react";

export default function PracticeClient() {
  return (
    <div className="w-full space-y-3 pb-8">
      {/* ── Streamlined SLRJ Studio Banner ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-2 border-b border-slate-200/70">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50/80 border border-blue-200/60 text-[#173B70] text-[11px] font-bold uppercase tracking-wider mb-1">
            <Terminal size={13} className="text-[#18B6D2]" />
            <span>SLRJ Code Workspace</span>
            <span className="text-slate-400">•</span>
            <span className="text-cyan-600 font-semibold lowercase">Learn. Build. Grow.</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-brand tracking-tight text-slate-900">
            Interactive Multi-Language Code Playground
          </h1>
          <p className="text-xs text-slate-500">
            Real-time compilation and execution for Web, Python 3.12, C17, C++20, Java 17, and SQL with automated test verification and XP assessment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/roadmap"
            className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#173B70] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <Compass size={14} className="text-amber-500" />
            <span>Learning Roadmaps</span>
          </Link>
          <Link
            href="/courses"
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#173B70] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <BookOpen size={14} className="text-[#18B6D2]" />
            <span>Explore Courses</span>
          </Link>
        </div>
      </div>

      {/* ── Full Interactive Code Playground ── */}
      <Suspense
        fallback={
          <div className="h-[75vh] w-full rounded-xl bg-[#12141C] border border-[#252836] flex flex-col items-center justify-center text-slate-400 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono">Initializing SLRJ Code Studio...</span>
          </div>
        }
      >
        <CodePlayground />
      </Suspense>
    </div>
  );
}
