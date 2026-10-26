"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Sparkles,
  Zap,
  ArrowRight,
  BookOpen,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Code2,
  Users,
  Compass,
} from "lucide-react";

export default function EventsComingSoonView() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() || !email) {
      setIsSubmitted(true);
      try {
        localStorage.setItem("slrj_events_notify_interest", "true");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const upcomingFeatures = [
    {
      icon: Trophy,
      color: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
      title: "Collegiate & Global Hackathons",
      description:
        "48-hour team sprints to build and ship real-world production software with evaluation by senior software architects.",
      badge: "Flagship",
    },
    {
      icon: Zap,
      color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30",
      title: "Timed Speed-Coding Sprints",
      description:
        "Head-to-head algorithmic problem-solving battles testing data structures, time complexity, and clean code under pressure.",
      badge: "Real-Time",
    },
    {
      icon: Users,
      color: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
      title: "Architect Keynotes & Masterclasses",
      description:
        "Interactive live sessions covering distributed systems, scalable architectures, and modern tech career roadmaps.",
      badge: "Live Q&A",
    },
    {
      icon: ShieldCheck,
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
      title: "Cybersecurity CTF Labs",
      description:
        "Hands-on defensive capture-the-flag challenges, web penetration testing, and security auditing tournaments.",
      badge: "Hands-On",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16 pb-20 pt-6">
      {/* ── 1. HERO COMING SOON SECTION ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#12244E] to-[#1C3B72] text-white p-8 sm:p-14 shadow-2xl border border-white/10 text-center">
        {/* Soft Ambient Background Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#18B6D2]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#18B6D2] text-xs font-black uppercase tracking-widest shadow-sm">
            <Sparkles size={14} className="text-[#18B6D2] animate-pulse" />
            <span>SLRJ Learn • Upcoming Feature</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black font-brand tracking-tight text-white leading-tight">
              Coming Soon...
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-amber-300">
              Live Events, Hackathons &amp; Coding Contests
            </p>
          </div>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            We are fine-tuning our real-time competition arenas, collegiate hackathon pipelines, and live technical workshops. Soon, you&apos;ll be able to test your mastery, build with peers, and earn exclusive verified credentials.
          </p>

          {/* Notification Signup Box */}
          <div className="pt-4 max-w-md mx-auto">
            {isSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm flex items-center justify-center gap-2.5 animate-in fade-in duration-300">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span className="font-semibold">
                  You&apos;re on the early notification list! We&apos;ll alert you when our first event launches.
                </span>
              </div>
            ) : (
              <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row items-center gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your college or personal email..."
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#18B6D2] transition-all"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#18B6D2] hover:bg-[#15a2bc] text-[#090F21] text-xs sm:text-sm font-black transition-all shadow-md shadow-[#18B6D2]/25 shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Bell size={15} />
                  <span>Notify Me</span>
                </button>
              </form>
            )}
            <p className="text-[11px] text-blue-200/70 mt-2">
              Free early registration for college learners &amp; aspiring developers.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT TO EXPECT SNEAK-PEEK ── */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            What To Expect
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-brand">
            Interactive Competitions Engineered for Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Get ready for practical engineering challenges designed to simulate real industry development cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {upcomingFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#173B70]/30 transition-all shadow-2xs hover:shadow-md space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} border flex items-center justify-center shrink-0 shadow-2xs`}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <span>Status:</span>
                  <span className="text-amber-600 font-bold">In Development</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. EXPLORE WHILE YOU WAIT ── */}
      <section className="p-8 rounded-3xl bg-slate-100 border border-slate-200 text-center space-y-5">
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
            Sharpen Your Skills While We Build
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Dive into our structured courses, practice in the live sandbox, or follow a guided career roadmap.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/courses"
            className="px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <BookOpen size={15} />
            <span>Explore Courses</span>
          </Link>

          <Link
            href="/practice"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <Terminal size={15} className="text-emerald-600" />
            <span>Live Playground</span>
          </Link>

          <Link
            href="/roadmap"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <Compass size={15} className="text-[#18B6D2]" />
            <span>Role Roadmaps</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
