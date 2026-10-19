"use client";

import { useState, useEffect, useCallback } from "react";
import { PracticalProject, getAllPracticalProjects, getPracticalProjectById } from "@/data/projectsData";

export type ProjectStatus = "Saved" | "Not Started" | "In Progress" | "Submitted" | "Completed" | "Archived";

export interface ProjectSubmission {
  repositoryUrl: string;
  liveDemoUrl?: string;
  description: string;
  screenshots?: string[];
  submittedAt: string;
  reviewStatus: "Under Review" | "Approved" | "Needs Revision";
  feedback?: string;
}

export interface LearnerProjectRecord {
  projectId: string;
  status: ProjectStatus;
  completedTaskIds: string[];
  currentMilestoneId?: string;
  savedAt: string;
  startedAt?: string;
  updatedAt: string;
  submittedAt?: string;
  completedAt?: string;
  submission?: ProjectSubmission;
}

export interface LearnerPortfolio {
  slug: string;
  displayName: string;
  headline: string;
  bio: string;
  skills: string[];
  careerInterests: string[];
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl?: string;
  selectedProjectIds: string[];
  isPublished: boolean;
  publishedAt?: string;
  updatedAt: string;
}

const PROJECTS_STORAGE_KEY = "slrj_learner_projects_v2";
const PORTFOLIO_STORAGE_KEY = "slrj_learner_portfolio_v2";
const PROJECT_EVENT = "slrj_project_progress_updated";
const PORTFOLIO_EVENT = "slrj_portfolio_updated";

// ── Project Storage Functions ──

export function getStoredProjectRecords(): Record<string, LearnerProjectRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, LearnerProjectRecord>;
  } catch (err) {
    console.error("Failed to parse learner projects:", err);
    return {};
  }
}

export function saveStoredProjectRecords(data: Record<string, LearnerProjectRecord>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: data }));
  } catch (err) {
    console.error("Failed to save learner projects:", err);
  }
}

export function startOrContinueProject(projectId: string): LearnerProjectRecord {
  const all = getStoredProjectRecords();
  const existing = all[projectId];

  const updated: LearnerProjectRecord = {
    projectId,
    status: existing?.status === "Completed" || existing?.status === "Submitted" ? existing.status : "In Progress",
    completedTaskIds: existing?.completedTaskIds || [],
    currentMilestoneId: existing?.currentMilestoneId,
    savedAt: existing?.savedAt || new Date().toISOString(),
    startedAt: existing?.startedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    submittedAt: existing?.submittedAt,
    completedAt: existing?.completedAt,
    submission: existing?.submission,
  };

  all[projectId] = updated;
  saveStoredProjectRecords(all);
  return updated;
}

