"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { CertificateRecord } from "@/data/certificatesStore";
import { useCertificatesManager } from "@/lib/certificateStorage";
import { useCourseProgress } from "@/lib/courseProgress";
import { getAllCourses, Course } from "@/data/courses";
import { useAuth } from "@/context/AuthContext";
import CertificateDocument from "./CertificateDocument";
import CertificateModal from "./CertificateModal";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Eye,
  ArrowRight,
  Lock,
  Unlock,
  GraduationCap,
  Clock,
  Layers,
  Check,
  ExternalLink,
} from "lucide-react";

// Official Sample Certificate for visual preview matching the official template image
const SAMPLE_CERTIFICATE: CertificateRecord = {
  id: "SLRJ-LRN-2026-1021-001",
  learnerName: "Sample Person",
  title: "Certificate of Completion",
  category: "Course",
  sourceType: "course",
  sourceId: "python-programming",
  sourceTitle: "Python Programming – Beginner to Advanced",
  issueDate: "21 October 2026",
  scorePercentage: 100,
  status: "valid",
  issuer: "SLRJ Learn • SLRJ Digital",
  skillsGained: [
    "Python Basics",
    "Core Concepts",
    "Data Handling",
    "Projects & Practice",
  ],
  verifiedAt: "2026-10-21T00:00:00.000Z",
};

