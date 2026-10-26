"use client";

import Link from "next/link";
import { RoadmapTrack } from "@/data/roadmap";
import { LearnerRoadmapProgress } from "@/lib/roadmapProgress";
import { useRoadmapDetailedProgress } from "@/lib/courseProgressMetrics";
import {
  Globe,
  Terminal,
  Layers,
  Smartphone,
  Sparkles,
  BarChart3,
  Palette,
  ShieldCheck,
  Code2,
  Clock,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Play,
  Check,
} from "lucide-react";

interface RoadmapCardProps {
  track: RoadmapTrack;
  progress: LearnerRoadmapProgress | null;
  onToggleSave: (trackId: string) => void;
}

export function getCareerIcon(iconName: string, className = "w-5 h-5") {
  switch (iconName) {
    case "Globe":
      return <Globe className={className} />;
    case "Terminal":
      return <Terminal className={className} />;
    case "Layers":
      return <Layers className={className} />;
    case "Smartphone":
      return <Smartphone className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "BarChart3":
      return <BarChart3 className={className} />;
    case "Palette":
      return <Palette className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    default:
      return <Code2 className={className} />;
  }
}

export default function RoadmapCard({ track, progress, onToggleSave }: RoadmapCardProps) {
  const detailedProgress = useRoadmapDetailedProgress(track.id);
  const isStarted = !!progress && (progress.completedStageIds.length > 0 || progress.status === "in_progress" || detailedProgress.hasStarted);
  const isSaved = progress?.isSaved ?? false;

  // Circular progress calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius; // ~113.1
  const strokeDashoffset =
    circumference - (circumference * Math.min(100, Math.max(0, detailedProgress.overallPercentage))) / 100;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border-2 border-slate-200/90 hover:border-[#12316B] p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300">
      {/* Top Accent Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#173B70] via-[#12316B] to-[#18B6D2] group-hover:h-1.5 transition-all" />

      {/* Top Header: Category, Level & Circular Progress Ring */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#12316B]/10 text-[#12316B] border border-[#12316B]/20 text-xs font-bold font-mono">
              {track.category}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
              {track.level}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Circular Progress Ring */}
            <div
              className="flex flex-col items-center shrink-0"
              title={`Roadmap Progress: ${detailedProgress.overallPercentage}% (Topics: ${detailedProgress.completedTopics}/${detailedProgress.totalTopics}, Notes: ${detailedProgress.completedNotes}/${detailedProgress.totalNotes}, Quizzes: ${detailedProgress.completedQuizzes}/${detailedProgress.totalQuizzes}, Code: ${detailedProgress.completedCode}/${detailedProgress.totalCode})`}
            >
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg className="w-11 h-11 transform -rotate-90" viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    strokeWidth="3.5"
                    fill="transparent"
                    className="stroke-slate-200"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    strokeWidth="3.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className={`transition-all duration-500 ease-out ${
                      detailedProgress.isCompleted
                        ? "stroke-emerald-600"
                        : detailedProgress.overallPercentage > 0
                        ? "stroke-[#12316B]"
                        : "stroke-slate-300"
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  {detailedProgress.isCompleted ? (
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  ) : (
                    <span
                      className={`text-[10px] font-black font-mono ${
                        detailedProgress.overallPercentage > 0 ? "text-[#12316B]" : "text-slate-500"
                      }`}
                    >
                      {detailedProgress.overallPercentage}%
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider font-mono">
                Progress
              </span>
            </div>

            <button
              type="button"
              onClick={() => onToggleSave(track.id)}
              title={isSaved ? "Saved to your list" : "Save this career path"}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#12316B] hover:bg-slate-100 transition-colors self-start mt-0.5"
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-[#12316B]" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Title and Icon */}
        <div className="flex items-start gap-3 mt-1">
          <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-[#12316B] group-hover:text-white text-[#12316B] border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-all">
            {getCareerIcon(track.icon, "w-5 h-5")}
          </div>

          <div className="min-w-0 flex-1">
            <Link
              href={`/roadmap/${track.id}`}
              className="block text-base sm:text-lg font-black text-slate-950 group-hover:text-[#12316B] transition-colors leading-snug"
            >
              {track.name}
            </Link>
            <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
              {track.description}
            </p>
          </div>
        </div>

        {/* Real-Time Inside Topics Breakdown */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-4 gap-1 text-center text-xs">
          <div className="space-y-0.5">
            <span className="text-[9px] font-black uppercase text-slate-500 block font-mono">Topics</span>
            <span className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.completedTopics}/{detailedProgress.totalTopics}
            </span>
          </div>
          <div className="space-y-0.5 border-l border-slate-200">
            <span className="text-[9px] font-black uppercase text-slate-500 block font-mono">Notes</span>
            <span className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.completedNotes}/{detailedProgress.totalNotes}
            </span>
          </div>
          <div className="space-y-0.5 border-l border-slate-200">
            <span className="text-[9px] font-black uppercase text-slate-500 block font-mono">Quizzes</span>
            <span className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.completedQuizzes}/{detailedProgress.totalQuizzes}
            </span>
          </div>
          <div className="space-y-0.5 border-l border-slate-200">
            <span className="text-[9px] font-black uppercase text-slate-500 block font-mono">Coding</span>
            <span className="font-mono font-bold text-slate-900 text-xs">
              {detailedProgress.completedCode}/{detailedProgress.totalCode}
            </span>
          </div>
        </div>

        {/* Key Skills Tags */}
        <div className="mt-3 space-y-1">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block font-mono">
            Core Competencies
          </span>
          <div className="flex flex-wrap gap-1">
            {track.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200/80"
              >
                {skill}
              </span>
            ))}
            {track.skills.length > 4 && (
              <span className="px-1.5 py-0.5 rounded bg-slate-50 text-slate-500 text-[11px] font-bold">
                +{track.skills.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA Action Button */}
      <div className="mt-5 pt-3 border-t border-slate-100">
        <Link
          href={`/roadmap/${track.id}`}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#12316B] group-hover:bg-[#173B70] text-white text-xs sm:text-sm font-bold shadow-xs transition-all duration-150"
        >
          <span>{detailedProgress.isCompleted ? "Review Completed Roadmap" : detailedProgress.hasStarted ? "Continue Learning" : "View Roadmap Pathway"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
