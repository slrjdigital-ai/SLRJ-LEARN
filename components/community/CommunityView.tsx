"use client";

import { useState } from "react";
import Image from "next/image";
import {
  COMMUNITY_THREADS,
  STUDENT_SHOWCASES,
  DAILY_CHALLENGES,
  DiscussionThread,
} from "@/data/community";
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Code2,
  Sparkles,
  PlusCircle,
  Search,
  CheckCircle2,
  ExternalLink,
  Award,
  Bell,
  X,
  Send,
} from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";

export default function CommunityView() {
  const [activeTab, setActiveTab] = useState<"discussions" | "showcases" | "challenges">("discussions");
  const [threads, setThreads] = useState<DiscussionThread[]>(COMMUNITY_THREADS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Ask Question Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newSnippet, setNewSnippet] = useState("");
  const [newCategory, setNewCategory] = useState<any>("Web Development");

  // Comments toggle per thread
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const categories = ["All", "Web Development", "Python", "DSA", "Careers & Interviews"];

  // Filtered threads
  const filteredThreads = threads.filter((t) => {
    const matchesCat = selectedCategory === "All" || t.category === selectedCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const handleUpvoteThread = (id: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newThread: DiscussionThread = {
      id: "thread-" + Date.now(),
      title: newTitle,
      category: newCategory,
      authorName: "You (Student)",
      authorAvatar: "/icon.jpg",
      createdAt: "Just now",
      content: newContent,
      codeSnippet: newSnippet.trim() ? newSnippet : undefined,
      upvotes: 1,
      tags: [newCategory],
      commentsCount: 0,
      comments: [],
    };

    setThreads([newThread, ...threads]);
    setNewTitle("");
    setNewContent("");
    setNewSnippet("");
    setIsModalOpen(false);
  };

  const handleAddComment = (threadId: string) => {
    const text = commentInputs[threadId]?.trim();
    if (!text) return;

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const newComment = {
            id: "c-" + Date.now(),
            authorName: "You (Student)",
            authorRole: "student" as const,
            authorAvatar: "/icon.jpg",
            createdAt: "Just now",
            content: text,
            upvotes: 0,
          };
          return {
            ...t,
            commentsCount: t.commentsCount + 1,
            comments: [...t.comments, newComment],
          };
        }
        return t;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [threadId]: "" }));
  };

  return (
    <div className="w-full">
      {/* ── Instructor Announcement Banner ── */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-[#0A1024] to-emerald-950/60 border border-cyan-500/25 mb-8 flex items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Bell size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Instructor Announcement
              </span>
              <span className="text-[10px] font-mono text-slate-400">• Today</span>
            </div>
            <p className="text-slate-200 text-xs sm:text-sm mt-0.5">
              Weekly live office hours: &quot;Deep Dive into Async Event Loop & React 19 State Architecture&quot; this Saturday at 6:00 PM IST.
            </p>
          </div>
        </div>
      </div>

      {/* ── Sub Navigation Tabs ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 bg-[#080D1A] p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab("discussions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "discussions"
                ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            💬 Discussion Forums
          </button>
          <button
            onClick={() => setActiveTab("showcases")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "showcases"
                ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🚀 Student Showcases
          </button>
          <button
            onClick={() => setActiveTab("challenges")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "challenges"
                ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🧩 Daily Challenges
          </button>
        </div>

        {activeTab === "discussions" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <PlusCircle size={14} />
            <span>Ask a Question</span>
          </button>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB 1: DISCUSSIONS
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === "discussions" && (
        <div>
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                      : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search forum topics..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Threads List */}
          <div className="space-y-4">
            {filteredThreads.map((thread) => {
              const isCommentsOpen = openComments[thread.id] ?? false;

              return (
                <div
                  key={thread.id}
                  className="p-5 sm:p-6 rounded-3xl bg-[#080D1A] border border-white/10 hover:border-white/20 transition-all shadow-xl"
                >
                  {/* Top Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={thread.authorAvatar || "/icon.jpg"}
                        alt={thread.authorName}
                        width={28}
                        height={28}
                        unoptimized
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-500/30"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{thread.authorName}</span>
                        <span className="text-[11px] font-mono text-slate-500">• {thread.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                        {thread.category}
                      </span>
                      {thread.isSolved && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          <span>Solved</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Content */}
                  <h3 className="text-base font-bold text-white font-brand mb-2">
                    {thread.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {thread.content}
                  </p>

                  {/* Code Snippet if present */}
                  {thread.codeSnippet && (
                    <div className="rounded-xl bg-[#030712] border border-white/10 overflow-hidden mb-4">
                      <div className="px-3 py-1.5 bg-black/40 border-b border-white/5 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                        <Code2 size={12} className="text-cyan-400" />
                        <span>Code Reference ({thread.codeLanguage || "code"})</span>
                      </div>
                      <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                        <code>{thread.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {thread.tags.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleUpvoteThread(thread.id)}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        <ThumbsUp size={14} />
                        <span>{thread.upvotes} Upvotes</span>
                      </button>

                      <button
                        onClick={() =>
                          setOpenComments((prev) => ({
                            ...prev,
                            [thread.id]: !prev[thread.id],
                          }))
                        }
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <MessageSquare size={14} />
                        <span>{thread.commentsCount} Answers</span>
                      </button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {isCommentsOpen && (
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-3 pl-2 sm:pl-4">
                      {thread.comments.map((comment) => (
                        <div key={comment.id} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <Image
                                src={comment.authorAvatar || "/icon.jpg"}
                                alt={comment.authorName}
                                width={22}
                                height={22}
                                unoptimized
                                className="w-5 h-5 rounded-full object-cover"
                              />
                              <span className="text-xs font-bold text-white">{comment.authorName}</span>
                              {comment.authorRole === "mentor" && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                                  Mentor
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">{comment.createdAt}</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{comment.content}</p>
                        </div>
                      ))}

                      {/* Add comment input */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          value={commentInputs[thread.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({ ...commentInputs, [thread.id]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddComment(thread.id);
                          }}
                          placeholder="Write an insightful answer or comment..."
                          className="flex-1 bg-[#030712] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                        <button
                          onClick={() => handleAddComment(thread.id)}
                          className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors cursor-pointer"
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 2: STUDENT SHOWCASES
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === "showcases" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STUDENT_SHOWCASES.map((sc) => (
            <div
              key={sc.id}
              className="rounded-3xl bg-[#080D1A] border border-white/10 hover:border-cyan-500/30 overflow-hidden shadow-xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={sc.screenshotUrl}
                    alt={sc.projectTitle}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src={sc.studentAvatar}
                      alt={sc.studentName}
                      width={24}
                      height={24}
                      unoptimized
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">{sc.studentName}</span>
                      <span className="text-[10px] text-slate-400">{sc.studentTrack}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white font-brand mb-1.5">{sc.projectTitle}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{sc.projectDescription}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {sc.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                  <ThumbsUp size={12} />
                  <span>{sc.likesCount} Likes</span>
                </span>
                <div className="flex items-center gap-2">
                  {sc.githubUrl && (
                    <a
                      href={sc.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                      title="GitHub Repository"
                    >
                      <GithubIcon size={14} />
                    </a>
                  )}
                  {sc.liveUrl && (
                    <a
                      href={sc.liveUrl}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300"
                    >
                      <span>Live Preview</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB 3: DAILY CHALLENGES
         ══════════════════════════════════════════════════════════════ */}
      {activeTab === "challenges" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DAILY_CHALLENGES.map((ch) => (
            <div
              key={ch.id}
              className="p-6 rounded-3xl bg-[#080D1A] border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {ch.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                    <Award size={13} className="text-amber-400" />
                    <span>+{ch.xpReward} XP</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-brand mb-2">{ch.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">{ch.prompt}</p>

                <div className="rounded-xl bg-[#030712] border border-white/5 p-3 mb-4">
                  <span className="text-[10px] font-mono text-slate-500 block mb-1">Starter Signature:</span>
                  <pre className="text-xs font-mono text-emerald-400 overflow-x-auto">
                    <code>{ch.starterCode}</code>
                  </pre>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  Difficulty: <strong className="text-white">{ch.difficulty}</strong>
                </span>
                <a
                  href="/practice"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-md shadow-cyan-500/20"
                >
                  Solve in Playground
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Ask Question Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h2 className="text-lg font-black font-brand text-white">Ask the Learning Community</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Question Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Why does useEffect run twice in React 19 StrictMode?"
                  className="w-full bg-[#030712] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#030712] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Python">Python</option>
                  <option value="DSA">Data Structures & Algorithms</option>
                  <option value="Careers & Interviews">Careers & Interviews</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Detailed Explanation</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Provide context on what you are trying to achieve and what behavior you are seeing..."
                  className="w-full bg-[#030712] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Code Snippet (Optional)</label>
                <textarea
                  rows={3}
                  value={newSnippet}
                  onChange={(e) => setNewSnippet(e.target.value)}
                  placeholder="// Paste relevant code here..."
                  className="w-full bg-[#030712] border border-white/10 rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-md shadow-cyan-500/20"
                >
                  Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
