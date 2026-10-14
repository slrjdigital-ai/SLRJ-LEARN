"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Award,
  CheckCircle2,
  FileCheck2,
  Download,
  Share2,
  HelpCircle,
  Briefcase,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const ASSESSMENT_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary difference between synchronous and asynchronous code in JavaScript?",
    options: [
      "Synchronous code runs in parallel; asynchronous code blocks the main thread",
      "Synchronous code executes sequentially and blocks execution; asynchronous code delegates tasks via the Event Loop without freezing the UI",
      "Asynchronous code only works with server-side Node.js",
      "There is no functional difference in modern V8 engines",
    ],
    correct: 1,
    explanation: "JavaScript is single-threaded; asynchronous operations rely on the Event Loop and Microtask queue to perform I/O without blocking UI paint cycles.",
  },
  {
    id: 2,
    question: "In CSS, how does 'box-sizing: border-box' change layout calculation?",
    options: [
      "It doubles the margin values of the element",
      "It causes borders and paddings to be included within the element's specified width and height",
      "It converts inline elements to absolute positioning",
      "It disables flexbox child shrinking",
    ],
    correct: 1,
    explanation: "border-box ensures that padding and border are subtracted from width and height, preventing layout overflow headaches.",
  },
  {
    id: 3,
    question: "What does the ACID acronym stand for in relational database management systems?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Asynchronous, Concurrent, Indexed, Distributed",
      "Access, Control, Integrity, Data",
      "Automated, Clustered, Integrated, Dynamic",
    ],
    correct: 0,
    explanation: "ACID represents the four essential properties that guarantee database transactions are processed reliably.",
  },
  {
    id: 4,
    question: "Why should React state never be mutated directly (e.g. state.count = 5)?",
    options: [
      "JavaScript will immediately throw a syntax error",
      "Direct mutation bypasses React's reconciliation engine, preventing scheduled re-renders and causing stale UI bugs",
      "It permanently crashes the Node.js server",
      "State can only be modified in class components",
    ],
    correct: 1,
    explanation: "React relies on immutable state references to detect changes via shallow comparison and trigger virtual DOM reconciliation.",
  },
  {
    id: 5,
    question: "What is the average time complexity of a hash map lookup?",
    options: ["O(log N)", "O(1)", "O(N)", "O(N²)"],
    correct: 1,
    explanation: "Hash maps use hashing functions to compute array bucket indices in constant O(1) average time.",
  },
];

const MOCK_INTERVIEW_QUESTIONS = [
  {
    q: "How does the browser event delegation pattern work, and why is it memory efficient?",
    answer: "Event delegation leverages event bubbling. Instead of binding 100 individual event listeners to 100 list items, you attach a single listener to their parent container and inspect e.target. This reduces memory footprint and automatically handles dynamically inserted items.",
  },
  {
    q: "Explain the difference between TCP and UDP, and give a typical use-case for each.",
    answer: "TCP is connection-oriented, ordered, and guarantees reliable packet delivery via 3-way handshakes and retransmissions (used in HTTP/HTTPS, file transfers). UDP is connectionless and lightweight without retransmissions, ideal for latency-sensitive streaming and online gaming.",
  },
  {
    q: "How do React 19 Server Components differ from Client Components?",
    answer: "Server Components execute strictly on the server during the build or request time, shipping zero JavaScript bundle weight to the browser. Client Components execute in the browser to handle user interactivity, event listeners, and browser APIs.",
  },
];

