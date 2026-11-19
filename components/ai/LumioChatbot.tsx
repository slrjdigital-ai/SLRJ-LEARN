"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Sparkles,
  X,
  Send,
  Code2,
  Bug,
  HelpCircle,
  RotateCcw,
  Copy,
  Check,
  Minimize2,
  Maximize2,
  ChevronDown,
  Terminal,
  Zap,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface LumioMessage {
  id: string;
  sender: "user" | "lumio";
  text: string;
  codeSnippet?: string;
  timestamp: string;
}

const INITIAL_MESSAGES: LumioMessage[] = [
  {
    id: "lumio-welcome",
    sender: "lumio",
    text: `👋 Hey there! I'm **Samy**, your personal AI coding companion.

I'm here to help you master programming step-by-step. You can ask me to:
- 📖 **Explain code** or complex concepts line-by-line
- 🐛 **Diagnose errors** and understand why bugs happen
- 💡 **Give progressive hints** when you're stuck
- 🧠 **Quiz your knowledge** on JavaScript, React, Python, DSA & more

What are you building or debugging right now?`,
    timestamp: "Just now",
  },
];

const QUICK_PROMPTS = [
  { label: "🐛 Fix an error", prompt: "I got a TypeError: cannot read properties of undefined. How do I fix and prevent this?", mode: "diagnose" as const },
  { label: "📖 Explain closures", prompt: "Explain JavaScript closures simply with a real-world analogy and code example.", mode: "explain" as const },
  { label: "🧠 Quiz me on React", prompt: "Give me a quick 1-question quiz on React useEffect dependency array with options.", mode: "quiz" as const },
  { label: "⚡ Async/Await vs Promises", prompt: "What is the difference between Promise chaining and async/await under the hood?", mode: "general" as const },
];

