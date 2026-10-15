import { Metadata } from "next";
import LearningPathDashboard from "@/components/learning-paths/LearningPathDashboard";

export const metadata: Metadata = {
  title: "My Journey — Growth Cycles | SLRJ Learn Academy",
  description: "Track your personal growth cycles, courses, and responsive web development milestones.",
};

export default function MyJourneyPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-brand">
            My Journey
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Follow structured growth cycles, build responsive websites, and master full-stack software development.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Growth Cycle:</span>
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0b69ff] text-xs font-bold border border-blue-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0b69ff] animate-pulse" />
            <span>In Progress (50%)</span>
          </span>
        </div>
      </div>

      <LearningPathDashboard />
    </div>
  );
}