export default function CertificateView() {
  const { user } = useAuth();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const studentName = user?.name || "Kouluri Shahid";
  const certId = "SLRJ-CERT-2026-" + (user?.id ? user.id.replace("usr_", "").toUpperCase() : "9821");

  const handleSelect = (optionIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQIndex]: optionIdx });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    ASSESSMENT_QUIZ.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsQuizSubmitted(true);
  };

  const hasPassed = isQuizSubmitted && score >= 4; // 80% passing

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-12">
      {/* ── Section 1: Skill Assessment & Certificate Exam ── */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
              <FileCheck2 size={14} />
              <span>Verified Skill Assessment</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-brand text-white">
              Full-Stack Engineering Certification Quiz
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Passing Threshold:</span>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
              80% (4 / 5 Correct)
            </span>
          </div>
        </div>

        {!isQuizSubmitted ? (
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
              <span>Question {currentQIndex + 1} of {ASSESSMENT_QUIZ.length}</span>
              <span>Progress: {Math.round(((currentQIndex + 1) / ASSESSMENT_QUIZ.length) * 100)}%</span>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-[#030712] border border-white/5 mb-6">
              <h3 className="text-base font-bold text-white mb-4">
                {ASSESSMENT_QUIZ[currentQIndex].question}
              </h3>

              <div className="space-y-2.5">
                {ASSESSMENT_QUIZ[currentQIndex].options.map((opt, i) => {
                  const isSelected = selectedAnswers[currentQIndex] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-cyan-500/15 border-cyan-400 text-white font-semibold"
                          : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] text-slate-300"
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30"
              >
                Previous
              </button>

              {currentQIndex < ASSESSMENT_QUIZ.length - 1 ? (
                <button
                  disabled={selectedAnswers[currentQIndex] === undefined}
                  onClick={() => setCurrentQIndex((prev) => prev + 1)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 disabled:opacity-40"
                >
                  Next Question
                </button>
              ) : (
                <button
                  disabled={selectedAnswers[currentQIndex] === undefined}
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:scale-105 transition-all shadow-md shadow-cyan-500/20"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Results View */
          <div>
            <div
              className={`p-6 rounded-2xl border text-center mb-6 ${
                hasPassed
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-200"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center mb-3">
                {hasPassed ? <CheckCircle2 size={24} className="text-emerald-400" /> : <HelpCircle size={24} className="text-amber-400" />}
              </div>
              <h3 className="text-xl font-bold font-brand text-white mb-1">
                {hasPassed ? "Assessment Passed! Certificate Unlocked" : "Score: " + score + " / 5. Almost there!"}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">
                {hasPassed
                  ? "Congratulations! You answered 4 or more questions correctly. Your verified digital completion certificate is rendered below."
                  : "You need 4/5 correct to unlock the certificate. Review the curriculum notes and try again."}
              </p>
              {!hasPassed && (
                <button
                  onClick={() => {
                    setIsQuizSubmitted(false);
                    setSelectedAnswers({});
                    setCurrentQIndex(0);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300"
                >
                  Retake Assessment
                </button>
              )}
            </div>

            {/* Rendered Certificate Card if passed */}
            {hasPassed && (
              <div
                id="printable-certificate"
                className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0c1429] to-[#060a17] border-4 border-cyan-400/40 shadow-2xl relative overflow-hidden text-center my-8"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mx-auto mb-2">
                    <Award size={30} />
                  </div>

                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-bold block">
                    SLRJ Learn • Verified Achievement
                  </span>

                  <h2 className="text-2xl sm:text-4xl font-black font-brand text-white">
                    Certificate of Completion
                  </h2>

                  <p className="text-xs text-slate-400">This certifies that</p>

                  <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 font-brand">
                    {studentName}
                  </h3>

                  <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                    has successfully demonstrated practical competency in Full-Stack Web Development, Data Structures, Algorithms, and Software Architecture by passing the verified assessment with a score of {score}/5.
                  </p>

                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-2">
                    <div>
                      <span>Verification ID: </span>
                      <strong className="text-cyan-400">{certId}</strong>
                    </div>
                    <div>
                      <span>Issued: </span>
                      <strong className="text-white">October 2026</strong>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 pt-3 border-t border-white/5">
                    * This certificate verifies demonstrable mastery of coursework on the SLRJ Learn platform. It is not an accredited university qualification.
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    onClick={handlePrintCertificate}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-500/20"
                  >
                    <Download size={14} />
                    <span>Download / Print Certificate</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── Section 2: Technical Interview Practice ── */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-white/10 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-cyan-400" />
            <h2 className="text-xl font-bold text-white font-brand">
              Technical Mock Interview Questions
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Campus & Senior Roles</span>
        </div>

        <div className="space-y-4">
          {MOCK_INTERVIEW_QUESTIONS.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-sm font-bold text-white mb-2 flex items-start gap-2">
                <span className="text-cyan-400 font-mono">Q{idx + 1}:</span>
                <span>{item.q}</span>
              </h3>
              <div className="pl-6 text-xs text-slate-300 leading-relaxed bg-[#030712] p-3 rounded-xl border border-white/5">
                <strong className="text-emerald-400 font-mono block mb-1">Model Answer:</strong>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Resume & Portfolio Guidelines ── */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#080D1A] via-[#091124] to-[#080D1A] border border-white/10 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-amber-400" />
          <h2 className="text-xl font-bold text-white font-brand">
            Resume & Engineering Portfolio Checklist
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-[#030712] border border-white/5">
            <strong className="text-cyan-300 block mb-1">1. Actionable GitHub Links</strong>
            <p className="text-slate-400 leading-relaxed">
              Every project on your resume should feature a working live deployment URL and a clean README with installation instructions.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#030712] border border-white/5">
            <strong className="text-emerald-300 block mb-1">2. Measurable Impact</strong>
            <p className="text-slate-400 leading-relaxed">
              Frame accomplishments with metrics: &quot;Reduced bundle size by 40% using code splitting and Next.js SSR.&quot;
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#030712] border border-white/5">
            <strong className="text-purple-300 block mb-1">3. Honest Competence</strong>
            <p className="text-slate-400 leading-relaxed">
              List only languages and tools you can confidently write code and debug in during an interview sandbox test.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
