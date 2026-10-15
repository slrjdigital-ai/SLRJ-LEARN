"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User as UserIcon,
  Sparkles,
  Code2,
  Bug,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  Terminal,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  codeSnippet?: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-welcome",
    sender: "ai",
    text: `👋 Hello! I am **Lumio**, your AI coding companion. 

I am here to help you learn deeply, not just copy answers. You can ask me to:
- 📖 **Explain code** line by line
- 🐛 **Diagnose errors** and understand why bugs occur
- 🧩 **Generate practice questions** on any topic
- 💡 **Provide progressive hints** when you get stuck

What programming concept or problem are you working on today?`,
    timestamp: "Just now",
  },
];

export default function AiTutorChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<"general" | "explain" | "diagnose" | "quiz">("general");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (customPrompt?: string, modeOverride?: "general" | "explain" | "diagnose" | "quiz") => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() && !codeSnippet.trim()) return;

    const currentMode = modeOverride || activeMode;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: textToSend,
      codeSnippet: codeSnippet.trim() ? codeSnippet : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
      if (!res.ok) throw new Error(data.error || "Failed to fetch response");

      const aiMsg: ChatMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "ai",
        text: `⚠️ **Notice:** ${err.message || "The AI service is momentarily busy. You can continue reading your course materials or try asking again in a few seconds."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setCodeSnippet("");
    setShowCodeInput(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl flex flex-col h-[750px] overflow-hidden">
      {/* ── Chat Header ── */}
      <div className="px-6 py-4 bg-[#050814] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bot size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white font-brand">SLRJ AI Coding Tutor</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Online • Socratic Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive guidance, concept breakdowns & progressive hints
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors cursor-pointer"
          title="Reset Conversation"
        >
          <RotateCcw size={13} />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* ── Quick Action Presets ── */}
      <div className="px-6 py-2.5 bg-[#070B18] border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 shrink-0">
          <Sparkles size={12} className="text-cyan-400" />
          <span>Quick Actions:</span>
        </span>
        <button
          onClick={() => {
            setActiveMode("explain");
            handleSend("Could you explain this concept step by step for a beginner?", "explain");
          }}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/5 whitespace-nowrap transition-colors cursor-pointer"
        >
          📖 Explain Line-by-Line
        </button>
        <button
          onClick={() => {
            setShowCodeInput(true);
            setActiveMode("diagnose");
          }}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/5 whitespace-nowrap transition-colors cursor-pointer"
        >
          🐛 Diagnose Error in Code
        </button>
        <button
          onClick={() => {
            setActiveMode("quiz");
            handleSend("Generate a practice quiz question on JavaScript asynchronous promises.", "quiz");
          }}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/5 whitespace-nowrap transition-colors cursor-pointer"
        >
          🧩 Practice Quiz
        </button>
      </div>

      {/* ── Chat Messages Container ── */}
      <div className="flex-1 p-6 overflow-y-auto space-y-5">
        {messages.map((msg) => {
          const isAi = msg.sender === "ai";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3.5 ${isAi ? "justify-start" : "justify-end"}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                  <Bot size={16} />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed transition-all ${
                  isAi
                    ? "bg-[#0A1024] border border-white/10 text-slate-200 shadow-md"
                    : "bg-gradient-to-r from-cyan-600 to-emerald-600 text-black font-medium shadow-md shadow-cyan-500/10"
                }`}
              >
                {/* User Attached Code Snippet */}
                {msg.codeSnippet && (
                  <div className="mb-3 rounded-xl bg-black/60 border border-white/10 p-3 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                    <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1">
                      <Code2 size={12} className="text-cyan-400" />
                      <span>Attached Code Snippet:</span>
                    </div>
                    <pre><code>{msg.codeSnippet}</code></pre>
                  </div>
                )}

                {/* Text Content */}
                <div className="whitespace-pre-line prose prose-invert prose-xs">
                  {msg.text}
                </div>

                {/* Footer Controls */}
                <div
                  className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[10px] font-mono ${
                    isAi ? "border-white/5 text-slate-500" : "border-black/10 text-black/70"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isAi && (
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      className="hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check size={11} className="text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={11} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0 mt-1">
                  <UserIcon size={16} />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1 animate-pulse">
              <Bot size={16} />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0A1024] border border-white/10 text-xs text-cyan-300 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Analyzing code and formulating Socratic guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Collapsible Code Snippet Input Drawer ── */}
      {showCodeInput && (
        <div className="px-6 py-3 bg-[#050814] border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Code2 size={13} />
              <span>Paste Code to Diagnose or Explain:</span>
            </span>
            <button
              onClick={() => {
                setShowCodeInput(false);
                setCodeSnippet("");
              }}
              className="text-slate-500 hover:text-white text-[11px]"
            >
              Hide Code Box
            </button>
          </div>
          <textarea
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            rows={3}
            placeholder="// Paste your JavaScript, Python, HTML, or SQL snippet here..."
            className="w-full bg-[#030712] border border-white/10 rounded-xl p-2.5 font-mono text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
          />
        </div>
      )}

      {/* ── Input Bar ── */}
      <div className="p-4 bg-[#050814] border-t border-white/10 flex items-center gap-2">
        <button
          onClick={() => setShowCodeInput(!showCodeInput)}
          className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
            showCodeInput
              ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-300"
              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
          }`}
          title="Attach Code Snippet"
        >
          <Code2 size={17} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask a question or paste code (e.g. 'Why is my loop freezing?', 'Explain async/await')..."
          className="flex-1 bg-[#080D1A] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
        />

        <button
          onClick={() => handleSend()}
          disabled={isLoading || (!inputText.trim() && !codeSnippet.trim())}
          className="p-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold disabled:opacity-40 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
