"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { COURSES_DATA } from "@/data/courses";
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Search,
  ExternalLink,
  ArrowRight,
  Clock,
  Sparkles,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function CertificateView() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchCertId, setSearchCertId] = useState("");

  const handleSearchVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCertId.trim()) return;
    router.push(`/verify-certificate/${encodeURIComponent(searchCertId.trim())}`);
  };

  // Fresh learner has not earned any certificates yet
  const earnedCertificates: Array<{
    id: string;
    courseTitle: string;
    learnerName: string;
    issueDate: string;
    scorePercentage: number;
    status: string;
  }> = [];

  return (
    <div className="space-y-10">
      {/* ── Certificate Verification Lookup Bar ── */}
      <section className="clean-card p-6 sm:p-8 space-y-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#18B6D2] uppercase tracking-wider">
            <ShieldCheck size={16} className="text-[#16865C]" />
            <span>Public Verification Registry</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#182230] mt-1">
            Verify Any SLRJ Learn Credential
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Enter an official Certificate ID (e.g. <code className="font-mono text-[#12316B]">SLRJ-CERT-2026-WD101</code>) to inspect verifiable course completion metadata.
          </p>
        </div>

        <form onSubmit={handleSearchVerification} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              value={searchCertId}
              onChange={(e) => setSearchCertId(e.target.value)}
              placeholder="e.g. SLRJ-CERT-2026-WD101"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#E2E8F0] text-xs sm:text-sm text-[#182230] placeholder-[#64748B] focus:outline-none focus:border-[#12316B]"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
          >
            Verify Online
          </button>
        </form>
      </section>

      {/* ── Earned Certificates Grid ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[#182230] flex items-center gap-2">
              <Award size={18} className="text-[#12316B]" />
              <span>My Earned Certificates</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Official verifiable certificates awarded for completed courses and passed assessments.
            </p>
          </div>
        </div>

        {earnedCertificates.length === 0 ? (
          <div className="clean-card p-8 sm:p-10 text-center space-y-3 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#12316B] flex items-center justify-center mx-auto">
              <Award size={28} />
            </div>
            <h3 className="font-extrabold text-base text-[#182230]">No Certificates Earned Yet</h3>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
              Complete all lessons in a course and score 80% or higher on the server-graded evaluation to unlock your verified landscape certificate.
            </p>
            <div className="pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Browse Courses</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {earnedCertificates.map((cert) => (
              <div
                key={cert.id}
                className="clean-card p-6 flex flex-col justify-between space-y-4 border-l-4 border-l-[#12316B] hover:border-[#12316B]/30 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#12316B] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {cert.id}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#16865C] border border-emerald-200 uppercase">
                      <CheckCircle2 size={12} />
                      Verified
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-[#182230] leading-snug">
                    {cert.courseTitle}
                  </h3>

                  <p className="text-xs text-[#64748B]">
                    Awarded to <strong>{cert.learnerName}</strong> on {cert.issueDate} with a score of {cert.scorePercentage}%.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">Status: Active</span>

                  <Link
                    href={`/verify-certificate/${cert.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#12316B] hover:bg-[#2456A6] text-white text-xs font-bold transition-colors shadow-2xs"
                  >
                    <span>View Certificate</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Available Assessments to Earn Certificates ── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-extrabold text-[#182230] flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#16865C]" />
            <span>Available Course Assessments</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Complete the final evaluation with an 80%+ score to unlock your official certificate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES_DATA.map((course) => (
            <div
              key={course.id}
              className="clean-card p-5 flex flex-col justify-between space-y-4 hover:border-[#12316B]/30 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{course.icon || "💻"}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#182230]">
                    {course.difficulty}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-[#182230] line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-xs text-[#64748B] line-clamp-2">
                  {course.shortDescription}
                </p>

                <div className="text-[11px] text-[#64748B] pt-1 flex items-center gap-2">
                  <Clock size={12} className="text-[#18B6D2]" />
                  <span>20 Mins Evaluation • 80% to Pass</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#16865C]">Free Assessment</span>

                <Link
                  href={`/dashboard/assessments/${course.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#12316B] hover:bg-[#2456A6] text-white text-xs font-bold transition-colors shadow-2xs"
                >
                  <span>Take Quiz</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
