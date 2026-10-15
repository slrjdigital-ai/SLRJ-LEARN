"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MicroTopicSeries, MicroLesson } from "@/data/microTopics";
import { useGamification } from "@/context/GamificationContext";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Award,
  Zap,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Code2,
  Copy,
  Check,
  Play,
  RotateCcw,
  Target,
  HelpCircle,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MicroLessonViewProps {
  series: MicroTopicSeries;
}

export default function MicroLessonView({ series }: MicroLessonViewProps) {
  const router = useRouter();
  const { state, recordActivity, isActivityCompleted } = useGamification();

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const currentLesson: MicroLesson = series.lessons[activeLessonIdx] || series.lessons[0];

  const [copiedCode, setCopiedCode] = useState(false);
  const [userCode, setUserCode] = useState(currentLesson.interactiveActivity.starterCode || "");
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [selectedPredictIdx, setSelectedPredictIdx] = useState<number | null>(null);
  const [showPredictResult, setShowPredictResult] = useState(false);

  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [hasCheckedQuiz, setHasCheckedQuiz] = useState(false);

  const [rewardModal, setRewardModal] = useState<{
    show: boolean;
    xpGained: number;
    message: string;
    badgeName?: string;
  } | null>(null);

  const lessonCompleted = isActivityCompleted(`lesson-${currentLesson.id}`);

  const handleRunCode = () => {
    if (currentLesson.interactiveActivity.type === "code") {
      setCodeOutput(currentLesson.interactiveActivity.expectedOutput || "Program executed successfully (exit code 0)");
    }
  };

  const handleSelectPredict = (index: number) => {
    if (showPredictResult) return;
    setSelectedPredictIdx(index);
    setShowPredictResult(true);
  };

  const handleCheckQuiz = () => {
    if (selectedQuizIdx === null || hasCheckedQuiz) return;
    setHasCheckedQuiz(true);

    const isCorrect = selectedQuizIdx === currentLesson.quiz.correctIndex;
    if (isCorrect) {
      const result = recordActivity("lesson", `lesson-${currentLesson.id}`, {
        xp: currentLesson.xpReward,
        title: currentLesson.title,
      });

      if (result.awarded) {
        setRewardModal({
          show: true,
          xpGained: result.xpGained,
          message: result.message,
          badgeName: result.unlockedBadge?.name,
        });
      }
    }
  };

  const handleNextLesson = () => {
    if (activeLessonIdx < series.lessons.length - 1) {
      setActiveLessonIdx(activeLessonIdx + 1);
      resetStateForLesson(series.lessons[activeLessonIdx + 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/topics");
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIdx > 0) {
      setActiveLessonIdx(activeLessonIdx - 1);
      resetStateForLesson(series.lessons[activeLessonIdx - 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetStateForLesson = (lesson: MicroLesson) => {
    setUserCode(lesson.interactiveActivity.starterCode || "");
    setCodeOutput(null);
    setSelectedPredictIdx(null);
    setShowPredictResult(false);
    setSelectedQuizIdx(null);
    setHasCheckedQuiz(false);
    setRewardModal(null);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const progressPercent = Math.round(((activeLessonIdx + 1) / series.lessons.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ─── Top Bar: Lesson Navigation & Stepper ─── */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/topics"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer border border-slate-200"
            title="Return to Course Library"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <span className="text-[10px] font-bold text-[#0b69ff] uppercase tracking-wider block">
              {series.seriesTitle}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
              {series.title} • {currentLesson.title}
            </h2>
          </div>
        </div>

        {/* Lesson Progress & Streak */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold shadow-sm">
            <Flame size={14} className="text-rose-500 animate-pulse" />
            <span>{state.streak.currentStreak}d Streak</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-500 block">
              Lesson {activeLessonIdx + 1} of {series.lessons.length}
            </span>
            <div className="w-24 sm:w-32 h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#0b69ff] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Lesson Content Card ─── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        {/* Badges Row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-[#e8f1fd] text-[#0b69ff] text-xs font-bold">
            Lesson {currentLesson.lessonNumber}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            ⏱️ ~{currentLesson.estimatedMinutes} mins
          </span>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
            <Award size={13} className="text-amber-500" />
            +{currentLesson.xpReward} XP
          </span>
          {lessonCompleted && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 size={13} />
              Completed
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-brand tracking-tight mb-3">
          {currentLesson.title}
        </h1>

        {/* 1. Introduction */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm leading-relaxed mb-6">
          <p>{currentLesson.intro}</p>
        </div>

        {/* 2. Single Learning Objective */}
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 mb-6 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-[#0b69ff] text-white flex-shrink-0 mt-0.5">
            <Target size={16} />
          </div>
          <div>
            <span className="text-[10px] text-[#0b69ff] font-bold uppercase tracking-wider block">
              Learning Objective
            </span>
            <p className="text-slate-900 text-sm font-semibold mt-0.5">
              {currentLesson.learningObjective}
            </p>
          </div>
        </div>

        {/* 3. Core Explanation */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen size={14} className="text-[#0b69ff]" />
            <span>Explanation</span>
          </h3>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
            {currentLesson.explanation}
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-slate-700 block mb-1">
              Key Takeaways:
            </span>
            {currentLesson.keyTakeaways.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0b69ff] flex-shrink-0 mt-2" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Practical Example */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 size={14} className="text-emerald-600" />
              <span>Practical Example ({currentLesson.practicalExample.language})</span>
            </h3>
            <button
              onClick={() => handleCopy(currentLesson.practicalExample.code)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono flex items-center gap-1 transition-all cursor-pointer"
            >
              {copiedCode ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
              <span>{copiedCode ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="rounded-xl bg-[#0f172a] p-4 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto shadow-inner leading-relaxed">
            <pre>
              <code>{currentLesson.practicalExample.code}</code>
            </pre>
          </div>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            💡 {currentLesson.practicalExample.notes}
          </p>
        </div>

        {/* 5. Interactive Activity */}
        <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200 mb-8">
          <div className="flex items-center gap-1.5 text-[#0b69ff] text-xs font-bold uppercase tracking-wider mb-2">
            <Zap size={14} />
            <span>Interactive SoloLearn Challenge</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-3">
            {currentLesson.interactiveActivity.prompt}
          </h3>

          {currentLesson.interactiveActivity.type === "code" ? (
            <div className="space-y-3">
              <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-3.5 py-1.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">Editor</span>
                  <button
                    onClick={handleRunCode}
                    className="px-3 py-1 rounded-lg bg-[#0b69ff] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Play size={12} />
                    <span>Run Simulation</span>
                  </button>
                </div>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={4}
                  className="w-full p-3 font-mono text-xs sm:text-sm text-slate-800 outline-none resize-none leading-relaxed"
                />
              </div>

              {codeOutput && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                  <span>Output: {codeOutput}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {currentLesson.interactiveActivity.options?.map((opt, idx) => {
                const isSelected = selectedPredictIdx === idx;
                const isCorrect = idx === currentLesson.interactiveActivity.correctOptionIndex;

                let btnStyle = "bg-white border-slate-200 text-slate-700 hover:border-[#0b69ff]";
                if (showPredictResult) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-50 border-rose-400 text-rose-800";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectPredict(idx)}
                    disabled={showPredictResult}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer font-mono shadow-sm ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showPredictResult && isCorrect && (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    )}
                  </button>
                );
              })}

              {showPredictResult && (
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 mt-2 font-sans">
                  <strong>Explanation:</strong> {currentLesson.interactiveActivity.explanation}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 6. Short Knowledge Check Quiz */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
          <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle size={14} />
            <span>Knowledge Check</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-4">
            {currentLesson.quiz.question}
          </h3>

          <div className="space-y-2.5 mb-5">
            {currentLesson.quiz.options.map((option, idx) => {
              const isSelected = selectedQuizIdx === idx;
              const isCorrect = idx === currentLesson.quiz.correctIndex;

              let choiceStyle = "bg-white border-slate-200 text-slate-700 hover:border-[#0b69ff]";

              if (hasCheckedQuiz) {
                if (isCorrect) {
                  choiceStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                } else if (isSelected && !isCorrect) {
                  choiceStyle = "bg-rose-50 border-rose-400 text-rose-800";
                }
              } else if (isSelected) {
                choiceStyle = "bg-blue-50 border-[#0b69ff] text-[#0b69ff] font-bold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (!hasCheckedQuiz) setSelectedQuizIdx(idx);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer shadow-sm ${choiceStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {hasCheckedQuiz && isCorrect && (
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {!hasCheckedQuiz ? (
            <button
              onClick={handleCheckQuiz}
              disabled={selectedQuizIdx === null}
              className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all flex items-center justify-center gap-2 ${
                selectedQuizIdx !== null
                  ? "bg-[#0b69ff] hover:bg-blue-600 text-white shadow-md cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Award size={15} />
              <span>Submit Answer & Claim +{currentLesson.xpReward} XP</span>
            </button>
          ) : (
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900 block mb-1">
                {selectedQuizIdx === currentLesson.quiz.correctIndex ? "🎉 Correct!" : "💡 Solution Review:"}
              </strong>
              <p>{currentLesson.quiz.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            onClick={handlePrevLesson}
            disabled={activeLessonIdx === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              activeLessonIdx > 0
                ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer"
                : "opacity-40 cursor-not-allowed border-slate-100 text-slate-400"
            }`}
          >
            <ArrowLeft size={14} />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNextLesson}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#0b69ff] hover:bg-blue-600 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>{activeLessonIdx < series.lessons.length - 1 ? "Next Lesson" : "Finish Series"}</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Reward Modal */}
      <AnimatePresence>
        {rewardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl text-center relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto mb-4 shadow-sm">
                <Trophy size={32} />
              </div>

              <span className="text-xs font-bold text-[#0b69ff] uppercase tracking-wider block mb-1">
                Lesson Complete!
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-brand mb-2">
                +{rewardModal.xpGained} XP Earned!
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                {rewardModal.message}
              </p>

              {rewardModal.badgeName && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800 mb-6 flex items-center justify-center gap-2">
                  <Sparkles size={15} className="text-amber-600" />
                  <span>New Badge Unlocked: <strong>{rewardModal.badgeName}</strong>!</span>
                </div>
              )}

              <button
                onClick={() => setRewardModal(null)}
                className="w-full py-3 rounded-xl bg-[#0b69ff] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-blue-500/20"
              >
                Continue Learning
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
