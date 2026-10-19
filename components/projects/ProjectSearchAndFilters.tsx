"use client";

import { Search, SlidersHorizontal, RotateCcw, X } from "lucide-react";

export type ProjectCategoryFilter =
  | "All"
  | "Web Development"
  | "Mobile App Development"
  | "AI & Machine Learning"
  | "Data Analytics"
  | "UI/UX Design"
  | "Cybersecurity"
  | "Backend Development"
  | "Full-Stack Development";

export type ProjectDifficultyFilter = "All" | "Beginner" | "Intermediate" | "Advanced";

export type ProjectEffortFilter = "All" | "Short" | "Medium" | "Long";

export type ProjectSortOption =
  | "Recommended"
  | "Newest"
  | "Most Popular"
  | "Shortest Estimated Effort"
  | "Difficulty";

interface ProjectSearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ProjectCategoryFilter;
  onSelectCategory: (cat: ProjectCategoryFilter) => void;
  selectedDifficulty: ProjectDifficultyFilter;
  onSelectDifficulty: (diff: ProjectDifficultyFilter) => void;
  selectedRoadmap: string;
  onSelectRoadmap: (rm: string) => void;
  selectedEffort: ProjectEffortFilter;
  onSelectEffort: (eff: ProjectEffortFilter) => void;
  selectedSort: ProjectSortOption;
  onSelectSort: (sort: ProjectSortOption) => void;
  isFilterDrawerOpen: boolean;
  onToggleFilterDrawer: () => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

const CATEGORIES: ProjectCategoryFilter[] = [
  "All",
  "Web Development",
  "Backend Development",
  "Full-Stack Development",
  "Mobile App Development",
  "AI & Machine Learning",
  "Data Analytics",
  "UI/UX Design",
  "Cybersecurity",
];

const ROADMAPS = [
  { id: "all", label: "All Career Roadmaps" },
  { id: "frontend", label: "Frontend Developer" },
  { id: "backend", label: "Backend Developer" },
  { id: "fullstack", label: "Full-Stack Developer" },
  { id: "mobile", label: "Mobile App Developer" },
  { id: "ai-ml", label: "AI / ML Engineer" },
  { id: "data-analyst", label: "Data Analyst" },
  { id: "ui-ux", label: "UI/UX Designer" },
  { id: "cybersecurity", label: "Cybersecurity Analyst" },
];

export default function ProjectSearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  selectedRoadmap,
  onSelectRoadmap,
  selectedEffort,
  onSelectEffort,
  selectedSort,
  onSelectSort,
  isFilterDrawerOpen,
  onToggleFilterDrawer,
  onClearFilters,
  activeFilterCount,
}: ProjectSearchAndFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Top Search Bar & Primary Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by title, skills, or tools..."
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

        {/* Filter Drawer Toggle & Sort */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleFilterDrawer}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all shadow-2xs ${
              isFilterDrawerOpen || activeFilterCount > 0
                ? "bg-[#173B70] text-white border-[#173B70]"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
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

          {/* Quick Sort Select */}
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value as ProjectSortOption)}
            className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#173B70] shadow-2xs cursor-pointer"
          >
            <option value="Recommended">Sort: Recommended</option>
            <option value="Newest">Sort: Newest</option>
            <option value="Most Popular">Sort: Most XP / Popular</option>
            <option value="Shortest Estimated Effort">Sort: Shortest Effort</option>
            <option value="Difficulty">Sort: Difficulty Level</option>
          </select>
        </div>
      </div>

      {/* Category Chips Scroll */}
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

      {/* Expanded Filter Panel */}
      {isFilterDrawerOpen && (
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Advanced Project Filters</h3>
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              )}
              <button
                type="button"
                onClick={onToggleFilterDrawer}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Career Roadmap */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Career Roadmap
              </label>
              <select
                value={selectedRoadmap}
                onChange={(e) => onSelectRoadmap(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#173B70]"
              >
                {ROADMAPS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Difficulty */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(["All", "Beginner", "Intermediate", "Advanced"] as ProjectDifficultyFilter[]).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => onSelectDifficulty(diff)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedDifficulty === diff
                        ? "bg-blue-50 text-[#173B70] border-blue-200 font-semibold"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {diff === "All" ? "All Levels" : diff}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Estimated Effort */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Estimated Duration
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "All", label: "All Times" },
                  { id: "Short", label: "< 4 Hours" },
                  { id: "Medium", label: "4 - 6 Hours" },
                  { id: "Long", label: "6+ Hours" },
                ].map((eff) => (
                  <button
                    key={eff.id}
                    type="button"
                    onClick={() => onSelectEffort(eff.id as ProjectEffortFilter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedEffort === eff.id
                        ? "bg-blue-50 text-[#173B70] border-blue-200 font-semibold"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {eff.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
