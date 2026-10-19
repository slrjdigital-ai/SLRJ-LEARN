"use client";

import React from "react";
import { Award, BookOpen, Compass, FolderGit2, Trophy, Sparkles } from "lucide-react";
import { CertificateCategory } from "@/data/certificatesStore";

export const CERTIFICATE_CATEGORIES = [
  { id: "all", label: "All Certificates", icon: Sparkles },
  { id: "Course", label: "Course Certificates", icon: BookOpen },
  { id: "Roadmap", label: "Roadmap Certificates", icon: Compass },
  { id: "Project", label: "Project Achievements", icon: FolderGit2 },
  { id: "Event", label: "Event Certificates", icon: Trophy },
] as const;

interface CertificateCategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export default function CertificateCategoryTabs({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: CertificateCategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
      {CERTIFICATE_CATEGORIES.map((cat) => {
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
