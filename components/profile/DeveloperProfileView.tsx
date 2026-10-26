"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Globe,
  Edit3,
  CheckCircle2,
  Code2,
  Terminal,
  Calendar,
  Sparkles,
  Share2,
  Copy,
  Check,
  X,
  BookOpen,
  Cpu,
  Layers,
  FolderGit2,
  ChevronRight,
  Download,
  Send,
  FileText,
  Eye,
  CheckCircle,
  Palette,
  Sun,
  Moon,
  Grid,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaGlobe, FaTwitter } from "react-icons/fa6";

export interface DeveloperProfileData {
  fullName: string;
  developerTitle: string;
  avatarUrl: string;
  location: string;
  email: string;
  phone?: string;
  availability: string;
  shortBio: string;
  careerObjective: string;
  education: {
    degree: string;
    field: string;
    institution: string;
    location: string;
    duration: string;
    grade: string;
    coursework: string[];
  };
  socialLinks: {
    github: string;
    linkedin: string;
    portfolio: string;
    twitter?: string;
  };
  skills: {
    category: string;
    iconName: string;
    items: string[];
  }[];
  projects: {
    id: string;
    title: string;
    tagline: string;
    description: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
    category: string;
    highlight: string;
  }[];
  certifications: {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    credentialId: string;
    verificationUrl: string;
    skills: string[];
  }[];
}

