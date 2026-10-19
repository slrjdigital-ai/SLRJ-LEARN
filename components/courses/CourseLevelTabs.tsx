"use client";

import { Sparkles, Layers, Rocket, Grid } from "lucide-react";
import { CourseLevelId } from "@/data/courses";

export type CourseLevelFilter = "all" | CourseLevelId;

interface CourseLevelTabsProps {
  selectedLevel: CourseLevelFilter;
  onSelectLevel: (level: CourseLevelFilter) => void;
  counts: {
    all: number;
    basic: number;
    intermediate: number;
    pro: number;
  };
}

export default function CourseLevelTabs({
  selectedLevel,
  onSelectLevel,
  counts,
}: CourseLevelTabsProps) {
  const tabs: Array<{
    id: CourseLevelFilter;
    label: string;
    sublabel: string;
    levelTag: string;
    icon: typeof Grid;
    count: number;
    activeBorder: string;
    activeBg: string;
    activeText: string;
    activeBadge: string;
    inactiveBadge: string;
  }> = [
    {
      id: "all",
      label: "All Levels",
      sublabel: "Complete curriculum",
      levelTag: "Overview",
      icon: Grid,
      count: counts.all,
      activeBorder: "border-[#12316B] ring-2 ring-[#12316B]/15",
      activeBg: "bg-gradient-to-r from-[#12316B] to-[#1E488F]",
      activeText: "text-white",
      activeBadge: "bg-white/20 text-white border-white/30",
      inactiveBadge: "bg-slate-100 text-slate-700 border-slate-200",
    },
    {
      id: "basic",
      label: "Level 1: Basic",
      sublabel: "Foundations & Syntax",
      levelTag: "Beginner",
      icon: Sparkles,
      count: counts.basic,
      activeBorder: "border-emerald-600 ring-2 ring-emerald-600/15",
      activeBg: "bg-gradient-to-r from-emerald-700 to-emerald-600",
      activeText: "text-white",
      activeBadge: "bg-white/20 text-white border-white/30",
      inactiveBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      id: "intermediate",
      label: "Level 2: Intermediate",
      sublabel: "Engineering & DSA",
      levelTag: "Intermediate",
      icon: Layers,
      count: counts.intermediate,
      activeBorder: "border-[#173B70] ring-2 ring-[#173B70]/15",
      activeBg: "bg-gradient-to-r from-[#173B70] to-[#2456A6]",
      activeText: "text-white",
      activeBadge: "bg-white/20 text-white border-white/30",
      inactiveBadge: "bg-blue-50 text-[#12316B] border-blue-200",
    },
    {
      id: "pro",
      label: "Level 3: Pro",
      sublabel: "Architecture & AI",
      levelTag: "Advanced",
      icon: Rocket,
      count: counts.pro,
      activeBorder: "border-purple-600 ring-2 ring-purple-600/15",
      activeBg: "bg-gradient-to-r from-purple-800 to-purple-600",
      activeText: "text-white",
      activeBadge: "bg-white/20 text-white border-white/30",
      inactiveBadge: "bg-purple-50 text-purple-800 border-purple-200",
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <span className="font-extrabold uppercase tracking-wider text-[11px] text-[#12316B]">
            Structured Learning Levels
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Step-by-step from zero to industry pro
          </span>
        </div>
        {selectedLevel !== "all" && (
          <button
            onClick={() => onSelectLevel("all")}
            className="text-[11px] font-bold text-[#173B70] hover:underline cursor-pointer"
          >
            Reset to All Levels &times;
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedLevel === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectLevel(tab.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 cursor-pointer group shadow-2xs relative overflow-hidden ${
                isActive
                  ? `${tab.activeBg} ${tab.activeBorder} ${tab.activeText} shadow-md`
                  : "bg-white hover:bg-slate-50/80 border-slate-200 text-slate-800 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-700 group-hover:bg-slate-200"
                  }`}
                >
                  <Icon size={16} />
                </div>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-md border tracking-wider uppercase ${
                    isActive ? tab.activeBadge : tab.inactiveBadge
                  }`}
                >
                  {tab.count} {tab.count === 1 ? "Course" : "Courses"}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-extrabold tracking-widest uppercase ${
                      isActive ? "text-white/80" : "text-slate-400"
                    }`}
                  >
                    {tab.levelTag}
                  </span>
                </div>
                <div
                  className={`text-sm sm:text-[15px] font-black font-brand leading-snug mt-0.5 ${
                    isActive ? "text-white" : "text-[#182230] group-hover:text-[#12316B]"
                  }`}
                >
                  {tab.label}
                </div>
                <div
                  className={`text-xs mt-0.5 line-clamp-1 ${
                    isActive ? "text-white/80" : "text-slate-500"
                  }`}
                >
                  {tab.sublabel}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
