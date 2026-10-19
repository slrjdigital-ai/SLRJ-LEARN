"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EventItem } from "@/data/eventsData";
import { EventRegistrationRecord, EventSubmissionRecord } from "@/lib/eventsStorage";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Award,
  ArrowRight,
  ExternalLink,
  Code2,
  CheckCircle2,
  FileText,
  Trash2,
  Sparkles,
  Inbox,
  Play,
} from "lucide-react";

interface MyActivitiesSectionProps {
  myActivities: {
    totalCount: number;
    registered: EventItem[];
    inProgress: EventItem[];
    submissions: { event: EventItem; submission: EventSubmissionRecord }[];
    completed: EventItem[];
  };
  getRegistration: (eventId: string) => EventRegistrationRecord | null;
  onCancelRegistration: (eventId: string) => void;
  onSwitchToDiscover: () => void;
}

export default function MyActivitiesSection({
  myActivities,
  getRegistration,
  onCancelRegistration,
  onSwitchToDiscover,
}: MyActivitiesSectionProps) {
  const [activeTab, setActiveTab] = useState<"registered" | "inProgress" | "submissions" | "completed">("registered");

  const tabCounts = {
    registered: myActivities.registered.length,
    inProgress: myActivities.inProgress.length,
    submissions: myActivities.submissions.length,
    completed: myActivities.completed.length,
  };

  return (
    <div className="space-y-6">
      {/* ── Subtabs Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/90 pb-4">
        <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          {[
            { id: "registered", label: "Registered", count: tabCounts.registered },
            { id: "inProgress", label: "In Progress", count: tabCounts.inProgress },
            { id: "submissions", label: "Submissions", count: tabCounts.submissions },
            { id: "completed", label: "Completed", count: tabCounts.completed },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#173B70] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onSwitchToDiscover}
          className="text-xs font-bold text-[#173B70] hover:text-[#0f274a] transition-colors flex items-center gap-1"
        >
          <span>Explore More Events</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* ── Tab Content ── */}
      {activeTab === "registered" && (
        <div className="space-y-4">
          {myActivities.registered.length === 0 ? (
            <EmptyState
              title="No Upcoming Registered Events"
              description="You have not registered for any upcoming events or webinars yet. Discover an activity to build your skills."
              onAction={onSwitchToDiscover}
              actionText="Browse Upcoming Events"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myActivities.registered.map((evt) => {
                const reg = getRegistration(evt.id);
                return (
                  <ActivityCard
                    key={evt.id}
                    event={evt}
                    registration={reg}
                    onCancelRegistration={() => onCancelRegistration(evt.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === "inProgress" && (
        <div className="space-y-4">
          {myActivities.inProgress.length === 0 ? (
            <EmptyState
              title="No In-Progress Activities"
              description="You have no ongoing coding challenges or active hackathons at this moment."
              onAction={onSwitchToDiscover}
              actionText="Explore Ongoing Challenges"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myActivities.inProgress.map((evt) => {
                const reg = getRegistration(evt.id);
                return (
                  <ActivityCard
                    key={evt.id}
                    event={evt}
                    registration={reg}
                    onCancelRegistration={() => onCancelRegistration(evt.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === "submissions" && (
        <div className="space-y-4">
          {myActivities.submissions.length === 0 ? (
            <EmptyState
              title="No Submissions Under Review"
              description="You have not submitted deliverables for any hackathons or competitions yet."
              onAction={onSwitchToDiscover}
              actionText="Find Competitions"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myActivities.submissions.map(({ event, submission }) => (
                <SubmissionCard key={event.id} event={event} submission={submission} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="space-y-4">
          {myActivities.completed.length === 0 ? (
            <EmptyState
              title="No Completed Events Yet"
              description="Participate in an event, submit your deliverables, and claim your verified certificates and profile badges."
              onAction={onSwitchToDiscover}
              actionText="Start a Challenge"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myActivities.completed.map((evt) => {
                const reg = getRegistration(evt.id);
                return (
                  <ActivityCard
                    key={evt.id}
                    event={evt}
                    registration={reg}
                    isCompleted
                    onCancelRegistration={() => onCancelRegistration(evt.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Sub-component: ActivityCard ──

function ActivityCard({
  event,
  registration,
  isCompleted = false,
  onCancelRegistration,
}: {
  event: EventItem;
  registration: EventRegistrationRecord | null;
  isCompleted?: boolean;
  onCancelRegistration: () => void;
}) {
  const [confirmCancel, setConfirmCancel] = useState(false);

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      <div className="relative w-full h-36 bg-slate-100">
        <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
            {event.category}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/90 text-[#173B70] text-[10px] font-bold">
            {event.format}
          </span>
        </div>
        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-xs font-bold truncate">
          {event.title}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-xs">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#173B70]" />
              <span>Starts: {new Date(event.startAt).toLocaleDateString()}</span>
            </span>
            <span className="text-[10px] font-mono">{event.timezone}</span>
          </div>

          {registration?.teamName && (
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-900 text-[11px] font-medium">
              Team: <strong>{registration.teamName}</strong>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Link
              href={`/events/${event.slug}`}
              className="flex-1 py-2 px-3 rounded-xl bg-[#173B70] hover:bg-[#122e58] text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-1"
            >
              <span>Event Workspace</span>
              <ArrowRight size={13} />
            </Link>

            {event.meetingUrl && (
              <a
                href={event.meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#173B70] font-bold text-xs text-center transition-all flex items-center justify-center gap-1"
                title="Join Live Session"
              >
                <span>Join</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Cancel Registration Option (if not completed) */}
          {!isCompleted && (
            <div className="flex items-center justify-between pt-1">
              {!confirmCancel ? (
                <button
                  onClick={() => setConfirmCancel(true)}
                  className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={11} />
                  <span>Cancel Registration</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-rose-600 font-bold">Are you sure?</span>
                  <button
                    onClick={onCancelRegistration}
                    className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold cursor-pointer"
                  >
                    Yes, Cancel
                  </button>
                  <button
                    onClick={() => setConfirmCancel(false)}
                    className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold cursor-pointer"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-component: SubmissionCard ──

function SubmissionCard({
  event,
  submission,
}: {
  event: EventItem;
  submission: EventSubmissionRecord;
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-5 space-y-3 text-xs">
      <div className="flex items-center justify-between gap-2">
        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#173B70] font-bold text-[11px] border border-blue-200">
          {submission.status}
        </span>
        <span className="text-slate-400 text-[11px]">
          v{submission.version} • {new Date(submission.submittedAt).toLocaleDateString()}
        </span>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{event.title}</h4>
        <p className="text-slate-500 text-xs mt-1 line-clamp-2">{submission.description}</p>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
        <div className="flex items-center justify-between text-slate-600">
          <span className="font-semibold">GitHub Repository:</span>
          <a
            href={submission.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#173B70] hover:underline font-mono truncate max-w-[160px]"
          >
            {submission.repositoryUrl}
          </a>
        </div>

        {submission.liveDemoUrl && (
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold">Live Demo:</span>
            <a
              href={submission.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#173B70] hover:underline font-mono truncate max-w-[160px]"
            >
              {submission.liveDemoUrl}
            </a>
          </div>
        )}
      </div>

      <div className="pt-2 flex items-center justify-between gap-2">
        <Link
          href={`/events/${event.slug}`}
          className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs text-center transition-all flex items-center justify-center gap-1"
        >
          <span>View Event Status</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ── Sub-component: EmptyState ──

function EmptyState({
  title,
  description,
  onAction,
  actionText,
}: {
  title: string;
  description: string;
  onAction: () => void;
  actionText: string;
}) {
  return (
    <div className="py-16 px-4 rounded-3xl bg-white border border-slate-200/90 text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#173B70] border border-blue-100 mx-auto flex items-center justify-center">
        <Inbox size={26} />
      </div>
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-brand">
          {title}
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      <div>
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#173B70] hover:bg-[#122e58] text-white text-xs font-bold transition-all shadow-md shadow-[#173B70]/20 cursor-pointer"
        >
          <Sparkles size={14} />
          <span>{actionText}</span>
        </button>
      </div>
    </div>
  );
}
