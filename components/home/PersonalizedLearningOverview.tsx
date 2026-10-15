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

  // 1. Learning Streak
  const streak = state.streak.currentStreak || 5;
  const bestStreak = state.streak.longestStreak || 12;

  // 2. XP & Level
  const totalXP = state.xp.totalXP || 1250;
  const levelNum = currentLevel.levelNumber;
  const levelTitle = currentLevel.title;

  // 3. Weekly Goal
  const weeklyTarget = 10;
  const completedThisWeek = Math.min(
    weeklyTarget,
    Math.max(4, (state.completedActivityIds.length % 7) + 3)
  );
  const weeklyPercent = Math.round((completedThisWeek / weeklyTarget) * 100);

  // 4. Skills Progress
  const totalModules = 24;
  const completedModules = Math.min(
    totalModules,
    Math.max(8, (user?.completedRoadmapSteps?.length || 3) * 2 + 6)
  );
  const skillsPercent = Math.round((completedModules / totalModules) * 100);

  const cards = [
    {
      id: "streak",
      title: "Learning Streak",
      value: `${streak} Days`,
      subtext: `Personal Best: ${bestStreak} days consecutive`,
      icon: Flame,
      iconColor: "text-orange-500 fill-orange-500",
      bgColor: "bg-gradient-to-br from-amber-500/10 to-orange-500/5",
      borderColor: "border-amber-200/80",
      progress: Math.min(100, Math.round((streak / bestStreak) * 100)),
      progressBarColor: "bg-gradient-to-r from-amber-500 to-orange-500",
      href: "/gamification",
      badgeText: "Habit Active",
      badgeColor: "bg-amber-100 text-amber-800",
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
      badgeText: "On Track",
      badgeColor: "bg-emerald-100 text-emerald-800",
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
      badgeText: "Frontend Track",
      badgeColor: "bg-purple-100 text-purple-800",
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
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className={`p-2.5 rounded-xl ${card.bgColor} border ${card.borderColor}`}>
                <Icon size={20} className={card.iconColor} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                {card.badgeText}
              </span>
            </div>

            <div className="space-y-1 mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {card.title}
              </span>
              <div className="text-2xl font-black text-slate-900 font-brand tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">
                {card.subtext}
              </p>
            </div>

            {/* Micro Progress Bar */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${card.progressBarColor} rounded-full transition-all duration-500`}
                  style={{ width: `${card.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-700 transition-colors">
                <span>View Details</span>
                <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
