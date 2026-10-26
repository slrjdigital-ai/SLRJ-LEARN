import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Student Learning Dashboard | SLRJ Learn",
  description:
    "Personal student and developer dashboard. Track completed roadmap milestones, review saved study notes, and manage your learning progress.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-6 sm:py-8 lg:py-10 relative overflow-hidden">
      {/* Subtle atmospheric ambient glows for a clean, attractive modern feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[360px] bg-gradient-to-b from-blue-100/60 via-cyan-50/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardClient />
      </div>
    </div>
  );
}
