"use client";

import React from "react";
import {
  Sparkles,
  Code2,
  Trophy,
  Layers,
  Video,
  Palette,
  Brain,
  ShieldCheck,
  Users,
} from "lucide-react";

export const EVENT_CATEGORIES = [
  { id: "All Events", label: "All Events", icon: Sparkles },
  { id: "Coding Challenges", label: "Coding Challenges", icon: Code2 },
  { id: "Hackathons", label: "Hackathons", icon: Trophy },
  { id: "Workshops", label: "Workshops", icon: Layers },
  { id: "Webinars", label: "Webinars", icon: Video },
  { id: "Design Challenges", label: "Design Challenges", icon: Palette },
  { id: "AI & Data Challenges", label: "AI & Data", icon: Brain },
  { id: "Cybersecurity Labs", label: "Cybersecurity Labs", icon: ShieldCheck },
  { id: "Community Events", label: "Community", icon: Users },
] as const;

interface EventCategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export default function EventCategoryTabs({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: EventCategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
      {EVENT_CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;
        const count = categoryCounts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              isSelected
                ? "bg-[#173B70] text-white border-[#173B70] shadow-2xs font-bold"
                : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200"
            }`}
          >
            <Icon size={14} className={isSelected ? "text-cyan-300" : "text-slate-400"} />
            <span>{cat.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                isSelected
                  ? "bg-white/20 text-white font-bold"
                  : "bg-slate-100 text-slate-500 font-semibold"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
