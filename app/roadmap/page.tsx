import { Metadata } from "next";
import Link from "next/link";
import LearningPathDashboard from "@/components/learning-paths/LearningPathDashboard";
import { Compass, Sparkles, ArrowRight, BookOpen, CheckCircle2, Bot, Code, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "My Journey & Growth Cycles | SLRJ NextWave Academy",
  description:
    "Follow structured growth cycles, master responsive web development, and track your progress from beginner to advanced.",
};

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      {/* ─── Breadcrumb / Title Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-brand">
            My Learning Journey
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Follow structured growth cycles, build responsive websites, and master full-stack software development.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Cycle Active</span>
          </span>
        </div>
      </div>

      {/* ─── NxtWave Growth Cycle & Course Cards ─── */}
      <LearningPathDashboard />
    </div>
  );
}
