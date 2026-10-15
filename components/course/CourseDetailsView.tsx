"use client";

import { useState } from "react";
import Link from "next/link";
import { Course } from "@/data/courses";
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Layers,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Download,
} from "lucide-react";

interface CourseDetailsViewProps {
  course: Course;
}

export default function CourseDetailsView({ course }: CourseDetailsViewProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || ""]: true,
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const firstLessonId = course.modules[0]?.lessons[0]?.id || "intro";
  const startLearningHref = `/learn/${course.id}/${firstLessonId}`;

  // Find associated PDF if available
  const associatedPdf =
    course.category === "Web Development"
      ? { title: "HTML5 & Web Fundamentals Handbook", url: "/pdfs/html5-complete-notes.pdf", size: "4.8 MB" }
      : course.category === "Data Structures and Algorithms"
      ? { title: "DSA Complete Handbook", url: "/pdfs/dsa-complete-handbook.pdf", size: "5.5 KB" }
      : course.category === "Python Programming"
      ? { title: "Python & AI Essentials Guide", url: "/pdfs/python-ai-essentials.pdf", size: "5.5 KB" }
      : course.category === "SQL and Databases"
      ? { title: "DBMS & SQL Cheatsheet", url: "/pdfs/dbms-sql-cheatsheet.pdf", size: "5.4 KB" }
      : { title: "Modern JavaScript & Architecture Guide", url: "/pdfs/javascript-modern-guide.pdf", size: "5.7 KB" };

  return (
    <div className="space-y-10 pb-20">
      {/* ── Breadcrumbs & Back ── */}
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <Link href="/courses" className="hover:text-[#12316B] transition-colors">
          Courses
        </Link>
        <span>/</span>
        <span className="text-[#12316B] font-semibold">{course.category}</span>
        <span>/</span>
        <span className="text-[#182230] font-bold truncate max-w-xs">{course.title}</span>
      </div>

      {/* ── Hero Banner ── */}
      <section className="rounded-3xl bg-gradient-to-br from-[#12316B] via-[#1A3D80] to-[#2456A6] text-white p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#18B6D2]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-xs font-bold uppercase tracking-wider">
                {course.category}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 uppercase tracking-wider">
                100% Free Access
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                +{course.totalXp} XP
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-brand tracking-tight text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              {course.shortDescription}
            </p>

            {/* Quick Meta Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#18B6D2]" />
                <span>{course.estimatedDuration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen size={15} className="text-[#18B6D2]" />
                <span>{course.totalLessons} Structured Lessons</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={15} className="text-emerald-300" />
                <span>Verifiable Certificate on Completion</span>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 text-[#182230] shadow-2xl space-y-5 border border-[#E2E8F0]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-[#64748B] uppercase">Tuition</span>
                <span className="text-2xl font-black text-[#16865C]">Free</span>
              </div>

              <div className="space-y-2.5 text-xs text-[#64748B]">
                <div className="flex items-center justify-between">
                  <span>Difficulty:</span>
                  <strong className="text-[#182230]">{course.difficulty}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Modules:</span>
                  <strong className="text-[#182230]">{course.modules.length} Modules</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Certificate:</span>
                  <strong className="text-[#12316B]">Verified (QR-Linked)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Included Handbooks:</span>
                  <strong className="text-[#12316B]">PDF Included</strong>
                </div>
              </div>

              <Link
                href={startLearningHref}
                className="w-full py-3.5 rounded-xl bg-[#12316B] hover:bg-[#2456A6] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#12316B]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Enrol & Start Learning</span>
                <ArrowRight size={16} />
              </Link>

              <p className="text-[11px] text-center text-[#64748B]">
                Instant self-paced access • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Details Grid (2 Columns) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Syllabus, Outcomes & Rules */}
        <div className="lg:col-span-8 space-y-8">
          {/* Learning Outcomes */}
          <section className="clean-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-extrabold text-[#182230] flex items-center gap-2">
              <Sparkles size={18} className="text-[#18B6D2]" />
              <span>What You Will Master</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.skillsGained.map((skill, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#182230]">
                  <CheckCircle2 size={16} className="text-[#16865C] flex-shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Course Curriculum & Syllabus */}
          <section className="clean-card p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-[#182230] flex items-center gap-2">
                  <Layers size={18} className="text-[#12316B]" />
                  <span>Course Curriculum</span>
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  {course.modules.length} Modules • {course.totalLessons} Lessons
                </p>
              </div>

              <button
                onClick={() => {
                  const allExpanded = Object.keys(expandedModules).length === course.modules.length;
                  if (allExpanded) {
                    setExpandedModules({});
                  } else {
                    const all: Record<string, boolean> = {};
                    course.modules.forEach((m) => (all[m.id] = true));
                    setExpandedModules(all);
                  }
                }}
                className="text-xs font-bold text-[#12316B] hover:underline cursor-pointer"
              >
                Toggle All
              </button>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod, modIdx) => {
                const isOpen = !!expandedModules[mod.id];
                return (
                  <div
                    key={mod.id}
                    className="rounded-xl border border-[#E2E8F0] overflow-hidden transition-all bg-[#F7F9FC]"
                  >
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center font-bold text-xs text-[#12316B]">
                          {modIdx + 1}
                        </span>
                        <div>
                          <h3 className="font-bold text-sm text-[#182230]">{mod.title}</h3>
                          <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">{mod.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
                          {mod.lessons.length} Lessons
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-[#64748B] transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-3 divide-y divide-slate-100 bg-white">
                        {mod.lessons.map((lesson, lIdx) => (
                          <Link
                            key={lesson.id}
                            href={`/learn/${course.id}/${lesson.id}`}
                            className="py-3 flex items-center justify-between text-xs hover:text-[#12316B] group transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <BookOpen size={14} className="text-slate-400 group-hover:text-[#12316B]" />
                              <span className="font-semibold text-[#182230] group-hover:text-[#12316B]">
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[#64748B]">
                              <span>{lesson.duration}</span>
                              <span className="text-[10px] font-bold text-[#18B6D2]">+{lesson.xpReward} XP</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Assessment & Certificate Rules */}
          <section className="clean-card p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-extrabold text-[#182230] flex items-center gap-2">
              <Award size={18} className="text-[#12316B]" />
              <span>Assessment & Certificate Eligibility</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#64748B] leading-relaxed">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 space-y-2">
                <h4 className="font-bold text-xs text-[#12316B] uppercase tracking-wider">
                  Official SLRJ Learn Verification Standards
                </h4>
                <p className="text-xs text-[#182230]">
                  To guarantee industry credibility, certificates are issued only when both of the following server-verified conditions are met:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#182230]">
                  <li><strong>100% Lesson Completion:</strong> All {course.totalLessons} lessons must be completed.</li>
                  <li><strong>Server-Scored Assessment:</strong> You must achieve an <strong>80% or higher</strong> score on the final evaluation.</li>
                </ul>
              </div>

              <p>
                Upon passing, you will receive an authentic landscape certificate with an unalterable certificate identifier (e.g. <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs text-[#12316B]">SLRJ-CERT-2026-WD101</code>) and a public QR verification code.
              </p>
            </div>
          </section>
        </div>

        {/* Right 4 Cols: Prerequisites, Materials, Instructor */}
        <div className="lg:col-span-4 space-y-6">
          {/* Included PDF Resource */}
          <div className="clean-card p-6 space-y-4">
            <h3 className="font-extrabold text-sm text-[#182230] flex items-center gap-2">
              <FileText size={16} className="text-[#12316B]" />
              <span>Included Study Handbooks</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E2E8F0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#182230]">{associatedPdf.title}</span>
                <span className="text-[10px] text-[#64748B] font-mono">{associatedPdf.size}</span>
              </div>
              <p className="text-[11px] text-[#64748B]">
                Handwritten & structured reference manual included with this course.
              </p>
              <a
                href={associatedPdf.url}
                download
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12316B] hover:underline pt-1"
              >
                <Download size={13} />
                <span>Download Handbook (PDF)</span>
              </a>
            </div>
          </div>

          {/* Prerequisites */}
          <div className="clean-card p-6 space-y-3">
            <h3 className="font-extrabold text-sm text-[#182230] flex items-center gap-2">
              <GraduationCap size={16} className="text-[#12316B]" />
              <span>Prerequisites</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#64748B]">
              {course.prerequisites.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#18B6D2] flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Instructor / Authority */}
          <div className="clean-card p-6 space-y-3">
            <h3 className="font-extrabold text-sm text-[#182230] flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#16865C]" />
              <span>Academic Authority</span>
            </h3>
            <div className="space-y-1">
              <div className="font-bold text-xs text-[#182230]">SLRJ Learn Academic Team</div>
              <div className="text-xs text-[#64748B]">Curated by Kouluri Shahid & Senior Engineering Mentors</div>
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Curriculum engineered adhering to modern industry standards, clear architectural patterns, and real-world software practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
