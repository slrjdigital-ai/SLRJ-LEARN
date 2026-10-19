"use client";

import React from "react";
import EventCard from "./EventCard";
import { EventItem } from "@/data/eventsData";
import { SearchX, RotateCcw } from "lucide-react";

interface EventGridProps {
  events: EventItem[];
  isRegistered: (eventId: string) => boolean;
  isSaved: (eventId: string) => boolean;
  onToggleSave: (eventId: string) => void;
  onOpenRegisterModal: (event: EventItem) => void;
  onResetFilters: () => void;
}

export default function EventGrid({
  events,
  isRegistered,
  isSaved,
  onToggleSave,
  onOpenRegisterModal,
  onResetFilters,
}: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="py-16 px-4 rounded-3xl bg-white border border-slate-200/90 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 border border-slate-200 mx-auto flex items-center justify-center">
          <SearchX size={28} />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 font-brand">
            No Events or Challenges Found
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
            We couldn&apos;t find any events matching your selected search query or active filters. Try broadening your criteria.
          </p>
        </div>
        <div>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isRegistered={isRegistered(event.id) || isRegistered(event.slug)}
          isSaved={isSaved(event.id)}
          onToggleSave={onToggleSave}
          onOpenRegisterModal={onOpenRegisterModal}
        />
      ))}
    </div>
  );
}
