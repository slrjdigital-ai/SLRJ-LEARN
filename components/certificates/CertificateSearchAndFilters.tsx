"use client";

import React from "react";
import { Filter, RotateCcw, Search, ShieldCheck } from "lucide-react";

export interface CertificateFilterState {
  searchQuery: string;
  status: "all" | "valid" | "revoked";
  sortBy: "newest" | "oldest" | "alphabetical";
}

interface CertificateSearchAndFiltersProps {
  filters: CertificateFilterState;
  onChangeFilter: <K extends keyof CertificateFilterState>(
    key: K,
    value: CertificateFilterState[K]
  ) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export default function CertificateSearchAndFilters({
  filters,
  onChangeFilter,
  onResetFilters,
  hasActiveFilters,
}: CertificateSearchAndFiltersProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-lg">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChangeFilter("searchQuery", e.target.value)}
            placeholder="Search certificate title, ID, or activity..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#173B70]"
          />
        </div>

        {/* Reset Filters CTA */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 font-semibold transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Filter Chips Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
        {/* Verification Status */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Verification Status
          </label>
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-50 rounded-xl border border-slate-200/80">
            {(["all", "valid", "revoked"] as const).map((st) => (
              <button
                key={st}
                onClick={() => onChangeFilter("status", st)}
                className={`py-1 text-center rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                  filters.status === st
                    ? "bg-white text-[#173B70] shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {st === "all" ? "All Statuses" : st === "valid" ? "Verified" : "Revoked"}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Order */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Sort Order
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChangeFilter("sortBy", e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold focus:outline-none focus:border-[#173B70] cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
