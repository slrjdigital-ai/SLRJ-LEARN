import { Metadata } from "next";
import Link from "next/link";
import LearningPathDashboard from "@/components/learning-paths/LearningPathDashboard";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Terminal,
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard & Learning Journey | NextWave Academy",
  description:
    "Follow structured growth cycles, build responsive websites, and track your progress from beginner to advanced.",
};

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* ─── Hero Academy Welcome Banner ─── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f1fd] text-[#0b69ff] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>CCBP 4.0 Transformation Program</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand">
            Welcome back, Shahid!
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
            You are enrolled in the <strong>Full-Stack Software Development</strong> track. Continue your daily growth cycle to stay ahead.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/roadmap"
            className="px-5 py-2.5 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-sm shadow-blue-500/20 flex items-center gap-1.5"
          >
            <span>Resume Growth Cycle</span>
            <ChevronRight size={15} />
          </Link>
          <Link
            href="/practice"
            className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
          >
            <Terminal size={15} className="text-[#0b69ff]" />
            <span>Open Playground</span>
          </Link>
        </div>
      </div>

      {/* ─── NxtWave Growth Cycles (Exact as in photo) ─── */}
      <LearningPathDashboard />
    </div>
  );
}
