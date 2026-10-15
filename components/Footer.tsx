"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sparkles, Send, CheckCircle2, ShieldCheck, Heart, Loader2, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscriberCount, setSubscriberCount] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  useEffect(() => {
    // Fetch live subscriber count from API
    fetch("/api/newsletter")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && typeof data.count === "number") {
          setSubscriberCount(data.count);
        }
      })
      .catch((err) => console.log("Subscriber count fetch error:", err));
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setFeedbackMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data?.success) {
        if (typeof data.count === "number") {
          setSubscriberCount(data.count);
        }
        if (data.alreadySubscribed) {
          setStatus("already");
          setFeedbackMsg("You're already subscribed to our dispatch!");
        } else {
          setStatus("success");
          setFeedbackMsg("Welcome aboard! A confirmation has been dispatched.");
          setEmail("");
        }
      } else {
        setStatus("error");
        setFeedbackMsg(data?.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedbackMsg("Connection issue. Please try again later.");
    }

    setTimeout(() => {
      setStatus("idle");
      setFeedbackMsg("");
    }, 6000);
  };

  const navSections = [
    {
      title: "Learning Platform",
      links: [
        { name: "Career Learning Paths", href: "/roadmap" },
        { name: "Free Developer Notes", href: "/notes" },
        { name: "Code Playground & Practice", href: "/practice" },
        { name: "Real-World Projects", href: "/projects" },
        { name: "Lumio AI Chatbot", href: "/ai-tutor" },
      ],
    },
    {
      title: "Core Curriculum",
      links: [
        { name: "Web Development", href: "/courses/web-development-foundations" },
        { name: "Python Programming", href: "/courses/python-programming-mastery" },
        { name: "JavaScript & TypeScript", href: "/courses/modern-javascript-typescript" },
        { name: "Data Structures & Algorithms", href: "/courses/data-structures-and-algorithms" },
        { name: "SQL & Databases", href: "/courses/sql-and-relational-databases" },
      ],
    },
    {
      title: "Community & Career",
      links: [
        { name: "Student Community Forum", href: "/community" },
        { name: "Certificates & Mock Interviews", href: "/certificates" },
        { name: "About SLRJ Learn", href: "/about" },
        { name: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#060A14] border-t border-slate-800 pt-20 pb-28 sm:pb-36 lg:pb-40 overflow-hidden select-none" suppressHydrationWarning>
      {/* ── Top Multi-Stop Laser Accent Line ──────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 via-teal-400/50 via-emerald-400/60 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.3)]" />

      {/* ── Ambient Background Lighting ───────────────────────────────── */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[radial-gradient(circle,_rgba(6,182,212,0.08)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-[radial-gradient(circle,_rgba(16,185,129,0.06)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* ══════════════════════════════════════════════════════════════
            PRE-FOOTER CALLOUT / NEWSLETTER BAR
           ══════════════════════════════════════════════════════════════ */}
        <div className="pb-16 mb-16 border-b border-slate-800">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1527] border border-slate-800 backdrop-blur-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            {/* Ambient interior flare */}
            <div className="absolute top-0 right-1/4 w-72 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="max-w-xl text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-2.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 tracking-[0.25em] uppercase">
                  <Sparkles size={12} className="text-cyan-400" />
                  Developer Dispatch
                </span>

                {/* Live Subscriber Count Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-md" suppressHydrationWarning>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <Users size={12} className="text-cyan-300" />
                  <span suppressHydrationWarning>
                    {subscriberCount > 0 ? (
                      <>
                        <strong className="text-white font-extrabold">{subscriberCount.toLocaleString()}</strong> Active Subscribers
                      </>
                    ) : (
                      <>Bi-Weekly Engineering Dispatch</>
                    )}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-brand tracking-tight">
                Accelerate Your Engineering Career
              </h3>
              <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                {subscriberCount > 0 ? (
                  <>
                    Join <span className="text-white font-semibold">{subscriberCount.toLocaleString()}+</span> students, aspiring developers, and engineers receiving weekly web dev notes and architecture breakdowns.
                  </>
                ) : (
                  <>
                    Join students, aspiring developers, and engineers receiving weekly web dev notes and architecture breakdowns.
                  </>
                )}
              </p>
            </div>

            {/* Newsletter Input & Status */}
            <div className="w-full lg:w-auto flex-shrink-0 flex flex-col items-center lg:items-end">
              <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3" suppressHydrationWarning>
                <div className="relative w-full sm:w-80">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email..."
                    required
                    disabled={status === "loading"}
                    suppressHydrationWarning
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all backdrop-blur-md disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  suppressHydrationWarning
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white" />
                      <span>Joining...</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 size={16} className="text-emerald-300" />
                      <span className="text-emerald-200">Subscribed!</span>
                    </>
                  ) : status === "already" ? (
                    <>
                      <CheckCircle2 size={16} className="text-cyan-300" />
                      <span className="text-cyan-200">Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>

              {/* Status message */}
              {feedbackMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-2.5 text-xs font-mono font-medium flex items-center gap-1.5 self-center lg:self-start ${
                    status === "success"
                      ? "text-emerald-400"
                      : status === "already"
                      ? "text-cyan-400"
                      : "text-rose-400"
                  }`}
                >
                  <Sparkles size={12} />
                  <span>{feedbackMsg}</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MAIN FOOTER GRID: BRAND + 3 LINK COLUMNS + STATUS
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-black tracking-tight font-brand flex items-center gap-2.5 mb-4 group"
            >
              <Image
                src="/logo.png"
                alt="SLRJ Learn Logo"
                width={46}
                height={46}
                unoptimized
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain filter drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:scale-105 transition-transform duration-300"
              />
              <span className="flex">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-teal-400 to-emerald-500">
                  SL
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 ml-[-0.05em]">
                  RJ
                </span>
              </span>
              <span className="text-white text-sm sm:text-base font-bold tracking-[0.3em] font-brand mt-0.5">
                LEARN
              </span>
            </Link>

            <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-bold text-xs tracking-[0.25em] uppercase mb-1 font-mono">
              Think. Build. Grow.
            </p>

            <p className="text-gray-400 text-xs font-mono tracking-wider uppercase mb-4">
              Free Web Development & Tech Learning Platform
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              We empower aspiring developers and students with practical web development notes, step-by-step programming tutorials, interactive learning roadmaps, and structured study resources.
            </p>

            {/* Operational System Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>100% Free Learning Resources &bull; Open Access</span>
            </div>
          </div>

          {/* Nav Sections (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {navSections.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-white font-bold text-sm tracking-wider uppercase font-mono mb-4 flex items-center gap-2">
                  <span className="text-cyan-400 text-xs">{"//"}</span>
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-xs sm:text-sm block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            GIANT BRAND WATERMARK (Official Agency Signature)
           ══════════════════════════════════════════════════════════════ */}
        <div className="relative w-full py-4 overflow-hidden flex items-center justify-center opacity-[0.045] pointer-events-none select-none">
          <span className="text-[14vw] font-black tracking-tighter leading-none font-brand whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            SLRJ LEARN
          </span>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM LEGAL & METRIC BAR
           ══════════════════════════════════════════════════════════════ */}
        <div className="border-t border-slate-800 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500 px-2 sm:px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1.5 sm:gap-2 text-center md:text-left">
            <span>&copy; {currentYear} SLRJ Learn. All rights reserved.</span>
            <span className="hidden sm:inline text-gray-700">&bull;</span>
            <span className="text-gray-400 flex items-center gap-1">
              Engineered with <Heart size={11} className="text-emerald-400 inline fill-emerald-400" /> for Developers
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-400">
            <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">&bull;</span>
            <Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-700">&bull;</span>
            <span className="text-emerald-400 flex items-center gap-1 font-mono text-xs">
              <ShieldCheck size={13} className="text-emerald-500" />
              Verified Learning Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
