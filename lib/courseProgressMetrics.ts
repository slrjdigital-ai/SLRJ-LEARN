"use client";

import { useState, useEffect, useCallback } from "react";
import { Course, getCourseById } from "@/data/courses";
import { ROADMAP_STEPS } from "@/data/roadmap";
import { getStoredProgress } from "./courseProgress";
import { getAllCertificates } from "@/data/certificatesStore";
import { getRoadmapProgress } from "./roadmapProgress";

export interface CourseDetailedProgress {
  // Notes / Lessons
  notesCompleted: number;
  totalNotes: number;
  notesPercentage: number;

  // Quizzes
  quizzesCompleted: number;
  totalQuizzes: number;
  quizzesPercentage: number;

  // Coding Practice
  codeCompleted: number;
  totalCode: number;
  codePercentage: number;

  // Overall combined progress
  overallPercentage: number;
  hasStarted: boolean;
  isCompleted: boolean;
}

export const COURSE_METRICS_EVENT = "slrj_course_metrics_updated";

/**
 * Record a completed quiz for a course topic or final quiz
 */
export function recordQuizCompletion(courseIdOrSlug: string, quizId: string | number): void {
  if (typeof window === "undefined" || !courseIdOrSlug) return;
  try {
    const key = `slrj_completed_quizzes_${courseIdOrSlug.toLowerCase()}`;
    const raw = localStorage.getItem(key);
    const completed: string[] = raw ? JSON.parse(raw) : [];
    const idStr = String(quizId);
    if (!completed.includes(idStr)) {
      completed.push(idStr);
      localStorage.setItem(key, JSON.stringify(completed));
      window.dispatchEvent(
        new CustomEvent(COURSE_METRICS_EVENT, { detail: { courseId: courseIdOrSlug, type: "quiz", id: idStr } })
      );
    }
  } catch (err) {
    console.error("Failed to record quiz completion:", err);
  }
}

/**
 * Record a completed coding exercise for a course topic or capstone
 */
export function recordCodeCompletion(courseIdOrSlug: string, codeId: string | number): void {
  if (typeof window === "undefined" || !courseIdOrSlug) return;
  try {
    const key = `slrj_completed_code_${courseIdOrSlug.toLowerCase()}`;
    const raw = localStorage.getItem(key);
    const completed: string[] = raw ? JSON.parse(raw) : [];
    const idStr = String(codeId);
    if (!completed.includes(idStr)) {
      completed.push(idStr);
      localStorage.setItem(key, JSON.stringify(completed));
      window.dispatchEvent(
        new CustomEvent(COURSE_METRICS_EVENT, { detail: { courseId: courseIdOrSlug, type: "code", id: idStr } })
      );
    }
  } catch (err) {
    console.error("Failed to record code completion:", err);
  }
}

/**
 * Record a completed lesson / note
 */
export function recordLessonCompletion(courseIdOrSlug: string, lessonId: string): void {
  if (typeof window === "undefined" || !courseIdOrSlug) return;
  try {
    const key = `slrj_completed_lessons_${courseIdOrSlug.toLowerCase()}`;
    const raw = localStorage.getItem(key);
    const completed: string[] = raw ? JSON.parse(raw) : [];
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem(key, JSON.stringify(completed));
      window.dispatchEvent(
        new CustomEvent(COURSE_METRICS_EVENT, { detail: { courseId: courseIdOrSlug, type: "lesson", id: lessonId } })
      );
    }
  } catch (err) {
    console.error("Failed to record lesson completion:", err);
  }
}

/**
 * Calculate comprehensive progress across Notes, Quizzes, and Coding for a course
 */
