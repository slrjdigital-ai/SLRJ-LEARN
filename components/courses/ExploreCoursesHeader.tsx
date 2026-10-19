"use client";

import { Search, Filter, X, BookOpen, SlidersHorizontal } from "lucide-react";

export type SortOption = "recommended" | "newest" | "popular" | "shortest";

interface ExploreCoursesHeaderProps {
  totalCourses: number;
  filteredCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  activeFilterCount: number;
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
}

export default function ExploreCoursesHeader({
  totalCourses,
  filteredCount,
  searchQuery,
  onSearchChange,
  isFilterOpen,
  onToggleFilter,
  activeFilterCount,
}: ExploreCoursesHeaderProps) {
  return (
    <section className="space-y-6">
      {/* ── Main Banner & Title Strip ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#173B70] border border-blue-200/70 text-xs font-bold uppercase tracking-wider">
              <BookOpen size={13} className="text-[#0b69ff]" />
              <span>Curriculum Catalog</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
              {totalCourses} Courses Available
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-brand text-[#182230] tracking-tight">
            Explore Courses
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl">
            Discover new skills, learn at your own pace, and build your future.
          </p>
        </div>

        {/* Course count indicator */}
        <div className="text-xs text-[#64748B] flex items-center gap-2">
          <span>Showing</span>
          <strong className="text-[#182230] font-bold text-sm">{filteredCount}</strong>
          <span>of {totalCourses} courses</span>
        </div>
      </div>

      {/* ── Search & Filter Controls Bar ── */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search Input Bar */}
        <div className="relative w-full flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search courses, topics, or skills..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#182230] placeholder-[#64748B] text-xs sm:text-sm focus:outline-none focus:border-[#173B70] focus:bg-white transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              title="Clear search"
              aria-label="Clear search query"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Right Action Controls: Filter Toggle Button */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Filter Toggle Button */}
          <button
            onClick={onToggleFilter}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFilterOpen || activeFilterCount > 0
                ? "bg-[#173B70] text-white shadow-xs"
                : "bg-[#F8FAFC] hover:bg-slate-100 text-[#182230] border border-[#E2E8F0]"
            }`}
            aria-expanded={isFilterOpen}
            aria-label="Toggle filter panel"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-[#173B70] text-[10px] font-black flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
