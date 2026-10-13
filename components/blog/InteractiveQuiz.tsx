"use client";

import { useState } from "react";
import { PracticeQuestion } from "@/data/notes";
import { CheckCircle2, XCircle, HelpCircle, Lightbulb, Code2 } from "lucide-react";

interface InteractiveQuizProps {
  questions: PracticeQuestion[];
}

export default function InteractiveQuiz({ questions }: InteractiveQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  const handleSelect = (questionId: string, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
    setShowExplanation((prev) => ({ ...prev, [questionId]: true }));
  };

  const toggleHint = (questionId: string) => {
    setShowHint((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0D1527] to-[#080C16] border border-slate-800 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <HelpCircle size={22} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white font-brand">
            Knowledge Check & Practice Assignments
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Reinforce what you just learned with interactive challenges.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => {
          const selected = selectedAnswers[q.id];
          const isSubmitted = !!selected;
          const isCorrect = selected === q.correctAnswer;
          const isHintOpen = !!showHint[q.id];

          return (
            <div
              key={q.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#0F172A]/80 border border-slate-800 shadow-md"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                  {q.question}
                </p>
              </div>

              {/* Multiple Choice Options */}
              {q.options && q.options.length > 0 && (
                <div className="space-y-2.5 mb-4 pl-9">
                  {q.options.map((option, optIdx) => {
                    const isCurrentOption = selected === option;
                    let optionStyle = "bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/10 hover:text-white";

                    if (isSubmitted) {
                      if (option === q.correctAnswer) {
                        optionStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200";
                      } else if (isCurrentOption && !isCorrect) {
                        optionStyle = "bg-rose-500/20 border-rose-500 text-rose-200";
                      } else {
                        optionStyle = "bg-white/[0.02] border-white/5 text-gray-500 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(q.id, option)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {isSubmitted && option === q.correctAnswer && (
                          <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 ml-2" />
                        )}
                        {isSubmitted && isCurrentOption && !isCorrect && (
                          <XCircle size={16} className="text-rose-400 flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Coding Challenge Starter Box */}
              {q.codeStarter && (
                <div className="my-3 pl-9">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-2 font-sans text-xs">
                      <Code2 size={14} className="text-amber-400" />
                      <span>Code Challenge:</span>
                    </div>
                    <pre>{q.codeStarter}</pre>
                  </div>
                </div>
              )}

              {/* Hint button for coding / conceptual challenges */}
              {q.solutionHint && (
                <div className="pl-9 mt-3">
                  <button
                    onClick={() => toggleHint(q.id)}
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium py-1 cursor-pointer"
                  >
                    <Lightbulb size={14} />
                    <span>{isHintOpen ? "Hide Solution & Hint" : "Show Solution & Hint"}</span>
                  </button>

                  {isHintOpen && (
                    <div className="mt-2 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                      <strong className="block mb-1">Hint / Explanation:</strong>
                      {q.solutionHint}
                    </div>
                  )}
                </div>
              )}

              {/* Explanation Reveal */}
              {showExplanation[q.id] && q.explanation && (
                <div className="mt-4 pl-9">
                  <div
                    className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                      isCorrect
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                        : "bg-cyan-500/10 border-cyan-500/30 text-cyan-200"
                    }`}
                  >
                    <strong className="block mb-1 font-mono uppercase text-[11px] tracking-wider">
                      {isCorrect ? "✓ Correct!" : "Explanation"}
                    </strong>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
