"use client";

import { Search, RotateCcw } from "lucide-react";

interface CourseEmptyStateProps {
  searchQuery?: string;
  hasActiveFilters?: boolean;
  onResetFilters: () => void;
}

export default function CourseEmptyState({
  searchQuery,
  hasActiveFilters,
  onResetFilters,
}: CourseEmptyStateProps) {
  return (
    <div className="py-16 px-6 text-center rounded-3xl bg-white border border-[#E2E8F0] shadow-xs max-w-xl mx-auto space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#173B70] flex items-center justify-center mx-auto shadow-2xs">
        <Search size={24} />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-[#182230] font-brand">No courses found</h3>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto leading-relaxed">
          {searchQuery ? (
            <>
              We couldn&apos;t find any courses matching &ldquo;
              <strong className="text-slate-800">{searchQuery}</strong>&rdquo;. Try searching for different keywords or clearing your filters.
            </>
          ) : (
            "No courses match your selected filter criteria. Try adjusting difficulty, category, or duration filters."
          )}
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
}
