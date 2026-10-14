import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Student Learning Dashboard | SLRJ Learn",
  description:
    "Personal student and developer dashboard. Track completed roadmap milestones, review saved study notes, and manage your learning progress.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#080C16] text-white pt-20">
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <DashboardClient />
      </div>
    </div>
  );
}
