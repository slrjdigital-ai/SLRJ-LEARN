"use client";

import { useState, useEffect, useCallback } from "react";
import { Course, PdfLesson } from "@/data/courses";

export interface LearnerCourseProgress {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  category: string;
  thumbnailUrl?: string;
  currentLessonId?: string;
  currentLessonTitle?: string;
  completedPdfLessonIds: string[];
  totalPdfLessons: number;
  progressPercentage: number;
  lastAccessedAt: string;
}

const STORAGE_KEY = "slrj_learner_course_progress_v1";
const PROGRESS_EVENT = "slrj_course_progress_updated";

export function getStoredProgress(): Record<string, LearnerCourseProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, LearnerCourseProgress>;
  } catch (err) {
    console.error("Failed to parse learner course progress:", err);
    return {};
  }
}

export function saveStoredProgress(data: Record<string, LearnerCourseProgress>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: data }));
  } catch (err) {
    console.error("Failed to save learner course progress:", err);
  }
}

export function getCourseProgress(courseId: string): LearnerCourseProgress | null {
  const all = getStoredProgress();
  return all[courseId] || null;
}

export function recordCourseAccess(
  course: Course,
  lessonId?: string,
  lessonTitle?: string
): LearnerCourseProgress {
  const all = getStoredProgress();
  const existing = all[course.id];
  const totalPdfs = course.pdfLessons?.length || 1;
  const completed = existing?.completedPdfLessonIds || [];

  const firstLesson = course.pdfLessons?.[0];
  const activeLessonId = lessonId || existing?.currentLessonId || firstLesson?.id || "lesson-1";
  const activeLessonTitle =
    lessonTitle ||
    existing?.currentLessonTitle ||
    firstLesson?.title ||
    "Lesson 1";

  const updated: LearnerCourseProgress = {
    courseId: course.id,
    courseTitle: course.title,
    courseSlug: course.slug,
    category: course.category,
    thumbnailUrl: course.thumbnailUrl,
    currentLessonId: activeLessonId,
    currentLessonTitle: activeLessonTitle,
    completedPdfLessonIds: completed,
    totalPdfLessons: totalPdfs,
    progressPercentage: Math.round((completed.length / totalPdfs) * 100),
    lastAccessedAt: new Date().toISOString(),
  };

  all[course.id] = updated;
  saveStoredProgress(all);
  return updated;
}

export function togglePdfLessonCompletion(
  course: Course,
  lessonId: string
): { updatedProgress: LearnerCourseProgress; isNowComplete: boolean } {
  const all = getStoredProgress();
  const existing = all[course.id];
  const totalPdfs = course.pdfLessons?.length || 1;
  let completed = existing ? [...existing.completedPdfLessonIds] : [];

  const isAlreadyDone = completed.includes(lessonId);
  if (isAlreadyDone) {
    completed = completed.filter((id) => id !== lessonId);
  } else {
    completed.push(lessonId);
  }

  const lesson = course.pdfLessons?.find((l) => l.id === lessonId);
  const updated: LearnerCourseProgress = {
    courseId: course.id,
    courseTitle: course.title,
    courseSlug: course.slug,
    category: course.category,
    thumbnailUrl: course.thumbnailUrl,
    currentLessonId: lessonId,
    currentLessonTitle: lesson?.title || existing?.currentLessonTitle || "Lesson",
    completedPdfLessonIds: completed,
    totalPdfLessons: totalPdfs,
    progressPercentage: Math.round((completed.length / totalPdfs) * 100),
    lastAccessedAt: new Date().toISOString(),
  };

  all[course.id] = updated;
  saveStoredProgress(all);

  return {
    updatedProgress: updated,
    isNowComplete: !isAlreadyDone,
  };
}

export function useCourseProgress() {
  const [progressMap, setProgressMap] = useState<Record<string, LearnerCourseProgress>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgressMap(getStoredProgress());
    setIsLoaded(true);

    const handleUpdate = () => {
      setProgressMap(getStoredProgress());
    };

    window.addEventListener(PROGRESS_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const getProgress = useCallback(
    (courseId: string) => progressMap[courseId] || null,
    [progressMap]
  );

  const activeCourses = Object.values(progressMap).filter(
    (p) => p && (p.completedPdfLessonIds.length > 0 || p.progressPercentage > 0)
  );

  return {
    isLoaded,
    progressMap,
    allProgress: progressMap,
    getProgress,
    activeCourses,
    recordAccess: recordCourseAccess,
    toggleCompletion: togglePdfLessonCompletion,
  };
}
