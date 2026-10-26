import { Course, getAllCourses, getCourseById } from "@/data/courses";
import { LearnerCourseProgress, getStoredProgress } from "./courseProgress";

export type CourseStatusType = "completed" | "in_progress" | "available" | "locked";

export interface CourseDependencyInfo {
  status: CourseStatusType;
  isUnlocked: boolean;
  completionPercentage: number;
  missingPrerequisites: Course[];
  unlockReason?: string;
  nextStepPrompt?: string;
}

/**
 * Calculates dynamic prerequisite and lock status for a course.
 * Rule: A course is unlocked if all its required prerequisite courses
 * have been completed (or if it has no prerequisites).
 * In Level 2, completing Level 1 foundation courses is strongly guided.
 */
export function getCourseDependencyInfo(
  course: Course,
  progressMap?: Record<string, LearnerCourseProgress>
): CourseDependencyInfo {
  const allProgress = progressMap || getStoredProgress();
  const courseProgress = allProgress[course.id] || allProgress[course.slug];

  const currentPercent = courseProgress?.progressPercentage || 0;
  const isSelfCompleted = currentPercent >= 100;
  const isSelfInProgress = currentPercent > 0 && currentPercent < 100;

  // 1. If user already finished this course, it is completed
  if (isSelfCompleted) {
    return {
      status: "completed",
      isUnlocked: true,
      completionPercentage: 100,
      missingPrerequisites: [],
      nextStepPrompt: "Course completed! Ready for advanced topics or final assessment.",
    };
  }

  // 2. Check prerequisites
  const prereqIds = course.prerequisiteCourseIds || [];
  const missingPrerequisites: Course[] = [];

  for (const pId of prereqIds) {
    const pCourse = getCourseById(pId);
    if (!pCourse) continue;

    const pProg = allProgress[pCourse.id] || allProgress[pCourse.slug];
    const isPrereqDone = (pProg?.progressPercentage || 0) >= 80; // 80%+ counts as proficient
    if (!isPrereqDone) {
      missingPrerequisites.push(pCourse);
    }
  }

  // If there are missing prerequisites
  if (missingPrerequisites.length > 0) {
    const missingNames = missingPrerequisites.map((c) => c.title).join(", ");
    return {
      status: isSelfInProgress ? "in_progress" : "locked",
      isUnlocked: isSelfInProgress, // If already started before, allow continuation
      completionPercentage: currentPercent,
      missingPrerequisites,
      unlockReason: `Requires completing: ${missingNames}`,
      nextStepPrompt: `Complete ${missingPrerequisites[0].title} first for the best learning sequence.`,
    };
  }

  // If prerequisites are satisfied
  if (isSelfInProgress) {
    return {
      status: "in_progress",
      isUnlocked: true,
      completionPercentage: currentPercent,
      missingPrerequisites: [],
      nextStepPrompt: `Continue ${courseProgress.currentLessonTitle || "next lesson"}`,
    };
  }

  return {
    status: "available",
    isUnlocked: true,
    completionPercentage: 0,
    missingPrerequisites: [],
    nextStepPrompt: "Ready to start! Begin chapter 1.",
  };
}

/**
 * Returns overall statistics and milestones for Level 1, Level 2, and Level 3
 */
export function getLevelProgressionStats(
  courses: Course[],
  progressMap?: Record<string, LearnerCourseProgress>
) {
  const allProgress = progressMap || getStoredProgress();

  const level1Courses = courses.filter((c) => c.levelNumber === 1);
  const level2Courses = courses.filter((c) => c.levelNumber === 2);
  const level3Courses = courses.filter((c) => c.levelNumber === 3);

  const calcCompleted = (list: Course[]) =>
    list.filter((c) => {
      const p = allProgress[c.id] || allProgress[c.slug];
      return (p?.progressPercentage || 0) >= 80;
    }).length;

  const l1Completed = calcCompleted(level1Courses);
  const l2Completed = calcCompleted(level2Courses);
  const l3Completed = calcCompleted(level3Courses);

  // Level 1: Foundation
  const l1Percent = level1Courses.length > 0 ? Math.round((l1Completed / level1Courses.length) * 100) : 0;
  // Level 2: Unlocks when user has completed at least 3 core foundation courses
  const isLevel2Unlocked = l1Completed >= 3 || l2Completed > 0;
  const l2Percent = level2Courses.length > 0 ? Math.round((l2Completed / level2Courses.length) * 100) : 0;
  // Level 3: Unlocks when user has completed at least 4 intermediate courses
  const isLevel3Unlocked = (isLevel2Unlocked && l2Completed >= 4) || l3Completed > 0;
  const l3Percent = level3Courses.length > 0 ? Math.round((l3Completed / level3Courses.length) * 100) : 0;

  // Determine current active level
  let currentLevelNumber: 1 | 2 | 3 = 1;
  if (isLevel3Unlocked && l2Completed >= 6) {
    currentLevelNumber = 3;
  } else if (isLevel2Unlocked) {
    currentLevelNumber = 2;
  }

  return {
    currentLevelNumber,
    level1: {
      name: "Level 1: Foundation",
      subtitle: "Build strong fundamentals before moving to advanced engineering.",
      totalCourses: level1Courses.length,
      completedCount: l1Completed,
      progressPercentage: l1Percent,
      isUnlocked: true,
    },
    level2: {
      name: "Level 2: Intermediate",
      subtitle: "Develop real applications, master frameworks, and build practical projects.",
      totalCourses: level2Courses.length,
      completedCount: l2Completed,
      progressPercentage: l2Percent,
      isUnlocked: isLevel2Unlocked,
      unlockCriteria: "Complete at least 3 Foundation courses in Level 1",
    },
    level3: {
      name: "Level 3: Professional & Specializations",
      subtitle: "Specialize in AI/ML, Data Science, Mobile, Cloud/DevOps, Security, or Web3.",
      totalCourses: level3Courses.length,
      completedCount: l3Completed,
      progressPercentage: l3Percent,
      isUnlocked: isLevel3Unlocked,
      unlockCriteria: "Complete at least 4 Intermediate courses in Level 2",
    },
  };
}

/**
 * Finds the learner's recommended next course in their active path
 */
export function getRecommendedNextCourse(
  courses: Course[],
  progressMap?: Record<string, LearnerCourseProgress>,
  preferredTrackId?: string
): Course | null {
  const allProgress = progressMap || getStoredProgress();

  // 1. Look for a course currently in progress
  for (const c of courses) {
    const p = allProgress[c.id] || allProgress[c.slug];
    if (p && p.progressPercentage > 0 && p.progressPercentage < 100) {
      return c;
    }
  }

  // 2. If a preferred track is chosen (e.g. for Level 3 specializations)
  if (preferredTrackId) {
    const trackCourses = courses.filter((c) => c.trackId === preferredTrackId);
    for (const c of trackCourses) {
      const info = getCourseDependencyInfo(c, allProgress);
      if (info.status === "available") return c;
    }
  }

  // 3. Otherwise find the first available unlocked course by sequential levelOrder
  const sorted = [...courses].sort((a, b) => {
    const lvlDiff = (a.levelNumber || 1) - (b.levelNumber || 1);
    if (lvlDiff !== 0) return lvlDiff;
    return (a.levelOrder || 0) - (b.levelOrder || 0);
  });

  for (const c of sorted) {
    const p = allProgress[c.id] || allProgress[c.slug];
    if ((p?.progressPercentage || 0) >= 80) continue; // Skip completed
    const info = getCourseDependencyInfo(c, allProgress);
    if (info.isUnlocked) {
      return c;
    }
  }

  return courses[0] || null;
}
