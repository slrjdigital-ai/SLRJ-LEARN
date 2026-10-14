import { Metadata } from "next";
import Link from "next/link";
import {
  getAllNotes,
  getFeaturedNotes,
  getRecentNotes,
  CATEGORIES,
} from "@/data/notes";
import NoteCard from "@/components/blog/NoteCard";
import BlogHomeClient from "@/components/blog/BlogHomeClient";
import {
  BookOpen,
  Sparkles,
  Compass,
  ArrowRight,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SLRJ Learn — Tech & Computer Science Learning Portal",
  description:
    "Master Computer Science, Full-Stack Web Development, Data Structures & Algorithms, Python & AI, and Cloud DevOps with structured roadmaps and interactive study guides.",
  alternates: {
    canonical: "https://slrjlearn.in",
  },
  openGraph: {
    title: "SLRJ Learn — Tech & Computer Science Learning Portal",
    description:
      "Your all-in-one learning portal for Web Development, Data Structures & Algorithms, Python & AI, Cloud & DevOps, and CS Core with structured roadmaps and interactive study guides.",
    url: "https://slrjlearn.in",
    siteName: "SLRJ Learn",
    images: [{ url: "https://slrjlearn.in/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function StandaloneHomePage() {
  const allNotes = getAllNotes();
  const featuredNotes = getFeaturedNotes();
  const recentNotes = getRecentNotes(6);

  const LEARNING_HUBS = [
    {
      title: "Web & Full-Stack Development",
      badge: "Core Engineering",
      badgeStyle: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      desc: "HTML, CSS, JavaScript, React 19, Next.js, REST APIs, and modern frontend & backend architectures.",
      href: "/notes?category=Web+Fundamentals",
      icon: "🌐",
      stats: "8+ Notes • 5 Handbooks",
      topLine: "via-cyan-400",
      glow: "hover:shadow-[0_16px_40px_rgba(6,182,212,0.2)]",
      border: "hover:border-cyan-400/60",
      hoverText: "group-hover:text-cyan-300",
      actionText: "text-cyan-400",
    },
    {
      title: "Data Structures & Algorithms (DSA)",
      badge: "Coding Interviews",
      badgeStyle: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      desc: "Big-O complexity, arrays, hash maps, two pointers, binary search trees, graph BFS/DFS, and dynamic programming.",
      href: "/notes?category=Data+Structures+%26+Algorithms",
      icon: "⚡",
      stats: "2+ Notes • 1 Handbook",
      topLine: "via-amber-400",
      glow: "hover:shadow-[0_16px_40px_rgba(245,158,11,0.2)]",
      border: "hover:border-amber-400/60",
      hoverText: "group-hover:text-amber-300",
      actionText: "text-amber-400",
    },
    {
      title: "Python, Data Science & AI",
      badge: "Future of Tech",
      badgeStyle: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      desc: "Python core, idiomatic OOP, Pandas & NumPy, supervised ML, deep learning, and Generative AI LLM engineering.",
      href: "/notes?category=Python+%26+AI",
      icon: "🐍",
      stats: "2+ Notes • 1 Handbook",
      topLine: "via-emerald-400",
      glow: "hover:shadow-[0_16px_40px_rgba(16,185,129,0.2)]",
      border: "hover:border-emerald-400/60",
      hoverText: "group-hover:text-emerald-300",
      actionText: "text-emerald-400",
    },
    {
      title: "Computer Science Core & DBMS",
      badge: "Campus Placements",
      badgeStyle: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      desc: "Operating systems, process scheduling, concurrency, deadlocks, database normalization, SQL queries, and B-Trees.",
      href: "/notes?category=Computer+Science+Core",
      icon: "🖥️",
      stats: "2+ Notes • 2 Handbooks",
      topLine: "via-indigo-400",
      glow: "hover:shadow-[0_16px_40px_rgba(99,102,241,0.2)]",
      border: "hover:border-indigo-400/60",
      hoverText: "group-hover:text-indigo-300",
      actionText: "text-indigo-400",
    },
    {
      title: "Cloud Computing & DevOps",
      badge: "High Demand",
      badgeStyle: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      desc: "Linux terminal mastery, Git team workflows, Docker multi-stage builds, compose orchestration, and CI/CD automation.",
      href: "/notes?category=Cloud+%26+DevOps",
      icon: "☁️",
      stats: "1+ Note • 1 Handbook",
      topLine: "via-rose-400",
      glow: "hover:shadow-[0_16px_40px_rgba(244,63,94,0.2)]",
      border: "hover:border-rose-400/60",
      hoverText: "group-hover:text-rose-300",
      actionText: "text-rose-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080C16] text-white pt-20">

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
         ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-indigo-950/60">
        {/* Ambient Lights - Vibrant Violet & Indigo Glow */}
        <div className="absolute top-1/4 -left-20 w-[550px] h-[380px] bg-[radial-gradient(circle,_rgba(99,102,241,0.20)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-[radial-gradient(circle,_rgba(139,92,246,0.18)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-[550px] h-[380px] bg-[radial-gradient(circle,_rgba(56,189,248,0.14)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/15 via-indigo-500/15 to-cyan-500/15 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Sparkles size={14} className="text-indigo-400" />
            <span>SLRJ LEARN PORTAL • THINK. BUILD. GROW.</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-brand tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
            Master Computer Science & Tech Skills.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">
              Build Your Future.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Your all-in-one learning portal for Web Development, Data Structures & Algorithms, Python & AI, Cloud & DevOps, and Computer Science fundamentals with structured roadmaps and interactive study guides.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/notes"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-105 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen size={17} />
              <span>Explore All Notes</span>
            </Link>

            <Link
              href="/roadmap"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-white/[0.04] hover:bg-white/[0.08] text-white border border-indigo-900/60 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 active:scale-98 flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
            >
              <Compass size={17} className="text-indigo-400" />
              <span>5 Career Roadmaps</span>
            </Link>

          </div>

          {/* Trust Metric Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-indigo-950/60">
            <div className="p-4 rounded-2xl bg-[#0C0E23]/70 border border-indigo-950/60">
              <span className="block text-2xl sm:text-3xl font-black font-brand text-indigo-400">
                {allNotes.length}+
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                In-Depth Study Notes
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0C0E23]/70 border border-indigo-950/60">
              <span className="block text-2xl sm:text-3xl font-black font-brand text-cyan-400">
                {CATEGORIES.filter((c) => c !== "All").length}+
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Tech Categories
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0C0E23]/70 border border-indigo-950/60">
              <span className="block text-2xl sm:text-3xl font-black font-brand text-violet-400">
                5 Tracks
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Structured Roadmaps
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0C0E23]/70 border border-indigo-950/60">
              <span className="block text-2xl sm:text-3xl font-black font-brand text-pink-400">
                100%
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Free For Everyone
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LEARNING DOMAINS / HUBS EXPLORER
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-[#060713] border-b border-indigo-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-2">
              <Sparkles size={13} />
              <span>Learning Portal Hubs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-brand mb-3">
              Explore Learning Disciplines
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Choose your field of study. Each discipline includes comprehensive tutorials, step-by-step career roadmaps, and practical milestone projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEARNING_HUBS.map((hub, idx) => (
              <Link
                key={idx}
                href={hub.href}
                className={`relative p-6 rounded-3xl bg-[#0C0E23] border border-indigo-950/60 ${hub.border} ${hub.glow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group overflow-hidden`}
              >
                {/* Ambient Top Glow Line */}
                <div
                  className={`absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent ${hub.topLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-2.5 rounded-2xl bg-white/[0.04] border border-white/5 shadow-inner">
                      {hub.icon}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${hub.badgeStyle}`}
                    >
                      {hub.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-lg font-bold text-white ${hub.hoverText} transition-colors font-brand mb-2`}
                  >
                    {hub.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {hub.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">{hub.stats}</span>
                  <span
                    className={`${hub.actionText} group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold`}
                  >
                    <span>Enter Hub</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Search & Live Filter Component */}
      <BlogHomeClient initialNotes={allNotes} />

      {/* ══════════════════════════════════════════════════════════════
          FEATURED NOTES SECTION
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1.5">
              <Sparkles size={14} />
              <span>Editor&apos;s Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-brand">
              Featured Computer Science & Tech Notes
            </h2>
          </div>

          <Link
            href="/notes"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>View All {allNotes.length} Notes</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SUBJECT CATEGORIES GRID
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#060A14] border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-brand mb-3">
              Explore by Subject Category
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              Structured from fundamentals to modern production full-stack engineering.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.filter((c) => c !== "All").map((cat, idx) => {
              const pillMeta: Record<string, {
                icon: string;
                iconBg: string;
                iconColor: string;
                borderHover: string;
                glowHover: string;
                textHover: string;
              }> = {
                "Data Structures & Algorithms": {
                  icon: "⚡",
                  iconBg: "bg-amber-500/15 group-hover:bg-amber-500/25",
                  iconColor: "text-amber-400 group-hover:text-amber-300",
                  borderHover: "hover:border-amber-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]",
                  textHover: "group-hover:text-amber-300",
                },
                "Python & AI": {
                  icon: "🐍",
                  iconBg: "bg-emerald-500/15 group-hover:bg-emerald-500/25",
                  iconColor: "text-emerald-400 group-hover:text-emerald-300",
                  borderHover: "hover:border-emerald-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]",
                  textHover: "group-hover:text-emerald-300",
                },
                "Computer Science Core": {
                  icon: "🖥️",
                  iconBg: "bg-indigo-500/15 group-hover:bg-indigo-500/25",
                  iconColor: "text-indigo-400 group-hover:text-indigo-300",
                  borderHover: "hover:border-indigo-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(99,102,241,0.2)]",
                  textHover: "group-hover:text-indigo-300",
                },
                "Cloud & DevOps": {
                  icon: "☁️",
                  iconBg: "bg-rose-500/15 group-hover:bg-rose-500/25",
                  iconColor: "text-rose-400 group-hover:text-rose-300",
                  borderHover: "hover:border-rose-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]",
                  textHover: "group-hover:text-rose-300",
                },
                "Web Fundamentals": {
                  icon: "🌐",
                  iconBg: "bg-cyan-500/15 group-hover:bg-cyan-500/25",
                  iconColor: "text-cyan-400 group-hover:text-cyan-300",
                  borderHover: "hover:border-cyan-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)]",
                  textHover: "group-hover:text-cyan-300",
                },
                "HTML": {
                  icon: "🧱",
                  iconBg: "bg-orange-500/15 group-hover:bg-orange-500/25",
                  iconColor: "text-orange-400 group-hover:text-orange-300",
                  borderHover: "hover:border-orange-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(249,115,22,0.2)]",
                  textHover: "group-hover:text-orange-300",
                },
                "CSS": {
                  icon: "🎨",
                  iconBg: "bg-blue-500/15 group-hover:bg-blue-500/25",
                  iconColor: "text-blue-400 group-hover:text-blue-300",
                  borderHover: "hover:border-blue-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]",
                  textHover: "group-hover:text-blue-300",
                },
                "JavaScript": {
                  icon: "⚡",
                  iconBg: "bg-yellow-500/15 group-hover:bg-yellow-500/25",
                  iconColor: "text-yellow-400 group-hover:text-yellow-300",
                  borderHover: "hover:border-yellow-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(234,179,8,0.2)]",
                  textHover: "group-hover:text-yellow-300",
                },
                "Git & GitHub": {
                  icon: "🐙",
                  iconBg: "bg-rose-500/15 group-hover:bg-rose-500/25",
                  iconColor: "text-rose-400 group-hover:text-rose-300",
                  borderHover: "hover:border-rose-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]",
                  textHover: "group-hover:text-rose-300",
                },
                "React": {
                  icon: "⚛️",
                  iconBg: "bg-sky-500/15 group-hover:bg-sky-500/25",
                  iconColor: "text-sky-400 group-hover:text-sky-300",
                  borderHover: "hover:border-sky-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(14,165,233,0.2)]",
                  textHover: "group-hover:text-sky-300",
                },
                "Next.js": {
                  icon: "▲",
                  iconBg: "bg-teal-500/15 group-hover:bg-teal-500/25",
                  iconColor: "text-teal-400 group-hover:text-teal-300",
                  borderHover: "hover:border-teal-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(20,184,166,0.2)]",
                  textHover: "group-hover:text-teal-300",
                },
                "Backend & Databases": {
                  icon: "🗄️",
                  iconBg: "bg-violet-500/15 group-hover:bg-violet-500/25",
                  iconColor: "text-violet-400 group-hover:text-violet-300",
                  borderHover: "hover:border-violet-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)]",
                  textHover: "group-hover:text-violet-300",
                },
                "Deployment": {
                  icon: "🚀",
                  iconBg: "bg-lime-500/15 group-hover:bg-lime-500/25",
                  iconColor: "text-lime-400 group-hover:text-lime-300",
                  borderHover: "hover:border-lime-400/60",
                  glowHover: "hover:shadow-[0_10px_30px_rgba(132,204,22,0.2)]",
                  textHover: "group-hover:text-lime-300",
                },
              };

              const meta = pillMeta[cat] || {
                icon: "💻",
                iconBg: "bg-cyan-500/15 group-hover:bg-cyan-500/25",
                iconColor: "text-cyan-400 group-hover:text-cyan-300",
                borderHover: "hover:border-cyan-400/60",
                glowHover: "hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)]",
                textHover: "group-hover:text-cyan-300",
              };

              return (
                <Link
                  key={idx}
                  href={`/notes?category=${encodeURIComponent(cat)}`}
                  className={`p-5 rounded-2xl bg-[#0D1527] hover:bg-[#111C35] border border-slate-800 ${meta.borderHover} ${meta.glowHover} transition-all text-center group`}
                >
                  <div
                    className={`w-12 h-12 mx-auto rounded-2xl ${meta.iconBg} ${meta.iconColor} border border-white/5 flex items-center justify-center text-xl mb-3 transition-colors shadow-sm`}
                  >
                    <span>{meta.icon}</span>
                  </div>
                  <h3
                    className={`text-sm font-bold text-white ${meta.textHover} transition-colors font-brand`}
                  >
                    {cat}
                  </h3>
                  <span className="text-[11px] font-mono text-gray-500 mt-1 block">
                    Explore Topic
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════
          ROADMAP CALLOUT BANNER
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0D1527] via-[#101D38] to-[#0D1527] border border-cyan-500/25 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Compass size={14} className="text-cyan-400" />
              <span>Interactive 12-Step Roadmap</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-brand tracking-tight mb-3">
              Follow the Step-by-Step Developer Roadmap
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Don&apos;t learn in random tutorials. Follow a proven curriculum from internet foundations to HTML, CSS, JavaScript, React, Next.js, APIs, and real-world projects with persistent progress tracking.
            </p>
          </div>

          <Link
            href="/roadmap"
            className="flex-shrink-0 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-black shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300 hover:scale-105 active:scale-98 flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Full Roadmap</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          RECENTLY PUBLISHED NOTES SECTION
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1.5">
              <Layers size={14} />
              <span>Latest Additions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-brand">
              Recently Published Notes
            </h2>
          </div>

          <Link
            href="/notes"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>View All Notes</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </section>


    </div>
  );
}
