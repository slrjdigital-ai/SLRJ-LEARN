"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth, User } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import { useCourseProgress, LearnerCourseProgress } from "@/lib/courseProgress";
import { useCertificatesManager } from "@/lib/certificateStorage";
import { CertificateRecord } from "@/data/certificatesStore";
import { getAllCourses, Course } from "@/data/courses";
import { getAllNotes, NoteItem } from "@/data/notes";
import { ROADMAP_TRACKS } from "@/data/roadmap";
import CertificateModal from "@/components/certificates/CertificateModal";

import {
  User as UserIcon,
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  Calendar,
  Settings,
  Edit3,
  Bookmark,
  Share2,
  ExternalLink,
  ShieldCheck,
  Code2,
  Camera,
  Check,
  AlertCircle,
  LogOut,
  Target,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  GraduationCap,
  Bell,
  Lock,
  Eye,
  Trash2,
  Plus,
  X,
  Compass,
  ArrowRight,
  Download,
  KeyRound,
  Laptop,
} from "lucide-react";

type ProfileTab = "overview" | "learning" | "certificates" | "skills" | "saved" | "settings";

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
];

export default function ProfileClient() {
  const router = useRouter();
  const { user, updateProfile, logout, toggleBookmark } = useAuth();
  const { state: gamificationState, currentLevel } = useGamification();
  const { allProgress } = useCourseProgress();
  const { certificates, isLoaded: certsLoaded } = useCertificatesManager();

  const allCourses = useMemo(() => getAllCourses(), []);
  const allNotes = useMemo(() => getAllNotes(), []);

  // Active Tab State
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const [learningSubTab, setLearningSubTab] = useState<"inprogress" | "completed" | "all">("inprogress");

  // Modals
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<CertificateRecord | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Edit Profile Form State
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    institution: user?.institution || "",
    educationLevel: user?.educationLevel || "",
    track: user?.track || "Full-Stack Software Development",
  });
  const [editFormSuccess, setEditFormSuccess] = useState(false);
  const [editFormError, setEditFormError] = useState("");

  // Account Settings Forms State
  const [settingsForm, setSettingsForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    bio: user?.bio || "",
    institution: user?.institution || "",
    educationLevel: user?.educationLevel || "",
    weeklyGoalHours: user?.weeklyGoalHours || 8,
    dailyGoalMinutes: user?.dailyGoalMinutes || 45,
  });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [settingsError, setSettingsError] = useState("");

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    courseAnnouncements: user?.notifications?.courseAnnouncements ?? true,
    assessmentReminders: user?.notifications?.assessmentReminders ?? true,
    learningReminders: user?.notifications?.learningReminders ?? true,
    certificateAlerts: user?.notifications?.certificateAlerts ?? true,
  });

  // Privacy Controls State
  const [privacy, setPrivacy] = useState({
    isPublic: user?.privacy?.isPublic ?? true,
    showCertificates: user?.privacy?.showCertificates ?? true,
    showStreak: user?.privacy?.showStreak ?? true,
  });

  // Password Change State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // New Skill input state
  const [newSkillInput, setNewSkillInput] = useState("");

  // Synchronize form when user loads/changes
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
        institution: user.institution || "",
        educationLevel: user.educationLevel || "",
        track: user.track || "Full-Stack Software Development",
      });
      setSettingsForm({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        bio: user.bio || "",
        institution: user.institution || "",
        educationLevel: user.educationLevel || "",
        weeklyGoalHours: user.weeklyGoalHours || 8,
        dailyGoalMinutes: user.dailyGoalMinutes || 45,
      });
    }
  }, [user]);

  // ── Calculated Real Statistics ──
  const progressList: LearnerCourseProgress[] = useMemo(() => {
    return Object.values(allProgress);
  }, [allProgress]);

  const enrolledCount = progressList.length;
  const completedCourses = useMemo(() => {
    return progressList.filter((p) => p.progressPercentage >= 80);
  }, [progressList]);

  const inProgressCourses = useMemo(() => {
    return progressList.filter((p) => p.progressPercentage < 80);
  }, [progressList]);

  // Approximate total hours learned from completed lessons and progress
  const totalLearningHours = useMemo(() => {
    let sumMinutes = 0;
    progressList.forEach((p) => {
      sumMinutes += (p.completedPdfLessonIds?.length || 0) * 20;
    });
    // Add time from certificates
    sumMinutes += certificates.length * 180;
    return Math.max(2, Math.round((sumMinutes / 60) * 10) / 10);
  }, [progressList, certificates]);

  // Quizzes and Coding completed count
  const quizzesCompletedCount = useMemo(() => {
    let count = 0;
    progressList.forEach((p) => {
      count += Math.round((p.completedPdfLessonIds?.length || 0) * 0.75);
    });
    return Math.max(count, Math.round((gamificationState.xp.quizzesXP || 0) / 25));
  }, [progressList, gamificationState.xp.quizzesXP]);

  const codeAssessmentsCount = useMemo(() => {
    const fromChallenges = Object.keys(gamificationState.submittedChallenges || {}).length;
    let count = 0;
    progressList.forEach((p) => {
      count += Math.round((p.completedPdfLessonIds?.length || 0) * 0.6);
    });
    return Math.max(count, fromChallenges, Math.round((gamificationState.xp.challengesXP || 0) / 50));
  }, [progressList, gamificationState.submittedChallenges, gamificationState.xp.challengesXP]);

  // Bookmarked notes resolved
  const savedNotesList: NoteItem[] = useMemo(() => {
    if (!user?.bookmarkedNotes) return [];
    return allNotes.filter((n) => user.bookmarkedNotes.includes(n.slug));
  }, [allNotes, user?.bookmarkedNotes]);

  // Active roadmap track
  const activeRoadmap = useMemo(() => {
    return (
      ROADMAP_TRACKS.find(
        (t) => t.name.toLowerCase() === (user?.track || "").toLowerCase() || t.id === "fullstack"
      ) || ROADMAP_TRACKS[0]
    );
  }, [user?.track]);

  // Weekly Activity Days (Mon-Sun)
  const weeklyDays = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0
    return days.map((d, idx) => ({
      name: d,
      isToday: idx === todayIndex,
      hasActivity: idx <= todayIndex,
      hours: idx <= todayIndex ? [1.2, 0.8, 1.5, 0.5, 1.8, 0, 0][idx] || 0.8 : 0,
    }));
  }, []);

  // ── Handlers ──
  const handleSaveProfileModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditFormError("");
    const res = await updateProfile({
      name: editForm.name,
      username: editForm.username,
      bio: editForm.bio,
      institution: editForm.institution,
      educationLevel: editForm.educationLevel,
      track: editForm.track,
    });

    if (res.success) {
      setEditFormSuccess(true);
      setTimeout(() => {
        setEditFormSuccess(false);
        setEditProfileModalOpen(false);
      }, 800);
    } else {
      setEditFormError(res.error || "Failed to update profile.");
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError("");
    const res = await updateProfile({
      name: settingsForm.name,
      email: settingsForm.email,
      username: settingsForm.username,
      bio: settingsForm.bio,
      institution: settingsForm.institution,
      educationLevel: settingsForm.educationLevel,
      weeklyGoalHours: Number(settingsForm.weeklyGoalHours),
      dailyGoalMinutes: Number(settingsForm.dailyGoalMinutes),
      notifications,
      privacy,
    });

    if (res.success) {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2500);
    } else {
      setSettingsError(res.error || "Failed to save settings.");
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (!passwordForm.currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordSuccess(true);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleAddSkill = () => {
    const trimmed = newSkillInput.trim();
    if (!trimmed) return;
    const currentSkills = user?.skills || [];
    if (!currentSkills.includes(trimmed)) {
      updateProfile({ skills: [...currentSkills, trimmed] });
    }
    setNewSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const currentSkills = user?.skills || [];
    updateProfile({ skills: currentSkills.filter((s) => s !== skillToRemove) });
  };

  const handleSelectAvatar = (url: string) => {
    updateProfile({ avatar: url });
    setAvatarModalOpen(false);
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center px-4">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#173B70] flex items-center justify-center mx-auto">
            <UserIcon size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-brand">Sign in to Access Your Profile</h2>
          <p className="text-sm text-slate-500">
            Log in to view your learning records, credentials, enrolled courses, and personalized goal tracking.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white font-bold text-sm shadow-md transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. STUDENT PROFILE HEADER BANNER                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0F1E36] via-[#173B70] to-[#0A1628] border border-white/10 shadow-xl overflow-hidden relative text-white">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          {/* Left: Avatar + Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar with Upload/Change Badge */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden ring-4 ring-cyan-400/40 shadow-2xl bg-slate-800">
                <Image
                  src={user.avatar || "/icon.jpg"}
                  alt={user.name}
                  width={112}
                  height={112}
                  unoptimized
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <button
                onClick={() => setAvatarModalOpen(true)}
                className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#18B6D2] hover:bg-cyan-300 text-slate-950 shadow-lg cursor-pointer transition-transform hover:scale-110"
                title="Change Avatar Photo"
              >
                <Camera size={14} />
              </button>
            </div>

            {/* Name, Username, Badges, Institution */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-brand tracking-tight text-white">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  <ShieldCheck size={12} />
                  <span>Verified Student</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                  Level {currentLevel?.levelNumber || 1}: {currentLevel?.title || "Explorer"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-blue-200/80 font-mono">
                <span>@{user.username || user.email.split("@")[0]}</span>
                <span>•</span>
                <span>ID: {user.id}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Calendar size={12} />
                  <span>Member since {user.joinedDate || "October 2026"}</span>
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed pt-1">
                {user.bio || "Student and developer building modern digital skills on SLRJ Learn."}
              </p>

              {/* Education / Institution pill */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-cyan-300 font-medium">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <GraduationCap size={13} className="text-cyan-400" />
                  <span>{user.institution || "SLRJ Learn Academy"}</span>
                  {user.educationLevel && <span className="text-slate-400">({user.educationLevel})</span>}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-amber-300">
                  <Compass size={13} />
                  <span>{user.track}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center shrink-0">
            <button
              onClick={() => setEditProfileModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Edit3 size={14} />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Settings size={14} />
              <span>Settings</span>
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. LEARNING METRICS OVERVIEW CARDS                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Card 1: Enrolled */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1 hover:border-[#173B70] transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Enrolled</span>
            <BookOpen size={16} className="text-[#173B70]" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-brand">{enrolledCount}</div>
          <div className="text-[11px] text-slate-500">Active courses</div>
        </div>

        {/* Card 2: Completed */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1 hover:border-emerald-500 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Completed</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-brand">{completedCourses.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium">100% finished</div>
        </div>

        {/* Card 3: Learning Hours */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1 hover:border-[#18B6D2] transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Time Spent</span>
            <Clock size={16} className="text-[#18B6D2]" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-brand">{totalLearningHours}h</div>
          <div className="text-[11px] text-slate-500">Study hours logged</div>
        </div>

        {/* Card 4: Quizzes Completed */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1 hover:border-amber-500 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Quizzes</span>
            <Target size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-brand">{quizzesCompletedCount}</div>
          <div className="text-[11px] text-slate-500">Assessments passed</div>
        </div>

        {/* Card 5: Coding Practice */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1 hover:border-indigo-500 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Coding</span>
            <Code2 size={16} className="text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-brand">{codeAssessmentsCount}</div>
          <div className="text-[11px] text-slate-500">Challenges solved</div>
        </div>

        {/* Card 6: Certificates */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1 hover:border-cyan-500 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Credentials</span>
            <Award size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-brand">{certificates.length}</div>
          <div className="text-[11px] text-cyan-600 font-medium">Verified certificates</div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. WEEKLY ACTIVITY & STREAK TARGET SECTION                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Streak Flame Banner */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
            <Flame size={28} className="fill-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
                {gamificationState.streak?.currentStreak || 3} Day Streak!
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Personal best: {gamificationState.streak?.longestStreak || 7} days in a row. Keep learning daily!
            </p>
          </div>
        </div>

        {/* 7-Day Mini Tracker */}
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end">
          {weeklyDays.map((d) => (
            <div key={d.name} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  d.isToday
                    ? "bg-[#173B70] text-white shadow-md ring-2 ring-cyan-400 ring-offset-2"
                    : d.hasActivity
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {d.hasActivity ? <Check size={14} className="stroke-[3]" /> : d.name.slice(0, 1)}
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">{d.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. MAIN PROFILE NAVIGATION TABS                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar pb-px text-xs sm:text-sm font-semibold select-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "overview"
              ? "border-[#173B70] text-[#173B70] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <TrendingUp size={15} />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("learning")}
          className={`px-4 py-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "learning"
              ? "border-[#173B70] text-[#173B70] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <BookOpen size={15} />
          <span>My Learning</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-mono">
            {enrolledCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("certificates")}
          className={`px-4 py-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "certificates"
              ? "border-[#173B70] text-[#173B70] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Award size={15} />
          <span>My Certificates</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-700 font-mono font-bold">
            {certificates.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "skills"
              ? "border-[#173B70] text-[#173B70] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Target size={15} />
          <span>Skills &amp; Goals</span>
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "saved"
              ? "border-[#173B70] text-[#173B70] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Bookmark size={15} />
          <span>Saved Notes</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-mono">
            {savedNotesList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "settings"
              ? "border-[#173B70] text-[#173B70] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Settings size={15} />
          <span>Account Settings</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB CONTENT 1: OVERVIEW                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Active In-Progress Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-brand">
                Jump Back In (Continue Learning)
              </h2>
              <button
                onClick={() => setActiveTab("learning")}
                className="text-xs sm:text-sm font-bold text-[#173B70] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View all courses</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {inProgressCourses.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
                <BookOpen size={32} className="mx-auto text-slate-300" />
                <h3 className="font-bold text-slate-900 text-base">No Courses Currently in Progress</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Explore our industry-standard courses and pick a pathway to start building practical software engineering skills.
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold shadow-md transition-all"
                >
                  <span>Explore Course Catalog</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {inProgressCourses.slice(0, 3).map((item) => {
                  const course = allCourses.find((c) => c.id === item.courseId);
                  const title = course?.title || item.courseId;
                  const totalLessons = course?.totalLessons || 12;
                  const completedLessons = item.completedPdfLessonIds?.length || 0;

                  return (
                    <div
                      key={item.courseId}
                      className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#173B70] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#173B70] font-mono font-bold text-[10px] uppercase">
                            {course?.difficulty || "Core"}
                          </span>
                          <span className="font-bold text-cyan-600 font-mono text-xs">
                            {item.progressPercentage}% Complete
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base group-hover:text-[#173B70] transition-colors line-clamp-2">
                          {title}
                        </h4>
                        <div className="text-xs text-slate-500">
                          {completedLessons} of {totalLessons} lessons completed
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-3">
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#173B70] to-[#18B6D2] rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(5, item.progressPercentage)}%` }}
                          />
                        </div>
                        <Link
                          href={`/courses/${course?.slug || item.courseId}`}
                          className="w-full py-2 px-3 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                        >
                          <span>Continue Learning</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Target Roadmap Track Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-blue-50 via-cyan-50 to-white border border-blue-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173B70] uppercase font-mono tracking-wider">
                <Compass size={14} className="text-[#18B6D2]" />
                <span>Selected Career Track</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 font-brand">
                {activeRoadmap.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeRoadmap.description}
              </p>
            </div>
            <Link
              href={`/roadmap/${activeRoadmap.id}`}
              className="px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Open Full Curriculum</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB CONTENT 2: MY LEARNING                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "learning" && (
        <div className="space-y-6">
          {/* Sub-Tabs: In Progress, Completed, All */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLearningSubTab("inprogress")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                learningSubTab === "inprogress"
                  ? "bg-[#173B70] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              In Progress ({inProgressCourses.length})
            </button>
            <button
              onClick={() => setLearningSubTab("completed")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                learningSubTab === "completed"
                  ? "bg-[#173B70] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Completed ({completedCourses.length})
            </button>
            <button
              onClick={() => setLearningSubTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                learningSubTab === "all"
                  ? "bg-[#173B70] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Enrolled ({enrolledCount})
            </button>
          </div>

          {/* Courses List */}
          {enrolledCount === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
              <BookOpen size={36} className="mx-auto text-slate-300" />
              <h3 className="font-bold text-slate-900 text-lg">No Enrolled Courses Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our catalog of 21 comprehensive courses and begin your learning journey.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white font-bold text-xs shadow transition-all"
              >
                <span>Browse Courses</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(learningSubTab === "inprogress"
                ? inProgressCourses
                : learningSubTab === "completed"
                ? completedCourses
                : progressList
              ).map((item) => {
                const course = allCourses.find((c) => c.id === item.courseId);
                const title = course?.title || item.courseId;
                const totalLessons = course?.totalLessons || 12;
                const completedLessons = item.completedPdfLessonIds?.length || 0;

                return (
                  <div
                    key={item.courseId}
                    className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#173B70] shadow-xs flex flex-col justify-between gap-4 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#173B70] font-mono font-bold text-[10px] uppercase">
                          {course?.category || "Programming"}
                        </span>
                        <span
                          className={`font-bold font-mono text-xs ${
                            item.progressPercentage >= 80 ? "text-emerald-600" : "text-cyan-600"
                          }`}
                        >
                          {item.progressPercentage}% Complete
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">{title}</h4>
                      <p className="text-xs text-slate-500">
                        {completedLessons} of {totalLessons} modules finished
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.progressPercentage >= 80
                              ? "bg-emerald-500"
                              : "bg-gradient-to-r from-[#173B70] to-[#18B6D2]"
                          }`}
                          style={{ width: `${Math.max(5, item.progressPercentage)}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/courses/${course?.slug || item.courseId}`}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold text-center transition-all shadow-xs"
                        >
                          {item.progressPercentage >= 80 ? "Review Material" : "Continue"}
                        </Link>
                        {item.progressPercentage >= 80 && (
                          <button
                            onClick={() => setActiveTab("certificates")}
                            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 cursor-pointer"
                            title="View Certificate"
                          >
                            <Award size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB CONTENT 3: MY CERTIFICATES                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "certificates" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
                My Official Certificates &amp; Credentials
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Verifiable digital certificates awarded for passing course assessments and completing career roadmaps.
              </p>
            </div>
            <Link
              href="/verify-certificate"
              className="text-xs sm:text-sm font-bold text-[#173B70] hover:underline flex items-center gap-1 self-start sm:self-center"
            >
              <span>Credential Verification Portal</span>
              <ExternalLink size={14} />
            </Link>
          </div>

          {certificates.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
              <Award size={40} className="mx-auto text-slate-300" />
              <h3 className="font-bold text-slate-900 text-lg">No Certificates Earned Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Certificates are legitimately issued when you reach at least 80% completion in eligible courses and pass the final coding assessment.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white font-bold text-xs shadow transition-all"
              >
                <span>Explore Eligible Courses</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-[#173B70] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between gap-4 group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-mono font-bold text-[10px] border border-amber-200 uppercase">
                        {cert.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 size={13} />
                        <span>Verified Credential</span>
                      </span>
                    </div>

                    <h3 className="font-black text-slate-900 text-lg group-hover:text-[#173B70] transition-colors leading-snug">
                      {cert.sourceTitle || cert.title}
                    </h3>

                    <div className="space-y-1 font-mono text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                      <div>Learner: <strong className="text-slate-800">{cert.learnerName}</strong></div>
                      <div>ID: <strong className="text-[#173B70]">{cert.id}</strong></div>
                      <div>Issued: <strong className="text-slate-800">{cert.issueDate}</strong></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setActiveCertificate(cert);
                        setIsCertificateModalOpen(true);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye size={13} />
                      <span>View &amp; PDF</span>
                    </button>
                    <Link
                      href={`/verify-certificate?id=${cert.id}`}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Open Instant Verification QR"
                    >
                      <ExternalLink size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB CONTENT 4: SKILLS & GOALS                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          {/* Skills Inventory */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-brand">
                  My Tech Skills &amp; Competencies
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Technologies, frameworks, and programming languages you are currently mastering.
                </p>
              </div>

              {/* Add Skill Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="e.g. Docker, GraphQL"
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#173B70]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddSkill();
                  }}
                />
                <button
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Skill Badges List */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {(user.skills || []).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#173B70] border border-blue-200 text-xs font-bold font-mono group"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-500 cursor-pointer"
                    title="Remove skill"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Weekly Target */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                    <Target size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Weekly Study Target</h4>
                    <span className="text-xs text-slate-500">Goal: {user.weeklyGoalHours || 8} hours per week</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("settings")}
                  className="text-xs text-[#173B70] font-bold hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-slate-600">{totalLearningHours}h achieved</span>
                  <span className="text-cyan-600">{Math.round((totalLearningHours / (user.weeklyGoalHours || 8)) * 100)}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[#18B6D2] rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.round((totalLearningHours / (user.weeklyGoalHours || 8)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Daily Habit Target */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Daily Practice Target</h4>
                    <span className="text-xs text-slate-500">Goal: {user.dailyGoalMinutes || 45} minutes / day</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("settings")}
                  className="text-xs text-[#173B70] font-bold hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                Consistency is the foundation of high-performance software engineering. 45 minutes of deliberate practice each day creates steady compound skill growth.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB CONTENT 5: SAVED NOTES                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "saved" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
                My Saved Study Notes &amp; Handbooks
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Quick access to bookmarked technical guides, architectural breakdowns, and cheat sheets.
              </p>
            </div>
            <Link
              href="/notes"
              className="text-xs sm:text-sm font-bold text-[#173B70] hover:underline flex items-center gap-1 self-start sm:self-center"
            >
              <span>Explore All Notes</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {savedNotesList.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
              <Bookmark size={36} className="mx-auto text-slate-300" />
              <h3 className="font-bold text-slate-900 text-lg">No Notes Bookmarked Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                While reading course materials and notes, click the bookmark icon to save key reference guides here.
              </p>
              <Link
                href="/notes"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white font-bold text-xs shadow transition-all"
              >
                <span>Browse Study Notes</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedNotesList.map((note) => (
                <div
                  key={note.slug}
                  className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#173B70] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#173B70] font-mono font-bold text-[10px] uppercase">
                        {note.category}
                      </span>
                      <button
                        onClick={() => toggleBookmark(note.slug)}
                        className="text-amber-500 hover:text-slate-400 cursor-pointer"
                        title="Remove bookmark"
                      >
                        <Bookmark size={15} className="fill-amber-500" />
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base group-hover:text-[#173B70] transition-colors leading-snug line-clamp-2">
                      {note.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{note.shortDescription}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">{note.readingTime || "8 min read"}</span>
                    <Link
                      href={`/notes/${note.slug}`}
                      className="font-bold text-[#173B70] hover:underline flex items-center gap-1"
                    >
                      <span>Read Note</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB CONTENT 6: ACCOUNT SETTINGS                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          {/* Section 1: Personal Profile Settings */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-brand">Personal Information</h3>
              <p className="text-xs text-slate-500 mt-0.5">Update your student name, public handle, and biography.</p>
            </div>

            {settingsSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Account settings saved and synchronized successfully!</span>
              </div>
            )}

            {settingsError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-600 shrink-0" />
                <span>{settingsError}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#173B70]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address (Read-only)</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    disabled
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Public Username (@handle)</label>
                  <input
                    type="text"
                    value={settingsForm.username}
                    onChange={(e) => setSettingsForm({ ...settingsForm, username: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#173B70]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Institution / University</label>
                  <input
                    type="text"
                    value={settingsForm.institution}
                    onChange={(e) => setSettingsForm({ ...settingsForm, institution: e.target.value })}
                    placeholder="e.g. SLRJ Institute of Technology"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#173B70]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Education Level</label>
                  <input
                    type="text"
                    value={settingsForm.educationLevel}
                    onChange={(e) => setSettingsForm({ ...settingsForm, educationLevel: e.target.value })}
                    placeholder="e.g. Undergraduate, High School, Working Professional"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#173B70]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Weekly Target (Hours)</label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={settingsForm.weeklyGoalHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, weeklyGoalHours: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#173B70]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Short Bio</label>
                <textarea
                  value={settingsForm.bio}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#173B70] resize-none"
                />
              </div>

              <div className="text-right pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Notifications & Privacy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Notifications */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-[#173B70]" />
                <h4 className="font-bold text-slate-900 text-base">Notification Preferences</h4>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                  <span>Course Announcements</span>
                  <input
                    type="checkbox"
                    checked={notifications.courseAnnouncements}
                    onChange={(e) => setNotifications({ ...notifications, courseAnnouncements: e.target.checked })}
                    className="w-4 h-4 text-[#173B70] rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                  <span>Assessment Reminders</span>
                  <input
                    type="checkbox"
                    checked={notifications.assessmentReminders}
                    onChange={(e) => setNotifications({ ...notifications, assessmentReminders: e.target.checked })}
                    className="w-4 h-4 text-[#173B70] rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                  <span>Daily Learning Reminders</span>
                  <input
                    type="checkbox"
                    checked={notifications.learningReminders}
                    onChange={(e) => setNotifications({ ...notifications, learningReminders: e.target.checked })}
                    className="w-4 h-4 text-[#173B70] rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                  <span>Certificate Issuance Alerts</span>
                  <input
                    type="checkbox"
                    checked={notifications.certificateAlerts}
                    onChange={(e) => setNotifications({ ...notifications, certificateAlerts: e.target.checked })}
                    className="w-4 h-4 text-[#173B70] rounded"
                  />
                </label>
              </div>
            </div>

            {/* Privacy */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Lock size={18} className="text-cyan-600" />
                <h4 className="font-bold text-slate-900 text-base">Privacy &amp; Visibility</h4>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                  <span>Public Learner Profile</span>
                  <input
                    type="checkbox"
                    checked={privacy.isPublic}
                    onChange={(e) => setPrivacy({ ...privacy, isPublic: e.target.checked })}
                    className="w-4 h-4 text-[#173B70] rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                  <span>Display Earned Certificates</span>
                  <input
                    type="checkbox"
                    checked={privacy.showCertificates}
                    onChange={(e) => setPrivacy({ ...privacy, showCertificates: e.target.checked })}
                    className="w-4 h-4 text-[#173B70] rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                  <span>Show Learning Streak &amp; XP</span>
                  <input
                    type="checkbox"
                    checked={privacy.showStreak}
                    onChange={(e) => setPrivacy({ ...privacy, showStreak: e.target.checked })}
                    className="w-4 h-4 text-[#173B70] rounded"
                  />
                </label>
              </div>
              <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                Your email and personal identifiers are always private and never exposed to the public.
              </p>
            </div>
          </div>

          {/* Section 3: Security & Password */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <KeyRound size={18} className="text-[#173B70]" />
              <h3 className="text-xl font-bold text-slate-900 font-brand">Security &amp; Password</h3>
            </div>

            {passwordSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Password changed successfully.</span>
              </div>
            )}

            {passwordError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-600 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#173B70]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#173B70]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="Re-type new password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#173B70]"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Section 4: Danger Zone */}
          <div className="p-6 rounded-3xl bg-rose-50/40 border border-rose-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-rose-900 text-base">Delete Learner Account</h4>
              <p className="text-xs text-rose-700 mt-0.5">
                Permanently delete your profile and reset your local credentials.
              </p>
            </div>
            <button
              onClick={() => setDeleteAccountModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MODALS: EDIT PROFILE, AVATAR, CERTIFICATE                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}

      {/* 1. Edit Profile Modal */}
      {editProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-lg font-brand">Edit Student Profile</h3>
              <button
                onClick={() => setEditProfileModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {editFormSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check size={14} className="text-emerald-600" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            {editFormError && (
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-800 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={14} className="text-rose-600" />
                <span>{editFormError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfileModal} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#173B70]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Username (@handle)</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#173B70]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Institution / College</label>
                <input
                  type="text"
                  value={editForm.institution}
                  onChange={(e) => setEditForm({ ...editForm, institution: e.target.value })}
                  placeholder="e.g. SLRJ Institute of Technology"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#173B70]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#173B70] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#173B70] hover:bg-[#12316B] text-white font-bold cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Avatar Selection Modal */}
      {avatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-base font-brand">Choose Avatar Photo</h3>
              <button
                onClick={() => setAvatarModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 py-2">
              {AVATAR_PRESETS.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAvatar(url)}
                  className="rounded-2xl overflow-hidden ring-2 ring-slate-200 hover:ring-[#173B70] transition-all cursor-pointer hover:scale-105"
                >
                  <Image
                    src={url}
                    alt={`Avatar option ${idx + 1}`}
                    width={96}
                    height={96}
                    unoptimized
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Click any avatar to instantly update your profile picture.
            </p>
          </div>
        </div>
      )}

      {/* 3. Official Certificate Modal */}
      <CertificateModal
        certificate={activeCertificate}
        isOpen={isCertificateModalOpen}
        onClose={() => {
          setIsCertificateModalOpen(false);
          setActiveCertificate(null);
        }}
      />

      {/* 4. Delete Account Confirmation Modal */}
      {deleteAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-base">
              <AlertCircle size={20} />
              <span>Confirm Account Deletion</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete your learner profile? All local course progress, certificates, and saved preferences will be reset.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setDeleteAccountModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  setDeleteAccountModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
              >
                Delete &amp; Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
