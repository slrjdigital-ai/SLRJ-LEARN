"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EventItem } from "@/data/eventsData";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface FeaturedEventCardProps {
  event: EventItem;
  isRegistered: boolean;
  onOpenRegisterModal: (event: EventItem) => void;
}

export default function FeaturedEventCard({
  event,
  isRegistered,
  onOpenRegisterModal,
}: FeaturedEventCardProps) {
  // Format dates cleanly
  const startDateStr = new Date(event.startAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const deadlineStr = new Date(event.registrationClosesAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isRegistrationClosed = new Date(event.registrationClosesAt).getTime() < Date.now();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c234b] via-[#173B70] to-[#122b56] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-900/40">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Details & Metadata */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={12} className="text-cyan-300" />
              Featured Event
            </span>

            <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-slate-200 text-xs font-semibold">
              {event.category}
            </span>

            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              {event.format}
            </span>

            <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-slate-300 text-xs">
              {event.difficulty}
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-brand tracking-tight text-white leading-tight">
              {event.title}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2.5 leading-relaxed">
              {event.shortDescription}
            </p>
          </div>

          {/* Quick Schedule & Venue Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-cyan-400 shrink-0" />
              <span>
                <strong className="text-white">Starts:</strong> {startDateStr} ({event.timezone})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={15} className="text-amber-400 shrink-0" />
              <span>
                <strong className="text-white">Deadline:</strong> {deadlineStr}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-rose-400 shrink-0" />
              <span className="truncate">
                <strong className="text-white">Venue:</strong> {event.venue || "Virtual Online Space"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={15} className="text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">Participants:</strong> {event.registeredCount}{" "}
                {event.capacity > 0 ? `/ ${event.capacity} registered` : "registered"}
              </span>
            </div>
          </div>

          {/* Rewards Preview Bar */}
          {event.rewards && event.rewards.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-semibold">Rewards:</span>
              {event.rewards.slice(0, 3).map((r, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-cyan-200 text-[11px] font-medium"
                >
                  <Award size={12} className="text-amber-400" />
                  <span>{r.title}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Visual Thumbnail & Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 lg:w-72 shrink-0">
          <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-white/15 shadow-lg">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-xs flex items-center justify-between text-white">
              <span className="font-semibold">{event.organizer.company}</span>
              <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px]">
                {event.allowsTeams ? "Teams (1-4)" : "Solo Entry"}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <Link
              href={`/events/${event.slug}`}
              className="w-full py-2.5 px-4 rounded-xl bg-white text-[#173B70] hover:bg-slate-100 font-bold text-xs sm:text-sm text-center transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Full Details</span>
              <ArrowRight size={14} />
            </Link>

            {isRegistered ? (
              <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 size={15} />
                <span>You are Registered</span>
              </div>
            ) : isRegistrationClosed ? (
              <div className="w-full py-2.5 px-4 rounded-xl bg-slate-700/60 text-slate-400 font-bold text-xs text-center">
                Registration Closed
              </div>
            ) : (
              <button
                onClick={() => onOpenRegisterModal(event)}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md shadow-cyan-400/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register for Hackathon</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
