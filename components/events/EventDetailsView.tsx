"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EventItem } from "@/data/eventsData";
import { useEventsManager } from "@/lib/eventsStorage";
import EventRegistrationModal from "./EventRegistrationModal";
import { COURSES_DATA } from "@/data/courses";
import { PRACTICAL_PROJECTS } from "@/data/projectsData";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Award,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  ExternalLink,
  Code2,
  Terminal,
  BookOpen,
  FolderGit2,
  Compass,
  MessageSquare,
  AlertCircle,
  Copy,
  Check,
  Play,
  FileCode,
  Layers,
} from "lucide-react";

interface EventDetailsViewProps {
  event: EventItem;
}

export default function EventDetailsView({ event }: EventDetailsViewProps) {
  const {
    isRegistered,
    getRegistration,
    getSubmission,
    registerForEvent,
    cancelRegistration,
    submitChallenge,
  } = useEventsManager();

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "agenda" | "rules" | "challenge" | "submission">("overview");

  // Submission Form State
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [submissionTeamName, setSubmissionTeamName] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const registered = isRegistered(event.id) || isRegistered(event.slug);
  const userRegistration = getRegistration(event.id) || getRegistration(event.slug);
  const userSubmission = getSubmission(event.id) || getSubmission(event.slug);

  const startDateStr = new Date(event.startAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const deadlineDate = new Date(event.registrationClosesAt);
  const deadlineStr = deadlineDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isRegistrationClosed = deadlineDate.getTime() < Date.now();

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSubmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError("");

    if (!repoUrl.trim().startsWith("http")) {
      setSubmissionError("Please provide a valid GitHub or Git repository URL (must start with https://).");
      return;
    }

    if (!submissionNotes.trim()) {
      setSubmissionError("Please include a brief description of your implementation and architecture.");
      return;
    }

    submitChallenge(event.id, {
      challengeId: event.codingChallenge?.id,
      repositoryUrl: repoUrl.trim(),
      liveDemoUrl: demoUrl.trim() || undefined,
      description: submissionNotes.trim(),
      teamName: submissionTeamName.trim() || userRegistration?.teamName,
    });

    setSubmissionSuccess(true);
  };

  // Linked courses lookup
  const linkedCourses = COURSES_DATA.filter((c) => event.relatedCourseIds.includes(c.id));
  const linkedProjects = PRACTICAL_PROJECTS.filter((p) => event.relatedProjectIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* ── Breadcrumb & Back Link ── */}
      <div className="flex items-center justify-between text-xs">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 font-bold text-slate-500 hover:text-[#173B70] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to All Events & Challenges</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold transition-all shadow-2xs cursor-pointer"
        >
          {copiedLink ? <Check size={13} className="text-emerald-600" /> : <Share2 size={13} />}
          <span>{copiedLink ? "Link Copied!" : "Share Event"}</span>
        </button>
      </div>

      {/* ── Event Hero Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        {/* Cover Image banner */}
        <div className="relative w-full h-64 sm:h-80 bg-slate-900 overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            priority
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-5 left-5 right-5 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-[#173B70] text-white text-xs font-bold shadow-md">
                {event.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-white/90 backdrop-blur-md text-[#173B70] text-xs font-bold">
                {event.format}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-slate-200 text-xs">
                {event.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {event.allowsTeams && (
                <span className="px-3 py-1 rounded-xl bg-indigo-500/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                  <Users size={13} />
                  <span>Teams Allowed ({event.minTeamSize || 1}-{event.maxTeamSize || 4})</span>
                </span>
              )}
            </div>
          </div>

          {/* Bottom Title in Hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-brand tracking-tight max-w-3xl leading-tight">
              {event.title}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {event.shortDescription}
            </p>
          </div>
        </div>

        {/* ── Action & Logistics Bar ── */}
        <div className="p-6 bg-slate-50/80 border-t border-slate-200/90 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Start Date
              </span>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#173B70]" />
                <span>{new Date(event.startAt).toLocaleDateString()}</span>
              </div>
              <span className="text-[10px] text-slate-500">{event.timezone}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Registration Deadline
              </span>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock size={13} className="text-amber-600" />
                <span>{deadlineStr}</span>
              </div>
              <span className="text-[10px] text-slate-500">
                {isRegistrationClosed ? "Closed" : "Open for entries"}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Venue / Format
              </span>
              <div className="font-bold text-slate-900 truncate">
                {event.venue || "Virtual Online Space"}
              </div>
              <span className="text-[10px] text-slate-500">{event.format} session</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Participants
              </span>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Users size={13} className="text-emerald-600" />
                <span>{event.registeredCount} joined</span>
              </div>
              <span className="text-[10px] text-slate-500">
                {event.capacity > 0 ? `Limit: ${event.capacity}` : "Unlimited capacity"}
              </span>
            </div>
          </div>

          {/* Registration Status & CTA */}
          <div className="flex items-center gap-3">
            {registered ? (
              <div className="flex items-center gap-2">
                <div className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>You Are Registered</span>
                </div>

                <button
                  onClick={() => cancelRegistration(event.id)}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : isRegistrationClosed ? (
              <div className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-500 font-bold text-xs sm:text-sm">
                Registration Closed
              </div>
            ) : (
              <button
                onClick={() => setRegisterModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#173B70] hover:bg-[#122e58] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-[#173B70]/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Register for Event</span>
                <ArrowRight size={15} />
              </button>
            )}

            {event.meetingUrl && registered && (
              <a
                href={event.meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Join Live</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none text-xs">
        {[
          { id: "overview", label: "Event Overview" },
          { id: "agenda", label: event.phases ? "Challenge Phases" : "Agenda & Sessions" },
          { id: "rules", label: "Rules & Eligibility" },
          ...(event.codingChallenge ? [{ id: "challenge", label: "Coding Challenge Sandbox" }] : []),
          { id: "submission", label: "Submit Deliverables" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#173B70] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Main Tab Contents ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Primary Tab Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* TAB: Overview */}
          {activeTab === "overview" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6 text-sm text-slate-700 leading-relaxed">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 font-brand">About this Event</h3>
                <div className="whitespace-pre-line text-slate-600">
                  {event.fullDescription}
                </div>
              </div>

              {/* Rewards & Recognition */}
              {event.rewards && event.rewards.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 font-brand">
                    Prizes, Awards & Achievements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event.rewards.map((reward, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex items-start gap-3"
                      >
                        <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                          <Award size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">
                            {reward.title}
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            {reward.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evaluation Criteria */}
              {event.evaluationCriteria && event.evaluationCriteria.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 font-brand">
                    Evaluation & Scoring Criteria
                  </h3>
                  <div className="space-y-2.5">
                    {event.evaluationCriteria.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-slate-500">{c.description}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-[#173B70] font-black text-xs shrink-0">
                          {c.weight}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: Agenda or Phases */}
          {activeTab === "agenda" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 font-brand">
                {event.phases ? "Challenge Milestone Timeline" : "Scheduled Sessions & Agenda"}
              </h3>

              {event.phases && (
                <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                  {event.phases.map((phase) => (
                    <div key={phase.id} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#173B70] border-2 border-white" />
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {new Date(phase.startsAt).toLocaleDateString()} - {new Date(phase.endsAt).toLocaleDateString()}
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                          {phase.phaseName}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {event.agenda && (
                <div className="space-y-3">
                  {event.agenda.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-bold text-[#173B70] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {new Date(session.startsAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                          {new Date(session.endsAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="text-slate-500 font-medium">Host: {session.speaker}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{session.title}</h4>
                      <p className="text-xs text-slate-600">{session.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: Rules & Eligibility */}
          {activeTab === "rules" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 font-brand">
                Rules, Originality Guidelines & Eligibility
              </h3>
              <div className="space-y-4">
                {event.rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#173B70]" />
                      <h4 className="font-bold text-slate-900 text-sm">{rule.title}</h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed pl-6">
                      {rule.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Coding Challenge Sandbox (if configured) */}
          {activeTab === "challenge" && event.codingChallenge && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Live Coding Challenge
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-brand mt-1">
                    {event.codingChallenge.title}
                  </h3>
                </div>

                <Link
                  href={`/practice?challenge=${event.codingChallenge.id}&template=${event.codingChallenge.starterTemplateId}`}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Play size={13} fill="currentColor" />
                  <span>Open in Playground</span>
                </Link>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                {event.codingChallenge.problemStatement}
              </div>

              {/* Sample Test Cases */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Sample Test Cases
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.codingChallenge.sampleTestCases.map((tc) => (
                    <div
                      key={tc.id}
                      className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-1"
                    >
                      <div>
                        <span className="text-slate-400">Input: </span>
                        <span className="text-emerald-400">{tc.input}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Expected: </span>
                        <span className="text-cyan-400">{tc.expected}</span>
                      </div>
                      {tc.explanation && (
                        <div className="text-[11px] text-slate-400 font-sans pt-1 border-t border-slate-800">
                          {tc.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Submission Form */}
          {activeTab === "submission" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-brand">
                  Submit Deliverables for Review
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Provide your official GitHub repository and live deployment links before the submission cutoff.
                </p>
              </div>

              {userSubmission ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                    <CheckCircle2 size={16} />
                    <span>Submission Recorded (v{userSubmission.version})</span>
                  </div>
                  <div className="space-y-1 text-slate-700">
                    <div>
                      <strong>Repository:</strong>{" "}
                      <a
                        href={userSubmission.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#173B70] underline font-mono"
                      >
                        {userSubmission.repositoryUrl}
                      </a>
                    </div>
                    {userSubmission.liveDemoUrl && (
                      <div>
                        <strong>Live Demo:</strong>{" "}
                        <a
                          href={userSubmission.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#173B70] underline font-mono"
                        >
                          {userSubmission.liveDemoUrl}
                        </a>
                      </div>
                    )}
                    <div className="text-slate-600 mt-2">
                      <strong>Submitted Notes:</strong> {userSubmission.description}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-2 border-t border-emerald-200">
                    Status: <strong className="text-emerald-700">{userSubmission.status}</strong> • Submitted on {new Date(userSubmission.submittedAt).toLocaleString()}
                  </div>
                </div>
              ) : !registered ? (
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3 text-xs text-amber-900">
                  <AlertCircle size={24} className="mx-auto text-amber-600" />
                  <p>You must register for this event before submitting deliverables.</p>
                  <button
                    onClick={() => setRegisterModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#173B70] text-white font-bold text-xs"
                  >
                    Register Now
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmissionSubmit} className="space-y-4 text-xs">
                  {event.allowsTeams && (
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">
                        Team Name (if participating as team):
                      </label>
                      <input
                        type="text"
                        value={submissionTeamName}
                        onChange={(e) => setSubmissionTeamName(e.target.value)}
                        placeholder={userRegistration?.teamName || "e.g. CodeCraft Innovators"}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#173B70]"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Public GitHub / Git Repository URL: *
                    </label>
                    <input
                      type="url"
                      required
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/your-username/your-event-project"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-[#173B70]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Live Demo URL (Vercel, Netlify, Render, or Railway):
                    </label>
                    <input
                      type="url"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://your-demo-app.vercel.app"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-[#173B70]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Architecture & Implementation Notes: *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={submissionNotes}
                      onChange={(e) => setSubmissionNotes(e.target.value)}
                      placeholder="Explain your technical stack, key design decisions, and any known edge cases..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#173B70]"
                    />
                  </div>

                  {submissionError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {submissionError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#173B70] hover:bg-[#122e58] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#173B70]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Work for Evaluation</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Right 1 Column: Organizer & Ecosystem Connections */}
        <div className="space-y-6">
          {/* Organizer Card */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Event Host & Organizer
            </span>
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                <Image
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">
                  {event.organizer.name}
                </div>
                <div className="text-slate-500">{event.organizer.role}</div>
                <div className="text-[11px] font-semibold text-[#173B70]">
                  {event.organizer.company}
                </div>
              </div>
            </div>
          </div>

          {/* Linked Role Roadmaps */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Connected Role Roadmaps
            </span>
            <div className="flex flex-wrap gap-2">
              {event.relatedRoadmapIds.map((rid) => (
                <Link
                  key={rid}
                  href={`/roadmap/${rid}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#173B70] hover:bg-blue-100 font-bold capitalize transition-colors"
                >
                  <Compass size={13} />
                  <span>{rid} Roadmap</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Related Courses */}
          {linkedCourses.length > 0 && (
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Recommended Prerequisite Courses
              </span>
              <div className="space-y-2">
                {linkedCourses.slice(0, 2).map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 block transition-colors"
                  >
                    <div className="font-bold text-slate-900 line-clamp-1">{course.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {course.totalLessons} lessons • {course.difficulty}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {linkedProjects.length > 0 && (
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Portfolio Practice Projects
              </span>
              <div className="space-y-2">
                {linkedProjects.slice(0, 2).map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/projects/${proj.slug}`}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 block transition-colors"
                  >
                    <div className="font-bold text-slate-900 line-clamp-1">{proj.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {proj.category} • {proj.difficulty}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Community Discussion Link */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50/60 to-blue-50/60 border border-indigo-200/60 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-900">
              <MessageSquare size={15} />
              <span>Learner Community Channel</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Find teammates, discuss problem statements, and ask questions to organizers in the community chat.
            </p>
            <Link
              href="/community"
              className="inline-flex items-center gap-1.5 text-[#173B70] font-bold hover:underline pt-1"
            >
              <span>Open Event Discussion</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Registration Modal ── */}
      <EventRegistrationModal
        event={event}
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onRegisterSuccess={(eventId, details) => {
          registerForEvent(eventId, details);
        }}
      />
    </div>
  );
}
