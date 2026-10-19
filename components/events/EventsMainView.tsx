"use client";

import React, { useState, useMemo } from "react";
import EventsHeader from "./EventsHeader";
import FeaturedEventCard from "./FeaturedEventCard";
import EventCategoryTabs from "./EventCategoryTabs";
import EventSearchAndFilters, { EventFilterState } from "./EventSearchAndFilters";
import EventGrid from "./EventGrid";
import MyActivitiesSection from "./MyActivitiesSection";
import EventRegistrationModal from "./EventRegistrationModal";
import { EVENTS_CATALOG, EventItem } from "@/data/eventsData";
import { useEventsManager } from "@/lib/eventsStorage";

export default function EventsMainView() {
  const {
    isRegistered,
    getRegistration,
    isSaved,
    toggleSaveEvent,
    registerForEvent,
    cancelRegistration,
    myActivities,
  } = useEventsManager();

  // Top-level navigation state
  const [activeView, setActiveView] = useState<"discover" | "my-activities">("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [showFilters, setShowFilters] = useState(false);

  // Modal State
  const [registerModalEvent, setRegisterModalEvent] = useState<EventItem | null>(null);

  // Filters State
  const [filters, setFilters] = useState<EventFilterState>({
    status: "all",
    format: "all",
    difficulty: "all",
    roadmapId: "all",
    sortBy: "recommended",
  });

  const handleChangeFilter = <K extends keyof EventFilterState>(
    key: K,
    value: EventFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: "all",
      format: "all",
      difficulty: "all",
      roadmapId: "all",
      sortBy: "recommended",
    });
    setSearchQuery("");
    setSelectedCategory("All Events");
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.format !== "all" ||
    filters.difficulty !== "all" ||
    filters.roadmapId !== "all" ||
    filters.sortBy !== "recommended" ||
    searchQuery.trim() !== "" ||
    selectedCategory !== "All Events";

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Events": EVENTS_CATALOG.length };
    EVENTS_CATALOG.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered & Sorted Catalog
  const filteredEvents = useMemo(() => {
    return EVENTS_CATALOG.filter((evt) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = evt.title.toLowerCase().includes(query);
        const matchesDesc = evt.shortDescription.toLowerCase().includes(query);
        const matchesCategory = evt.category.toLowerCase().includes(query);
        const matchesOrganizer = evt.organizer.name.toLowerCase().includes(query);
        const matchesRoadmap = evt.relatedRoadmapIds.some((r) => r.toLowerCase().includes(query));

        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesOrganizer && !matchesRoadmap) {
          return false;
        }
      }

      // 2. Category Tab
      if (selectedCategory !== "All Events" && evt.category !== selectedCategory) {
        return false;
      }

      // 3. Status Filter
      if (filters.status !== "all" && evt.status !== filters.status) {
        return false;
      }

      // 4. Format Filter
      if (filters.format !== "all" && evt.format !== filters.format) {
        return false;
      }

      // 5. Difficulty Filter
      if (filters.difficulty !== "all" && evt.difficulty !== filters.difficulty) {
        return false;
      }

      // 6. Roadmap Filter
      if (filters.roadmapId !== "all" && !evt.relatedRoadmapIds.includes(filters.roadmapId)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "startingSoon") {
        return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
      }
      if (filters.sortBy === "deadlineApproaching") {
        return new Date(a.registrationClosesAt).getTime() - new Date(b.registrationClosesAt).getTime();
      }
      if (filters.sortBy === "newest") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      // "recommended" (Featured first, then start date)
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
    });
  }, [searchQuery, selectedCategory, filters]);

  // Featured Event
  const featuredEvent = useMemo(() => {
    return EVENTS_CATALOG.find((e) => e.isFeatured) || EVENTS_CATALOG[0];
  }, []);

  const upcomingCount = useMemo(
    () => EVENTS_CATALOG.filter((e) => e.status === "Upcoming" || e.status === "Registration Open").length,
    []
  );

  const activeChallengesCount = useMemo(
    () => EVENTS_CATALOG.filter((e) => e.category === "Coding Challenges" || Boolean(e.codingChallenge)).length,
    []
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* ── Header ── */}
      <EventsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        activeView={activeView}
        onViewChange={setActiveView}
        upcomingCount={upcomingCount}
        activeChallengesCount={activeChallengesCount}
        registeredCount={myActivities.totalCount}
        completedCount={myActivities.completed.length}
      />

      {/* ── View 1: Discover Events & Challenges ── */}
      {activeView === "discover" && (
        <div className="space-y-8">
          {/* Featured Event Card (Shown when not filtering by narrow query) */}
          {!searchQuery && selectedCategory === "All Events" && filters.status === "all" && (
            <FeaturedEventCard
              event={featuredEvent}
              isRegistered={isRegistered(featuredEvent.id) || isRegistered(featuredEvent.slug)}
              onOpenRegisterModal={(e) => setRegisterModalEvent(e)}
            />
          )}

          {/* Category Tabs */}
          <EventCategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
          />

          {/* Filter Panel (Collapsible) */}
          {showFilters && (
            <EventSearchAndFilters
              filters={filters}
              onChangeFilter={handleChangeFilter}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          )}

          {/* Results Count & Active Filter Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? "event" : "events"}
              {selectedCategory !== "All Events" && ` in ${selectedCategory}`}
            </span>
          </div>

          {/* Event Cards Grid */}
          <EventGrid
            events={filteredEvents}
            isRegistered={isRegistered}
            isSaved={isSaved}
            onToggleSave={toggleSaveEvent}
            onOpenRegisterModal={(e) => setRegisterModalEvent(e)}
            onResetFilters={handleResetFilters}
          />
        </div>
      )}

      {/* ── View 2: My Activities Dashboard ── */}
      {activeView === "my-activities" && (
        <MyActivitiesSection
          myActivities={myActivities}
          getRegistration={getRegistration}
          onCancelRegistration={cancelRegistration}
          onSwitchToDiscover={() => setActiveView("discover")}
        />
      )}

      {/* ── Registration Dialog ── */}
      <EventRegistrationModal
        event={registerModalEvent}
        isOpen={Boolean(registerModalEvent)}
        onClose={() => setRegisterModalEvent(null)}
        onRegisterSuccess={(eventId, details) => {
          registerForEvent(eventId, details);
        }}
      />
    </div>
  );
}
