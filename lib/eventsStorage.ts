// ============================================================================
// SLRJ Learn — Events & Challenges Client Persistence & State Store
// Manages registrations, challenge submissions, team affiliations, and activity tracking
// with cross-tab reactive synchronization and hydration safety.
// ============================================================================

import { useState, useEffect, useCallback, useMemo } from "react";
import { EVENTS_CATALOG, EventItem } from "@/data/eventsData";

export interface EventRegistrationRecord {
  id: string;
  eventId: string;
  learnerId: string;
  learnerName: string;
  learnerEmail: string;
  status: "Registered" | "Waitlisted" | "Cancelled" | "Checked In" | "Participating" | "Submitted" | "Completed";
  teamName?: string;
  teamMembers?: string[];
  rulesAcceptedAt: string;
  registeredAt: string;
  cancelledAt?: string;
}

export interface EventSubmissionRecord {
  id: string;
  eventId: string;
  challengeId?: string;
  learnerId: string;
  learnerName: string;
  teamName?: string;
  teamMembers?: string[];
  repositoryUrl: string;
  liveDemoUrl?: string;
  description: string;
  attachments?: string[];
  submittedAt: string;
  version: number;
  status: "Submitted" | "Under Review" | "Accepted" | "Scored";
  score?: number;
  feedback?: string;
  certificateIssued?: boolean;
  certificateId?: string;
}

const REGISTRATIONS_STORAGE_KEY = "slrj_events_registrations_v2";
const SUBMISSIONS_STORAGE_KEY = "slrj_events_submissions_v2";
const SAVED_EVENTS_STORAGE_KEY = "slrj_events_saved_v2";
const EVENTS_EVENT = "slrj-events-updated";

// ── Pure Storage Helpers ──

export function getStoredRegistrations(): Record<string, EventRegistrationRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Failed to parse event registrations:", err);
    return {};
  }
}

export function saveStoredRegistrations(records: Record<string, EventRegistrationRecord>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(records));
    window.dispatchEvent(new CustomEvent(EVENTS_EVENT));
  } catch (err) {
    console.error("Failed to save event registrations:", err);
  }
}

export function getStoredSubmissions(): Record<string, EventSubmissionRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Failed to parse event submissions:", err);
    return {};
  }
}

export function saveStoredSubmissions(records: Record<string, EventSubmissionRecord>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(records));
    window.dispatchEvent(new CustomEvent(EVENTS_EVENT));
  } catch (err) {
    console.error("Failed to save event submissions:", err);
  }
}

export function getStoredSavedEvents(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_EVENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to parse saved events:", err);
    return [];
  }
}

export function saveStoredSavedEvents(eventIds: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SAVED_EVENTS_STORAGE_KEY, JSON.stringify(eventIds));
    window.dispatchEvent(new CustomEvent(EVENTS_EVENT));
  } catch (err) {
    console.error("Failed to save bookmarked events:", err);
  }
}

// ── React Hook: useEventsManager ──