export function getCourseDetailedProgress(course: Course): CourseDetailedProgress {
  const defaultRes: CourseDetailedProgress = {
    notesCompleted: 0,
    totalNotes: Math.max(
      1,
      course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) ||
        course.totalLessons ||
        course.pdfLessons?.length ||
        4
    ),
    notesPercentage: 0,
    quizzesCompleted: 0,
    totalQuizzes: (course.modules?.length || 3) + 1,
    quizzesPercentage: 0,
    codeCompleted: 0,
    totalCode: (course.modules?.length || 3) + 1,
    codePercentage: 0,
    overallPercentage: 0,
    hasStarted: false,
    isCompleted: false,
  };

  if (typeof window === "undefined" || !course) return defaultRes;

  try {
    const idLower = course.id.toLowerCase();
    const slugLower = course.slug.toLowerCase();

    // 1. NOTES / LESSONS:
    const totalNotes = defaultRes.totalNotes;
    const completedLessonSet = new Set<string>();

    // From slrj_completed_lessons_{id/slug}
    [idLower, slugLower].forEach((k) => {
      const raw = localStorage.getItem(`slrj_completed_lessons_${k}`);
      if (raw) {
        try {
          const arr: string[] = JSON.parse(raw);
          arr.forEach((item) => completedLessonSet.add(item));
        } catch {}
      }
    });

    // From general progress store (completedPdfLessonIds)
    const storedProg = getStoredProgress();
    const prog = storedProg[course.id] || storedProg[course.slug];
    if (prog?.completedPdfLessonIds) {
      prog.completedPdfLessonIds.forEach((item) => completedLessonSet.add(item));
    }

    const notesCompleted = Math.min(totalNotes, completedLessonSet.size);
    const notesPercentage = Math.round((notesCompleted / totalNotes) * 100);

    // 2. QUIZZES:
    const totalQuizzes = defaultRes.totalQuizzes;
    const completedQuizSet = new Set<string>();

    [idLower, slugLower].forEach((k) => {
      const raw = localStorage.getItem(`slrj_completed_quizzes_${k}`);
      if (raw) {
        try {
          const arr: string[] = JSON.parse(raw);
          arr.forEach((item) => completedQuizSet.add(item));
        } catch {}
      }
    });

    const quizzesCompleted = Math.min(totalQuizzes, completedQuizSet.size);
    const quizzesPercentage = Math.round((quizzesCompleted / totalQuizzes) * 100);

    // 3. CODING:
    const totalCode = defaultRes.totalCode;
    const completedCodeSet = new Set<string>();

    [idLower, slugLower].forEach((k) => {
      const raw = localStorage.getItem(`slrj_completed_code_${k}`);
      if (raw) {
        try {
          const arr: string[] = JSON.parse(raw);
          arr.forEach((item) => completedCodeSet.add(item));
        } catch {}
      }
    });

    const codeCompleted = Math.min(totalCode, completedCodeSet.size);
    const codePercentage = Math.round((codeCompleted / totalCode) * 100);

    // 4. CERTIFICATE CHECK: If certificate is already earned, full 100%
    const certs = getAllCertificates();
    const hasCert = certs.some(
      (c) =>
        (c.sourceId?.toLowerCase() === idLower ||
          c.sourceId?.toLowerCase() === slugLower ||
          c.courseId?.toLowerCase() === idLower ||
          c.courseId?.toLowerCase() === slugLower) &&
        (c.status === "valid" || (c.status as any) === "Valid")
    );

    if (hasCert) {
      return {
        notesCompleted: totalNotes,
        totalNotes,
        notesPercentage: 100,
        quizzesCompleted: totalQuizzes,
        totalQuizzes,
        quizzesPercentage: 100,
        codeCompleted: totalCode,
        totalCode,
        codePercentage: 100,
        overallPercentage: 100,
        hasStarted: true,
        isCompleted: true,
      };
    }

    // 5. COMBINED WEIGHTED CALCULATION
    const totalItems = totalNotes + totalQuizzes + totalCode;
    const totalDone = notesCompleted + quizzesCompleted + codeCompleted;
    let overallPercentage = Math.round((totalDone / totalItems) * 100);

    // Honor legacy course progress if it's higher
    if (prog && prog.progressPercentage > overallPercentage) {
      overallPercentage = prog.progressPercentage;
    }

    overallPercentage = Math.min(100, Math.max(0, overallPercentage));
    const hasStarted = totalDone > 0 || overallPercentage > 0;
    const isCompleted = overallPercentage >= 100;

    return {
      notesCompleted,
      totalNotes,
      notesPercentage,
      quizzesCompleted,
      totalQuizzes,
      quizzesPercentage,
      codeCompleted,
      totalCode,
      codePercentage,
      overallPercentage,
      hasStarted,
      isCompleted,
    };
  } catch (err) {
    console.error("Error in getCourseDetailedProgress:", err);
    return defaultRes;
  }
}

