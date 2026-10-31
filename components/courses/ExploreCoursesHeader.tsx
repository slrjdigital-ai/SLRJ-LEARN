"use client";

import { Search, X, BookOpen } from "lucide-react";

export type SortOption = "recommended" | "newest" | "popular" | "shortest";

interface ExploreCoursesHeaderProps {
  totalCourses: number;
  filteredCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isFilterOpen?: boolean;
  onToggleFilter?: () => void;
  activeFilterCount?: number;
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
}

export default function ExploreCoursesHeader({
  totalCourses,
  filteredCount,
  searchQuery,
  onSearchChange,
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

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-brand text-[#182230] tracking-tight">
            Explore Courses
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mt-1">
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

      {/* ── Search Bar ── */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex items-center">
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
      </div>
    </section>
  );
}
