"use client";

import Link from "next/link";
import CodePlayground from "@/components/playground/CodePlayground";
import { DAILY_CHALLENGES } from "@/data/community";
import { Sparkles, Terminal, Award, Trophy, BookOpen } from "lucide-react";

export default function PracticeClient() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pt-28 pb-20">
      <div className="max-w-[1840px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Terminal size={14} className="text-emerald-400" />
              <span>Browser Code Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-brand tracking-tight text-white">
              Online Code Playground & Practice
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/gamification"
              className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Trophy size={14} />
              <span>Weekly Challenges</span>
            </Link>
            <Link
              href="/topics"
              className="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <BookOpen size={14} />
              <span>Explore Topics</span>
            </Link>
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sandbox Active</span>
            </span>
          </div>
        </div>

        {/* The Code Playground */}
        <div className="mb-14">
          <CodePlayground />
        </div>

        {/* Daily Coding Challenges Section */}
        <div className="pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
                <Sparkles size={13} />
                <span>Daily Practice Quests</span>
              </div>
              <h2 className="text-2xl font-black font-brand text-white">
                Today&apos;s Coding Challenges
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Complete daily challenges to maintain your streak!
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DAILY_CHALLENGES.map((challenge) => (
              <div
                key={challenge.id}
                className="p-6 rounded-3xl bg-[#080D1A] border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {challenge.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                      <Award size={13} className="text-amber-400" />
                      <span>+{challenge.xpReward} XP</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-brand mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-4">
                    {challenge.prompt}
                  </p>

                  <div className="rounded-xl bg-[#030712] border border-white/5 p-3 mb-4">
                    <span className="text-[10px] font-mono text-slate-500 block mb-1">Example Test Case:</span>
                    <code className="text-xs font-mono text-emerald-400 block">
                      Input: {challenge.testCases[0]?.input} &rarr; Expected: {challenge.testCases[0]?.expected}
                    </code>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    Difficulty: <strong className="text-white">{challenge.difficulty}</strong>
                  </span>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    Solve in Playground
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
