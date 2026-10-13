"use client";

import { useState, useMemo } from "react";
import { NoteItem } from "@/data/notes";
import { PdfItem } from "@/data/pdfs";
import { CATEGORIES } from "@/data/notes";
import NoteCard from "@/components/blog/NoteCard";
import { Search, Filter, BookOpen, X } from "lucide-react";

interface BlogHomeClientProps {
  initialNotes: NoteItem[];
  initialPdfs?: PdfItem[];
}

export default function BlogHomeClient({
  initialNotes,
}: BlogHomeClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter notes in real time
  const filteredNotes = useMemo(() => {
    return initialNotes.filter((note) => {
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

      return matchesSearch && matchesCategory;
    });
  }, [initialNotes, searchQuery, selectedCategory]);

  const isFiltering = searchQuery.trim().length > 0 || selectedCategory !== "All";

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ── Search Bar & Filter Bar ────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1527] border border-slate-800 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input Box */}
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
              placeholder="Search by topic, e.g. Flexbox, DNS, Promises, Next.js, Git..."
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

          {/* Category Filter Pills (Desktop Horizontal) */}
          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <Filter size={15} className="text-gray-500 hidden sm:inline flex-shrink-0" />
            <select
              value={selectedCategory}
              suppressHydrationWarning
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter notes by category"
              className="w-full md:w-48 px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 font-sans cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0D1527] text-white">
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Search Status Pill */}
        {isFiltering && (
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-gray-400">
            <span>
              Found <strong className="text-emerald-400 font-bold">{filteredNotes.length}</strong> matching notes
              {searchQuery && <> for &quot;{searchQuery}&quot;</>}
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Render Filtered Results if User is searching */}
      {isFiltering && (
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-6">
            <BookOpen size={14} />
            <span>Search Results</span>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-[#0D1527] border border-slate-800">
              <p className="text-base text-gray-300 font-medium mb-2">
                No educational notes found matching your search.
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Try searching for broader keywords like HTML, CSS, JavaScript, React, or Git.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-colors cursor-pointer"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
