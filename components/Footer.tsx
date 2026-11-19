"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Send,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  Users,
  Mail,
  Activity,
  ArrowUpRight,
  Code,
  BookOpen,
  Award,
} from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";

let cachedSubscriberCount: number | null = null;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscriberCount, setSubscriberCount] = useState<number>(cachedSubscriberCount ?? 0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  useEffect(() => {
    if (cachedSubscriberCount !== null) {
      setSubscriberCount(cachedSubscriberCount);
      return;
    }

    // Fetch live subscriber count from API
    fetch("/api/newsletter")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && typeof data.count === "number") {
          cachedSubscriberCount = data.count;
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
          setFeedbackMsg("You're already subscribed to our tech dispatch!");
        } else {
          setStatus("success");
          setFeedbackMsg("Welcome aboard! Check your inbox for confirmation.");
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
      title: "Explore Curriculum",
      links: [
        { name: "All Courses", href: "/courses" },
        { name: "Career Roadmaps (8 Tracks)", href: "/roadmap" },
        { name: "Coding Playground", href: "/practice" },
        { name: "Engineering Notes & PDFs", href: "/notes" },
        { name: "C Systems Architecture", href: "/courses" },
      ],
    },
    {
      title: "Assessments & Credentials",
      links: [
        { name: "Daily Learning Hub", href: "/gamification" },
        { name: "Verified Certificates", href: "/certificates" },
        { name: "Certificate Verification", href: "/verify-certificate/demo" },
        { name: "Student Dashboard", href: "/dashboard" },
        { name: "Skill Milestones & XP", href: "/gamification" },
      ],
    },
    {
      title: "Company & Trust",
      links: [
        { name: "About SLRJ Learn", href: "/about" },
        { name: "Contact & Support", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
        { name: "System Architecture", href: "/about" },
      ],
    },
  ];

  return (
    <footer
      className="relative bg-[#070D1E] text-slate-200 pt-20 pb-24 sm:pb-32 overflow-hidden select-none border-t border-slate-800/80 shadow-2xl"
      suppressHydrationWarning
    >
      {/* ─── 1. Ultra-Luminous Top Gradient Accent Bar ─── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_24px_rgba(6,182,212,0.8)]" />
      <div className="absolute top-[2px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* ─── 2. Tech Blueprint SVG Grid Pattern Background ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(14, 165, 233, 0.22) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at 50% 10%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 10%, black 40%, transparent 90%)",
        }}
      />

      {/* ─── 3. Ambient Lighting Glow Orbs ─── */}
      <div className="absolute -top-32 -left-20 w-[550px] h-[350px] bg-blue-600/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-0 w-[550px] h-[380px] bg-cyan-500/12 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* ══════════════════════════════════════════════════════════════
            NEWSLETTER & DISPATCH CALLOUT (Frosted Tech Card)
           ══════════════════════════════════════════════════════════════ */}
        <div className="pb-14 mb-14 border-b border-white/[0.08]">
          <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-white/[0.06] via-slate-900/60 to-white/[0.02] border border-white/10 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl backdrop-blur-xl">
            {/* Ambient Corner Accent */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl text-center lg:text-left relative z-10">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-bold text-cyan-300 tracking-wider uppercase">
                  <Sparkles size={13} className="text-cyan-400" />
                  Weekly Tech Dispatch
                </span>

                {/* Live Subscriber Count Pill */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-slate-300 backdrop-blur-md"
                  suppressHydrationWarning
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <Users size={12} className="text-cyan-400" />
                  <span suppressHydrationWarning>
                    {subscriberCount > 0 ? (
                      <>
                        <strong className="text-white font-extrabold">{subscriberCount.toLocaleString()}</strong> Active Learners
                      </>
                    ) : (
                      <>Join 2,400+ Active Learners</>
                    )}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-brand tracking-tight">
                Learn Skills. Build Projects. Grow Your Future.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
                Receive curated computer science notes, practical project walkthroughs, and updates on new verified certification courses directly in your inbox.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <div className="w-full lg:w-auto flex-shrink-0 flex flex-col items-center lg:items-end relative z-10">
              <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3" suppressHydrationWarning>
                <div className="relative w-full sm:w-80">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    disabled={status === "loading"}
                    suppressHydrationWarning
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-60 shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  suppressHydrationWarning
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-slate-950" />
                      <span>Subscribing...</span>
                    </>
                  ) : status === "success" || status === "already" ? (
                    <>
                      <CheckCircle2 size={16} className="text-slate-950" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send size={14} className="text-slate-950" />
                    </>
                  )}
                </button>
              </form>

              {/* Status message feedback */}
              {feedbackMsg && (
                <div
                  className={`mt-2.5 text-xs font-semibold flex items-center gap-1.5 self-center lg:self-start ${
                    status === "success" || status === "already" ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  <Sparkles size={12} />
                  <span>{feedbackMsg}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MAIN FOOTER GRID: BRAND + CURRICULUM + ASSESSMENTS + COMPANY
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 mb-14">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link
              href="/"
              className="inline-block mb-4 group"
              title="SLRJ Learn"
            >
              <div className="relative">
                <Image
                  src="/logo-white.png"
                  alt="SLRJ Learn"
                  width={180}
                  height={52}
                  className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-all duration-300"
                  priority
                />
              </div>
            </Link>

            <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-extrabold text-xs tracking-wider uppercase mb-3">
              Learn Skills. Build Projects. Grow Your Future.
            </p>

            <p className="text-slate-300 text-[14px] sm:text-[15px] leading-relaxed mb-6 max-w-md">
              SLRJ Learn is an online learning platform providing PDF-based courses, digital handwritten notes, structured career roadmaps, hands-on programming challenges, and verifiable completion certificates.
            </p>

            {/* Badges & Trust Metrics */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-semibold text-slate-200 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>100% Free Learning Resources &bull; Verified Certificates</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-xs font-medium text-emerald-300">
                <Activity size={12} className="text-emerald-400" />
                <span>All Systems Operational</span>
              </div>
            </div>

            {/* Developer Community & Social Links */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/slrjdigital-ai"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all duration-200"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all duration-200"
              >
                <LinkedinIcon size={18} />
              </a>
              <Link
                href="/contact"
                title="Contact Support"
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all duration-200"
              >
                <Mail size={18} />
              </Link>
              <Link
                href="/practice"
                title="Coding Playground"
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all duration-200"
              >
                <Code size={18} />
              </Link>
            </div>
          </div>

          {/* Nav Sections (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {navSections.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-white font-extrabold text-xs tracking-wider uppercase mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-cyan-300 font-medium hover:translate-x-1.5 transition-all duration-200 text-sm flex items-center gap-1.5 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM LEGAL & PARENT BRAND
           ══════════════════════════════════════════════════════════════ */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1.5 sm:gap-2 text-center md:text-left">
            <span>&copy; {currentYear} SLRJ Learn. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <span className="text-slate-300 font-medium">
              An educational initiative of{" "}
              <span className="text-cyan-400 font-bold hover:underline cursor-pointer">
                SLRJ Digital
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-cyan-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700">&bull;</span>
            <Link href="/terms-and-conditions" className="hover:text-cyan-300 transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-700">&bull;</span>
            <Link
              href="/verify-certificate/demo"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold text-xs px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 transition-colors"
            >
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Authentic Certificate Verification</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
