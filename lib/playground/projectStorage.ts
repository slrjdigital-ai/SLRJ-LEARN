"use client";

import { PlaygroundLanguage } from "./types";

export interface SavedProject {
  id: string;
  name: string;
  language: PlaygroundLanguage;
  files: Record<string, string>;
  activeFile: string;
  createdAt: string;
  updatedAt: string;
  isTemplate?: boolean;
}

const STORAGE_KEY = "slrj_playground_projects_v2";
const AUTOSAVE_PREFIX = "slrj_playground_autosave_";
const PROJECT_EVENT = "slrj_playground_projects_changed";

export function getAllSavedProjects(): SavedProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedProject[];
  } catch (err) {
    console.error("Failed to read saved projects:", err);
    return [];
  }
}

export function getSavedProjectById(id: string): SavedProject | null {
  const projects = getAllSavedProjects();
  return projects.find((p) => p.id === id) || null;
}

export function saveProject(project: SavedProject): void {
  if (typeof window === "undefined") return;
  try {
    const projects = getAllSavedProjects();
    const idx = projects.findIndex((p) => p.id === project.id);
    const updatedProject = {
      ...project,
      updatedAt: new Date().toISOString(),
    };

    if (idx >= 0) {
      projects[idx] = updatedProject;
    } else {
      projects.unshift(updatedProject);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: projects }));
  } catch (err) {
    console.error("Failed to save project:", err);
  }
}

export function deleteProject(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const projects = getAllSavedProjects().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: projects }));
  } catch (err) {
    console.error("Failed to delete project:", err);
  }
}

export function duplicateProject(id: string): SavedProject | null {
  const original = getSavedProjectById(id);
  if (!original) return null;

  const duplicated: SavedProject = {
    ...original,
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: `${original.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isTemplate: false,
  };

  saveProject(duplicated);
  return duplicated;
}

export function createNewProject(
  name: string,
  language: PlaygroundLanguage,
  files: Record<string, string>,
  activeFile: string
): SavedProject {
  const newProject: SavedProject = {
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim() || `My ${language.toUpperCase()} Workspace`,
    language,
    files,
    activeFile,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveProject(newProject);
  return newProject;
}

// ── Auto-Save Storage with Debounce ──
export function saveAutoSaveState(
  language: PlaygroundLanguage,
  files: Record<string, string>,
  activeFile: string
): void {
  if (typeof window === "undefined") return;
  try {
    const key = `${AUTOSAVE_PREFIX}${language}`;
    const payload = {
      language,
      files,
      activeFile,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (err) {
    console.warn("Autosave storage failed:", err);
  }
}

export function getAutoSaveState(
  language: PlaygroundLanguage
): { files: Record<string, string>; activeFile: string; savedAt: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const key = `${AUTOSAVE_PREFIX}${language}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
