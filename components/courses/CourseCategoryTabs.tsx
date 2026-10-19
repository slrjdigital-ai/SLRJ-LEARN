"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const COURSE_CATEGORIES = [
  "All Courses",
  "Programming",
  "Web Development",
  "Mobile Development",
  "Artificial Intelligence",
  "Data Science",
  "UI/UX Design",
  "Cybersecurity",
  "Career Development",
] as const;

export type CourseCategoryFilter = (typeof COURSE_CATEGORIES)[number];

interface CourseCategoryTabsProps {
  selectedCategory: CourseCategoryFilter;
  onSelectCategory: (category: CourseCategoryFilter) => void;
  categoryCounts: Record<string, number>;
}

export default function CourseCategoryTabs({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: CourseCategoryTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white shadow-md border border-[#E2E8F0] items-center justify-center text-[#64748B] hover:text-[#182230] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="Scroll categories left"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Horizontally scrollable chip container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar scroll-smooth"
        role="tablist"
        aria-label="Course categories"
      >
        {COURSE_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const count = cat === "All Courses" ? categoryCounts["All"] || 0 : categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(cat)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#173B70] text-white shadow-xs"
                  : "bg-white hover:bg-slate-50 text-[#64748B] hover:text-[#182230] border border-[#E2E8F0]"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white shadow-md border border-[#E2E8F0] items-center justify-center text-[#64748B] hover:text-[#182230] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="Scroll categories right"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
