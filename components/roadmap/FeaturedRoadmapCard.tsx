"use client";

import Link from "next/link";
import { RoadmapTrack, RoadmapStep } from "@/data/roadmap";
import { LearnerRoadmapProgress } from "@/lib/roadmapProgress";
import { useRoadmapDetailedProgress } from "@/lib/courseProgressMetrics";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
  Play,
  Bookmark,
  BookmarkCheck,
  Check,
  ChevronRight,
} from "lucide-react";

interface FeaturedRoadmapCardProps {
  track: RoadmapTrack;
  steps: RoadmapStep[];
  progress: LearnerRoadmapProgress | null;
  onToggleSave: (trackId: string) => void;
}

export default function FeaturedRoadmapCard({
  track,
  steps,
  progress,
  onToggleSave,
}: FeaturedRoadmapCardProps) {
  const detailedProgress = useRoadmapDetailedProgress(track.id);
  const isStarted = !!progress && (progress.completedStageIds.length > 0 || progress.status === "in_progress" || detailedProgress.hasStarted);
  const percent = detailedProgress.overallPercentage;
  const isSaved = progress?.isSaved ?? false;

  // Circular progress calculations
  const radius = 16;
  const circumference = 2 * Math.PI * radius; // ~100.53
  const strokeDashoffset =
    circumference - (circumference * Math.min(100, Math.max(0, percent))) / 100;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#173B70] to-[#0f2444] text-white p-6 sm:p-8 shadow-md">
      {/* Background Soft Accent Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mb-20" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-8">
        {/* Left Column: Metadata, Description & Skills */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Featured Career Path
            </span>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/15 text-xs font-medium">
              {track.category}
            </span>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/15 text-xs font-medium">
              Level: {track.level}
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {track.name}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2 max-w-2xl">
              {track.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-300" />
              <span className="text-white font-medium">{track.duration}</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-white/30" />

            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-300" />
              <span className="text-white font-medium">{track.totalStages} Structured Stages</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-white/30" />

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Prerequisites:</span>
              <span className="text-slate-200">{track.prerequisites?.[0] || "None required"}</span>
            </div>
          </div>

          {/* Core Skills Preview Chips */}
          <div className="space-y-1.5 pt-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Core Skills Covered
            </div>
            <div className="flex flex-wrap gap-1.5">
              {track.skills.slice(0, 7).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-white/10 text-slate-200 text-xs font-medium border border-white/10 backdrop-blur-2xs"
                >
                  {skill}
                </span>
              ))}
              {track.skills.length > 7 && (
                <span className="px-2 py-1 rounded-md bg-white/5 text-slate-400 text-xs">
                  +{track.skills.length - 7} more
                </span>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href={`/roadmap/${track.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-blue-50 text-sm font-bold shadow-md transition-all active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-slate-900 text-slate-900" />
              <span>{isStarted ? "Continue Roadmap" : "Start Roadmap"}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              href={`/roadmap/${track.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold transition-all"
            >
              <span>View Full Syllabus</span>
            </Link>

            <button
              type="button"
              onClick={() => onToggleSave(track.id)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all"
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-blue-400" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save Roadmap</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Visual Preview of Roadmap Stages & Circular Meter */}
        <div className="w-full lg:w-96 rounded-2xl bg-white/10 border border-white/15 p-4 sm:p-5 backdrop-blur-md flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <div className="flex items-center gap-3">
              {/* Circular Progress Ring */}
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    strokeWidth="3"
                    fill="transparent"
                    className="stroke-white/20"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className={`transition-all duration-500 ease-out ${
                      detailedProgress.isCompleted
                        ? "stroke-emerald-400"
                        : percent > 0
                        ? "stroke-cyan-400"
                        : "stroke-white/30"
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  {detailedProgress.isCompleted ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  ) : (
                    <span className="text-[10px] font-black font-mono text-white">
                      {percent}%
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs font-black text-white uppercase tracking-wider block">
                  Roadmap Progress
                </span>
                <span className="text-[11px] text-blue-200">
                  {detailedProgress.completedTopics}/{detailedProgress.totalTopics} inside topics
                </span>
              </div>
            </div>

            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-cyan-300">
              {steps.length} Stages
            </span>
          </div>

          {/* Compact Stages Timeline Flow */}
          <div className="space-y-2 py-3">
            {(steps.length > 0 ? steps.slice(0, 5) : []).map((step, idx) => {
              const isStageDone = progress?.completedStageIds.some(
                (id) => String(id) === String(step.id)
              );

              return (
                <div
                  key={step.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0 ${
                      isStageDone
                        ? "bg-emerald-500 text-white"
                        : "bg-white/15 text-slate-200"
                    }`}
                  >
                    {isStageDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-200 truncate">{step.title}</p>
                    <p className="text-[11px] text-slate-400 truncate">{step.duration}</p>
                  </div>
                </div>
              );
            })}
            {steps.length > 5 && (
              <div className="text-center pt-1 text-xs text-blue-200 font-medium">
                + {steps.length - 5} more stages to reach job-readiness
              </div>
            )}
          </div>

          {/* Real-time Inside Topics Breakdown */}
          <div className="pt-3 border-t border-white/15 grid grid-cols-3 gap-1.5 text-center text-xs">
            <div className="p-1.5 rounded-lg bg-white/5">
              <span className="text-[10px] text-slate-300 uppercase block">Notes</span>
              <span className="font-mono font-bold text-white text-xs">
                {detailedProgress.completedNotes}/{detailedProgress.totalNotes}
              </span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/5">
              <span className="text-[10px] text-slate-300 uppercase block">Quizzes</span>
              <span className="font-mono font-bold text-white text-xs">
                {detailedProgress.completedQuizzes}/{detailedProgress.totalQuizzes}
              </span>
            </div>
            <div className="p-1.5 rounded-lg bg-white/5">
              <span className="text-[10px] text-slate-300 uppercase block">Coding</span>
              <span className="font-mono font-bold text-white text-xs">
                {detailedProgress.completedCode}/{detailedProgress.totalCode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
