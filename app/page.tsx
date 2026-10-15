import { Metadata } from "next";
import HomeWelcomeBanner from "@/components/home/HomeWelcomeBanner";
import PersonalizedLearningOverview from "@/components/home/PersonalizedLearningOverview";
import ContinueLearningCard from "@/components/home/ContinueLearningCard";
import DailyLearningHub from "@/components/home/DailyLearningHub";
import BuildSomethingReal from "@/components/home/BuildSomethingReal";
import HomeCommunityPreview from "@/components/home/HomeCommunityPreview";
import LearningPathDashboard from "@/components/learning-paths/LearningPathDashboard";

export const metadata: Metadata = {
  title: "Dashboard & Learning Journey | SLRJ Learn Academy",
  description:
    "Follow structured growth cycles, build responsive websites, earn verified XP, and track your progress from beginner to advanced.",
};

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      {/* ─── 1. Upgraded Welcome Banner ─── */}
      <HomeWelcomeBanner />

      {/* ─── 2. Personalized Learning Overview (4-Card Dashboard) ─── */}
      <PersonalizedLearningOverview />

      {/* ─── 3. Dedicated Continue Learning Section ─── */}
      <ContinueLearningCard />

      {/* ─── 4. Daily Learning Hub (Interactive Challenges, Quizzes, Puzzles) ─── */}
      <DailyLearningHub />

      {/* ─── 5. Growth Cycles, Courses & Role Roadmaps ─── */}
      <LearningPathDashboard />

      {/* ─── 6. Build Something Real (8 Practical Projects & Portfolio Submission) ─── */}
      <BuildSomethingReal />

      {/* ─── 7. Learner Community & Discussions ─── */}
      <HomeCommunityPreview />
    </div>
  );
}
