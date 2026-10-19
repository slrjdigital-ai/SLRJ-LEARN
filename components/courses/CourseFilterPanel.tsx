"use client";

import { X, RotateCcw } from "lucide-react";
import { COURSE_CATEGORIES, CourseCategoryFilter } from "./CourseCategoryTabs";

export type DifficultyFilter = "All" | "Beginner" | "Intermediate" | "Advanced";
export type AccessFilter = "All" | "Free" | "Premium";
export type DurationFilter = "All" | "short" | "medium" | "long";
export type StatusFilter = "All" | "in_progress" | "completed" | "not_started";

interface CourseFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: CourseCategoryFilter;
  onCategoryChange: (category: CourseCategoryFilter) => void;
  selectedDifficulty: DifficultyFilter;
  onDifficultyChange: (diff: DifficultyFilter) => void;
  selectedStatus: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  selectedAccess: AccessFilter;
  onAccessChange: (access: AccessFilter) => void;
  selectedDuration: DurationFilter;
  onDurationChange: (duration: DurationFilter) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export default function CourseFilterPanel({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedStatus,
  onStatusChange,
  selectedAccess,
  onAccessChange,
  selectedDuration,
  onDurationChange,
  onResetFilters,
  activeFilterCount,
}: CourseFilterPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-[#182230] font-brand">Filter Courses</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#173B70] text-[10px] font-bold border border-blue-200">
              {activeFilterCount} Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-xs text-[#64748B] hover:text-[#173B70] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset All</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close filters panel"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 text-xs">
        {/* 1. Category */}
        <div className="space-y-2">
          <label className="font-bold text-[#182230] uppercase tracking-wider text-[11px]">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as CourseCategoryFilter)}
            className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#182230] font-semibold focus:outline-none focus:border-[#173B70] cursor-pointer"
          >
            {COURSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Difficulty */}
        <div className="space-y-2">
          <label className="font-bold text-[#182230] uppercase tracking-wider text-[11px]">
            Difficulty Level
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "All", label: "All Levels" },
              { id: "Beginner", label: "L1: Basic" },
              { id: "Intermediate", label: "L2: Mid" },
              { id: "Advanced", label: "L3: Pro" },
            ].map((diff) => (
              <button
                key={diff.id}
                onClick={() => onDifficultyChange(diff.id as DifficultyFilter)}
                className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all text-center cursor-pointer ${
                  selectedDifficulty === diff.id
                    ? "bg-[#173B70] text-white"
                    : "bg-[#F8FAFC] text-[#64748B] hover:text-[#182230] border border-[#E2E8F0]"
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Learning Status */}
        <div className="space-y-2">
          <label className="font-bold text-[#182230] uppercase tracking-wider text-[11px]">
            Learning Status
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "All", label: "All Status" },
              { id: "in_progress", label: "In Progress" },
              { id: "completed", label: "Completed" },
              { id: "not_started", label: "Not Started" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => onStatusChange(st.id as StatusFilter)}
                className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all text-center cursor-pointer ${
                  selectedStatus === st.id
                    ? "bg-[#173B70] text-white"
                    : "bg-[#F8FAFC] text-[#64748B] hover:text-[#182230] border border-[#E2E8F0]"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Access Type */}
        <div className="space-y-2">
          <label className="font-bold text-[#182230] uppercase tracking-wider text-[11px]">
            Access Type
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(["All", "Free", "Premium"] as AccessFilter[]).map((acc) => (
              <button
                key={acc}
                onClick={() => onAccessChange(acc)}
                className={`py-2 px-2.5 rounded-xl font-bold transition-all text-center cursor-pointer ${
                  selectedAccess === acc
                    ? "bg-[#173B70] text-white"
                    : "bg-[#F8FAFC] text-[#64748B] hover:text-[#182230] border border-[#E2E8F0]"
                }`}
              >
                {acc}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Estimated Duration */}
        <div className="space-y-2">
          <label className="font-bold text-[#182230] uppercase tracking-wider text-[11px]">
            Estimated Duration
          </label>
          <select
            value={selectedDuration}
            onChange={(e) => onDurationChange(e.target.value as DurationFilter)}
            className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#182230] font-semibold focus:outline-none focus:border-[#173B70] cursor-pointer"
          >
            <option value="All">Any Duration</option>
            <option value="short">Short (&lt; 15 Hours)</option>
            <option value="medium">Medium (15 - 25 Hours)</option>
            <option value="long">Deep Dive (25+ Hours)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
