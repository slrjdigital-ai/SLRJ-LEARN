"use client";

import { useState, useMemo } from "react";
import { PdfItem } from "@/data/pdfs";
import PdfCard from "@/components/blog/PdfCard";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import PdfPreviewModal from "@/components/blog/PdfPreviewModal";
import { Search, Filter, FileText, X, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface PdfsClientProps {
  initialPdfs: PdfItem[];
}

export default function PdfsClient({ initialPdfs }: PdfsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Preview Modal
  const [previewPdf, setPreviewPdf] = useState<PdfItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const PREFERRED_ORDER = [
    "Web Development",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Git & GitHub",
    "Backend & Databases",
    "Deployment",
    "Data Structures & Algorithms",
    "Python & AI",
    "Computer Science Core",
    "Cloud & DevOps",
  ];

  // Derive unique categories ordered by preferred sequence
  const categories = useMemo(() => {
    const set = new Set(initialPdfs.map((p) => p.category));
    const all = Array.from(set);
    all.sort((a, b) => {
      const idxA = PREFERRED_ORDER.indexOf(a);
      const idxB = PREFERRED_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
    return ["All", ...all];
  }, [initialPdfs]);

  // Filtered PDFs
  const filteredPdfs = useMemo(() => {
    return initialPdfs.filter((pdf) => {
      const matchesSearch =
        searchQuery === "" ||
        pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pdf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pdf.topicsCovered || pdf.topics || []).some((t: string) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" ||
        pdf.category === selectedCategory ||
        (selectedCategory === "Web Development" &&
          (pdf.category === "Web Development" ||
            pdf.category === "Web Fundamentals" ||
            pdf.category === "HTML" ||
            pdf.category === "CSS"));

      return matchesSearch && matchesCategory;
    });
  }, [initialPdfs, searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const handlePreview = (pdf: PdfItem) => {
    setPreviewPdf(pdf);
    setIsPreviewOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "PDF Study Library" }]} />

      {/* Page Header */}
      <div className="py-8 mb-8 border-b border-slate-800">
        <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest block mb-2">
          OFFLINE DEVELOPER & CS HANDBOOKS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-brand mb-4">
          Tech & Computer Science PDF Study Library
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
          Every educational handbook in this library is 100% free and immediately accessible. Includes comprehensive study guides across Full-Stack Web Development, Data Structures & Algorithms, Python & AI, Operating Systems, DBMS & SQL, and Cloud DevOps.
        </p>

        {/* Value Props Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 size={13} />
            <span>100% Genuine Files</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <ShieldCheck size={13} />
            <span>No Paywalls or Barriers</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-teal-400">
            <Sparkles size={13} />
            <span>Mobile-Friendly Preview & Download</span>
          </span>
        </div>
      </div>

      {/* ── Search & Filter Bar ──────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0D1527] border border-slate-800 shadow-xl mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search Box */}
          <div className="relative w-full flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400"
            />
            <input
              type="text"
              suppressHydrationWarning
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PDF study guides by topic, e.g. Flexbox, HTML5, React, REST..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/[0.04] border border-slate-700/80 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-teal-400 font-sans"
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
        </div>

        {/* Category Pills (Orderly Wrapped, No Scrollbar) */}
        <div className="pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5 mr-1 py-1 font-semibold">
            <Filter size={13} className="text-cyan-400" />
            <span>Subject:</span>
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-bold shadow-md shadow-emerald-500/20"
                    : "bg-white/[0.04] hover:bg-white/10 text-gray-300 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-2">
          <span>
            Found <strong className="text-white font-bold">{filteredPdfs.length}</strong> PDF study guides
          </span>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={handleResetFilters}
              className="text-teal-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ── PDF Cards Grid ───────────────────────────────────── */}
      {filteredPdfs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredPdfs.map((pdf) => (
            <PdfCard key={pdf.id} pdf={pdf} onPreview={handlePreview} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-[#0D1527] border border-slate-800 mb-16">
          <FileText size={48} className="mx-auto text-teal-400 mb-4 opacity-80" />
          <h3 className="text-xl font-bold text-white mb-2 font-brand">
            No Study Guides Found
          </h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
            We couldn&apos;t find any PDF study materials matching your search. Clear your filters to browse the complete library.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-xl bg-teal-400 text-black font-bold text-xs hover:bg-teal-300 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* PDF Modal */}
      <PdfPreviewModal
        pdf={previewPdf}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