export default function LumioChatbot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<LumioMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"general" | "explain" | "diagnose" | "quiz">("general");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Ensure client-side only mount to avoid hydration mismatch from browser extensions
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Global event listener to open Lumio from anywhere (e.g. Navbar, Code Playground, Projects)
  useEffect(() => {
    const handleOpenLumio = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string; code?: string; mode?: "general" | "explain" | "diagnose" | "quiz" }>;
      setIsOpen(true);
      setIsMinimized(false);
      setHasUnread(false);

      if (customEvent.detail?.prompt) {
        setInputText(customEvent.detail.prompt);
      }
      if (customEvent.detail?.code) {
        setCodeSnippet(customEvent.detail.code);
        setShowCodeInput(true);
      }
      if (customEvent.detail?.mode) {
        setMode(customEvent.detail.mode);
      }

      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    };

    window.addEventListener("open-lumio", handleOpenLumio);
    return () => window.removeEventListener("open-lumio", handleOpenLumio);
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (customPrompt?: string, modeOverride?: "general" | "explain" | "diagnose" | "quiz") => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() && !codeSnippet.trim()) return;

    const currentMode = modeOverride || mode;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: LumioMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: textToSend,
      codeSnippet: codeSnippet.trim() ? codeSnippet : undefined,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          codeSnippet: codeSnippet.trim() || undefined,
          mode: currentMode,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch Samy response");

      const lumioMsg: LumioMessage = {
        id: "lumio-" + Date.now(),
        sender: "lumio",
        text: data.reply || "I analyzed your question, but could not produce a response. Let me try again!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, lumioMsg]);
      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (err: any) {
      const errorMsg: LumioMessage = {
        id: "lumio-err-" + Date.now(),
        sender: "lumio",
        text: `⚠️ **Samy Service Notice:** ${err.message || "Something went wrong while connecting to Samy."}\n\n*Tip: Check that your network connection is active or try asking again in a moment.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInputText("");
    setCodeSnippet("");
    setShowCodeInput(false);
  };

  // Helper to parse simple markdown bold, inline code, and code fences
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        const lang = lines[0].match(/^[a-z]+/i) ? lines[0] : "";
        const code = lang ? lines.slice(1).join("\n") : lines.join("\n");
        const blockId = `code-block-${index}`;

        return (
          <div key={index} className="my-3 rounded-2xl overflow-hidden border border-white/10 bg-[#02050e] shadow-lg">
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-white/[0.04] border-b border-white/5 text-[11px] font-mono text-cyan-300">
              <span className="flex items-center gap-1.5">
                <Terminal size={12} className="text-cyan-400" />
                {lang || "code"}
              </span>
              <button
                onClick={() => handleCopy(blockId, code)}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copiedId === blockId ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedId === blockId ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <pre className="p-3.5 text-xs font-mono text-cyan-100 overflow-x-auto leading-relaxed whitespace-pre">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Format bold, inline code, headers, and bullet points
      const lines = part.split("\n");
      return (
        <div key={index} className="space-y-1.5 text-[13px] leading-relaxed">
          {lines.map((line, lIdx) => {
            if (line.startsWith("### ")) {
              return (
                <h4 key={lIdx} className="font-bold text-cyan-300 text-sm mt-2 mb-1 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-cyan-400" />
                  {line.replace("### ", "")}
                </h4>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <div key={lIdx} className="flex items-start gap-2 text-slate-200 pl-1">
                  <span className="text-cyan-400 mt-1.5 text-xs">•</span>
                  <span>{formatInlineMarkdown(line.replace(/^- /, ""))}</span>
                </div>
              );
            }
            if (line.trim() === "") return <div key={lIdx} className="h-1" />;
            return <p key={lIdx}>{formatInlineMarkdown(line)}</p>;
          })}
        </div>
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    // Basic bold and inline code parser
    const segments = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return segments.map((seg, i) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        return <strong key={i} className="text-white font-bold">{seg.slice(2, -2)}</strong>;
      }
      if (seg.startsWith("`") && seg.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 font-mono text-[12px] border border-cyan-800/40">
            {seg.slice(1, -1)}
          </code>
        );
      }
      return seg;
    });
  };

  if (!mounted) return null;

  return (
    <>
      {/* ─── Floating Trigger Button (Bottom-Right) ─── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">


        <motion.button
          type="button"
          suppressHydrationWarning
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
            setHasUnread(false);
          }}
          className={`relative group flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 rounded-full text-white font-bold shadow-[0_10px_35px_rgba(6,182,212,0.4)] transition-all cursor-pointer ${
            isOpen
              ? "bg-[#0b1329] border border-cyan-400/50 text-cyan-300"
              : "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400"
          }`}
          aria-label="Toggle Samy AI Chatbot"
        >
          {isOpen ? (
            <X size={22} className="text-cyan-300 group-hover:rotate-90 transition-transform duration-200" />
          ) : (
            <>
              <div className="relative">
                <Bot size={22} className="text-black group-hover:rotate-12 transition-transform duration-200" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white ring-2 ring-emerald-500 animate-ping" />
              </div>
              <span className="hidden sm:inline text-black font-extrabold tracking-wide font-brand text-sm">
                Samy AI
              </span>
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-[#030712] animate-bounce" />
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* ─── Chatbot Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "68px" : "640px",
            }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed bottom-20 sm:bottom-24 right-3 sm:right-6 w-[94vw] sm:w-[460px] md:w-[480px] max-h-[86vh] z-50 bg-[#060a14]/95 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden`}
          >
            {/* Shimmer laser top accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 via-emerald-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

            {/* ─── Header ─── */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-white/[0.03] border-b border-white/10 select-none">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                    <Bot size={22} className="text-black" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#060a14] shadow-[0_0_8px_#34d399]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base tracking-tight text-white font-brand">
                      Samy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono text-xs">AI</span>
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Your 24/7 Socratic Coding Companion</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={handleResetChat}
                  title="Clear conversation"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? "Expand" : "Minimize"}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {isMinimized ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
                </button>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* If not minimized, show body and input */}
            {!isMinimized && (
              <>
                {/* ─── Mode Pills ─── */}
                <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {[
                    { id: "general", label: "💬 Chat", desc: "General CS help" },
                    { id: "explain", label: "📖 Explain", desc: "Line-by-line breakdown" },
                    { id: "diagnose", label: "🐛 Bug Fix", desc: "Identify & fix errors" },
                    { id: "quiz", label: "🧠 Quiz", desc: "Practice check questions" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id as any)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                        mode === m.id
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-500/20"
                          : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* ─── Messages Scroll Area ─── */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
                  {messages.map((msg) => {
                    const isLumio = msg.sender === "lumio";
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${isLumio ? "items-start" : "items-start flex-row-reverse"}`}
                      >
                        {/* Avatar */}
                        {isLumio ? (
                          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-cyan-500/20">
                            <Bot size={15} className="text-black" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-xl bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-300 font-bold text-[11px]">
                            You
                          </div>
                        )}

                        {/* Bubble */}
                        <div
                          className={`max-w-[85%] rounded-2xl p-3.5 shadow-md ${
                            isLumio
                              ? "bg-[#0b1122] border border-white/10 text-slate-200"
                              : "bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium ml-auto"
                          }`}
                        >
                          {/* Attached code snippet in user msg */}
                          {msg.codeSnippet && (
                            <div className="mb-2 p-2.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-cyan-200 overflow-x-auto">
                              <div className="text-[10px] text-cyan-400 font-bold mb-1 flex items-center gap-1">
                                <Code2 size={12} />
                                Attached Code:
                              </div>
                              <pre className="whitespace-pre">
                                <code>{msg.codeSnippet}</code>
                              </pre>
                            </div>
                          )}

                          {/* Message Body */}
                          {isLumio ? (
                            <div className="text-slate-200">{renderMessageContent(msg.text)}</div>
                          ) : (
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                          )}

                          <div className={`text-[10px] mt-2 font-mono ${isLumio ? "text-slate-500 text-right" : "text-cyan-200 text-right"}`}>
                            {msg.timestamp}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Thinking Indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
                        <Bot size={15} className="text-cyan-300 animate-spin" />
                      </div>
                      <div className="px-4 py-2.5 rounded-2xl bg-[#0b1122] border border-white/10 text-slate-300 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        <span className="text-xs font-medium text-cyan-300">Samy is reasoning...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* ─── Quick Prompt Chips (When few messages) ─── */}
                {messages.length <= 2 && (
                  <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5">
                    <div className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Zap size={12} className="text-amber-400" />
                      Quick Questions:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_PROMPTS.map((qp, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(qp.prompt, qp.mode)}
                          className="text-[11px] px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-all text-left cursor-pointer"
                        >
                          {qp.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ─── Code Snippet Drawer ─── */}
                <AnimatePresence>
                  {showCodeInput && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 py-2.5 bg-[#030611] border-t border-cyan-500/30"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                          <Terminal size={12} className="text-cyan-400" />
                          Paste Code Snippet
                        </span>
                        <button
                          onClick={() => {
                            setCodeSnippet("");
                            setShowCodeInput(false);
                          }}
                          className="text-[10px] text-slate-400 hover:text-rose-400 font-mono transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        placeholder="// Paste broken code, functions, or HTML/CSS here..."
                        rows={3}
                        className="w-full bg-[#070d1d] text-cyan-100 font-mono text-xs rounded-xl p-2.5 border border-white/10 focus:outline-none focus:border-cyan-400/50 resize-none"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ─── Input Bar ─── */}
                <div className="p-3 sm:p-4 bg-white/[0.03] border-t border-white/10">
                  <div className="relative flex items-end gap-2 bg-[#030611] border border-white/10 rounded-2xl p-2 focus-within:border-cyan-400/60 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all">
                    {/* Attach Code Button */}
                    <button
                      type="button"
                      onClick={() => setShowCodeInput(!showCodeInput)}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        showCodeInput || codeSnippet
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                      title={showCodeInput ? "Close code box" : "Attach code snippet"}
                    >
                      <Code2 size={16} />
                    </button>

                    {/* Text Input */}
                    <textarea
                      ref={inputRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Samy anything about code... (Enter to send)"
                      rows={1}
                      className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 text-xs sm:text-sm py-1.5 focus:outline-none resize-none max-h-24 leading-relaxed"
                    />

                    {/* Send Button */}
                    <button
                      type="button"
                      onClick={() => handleSend()}
                      disabled={isLoading || (!inputText.trim() && !codeSnippet.trim())}
                      className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold transition-all shadow-md shadow-cyan-500/25 cursor-pointer flex items-center justify-center flex-shrink-0"
                      aria-label="Send message to Samy"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500">
                    <span>Press Enter to send, Shift+Enter for new line</span>
                    <span>Powered by Samy Socratic Engine</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
