import { Metadata } from "next";
import GamificationHub from "@/components/gamification/GamificationHub";

export const metadata: Metadata = {
  title: "Gamification & Coding Challenges | SLRJ Learn",
  description:
    "Track your daily learning streaks, earn XP, level up your coding rank, conquer weekly algorithmic challenges, and climb the global leaderboard.",
};

export default function GamificationPage() {
  return <GamificationHub />;
}
