"use client";

import { Sparkles, Layers, Rocket } from "lucide-react";
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
    icon: typeof Sparkles;
    count: number;
    activeBorder: string;
    activeBg: string;
    activeText: string;
    activeBadge: string;
    inactiveBadge: string;
    inactiveIconBg: string;
    indicatorColor: string;
  }> = [
    {
      id: "basic",
      label: "Level 1: Basic",
      sublabel: "Foundations & Syntax",
      levelTag: "Beginner Tier",
      icon: Sparkles,
      count: counts.basic,
      activeBorder: "border-emerald-500 ring-2 ring-emerald-500/25 shadow-lg shadow-emerald-700/15",
      activeBg: "bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600",
      activeText: "text-white",
      activeBadge: "bg-white/20 text-white border-white/30 backdrop-blur-xs",
      inactiveBadge: "bg-emerald-50 text-emerald-800 border-emerald-200 group-hover:bg-emerald-100/80",
      inactiveIconBg: "bg-emerald-50 text-emerald-700 border border-emerald-200/70 group-hover:bg-emerald-100/90",
      indicatorColor: "bg-emerald-400",
    },
    {
      id: "intermediate",
      label: "Level 2: Intermediate",
      sublabel: "Full-Stack & Engineering",
      levelTag: "Intermediate Tier",
      icon: Layers,
      count: counts.intermediate,
      activeBorder: "border-[#18B6D2] ring-2 ring-[#18B6D2]/30 shadow-lg shadow-[#173B70]/20",
      activeBg: "bg-gradient-to-br from-[#12316B] via-[#173B70] to-[#1E488F]",
      activeText: "text-white",
      activeBadge: "bg-white/20 text-white border-white/30 backdrop-blur-xs",
      inactiveBadge: "bg-blue-50 text-[#12316B] border-blue-200 group-hover:bg-blue-100/80",
      inactiveIconBg: "bg-blue-50 text-[#12316B] border border-blue-200/70 group-hover:bg-blue-100/90",
      indicatorColor: "bg-[#18B6D2]",
    },
    {
      id: "pro",
      label: "Level 3: Pro",
      sublabel: "Architecture, Cloud & AI",
      levelTag: "Advanced Tier",
      icon: Rocket,
      count: counts.pro,
      activeBorder: "border-purple-500 ring-2 ring-purple-500/25 shadow-lg shadow-purple-900/20",
      activeBg: "bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-700",
      activeText: "text-white",
      activeBadge: "bg-white/20 text-white border-white/30 backdrop-blur-xs",
      inactiveBadge: "bg-purple-50 text-purple-800 border-purple-200 group-hover:bg-purple-100/80",
      inactiveIconBg: "bg-purple-50 text-purple-700 border border-purple-200/70 group-hover:bg-purple-100/90",
      indicatorColor: "bg-purple-400",
    },
  ];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <span className="font-black uppercase tracking-wider text-[11px] text-[#12316B]">
            Structured Learning Levels
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] text-slate-500 hidden sm:inline font-medium">
            Step-by-step from zero to industry pro
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedLevel === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectLevel(tab.id)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-3.5 cursor-pointer group shadow-2xs relative overflow-hidden active:scale-[0.98] ${
                isActive
                  ? `${tab.activeBg} ${tab.activeBorder} ${tab.activeText} shadow-md`
                  : "bg-white hover:bg-gradient-to-br hover:from-white hover:to-slate-50 border-slate-200/90 text-slate-800 hover:border-slate-300 hover:shadow-md hover:-translate-y-1"
              }`}
            >
              {/* Active Bottom Glow Line Indicator */}
              {isActive && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${tab.indicatorColor} shadow-xs`} />
              )}

              <div className="flex items-center justify-between gap-1 w-full">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 ${
                    isActive
                      ? "bg-white/20 text-white shadow-xs backdrop-blur-xs"
                      : tab.inactiveIconBg
                  }`}
                >
                  <Icon size={17} />
                </div>
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-md border tracking-wider uppercase shadow-2xs transition-colors ${
                    isActive ? tab.activeBadge : tab.inactiveBadge
                  }`}
                >
                  {tab.count} {tab.count === 1 ? "Course" : "Courses"}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-black tracking-widest uppercase ${
                      isActive ? "text-white/80" : "text-slate-400"
                    }`}
                  >
                    {tab.levelTag}
                  </span>
                </div>
                <div
                  className={`text-base font-black font-brand leading-snug mt-0.5 ${
                    isActive ? "text-white" : "text-[#182230] group-hover:text-[#12316B]"
                  }`}
                >
                  {tab.label}
                </div>
                <div
                  className={`text-xs mt-0.5 line-clamp-1 font-medium ${
                    isActive ? "text-white/85" : "text-slate-500"
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
