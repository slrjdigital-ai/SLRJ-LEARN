import { Metadata } from "next";
import CertificateView from "@/components/certificates/CertificateView";
import { Award, Briefcase, Sparkles, FileCheck2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificates & Career Preparation | SLRJ Learn",
  description:
    "Verify your programming skills through practical assessments, unlock verified digital completion certificates, and prepare with mock coding interviews.",
};

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20">
      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Award size={14} className="text-cyan-400" />
            <span>Verified Credentials & Career Readiness</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white mb-3">
            Certificates & Career Preparation
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Validate your software engineering competency. Pass our comprehensive assessment quizzes to unlock verified digital certificates, review mock interview questions, and build an employer-ready portfolio.
          </p>
        </div>

        <CertificateView />
      </div>
    </div>
  );
}
