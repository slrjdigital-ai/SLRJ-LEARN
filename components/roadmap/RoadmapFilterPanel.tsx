"use client";

import { X, RotateCcw, Filter, Check } from "lucide-react";

export type RoadmapCategoryFilter =
  | "All Paths"
  | "Web Development"
  | "Mobile Development"
  | "AI & Data"
  | "Design"
  | "Cybersecurity";

export type RoadmapDifficultyFilter = "All" | "Beginner" | "Intermediate" | "Advanced";

export type RoadmapSortOption =
  | "Recommended"
  | "Beginner Friendly"
  | "Shortest Estimated Duration"
  | "Most Popular";

interface RoadmapFilterPanelProps {
  selectedCategory: RoadmapCategoryFilter;
  onSelectCategory: (category: RoadmapCategoryFilter) => void;
  selectedDifficulty: RoadmapDifficultyFilter;
  onSelectDifficulty: (difficulty: RoadmapDifficultyFilter) => void;
  selectedSort: RoadmapSortOption;
  onSelectSort: (sort: RoadmapSortOption) => void;
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  activeFilterCount: number;
}

const CATEGORIES: RoadmapCategoryFilter[] = [
  "All Paths",
  "Web Development",
  "Mobile Development",
  "AI & Data",
  "Design",
  "Cybersecurity",
];

const DIFFICULTIES: RoadmapDifficultyFilter[] = ["All", "Beginner", "Intermediate", "Advanced"];

const SORT_OPTIONS: RoadmapSortOption[] = [
  "Recommended",
  "Beginner Friendly",
  "Shortest Estimated Duration",
  "Most Popular",
];

export default function RoadmapFilterPanel({
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  selectedSort,
  onSelectSort,
  isOpen,
  onClose,
  onReset,
  activeFilterCount,
}: RoadmapFilterPanelProps) {
  return (
    <div className="space-y-4">
      {/* Horizontally Scrollable Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isActive
                  ? "bg-[#173B70] text-white border-[#173B70] shadow-xs"
                  : "bg-white text-slate-600 border-slate-200/90 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Expanded Filters Drawer / Panel */}
      {isOpen && (
        <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#173B70]" />
              <h3 className="text-sm font-bold text-slate-900">Roadmap Filter & Sort Options</h3>
            </div>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Experience / Difficulty Level */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Experience Level
              </label>
              <div className="flex flex-wrap gap-2">
                {DIFFICULTIES.map((diff) => {
                  const isSelected = selectedDifficulty === diff;
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => onSelectDifficulty(diff)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isSelected
                          ? "bg-blue-50 text-[#173B70] border-blue-200 font-semibold"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {diff === "All" ? "All Levels" : diff}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Sort Paths By
              </label>
              <div className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map((sort) => {
                  const isSelected = selectedSort === sort;
                  return (
                    <button
                      key={sort}
                      type="button"
                      onClick={() => onSelectSort(sort)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isSelected
                          ? "bg-blue-50 text-[#173B70] border-blue-200 font-semibold"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {sort}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
