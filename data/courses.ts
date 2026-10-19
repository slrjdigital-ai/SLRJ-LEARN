import {
  PracticeExercise,
  Lesson,
  CourseModule,
  PdfLesson,
  Course,
  CourseLevelId,
  CourseLevelInfo,
} from "./coursesData/types";
import { PROGRAMMING_LANGUAGES_COURSES } from "./coursesData/programmingLanguages";
import { WEB_DEVELOPMENT_COURSES } from "./coursesData/webDevelopment";
import { DSA_AND_TOOLS_COURSES } from "./coursesData/dsaAndTools";
import { DATABASES_AND_INFRASTRUCTURE_COURSES } from "./coursesData/databasesAndInfrastructure";
import { AI_AND_MACHINE_LEARNING_COURSES } from "./coursesData/aiAndMachineLearning";

export type {
  PracticeExercise,
  Lesson,
  CourseModule,
  PdfLesson,
  Course,
  CourseLevelId,
  CourseLevelInfo,
};

// 21 Comprehensive Industry & Academic Courses
export const COURSES_DATA: Course[] = [
  ...PROGRAMMING_LANGUAGES_COURSES,
  ...WEB_DEVELOPMENT_COURSES,
  ...DSA_AND_TOOLS_COURSES,
  ...DATABASES_AND_INFRASTRUCTURE_COURSES,
  ...AI_AND_MACHINE_LEARNING_COURSES,
];

export function getAllCourses(): Course[] {
  return COURSES_DATA;
}

export function getCourseBySlug(slug: string): Course | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return (
    COURSES_DATA.find((c) => c.slug.toLowerCase() === normalized || c.id.toLowerCase() === normalized) ||
    COURSES_DATA.find((c) => c.aliases?.some((a) => a.toLowerCase() === normalized))
  );
}

export function getCourseById(id: string): Course | undefined {
  if (!id) return undefined;
  const normalized = id.trim().toLowerCase();
  return (
    COURSES_DATA.find((c) => c.id.toLowerCase() === normalized || c.slug.toLowerCase() === normalized) ||
    COURSES_DATA.find((c) => c.aliases?.some((a) => a.toLowerCase() === normalized))
  );
}

export const COURSE_LEVELS: Record<CourseLevelId, CourseLevelInfo> = {
  basic: {
    id: "basic",
    levelNumber: 1,
    name: "Level 1: Basic",
    badgeLabel: "Level 1: Basic",
    title: "Level 1: Basic Foundations",
    subtitle: "Core syntax, C & C++, data structures, and web development fundamentals for beginners.",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    cardBorderClass: "border-emerald-200/80 hover:border-emerald-400",
    accentBgClass: "bg-emerald-600 text-white",
    headerGradientClass: "from-emerald-50/70 via-white to-slate-50 border-emerald-200/80",
  },
  intermediate: {
    id: "intermediate",
    levelNumber: 2,
    name: "Level 2: Intermediate",
    badgeLabel: "Level 2: Intermediate",
    title: "Level 2: Intermediate Engineering",
    subtitle: "Object-oriented design, Git collaboration, backend APIs, databases, cybersecurity, and cloud engineering.",
    badgeClass: "bg-blue-50 text-[#12316B] border-blue-200",
    cardBorderClass: "border-blue-200/80 hover:border-blue-400",
    accentBgClass: "bg-[#173B70] text-white",
    headerGradientClass: "from-blue-50/70 via-white to-slate-50 border-blue-200/80",
  },
  pro: {
    id: "pro",
    levelNumber: 3,
    name: "Level 3: Pro",
    badgeLabel: "Level 3: Pro",
    title: "Level 3: Pro Architecture & AI",
    subtitle: "Enterprise full-stack architectures, AI-assisted development, machine learning, and autonomous agents.",
    badgeClass: "bg-purple-50 text-purple-800 border-purple-200",
    cardBorderClass: "border-purple-200/80 hover:border-purple-400",
    accentBgClass: "bg-purple-700 text-white",
    headerGradientClass: "from-purple-50/70 via-white to-slate-50 border-purple-200/80",
  },
};

export function getCourseLevel(courseOrDifficulty: Course | string): CourseLevelInfo {
  const diff = typeof courseOrDifficulty === "string" ? courseOrDifficulty : courseOrDifficulty.difficulty;
  if (diff === "Beginner" || diff === "Essential") {
    return COURSE_LEVELS.basic;
  }
  if (diff === "Intermediate") {
    return COURSE_LEVELS.intermediate;
  }
  return COURSE_LEVELS.pro;
}
