import { Metadata } from "next";
import PublicHeroSection from "@/components/home/PublicHeroSection";
import LearningBenefitsSection from "@/components/home/LearningBenefitsSection";
import FeaturedCoursesSection from "@/components/home/FeaturedCoursesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CertificatePreviewSection from "@/components/home/CertificatePreviewSection";
import PersonalizedLearningOverview from "@/components/home/PersonalizedLearningOverview";
import ContinueLearningCard from "@/components/home/ContinueLearningCard";
import DailyLearningHub from "@/components/home/DailyLearningHub";
import BuildSomethingReal from "@/components/home/BuildSomethingReal";
import LearningPathDashboard from "@/components/learning-paths/LearningPathDashboard";
import HomeCommunityPreview from "@/components/home/HomeCommunityPreview";
import FaqSection from "@/components/home/FaqSection";

export const metadata: Metadata = {
  title: "SLRJ Learn — Learn Skills. Build Projects. Grow Your Future.",
  description:
    "Online learning platform with PDF-based courses, digital handwritten notes, interactive coding challenges, structured career roadmaps, and verifiable certificates.",
};

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* ─── 1. Hero Section (Learn Skills. Build Projects. Grow Your Future.) ─── */}
      <PublicHeroSection />

      {/* ─── 2. Personalized Student Dashboard Summary (When active session exists) ─── */}
      <PersonalizedLearningOverview />
      <ContinueLearningCard />

      {/* ─── 3. Learning Benefits (5 Pillars of SLRJ Learn) ─── */}
      <LearningBenefitsSection />

      {/* ─── 4. Featured Courses (Catalog Showcase) ─── */}
      <FeaturedCoursesSection />

      {/* ─── 5. Learning Paths & Role Roadmaps (8 Career Tracks) ─── */}
      <LearningPathDashboard />

      {/* ─── 6. How It Works (Discover -> Enrol -> Study -> Pass Assessment -> Certificate) ─── */}
      <HowItWorksSection />

      {/* ─── 7. Real Certificate Preview & Authentic QR Verification ─── */}
      <CertificatePreviewSection />

      {/* ─── 8. Daily Learning Hub (Interactive SoloLearn-Style Challenges) ─── */}
      <DailyLearningHub />

      {/* ─── 9. Build Something Real (8 Practical Projects) ─── */}
      <BuildSomethingReal />

      {/* ─── 10. Peer Discussion Community ─── */}
      <HomeCommunityPreview />

      {/* ─── 11. Frequently Asked Questions Accordion ─── */}
      <FaqSection />
    </div>
  );
}