/**
 * React hook to listen for progress updates and provide live metrics
 */
export function useCourseDetailedProgress(course: Course): CourseDetailedProgress {
  const [metrics, setMetrics] = useState<CourseDetailedProgress>(() => getCourseDetailedProgress(course));

  const refresh = useCallback(() => {
    setMetrics(getCourseDetailedProgress(course));
  }, [course]);

  useEffect(() => {
    refresh();

    const handleUpdate = () => refresh();
    window.addEventListener(COURSE_METRICS_EVENT, handleUpdate);
    window.addEventListener("slrj_course_progress_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(COURSE_METRICS_EVENT, handleUpdate);
      window.removeEventListener("slrj_course_progress_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refresh]);

  return metrics;
}

export interface RoadmapDetailedProgress {
  trackId: string;
  totalCourses: number;
  completedCourses: number;

  totalTopics: number;
  completedTopics: number;

  totalNotes: number;
  completedNotes: number;

  totalQuizzes: number;
  completedQuizzes: number;

  totalCode: number;
  completedCode: number;

  overallPercentage: number;
  hasStarted: boolean;
  isCompleted: boolean;
}

/**
 * Calculate detailed progress across all inside topics/courses for a career roadmap
 */
export function getRoadmapDetailedProgress(trackId: string, isSSR: boolean = false): RoadmapDetailedProgress {
  const steps = ROADMAP_STEPS.filter((s) => s.trackId === trackId);
  const totalCourses = Math.max(1, steps.length);

  const emptyRes: RoadmapDetailedProgress = {
    trackId,
    totalCourses,
    completedCourses: 0,
    totalTopics: 0,
    completedTopics: 0,
    totalNotes: 0,
    completedNotes: 0,
    totalQuizzes: 0,
    completedQuizzes: 0,
    totalCode: 0,
    completedCode: 0,
    overallPercentage: 0,
    hasStarted: false,
    isCompleted: false,
  };

  if (steps.length === 0) return emptyRes;

  try {
    const isClient = !isSSR && typeof window !== "undefined";
    const roadmapProg = isClient ? getRoadmapProgress(trackId) : null;
    const completedStageIds = new Set(roadmapProg?.completedStageIds?.map(String) || []);

    let sumTotalNotes = 0;
    let sumCompletedNotes = 0;
    let sumTotalQuizzes = 0;
    let sumCompletedQuizzes = 0;
    let sumTotalCode = 0;
    let sumCompletedCode = 0;
    let sumTotalTopics = 0;
    let sumCompletedTopics = 0;
    let completedCourses = 0;

    steps.forEach((step) => {
      const courseId = step.requiredCourseIds?.[0];
      const course = courseId ? getCourseById(courseId) : null;
      const modCount = Math.max(1, course?.modules?.length || 4);
      const isStageExplicitlyDone = isClient && completedStageIds.has(String(step.id));

      if (course) {
        const cp = getCourseDetailedProgress(course);
        sumTotalNotes += cp.totalNotes;
        sumTotalQuizzes += cp.totalQuizzes;
        sumTotalCode += cp.totalCode;
        sumTotalTopics += modCount;

        if (isStageExplicitlyDone) {
          completedCourses++;
          sumCompletedTopics += modCount;
          sumCompletedNotes += cp.totalNotes;
          sumCompletedQuizzes += cp.totalQuizzes;
          sumCompletedCode += cp.totalCode;
        } else if (isClient) {
          sumCompletedNotes += cp.notesCompleted;
          sumCompletedQuizzes += cp.quizzesCompleted;
          sumCompletedCode += cp.codeCompleted;

          const topicsDoneInCourse = Math.min(
            modCount,
            Math.round((cp.overallPercentage / 100) * modCount)
          );
          sumCompletedTopics += topicsDoneInCourse;

          if (cp.overallPercentage >= 80 || cp.isCompleted) {
            completedCourses++;
          }
        }
      } else {
        sumTotalTopics += 4;
        sumTotalNotes += 6;
        sumTotalQuizzes += 2;
        sumTotalCode += 2;
        if (isStageExplicitlyDone) {
          completedCourses++;
          sumCompletedTopics += 4;
          sumCompletedNotes += 6;
          sumCompletedQuizzes += 2;
          sumCompletedCode += 2;
        }
      }
    });

    // Check certificate for this track (client only)
    if (isClient) {
      const certs = getAllCertificates();
      const hasCert = certs.some(
        (c) =>
          (c.sourceId?.toLowerCase() === trackId.toLowerCase() ||
            (c as any).trackId?.toLowerCase() === trackId.toLowerCase()) &&
          (c.status === "valid" || (c.status as any) === "Valid")
      );

      if (hasCert) {
        return {
          trackId,
          totalCourses,
          completedCourses: totalCourses,
          totalTopics: sumTotalTopics,
          completedTopics: sumTotalTopics,
          totalNotes: sumTotalNotes,
          completedNotes: sumTotalNotes,
          totalQuizzes: sumTotalQuizzes,
          completedQuizzes: sumTotalQuizzes,
          totalCode: sumTotalCode,
          completedCode: sumTotalCode,
          overallPercentage: 100,
          hasStarted: true,
          isCompleted: true,
        };
      }
    }

    // Proportional calculation across all inside topics/activities
    const totalItems = sumTotalNotes + sumTotalQuizzes + sumTotalCode;
    const totalDone = sumCompletedNotes + sumCompletedQuizzes + sumCompletedCode;

    let topicPercentage = totalItems > 0 ? Math.round((totalDone / totalItems) * 100) : 0;
    const coursePercentage = Math.round((completedCourses / totalCourses) * 100);
    let overallPercentage = Math.max(topicPercentage, coursePercentage);
    overallPercentage = Math.min(100, Math.max(0, overallPercentage));

    const hasStarted = totalDone > 0 || overallPercentage > 0 || completedCourses > 0;
    const isCompleted = overallPercentage >= 100;

    return {
      trackId,
      totalCourses,
      completedCourses,
      totalTopics: sumTotalTopics,
      completedTopics: sumCompletedTopics,
      totalNotes: sumTotalNotes,
      completedNotes: sumCompletedNotes,
      totalQuizzes: sumTotalQuizzes,
      completedQuizzes: sumCompletedQuizzes,
      totalCode: sumTotalCode,
      completedCode: sumCompletedCode,
      overallPercentage,
      hasStarted,
      isCompleted,
    };
  } catch (err) {
    console.error("Error in getRoadmapDetailedProgress:", err);
    return emptyRes;
  }
}

/**
 * React hook for live roadmap progress tracking across inside topics
 */
export function useRoadmapDetailedProgress(trackId: string): RoadmapDetailedProgress {
  const [metrics, setMetrics] = useState<RoadmapDetailedProgress>(() =>
    getRoadmapDetailedProgress(trackId, true)
  );

  const refresh = useCallback(() => {
    setMetrics(getRoadmapDetailedProgress(trackId, false));
  }, [trackId]);

  useEffect(() => {
    refresh();

    const handleUpdate = () => refresh();
    window.addEventListener(COURSE_METRICS_EVENT, handleUpdate);
    window.addEventListener("slrj_course_progress_updated", handleUpdate);
    window.addEventListener("slrj_roadmap_progress_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(COURSE_METRICS_EVENT, handleUpdate);
      window.removeEventListener("slrj_course_progress_updated", handleUpdate);
      window.removeEventListener("slrj_roadmap_progress_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refresh]);

  return metrics;
}

