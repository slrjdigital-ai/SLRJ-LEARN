"use client";

import { useState, useMemo, useRef } from "react";
import { ROADMAP_TRACKS, ROADMAP_STEPS, RoadmapTrack } from "@/data/roadmap";
import { useRoadmapProgress } from "@/lib/roadmapProgress";
import RoadmapHeader from "./RoadmapHeader";
import MyRoadmapsSection from "./MyRoadmapsSection";
import FeaturedRoadmapCard from "./FeaturedRoadmapCard";
import RoadmapFilterPanel, {
  RoadmapCategoryFilter,
  RoadmapDifficultyFilter,
  RoadmapSortOption,
} from "./RoadmapFilterPanel";
import RoadmapGrid from "./RoadmapGrid";

// The 10 primary career roles specified by the SLRJ Learn Structured Roadmap
export const PRIMARY_ROLE_IDS = [
  "fullstack",
  "frontend",
  "backend",
  "ai-ml",
  "ai-agents",
  "dsa",
  "java",
  "data-analyst",
  "cloud-devops",
  "python",
];

export default function RoleRoadmapsView() {
  const catalogRef = useRef<HTMLDivElement>(null);
  const { progressMap, toggleSave } = useRoadmapProgress();

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<RoadmapCategoryFilter>("All Paths");
  const [selectedDifficulty, setSelectedDifficulty] = useState<RoadmapDifficultyFilter>("All");
  const [selectedSort, setSelectedSort] = useState<RoadmapSortOption>("Recommended");

  // The 8 Primary Career Tracks
  const primaryTracks = useMemo(() => {
    return ROADMAP_TRACKS.filter((t) => PRIMARY_ROLE_IDS.includes(t.id));
  }, []);

  // Featured track (Full-Stack Developer)
  const featuredTrack = useMemo(() => {
    return primaryTracks.find((t) => t.id === "fullstack") || primaryTracks[0];
  }, [primaryTracks]);

  const featuredSteps = useMemo(() => {
    return ROADMAP_STEPS.filter((s) => s.trackId === featuredTrack.id);
  }, [featuredTrack]);

  // Started / Active Roadmaps for "My Roadmaps" section
  const startedTracks = useMemo(() => {
    return primaryTracks
      .map((track) => {
        const progress = progressMap[track.id];
        if (!progress) return null;
        const isStarted =
          progress.status === "in_progress" ||
          progress.status === "completed" ||
          progress.isSaved ||
          progress.completedStageIds.length > 0;

        if (!isStarted) return null;

        const completedCount = progress.completedStageIds.length;
        const percent =
          track.totalStages > 0
            ? Math.round((completedCount / track.totalStages) * 100)
            : 0;

        return {
          track,
          progress,
          completedCount,
          percent,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [primaryTracks, progressMap]);

  // Overall Completion across all started paths
  const overallCompletionPercent = useMemo(() => {
    if (startedTracks.length === 0) return 0;
    const totalPercent = startedTracks.reduce((acc, curr) => acc + curr.percent, 0);
    return Math.round(totalPercent / startedTracks.length);
  }, [startedTracks]);

  // Active filter count indicator
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "All Paths") count++;
    if (selectedDifficulty !== "All") count++;
    if (selectedSort !== "Recommended") count++;
    return count;
  }, [selectedCategory, selectedDifficulty, selectedSort]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Paths");
    setSelectedDifficulty("All");
    setSelectedSort("Recommended");
  };

  // Scroll to catalog section
  const handleExploreClick = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filtered and Sorted Career Tracks
  const filteredTracks = useMemo(() => {
    return primaryTracks
      .filter((track) => {
        // Search matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = track.name.toLowerCase().includes(q);
          const matchDesc = track.description.toLowerCase().includes(q);
          const matchCategory = track.category.toLowerCase().includes(q);
          const matchSkills = track.skills.some((s) => s.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCategory && !matchSkills) {
            return false;
          }
        }

        // Category matching
        if (selectedCategory !== "All Paths") {
          if (track.category !== selectedCategory) {
            return false;
          }
        }

        // Difficulty matching
        if (selectedDifficulty !== "All") {
          if (track.level !== selectedDifficulty) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === "Beginner Friendly") {
          const rank = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          return (rank[a.level] || 2) - (rank[b.level] || 2);
        }
        if (selectedSort === "Shortest Estimated Duration") {
          return a.totalStages - b.totalStages;
        }
        if (selectedSort === "Most Popular") {
          return b.totalLessons - a.totalLessons;
        }
        // Recommended default order
        return PRIMARY_ROLE_IDS.indexOf(a.id) - PRIMARY_ROLE_IDS.indexOf(b.id);
      });
  }, [primaryTracks, searchQuery, selectedCategory, selectedDifficulty, selectedSort]);

  return (
    <div className="space-y-8 sm:space-y-10 pb-16">
      {/* 1. Page Header with Metrics, Search, Filter Toggle & CTA */}
      <RoadmapHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isFilterOpen={isFilterOpen}
        onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
        totalPaths={primaryTracks.length}
        startedCount={startedTracks.length}
        overallCompletionPercent={overallCompletionPercent}
        onExploreClick={handleExploreClick}
        activeFilterCount={activeFilterCount}
      />

      {/* 2. My Roadmaps Section (Started / Saved Paths) */}
      <MyRoadmapsSection
        startedTracks={startedTracks}
        onExploreClick={handleExploreClick}
        onToggleSave={toggleSave}
      />

      {/* 3. Featured Career Path (Full-Stack Developer) */}
      <FeaturedRoadmapCard
        track={featuredTrack}
        steps={featuredSteps}
        progress={progressMap[featuredTrack.id] || null}
        onToggleSave={toggleSave}
      />

      {/* 4. Career Catalog Section */}
      <div ref={catalogRef} className="space-y-5 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-brand">
              Career Roadmaps Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Showing {filteredTracks.length} of {primaryTracks.length} comprehensive career paths
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Requirements and tools reflect current industry guidance.
          </div>
        </div>

        {/* Filters and Sorting Controls */}
        <RoadmapFilterPanel
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={setSelectedDifficulty}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onReset={handleResetFilters}
          activeFilterCount={activeFilterCount}
        />

        {/* Responsive Grid */}
        <RoadmapGrid
          tracks={filteredTracks}
          progressMap={progressMap}
          onToggleSave={toggleSave}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
}