export function useEventsManager() {
  const [registrations, setRegistrations] = useState<Record<string, EventRegistrationRecord>>({});
  const [submissions, setSubmissions] = useState<Record<string, EventSubmissionRecord>>({});
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state on client mount to maintain identical SSR & initial hydration render
  useEffect(() => {
    setRegistrations(getStoredRegistrations());
    setSubmissions(getStoredSubmissions());
    setSavedEventIds(getStoredSavedEvents());
    setIsLoaded(true);

    const handleSync = () => {
      setRegistrations(getStoredRegistrations());
      setSubmissions(getStoredSubmissions());
      setSavedEventIds(getStoredSavedEvents());
    };

    window.addEventListener(EVENTS_EVENT, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(EVENTS_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const getRegistration = useCallback(
    (eventId: string): EventRegistrationRecord | null => {
      const reg = registrations[eventId];
      if (!reg || reg.status === "Cancelled") return null;
      return reg;
    },
    [registrations]
  );

  const isRegistered = useCallback(
    (eventId: string): boolean => {
      const reg = registrations[eventId];
      return Boolean(reg && reg.status !== "Cancelled");
    },
    [registrations]
  );

  const getSubmission = useCallback(
    (eventId: string): EventSubmissionRecord | null => {
      return submissions[eventId] || null;
    },
    [submissions]
  );

  const isSaved = useCallback(
    (eventId: string): boolean => {
      return savedEventIds.includes(eventId);
    },
    [savedEventIds]
  );

  // Register for an event
  const registerForEvent = useCallback(
    (
      eventId: string,
      details: {
        learnerId?: string;
        learnerName?: string;
        learnerEmail?: string;
        teamName?: string;
        teamMembers?: string[];
      }
    ) => {
      const all = getStoredRegistrations();
      const existing = all[eventId];

      const record: EventRegistrationRecord = {
        id: existing?.id || `reg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        eventId,
        learnerId: details.learnerId || "usr_shahid_01",
        learnerName: details.learnerName || "Shahid",
        learnerEmail: details.learnerEmail || "shahid@slrjlearn.in",
        status: "Registered",
        teamName: details.teamName,
        teamMembers: details.teamMembers || [],
        rulesAcceptedAt: new Date().toISOString(),
        registeredAt: new Date().toISOString(),
      };

      all[eventId] = record;
      saveStoredRegistrations(all);
      setRegistrations(all);
      return record;
    },
    []
  );

  // Cancel an active registration
  const cancelRegistration = useCallback((eventId: string) => {
    const all = getStoredRegistrations();
    if (all[eventId]) {
      all[eventId] = {
        ...all[eventId],
        status: "Cancelled",
        cancelledAt: new Date().toISOString(),
      };
      saveStoredRegistrations(all);
      setRegistrations(all);
    }
  }, []);

  // Toggle bookmark
  const toggleSaveEvent = useCallback((eventId: string) => {
    const current = getStoredSavedEvents();
    const updated = current.includes(eventId) ? current.filter((id) => id !== eventId) : [...current, eventId];
    saveStoredSavedEvents(updated);
    setSavedEventIds(updated);
    return updated.includes(eventId);
  }, []);

  // Submit challenge deliverables
  const submitChallenge = useCallback(
    (
      eventId: string,
      payload: {
        challengeId?: string;
        learnerId?: string;
        learnerName?: string;
        teamName?: string;
        teamMembers?: string[];
        repositoryUrl: string;
        liveDemoUrl?: string;
        description: string;
        attachments?: string[];
      }
    ) => {
      const allSubmissions = getStoredSubmissions();
      const existing = allSubmissions[eventId];
      const version = existing ? existing.version + 1 : 1;

      const submission: EventSubmissionRecord = {
        id: existing?.id || `sub_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        eventId,
        challengeId: payload.challengeId,
        learnerId: payload.learnerId || "usr_shahid_01",
        learnerName: payload.learnerName || "Shahid",
        teamName: payload.teamName,
        teamMembers: payload.teamMembers,
        repositoryUrl: payload.repositoryUrl,
        liveDemoUrl: payload.liveDemoUrl,
        description: payload.description,
        attachments: payload.attachments,
        submittedAt: new Date().toISOString(),
        version,
        status: "Submitted",
        score: undefined,
        feedback: "Your deliverables have been successfully submitted for jury review. Evaluation results will be posted by the scheduled announcement date.",
      };

      allSubmissions[eventId] = submission;
      saveStoredSubmissions(allSubmissions);
      setSubmissions(allSubmissions);

      // Also update registration status to Submitted
      const allRegs = getStoredRegistrations();
      if (allRegs[eventId]) {
        allRegs[eventId].status = "Submitted";
        saveStoredRegistrations(allRegs);
        setRegistrations(allRegs);
      }

      return submission;
    },
    []
  );

  // Derived "My Activities" grouping
  const myActivities = useMemo(() => {
    const activeRegList = Object.values(registrations).filter((r) => r && r.status !== "Cancelled");
    const activeEventIds = new Set(activeRegList.map((r) => r.eventId));

    const registeredEvents: EventItem[] = [];
    const inProgressEvents: EventItem[] = [];
    const submissionItems: { event: EventItem; submission: EventSubmissionRecord }[] = [];
    const completedEvents: EventItem[] = [];

    activeRegList.forEach((reg) => {
      const evt = EVENTS_CATALOG.find((e) => e.id === reg.eventId || e.slug === reg.eventId);
      if (!evt) return;

      const sub = submissions[evt.id] || submissions[evt.slug];

      if (sub && (sub.status === "Scored" || sub.status === "Accepted")) {
        completedEvents.push(evt);
      } else if (sub) {
        submissionItems.push({ event: evt, submission: sub });
      } else if (evt.status === "Ongoing" || reg.status === "Participating") {
        inProgressEvents.push(evt);
      } else {
        registeredEvents.push(evt);
      }
    });

    return {
      totalCount: activeEventIds.size,
      registered: registeredEvents,
      inProgress: inProgressEvents,
      submissions: submissionItems,
      completed: completedEvents,
    };
  }, [registrations, submissions]);

  return {
    isLoaded,
    registrations,
    submissions,
    savedEventIds,
    getRegistration,
    isRegistered,
    getSubmission,
    isSaved,
    registerForEvent,
    cancelRegistration,
    toggleSaveEvent,
    submitChallenge,
    myActivities,
  };
}
