import { Metadata } from "next";
import PublicHeroSection from "@/components/home/PublicHeroSection";
import LearningBenefitsSection from "@/components/home/LearningBenefitsSection";
import CertificatePreviewSection from "@/components/home/CertificatePreviewSection";
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

      {/* ─── 5. Peer Discussion Community ─── */}
      <HomeCommunityPreview />

      {/* ─── 6. Frequently Asked Questions Accordion ─── */}
      <FaqSection />

      {/* ─── 7. Why Learn With SLRJ Learn (Platform Benefits & Pillars) ─── */}
      <LearningBenefitsSection />
    </div>
  );
}
