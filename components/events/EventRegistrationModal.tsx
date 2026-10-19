"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EventItem } from "@/data/eventsData";
import { useAuth } from "@/context/AuthContext";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Users,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface EventRegistrationModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (eventId: string, details: { teamName?: string; teamMembers?: string[] }) => void;
}

export default function EventRegistrationModal({
  event,
  isOpen,
  onClose,
  onRegisterSuccess,
}: EventRegistrationModalProps) {
  const { user } = useAuth();
  const [teamName, setTeamName] = useState("");
  const [teamMembersInput, setTeamMembersInput] = useState("");
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!rulesAccepted) {
      setErrorMsg("You must review and accept the official event rules to proceed.");
      return;
    }

    if (event.allowsTeams && event.minTeamSize && event.minTeamSize > 1 && !teamName.trim()) {
      setErrorMsg("Please specify a team name for this team competition.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const members = teamMembersInput
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);

      onRegisterSuccess(event.id, {
        teamName: teamName.trim() || undefined,
        teamMembers: members.length > 0 ? members : undefined,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setTeamName("");
    setTeamMembersInput("");
    setRulesAccepted(false);
    setErrorMsg("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Modal Header */}
            <div className="space-y-1.5 pr-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#173B70] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                Official Event Registration
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-brand">
                {event.title}
              </h3>
              <p className="text-xs text-slate-500">
                Category: <strong className="text-slate-700">{event.category}</strong> • Format: <strong className="text-slate-700">{event.format}</strong>
              </p>
            </div>

            {/* Event Timing Reminder */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#173B70]" />
                <span>
                  Starts: <strong>{new Date(event.startAt).toLocaleDateString()}</strong> ({event.timezone})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-amber-600" />
                <span>
                  Registration Deadline: <strong>{new Date(event.registrationClosesAt).toLocaleDateString()}</strong>
                </span>
              </div>
            </div>

            {/* Learner Identity info */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Registering As:
              </label>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 font-semibold flex items-center justify-between">
                <span>{user?.name || "Shahid"}</span>
                <span className="text-slate-500 font-mono text-[11px]">{user?.email || "shahid@slrjlearn.in"}</span>
              </div>
            </div>

            {/* Team details if event allows teams */}
            {event.allowsTeams && (
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
                  <Users size={14} className="text-indigo-600" />
                  <span>Team Participation Details (Optional)</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">
                      Team Name:
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. CodeCraft Innovators"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-indigo-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">
                      Teammate Emails or Usernames (comma-separated):
                    </label>
                    <input
                      type="text"
                      value={teamMembersInput}
                      onChange={(e) => setTeamMembersInput(e.target.value)}
                      placeholder="e.g. priya@slrjlearn.in, alex@code.dev"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-indigo-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                    <span className="text-[10px] text-slate-500">
                      Team size limit: {event.minTeamSize || 1} to {event.maxTeamSize || 4} members.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Rules Acknowledgment Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={rulesAccepted}
                  onChange={(e) => setRulesAccepted(e.target.checked)}
                  className="mt-0.5 rounded text-[#173B70] focus:ring-[#173B70] border-slate-300 cursor-pointer"
                />
                <span>
                  I have read and agree to the <strong>event rules</strong>, original work policy, and community code of conduct.
                </span>
              </label>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#173B70] hover:bg-[#122e58] text-white font-bold text-xs transition-all shadow-md shadow-[#173B70]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "Registering..." : "Confirm Registration"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        ) : (
          /* ── Registration Success View ── */
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-black text-slate-900 font-brand">
                Registration Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                You are officially registered for <strong>{event.title}</strong>. Your participation has been recorded in your learner activities.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1 text-left">
              <div className="font-bold text-slate-900 mb-1">What to do next:</div>
              <div>• Check out the event agenda and challenge guidelines.</div>
              <div>• Prepare your development environment or join the Discord channel.</div>
              <div>• Access your registered events anytime from <strong>My Activities</strong>.</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
              <Link
                href={`/events/${event.slug}`}
                onClick={handleClose}
                className="w-full py-2.5 px-4 rounded-xl bg-[#173B70] hover:bg-[#122e58] text-white font-bold text-xs sm:text-sm text-center transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Go to Event Workspace</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
