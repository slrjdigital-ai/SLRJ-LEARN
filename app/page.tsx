import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllCourses, LEARNING_CATEGORIES } from "@/data/courses";
import { PRACTICAL_PROJECTS } from "@/data/projectsData";
import { COMMUNITY_THREADS, STUDENT_SHOWCASES } from "@/data/community";
import InteractiveCodePreview from "@/components/InteractiveCodePreview";
import {
  BookOpen,
  Sparkles,
  Compass,
  ArrowRight,
  Code2,
  Terminal,
  Layers,
  Award,
  Users,
  CheckCircle2,
  ExternalLink,
  Bot,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SLRJ Learn — Next-Generation Coding Education Platform",
  description:
    "Master programming through interactive lessons, real-time coding practice, AI-powered guidance, and projects that turn knowledge into skills.",
};

export default function HomePage() {
  const courses = getAllCourses();
  const featuredCourses = courses.slice(0, 4);
  const featuredProjects = PRACTICAL_PROJECTS.slice(0, 4);
  const featuredDiscussions = COMMUNITY_THREADS.slice(0, 3);

  const learningSteps = [
    {
      step: "01",
      title: "Learn a Concept",
      desc: "Deconstruct complex computer science & programming principles with visual diagrams, beginner explanations, and syntax examples.",
      icon: "📖",
    },
    {
      step: "02",
      title: "Practice with Code",
      desc: "Solidify theory with interactive browser exercises, fill-in-the-blank challenges, and immediate feedback in our sandboxed playground.",
      icon: "⚡",
    },
    {
      step: "03",
      title: "Build a Project",
      desc: "Turn knowledge into skills by engineering portfolio-grade web applications, weather dashboards, APIs, and AI assistants from starter files.",
      icon: "🛠️",
    },
    {
      step: "04",
      title: "Showcase Your Skills",
      desc: "Submit your GitHub repositories to the student showcase, unlock verified digital certificates, and prepare for technical interviews.",
      icon: "🏆",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-20 overflow-x-hidden">
      {/* ══════════════════════════════════════════════════════════════
          1. HERO SECTION WITH EMBEDDED CODE EDITOR PREVIEW
         ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-white/[0.08] overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-[radial-gradient(circle,_rgba(6,182,212,0.12)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(circle,_rgba(16,185,129,0.08)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase mb-6 shadow-sm shadow-cyan-500/10">
                <Sparkles size={14} className="text-cyan-400" />
                <span>Next-Gen Coding Education Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-brand tracking-tight text-white mb-6 leading-tight">
                Learn to Code. Build Real Projects.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  Create Your Future.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed font-normal max-w-xl">
                Master programming through interactive lessons, real-time coding practice, AI-powered guidance, and projects that turn knowledge into skills.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <BookOpen size={17} />
                  <span>Start Learning Free</span>
                </Link>

                <Link
                  href="/courses"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 backdrop-blur-md"
                >
                  <Compass size={17} className="text-cyan-400" />
                  <span>Explore Courses</span>
                </Link>
              </div>

              {/* Trust Metric Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md">
                <div>
                  <span className="text-xl sm:text-2xl font-black font-brand text-cyan-400 block">
                    12+
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Disciplines</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black font-brand text-emerald-400 block">
                    100%
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Interactive</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black font-brand text-purple-400 block">
                    24/7
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">AI Tutoring</span>
                </div>
              </div>
            </div>

            {/* Right Live Editor Preview (6 Cols) */}
            <div className="lg:col-span-6 w-full">
              <InteractiveCodePreview />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. 12 LEARNING CATEGORIES
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#050814] border-b border-white/[0.08]">
        <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
              <Code2 size={13} />
              <span>Full-Spectrum Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-brand mb-3">
              Explore Learning Categories
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              From web foundations to artificial intelligence, choose your domain and progress with step-by-step guidance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {LEARNING_CATEGORIES.map((category, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-3xl bg-[#080D1A] border border-white/10 hover:border-cyan-500/40 p-5 shadow-xl hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(6,182,212,0.12)] transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl p-2 rounded-2xl bg-white/5 border border-white/5">
                      {category.icon}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold uppercase">
                      {category.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-brand mb-1.5">
                    {category.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {category.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">{category.badge}</span>
                  <Link
                    href={`/courses/${category.slug}`}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Explore</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. HOW LEARNING WORKS (4-STEP JOURNEY)
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-2">
              <Zap size={13} />
              <span>Proven Pedagogy</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-brand mb-3">
              How Learning Works at SLRJ Learn
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A structured 4-step framework designed to take you from initial curiosity to confident, production-ready developer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningSteps.map((st, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{st.icon}</span>
                    <span className="text-2xl font-black font-brand text-cyan-400/40">
                      {st.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-brand mb-2">
                    {st.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. FEATURED COURSES
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#050814] border-b border-white/[0.08]">
        <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
                <BookOpen size={13} />
                <span>Popular Curricula</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-brand">
                Featured Courses
              </h2>
            </div>
            <Link
              href="/courses"
              className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View all courses</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-3xl bg-[#080D1A] border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between shadow-xl transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl p-2 rounded-2xl bg-white/5 border border-white/5">
                      {course.icon}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                      +{course.totalXp} XP
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-brand mb-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {course.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    {course.estimatedDuration} • {course.totalLessons} Lessons
                  </span>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all flex items-center gap-1 shadow-md shadow-cyan-500/20"
                  >
                    <span>Start Course</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. PROJECTS SHOWCASE
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-2">
                <Terminal size={13} />
                <span>Hands-On Engineering</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-brand">
                Real-World Practical Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Explore all projects</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl bg-[#080D1A] border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between shadow-xl transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-bold uppercase">
                      {p.category}
                    </span>
                    <span className="text-xs font-mono text-amber-300 font-bold">
                      +{p.xpReward} XP
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-brand mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{p.estimatedTime}</span>
                  <Link
                    href="/projects"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    View Starter Code
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. LEARNING COMMUNITY PREVIEW
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#050814] border-b border-white/[0.08]">
        <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
                <Users size={13} />
                <span>Collaborative Coding</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-brand">
                Student & Mentor Community
              </h2>
            </div>
            <Link
              href="/community"
              className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Join community discussions</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDiscussions.map((thread) => (
              <div
                key={thread.id}
                className="p-6 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white">{thread.authorName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300">
                      {thread.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-brand mb-2">
                    {thread.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4">
                    {thread.content}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{thread.upvotes} Upvotes • {thread.commentsCount} Answers</span>
                  <Link href="/community" className="text-cyan-400 font-bold hover:underline">
                    Read Answers &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. FINAL CTA SECTION
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12 text-center relative">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#091124] to-emerald-950/40 border border-cyan-500/25 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black font-brand tracking-tight text-white mb-4">
              Your Coding Journey Starts Today.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed font-normal">
              Join thousands of learners mastering web development, algorithms, Python, and AI. Start coding right inside your browser for free.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/25"
            >
              <span>Create Your Free Account</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
