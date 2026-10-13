"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "student" | "developer" | "educator";
  track: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  joinedDate: string;
  bookmarkedNotes: string[];
  completedRoadmapSteps: number[];
  downloadedPdfs: string[];
}

export const DEMO_USERS: Record<string, User> = {
  "alex.chen@student.dev": {
    id: "usr_alex_01",
    name: "Alex Chen",
    email: "alex.chen@student.dev",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "student",
    track: "Full-Stack Next.js & React",
    level: "Intermediate",
    joinedDate: "October 2026",
    bookmarkedNotes: [
      "how-the-internet-works",
      "react-components-props-state",
      "nextjs-app-router-layouts",
      "rest-apis-crud-handlers"
    ],
    completedRoadmapSteps: [1, 2, 3, 4],
    downloadedPdfs: [
      "web-fundamentals-complete-handbook",
      "nextjs-app-router-guide"
    ],
  },
  "sarah.kim@code.dev": {
    id: "usr_sarah_02",
    name: "Sarah Kim",
    email: "sarah.kim@code.dev",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    role: "student",
    track: "Modern Frontend Engineering",
    level: "Beginner",
    joinedDate: "September 2026",
    bookmarkedNotes: [
      "html-basics-document-structure",
      "css-flexbox-grid-deep-dive"
    ],
    completedRoadmapSteps: [1, 2],
    downloadedPdfs: [
      "html5-complete-notes",
      "css-flexbox-grid-cheatsheet"
    ],
  },
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  sendCode: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  verifyCode: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, track?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  toggleBookmark: (noteSlug: string) => void;
  markPdfDownloaded: (pdfSlug: string) => void;
  toggleRoadmapStep: (stepId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "slrj_edu_user_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        queueMicrotask(() => {
          setUser(parsed);
          setIsLoading(false);
        });
        return;
      }
    } catch (e) {
      console.error("Failed to restore user session:", e);
    }
    queueMicrotask(() => {
      setIsLoading(false);
    });
  }, []);

  // Sync to localStorage
  const saveUserSession = (newUser: User | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to save session:", e);
    }
  };

  const sendCode = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Failed to send code." };
      }
      return { success: true, message: data.message };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const verifyCode = async (email: string, code: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Invalid verification code." };
      }

      saveUserSession(data.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error during verification." };
    }
  };

  const login = async (email: string, _password?: string): Promise<{ success: boolean; error?: string }> => {
    void _password;
    const trimmed = email.trim().toLowerCase();
    
    // Simulate brief network latency for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 350));

    // If known demo user
    if (DEMO_USERS[trimmed]) {
      saveUserSession(DEMO_USERS[trimmed]);
      return { success: true };
    }

    // Dynamic login for any valid email
    if (trimmed.includes("@") && trimmed.length > 5) {
      const nameFromEmail = trimmed.split("@")[0].replace(/[._-]/g, " ");
      const formattedName = nameFromEmail
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: formattedName || "Student Developer",
        email: trimmed,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(trimmed)}`,
        role: "student",
        track: "Full-Stack Web Development",
        level: "Beginner",
        joinedDate: "October 2026",
        bookmarkedNotes: ["how-the-internet-works", "nextjs-app-router-layouts"],
        completedRoadmapSteps: [1],
        downloadedPdfs: ["web-fundamentals-complete-handbook"],
      };

      saveUserSession(newUser);
      return { success: true };
    }

    return { success: false, error: "Please enter a valid email address (e.g. dev@example.com)" };
  };

  const register = async (
    name: string,
    email: string,
    _password: string,
    track: string = "Full-Stack Web Development"
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length < 2) {
      return { success: false, error: "Please enter your full name." };
    }

    if (!trimmedEmail.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(trimmedEmail)}`,
      role: "student",
      track: track || "Full-Stack Web Development",
      level: "Beginner",
      joinedDate: "October 2026",
      bookmarkedNotes: ["how-the-internet-works"],
      completedRoadmapSteps: [1],
      downloadedPdfs: ["web-fundamentals-complete-handbook"],
    };

    saveUserSession(newUser);
    return { success: true };
  };

  const logout = () => {
    saveUserSession(null);
  };

  const toggleBookmark = (noteSlug: string) => {
    if (!user) return;
    const exists = user.bookmarkedNotes.includes(noteSlug);
    const updatedBookmarks = exists
      ? user.bookmarkedNotes.filter((s) => s !== noteSlug)
      : [...user.bookmarkedNotes, noteSlug];

    const updatedUser = { ...user, bookmarkedNotes: updatedBookmarks };
    saveUserSession(updatedUser);
  };

  const markPdfDownloaded = (pdfSlug: string) => {
    if (!user) return;
    if (!user.downloadedPdfs.includes(pdfSlug)) {
      const updatedUser = {
        ...user,
        downloadedPdfs: [...user.downloadedPdfs, pdfSlug],
      };
      saveUserSession(updatedUser);
    }
  };

  const toggleRoadmapStep = (stepId: number) => {
    if (!user) return;
    const exists = user.completedRoadmapSteps.includes(stepId);
    const updated = exists
      ? user.completedRoadmapSteps.filter((id) => id !== stepId)
      : [...user.completedRoadmapSteps, stepId];

    const updatedUser = { ...user, completedRoadmapSteps: updated };
    saveUserSession(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        sendCode,
        verifyCode,
        register,
        logout,
        toggleBookmark,
        markPdfDownloaded,
        toggleRoadmapStep,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
