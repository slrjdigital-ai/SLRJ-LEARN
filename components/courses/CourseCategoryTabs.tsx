"use client";

export const COURSE_CATEGORIES = [
  "All Courses",
  "Programming Languages",
  "Web Development",
  "Data Structures & Algorithms",
  "Tools & Developer Workflow",
  "Artificial Intelligence & Machine Learning",
  "Databases",
  "Cybersecurity",
  "Cloud & DevOps",
  "Data Analytics",
] as const;

export type CourseCategoryFilter = (typeof COURSE_CATEGORIES)[number];

export interface CourseCategoryTabsProps {
  selectedCategory: CourseCategoryFilter;
  onSelectCategory: (category: CourseCategoryFilter) => void;
  categoryCounts: Record<string, number>;
}

export default function CourseCategoryTabs({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: CourseCategoryTabsProps) {
  return null;
}
