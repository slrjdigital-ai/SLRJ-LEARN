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
      title: "Explore Curriculum",
      links: [
        { name: "All Courses", href: "/courses" },
        { name: "Career Roadmaps (8 Tracks)", href: "/roadmap" },
        { name: "Coding Playground", href: "/practice" },
      ],
    },
    {
      title: "Assessments & Credentials",
      links: [
        { name: "Daily Learning Hub", href: "/gamification" },
        { name: "Verified Certificates", href: "/certificates" },
        { name: "Certificate Verification", href: "/verify-certificate/demo" },
        { name: "Student Dashboard", href: "/dashboard" },
      ],
    },
    {
      title: "Company & Trust",
      links: [
        { name: "About SLRJ Learn", href: "/about" },
        { name: "Contact & Support", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
      ],
    },
  ];

  return (
    <footer className="relative bg-white border-t border-[#E2E8F0] pt-16 pb-24 sm:pb-32 overflow-hidden select-none" suppressHydrationWarning>
      {/* ── Top Subtle Brand Stripe ── */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#12316B] via-[#2456A6] to-[#18B6D2]" />

      <div className="max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* ══════════════════════════════════════════════════════════════
            NEWSLETTER & DISPATCH CALLOUT
           ══════════════════════════════════════════════════════════════ */}
        <div className="pb-12 mb-12 border-b border-[#E2E8F0]">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#F7F9FC] border border-[#E2E8F0] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="max-w-xl text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-2.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12316B] tracking-wider uppercase">
                  <Sparkles size={13} className="text-[#18B6D2]" />
                  Weekly Tech Dispatch
                </span>

                {/* Live Subscriber Count Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#12316B]" suppressHydrationWarning>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16865C] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16865C]" />
                  </span>
                  <Users size={12} className="text-[#2456A6]" />
                  <span suppressHydrationWarning>
                    {subscriberCount > 0 ? (
                      <>
                        <strong className="text-[#12316B] font-extrabold">{subscriberCount.toLocaleString()}</strong> Active Learners
                      </>
                    ) : (
                      <>Join 2,400+ Active Learners</>
                    )}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#182230] font-brand tracking-tight">
                Learn Skills. Build Projects. Grow Your Future.
              </h3>
              <p className="text-slate-600 text-base mt-2 leading-relaxed">
                Receive curated computer science notes, practical project walkthroughs, and updates on new verified certification courses directly in your inbox.
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="w-full lg:w-auto flex-shrink-0 flex flex-col items-center lg:items-end">
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
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#182230] placeholder-[#64748B] text-sm focus:outline-none focus:border-[#12316B] focus:ring-2 focus:ring-[#12316B]/10 transition-all disabled:opacity-60 shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  suppressHydrationWarning
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#12316B] hover:bg-[#2456A6] shadow-md shadow-[#12316B]/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white" />
                      <span>Subscribing...</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 size={16} className="text-[#18B6D2]" />
                      <span>Subscribed!</span>
                    </>
                  ) : status === "already" ? (
                    <>
                      <CheckCircle2 size={16} className="text-[#18B6D2]" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* Status message */}
              {feedbackMsg && (
                <div
                  className={`mt-2.5 text-xs font-medium flex items-center gap-1.5 self-center lg:self-start ${
                    status === "success" || status === "already"
                      ? "text-[#16865C]"
                      : "text-[#C83C4A]"
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
            MAIN FOOTER GRID: BRAND + 3 LINK COLUMNS
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 mb-12">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link
              href="/"
              className="inline-block mb-4 group"
              title="SLRJ Learn"
            >
              <Image
                src="/logo.png"
                alt="SLRJ Learn"
                width={170}
                height={50}
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            <p className="text-[#12316B] font-bold text-xs tracking-wider uppercase mb-2">
              Learn Skills. Build Projects. Grow Your Future.
            </p>

            <p className="text-slate-600 text-[15px] sm:text-base leading-relaxed mb-6 max-w-md">
              SLRJ Learn is an online learning platform providing PDF-based courses, digital handwritten notes, structured career roadmaps, hands-on programming challenges, and verifiable completion certificates.
            </p>

            {/* Platform Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-[#E2E8F0] text-xs font-semibold text-[#182230]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16865C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16865C]" />
              </span>
              <span>100% Free Learning Resources &bull; Verified Certificates</span>
            </div>
          </div>

          {/* Nav Sections (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {navSections.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-[#12316B] font-extrabold text-sm tracking-wider uppercase mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-slate-600 hover:text-[#12316B] font-medium hover:translate-x-1 transition-all duration-200 text-sm block"
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
            BOTTOM LEGAL & PARENT BRAND
           ══════════════════════════════════════════════════════════════ */}
        <div className="border-t border-[#E2E8F0] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#64748B]">
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1.5 sm:gap-2 text-center md:text-left">
            <span>&copy; {currentYear} SLRJ Learn. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300">&bull;</span>
            <span className="text-[#12316B] font-semibold">
              An educational initiative of SLRJ Digital
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#64748B]">
            <Link href="/privacy-policy" className="hover:text-[#12316B] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/terms-and-conditions" className="hover:text-[#12316B] transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-300">&bull;</span>
            <span className="text-[#16865C] flex items-center gap-1 font-semibold text-xs">
              <ShieldCheck size={14} className="text-[#16865C]" />
              Authentic Certificate Verification
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
