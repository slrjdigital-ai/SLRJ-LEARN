"use client";

import { useState, useMemo, useCallback } from "react";
import { Course, PdfLesson, getAllCourses } from "@/data/courses";
import ExploreCoursesHeader, { SortOption } from "./ExploreCoursesHeader";
import CourseCategoryTabs, { CourseCategoryFilter } from "./CourseCategoryTabs";
import FeaturedCourseCard from "./FeaturedCourseCard";
import ContinueLearningSection from "./ContinueLearningSection";
import CourseFilterPanel, {
  DifficultyFilter,
  AccessFilter,
  DurationFilter,
} from "./CourseFilterPanel";
import CourseGrid from "./CourseGrid";
import CourseEmptyState from "./CourseEmptyState";
import PdfReaderModal from "./PdfReaderModal";

export default function ExploreCoursesView() {
  const allCourses = useMemo(() => getAllCourses(), []);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CourseCategoryFilter>("All Courses");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>("All");
  const [selectedAccess, setSelectedAccess] = useState<AccessFilter>("All");
  const [selectedDuration, setSelectedDuration] = useState<DurationFilter>("All");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // PDF Reader Modal states
  const [activePdfCourse, setActivePdfCourse] = useState<Course | null>(null);
  const [activePdfLesson, setActivePdfLesson] = useState<PdfLesson | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Category counts computation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allCourses.length };
    for (const c of allCourses) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
  }, [allCourses]);

  // Featured Course (first featured course, or default to first course)
  const featuredCourse = useMemo(() => {
    return allCourses.find((c) => c.isFeatured) || allCourses[0];
  }, [allCourses]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "All Courses") count++;
    if (selectedDifficulty !== "All") count++;
    if (selectedAccess !== "All") count++;
    if (selectedDuration !== "All") count++;
    return count;
  }, [selectedCategory, selectedDifficulty, selectedAccess, selectedDuration]);

  // Filter reset handler
  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All Courses");
    setSelectedDifficulty("All");
    setSelectedAccess("All");
    setSelectedDuration("All");
  }, []);

  // Multi-faceted filtering & sorting logic
  const filteredAndSortedCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // 1. Filter
    const filtered = allCourses.filter((course) => {
      // Search matching: title, description, category, skills
      if (query) {
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = (course.shortDescription || course.description || "")
          .toLowerCase()
          .includes(query);
        const matchesCat = course.category.toLowerCase().includes(query);
        const matchesSkills = (course.skills || course.skillsGained || []).some((s) =>
          s.toLowerCase().includes(query)
        );

        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesSkills) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "All Courses") {
        if (selectedCategory === "Programming") {
          if (course.category !== "Programming" && course.category !== "Java Programming" && course.category !== "Python Programming") {
            return false;
          }
        } else if (course.category !== selectedCategory) {
          return false;
        }
      }

      // Difficulty filter
      if (selectedDifficulty !== "All" && course.difficulty !== selectedDifficulty) {
        return false;
      }

      // Access filter
      if (selectedAccess !== "All" && course.accessType !== selectedAccess) {
        return false;
      }

      // Duration filter
      if (selectedDuration !== "All") {
        const mins = course.estimatedDurationMinutes || 600;
        if (selectedDuration === "short" && mins >= 900) return false; // < 15 hrs
        if (selectedDuration === "medium" && (mins < 900 || mins > 1500)) return false; // 15-25 hrs
        if (selectedDuration === "long" && mins <= 1500) return false; // > 25 hrs
      }

      return true;
    });

    // 2. Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (sortBy === "popular") {
        return (b.totalXp || 0) - (a.totalXp || 0);
      }
      if (sortBy === "shortest") {
        return (a.estimatedDurationMinutes || 0) - (b.estimatedDurationMinutes || 0);
      }
      // "recommended" (featured first, then alphabetic)
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.title.localeCompare(b.title);
    });
  }, [
    allCourses,
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedAccess,
    selectedDuration,
    sortBy,
  ]);

  // Open Quick PDF Reader modal
  const handleOpenQuickRead = useCallback((course: Course) => {
    setActivePdfCourse(course);
    const firstLesson = course.pdfLessons?.[0] || null;
    setActivePdfLesson(firstLesson);
    setIsPdfModalOpen(true);
  }, []);

  // PDF Navigation within modal
  const handleNavigateLesson = useCallback(
    (direction: "prev" | "next") => {
      if (!activePdfCourse || !activePdfLesson) return;
      const lessons = activePdfCourse.pdfLessons || [];
      const currentIndex = lessons.findIndex((l) => l.id === activePdfLesson.id);
      if (currentIndex === -1) return;

      if (direction === "prev" && currentIndex > 0) {
        setActivePdfLesson(lessons[currentIndex - 1]);
      } else if (direction === "next" && currentIndex < lessons.length - 1) {
        setActivePdfLesson(lessons[currentIndex + 1]);
      }
    },
    [activePdfCourse, activePdfLesson]
  );

  const activeLessonIndex = useMemo(() => {
    if (!activePdfCourse || !activePdfLesson) return -1;
    return (activePdfCourse.pdfLessons || []).findIndex((l) => l.id === activePdfLesson.id);
  }, [activePdfCourse, activePdfLesson]);

  const hasPrevLesson = activeLessonIndex > 0;
  const hasNextLesson =
    activePdfCourse && activeLessonIndex >= 0
      ? activeLessonIndex < (activePdfCourse.pdfLessons || []).length - 1
      : false;

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* ── A. Page Header ── */}
      <ExploreCoursesHeader
        totalCourses={allCourses.length}
        filteredCount={filteredAndSortedCourses.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isFilterOpen={isFilterPanelOpen}
        onToggleFilter={() => setIsFilterPanelOpen((prev) => !prev)}
        activeFilterCount={activeFilterCount}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* ── Filter Panel Popover (when toggled) ── */}
      <CourseFilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedAccess={selectedAccess}
        onAccessChange={setSelectedAccess}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* ── H. Continue Learning Section (My Learning) ── */}
      <ContinueLearningSection />

      {/* ── B. Featured Courses Section ── */}
      {!searchQuery && selectedCategory === "All Courses" && featuredCourse && (
        <FeaturedCourseCard course={featuredCourse} />
      )}

      {/* ── C. Horizontally Scrollable Category Chips ── */}
      <CourseCategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* ── D. Course Catalog Grid or Empty State ── */}
      {filteredAndSortedCourses.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-semibold uppercase tracking-wider">
              Course Catalog ({filteredAndSortedCourses.length})
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-[#173B70] hover:underline font-bold cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          <CourseGrid
            courses={filteredAndSortedCourses}
            onOpenQuickRead={handleOpenQuickRead}
          />
        </section>
      ) : (
        <CourseEmptyState
          searchQuery={searchQuery}
          hasActiveFilters={activeFilterCount > 0}
          onResetFilters={handleResetFilters}
        />
      )}

      {/* ── F. Accessible In-App PDF Reader Modal ── */}
      {activePdfCourse && activePdfLesson && (
        <PdfReaderModal
          course={activePdfCourse}
          lesson={activePdfLesson}
          isOpen={isPdfModalOpen}
          onClose={() => {
            setIsPdfModalOpen(false);
            setActivePdfCourse(null);
            setActivePdfLesson(null);
          }}
          onNavigateLesson={handleNavigateLesson}
          hasPrev={hasPrevLesson}
          hasNext={hasNextLesson}
        />
      )}
    </div>
  );
}
