import { Metadata } from "next";
import CertificateView from "@/components/certificates/CertificateView";
import { Award, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificates & Verifications | SLRJ Learn",
  description:
    "Verify your programming skills through assessments, earn official verified landscape certificates, and verify credentials via instant QR codes.",
};

export default function CertificatesPage() {
  return (
    <div className="space-y-8 pb-16">
      {/* ── Page Header ── */}
      <section className="rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#18B6D2]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-xs font-bold uppercase tracking-wider">
            <Award size={14} className="text-[#18B6D2]" />
            <span>Verifiable Academic Credentials</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white">
            Certificates & Verification
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Validate your software engineering mastery. Complete course lessons, pass server-scored assessments (80%+ passing score), and earn official landscape certificates verified via public QR endpoints.
          </p>
        </div>
      </section>

      {/* ── Interactive Certificates & Assessments Dashboard ── */}
      <CertificateView />
    </div>
  );
}