const DEFAULT_PROFILE: DeveloperProfileData = {
  fullName: "Kouluri Shahid",
  developerTitle: "Full-Stack Software Engineer • Computer Science Student",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=280&auto=format&fit=crop&q=80",
  location: "Hyderabad, Telangana, India",
  email: "shahid@slrjlearn.in",
  phone: "+91 98765 43210",
  availability: "Open to Full-Time SDE & Internship Roles",
  shortBio:
    "Passionate software engineering undergraduate dedicated to building scalable web applications, performant backend microservices, and clean, accessible user interfaces. Experienced across modern TypeScript, Next.js, and cloud ecosystems.",
  careerObjective:
    "To architect reliable, high-throughput software systems and contribute to forward-thinking engineering teams, while relentlessly sharpening expertise in distributed architectures, full-stack systems, and core computer science fundamentals.",
  education: {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering",
    institution: "Jawaharlal Nehru Technological University (JNTU)",
    location: "Hyderabad, India",
    duration: "2022 — 2026 (Final Year)",
    grade: "8.8 / 10.0 CGPA",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "System Design & OOP",
      "Web Technologies",
    ],
  },
  socialLinks: {
    github: "https://github.com/slrjdigital-ai",
    linkedin: "https://linkedin.com/in/kouluri-shahid",
    portfolio: "https://slrjlearn.in",
    twitter: "https://twitter.com/slrjdigital",
  },
  skills: [
    {
      category: "Programming Languages",
      iconName: "code",
      items: ["JavaScript (ES6+)", "TypeScript", "Python", "C++", "Java", "SQL"],
    },
    {
      category: "Frontend Architecture",
      iconName: "layout",
      items: ["React 19", "Next.js 16 (App Router)", "HTML5 Semantic", "CSS3 / Modern Layouts", "Tailwind CSS v4", "Redux Toolkit"],
    },
    {
      category: "Backend & Cloud Services",
      iconName: "server",
      items: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication", "Next.js Server Actions", "Nodemailer SMTP"],
    },
    {
      category: "Databases & DevOps Tools",
      iconName: "database",
      items: ["PostgreSQL", "MongoDB", "Supabase", "Git & GitHub", "Docker", "Postman / API Testing"],
    },
    {
      category: "Computer Science Core",
      iconName: "cpu",
      items: ["Data Structures & Algorithms", "Object-Oriented Design", "DBMS Normalization", "Network Protocols (HTTP/TCP)", "Clean Code Practices"],
    },
  ],
  projects: [
    {
      id: "slrj-learn",
      title: "SLRJ Learn Platform",
      tagline: "Comprehensive Online Learning & Assessment Platform",
      description:
        "Full-stack Next.js 16 LMS featuring 17 genuine handwritten PDF handbooks, server-scored assessment engines, in-browser multi-language execution playgrounds, and live verifiable landscape certificates.",
      technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "pdf-lib"],
      liveUrl: "https://slrjlearn.in",
      githubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
      category: "Full-Stack Web App",
      highlight: "1,200+ Active Learners • 100% Server Scored",
    },
    {
      id: "task-api",
      title: "Distributed Task Manager REST API",
      tagline: "Scalable Task & Workflow Management Engine",
      description:
        "Production-ready backend API featuring robust JWT session tokens, role-based access control, schema validation, rate limiting, and PostgreSQL persistence with comprehensive documentation.",
      technologies: ["Node.js", "Express.js", "PostgreSQL", "JWT", "Docker"],
      liveUrl: "https://slrjlearn.in/practice",
      githubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
      category: "Backend & Systems",
      highlight: "Sub-50ms Latency • Fully Documented Endpoints",
    },
    {
      id: "weather-radar",
      title: "Weather Forecast & Meteorological Radar",
      tagline: "Real-time Climate & Atmospheric Intelligence",
      description:
        "Interactive meteorological dashboard providing real-time geolocation weather tracking, 7-day atmospheric forecasts, air quality index monitoring, and dynamic weather condition visualizations.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "OpenWeather API"],
      liveUrl: "https://slrjlearn.in/courses",
      githubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
      category: "Interactive Frontend",
      highlight: "99.9% Geolocation Accuracy • Client Caching",
    },
    {
      id: "multi-compiler",
      title: "In-Browser Code Execution Playground",
      tagline: "Zero-Setup Multi-Language Programming Sandbox",
      description:
        "High-performance client/server code runner providing interactive compilation and execution for Python, C, C++, Java, and SQL with real-time test case evaluation and syntax highlighting.",
      technologies: ["Next.js", "TypeScript", "Monaco Engine", "Web Workers"],
      liveUrl: "https://slrjlearn.in/practice",
      githubUrl: "https://github.com/slrjdigital-ai/SLRJ-LEARN",
      category: "Developer Tools",
      highlight: "5 Language Engines • Sandboxed Execution",
    },
  ],
  certifications: [
    {
      id: "cert-wd101",
      title: "Full-Stack Web Development Professional",
      issuer: "SLRJ Learn Academy",
      issueDate: "October 2026",
      credentialId: "SLRJ-CERT-2026-WD101",
      verificationUrl: "/verify-certificate/SLRJ-CERT-2026-WD101",
      skills: ["React 19", "Next.js", "TypeScript", "REST APIs", "Modern CSS"],
    },
    {
      id: "cert-nxtwave",
      title: "Advanced React & Full-Stack Engineering",
      issuer: "NxtWave CCBP 4.0 Academy",
      issueDate: "August 2026",
      credentialId: "NXW-2026-REACT-882",
      verificationUrl: "/certificates",
      skills: ["State Management", "Component Lifecycle", "Database Schema", "Node.js"],
    },
    {
      id: "cert-w3s",
      title: "Frontend Web Developer Certified",
      issuer: "W3Schools Academy",
      issueDate: "June 2026",
      credentialId: "W3S-FE-94821",
      verificationUrl: "/certificates",
      skills: ["HTML5 Semantic", "CSS Grid & Flexbox", "JavaScript Core", "DOM APIs"],
    },
    {
      id: "cert-dsa",
      title: "Problem Solving & Data Structures (5-Star)",
      issuer: "HackerRank & LeetCode",
      issueDate: "May 2026",
      credentialId: "HR-PS-5STAR-771",
      verificationUrl: "/certificates",
      skills: ["Arrays & HashMaps", "Trees & Graphs", "Dynamic Programming", "Recursion"],
    },
  ],
};

const STORAGE_KEY = "developer_profile_data_v1";
const BG_THEME_KEY = "developer_profile_bg_theme_v1";

type BackgroundTheme = "tech-grid" | "emerald-mesh" | "pure-white" | "studio-dark";

