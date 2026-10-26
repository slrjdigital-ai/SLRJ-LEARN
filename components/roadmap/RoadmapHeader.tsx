"use client";

import { Search, SlidersHorizontal, Compass, Sparkles, CheckCircle2, BookOpen } from "lucide-react";

interface RoadmapHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  totalPaths: number;
  startedCount: number;
  overallCompletionPercent: number;
  onExploreClick: () => void;
  activeFilterCount: number;
}

export default function RoadmapHeader({
  searchQuery,
  onSearchChange,
  isFilterOpen,
  onToggleFilter,
  totalPaths,
  startedCount,
  overallCompletionPercent,
  onExploreClick,
  activeFilterCount,
}: RoadmapHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border border-slate-200/90 shadow-sm p-6 sm:p-8">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#173B70]/5 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Title, Subtitle & Value Metrics */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#173B70] border border-blue-200/70 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Structured Career Guidance</span>
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span>10 Industry Paths</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-brand">
            Role Roadmaps
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Choose your career path. Follow your roadmap. Build the skills that move you forward.
            Step-by-step guidance linking PDF courses, hands-on projects, and verified milestones.
          </p>

          {/* Key Metrics Chips */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-[#173B70]" />
              <span>Available Career Paths:</span>
              <span className="font-bold text-slate-900">{totalPaths}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Roadmaps Started:</span>
              <span className="font-bold text-slate-900">{startedCount}</span>
            </div>

            {startedCount > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Overall Completion:</span>
                <span className="font-bold text-emerald-900">{overallCompletionPercent}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Search, Filter Toggle & CTA */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-72 lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search careers, roles, or skills..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#173B70]/20 focus:border-[#173B70] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={onToggleFilter}
              className={`relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all shadow-2xs ${
                isFilterOpen || activeFilterCount > 0
                  ? "bg-[#173B70] text-white border-[#173B70]"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-[#173B70] text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Explore All Paths Button */}
            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
            >
              Explore All Paths
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
