"use client";

import React from "react";
import { Filter, RotateCcw, Compass, Signal, Globe } from "lucide-react";

export interface EventFilterState {
  status: "all" | "Upcoming" | "Ongoing" | "Completed";
  format: "all" | "Online" | "In-Person" | "Hybrid";
  difficulty: "all" | "Beginner" | "Intermediate" | "Advanced";
  roadmapId: "all" | string;
  sortBy: "recommended" | "startingSoon" | "deadlineApproaching" | "newest";
}

interface EventSearchAndFiltersProps {
  filters: EventFilterState;
  onChangeFilter: <K extends keyof EventFilterState>(key: K, value: EventFilterState[K]) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export default function EventSearchAndFilters({
  filters,
  onChangeFilter,
  onResetFilters,
  hasActiveFilters,
}: EventSearchAndFiltersProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <Filter size={15} className="text-[#173B70]" />
          <span>Refine Events & Challenges</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 font-semibold transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Status
          </label>
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-50 rounded-xl border border-slate-200/80">
            {(["all", "Upcoming", "Ongoing", "Completed"] as const).map((st) => (
              <button
                key={st}
                onClick={() => onChangeFilter("status", st)}
                className={`py-1 text-center rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                  filters.status === st
                    ? "bg-white text-[#173B70] shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {st === "all" ? "All" : st}
              </button>
            ))}
          </div>
        </div>

        {/* Format Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Format
          </label>
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-50 rounded-xl border border-slate-200/80">
            {(["all", "Online", "In-Person", "Hybrid"] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => onChangeFilter("format", fmt)}
                className={`py-1 text-center rounded-lg font-semibold transition-all cursor-pointer ${
                  filters.format === fmt
                    ? "bg-white text-[#173B70] shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {fmt === "all" ? "All" : fmt === "In-Person" ? "In-Person" : fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Linked Career Roadmap */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Career Roadmap
          </label>
          <select
            value={filters.roadmapId}
            onChange={(e) => onChangeFilter("roadmapId", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold focus:outline-none focus:border-[#173B70] cursor-pointer"
          >
            <option value="all">All Roadmaps</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Full-Stack Developer</option>
            <option value="mobile">Mobile App Developer</option>
            <option value="data-science">Data Scientist</option>
            <option value="ai">AI / ML Engineer</option>
            <option value="cybersecurity">Cybersecurity Analyst</option>
            <option value="cloud">Cloud / DevOps Engineer</option>
          </select>
        </div>

        {/* Sorting Order */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Sort Order
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChangeFilter("sortBy", e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold focus:outline-none focus:border-[#173B70] cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="startingSoon">Starting Soonest</option>
            <option value="deadlineApproaching">Deadline Approaching</option>
            <option value="newest">Recently Published</option>
          </select>
        </div>
      </div>
    </div>
  );
}