export function saveProject(projectId: string): boolean {
  const all = getStoredProjectRecords();
  const existing = all[projectId];

  if (existing) {
    const isSaved = existing.status === "Saved";
    existing.status = isSaved ? "Not Started" : "Saved";
    existing.updatedAt = new Date().toISOString();
    all[projectId] = existing;
    saveStoredProjectRecords(all);
    return !isSaved;
  } else {
    all[projectId] = {
      projectId,
      status: "Saved",
      completedTaskIds: [],
      savedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveStoredProjectRecords(all);
    return true;
  }
}

export function toggleProjectTaskCompletion(
  projectId: string,
  taskId: string,
  totalTasksCount: number
): { record: LearnerProjectRecord; isDoneNow: boolean } {
  const all = getStoredProjectRecords();
  const existing = all[projectId] || {
    projectId,
    status: "In Progress" as ProjectStatus,
    completedTaskIds: [],
    savedAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  let tasks = [...existing.completedTaskIds];
  const isAlreadyDone = tasks.includes(taskId);

  if (isAlreadyDone) {
    tasks = tasks.filter((id) => id !== taskId);
  } else {
    tasks.push(taskId);
  }

  const isAllComplete = totalTasksCount > 0 && tasks.length >= totalTasksCount;
  const newStatus: ProjectStatus = isAllComplete
    ? "Completed"
    : existing.status === "Submitted"
    ? "Submitted"
    : tasks.length > 0
    ? "In Progress"
    : existing.status;

  const updated: LearnerProjectRecord = {
    ...existing,
    completedTaskIds: tasks,
    status: newStatus,
    updatedAt: new Date().toISOString(),
    completedAt: isAllComplete ? (existing.completedAt || new Date().toISOString()) : undefined,
  };

  all[projectId] = updated;
  saveStoredProjectRecords(all);

  return { record: updated, isDoneNow: !isAlreadyDone };
}

export function submitProjectDeliverables(
  projectId: string,
  submissionData: { repositoryUrl: string; liveDemoUrl?: string; description: string }
): LearnerProjectRecord {
  const all = getStoredProjectRecords();
  const existing = all[projectId] || {
    projectId,
    status: "In Progress" as ProjectStatus,
    completedTaskIds: [],
    savedAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const submission: ProjectSubmission = {
    repositoryUrl: submissionData.repositoryUrl.trim(),
    liveDemoUrl: submissionData.liveDemoUrl?.trim(),
    description: submissionData.description.trim(),
    submittedAt: new Date().toISOString(),
    reviewStatus: "Under Review",
  };

  const updated: LearnerProjectRecord = {
    ...existing,
    status: "Submitted",
    submission,
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  all[projectId] = updated;
  saveStoredProjectRecords(all);
  return updated;
}

export function completeProjectRecord(projectId: string): LearnerProjectRecord {
  const all = getStoredProjectRecords();
  const existing = all[projectId] || {
    projectId,
    status: "In Progress" as ProjectStatus,
    completedTaskIds: [],
    savedAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated: LearnerProjectRecord = {
    ...existing,
    status: "Completed",
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  all[projectId] = updated;
  saveStoredProjectRecords(all);
  return updated;
}

export function archiveProjectRecord(projectId: string): LearnerProjectRecord {
  const all = getStoredProjectRecords();
  const existing = all[projectId] || {
    projectId,
    status: "In Progress" as ProjectStatus,
    completedTaskIds: [],
    savedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated: LearnerProjectRecord = {
    ...existing,
    status: "Archived",
    updatedAt: new Date().toISOString(),
  };

  all[projectId] = updated;
  saveStoredProjectRecords(all);
  return updated;
}

// ── Portfolio Storage Functions ──

export const DEFAULT_PORTFOLIO: LearnerPortfolio = {
  slug: "learner-portfolio",
  displayName: "Kouluri Shahid",
  headline: "Full-Stack Software Engineer & Creative Problem Solver",
  bio: "Passionate developer building responsive web applications, robust REST APIs, and scalable distributed systems. Completed practical engineering projects on SLRJ Learn.",
  skills: ["HTML5 & CSS3", "JavaScript (ES6+)", "React 19 & Next.js", "Node.js & Express", "PostgreSQL", "Git & CI/CD"],
  careerInterests: ["Full-Stack Development", "Frontend Engineering", "Cloud Infrastructure"],
  githubUrl: "https://github.com/slrjdigital-ai",
  linkedinUrl: "https://linkedin.com",
  websiteUrl: "",
  selectedProjectIds: ["proj-portfolio", "proj-task-manager"],
  isPublished: true,
  publishedAt: "2026-10-15T00:00:00.000Z",
  updatedAt: "2026-10-16T00:00:00.000Z",
};

export function getStoredPortfolio(): LearnerPortfolio {
  if (typeof window === "undefined") return DEFAULT_PORTFOLIO;
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO;
    return JSON.parse(raw) as LearnerPortfolio;
  } catch (err) {
    console.error("Failed to parse learner portfolio:", err);
    return DEFAULT_PORTFOLIO;
  }
}

export function saveStoredPortfolio(portfolio: LearnerPortfolio): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
    window.dispatchEvent(new CustomEvent(PORTFOLIO_EVENT, { detail: portfolio }));
  } catch (err) {
    console.error("Failed to save learner portfolio:", err);
  }
}

// ── Custom React Hooks ──

export function useProjectProgress() {
  const [projectMap, setProjectMap] = useState<Record<string, LearnerProjectRecord>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProjectMap(getStoredProjectRecords());
    setIsLoaded(true);

    const handleUpdate = () => {
      setProjectMap(getStoredProjectRecords());
    };

    window.addEventListener(PROJECT_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(PROJECT_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const getRecord = useCallback((projectId: string) => projectMap[projectId] || null, [projectMap]);

  const activeProjects = Object.values(projectMap).filter(
    (p) => p && (p.status === "In Progress" || p.status === "Submitted" || p.status === "Completed" || p.completedTaskIds.length > 0)
  );

  const completedProjects = Object.values(projectMap).filter((p) => p && p.status === "Completed");

  return {
    isLoaded,
    projectMap,
    getRecord,
    activeProjects,
    completedProjects,
    startOrContinue: startOrContinueProject,
    toggleSave: saveProject,
    toggleTask: toggleProjectTaskCompletion,
    submitDeliverables: submitProjectDeliverables,
    markComplete: completeProjectRecord,
    archiveProject: archiveProjectRecord,
  };
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<LearnerPortfolio>(DEFAULT_PORTFOLIO);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPortfolio(getStoredPortfolio());
    setIsLoaded(true);

    const handleUpdate = () => {
      setPortfolio(getStoredPortfolio());
    };

    window.addEventListener(PORTFOLIO_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(PORTFOLIO_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updatePortfolio = (updates: Partial<LearnerPortfolio>) => {
    const updated = {
      ...portfolio,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setPortfolio(updated);
    saveStoredPortfolio(updated);
  };

  const toggleProjectSelection = (projectId: string) => {
    const current = portfolio.selectedProjectIds || [];
    const isSelected = current.includes(projectId);
    const updatedIds = isSelected ? current.filter((id) => id !== projectId) : [...current, projectId];
    updatePortfolio({ selectedProjectIds: updatedIds });
  };

  const publishPortfolio = (slug?: string) => {
    updatePortfolio({
      slug: slug || portfolio.slug,
      isPublished: true,
      publishedAt: portfolio.publishedAt || new Date().toISOString(),
    });
  };

  const unpublishPortfolio = () => {
    updatePortfolio({ isPublished: false });
  };

  return {
    isLoaded,
    portfolio,
    updatePortfolio,
    toggleProjectSelection,
    publishPortfolio,
    unpublishPortfolio,
  };
}
