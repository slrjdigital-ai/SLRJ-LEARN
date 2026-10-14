"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Compass, Code, Bot, Users, ArrowRight } from "lucide-react";
import { getAllCourses } from "@/data/courses";
import { getAllNotes } from "@/data/notes";
import { PRACTICAL_PROJECTS } from "@/data/projectsData";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const courses = useMemo(() => getAllCourses(), []);
  const notes = useMemo(() => getAllNotes(), []);
  const projects = PRACTICAL_PROJECTS;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const searchResults = useMemo(() => {
    const cleanQ = query.trim().toLowerCase();
    if (!cleanQ) return [];

    const matchedCourses = courses
      .filter((c) => c.title.toLowerCase().includes(cleanQ) || c.category.toLowerCase().includes(cleanQ))
      .slice(0, 3)
      .map((c) => ({
        type: "Course",
        title: c.title,
        subtitle: `${c.category} • ${c.difficulty}`,
        href: `/courses/${c.slug}`,
        icon: BookOpen,
        color: "text-cyan-400"
      }));

    const matchedNotes = notes
      .filter((n) => n.title.toLowerCase().includes(cleanQ) || n.shortDescription.toLowerCase().includes(cleanQ))
      .slice(0, 3)
      .map((n) => ({
        type: "Study Note",
        title: n.title,
        subtitle: `${n.category} • ${n.readingTime}`,
        href: `/notes/${n.slug}`,
        icon: Code,
        color: "text-emerald-400"
      }));

    const matchedProjects = projects
      .filter((p) => p.title.toLowerCase().includes(cleanQ) || p.skillsRequired.some((s) => s.toLowerCase().includes(cleanQ)))
      .slice(0, 2)
      .map((p) => ({
        type: "Project",
        title: p.title,
        subtitle: `${p.difficulty} • ${p.category}`,
        href: `/projects`,
        icon: Compass,
        color: "text-amber-400"
      }));

    return [...matchedCourses, ...matchedNotes, ...matchedProjects];
  }, [query, courses, notes, projects]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md transition-opacity">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-[#080D1A] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search size={20} className="text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, study notes, projects, tutorials (e.g. React, Flexbox, DSA)..."
            className="w-full bg-transparent text-white text-base placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Links / Suggestions when empty */}
        {!query.trim() && (
          <div className="p-4 sm:p-6 text-sm text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 block">
              Quick Suggestions
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { router.push("/courses"); onClose(); }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-left text-slate-200 transition-colors"
              >
                <BookOpen size={16} className="text-cyan-400" />
                <span>All Interactive Courses</span>
              </button>
              <button
                onClick={() => { router.push("/practice"); onClose(); }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-left text-slate-200 transition-colors"
              >
                <Code size={16} className="text-emerald-400" />
                <span>Code Playground & Practice</span>
              </button>
              <button
                onClick={() => { router.push("/ai-tutor"); onClose(); }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-left text-slate-200 transition-colors"
              >
                <Bot size={16} className="text-purple-400" />
                <span>AI Coding Tutor</span>
              </button>
              <button
                onClick={() => { router.push("/community"); onClose(); }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 text-left text-slate-200 transition-colors"
              >
                <Users size={16} className="text-amber-400" />
                <span>Student Community Forum</span>
              </button>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query.trim() && (
          <div className="max-h-96 overflow-y-auto p-2 divide-y divide-white/5">
            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No results found for &quot;<span className="text-white font-medium">{query}</span>&quot;. Try searching for &quot;HTML&quot;, &quot;Python&quot;, or &quot;Algorithms&quot;.
              </div>
            ) : (
              searchResults.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      router.push(item.href);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] text-left transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                        <Icon size={17} className={item.color} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                            {item.type}
                          </span>
                          <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={15} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                  </button>
                );
              })
            )}
          </div>
        )}

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>Navigation: Click or Enter</span>
          </div>
          <div>Press ESC to close</div>
        </div>
      </div>
    </div>
  );
}
