"use client";

import { useState } from "react";
import Link from "next/link";
import { useGamification } from "@/context/GamificationContext";
import {
  Sparkles,
  Flame,
  Code2,
  Clock,
  CheckCircle2,
  HelpCircle,
  Puzzle,
  Play,
  RotateCcw,
  Zap,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Terminal,
} from "lucide-react";

export default function DailyLearningHub() {
  const { recordActivity, isActivityCompleted } = useGamification();

  // Interactive Quiz of the Day State
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizRewardMessage, setQuizRewardMessage] = useState<string>("");

  // Interactive Guess the Output Puzzle State
  const [puzzleSelected, setPuzzleSelected] = useState<string | null>(null);
  const [puzzleSubmitted, setPuzzleSubmitted] = useState<boolean>(false);
  const [puzzleFeedback, setPuzzleFeedback] = useState<string>("");

  // Quiz of the Day Spec
  const dailyQuiz = {
    id: "daily-quiz-array-filter",
    question: "What is the return value of [1, 2, 3].filter(n => n > 5) in JavaScript?",
    options: ["null", "[] (Empty array)", "undefined", "false"],
    correctIndex: 1,
    explanation: "Array.prototype.filter() always returns a new array. If no elements satisfy the predicate callback, it returns an empty array [].",
    xp: 30,
  };

  // Guess the Output Puzzle Spec
  const codePuzzle = {
    id: "puzzle-js-coercion",
    title: "Guess the Output: JavaScript Coercion",
    snippet: `console.log(1 + "2" + "2");
console.log(1 + +"2" + "2");
console.log(1 + -"1" + "2");`,
    options: [
      { id: "A", text: '"122", "32", "02"' },
      { id: "B", text: '"122", "122", "1-12"' },
      { id: "C", text: '"5", "32", "2"' },
      { id: "D", text: '"14", "32", "02"' },
    ],
    correctOption: "A",
    explanation: `1 + "2" coerces to "12".
1 + +"2" parses +"2" into number 2, yielding 1 + 2 = 3, then + "2" yields "32".
1 + -"1" parses -"1" into -1, yielding 1 - 1 = 0, then + "2" yields "02".`,
    xp: 40,
  };

  const handleQuizSubmit = () => {
    if (quizSelected === null) return;
    setQuizSubmitted(true);
    if (quizSelected === dailyQuiz.correctIndex) {
      const result = recordActivity("quiz", dailyQuiz.id, { xp: dailyQuiz.xp, title: "Daily Quiz of the Day" });
      setQuizRewardMessage(result.message);
    }
  };

  const handlePuzzleSubmit = () => {
    if (!puzzleSelected) return;
    setPuzzleSubmitted(true);
    if (puzzleSelected === codePuzzle.correctOption) {
      const result = recordActivity("challenge", codePuzzle.id, { xp: codePuzzle.xp, title: "Guess the Output Puzzle" });
      setPuzzleFeedback(`🎉 Correct! +${dailyQuiz.xp} XP awarded: ${codePuzzle.explanation}`);
    } else {
      setPuzzleFeedback(`⚠️ Not quite right! Explanation: ${codePuzzle.explanation}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b69ff] uppercase tracking-wider mb-1">
            <Zap size={14} className="fill-[#0b69ff]" />
            <span>Sharpen Your Knowledge Daily</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-brand">
            Your Daily Learning Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Complete daily bite-sized activities, earn verified XP, maintain your streak, and build real code daily.
          </p>
        </div>

        <Link
          href="/gamification"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0b69ff] text-xs font-bold border border-blue-200 transition-all self-start sm:self-auto cursor-pointer"
        >
          <span>View All Challenges</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* ── 6-Card Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Daily Coding Challenge */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 uppercase tracking-wider">
                Coding Challenge
              </span>
              <span className="text-xs font-bold text-[#0b69ff] flex items-center gap-1">
                <Zap size={13} />
                +50 XP
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Two Sum & Hash Map Lookup
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Find two numbers in an array that add up to a target sum using an O(n) hash map lookup.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-4">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                10 mins
              </span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold">Easy / Intermediate</span>
            </div>
          </div>

          <Link
            href="/practice"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Code2 size={14} className="text-emerald-400" />
            <span>Solve in Playground</span>
          </Link>
        </div>

        {/* Card 2: 5-Minute Micro-Lesson */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wider">
                Micro-Lesson
              </span>
              <span className="text-xs font-bold text-[#0b69ff] flex items-center gap-1">
                <Zap size={13} />
                +25 XP
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              CSS Grid Auto-Fit vs Auto-Fill
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Learn the subtle difference between auto-fit and auto-fill for fluid responsive cards without media queries.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-4">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                5 mins read
              </span>
              <span>•</span>
              <span className="text-blue-600 font-semibold">CSS Architecture</span>
            </div>
          </div>

          <Link
            href="/topics/javascript-challenges"
            className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0b69ff] border border-blue-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <BookOpen size={14} />
            <span>Read Lesson (+25 XP)</span>
          </Link>
        </div>

        {/* Card 3: Interactive Quiz of the Day */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 uppercase tracking-wider">
                Daily Quiz
              </span>
              <span className="text-xs font-bold text-[#0b69ff] flex items-center gap-1">
                <Zap size={13} />
                +{dailyQuiz.xp} XP
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mb-3">
              {dailyQuiz.question}
            </h3>

            {/* Quiz Options */}
            <div className="space-y-1.5 mb-4">
              {dailyQuiz.options.map((opt, idx) => {
                const isSelected = quizSelected === idx;
                const isCorrect = idx === dailyQuiz.correctIndex;
                let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                if (quizSubmitted) {
                  if (isCorrect) btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                  else if (isSelected) btnStyle = "bg-rose-50 border-rose-400 text-rose-800";
                } else if (isSelected) {
                  btnStyle = "bg-blue-50 border-[#0b69ff] text-[#0b69ff] font-bold";
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => setQuizSelected(idx)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && isCorrect && <CheckCircle2 size={13} className="text-emerald-600 ml-2" />}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 mb-3">
                {quizRewardMessage || dailyQuiz.explanation}
              </div>
            )}
          </div>

          {!quizSubmitted ? (
            <button
              disabled={quizSelected === null}
              onClick={handleQuizSubmit}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0b69ff] hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={() => {
                setQuizSelected(null);
                setQuizSubmitted(false);
              }}
              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Retry</span>
            </button>
          )}
        </div>

        {/* Card 4: Guess the Output Puzzle */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                Coding Puzzle
              </span>
              <span className="text-xs font-bold text-[#0b69ff] flex items-center gap-1">
                <Zap size={13} />
                +{codePuzzle.xp} XP
              </span>
            </div>

            <h3 className="text-xs font-bold text-slate-900 mb-2">
              Guess the Output: JS Coercion
            </h3>

            <pre className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] mb-3 overflow-x-auto leading-relaxed border border-slate-800">
              <code>{codePuzzle.snippet}</code>
            </pre>

            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {codePuzzle.options.map((opt) => {
                const isSelected = puzzleSelected === opt.id;
                let style = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                if (puzzleSubmitted) {
                  if (opt.id === codePuzzle.correctOption) style = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                  else if (isSelected) style = "bg-rose-50 border-rose-400 text-rose-800";
                } else if (isSelected) {
                  style = "bg-blue-50 border-[#0b69ff] text-[#0b69ff] font-bold";
                }

                return (
                  <button
                    key={opt.id}
                    disabled={puzzleSubmitted}
                    onClick={() => setPuzzleSelected(opt.id)}
                    className={`text-left p-2 rounded-xl text-[11px] border transition-all cursor-pointer truncate ${style}`}
                  >
                    <strong>{opt.id}:</strong> {opt.text}
                  </button>
                );
              })}
            </div>

            {puzzleSubmitted && (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 mb-2 leading-relaxed">
                {puzzleFeedback}
              </div>
            )}
          </div>

          {!puzzleSubmitted ? (
            <button
              disabled={!puzzleSelected}
              onClick={handlePuzzleSubmit}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Check Prediction
            </button>
          ) : (
            <button
              onClick={() => {
                setPuzzleSelected(null);
                setPuzzleSubmitted(false);
              }}
              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Retry Puzzle</span>
            </button>
          )}
        </div>

        {/* Card 5: Weekly Mini-Project */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 uppercase tracking-wider">
                Weekly Mini-Project
              </span>
              <span className="text-xs font-bold text-[#0b69ff] flex items-center gap-1">
                <Zap size={13} />
                +150 XP
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Build a Calculator App in 15 Mins
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Create a functional arithmetic keypad with decimal safety, keyboard entry, and visual history logs.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-4">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                15 - 20 mins
              </span>
              <span>•</span>
              <span className="text-purple-600 font-semibold">HTML + JS DOM</span>
            </div>
          </div>

          <Link
            href="/practice"
            className="w-full py-2.5 px-4 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Play size={13} className="fill-white" />
            <span>Launch in Playground</span>
          </Link>
        </div>

        {/* Card 6: Recommended Revision Topic */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 uppercase tracking-wider">
                Active Revision
              </span>
              <span className="text-xs font-bold text-[#0b69ff] flex items-center gap-1">
                <Zap size={13} />
                +35 XP
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              JavaScript Promise.all() vs allSettled()
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Review concurrent asynchronous fetching and fail-safe error handling for complex dashboard APIs.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-4">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                7 mins review
              </span>
              <span>•</span>
              <span className="text-teal-600 font-semibold">Async JavaScript</span>
            </div>
          </div>

          <Link
            href="/topics/javascript-challenges"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <BookOpen size={14} className="text-[#0b69ff]" />
            <span>Review Revision Topic</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
