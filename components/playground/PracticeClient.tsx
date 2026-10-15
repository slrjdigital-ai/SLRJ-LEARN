"use client";

import Link from "next/link";
import CodePlayground from "@/components/playground/CodePlayground";
import { DAILY_CHALLENGES } from "@/data/community";
import { Sparkles, Terminal, Award, Trophy, BookOpen } from "lucide-react";

export default function PracticeClient() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0b69ff] text-xs font-bold uppercase tracking-wider mb-2">
            <Terminal size={14} />
            <span>Browser Code Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-brand tracking-tight text-slate-900">
            Online Code Playground & Practice
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/gamification"
            className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Trophy size={14} />
            <span>Weekly Challenges</span>
          </Link>
          <Link
            href="/topics"
            className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0b69ff] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <BookOpen size={14} />
            <span>Explore Topics</span>
          </Link>
        </div>
      </div>

      {/* The Code Playground */}
      <div>
        <CodePlayground />
      </div>

      {/* Daily Coding Challenges Section */}
      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold font-brand text-slate-900">
              Daily Practice Quests
            </h2>
            <p className="text-xs text-slate-500">
              Complete daily challenges to maintain your streak!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DAILY_CHALLENGES.map((challenge) => (
            <div
              key={challenge.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {challenge.category}
                  </span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Award size={13} className="text-amber-500" />
                    <span>+{challenge.xpReward} XP</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-brand mb-2">
                  {challenge.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  {challenge.prompt}
                </p>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 mb-4">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">Example:</span>
                  <code className="text-xs font-mono text-emerald-700 block">
                    Input: {challenge.testCases[0]?.input} &rarr; Expected: {challenge.testCases[0]?.expected}
                  </code>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Difficulty: <strong className="text-slate-800">{challenge.difficulty}</strong>
                </span>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0b69ff] hover:bg-blue-600 transition-all cursor-pointer shadow-sm"
                >
                  Solve in Playground
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
