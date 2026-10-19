"use client";

import { useState, useEffect, useCallback } from "react";

export interface LearnerRoadmapProgress {
  roadmapId: string;
  status: "not_started" | "in_progress" | "completed";
  currentStageId: number | string;
  completedStageIds: (number | string)[];
  completedTaskIds: string[];
  isSaved?: boolean;
  startedAt?: string;
  lastAccessedAt: string;
  completedAt?: string;
}

const STORAGE_KEY = "slrj_learner_roadmap_progress_v2";
const PROGRESS_EVENT = "slrj_roadmap_progress_updated";

export function getStoredRoadmapProgress(): Record<string, LearnerRoadmapProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, LearnerRoadmapProgress>;
  } catch (err) {
    console.error("Failed to parse learner roadmap progress:", err);
    return {};
  }
}

export function saveStoredRoadmapProgress(data: Record<string, LearnerRoadmapProgress>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: data }));
  } catch (err) {
    console.error("Failed to save learner roadmap progress:", err);
  }
}

export function getRoadmapProgress(roadmapId: string): LearnerRoadmapProgress | null {
  const all = getStoredRoadmapProgress();
  return all[roadmapId] || null;
}

export function startOrContinueRoadmap(
  roadmapId: string,
  initialStageId: number | string = 1
): LearnerRoadmapProgress {
  const all = getStoredRoadmapProgress();
  const existing = all[roadmapId];

  const updated: LearnerRoadmapProgress = {
    roadmapId,
    status: existing?.status === "completed" ? "completed" : "in_progress",
    currentStageId: existing?.currentStageId || initialStageId,
    completedStageIds: existing?.completedStageIds || [],
    completedTaskIds: existing?.completedTaskIds || [],
    isSaved: existing?.isSaved ?? true,
    startedAt: existing?.startedAt || new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
  };

  all[roadmapId] = updated;
  saveStoredRoadmapProgress(all);
  return updated;
}

export function toggleRoadmapSave(roadmapId: string): boolean {
  const all = getStoredRoadmapProgress();
  const existing = all[roadmapId];

  const isSavedNow = !(existing?.isSaved ?? false);
  const updated: LearnerRoadmapProgress = {
    roadmapId,
    status: existing?.status || "not_started",
    currentStageId: existing?.currentStageId || 1,
    completedStageIds: existing?.completedStageIds || [],
    completedTaskIds: existing?.completedTaskIds || [],
    isSaved: isSavedNow,
    lastAccessedAt: new Date().toISOString(),
    startedAt: existing?.startedAt,
  };

  all[roadmapId] = updated;
  saveStoredRoadmapProgress(all);
  return isSavedNow;
}

export function toggleRoadmapStageCompletion(
  roadmapId: string,
  stageId: number | string,
  totalStages: number
): { updatedProgress: LearnerRoadmapProgress; isCompletedNow: boolean } {
  const all = getStoredRoadmapProgress();
  const existing = all[roadmapId];

  let completed = existing ? [...existing.completedStageIds] : [];
  const isAlreadyDone = completed.some((id) => String(id) === String(stageId));

  if (isAlreadyDone) {
    completed = completed.filter((id) => String(id) !== String(stageId));
  } else {
    completed.push(stageId);
  }

  const isFullyFinished = totalStages > 0 && completed.length >= totalStages;

  const updated: LearnerRoadmapProgress = {
    roadmapId,
    status: isFullyFinished ? "completed" : completed.length > 0 ? "in_progress" : "not_started",
    currentStageId: stageId,
    completedStageIds: completed,
    completedTaskIds: existing?.completedTaskIds || [],
    isSaved: existing?.isSaved ?? true,
    startedAt: existing?.startedAt || new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
    completedAt: isFullyFinished ? new Date().toISOString() : undefined,
  };

  all[roadmapId] = updated;
  saveStoredRoadmapProgress(all);

  return {
    updatedProgress: updated,
    isCompletedNow: !isAlreadyDone,
  };
}

export function useRoadmapProgress() {
  const [progressMap, setProgressMap] = useState<Record<string, LearnerRoadmapProgress>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgressMap(getStoredRoadmapProgress());
    setIsLoaded(true);

    const handleUpdate = () => {
      setProgressMap(getStoredRoadmapProgress());
    };

    window.addEventListener(PROGRESS_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const getProgress = useCallback(
    (roadmapId: string) => progressMap[roadmapId] || null,
    [progressMap]
  );

  const activeRoadmaps = Object.values(progressMap).filter(
    (p) => p && (p.status === "in_progress" || p.status === "completed" || p.isSaved || p.completedStageIds.length > 0)
  );

  return {
    isLoaded,
    progressMap,
    getProgress,
    activeRoadmaps,
    startOrContinue: startOrContinueRoadmap,
    toggleStage: toggleRoadmapStageCompletion,
    toggleSave: toggleRoadmapSave,
  };
}