export default function DeveloperProfileView() {
  const [profile, setProfile] = useState<DeveloperProfileData>(DEFAULT_PROFILE);
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>("tech-grid");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<DeveloperProfileData>(DEFAULT_PROFILE);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedProfileLink, setCopiedProfileLink] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Load persisted profile and background theme on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEY);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setEditFormData(parsed);
      }
      const savedTheme = localStorage.getItem(BG_THEME_KEY) as BackgroundTheme;
      if (savedTheme && ["tech-grid", "emerald-mesh", "pure-white", "studio-dark"].includes(savedTheme)) {
        setBgTheme(savedTheme);
      }
    } catch (e) {
      console.warn("Could not read profile/theme from localStorage", e);
    }
  }, []);

  const changeBgTheme = (theme: BackgroundTheme) => {
    setBgTheme(theme);
    try {
      localStorage.setItem(BG_THEME_KEY, theme);
    } catch (err) {
      console.warn("Failed to persist theme", err);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleShareProfile = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedProfileLink(true);
      setTimeout(() => setCopiedProfileLink(false), 2000);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editFormData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(editFormData));
    } catch (err) {
      console.error("Failed to save profile to localStorage", err);
    }
    setIsEditModalOpen(false);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset profile details back to default?")) {
      setProfile(DEFAULT_PROFILE);
      setEditFormData(DEFAULT_PROFILE);
      localStorage.removeItem(STORAGE_KEY);
      setIsEditModalOpen(false);
    }
  };

  const isDark = bgTheme === "studio-dark";

  // Dynamic theme tokens
  const cardBgClass = isDark
    ? "bg-[#111827] border-slate-800 text-slate-100 shadow-xl shadow-black/40"
    : "bg-white border-slate-200/90 shadow-xs hover:shadow-md";

  const cardInnerBg = isDark ? "bg-[#0B0F19] border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800";
  const textHeading = isDark ? "text-white" : "text-slate-900";
  const textSub = isDark ? "text-slate-300" : "text-slate-700";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const borderDivider = isDark ? "border-slate-800" : "border-slate-100";
  const badgeClass = isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700";

  return (
    <div
      className={`relative w-full -m-4 sm:-m-6 lg:-m-10 p-4 sm:p-6 lg:p-10 min-h-screen transition-colors duration-300 font-sans ${
        bgTheme === "tech-grid"
          ? "bg-[#F8FAFC]"
          : bgTheme === "emerald-mesh"
          ? "bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-slate-100"
          : bgTheme === "pure-white"
          ? "bg-white"
          : "bg-[#090D16]"
      }`}
    >
      {/* ── Background Subtle Aesthetics & Atmospheric Glows ── */}
      {bgTheme === "tech-grid" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-75" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-b from-emerald-100/70 via-teal-50/25 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-50/60 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {bgTheme === "emerald-mesh" && (
        <>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {bgTheme === "studio-dark" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-90" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-emerald-950/30 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-7 pb-16">
        {/* ─── Top Control Bar: Breadcrumb + Theme Switcher Pill ─── */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pb-2 border-b ${
            isDark ? "border-slate-800 text-slate-400" : "border-slate-200/80 text-slate-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={`hover:text-emerald-500 transition-colors ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              SLRJ Learn
            </Link>
            <span>/</span>
            <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              Developer Profile
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Background Theme Switcher */}
            <div
              className={`flex items-center gap-1 p-1 rounded-xl border text-[11px] font-bold ${
                isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-100/90 border-slate-200"
              }`}
            >
              <span className="text-slate-400 pl-1.5 pr-0.5 text-[10px] uppercase font-semibold flex items-center gap-1">
                <Palette size={11} className="text-emerald-500" />
                <span>Theme:</span>
              </span>

              <button
                type="button"
                onClick={() => changeBgTheme("tech-grid")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  bgTheme === "tech-grid"
                    ? "bg-white text-emerald-800 shadow-xs border border-emerald-300 font-extrabold"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Tech Dot Grid with Emerald Ambient Aura"
              >
                Dot Grid
              </button>

              <button
                type="button"
                onClick={() => changeBgTheme("emerald-mesh")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  bgTheme === "emerald-mesh"
                    ? "bg-white text-emerald-800 shadow-xs border border-emerald-300 font-extrabold"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Soft Emerald Mesh Gradient"
              >
                Emerald
              </button>

              <button
                type="button"
                onClick={() => changeBgTheme("pure-white")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  bgTheme === "pure-white"
                    ? "bg-white text-emerald-800 shadow-xs border border-emerald-300 font-extrabold"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Pure Crisp White"
              >
                Pure White
              </button>

              <button
                type="button"
                onClick={() => changeBgTheme("studio-dark")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  bgTheme === "studio-dark"
                    ? "bg-emerald-950 text-emerald-300 shadow-xs border border-emerald-500/50 font-extrabold"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Developer Studio Dark Mode"
              >
                Dark
              </button>
            </div>

            {/* Availability Pill */}
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`font-semibold ${isDark ? "text-emerald-400" : "text-emerald-800"}`}>
                {profile.availability}
              </span>
            </div>
          </div>
        </div>

        {/* ─── 1. Header / Hero Profile Card (W3Schools Clarity + NxtWave Modern Structure) ─── */}
        <section
          className={`rounded-2xl border transition-all p-6 sm:p-8 relative overflow-hidden ${cardBgClass}`}
        >
          {/* Subtle decorative top accent bar (Deep Emerald) */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-500" />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pt-2">
            {/* Left: Avatar & Primary Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* Avatar with Status Badge */}
              <div className="relative flex-shrink-0 group">
                <div
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-emerald-700/30 shadow-sm relative ${
                    isDark ? "bg-slate-800" : "bg-slate-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span
                  className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold border-2 border-white shadow-xs flex items-center gap-1"
                  title="Verified Developer Profile"
                >
                  <CheckCircle2 size={11} className="text-emerald-200" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Name, Title, and Location Metadata */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${textHeading}`}>
                    {profile.fullName}
                  </h1>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider border ${
                      isDark
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200/80"
                    }`}
                  >
                    Developer
                  </span>
                </div>

                <p className={`font-medium text-sm sm:text-base leading-snug ${textSub}`}>
                  {profile.developerTitle}
                </p>

                <div className={`flex flex-wrap items-center justify-center sm:justify-start gap-y-1.5 gap-x-4 text-xs pt-1 ${textMuted}`}>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-emerald-600" />
                    <span>{profile.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={15} className="text-emerald-600" />
                    <span>{profile.education.degree}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} className="text-emerald-600" />
                    <span>{profile.email}</span>
                  </span>
                </div>

                {/* Social Links Bar */}
                <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-xl border transition-colors ${
                      isDark
                        ? "bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-black"
                    }`}
                    title="GitHub Profile"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub size={16} />
                  </a>

                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-xl border transition-colors ${
                      isDark
                        ? "bg-slate-800/80 border-slate-700 text-slate-300 hover:text-[#0A66C2] hover:bg-slate-700"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-[#0A66C2]"
                    }`}
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin size={16} />
                  </a>

                  <a
                    href={profile.socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-xl border transition-colors ${
                      isDark
                        ? "bg-slate-800/80 border-slate-700 text-slate-300 hover:text-emerald-400 hover:bg-slate-700"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-emerald-700"
                    }`}
                    title="Personal Portfolio"
                    aria-label="Personal Portfolio"
                  >
                    <FaGlobe size={16} />
                  </a>

                  {profile.socialLinks.twitter && (
                    <a
                      href={profile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-xl border transition-colors ${
                        isDark
                          ? "bg-slate-800/80 border-slate-700 text-slate-300 hover:text-[#1DA1F2] hover:bg-slate-700"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-[#1DA1F2]"
                      }`}
                      title="Twitter / X"
                      aria-label="Twitter Profile"
                    >
                      <FaTwitter size={15} />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleShareProfile}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isDark
                        ? "bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                    title="Copy Profile Link"
                  >
                    {copiedProfileLink ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className={isDark ? "text-emerald-400" : "text-emerald-800"}>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={13} />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Action CTAs */}
            <div className="flex flex-row sm:flex-col lg:flex-row gap-2.5 justify-center sm:justify-end flex-shrink-0 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
              >
                <Mail size={15} />
                <span>Contact Me</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditFormData(profile);
                  setIsEditModalOpen(true);
                }}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-[0.98] ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
                    : "bg-white hover:bg-slate-50 border-slate-300 text-slate-700 hover:border-slate-400"
                }`}
              >
                <Edit3 size={15} className="text-emerald-600" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* ─── Biography & Career Objective Callout ─── */}
          <div className={`mt-6 pt-5 border-t space-y-4 ${borderDivider}`}>
            <div>
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${textMuted}`}>
                Professional Summary
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${textSub}`}>
                {profile.shortBio}
              </p>
            </div>

            {/* Clean Objective Box (W3Schools / NxtWave aesthetic) */}
            <div
              className={`p-4 rounded-xl border-l-4 border-emerald-600 border ${
                isDark
                  ? "bg-emerald-950/20 border-emerald-900/50"
                  : "bg-emerald-50/50 border-emerald-100/60"
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1 ${
                  isDark ? "text-emerald-300" : "text-emerald-900"
                }`}
              >
                <Sparkles size={14} className="text-emerald-500" />
                <span>Career Objective</span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed italic ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                &ldquo;{profile.careerObjective}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ─── 2. Main Grid: Two-Column Responsive Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* ──────── Left / Main Column (Projects & Certifications) ──────── */}
          <div className="lg:col-span-8 space-y-7">
            {/* Projects Portfolio Section */}
            <section className={`rounded-2xl border p-6 sm:p-7 space-y-5 ${cardBgClass}`}>
              <div className={`flex items-center justify-between pb-3 border-b ${borderDivider}`}>
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-xl border ${
                      isDark
                        ? "bg-emerald-950/70 text-emerald-400 border-emerald-800"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200/60"
                    }`}
                  >
                    <FolderGit2 size={18} />
                  </div>
                  <div>
                    <h2 className={`text-lg font-bold tracking-tight ${textHeading}`}>
                      Projects Portfolio
                    </h2>
                    <p className={`text-xs ${textMuted}`}>
                      Hand-crafted software applications & full-stack systems
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                    isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {profile.projects.length} Showcases
                </span>
              </div>

              {/* Compact Project Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.projects.map((project) => (
                  <div
                    key={project.id}
                    className={`rounded-xl border p-4 hover:border-emerald-600/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${
                      isDark ? "bg-[#0D1322] border-slate-800/90" : "bg-white border-slate-200/90"
                    }`}
                  >
                    <div className="space-y-2.5">
                      {/* Header Pill */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                            isDark
                              ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200/60"
                          }`}
                        >
                          {project.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {project.highlight}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3
                          className={`font-bold text-sm sm:text-base group-hover:text-emerald-500 transition-colors ${textHeading}`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-[11px] font-medium text-emerald-600 leading-tight">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Description */}
                      <p className={`text-xs leading-relaxed line-clamp-3 ${textSub}`}>
                        {project.description}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${badgeClass}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div
                      className={`flex items-center justify-between pt-3 mt-3 border-t text-xs ${borderDivider}`}
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-emerald-600 hover:text-emerald-500 hover:underline"
                      >
                        <span>Live Preview</span>
                        <ExternalLink size={13} />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 font-medium ${
                          isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <FaGithub size={13} />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications and Credentials */}
            <section className={`rounded-2xl border p-6 sm:p-7 space-y-5 ${cardBgClass}`}>
              <div className={`flex items-center justify-between pb-3 border-b ${borderDivider}`}>
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-xl border ${
                      isDark
                        ? "bg-emerald-950/70 text-emerald-400 border-emerald-800"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200/60"
                    }`}
                  >
                    <Award size={18} />
                  </div>
                  <div>
                    <h2 className={`text-lg font-bold tracking-tight ${textHeading}`}>
                      Certifications & Achievements
                    </h2>
                    <p className={`text-xs ${textMuted}`}>
                      Official verified credentials, course completions, and badges
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md font-bold text-xs border ${
                    isDark
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200/70"
                  }`}
                >
                  Verified Registry
                </span>
              </div>

              <div className="space-y-3">
                {profile.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className={`p-4 rounded-xl border hover:border-emerald-600/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDark
                        ? "bg-[#0D1322] border-slate-800 hover:bg-slate-800/30"
                        : "bg-white border-slate-200/90 hover:bg-emerald-50/20"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className={`font-bold text-sm ${textHeading}`}>
                          {cert.title}
                        </h3>
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                            isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {cert.credentialId}
                        </span>
                      </div>

                      <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${textMuted}`}>
                        <span className={`font-semibold ${isDark ? "text-emerald-400" : "text-emerald-800"}`}>
                          {cert.issuer}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{cert.issueDate}</span>
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`text-[10px] px-1.5 py-0.5 rounded border ${badgeClass}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={cert.verificationUrl}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors flex-shrink-0 self-start sm:self-center ${
                        isDark
                          ? "bg-emerald-950/80 border-emerald-800 text-emerald-300 hover:bg-emerald-900"
                          : "border-emerald-300 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100"
                      }`}
                    >
                      <CheckCircle size={13} className="text-emerald-600" />
                      <span>Verify Credential</span>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ──────── Right Column (Skills & Education) ──────── */}
          <div className="lg:col-span-4 space-y-7">
            {/* Technical Skills Section */}
            <section className={`rounded-2xl border p-6 space-y-5 ${cardBgClass}`}>
              <div className={`flex items-center justify-between pb-3 border-b ${borderDivider}`}>
                <div className="flex items-center gap-2">
                  <Code2 size={18} className="text-emerald-600" />
                  <h2 className={`text-base font-bold tracking-tight ${textHeading}`}>
                    Technical Skills
                  </h2>
                </div>
                <span className={`text-[11px] font-semibold ${isDark ? "text-emerald-400" : "text-emerald-800"}`}>
                  W3S & NxtWave Standards
                </span>
              </div>

              {/* Categorized Skills Pill Badges */}
              <div className="space-y-4">
                {profile.skills.map((group) => (
                  <div key={group.category} className="space-y-2">
                    <div className={`text-[11px] font-bold uppercase tracking-wider flex items-center justify-between ${textMuted}`}>
                      <span>{group.category}</span>
                      <span className="font-mono text-[10px]">
                        {group.items.length}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-default ${
                            isDark
                              ? "bg-slate-800/80 hover:bg-emerald-950 border-slate-700 hover:border-emerald-700 text-slate-200 hover:text-emerald-300"
                              : "bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border-slate-200 hover:border-emerald-300"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Details Card */}
            <section className={`rounded-2xl border p-6 space-y-4 ${cardBgClass}`}>
              <div className={`flex items-center gap-2 pb-3 border-b ${borderDivider}`}>
                <GraduationCap size={18} className="text-emerald-600" />
                <h2 className={`text-base font-bold tracking-tight ${textHeading}`}>
                  Education
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border mb-1 ${
                      isDark
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200/70"
                    }`}
                  >
                    Undergraduate Degree
                  </span>
                  <h3 className={`font-bold text-sm ${textHeading}`}>
                    {profile.education.degree}
                  </h3>
                  <p className={`text-xs font-medium ${isDark ? "text-emerald-400" : "text-emerald-800"}`}>
                    {profile.education.field}
                  </p>
                  <p className={`text-xs mt-1 ${textSub}`}>
                    {profile.education.institution}
                  </p>
                  <div
                    className={`flex items-center justify-between text-xs mt-2 pt-2 border-t ${borderDivider}`}
                  >
                    <span className={textMuted}>{profile.education.duration}</span>
                    <span className={`font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                      CGPA: {profile.education.grade}
                    </span>
                  </div>
                </div>

                {/* Coursework Badges */}
                <div className="pt-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${textMuted}`}>
                    Relevant Coursework
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {profile.education.coursework.map((course) => (
                      <span
                        key={course}
                        className={`px-2 py-0.5 rounded text-[10px] border ${badgeClass}`}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Contact & Availability Card */}
            <section className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-2xl p-6 shadow-md space-y-4 relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 text-[11px] font-bold border border-white/20">
                  <Sparkles size={12} />
                  <span>Let&apos;s Connect</span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  Interested in working together?
                </h3>

                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  I am actively seeking software engineering roles, full-stack internships, and technical collaboration opportunities.
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full py-2.5 px-4 rounded-xl bg-white text-emerald-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors shadow-xs cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={14} className="text-emerald-700" />
                        <span>Email Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Email ({profile.email})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ─── 3. Edit Profile Modal ─── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className={`rounded-2xl border shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-5 ${
              isDark ? "bg-[#111827] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${borderDivider}`}>
              <div className="flex items-center gap-2">
                <Edit3 size={18} className="text-emerald-600" />
                <h3 className={`font-extrabold text-lg ${textHeading}`}>
                  Edit Developer Profile
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                }`}
                title="Close Modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className={`block font-bold mb-1 ${textSub}`}>Full Name</label>
                  <input
                    type="text"
                    value={editFormData.fullName}
                    onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                    required
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 font-medium ${
                      isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${textSub}`}>Developer Title</label>
                  <input
                    type="text"
                    value={editFormData.developerTitle}
                    onChange={(e) => setEditFormData({ ...editFormData, developerTitle: e.target.value })}
                    required
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 font-medium ${
                      isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${textSub}`}>Email Address</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    required
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 font-medium ${
                      isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${textSub}`}>Location</label>
                  <input
                    type="text"
                    value={editFormData.location}
                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 font-medium ${
                      isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${textSub}`}>Profile Avatar URL</label>
                  <input
                    type="url"
                    value={editFormData.avatarUrl}
                    onChange={(e) => setEditFormData({ ...editFormData, avatarUrl: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 font-medium ${
                      isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${textSub}`}>Availability Status</label>
                  <input
                    type="text"
                    value={editFormData.availability}
                    onChange={(e) => setEditFormData({ ...editFormData, availability: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 font-medium ${
                      isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-bold mb-1 ${textSub}`}>Short Introduction (Bio)</label>
                <textarea
                  rows={3}
                  value={editFormData.shortBio}
                  onChange={(e) => setEditFormData({ ...editFormData, shortBio: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 font-medium resize-none leading-relaxed ${
                    isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label className={`block font-bold mb-1 ${textSub}`}>Career Objective</label>
                <textarea
                  rows={2}
                  value={editFormData.careerObjective}
                  onChange={(e) => setEditFormData({ ...editFormData, careerObjective: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 font-medium resize-none leading-relaxed ${
                    isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={`block font-bold mb-1 ${textSub}`}>GitHub URL</label>
                  <input
                    type="url"
                    value={editFormData.socialLinks.github}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        socialLinks: { ...editFormData.socialLinks, github: e.target.value },
                      })
                    }
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 text-xs ${
                      isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${textSub}`}>LinkedIn URL</label>
                  <input
                    type="url"
                    value={editFormData.socialLinks.linkedin}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        socialLinks: { ...editFormData.socialLinks, linkedin: e.target.value },
                      })
                    }
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 text-xs ${
                      isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${textSub}`}>Portfolio URL</label>
                  <input
                    type="url"
                    value={editFormData.socialLinks.portfolio}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        socialLinks: { ...editFormData.socialLinks, portfolio: e.target.value },
                      })
                    }
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-emerald-600 text-xs ${
                      isDark ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300 text-slate-900"
                    }`}
                  />
                </div>
              </div>

              <div className={`flex items-center justify-between pt-4 border-t ${borderDivider}`}>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  Reset Defaults
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isDark ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 4. Contact Modal ─── */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className={`rounded-2xl border shadow-2xl max-w-md w-full p-6 space-y-4 ${
              isDark ? "bg-[#111827] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${borderDivider}`}>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-emerald-600" />
                <h3 className={`font-extrabold text-base ${textHeading}`}>
                  Contact {profile.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsContactModalOpen(false);
                  setContactSubmitted(false);
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                <X size={18} />
              </button>
            </div>

            {contactSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
                <h4 className={`font-bold text-base ${textHeading}`}>Message Ready!</h4>
                <p className={`text-xs ${textMuted}`}>
                  Your mail client has been opened or you can reach directly at:
                </p>
                <p className={`text-sm font-bold pt-1 ${isDark ? "text-emerald-400" : "text-emerald-800"}`}>
                  {profile.email}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsContactModalOpen(false);
                      setContactSubmitted(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isDark ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs sm:text-sm">
                <div
                  className={`p-3.5 rounded-xl border space-y-1 ${
                    isDark
                      ? "bg-emerald-950/40 border-emerald-850"
                      : "bg-emerald-50/70 border-emerald-200/80"
                  }`}
                >
                  <div className={`font-bold text-xs ${isDark ? "text-emerald-300" : "text-emerald-900"}`}>
                    Direct Email
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isDark ? "text-emerald-300" : "text-emerald-800"
                      }`}
                    >
                      {profile.email}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className={`px-2 py-1 rounded border text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                        isDark
                          ? "bg-slate-800 text-emerald-300 border-emerald-700 hover:bg-slate-700"
                          : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                      }`}
                    >
                      {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedEmail ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={`mailto:${profile.email}?subject=Opportunity%20Discussion&body=Hello%20${encodeURIComponent(profile.fullName)},%0D%0A%0D%0AI%20reviewed%20your%20developer%20profile%20and%20would%20love%20to%20connect.`}
                    onClick={() => setContactSubmitted(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send size={14} />
                    <span>Open in Email Client</span>
                  </a>

                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-4 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors ${
                      isDark
                        ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
                        : "bg-white hover:bg-slate-50 border-slate-300 text-slate-800"
                    }`}
                  >
                    <FaLinkedin size={14} className="text-[#0A66C2]" />
                    <span>Connect on LinkedIn</span>
                  </a>

                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-4 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors ${
                      isDark
                        ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
                        : "bg-white hover:bg-slate-50 border-slate-300 text-slate-800"
                    }`}
                  >
                    <FaGithub size={14} />
                    <span>View GitHub Activity</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
