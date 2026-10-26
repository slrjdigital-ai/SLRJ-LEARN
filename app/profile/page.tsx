import { Metadata } from "next";
import DeveloperProfileView from "@/components/profile/DeveloperProfileView";

export const metadata: Metadata = {
  title: "Developer Profile | Kouluri Shahid — Software Engineer Portfolio",
  description:
    "Professional software developer profile featuring full-stack projects, verified certifications, technical skills matrix, and educational background inspired by W3Schools & NxtWave.",
};

export default function ProfilePage() {
  return <DeveloperProfileView />;
}
