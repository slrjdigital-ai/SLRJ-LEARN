import { Metadata } from "next";
import PublicHeroSection from "@/components/home/PublicHeroSection";
import LearningBenefitsSection from "@/components/home/LearningBenefitsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CertificatePreviewSection from "@/components/home/CertificatePreviewSection";
import HomeWelcomeBanner from "@/components/home/HomeWelcomeBanner";
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

      {/* ─── 2. Personalized Student Dashboard Summary (Default User Experience) ─── */}
      <HomeWelcomeBanner />
      <PersonalizedLearningOverview />
      <ContinueLearningCard />

      {/* ─── 3. Learning Paths & Role Roadmaps (8 Career Tracks) ─── */}
      <LearningPathDashboard />

      {/* ─── 4. How It Works (Discover -> Enrol -> Study -> Pass Assessment -> Certificate) ─── */}
      <HowItWorksSection />

      {/* ─── 5. Real Certificate Preview & Authentic QR Verification ─── */}
      <CertificatePreviewSection />

      {/* ─── 6. Daily Learning Hub (Interactive SoloLearn-Style Challenges) ─── */}
      <DailyLearningHub />

      {/* ─── 7. Build Something Real (8 Practical Projects) ─── */}
      <BuildSomethingReal />

      {/* ─── 8. Peer Discussion Community ─── */}
      <HomeCommunityPreview />

      {/* ─── 9. Frequently Asked Questions Accordion ─── */}
      <FaqSection />

      {/* ─── 10. Why Learn With SLRJ Learn (Platform Benefits & Pillars) ─── */}
      <LearningBenefitsSection />
    </div>
  );
}
