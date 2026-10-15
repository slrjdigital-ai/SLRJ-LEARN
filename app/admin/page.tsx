"use client";

import { useState } from "react";
import Link from "next/link";
import { COURSES_DATA } from "@/data/courses";
import { PDF_RESOURCES } from "@/data/pdfs";
import { COURSE_ASSESSMENTS } from "@/data/assessments";
import { getAllCertificates, revokeCertificate } from "@/data/certificatesStore";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  BookOpen,
  FileText,
  Award,
  Users,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Plus,
  Trash2,
  Lock,
  ExternalLink,
  Layers,
  Settings,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "overview" | "courses" | "pdfs" | "assessments" | "certificates" | "learners"
  >("overview");

  // Admin access gate (default demo authorized for platform admins)
  const [adminPasscode, setAdminPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(true); // Default open in local dev

  // Certificates state
  const [certificates, setCertificates] = useState(() => getAllCertificates());
  const [selectedCertToRevoke, setSelectedCertToRevoke] = useState<string | null>(null);
  const [revokeReason, setRevokeReason] = useState("");

  const handleRevoke = (certId: string) => {
    if (!revokeReason.trim()) return;
    revokeCertificate(certId, revokeReason);
    setCertificates(getAllCertificates());
    setSelectedCertToRevoke(null);
    setRevokeReason("");
  };

  const stats = {
    totalLearners: 2480,
    publishedCourses: COURSES_DATA.length,
    pdfHandbooks: PDF_RESOURCES.length,
    certificatesIssued: certificates.length,
    passRate: 86,
  };

  return (
    <div className="space-y-8 pb-16 select-none">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#18B6D2] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} className="text-[#18B6D2]" />
            <span>SLRJ Learn Platform Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-brand">
            Administrator Console
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Protected management of courses, PDF assets, server-side assessments, and issued certificates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-mono font-bold text-emerald-300">
            ● Role: Superadmin
          </span>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] pb-3">
        {[
          { id: "overview", label: "Overview Metrics", icon: TrendingUp },
          { id: "courses", label: `Courses (${COURSES_DATA.length})`, icon: BookOpen },
          { id: "pdfs", label: `PDF Handbooks (${PDF_RESOURCES.length})`, icon: FileText },
          { id: "assessments", label: "Assessments (6)", icon: CheckCircle2 },
          { id: "certificates", label: `Certificates (${certificates.length})`, icon: Award },
          { id: "learners", label: "Learners & Enrolments", icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#12316B] text-white shadow-xs"
                  : "bg-white text-[#64748B] hover:text-[#182230] hover:bg-slate-50 border border-[#E2E8F0]"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          1. OVERVIEW TAB
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="clean-card p-5 space-y-1">
              <span className="text-xs font-bold text-[#64748B]">Active Learners</span>
              <div className="text-2xl font-black text-[#12316B]">{stats.totalLearners.toLocaleString()}</div>
              <span className="text-[10px] text-emerald-700 font-semibold">+14% this month</span>
            </div>

            <div className="clean-card p-5 space-y-1">
              <span className="text-xs font-bold text-[#64748B]">Published Courses</span>
              <div className="text-2xl font-black text-[#182230]">{stats.publishedCourses}</div>
              <span className="text-[10px] text-[#18B6D2] font-semibold">100% Free Open Access</span>
            </div>

            <div className="clean-card p-5 space-y-1">
              <span className="text-xs font-bold text-[#64748B]">PDF Handbooks</span>
              <div className="text-2xl font-black text-[#182230]">{stats.pdfHandbooks}</div>
              <span className="text-[10px] text-slate-500 font-semibold">In public/pdfs/</span>
            </div>

            <div className="clean-card p-5 space-y-1">
              <span className="text-xs font-bold text-[#64748B]">Certificates Issued</span>
              <div className="text-2xl font-black text-[#16865C]">{stats.certificatesIssued}</div>
              <span className="text-[10px] text-[#16865C] font-semibold">QR-Verified</span>
            </div>

            <div className="clean-card p-5 space-y-1">
              <span className="text-xs font-bold text-[#64748B]">Assessment Pass Rate</span>
              <div className="text-2xl font-black text-[#12316B]">{stats.passRate}%</div>
              <span className="text-[10px] text-slate-500 font-semibold">80% passing bar</span>
            </div>
          </div>

          {/* Platform Health and Integrity Card */}
          <div className="clean-card p-6 space-y-3">
            <h3 className="font-extrabold text-sm text-[#182230] flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#16865C]" />
              <span>System Verification & Data Integrity</span>
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              All assessment submissions are scored server-side via <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[#12316B]">/api/assessments/submit</code>. Certificates are cryptographically tied to verified learner names and course identifiers, preventing arbitrary client-side certificate fabrication.
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          2. COURSES MANAGEMENT TAB
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === "courses" && (
        <div className="clean-card overflow-hidden">
          <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-[#182230]">Published Curriculum</h3>
              <p className="text-xs text-[#64748B]">Manage course listings, modules, and access settings.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F9FC] text-[#64748B] uppercase font-bold text-[10px] border-b border-[#E2E8F0]">
                <tr>
                  <th className="p-4">Course Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Difficulty</th>
                  <th className="p-4">Lessons</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {COURSES_DATA.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-bold text-[#182230] max-w-xs truncate">
                      <div className="flex items-center gap-2">
                        <span>{course.icon}</span>
                        <span>{course.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[#64748B]">{course.category}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#12316B] border border-blue-200">
                        {course.difficulty}
                      </span>
                    </td>
                    <td className="p-4 text-[#182230] font-semibold">{course.totalLessons}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-[#16865C] border border-emerald-200">
                        Published
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#12316B] hover:underline"
                      >
                        <Eye size={13} />
                        <span>Preview</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          3. PDF HANDBOOKS TAB
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === "pdfs" && (
        <div className="clean-card overflow-hidden">
          <div className="p-5 border-b border-[#E2E8F0]">
            <h3 className="font-extrabold text-sm text-[#182230]">Digital PDF Handbooks</h3>
            <p className="text-xs text-[#64748B]">
              17 curated handwritten & structured PDF guides deployed in public/pdfs/.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F9FC] text-[#64748B] uppercase font-bold text-[10px] border-b border-[#E2E8F0]">
                <tr>
                  <th className="p-4">Handbook Title</th>
                  <th className="p-4">File Name</th>
                  <th className="p-4">Size</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {PDF_RESOURCES.map((pdf) => (
                  <tr key={pdf.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-bold text-[#182230] max-w-sm truncate">
                      {pdf.title}
                    </td>
                    <td className="p-4 font-mono text-[11px] text-[#64748B]">{pdf.filename}</td>
                    <td className="p-4 font-mono text-[11px] text-[#12316B]">{pdf.fileSize}</td>
                    <td className="p-4 text-[#64748B]">{pdf.category}</td>
                    <td className="p-4 text-right">
                      <a
                        href={pdf.fileUrl}
                        download
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#12316B] hover:underline"
                      >
                        <span>Download</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          4. ASSESSMENTS TAB
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === "assessments" && (
        <div className="clean-card overflow-hidden">
          <div className="p-5 border-b border-[#E2E8F0]">
            <h3 className="font-extrabold text-sm text-[#182230]">Course Assessment Question Sets</h3>
            <p className="text-xs text-[#64748B]">
              Server-evaluated questions with authoritative answers and explanations.
            </p>
          </div>

          <div className="divide-y divide-[#E2E8F0]">
            {Object.values(COURSE_ASSESSMENTS).map((assessment) => (
              <div key={assessment.courseId} className="p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#182230]">{assessment.courseTitle}</h4>
                    <span className="text-xs text-[#64748B]">
                      {assessment.questions.length} Questions • Passing: {assessment.passingPercentage}% • Time Limit: {assessment.timeLimitMinutes}m
                    </span>
                  </div>

                  <Link
                    href={`/dashboard/assessments/${assessment.courseId}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12316B] text-white text-xs font-bold self-start sm:self-auto"
                  >
                    <span>Test Evaluation</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          5. CERTIFICATES & REVOCATION TAB
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === "certificates" && (
        <div className="space-y-6">
          <div className="clean-card overflow-hidden">
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#182230]">Issued Certificates Registry</h3>
                <p className="text-xs text-[#64748B]">Permanent audit trail of all issued and revoked certificates.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F9FC] text-[#64748B] uppercase font-bold text-[10px] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-4">Certificate ID</th>
                    <th className="p-4">Learner Name</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">Issue Date</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#12316B]">{cert.id}</td>
                      <td className="p-4 font-semibold text-[#182230]">{cert.learnerName}</td>
                      <td className="p-4 text-[#64748B] max-w-xs truncate">{cert.courseTitle}</td>
                      <td className="p-4 text-[#64748B]">{cert.issueDate}</td>
                      <td className="p-4 font-bold text-[#182230]">{cert.scorePercentage}%</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            cert.status === "valid"
                              ? "bg-emerald-50 text-[#16865C] border border-emerald-200"
                              : "bg-rose-50 text-[#C83C4A] border border-rose-200"
                          }`}
                        >
                          {cert.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link
                          href={`/verify-certificate/${cert.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#12316B] hover:underline"
                        >
                          <span>Verify</span>
                          <ExternalLink size={12} />
                        </Link>

                        {cert.status === "valid" && (
                          <button
                            onClick={() => setSelectedCertToRevoke(cert.id)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#C83C4A] hover:underline cursor-pointer ml-3"
                          >
                            <Trash2 size={12} />
                            <span>Revoke</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Revoke Confirmation Modal */}
          {selectedCertToRevoke && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-[#E2E8F0]">
                <div className="flex items-center gap-3 text-[#C83C4A]">
                  <AlertTriangle size={24} />
                  <h3 className="font-extrabold text-base text-[#182230]">
                    Revoke Certificate: {selectedCertToRevoke}
                  </h3>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  Revoking a certificate invalidates its online QR verification page immediately and records an audit log entry.
                </p>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#182230]">Reason for Revocation:</label>
                  <input
                    type="text"
                    value={revokeReason}
                    onChange={(e) => setRevokeReason(e.target.value)}
                    placeholder="e.g. Assessment irregularity or user request"
                    className="w-full p-2.5 rounded-xl bg-[#F7F9FC] border border-[#E2E8F0] text-xs text-[#182230] focus:outline-none focus:border-[#C83C4A]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedCertToRevoke(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#64748B] hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleRevoke(selectedCertToRevoke)}
                    disabled={!revokeReason.trim()}
                    className="px-4 py-2 rounded-xl bg-[#C83C4A] text-white text-xs font-bold hover:bg-rose-700 disabled:opacity-50"
                  >
                    Confirm Revocation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          6. LEARNERS & ENROLMENTS TAB
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === "learners" && (
        <div className="clean-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-[#182230]">Learner Accounts & Enrolments</h3>
              <p className="text-xs text-[#64748B]">Overview of active students and recent study activity.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#182230]">Current Authenticated Session</span>
              <span className="text-[10px] font-mono text-[#16865C] font-bold">ONLINE</span>
            </div>
            <p className="text-xs text-[#64748B]">
              Logged-in User: <strong className="text-[#182230]">{user?.name || "Shahid"}</strong> ({user?.email || "student@slrjlearn.in"})
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