export default function MyCertificatesMainView() {
  const { certificates, isLoaded } = useCertificatesManager();
  const { getProgress } = useCourseProgress();
  const { user } = useAuth();

  const allCourses = useMemo(() => getAllCourses(), []);

  // Filter state for course certificates: "all" | "unlocked" | "locked"
  const [filterMode, setFilterMode] = useState<"all" | "unlocked" | "locked">("all");

  // Active Certificate Modal State
  const [activeModalCert, setActiveModalCert] = useState<CertificateRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCertificate = (cert: CertificateRecord) => {
    setActiveModalCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseCertificate = () => {
    setIsModalOpen(false);
    setActiveModalCert(null);
  };

  // Map every course to its certificate status (Unlocked vs Locked)
  const courseCertificateItems = useMemo(() => {
    return allCourses.map((course) => {
      // Check if user has an explicitly awarded certificate for this course
      const issuedCert = certificates.find((cert) => {
        const cleanCertId = cert.sourceId.toLowerCase().replace(/^course-/, "");
        const cleanCourseId = course.id.toLowerCase().replace(/^course-/, "");
        const cleanCourseSlug = course.slug.toLowerCase().replace(/^course-/, "");
        return (
          cleanCertId === cleanCourseId ||
          cleanCertId === cleanCourseSlug ||
          course.id.toLowerCase().includes(cert.sourceId.toLowerCase()) ||
          cert.sourceTitle.toLowerCase() === course.title.toLowerCase()
        );
      });

      // Check course progress
      const progress = getProgress(course.id);
      const progressPercentage = progress?.progressPercentage || 0;
      const isCompleted = progressPercentage >= 100 || Boolean(issuedCert);
      const isUnlocked = isCompleted;

      // Construct verified certificate record
      const activeCert: CertificateRecord = issuedCert || {
        id: `SLRJ-CERT-${course.id.replace(/^course-/, "").toUpperCase()}`,
        learnerName: user?.name || "Shahid",
        learnerEmail: user?.email || "shahid@slrjlearn.in",
        title: "Certificate of Course Completion",
        category: "Course",
        sourceType: "course",
        sourceId: course.id,
        sourceTitle: course.title,
        issueDate: "October 2026",
        scorePercentage: 100,
        status: "valid",
        issuer: "SLRJ Learn Academy • SLRJ Digital",
        skillsGained: course.skills || course.skillsGained || ["Software Engineering"],
        verifiedAt: new Date().toISOString(),
      };

      return {
        course,
        progressPercentage,
        isUnlocked,
        certificate: activeCert,
      };
    });
  }, [allCourses, certificates, getProgress, user]);

  const unlockedCount = useMemo(() => {
    return courseCertificateItems.filter((item) => item.isUnlocked).length;
  }, [courseCertificateItems]);

  const lockedCount = useMemo(() => {
    return courseCertificateItems.filter((item) => !item.isUnlocked).length;
  }, [courseCertificateItems]);

  const displayedCourseItems = useMemo(() => {
    if (filterMode === "unlocked") return courseCertificateItems.filter((i) => i.isUnlocked);
    if (filterMode === "locked") return courseCertificateItems.filter((i) => !i.isUnlocked);
    return courseCertificateItems;
  }, [courseCertificateItems, filterMode]);

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16">
      {/* ── 1. CERTIFICATE INFORMATION SECTION ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#18B6D2]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award size={13} className="text-[#18B6D2]" />
              <span>Official Credentials</span>
            </span>
            <span className="text-blue-200 text-xs">•</span>
            <span className="text-blue-200 text-xs font-semibold">SLRJ Digital Credential Registry</span>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-black font-brand tracking-tight text-white leading-tight">
              Certificates &amp; Digital Credentials
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Earn tamper-proof, verifiable certificates as you complete courses and master software development with SLRJ Learn.
            </p>
          </div>

          {/* Key Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#18B6D2] font-bold text-sm">
                <GraduationCap size={18} />
                <span>Final Course Completion</span>
              </div>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                Course certificates unlock automatically when you complete the final course evaluation, chapter curriculum, and assessments.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <ShieldCheck size={18} />
                <span>Instant QR Verification</span>
              </div>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                Every unlocked certificate includes a unique cryptographic verification ID and QR code linked to our public registry.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Sparkles size={18} />
                <span>Career &amp; Portfolio Ready</span>
              </div>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                Download high-resolution print-ready PDFs, add directly to your LinkedIn profile licenses, and share with employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SAMPLE CERTIFICATE PREVIEW ── */}
      <section className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#173B70] text-xs font-bold uppercase tracking-wider mb-1.5">
              <Eye size={13} className="text-[#18B6D2]" />
              <span>Sample Certificate Preview</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
              Official SLRJ Learn Credential Template
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Preview the format, institutional seals, security watermarks, and verification badges included on your earned certificates.
            </p>
          </div>

          <button
            onClick={() => handleOpenCertificate(SAMPLE_CERTIFICATE)}
            className="px-4 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Eye size={15} className="text-[#18B6D2]" />
            <span>Open Sample in Full View</span>
          </button>
        </div>

        {/* Embedded Sample Certificate Frame with Real Official Template */}
        <div
          onClick={() => handleOpenCertificate(SAMPLE_CERTIFICATE)}
          className="max-w-4xl mx-auto rounded-2xl border-2 border-slate-200/90 shadow-xl overflow-hidden bg-white hover:border-[#173B70]/50 transition-all cursor-pointer group p-1 sm:p-2"
          title="Click to view sample certificate in full view"
        >
          <div className="relative aspect-[1024/682] w-full rounded-xl overflow-hidden bg-slate-900/5">
            <Image
              src="/sample-certificate.jpg"
              alt="SLRJ Learn Official Sample Certificate of Completion"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain group-hover:scale-[1.01] transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── 3. COURSE CERTIFICATES (LOCKED UNTIL COURSE IS COMPLETED) ── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Award size={13} className="text-emerald-600" />
              <span>Course Certificates Status</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
              Course Certificates ({allCourses.length})
            </h2>
            <p className="text-xs text-slate-500">
              Certificates unlock automatically when the final course evaluation and curriculum are completed.
            </p>
          </div>

          {/* Filter Pills: All / Unlocked / Locked */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === "all"
                  ? "bg-white text-[#173B70] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({courseCertificateItems.length})
            </button>
            <button
              onClick={() => setFilterMode("unlocked")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                filterMode === "unlocked"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <Unlock size={12} />
              <span>Unlocked ({unlockedCount})</span>
            </button>
            <button
              onClick={() => setFilterMode("locked")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                filterMode === "locked"
                  ? "bg-slate-800 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Lock size={12} />
              <span>Locked ({lockedCount})</span>
            </button>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourseItems.map(({ course, progressPercentage, isUnlocked, certificate }) => {
            return (
              <div
                key={course.id}
                className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                  isUnlocked
                    ? "bg-white border-emerald-200 shadow-2xs hover:shadow-md hover:border-emerald-300"
                    : "bg-[#F8FAFC] border-slate-200/90 shadow-2xs"
                }`}
              >
                {/* ── Top Header / Status Bar ── */}
                <div
                  className={`p-4 border-b flex items-center justify-between text-xs ${
                    isUnlocked
                      ? "bg-emerald-50/60 border-emerald-100 text-emerald-900"
                      : "bg-slate-100/70 border-slate-200 text-slate-600"
                  }`}
                >
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500">
                    {course.category}
                  </span>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                      <CheckCircle2 size={12} className="text-emerald-600" />
                      <span>Unlocked • Final Course Completed</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 font-bold text-[11px] border border-amber-200">
                      <Lock size={11} className="text-amber-700" />
                      <span>Locked • Pending Final Completion</span>
                    </span>
                  )}
                </div>

                {/* ── Main Card Body ── */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-black text-base text-slate-900 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  {/* Progress & Unlock Condition */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Course Progress</span>
                      <strong
                        className={`font-black ${
                          isUnlocked ? "text-emerald-700" : "text-[#173B70]"
                        }`}
                      >
                        {progressPercentage}%
                      </strong>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isUnlocked
                            ? "bg-emerald-500"
                            : progressPercentage > 0
                            ? "bg-[#173B70]"
                            : "bg-transparent"
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>

                    {!isUnlocked && (
                      <p className="text-[11px] text-slate-500 pt-1 leading-snug">
                        Unlocks automatically when you complete the final course evaluation &amp; curriculum.
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Bottom Action Button ── */}
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  {isUnlocked ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCertificate(certificate)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye size={13} />
                        <span>View Certificate</span>
                      </button>
                      <Link
                        href={`/verify-certificate/${certificate.id}`}
                        className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs"
                        title="Verify Certificate Online"
                      >
                        <ShieldCheck size={14} className="text-emerald-600" />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/courses/${course.slug}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer group"
                    >
                      <Lock size={12} className="text-[#18B6D2]" />
                      <span>{progressPercentage > 0 ? "Complete Final Course to Unlock" : "Start Course & Final Evaluation"}</span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. INTERACTIVE PRINT-READY CERTIFICATE MODAL ── */}
      <CertificateModal
        certificate={activeModalCert}
        isOpen={isModalOpen}
        onClose={handleCloseCertificate}
      />
    </div>
  );
}
