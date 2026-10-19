"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  GamificationState,
  getStoredGamificationState,
  getInitialGamificationState,
  saveGamificationState,
  calculateLevel,
  getLocalDateString,
  UserLevel,
  AchievementBadge,
  CURRENT_WEEKLY_CHALLENGE,
} from "@/lib/gamification";

interface GamificationContextType {
  state: GamificationState;
  currentLevel: UserLevel;
  nextLevel: UserLevel | null;
  levelProgress: number;
  xpToNextLevel: number;
  recordActivity: (
    type: "lesson" | "quiz" | "challenge" | "project" | "community",
    activityId: string,
    options?: { xp?: number; title?: string }
  ) => { awarded: boolean; xpGained: number; message: string; unlockedBadge?: AchievementBadge };
  submitChallengeSolution: (
    challengeId: string,
    code: string,
    passed: boolean
  ) => { success: boolean; xpEarned: number };
  toggleIncognito: () => void;
  isActivityCompleted: (activityId: string) => boolean;
  awardXP: (amount: number, title?: string) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  // Initialize with deterministic state for identical SSR & initial client hydration
  const [state, setState] = useState<GamificationState>(getInitialGamificationState);

  // Restore client-stored gamification progress on mount and listen to updates
  useEffect(() => {
    setState(getStoredGamificationState());

    const handleUpdate = () => {
      setState(getStoredGamificationState());
    };
    window.addEventListener("gamification-update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("gamification-update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const { currentLevel, nextLevel, progressPercent, xpToNextLevel } = calculateLevel(state.xp.totalXP);

  // Check if an activity has already been credited (anti-cheat)
  const isActivityCompleted = useCallback(
    (activityId: string) => {
      return state.completedActivityIds.includes(activityId);
    },
    [state.completedActivityIds]
  );

  // Record verified activity & maintain local streak
  const recordActivity = useCallback(
    (
      type: "lesson" | "quiz" | "challenge" | "project" | "community",
      activityId: string,
      options?: { xp?: number; title?: string }
    ) => {
      const currentState = getStoredGamificationState();

      // Anti-cheat check: do not award XP if repeated submission
      if (currentState.completedActivityIds.includes(activityId)) {
        return {
          awarded: false,
          xpGained: 0,
          message: "Activity already completed. Keep practicing to sharpen your skills!",
        };
      }

      // Default XP schedule
      const defaultXPMap: Record<typeof type, number> = {
        lesson: 25,
        quiz: 30,
        challenge: 50,
        project: 75,
        community: 15,
      };
      const xpToAward = options?.xp !== undefined ? options.xp : defaultXPMap[type];

      // Update XP breakdown
      const newXP = { ...currentState.xp };
      if (type === "lesson") newXP.lessonsXP += xpToAward;
      if (type === "quiz") newXP.quizzesXP += xpToAward;
      if (type === "challenge") newXP.challengesXP += xpToAward;
      if (type === "project") newXP.projectsXP += xpToAward;
      if (type === "community") newXP.communityXP += xpToAward;
      newXP.totalXP += xpToAward;

      // Update Streaks with local date strategy
      const todayStr = getLocalDateString();
      const lastActive = currentState.streak.lastActiveDate;
      const completedDays = new Set(currentState.streak.completedDays);
      completedDays.add(todayStr);

      let newStreak = currentState.streak.currentStreak;
      let newLongest = currentState.streak.longestStreak;

      if (!lastActive) {
        newStreak = 1;
      } else if (lastActive === todayStr) {
        // Already active today; retain streak without duplicate count
        newStreak = currentState.streak.currentStreak;
      } else {
        // Calculate difference in days
        const lastDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Consecutive day!
          newStreak += 1;
        } else {
          // Missed at least one day, reset streak to 1
          newStreak = 1;
        }
      }

      newLongest = Math.max(newLongest, newStreak);

      // Check badge unlock criteria
      let newlyUnlockedBadge: AchievementBadge | undefined;
      const updatedBadges = currentState.badges.map((b) => {
        if (b.unlocked) return b;

        let shouldUnlock = false;
        if (b.id === "streak_7" && newStreak >= 7) shouldUnlock = true;
        if (b.id === "quiz_master" && newXP.quizzesXP >= 90) shouldUnlock = true;
        if (b.id === "challenge_champ" && newXP.challengesXP >= 100) shouldUnlock = true;
        if (b.id === "project_builder" && newXP.projectsXP >= 150) shouldUnlock = true;
        if (b.id === "consistent_learner" && newXP.totalXP >= 600) shouldUnlock = true;

        if (shouldUnlock) {
          newlyUnlockedBadge = {
            ...b,
            unlocked: true,
            unlockedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            progress: 100,
          };
          return newlyUnlockedBadge;
        }
        return b;
      });

      const nextState: GamificationState = {
        ...currentState,
        streak: {
          currentStreak: newStreak,
          longestStreak: newLongest,
          lastActiveDate: todayStr,
          completedDays: Array.from(completedDays),
        },
        xp: newXP,
        badges: updatedBadges,
        completedActivityIds: [...currentState.completedActivityIds, activityId],
      };

      saveGamificationState(nextState);
      setState(nextState);

      return {
        awarded: true,
        xpGained: xpToAward,
        message: `Awesome! You earned +${xpToAward} XP!`,
        unlockedBadge: newlyUnlockedBadge,
      };
    },
    []
  );

  const submitChallengeSolution = useCallback(
    (challengeId: string, code: string, passed: boolean) => {
      const currentState = getStoredGamificationState();
      const existing = currentState.submittedChallenges[challengeId];

      const submittedChallenges = {
        ...currentState.submittedChallenges,
        [challengeId]: {
          code,
          passed,
          submittedAt: new Date().toISOString(),
        },
      };

      let xpEarned = 0;
      if (passed && (!existing || !existing.passed)) {
        xpEarned = CURRENT_WEEKLY_CHALLENGE.xpReward;
        recordActivity("challenge", challengeId, { xp: xpEarned });
      } else {
        const nextState = {
          ...currentState,
          submittedChallenges,
        };
        saveGamificationState(nextState);
        setState(nextState);
      }

      return { success: passed, xpEarned };
    },
    [recordActivity]
  );

  const toggleIncognito = useCallback(() => {
    const currentState = getStoredGamificationState();
    const nextState = {
      ...currentState,
      incognitoMode: !currentState.incognitoMode,
    };
    saveGamificationState(nextState);
    setState(nextState);
  }, []);

  const awardXP = useCallback(
    (amount: number, title?: string) => {
      recordActivity("lesson", `xp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`, {
        xp: amount,
        title: title || "Learning Activity",
      });
    },
    [recordActivity]
  );

  return (
    <GamificationContext.Provider
      value={{
        state,
        currentLevel,
        nextLevel,
        levelProgress: progressPercent,
        xpToNextLevel,
        recordActivity,
        submitChallengeSolution,
        toggleIncognito,
        isActivityCompleted,
        awardXP,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error("useGamification must be used within a GamificationProvider");
  }
  return context;
}
