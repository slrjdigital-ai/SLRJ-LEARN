"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Course,
  PdfLesson,
  getAllCourses,
  COURSE_LEVELS,
  CourseLevelInfo,
  getCourseLevel,
} from "@/data/courses";
import ExploreCoursesHeader, { SortOption } from "./ExploreCoursesHeader";
import { CourseCategoryFilter } from "./CourseCategoryTabs";
import CourseLevelTabs, { CourseLevelFilter } from "./CourseLevelTabs";
import CourseFilterPanel, {
  DifficultyFilter,
  AccessFilter,
  DurationFilter,
  StatusFilter,
} from "./CourseFilterPanel";
import { useCourseProgress } from "@/lib/courseProgress";
import CourseGrid from "./CourseGrid";
import CourseEmptyState from "./CourseEmptyState";
import PdfReaderModal from "./PdfReaderModal";
import { ArrowRight, RotateCcw } from "lucide-react";

interface LevelSectionProps {
  info: CourseLevelInfo;
  courses: Course[];
  totalLevelCount: number;
  isIsolated: boolean;
  onOpenQuickRead: (course: Course) => void;
  onSelectLevel: (level: CourseLevelFilter) => void;
  onResetToAll: () => void;
}

function CourseLevelSection({
  info,
  courses,
  totalLevelCount,
  isIsolated,
  onOpenQuickRead,
  onSelectLevel,
  onResetToAll,
}: LevelSectionProps) {
  return (
    <section id={`level-${info.levelNumber}`} className="space-y-4 scroll-mt-24">
      {/* ── Level Header Card ── */}
      <div
        className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${info.headerGradientClass} border shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all`}
      >
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm flex-shrink-0 shadow-xs ${info.accentBgClass}`}
          >
            L{info.levelNumber}
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-md border tracking-wider uppercase ${info.badgeClass}`}
              >
                {info.badgeLabel}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                • Tier {info.levelNumber} Curriculum
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black font-brand text-[#182230] truncate">
              {info.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] line-clamp-2 max-w-3xl">
              {info.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center flex-shrink-0">
          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-white text-slate-800 border border-slate-200 shadow-2xs">
            {courses.length} {courses.length === 1 ? "Course" : "Courses"}
            {courses.length < totalLevelCount && ` (filtered from ${totalLevelCount})`}
          </span>

          {!isIsolated ? (
            <button
              onClick={() => onSelectLevel(info.id)}
              className="text-xs font-bold text-[#173B70] hover:text-[#12316B] hover:bg-slate-100/90 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs bg-white"
            >
              <span>View Only L{info.levelNumber}</span>
              <ArrowRight size={13} />
            </button>
          ) : (
            <button
              onClick={onResetToAll}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100/90 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs bg-white"
            >
              <span>View All Levels &times;</span>
            </button>
          )}
        </div>
      </div>

      {/* Course Grid for this Level */}
      <CourseGrid courses={courses} onOpenQuickRead={onOpenQuickRead} />
    </section>
  );
}

export default function ExploreCoursesView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allCourses = useMemo(() => getAllCourses(), []);

  // Sync Level with URL query (?level=basic | intermediate | pro)
  const levelQuery = searchParams ? searchParams.get("level") : null;
  const initialLevel: CourseLevelFilter = useMemo(() => {
    if (levelQuery === "basic" || levelQuery === "1") return "basic";
    if (levelQuery === "intermediate" || levelQuery === "2") return "intermediate";
    if (levelQuery === "pro" || levelQuery === "3") return "pro";
    return "all";
  }, [levelQuery]);

  const [selectedLevel, setSelectedLevel] = useState<CourseLevelFilter>(initialLevel);

  useEffect(() => {
    if (levelQuery === "basic" || levelQuery === "1") {
      setSelectedLevel("basic");
    } else if (levelQuery === "intermediate" || levelQuery === "2") {
      setSelectedLevel("intermediate");
    } else if (levelQuery === "pro" || levelQuery === "3") {
      setSelectedLevel("pro");
    } else if (!levelQuery) {
      setSelectedLevel("all");
    }
  }, [levelQuery]);

  const { getProgress } = useCourseProgress();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CourseCategoryFilter>("All Courses");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>("All");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All");
  const [selectedAccess, setSelectedAccess] = useState<AccessFilter>("All");
  const [selectedDuration, setSelectedDuration] = useState<DurationFilter>("All");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // PDF Reader Modal states
  const [activePdfCourse, setActivePdfCourse] = useState<Course | null>(null);
  const [activePdfLesson, setActivePdfLesson] = useState<PdfLesson | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Level counts computation (Total catalog distribution)
  const levelCounts = useMemo(() => {
    let basic = 0;
    let intermediate = 0;
    let pro = 0;
    for (const c of allCourses) {
      const lvl = getCourseLevel(c).id;
      if (lvl === "basic") basic++;
      else if (lvl === "intermediate") intermediate++;
      else if (lvl === "pro") pro++;
    }
    return {
      all: allCourses.length,
      basic,
      intermediate,
      pro,
    };
  }, [allCourses]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedLevel !== "all") count++;
    if (selectedCategory !== "All Courses") count++;
    if (selectedDifficulty !== "All") count++;
    if (selectedStatus !== "All") count++;
    if (selectedAccess !== "All") count++;
    if (selectedDuration !== "All") count++;
    return count;
  }, [selectedLevel, selectedCategory, selectedDifficulty, selectedStatus, selectedAccess, selectedDuration]);

  // Level selection handler with URL sync
  const handleSelectLevel = useCallback(
    (level: CourseLevelFilter) => {
      setSelectedLevel(level);
      const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
      if (level === "all") {
        params.delete("level");
      } else {
        params.set("level", level);
      }
      const qs = params.toString();
      router.replace(qs ? `/courses?${qs}` : "/courses", { scroll: false });
    },
    [searchParams, router]
  );

  // Filter reset handler
  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All Courses");
    setSelectedDifficulty("All");
    setSelectedStatus("All");
    setSelectedAccess("All");
    setSelectedDuration("All");
    handleSelectLevel("all");
  }, [handleSelectLevel]);

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
        if (course.category !== selectedCategory) {
          return false;
        }
      }

      // Difficulty filter from panel
      if (selectedDifficulty !== "All" && course.difficulty !== selectedDifficulty) {
        return false;
      }

      // Learning Status filter
      if (selectedStatus !== "All") {
        const p = getProgress(course.id);
        const isStarted = !!(p && p.progressPercentage > 0);
        const isDone = !!(p && p.progressPercentage >= 100);
        if (selectedStatus === "in_progress" && (!isStarted || isDone)) return false;
        if (selectedStatus === "completed" && !isDone) return false;
        if (selectedStatus === "not_started" && isStarted) return false;
      }

      // Access filter (Free / Premium)
      if (selectedAccess !== "All") {
        const isPaid = !!course.isPaid || course.accessType === "Premium";
        if (selectedAccess === "Free" && isPaid) return false;
        if (selectedAccess === "Premium" && !isPaid) return false;
      }

      // Duration filter
      if (selectedDuration !== "All") {
        const mins = course.estimatedDurationMinutes || 600;
        if (selectedDuration === "short" && mins >= 900) return false;
        if (selectedDuration === "medium" && (mins < 900 || mins > 1500)) return false;
        if (selectedDuration === "long" && mins <= 1500) return false;
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
      if (a.displayOrder && b.displayOrder && a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder;
      }
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.title.localeCompare(b.title);
    });
  }, [
    allCourses,
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedStatus,
    selectedAccess,
    selectedDuration,
    sortBy,
    getProgress,
  ]);

  // Partition filtered courses into the 3 discrete levels
  // Level 1: Basic ordered strictly as: 1. C, 2. C++, 3. HTML & CSS, 4. Python, 5. Data Structures
  const level1Courses = useMemo(() => {
    const list = filteredAndSortedCourses.filter((c) => getCourseLevel(c).id === "basic");
    if (sortBy === "recommended") {
      const basicOrderMap: Record<string, number> = {
        "c-programming": 1,
        "course-c-programming": 1,
        "cpp-programming": 2,
        "course-cpp-programming": 2,
        "html-css": 3,
        "course-html-css": 3,
        "python-programming": 4,
        "course-python-programming": 4,
        "data-structures-and-algorithms": 5,
        "course-dsa-algorithms": 5,
      };
      return [...list].sort((a, b) => {
        const orderA = basicOrderMap[a.slug] || basicOrderMap[a.id] || (a.displayOrder ?? 99);
        const orderB = basicOrderMap[b.slug] || basicOrderMap[b.id] || (b.displayOrder ?? 99);
        return orderA - orderB;
      });
    }
    return list;
  }, [filteredAndSortedCourses, sortBy]);

  // Level 2: Intermediate ordered as: 1. Java, 2. JavaScript, 3. Node.js, 4. React & Next.js, 5. Git & GitHub, 6. Cybersecurity, 7. AI & Machine Learning
  const level2Courses = useMemo(() => {
    const list = filteredAndSortedCourses.filter((c) => getCourseLevel(c).id === "intermediate");
    if (sortBy === "recommended") {
      const intermediateOrderMap: Record<string, number> = {
        "java-programming": 1,
        "course-java-programming": 1,
        "javascript-typescript": 2,
        "course-javascript-typescript": 2,
        "nodejs-express": 3,
        "course-nodejs-express": 3,
        "react-nextjs": 4,
        "course-react-nextjs": 4,
        "git-github": 5,
        "course-git-github": 5,
        "cybersecurity-fundamentals": 6,
        "course-cybersecurity-fundamentals": 6,
        "ai-machine-learning": 7,
        "course-ai-machine-learning": 7,
      };
      return [...list].sort((a, b) => {
        const orderA = intermediateOrderMap[a.slug] || intermediateOrderMap[a.id] || (a.displayOrder ?? 99);
        const orderB = intermediateOrderMap[b.slug] || intermediateOrderMap[b.id] || (b.displayOrder ?? 99);
        return orderA - orderB;
      });
    }
    return list;
  }, [filteredAndSortedCourses, sortBy]);

  // Level 3: Pro contains all remaining courses
  const level3Courses = useMemo(() => {
    const list = filteredAndSortedCourses.filter((c) => getCourseLevel(c).id === "pro");
    if (sortBy === "recommended") {
      const proOrderMap: Record<string, number> = {
        "sql-mongodb": 1,
        "course-sql-mongodb": 1,
        "cloud-native-serverless": 2,
        "course-cloud-native-serverless": 2,
        "ai-data-analytics-bi": 3,
        "course-ai-data-analytics-bi": 3,
        "generative-ai-llms": 4,
        "course-generative-ai-llms": 4,
        "ai-agents-automation": 5,
        "course-ai-agents-automation": 5,
        "ai-agents-agentic-ai": 6,
        "course-ai-agents-agentic-ai": 6,
        "generative-ai-llm-app-dev": 7,
        "course-generative-ai-llm-app-dev": 7,
        "ai-assisted-coding-dev-tools": 8,
        "course-ai-assisted-coding-dev-tools": 8,
        "ai-chatbots-voice-ai": 9,
        "course-ai-chatbots-voice-ai": 9,
      };
      return [...list].sort((a, b) => {
        const orderA = proOrderMap[a.slug] || proOrderMap[a.id] || (a.displayOrder ?? 99);
        const orderB = proOrderMap[b.slug] || proOrderMap[b.id] || (b.displayOrder ?? 99);
        return orderA - orderB;
      });
    }
    return list;
  }, [filteredAndSortedCourses, sortBy]);

  // Total matching courses considering selected level
  const activeDisplayedCoursesCount = useMemo(() => {
    if (selectedLevel === "basic") return level1Courses.length;
    if (selectedLevel === "intermediate") return level2Courses.length;
    if (selectedLevel === "pro") return level3Courses.length;
    return filteredAndSortedCourses.length;
  }, [selectedLevel, level1Courses, level2Courses, level3Courses, filteredAndSortedCourses]);

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
        filteredCount={activeDisplayedCoursesCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isFilterOpen={isFilterPanelOpen}
        onToggleFilter={() => setIsFilterPanelOpen((prev) => !prev)}
        activeFilterCount={activeFilterCount}
      />

      {/* ── Filter Panel Popover (when toggled) ── */}
      <CourseFilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedAccess={selectedAccess}
        onAccessChange={setSelectedAccess}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* ── Level Tabs (Level 1: Basic, Level 2: Intermediate, Level 3: Pro) ── */}
      <CourseLevelTabs
        selectedLevel={selectedLevel}
        onSelectLevel={handleSelectLevel}
        counts={levelCounts}
      />

      {/* ── Active Level Filter Pill Banner (when single level isolated) ── */}
      {selectedLevel !== "all" && (
        <div className="flex items-center justify-between p-3.5 px-4 rounded-xl bg-blue-50/80 border border-blue-200/90 text-xs font-semibold text-[#12316B] shadow-2xs">
          <div className="flex items-center gap-2">
            <span>
              Filtering by{" "}
              <strong className="font-extrabold text-[#12316B]">
                {COURSE_LEVELS[selectedLevel].name}
              </strong>{" "}
              ({activeDisplayedCoursesCount} courses available)
            </span>
          </div>
          <button
            onClick={() => handleSelectLevel("all")}
            className="text-xs font-bold text-[#173B70] hover:text-[#12316B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Show All 3 Levels</span>
          </button>
        </div>
      )}

      {/* ── D. Divided Course Catalog ── */}
      {activeDisplayedCoursesCount > 0 ? (
        <div className="space-y-10">
          {/* Level 1: Basic Section */}
          {(selectedLevel === "all" || selectedLevel === "basic") &&
            level1Courses.length > 0 && (
              <CourseLevelSection
                info={COURSE_LEVELS.basic}
                courses={level1Courses}
                totalLevelCount={levelCounts.basic}
                isIsolated={selectedLevel === "basic"}
                onOpenQuickRead={handleOpenQuickRead}
                onSelectLevel={handleSelectLevel}
                onResetToAll={() => handleSelectLevel("all")}
              />
            )}

          {/* Level 2: Intermediate Section */}
          {(selectedLevel === "all" || selectedLevel === "intermediate") &&
            level2Courses.length > 0 && (
              <CourseLevelSection
                info={COURSE_LEVELS.intermediate}
                courses={level2Courses}
                totalLevelCount={levelCounts.intermediate}
                isIsolated={selectedLevel === "intermediate"}
                onOpenQuickRead={handleOpenQuickRead}
                onSelectLevel={handleSelectLevel}
                onResetToAll={() => handleSelectLevel("all")}
              />
            )}

          {/* Level 3: Pro Section */}
          {(selectedLevel === "all" || selectedLevel === "pro") &&
            level3Courses.length > 0 && (
              <CourseLevelSection
                info={COURSE_LEVELS.pro}
                courses={level3Courses}
                totalLevelCount={levelCounts.pro}
                isIsolated={selectedLevel === "pro"}
                onOpenQuickRead={handleOpenQuickRead}
                onSelectLevel={handleSelectLevel}
                onResetToAll={() => handleSelectLevel("all")}
              />
            )}
        </div>
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
