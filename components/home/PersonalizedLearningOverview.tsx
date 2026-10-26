"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import {
  Flame,
  Zap,
  Target,
  BarChart3,
  Calendar,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
} from "lucide-react";

export default function PersonalizedLearningOverview() {
  const { user } = useAuth();
  const { state, currentLevel, nextLevel, levelProgress, xpToNextLevel } = useGamification();

  // 1. Learning Streak (0 for fresh learner)
  const streak = state.streak.currentStreak || 0;
  const bestStreak = state.streak.longestStreak || 0;

  // 2. XP & Level (0 XP, Level 1)
  const totalXP = state.xp.totalXP || 0;
  const levelNum = currentLevel.levelNumber;
  const levelTitle = currentLevel.title;

  // 3. Weekly Goal (0 completed this week)
  const weeklyTarget = 10;
  const completedThisWeek = state.completedActivityIds.length || 0;
  const weeklyPercent = Math.round((completedThisWeek / weeklyTarget) * 100);

  // 4. Skills Progress (0 modules mastered)
  const totalModules = 24;
  const completedModules = user?.completedRoadmapSteps?.length || 0;
  const skillsPercent = Math.round((completedModules / totalModules) * 100);

  const cards = [
    {
      id: "streak",
      title: "Learning Streak",
      value: `${streak} Days`,
      subtext: streak > 0 ? `Personal Best: ${bestStreak} days consecutive` : "Start your daily habit today",
      icon: Flame,
      iconColor: "text-orange-500 fill-orange-500",
      bgColor: "bg-gradient-to-br from-amber-500/10 to-orange-500/5",
      borderColor: "border-amber-200/80",
      progress: bestStreak > 0 ? Math.min(100, Math.round((streak / bestStreak) * 100)) : 0,
      progressBarColor: "bg-gradient-to-r from-amber-500 to-orange-500",
      href: "/gamification",
      badgeText: streak > 0 ? "Habit Active" : "Day 0",
      badgeColor: streak > 0 ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600",
    },
    {
      id: "xp-level",
      title: "XP & Level",
      value: `${totalXP.toLocaleString()} XP`,
      subtext: `Level ${levelNum} • ${levelTitle}`,
      icon: Zap,
      iconColor: "text-[#0b69ff]",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-indigo-500/5",
      borderColor: "border-blue-200/80",
      progress: levelProgress,
      progressBarColor: "bg-gradient-to-r from-[#0b69ff] to-indigo-600",
      href: "/gamification",
      badgeText: `${xpToNextLevel} XP to Lv ${levelNum + 1}`,
      badgeColor: "bg-blue-100 text-[#0b69ff]",
    },
    {
      id: "weekly-goal",
      title: "Weekly Goal",
      value: `${completedThisWeek} / ${weeklyTarget}`,
      subtext: `${weeklyPercent}% of target completed this week`,
      icon: Target,
      iconColor: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-500/10 to-teal-500/5",
      borderColor: "border-emerald-200/80",
      progress: weeklyPercent,
      progressBarColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
      href: "/topics",
      badgeText: completedThisWeek > 0 ? "On Track" : "Get Started",
      badgeColor: completedThisWeek > 0 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600",
    },
    {
      id: "skills-progress",
      title: "Skills Progress",
      value: `${skillsPercent}%`,
      subtext: `${completedModules} of ${totalModules} curriculum modules mastered`,
      icon: BarChart3,
      iconColor: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/5",
      borderColor: "border-purple-200/80",
      progress: skillsPercent,
      progressBarColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      href: "/roadmap",
      badgeText: completedModules > 0 ? "Frontend Track" : "Not Started",
      badgeColor: completedModules > 0 ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.id}
            href={card.href}
            className={`group p-5 rounded-2xl bg-white border ${card.borderColor} shadow-xs hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between gap-3 mb-3.5">
              <div className={`p-2.5 rounded-xl ${card.bgColor} border ${card.borderColor}`}>
                <Icon size={22} className={card.iconColor} />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${card.badgeColor}`}>
                {card.badgeText}
              </span>
            </div>

            <div className="space-y-1.5 mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {card.title}
              </span>
              <div suppressHydrationWarning className="text-2xl sm:text-3xl font-black text-slate-900 font-brand tracking-tight">
                {card.value}
              </div>
              <p className="text-sm text-slate-600 line-clamp-1 leading-snug">
                {card.subtext}
              </p>
            </div>

            {/* Micro Progress Bar */}
            <div className="space-y-2 pt-2.5 border-t border-slate-100">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${card.progressBarColor} rounded-full transition-all duration-500`}
                  style={{ width: `${card.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-800 transition-colors font-medium">
                <span>View Details</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
