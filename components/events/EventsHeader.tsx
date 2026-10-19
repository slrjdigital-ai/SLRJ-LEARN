"use client";

import React from "react";
import {
  Trophy,
  Calendar,
  Flame,
  Award,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";

interface EventsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  activeView: "discover" | "my-activities";
  onViewChange: (view: "discover" | "my-activities") => void;
  upcomingCount: number;
  activeChallengesCount: number;
  registeredCount: number;
  completedCount: number;
}

export default function EventsHeader({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  activeView,
  onViewChange,
  upcomingCount,
  activeChallengesCount,
  registeredCount,
  completedCount,
}: EventsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* ── Top Title & Primary Actions ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/90">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-[#173B70] text-xs font-bold uppercase tracking-wider">
            <Trophy size={13} className="text-[#173B70]" />
            <span>Community Learning & Competitions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-brand tracking-tight">
            Events & Challenges
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Learn together, build real skills, and challenge yourself with hackathons, algorithmic coding sprints, technical workshops, and defensive security labs.
          </p>
        </div>

        {/* View Switcher CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onViewChange("discover")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeView === "discover"
                ? "bg-[#173B70] text-white shadow-md shadow-[#173B70]/20"
                : "bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200"
            }`}
          >
            <Sparkles size={15} />
            <span>Explore Challenges</span>
          </button>

          <button
            onClick={() => onViewChange("my-activities")}
            className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeView === "my-activities"
                ? "bg-[#173B70] text-white shadow-md shadow-[#173B70]/20"
                : "bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200"
            }`}
          >
            <UserCheck size={15} />
            <span>My Activities</span>
            {registeredCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-black">
                {registeredCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Metric Stats Cards (Clean 0-State for Fresh Learners) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Upcoming Events */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-50 text-[#173B70] border border-blue-100">
            <Calendar size={18} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-brand">
              {upcomingCount}
            </div>
            <div className="text-xs font-semibold text-slate-500">Upcoming Events</div>
          </div>
        </div>

        {/* Active Coding Challenges */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-100">
            <Flame size={18} className="text-orange-500 fill-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-brand">
              {activeChallengesCount}
            </div>
            <div className="text-xs font-semibold text-slate-500">Active Challenges</div>
          </div>
        </div>

        {/* Registered Events (Real data, 0 for fresh user) */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
            <UserCheck size={18} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-brand">
              {registeredCount}
            </div>
            <div className="text-xs font-semibold text-slate-500">Registered Activities</div>
          </div>
        </div>

        {/* Completed Challenges */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-brand">
              {completedCount}
            </div>
            <div className="text-xs font-semibold text-slate-500">Completed Challenges</div>
          </div>
        </div>
      </div>

      {/* ── Search Bar & Filter Toggle (in Discover View) ── */}
      {activeView === "discover" && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search events, challenges, or skills..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#173B70] focus:ring-2 focus:ring-[#173B70]/10 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={onToggleFilters}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs ${
              showFilters
                ? "bg-blue-50 text-[#173B70] border-blue-200"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
            }`}
          >
            <Filter size={15} />
            <span>Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
