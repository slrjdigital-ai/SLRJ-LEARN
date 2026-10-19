import { Metadata } from "next";
import PublicHeroSection from "@/components/home/PublicHeroSection";
import CertificatePreviewSection from "@/components/home/CertificatePreviewSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import HomeWelcomeBanner from "@/components/home/HomeWelcomeBanner";
import PersonalizedLearningOverview from "@/components/home/PersonalizedLearningOverview";
import ContinueLearningCard from "@/components/home/ContinueLearningCard";
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

      {/* ─── 4. Real Certificate Preview & Authentic QR Verification ─── */}
      <CertificatePreviewSection />

      {/* ─── 5. How Learning Works at SLRJ Learn (5-Step Methodology) ─── */}
      <HowItWorksSection />

      {/* ─── 6. Peer Discussion Community ─── */}
      <HomeCommunityPreview />

      {/* ─── 7. Frequently Asked Questions Accordion ─── */}
      <FaqSection />
    </div>
  );
}
