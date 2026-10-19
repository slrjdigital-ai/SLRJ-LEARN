"use client";

import { useState, useMemo, useRef } from "react";
import { PracticalProject, getAllPracticalProjects, getRecommendedProjects } from "@/data/projectsData";
import { useProjectProgress, usePortfolio } from "@/lib/projectProgress";
import { useRoadmapProgress } from "@/lib/roadmapProgress";
import ProjectsHeader from "./ProjectsHeader";
import MyProjectsSection from "./MyProjectsSection";
import RecommendedProjectsSection from "./RecommendedProjectsSection";
import ProjectSearchAndFilters, {
  ProjectCategoryFilter,
  ProjectDifficultyFilter,
  ProjectEffortFilter,
  ProjectSortOption,
} from "./ProjectSearchAndFilters";
import ProjectGrid from "./ProjectGrid";
import MyPortfolioEditor from "./MyPortfolioEditor";
import { Compass, Sparkles, FolderGit2, Globe } from "lucide-react";

export type ProjectViewTab = "discover" | "my_projects" | "portfolio";

export default function ProjectsMainView() {
  const [activeTab, setActiveTab] = useState<ProjectViewTab>("discover");
  const catalogRef = useRef<HTMLDivElement>(null);

  const allProjects = useMemo(() => getAllPracticalProjects(), []);
  const { projectMap, activeProjects, completedProjects, toggleSave } = useProjectProgress();
  const { portfolio, updatePortfolio, toggleProjectSelection, publishPortfolio, unpublishPortfolio } = usePortfolio();
  const { activeRoadmaps } = useRoadmapProgress();

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategoryFilter>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<ProjectDifficultyFilter>("All");
  const [selectedRoadmap, setSelectedRoadmap] = useState<string>("all");
  const [selectedEffort, setSelectedEffort] = useState<ProjectEffortFilter>("All");
  const [selectedSort, setSelectedSort] = useState<ProjectSortOption>("Recommended");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Recommendations logic based on learner's active roadmaps
  const userFirstRoadmap = activeRoadmaps[0];
  const recommendedProjects = useMemo(() => {
    return getRecommendedProjects(userFirstRoadmap?.roadmapId);
  }, [userFirstRoadmap]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "All") count++;
    if (selectedDifficulty !== "All") count++;
    if (selectedRoadmap !== "all") count++;
    if (selectedEffort !== "All") count++;
    if (selectedSort !== "Recommended") count++;
    return count;
  }, [selectedCategory, selectedDifficulty, selectedRoadmap, selectedEffort, selectedSort]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setSelectedRoadmap("all");
    setSelectedEffort("All");
    setSelectedSort("Recommended");
  };

  const handleBuildClick = () => {
    setActiveTab("discover");
    setTimeout(() => {
      catalogRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleViewPortfolioClick = () => {
    setActiveTab("portfolio");
  };

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return allProjects
      .filter((project) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = project.title.toLowerCase().includes(q);
          const matchTagline = project.tagline.toLowerCase().includes(q);
          const matchCategory = project.category.toLowerCase().includes(q);
          const matchSkills = project.skillsRequired.some((s) => s.toLowerCase().includes(q));
          const matchTools = project.tools?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchTagline && !matchCategory && !matchSkills && !matchTools) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== "All") {
          if (project.category !== selectedCategory) {
            return false;
          }
        }

        // Difficulty filter
        if (selectedDifficulty !== "All") {
          if (project.difficulty !== selectedDifficulty) {
            return false;
          }
        }

        // Roadmap filter
        if (selectedRoadmap !== "all") {
          if (!project.roadmapIds.includes(selectedRoadmap)) {
            return false;
          }
        }

        // Effort filter
        if (selectedEffort !== "All") {
          if (selectedEffort === "Short" && project.estimatedEffortMinutes >= 240) return false;
          if (selectedEffort === "Medium" && (project.estimatedEffortMinutes < 240 || project.estimatedEffortMinutes > 360)) return false;
          if (selectedEffort === "Long" && project.estimatedEffortMinutes <= 360) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === "Newest") {
          return b.id.localeCompare(a.id);
        }
        if (selectedSort === "Most Popular") {
          return b.xpReward - a.xpReward;
        }
        if (selectedSort === "Shortest Estimated Effort") {
          return a.estimatedEffortMinutes - b.estimatedEffortMinutes;
        }
        if (selectedSort === "Difficulty") {
          const rank = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          return (rank[a.difficulty] || 2) - (rank[b.difficulty] || 2);
        }
        // Recommended
        return 0;
      });
  }, [allProjects, searchQuery, selectedCategory, selectedDifficulty, selectedRoadmap, selectedEffort, selectedSort]);

  return (
    <div className="space-y-8 sm:space-y-10 pb-16">
      {/* ── 1. Page Header with Real Metrics & Actions ── */}
      <ProjectsHeader
        totalAvailable={allProjects.length}
        inProgressCount={activeProjects.filter((p) => p.status === "In Progress").length}
        completedCount={completedProjects.length}
        portfolioPublishedCount={portfolio.isPublished ? (portfolio.selectedProjectIds?.length || 0) : 0}
        onBuildClick={handleBuildClick}
        onViewPortfolioClick={handleViewPortfolioClick}
      />

      {/* ── 2. Segmented Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("discover")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "discover"
              ? "bg-[#173B70] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Discover Projects</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono">
            {allProjects.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("my_projects")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "my_projects"
              ? "bg-[#173B70] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>My Projects</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-blue-100 text-[#173B70] font-mono">
            {activeProjects.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("portfolio")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "portfolio"
              ? "bg-[#173B70] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>My Portfolio</span>
          {portfolio.isPublished && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>
      </div>

      {/* ── 3. Tab Contents ── */}
      {activeTab === "discover" && (
        <div className="space-y-10">
          {/* Recommended for You Section */}
          <RecommendedProjectsSection
            recommendedProjects={recommendedProjects}
            isPersonalized={Boolean(userFirstRoadmap)}
            userRoadmapTitle={userFirstRoadmap?.roadmapId}
          />

          {/* Search, Filters & Catalog Grid */}
          <div ref={catalogRef} className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-brand">
                  Explore Project Library
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Showing {filteredProjects.length} of {allProjects.length} hands-on practical engineering projects
                </p>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Structured acceptance criteria, starter files, and Playground integration
              </div>
            </div>

            <ProjectSearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              onSelectDifficulty={setSelectedDifficulty}
              selectedRoadmap={selectedRoadmap}
              onSelectRoadmap={setSelectedRoadmap}
              selectedEffort={selectedEffort}
              onSelectEffort={setSelectedEffort}
              selectedSort={selectedSort}
              onSelectSort={setSelectedSort}
              isFilterDrawerOpen={isFilterDrawerOpen}
              onToggleFilterDrawer={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              onClearFilters={handleClearFilters}
              activeFilterCount={activeFilterCount}
            />

            <ProjectGrid
              projects={filteredProjects}
              records={projectMap}
              onToggleSave={toggleSave}
              onResetFilters={handleClearFilters}
            />
          </div>
        </div>
      )}

      {activeTab === "my_projects" && (
        <MyProjectsSection
          records={projectMap}
          allProjects={allProjects}
          onExploreClick={() => setActiveTab("discover")}
          onRoadmapsClick={() => (window.location.href = "/roadmap")}
        />
      )}

      {activeTab === "portfolio" && (
        <MyPortfolioEditor
          portfolio={portfolio}
          onUpdatePortfolio={updatePortfolio}
          onToggleProjectSelection={toggleProjectSelection}
          onPublish={publishPortfolio}
          onUnpublish={unpublishPortfolio}
          allProjects={allProjects}
          records={projectMap}
        />
      )}
    </div>
  );
}
