"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EventItem, EventStatus } from "@/data/eventsData";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Code2,
} from "lucide-react";

interface EventCardProps {
  event: EventItem;
  isRegistered: boolean;
  isSaved: boolean;
  onToggleSave: (eventId: string) => void;
  onOpenRegisterModal: (event: EventItem) => void;
}

export default function EventCard({
  event,
  isRegistered,
  isSaved,
  onToggleSave,
  onOpenRegisterModal,
}: EventCardProps) {
  const startDateStr = new Date(event.startAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const deadlineDate = new Date(event.registrationClosesAt);
  const deadlineStr = deadlineDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const isRegistrationClosed = deadlineDate.getTime() < Date.now();

  // Status badge styling
  const statusConfigMap: Partial<Record<EventStatus, { bg: string; label: string }>> = {
    "Registration Open": {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      label: "Registration Open",
    },
    "Ongoing": {
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      label: "Ongoing",
    },
    "Upcoming": {
      bg: "bg-slate-100 text-slate-700 border-slate-200",
      label: "Upcoming",
    },
    "Registration Closed": {
      bg: "bg-slate-100 text-slate-500 border-slate-200",
      label: "Registration Closed",
    },
    "Completed": {
      bg: "bg-purple-50 text-purple-700 border-purple-200",
      label: "Completed",
    },
    "Cancelled": {
      bg: "bg-rose-50 text-rose-700 border-rose-200",
      label: "Cancelled",
    },
    "Submission Closed": {
      bg: "bg-amber-50 text-amber-700 border-amber-200",
      label: "Submission Closed",
    },
    "Under Review": {
      bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      label: "Under Review",
    },
    "Draft": {
      bg: "bg-slate-100 text-slate-600 border-slate-200",
      label: "Draft",
    },
    "Published": {
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      label: "Published",
    },
  };

  const statusConfig = statusConfigMap[event.status] || {
    bg: "bg-slate-100 text-slate-700 border-slate-200",
    label: event.status,
  };

  return (
    <div className="group rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      {/* ── Top Cover Image & Floating Badges ── */}
      <div className="relative w-full h-44 overflow-hidden bg-slate-100">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        {/* Floating Category & Format */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
            {event.category}
          </span>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[#173B70] text-[10px] font-bold">
              {event.format}
            </span>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleSave(event.id);
              }}
              className="p-1.5 rounded-lg bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer"
              title={isSaved ? "Remove bookmark" : "Save event"}
            >
              <Bookmark
                size={14}
                className={isSaved ? "text-amber-400 fill-amber-400" : "text-white"}
              />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Organizer & Team Status */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white">
          <span className="font-semibold truncate">{event.organizer.company}</span>
          <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[10px]">
            {event.allowsTeams ? "Teams Welcome" : "Individual"}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Status & Difficulty Row */}
          <div className="flex items-center justify-between text-xs">
            <span
              className={`px-2 py-0.5 rounded-md border text-[11px] font-bold ${statusConfig.bg}`}
            >
              {statusConfig.label}
            </span>

            <span className="text-[11px] font-semibold text-slate-500">
              {event.difficulty}
            </span>
          </div>

          {/* Title */}
          <Link href={`/events/${event.slug}`} className="block group-hover:text-[#173B70] transition-colors">
            <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
              {event.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
            {event.shortDescription}
          </p>
        </div>

        {/* Dates & Logistics */}
        <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Calendar size={13} className="text-[#173B70]" />
              <span>Starts: {startDateStr}</span>
            </div>
            <span className="text-[11px] text-slate-400">{event.timezone}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-amber-500" />
              <span>Deadline: {deadlineStr}</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <Users size={12} className="text-slate-400" />
              <span>{event.registeredCount} joined</span>
            </div>
          </div>
        </div>

        {/* Rewards / Certificate Badge */}
        {event.certificateEligible && (
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50/70 border border-amber-200/60 text-amber-900 text-[11px] font-medium">
            <Award size={12} className="text-amber-600 shrink-0" />
            <span className="truncate">Verifiable Certificate upon completion</span>
          </div>
        )}

        {/* ── Card Action Buttons ── */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            href={`/events/${event.slug}`}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight size={13} />
          </Link>

          {isRegistered ? (
            <div className="py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5">
              <CheckCircle2 size={13} />
              <span>Registered</span>
            </div>
          ) : isRegistrationClosed ? (
            <div className="py-2 px-3 rounded-xl bg-slate-100 text-slate-400 font-semibold text-xs text-center">
              Closed
            </div>
          ) : (
            <button
              onClick={() => onOpenRegisterModal(event)}
              className="py-2 px-3 rounded-xl bg-[#173B70] hover:bg-[#122e58] text-white font-bold text-xs transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Register</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
