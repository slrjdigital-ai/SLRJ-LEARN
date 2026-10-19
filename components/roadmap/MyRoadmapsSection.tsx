"use client";

import Link from "next/link";
import { RoadmapTrack } from "@/data/roadmap";
import { LearnerRoadmapProgress } from "@/lib/roadmapProgress";
import {
  Sparkles,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Compass,
  Play,
  RotateCcw,
} from "lucide-react";

interface MyRoadmapsSectionProps {
  startedTracks: Array<{
    track: RoadmapTrack;
    progress: LearnerRoadmapProgress;
    completedCount: number;
    percent: number;
  }>;
  onExploreClick: () => void;
  onToggleSave: (trackId: string) => void;
}

export default function MyRoadmapsSection({
  startedTracks,
  onExploreClick,
  onToggleSave,
}: MyRoadmapsSectionProps) {
  if (startedTracks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-6 sm:p-7 text-center">
        <div className="mx-auto w-10 h-10 rounded-full bg-blue-50 text-[#173B70] flex items-center justify-center mb-3">
          <Compass className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-slate-800">
          You haven&apos;t started any career roadmaps yet
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
          Select a role from the catalog below to follow a guided learning track with structured PDF courses, practical projects, and verifiable milestones.
        </p>
        <button
          type="button"
          onClick={onExploreClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#173B70] text-white text-xs sm:text-sm font-semibold hover:bg-[#122e57] transition-all shadow-xs"
        >
          <span>Choose a Career Path</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#173B70]" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            My Active Roadmaps ({startedTracks.length})
          </h2>
        </div>
        <span className="text-xs text-slate-500">Tracked in your local browser profile</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {startedTracks.map(({ track, progress, completedCount, percent }) => {
          const isCompleted = percent >= 100;
          const currentStageNumber = progress.currentStageId || 1;

          return (
            <div
              key={track.id}
              className="relative flex flex-col justify-between rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 p-5 shadow-2xs hover:shadow-xs transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                    {track.category}
                  </span>

                  <button
                    type="button"
                    onClick={() => onToggleSave(track.id)}
                    title={progress.isSaved ? "Remove from saved" : "Save roadmap"}
                    className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                  >
                    {progress.isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <Link
                  href={`/roadmap/${track.id}`}
                  className="block text-base font-bold text-slate-900 hover:text-[#173B70] transition-colors"
                >
                  {track.name}
                </Link>

                <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                  {track.description}
                </p>

                {/* Progress Stats */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-blue-600" />
                      )}
                      <span>
                        {isCompleted
                          ? "Roadmap Finished!"
                          : `Stage ${currentStageNumber} of ${track.totalStages}`}
                      </span>
                    </span>
                    <span className={isCompleted ? "text-emerald-700" : "text-[#173B70]"}>
                      {percent}%
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isCompleted ? "bg-emerald-500" : "bg-[#173B70]"
                      }`}
                      style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>
                      {completedCount} of {track.totalStages} stages completed
                    </span>
                    {progress.lastAccessedAt && (
                      <span className="truncate max-w-[120px]">
                        Active: {new Date(progress.lastAccessedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <Link
                  href={`/roadmap/${track.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-50 hover:bg-[#173B70] text-[#173B70] hover:text-white border border-slate-200/80 hover:border-transparent text-xs font-semibold transition-all duration-150"
                >
                  <span>{isCompleted ? "Review Completed Stages" : "Continue Learning"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
