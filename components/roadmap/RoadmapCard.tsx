"use client";

import Link from "next/link";
import { RoadmapTrack } from "@/data/roadmap";
import { LearnerRoadmapProgress } from "@/lib/roadmapProgress";
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
  const isStarted = !!progress && (progress.completedStageIds.length > 0 || progress.status === "in_progress");
  const completedCount = progress?.completedStageIds.length || 0;
  const percent = track.totalStages > 0 ? Math.round((completedCount / track.totalStages) * 100) : 0;
  const isSaved = progress?.isSaved ?? false;

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all duration-200">
      {/* Top Header: Category & Save Icon */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              {track.category}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-medium border border-blue-100">
              {track.level}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onToggleSave(track.id)}
            title={isSaved ? "Saved to your list" : "Save this career path"}
            className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-colors"
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-blue-600" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Title and Icon */}
        <div className="flex items-start gap-3 mt-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-[#173B70] border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            {getCareerIcon(track.icon, "w-5 h-5 text-[#173B70]")}
          </div>

          <div className="min-w-0 flex-1">
            <Link
              href={`/roadmap/${track.id}`}
              className="block text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#173B70] transition-colors leading-snug"
            >
              {track.name}
            </Link>
            <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
              {track.description}
            </p>
          </div>
        </div>

        {/* Stage & Duration Stats */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Curriculum</span>
            <span className="font-semibold text-slate-700">
              {track.totalStages} Stages • {track.totalLessons} Lessons
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Estimated Study</span>
            <span className="font-semibold text-slate-700 truncate block">
              {track.duration}
            </span>
          </div>
        </div>

        {/* Key Skills Tags */}
        <div className="mt-3.5 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Core Competencies
          </span>
          <div className="flex flex-wrap gap-1">
            {track.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium"
              >
                {skill}
              </span>
            ))}
            {track.skills.length > 4 && (
              <span className="px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 text-[11px]">
                +{track.skills.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar (ONLY RENDER IF STARTED) */}
        {isStarted && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 flex items-center gap-1">
                {percent >= 100 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-blue-600" />
                )}
                <span>{percent >= 100 ? "Completed" : `${completedCount}/${track.totalStages} stages`}</span>
              </span>
              <span className={percent >= 100 ? "text-emerald-700" : "text-[#173B70]"}>
                {percent}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  percent >= 100 ? "bg-emerald-500" : "bg-[#173B70]"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Action Button */}
      <div className="mt-5 pt-3 border-t border-slate-100">
        <Link
          href={`/roadmap/${track.id}`}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-50 group-hover:bg-[#173B70] text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-transparent text-xs font-semibold transition-all duration-150"
        >
          <span>{isStarted ? "Continue Learning" : "View Roadmap"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
