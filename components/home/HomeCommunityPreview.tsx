"use client";

import Link from "next/link";
import { COMMUNITY_THREADS } from "@/data/community";
import {
  MessageSquare,
  ThumbsUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
} from "lucide-react";

export default function HomeCommunityPreview() {
  const threads = COMMUNITY_THREADS.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b69ff] uppercase tracking-wider mb-1">
            <Users size={14} className="text-[#0b69ff]" />
            <span>Peer Learning & Q&A</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-brand">
            Learner Community & Discussions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Ask coding questions, review code snippets, share milestone wins, and collaborate with peer developers.
          </p>
        </div>

        <Link
          href="/community"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0b69ff] text-xs font-bold border border-blue-200 transition-all self-start sm:self-auto cursor-pointer"
        >
          <span>Join Full Community</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {threads.map((thread) => (
          <Link
            key={thread.id}
            href="/community"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase tracking-wider">
                  {thread.category}
                </span>
                {thread.isSolved && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 size={11} />
                    <span>Solved</span>
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-[#0b69ff] transition-colors line-clamp-2">
                {thread.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                {thread.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thread.authorAvatar}
                  alt={thread.authorName}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-[11px] font-semibold text-slate-700">{thread.authorName}</span>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={12} className="text-slate-400" />
                  {thread.upvotes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={12} className="text-slate-400" />
                  {thread.commentsCount}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
