"use client";

import { useState, useMemo } from "react";
import { NoteItem, CATEGORIES } from "@/data/notes";
import { PdfItem } from "@/data/pdfs";
import NoteCard from "@/components/blog/NoteCard";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import { Search, Filter, BookOpen, X } from "lucide-react";

interface NotesClientProps {
  initialNotes: NoteItem[];
  initialPdfs?: PdfItem[];
  selectedCategoryFromQuery?: string;
}

export default function NotesClient({
  initialNotes,
  selectedCategoryFromQuery = "All",
}: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromQuery);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState<"latest" | "readingTime">("latest");
  const [visibleCount, setVisibleCount] = useState(9);

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  // Filtering & Sorting
  const filteredNotes = useMemo(() => {
    return initialNotes
      .filter((note) => {
        const matchesSearch =
          searchQuery === "" ||
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (note.tags || []).some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          );

        const matchesCategory =
          selectedCategory === "All" || note.category === selectedCategory;

        const matchesDifficulty =
          selectedDifficulty === "All" || note.difficulty === selectedDifficulty;

        return matchesSearch && matchesCategory && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === "readingTime") {
          const aTime = parseInt(a.readingTime) || 0;
          const bTime = parseInt(b.readingTime) || 0;
          return aTime - bTime;
        }
        return 0; // Default curated order
      });
  }, [initialNotes, searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const displayedNotes = useMemo(() => {
    return filteredNotes.slice(0, visibleCount);
  }, [filteredNotes, visibleCount]);

  const hasMore = visibleCount < filteredNotes.length;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setSortBy("latest");
    setVisibleCount(9);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "All Notes" },
        ]}
      />

      {/* Page Header */}
      <div className="py-8 mb-8 border-b border-slate-800">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
          CURATED DEVELOPER & CS LIBRARY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-brand mb-4">
          Computer Science & Tech Engineering Notes
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Comprehensive, field-tested study notes across Full-Stack Web Development, Data Structures & Algorithms, Python & AI, Operating Systems, DBMS & SQL, and Cloud DevOps.
        </p>
      </div>

      {/* ── Filter Controls Bar ──────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0D1527] border border-slate-800 shadow-xl mb-10 space-y-5">
        {/* Top: Search and Dropdowns */}
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Search Box */}
          <div className="relative w-full flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
            />
            <input
              type="text"
              suppressHydrationWarning
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or technology..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/[0.04] border border-slate-700/80 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="w-full sm:w-auto flex items-center gap-3">
            <select
              value={selectedDifficulty}
              suppressHydrationWarning
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              aria-label="Filter notes by difficulty level"
              className="w-full sm:w-44 px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 font-sans cursor-pointer"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff} className="bg-[#0D1527] text-white">
                  {diff === "All" ? "All Difficulties" : `${diff} Level`}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              suppressHydrationWarning
              onChange={(e) => setSortBy(e.target.value as "latest" | "readingTime")}
              aria-label="Sort notes"
              className="w-full sm:w-44 px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 font-sans cursor-pointer"
            >
              <option value="latest" className="bg-[#0D1527] text-white">Curated Order</option>
              <option value="readingTime" className="bg-[#0D1527] text-white">Shortest Read</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Orderly Wrapped, No Scrollbar) */}
        <div className="pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5 mr-1 py-1 font-semibold">
            <Filter size={13} className="text-cyan-400" />
            <span>Category:</span>
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold shadow-md shadow-emerald-500/20"
                    : "bg-white/[0.04] hover:bg-white/10 text-gray-300 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-2">
          <span>
            Showing <strong className="text-white font-bold">{displayedNotes.length}</strong> of{" "}
            <strong className="text-white font-bold">{filteredNotes.length}</strong> available notes
          </span>

          {(searchQuery || selectedCategory !== "All" || selectedDifficulty !== "All") && (
            <button
              onClick={handleResetFilters}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* ── Cards Grid ────────────────────────────────────────── */}
      {displayedNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
            />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-[#0D1527] border border-slate-800 mb-12">
          <BookOpen size={48} className="mx-auto text-cyan-400 mb-4 opacity-80" />
          <h3 className="text-xl font-bold text-white mb-2 font-brand">
            No Notes Found Matching Your Criteria
          </h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
            We couldn&apos;t find any notes matching the selected filters. Try broadening your category or difficulty selection.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center my-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-8 py-3.5 rounded-full font-bold text-sm bg-white/5 hover:bg-white/10 text-white border border-slate-700 hover:border-cyan-400/50 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            Load More Notes ({filteredNotes.length - displayedNotes.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
