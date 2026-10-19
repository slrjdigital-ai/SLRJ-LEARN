"use client";

import { RoadmapTrack } from "@/data/roadmap";
import { LearnerRoadmapProgress } from "@/lib/roadmapProgress";
import RoadmapCard from "./RoadmapCard";
import { SearchX, RotateCcw } from "lucide-react";

interface RoadmapGridProps {
  tracks: RoadmapTrack[];
  progressMap: Record<string, LearnerRoadmapProgress>;
  onToggleSave: (trackId: string) => void;
  onResetFilters: () => void;
}

export default function RoadmapGrid({
  tracks,
  progressMap,
  onToggleSave,
  onResetFilters,
}: RoadmapGridProps) {
  if (tracks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center space-y-3">
        <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No career roadmaps match your criteria</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Try clearing your search query or adjusting your category and experience level filters.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#173B70] text-white text-xs font-semibold hover:bg-[#122e57] transition-all shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {tracks.map((track) => (
        <RoadmapCard
          key={track.id}
          track={track}
          progress={progressMap[track.id] || null}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}
