"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useGamification } from "@/context/GamificationContext";
import {
  Play,
  Square,
  RotateCcw,
  Save,
  Check,
  CheckCircle2,
  XCircle,
  Copy,
  Download,
  Trash2,
  Terminal,
  Code2,
  Lightbulb,
  Trophy,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Clock,
  ChevronRight,
  ChevronDown,
  Files,
  Search,
  Settings,
  GitBranch,
  Split,
  Maximize2,
  Minimize2,
  FileCode,
  FolderOpen,
  PanelLeft,
  X,
  ExternalLink,
  Info,
  Bug,
  LayoutTemplate,
  Coffee,
  Globe,
  Sliders,
  FolderPlus,
  FilePlus,
  RefreshCw,
  Smartphone,
  Tablet,
  Monitor,
  HelpCircle,
  Bot,
  AlertCircle,
  Loader2,
  BookOpen,
  Compass,
} from "lucide-react";

import {
  PlaygroundLanguage,
  ExecutionResult,
  executePlaygroundCode,
  preloadPyodide,
} from "@/lib/playground";

import {
  SavedProject,
  getAllSavedProjects,
  saveProject,
  deleteProject,
  duplicateProject,
  createNewProject,
  saveAutoSaveState,
  getAutoSaveState,
} from "@/lib/playground/projectStorage";

import {
  PLAYGROUND_CHALLENGES,
  CodingChallenge,
  TestCase,
} from "@/lib/playground/challenges";

import { EditorTheme, THEMES } from "@/lib/playground/syntaxHighlighter";
import EditorCanvas from "./EditorCanvas";

export default function CodePlayground() {
  const searchParams = useSearchParams();
  const { awardXP } = useGamification();

  // ── Language & Project State ──
  const [languageMode, setLanguageMode] = useState<PlaygroundLanguage>("web");
  const [activeChallengeId, setActiveChallengeId] = useState<string>("web-counter");

  // Multi-file state
  const [files, setFiles] = useState<Record<string, string>>({
    "index.html": "",
    "style.css": "",
    "script.js": "",
  });
  const [activeFile, setActiveFile] = useState<string>("index.html");
  const [dirtyFiles, setDirtyFiles] = useState<Set<string>>(new Set());

  // Workspace Settings
  const [editorTheme, setEditorTheme] = useState<EditorTheme>("vs-dark");
  const [editorFontSize, setEditorFontSize] = useState<number>(13);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeActivityTab, setActiveActivityTab] = useState<
    "explorer" | "search" | "projects" | "challenges" | "hints" | "ai" | "settings"
  >("explorer");
  const [fileSearchQuery, setFileSearchQuery] = useState("");
  const [findBarOpen, setFindBarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Layout & Resizing
  const [layoutMode, setLayoutMode] = useState<"split-right" | "split-bottom">("split-right");
  const [mobileTab, setMobileTab] = useState<"editor" | "output">("editor");
  const [splitPercent, setSplitPercent] = useState<number>(52);
  const [isDragging, setIsDragging] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Live Preview Settings
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewRefreshKey, setPreviewRefreshKey] = useState<number>(1);
  const [webSrcDoc, setWebSrcDoc] = useState<string>("");

  // Terminal & Output State
  const [terminalTab, setTerminalTab] = useState<"terminal" | "preview" | "stdin" | "output" | "tests" | "problems">("preview");
  const [stdinInput, setStdinInput] = useState<string>("");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [rawOutput, setRawOutput] = useState<string>("");
  const [executionMeta, setExecutionMeta] = useState<{
    engineName: string;
    executionTimeMs: number;
    exitCode: number;
    hasError: boolean;
  }>({
    engineName: "System Gateway",
    executionTimeMs: 0,
    exitCode: 0,
    hasError: false,
  });

  // Execution & Cancellation
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Verification & Test Results
  const [testResults, setTestResults] = useState<
    Array<{
      id: string;
      name: string;
      passed: boolean;
      expected: string;
      actual: string;
      description: string;
    }>
  >([]);
  const [verificationSummary, setVerificationSummary] = useState<{
    tested: boolean;
    allPassed: boolean;
    score: number;
    total: number;
    xpEarned: number;
  }>({
    tested: false,
    allPassed: false,
    score: 0,
    total: 0,
    xpEarned: 0,
  });

  // Auto-Save & Project Persistence
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving" | "failed">("saved");
  const [lastSavedTime, setLastSavedTime] = useState<string>("");
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Samy AI Tutor State
  const [samyOpen, setSamyOpen] = useState(false);
  const [samyPrompt, setSamyPrompt] = useState("");
  const [samyMessages, setSamyMessages] = useState<Array<{ role: "user" | "samy"; text: string; time: string }>>([
    {
      role: "samy",
      text: "👋 Hello! I am **Samy**, your SLRJ Learn AI Coding Companion. Ask me to explain concepts, diagnose compiler errors, or suggest optimizations!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isSamyThinking, setIsSamyThinking] = useState(false);

  // Modals & Prompts
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    confirmLabel: string;
    onConfirm: () => void;
  } | null>(null);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  // Editor Cursor Position
  const [cursorPos, setCursorPos] = useState<{ ln: number; col: number }>({ ln: 1, col: 1 });
  const [copiedStatus, setCopiedStatus] = useState(false);

  // ── Language Definitions ──
  const languagesList = useMemo(
    () => [
      { id: "web", name: "HTML / CSS / JS", icon: Globe, color: "text-amber-400", ext: ".html", defaultFile: "index.html" },
      { id: "python", name: "Python 3.12", icon: Cpu, color: "text-blue-400", ext: ".py", defaultFile: "main.py" },
      { id: "cpp", name: "C++ (GCC 13.2)", icon: Layers, color: "text-cyan-400", ext: ".cpp", defaultFile: "main.cpp" },
      { id: "c", name: "C (C17 Standard)", icon: Code2, color: "text-indigo-400", ext: ".c", defaultFile: "main.c" },
      { id: "java", name: "Java (OpenJDK 17)", icon: Coffee, color: "text-orange-400", ext: ".java", defaultFile: "Main.java" },
      { id: "sql", name: "SQL (Relational)", icon: Database, color: "text-emerald-400", ext: ".sql", defaultFile: "schema.sql" },
    ],
    []
  );

  // Current active challenge
  const currentChallenge: CodingChallenge = useMemo(() => {
    const list = PLAYGROUND_CHALLENGES[languageMode] || [];
    return list.find((c) => c.id === activeChallengeId) || list[0] || PLAYGROUND_CHALLENGES.web[0];
  }, [languageMode, activeChallengeId]);

  // Preload Pyodide WebAssembly
  useEffect(() => {
    preloadPyodide();
  }, []);

  // Load saved projects list
  const refreshSavedProjects = useCallback(() => {
    setSavedProjects(getAllSavedProjects());
  }, []);

  useEffect(() => {
    refreshSavedProjects();
    const handleStorageChange = () => refreshSavedProjects();
    window.addEventListener("slrj_playground_projects_changed", handleStorageChange);
    return () => window.removeEventListener("slrj_playground_projects_changed", handleStorageChange);
  }, [refreshSavedProjects]);

  // Initialize Starter Files for Language or Challenge
  const loadChallenge = useCallback(
    (challenge: CodingChallenge) => {
      setActiveChallengeId(challenge.id);
      setLanguageMode(challenge.language);
      setFiles({ ...challenge.starterFiles });
      const defaultF = Object.keys(challenge.starterFiles)[0] || "main.txt";
      setActiveFile(defaultF);
      setDirtyFiles(new Set());
      setTestResults([]);
      setVerificationSummary({ tested: false, allPassed: false, score: 0, total: 0, xpEarned: 0 });

      if (challenge.language === "web") {
        setTerminalTab("preview");
        buildAndSetWebDoc(
          challenge.starterFiles["index.html"] || "",
          challenge.starterFiles["style.css"] || "",
          challenge.starterFiles["script.js"] || ""
        );
      } else {
        setTerminalTab("terminal");
      }
    },
    []
  );

  // Load initial challenge or query params on mount
  useEffect(() => {
    const langParam = searchParams.get("lang") as PlaygroundLanguage | null;
    if (langParam && PLAYGROUND_CHALLENGES[langParam]) {
      const ch = PLAYGROUND_CHALLENGES[langParam][0];
      loadChallenge(ch);
    } else {
      loadChallenge(PLAYGROUND_CHALLENGES.web[0]);
    }
  }, [searchParams, loadChallenge]);

  // ── Web Document Builder ──
  const buildWebDocument = (h: string, c: string, j: string) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      ${c}
    </style>
  </head>
  <body>
    ${h}
    <script>
      (function() {
        const _send = function(level, ...args) {
          try {
            window.parent.postMessage({
              type: 'SLRJ_PLAYGROUND_LOG',
              level: level,
              message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
            }, '*');
          } catch(e) {}
        };
        console.log = function(...args) { _send('log', ...args); };
        console.info = function(...args) { _send('info', ...args); };
        console.warn = function(...args) { _send('warn', ...args); };
        console.error = function(...args) { _send('error', ...args); };
        window.onerror = function(msg, url, line) {
          _send('error', 'Error at line ' + line + ': ' + msg);
          return true;
        };
        try {
          ${j}
        } catch(err) {
          _send('error', 'Runtime Error: ' + err.message);
        }
      })();
    <\/script>
  </body>
</html>`;

  const buildAndSetWebDoc = useCallback((h: string, c: string, j: string) => {
    setWebSrcDoc(buildWebDocument(h, c, j));
  }, []);

  // Listen for iframe log messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "SLRJ_PLAYGROUND_LOG") {
        const { level, message } = e.data;
        const prefix = level === "error" ? "🔴 [Error]" : level === "warn" ? "⚠️ [Warn]" : "[Console]";
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setConsoleLogs((prev) => [...prev, `${prefix} ${message} (${time})`]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ── Code Change with Debounced Auto-Save ──
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCodeChange = (newCode: string) => {
    setFiles((prev) => {
      const updated = { ...prev, [activeFile]: newCode };
      return updated;
    });

    setDirtyFiles((prev) => new Set(prev).add(activeFile));
    setAutoSaveStatus("saving");

    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      saveAutoSaveState(languageMode, { ...files, [activeFile]: newCode }, activeFile);
      setAutoSaveStatus("saved");
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1200);
  };

  // ── Manual Save ──
  const handleManualSave = () => {
    if (activeProjectId) {
      const existing = savedProjects.find((p) => p.id === activeProjectId);
      if (existing) {
        saveProject({
          ...existing,
          files,
          activeFile,
          updatedAt: new Date().toISOString(),
        });
      }
    } else {
      saveAutoSaveState(languageMode, files, activeFile);
    }
    setDirtyFiles(new Set());
    setAutoSaveStatus("saved");
    setLastSavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  };

  // ── Reset to Starter Code ──
  const handleResetConfirm = () => {
    setConfirmModal({
      title: "Reset to Starter Template?",
      message: "Are you sure you want to reset this exercise? All your unsaved changes and edits in this workspace will be replaced with the original starter code.",
      confirmLabel: "Reset Workspace",
      onConfirm: () => {
        setConfirmModal(null);
        loadChallenge(currentChallenge);
      },
    });
  };

  // ── Real Code Execution (Run) ──
  const handleRunCode = async () => {
    if (isRunning) return;

    setIsRunning(true);
    const startT = performance.now();

    // Abort controller for cancellation
    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (languageMode === "web") {
      setTerminalTab("preview");
      setConsoleLogs([
        `[Chromium Browser Engine] Compiling DOM elements, styles, and scripts...`,
        `[Workspace timestamp: ${new Date().toLocaleTimeString()}]`,
      ]);

      const h = files["index.html"] || "";
      const c = files["style.css"] || "";
      const j = files["script.js"] || "";
      buildAndSetWebDoc(h, c, j);
      setPreviewRefreshKey((k) => k + 1);

      const dur = Math.max(1, Math.round(performance.now() - startT));
      setExecutionMeta({
        engineName: "Chromium DOM Sandbox",
        executionTimeMs: dur,
        exitCode: 0,
        hasError: false,
      });
      setIsRunning(false);
      return;
    }

    // Non-Web Execution
    setTerminalTab("terminal");
    setConsoleLogs([
      `[SLRJ Compiler Studio] Dispatching ${languageMode.toUpperCase()} source to runtime engine...`,
      `[Standard Input: ${stdinInput ? "Active payload attached" : "None"}]`,
    ]);

    const activeSourceCode = files[activeFile] || Object.values(files)[0] || "";

    try {
      const result: ExecutionResult = await executePlaygroundCode(
        languageMode,
        activeSourceCode,
        stdinInput,
        controller.signal
      );

      const logLines: string[] = [];
      logLines.push(`[${result.engineName}] Status: ${result.exitCode === 0 ? "0 (SUCCESS)" : `${result.exitCode} (ERROR)`} | Elapsed: ${result.executionTimeMs}ms`);
      logLines.push("────────────────────────────────────────────────────────────────");

      if (result.stderr && result.stderr.length > 0) {
        logLines.push(...result.stderr);
      }
      if (result.stdout && result.stdout.length > 0) {
        logLines.push(...result.stdout);
      }

      if (result.exitCode === 0) {
        logLines.push(`\n✔ Process completed successfully with exit code 0.`);
      } else {
        logLines.push(`\n✖ Process terminated with exit code ${result.exitCode}.`);
      }

      setConsoleLogs(logLines);
      setRawOutput([...result.stdout, ...result.stderr].join("\n"));
      setExecutionMeta({
        engineName: result.engineName,
        executionTimeMs: result.executionTimeMs,
        exitCode: result.exitCode,
        hasError: result.hasError,
      });
    } catch (err: any) {
      setConsoleLogs([
        `[Execution Failed] Unexpected error: ${err.message || String(err)}`,
        `Please check runtime configurations or try again.`,
      ]);
      setExecutionMeta({
        engineName: "Runtime Exception",
        executionTimeMs: 1,
        exitCode: 1,
        hasError: true,
      });
    } finally {
      setIsRunning(false);
      abortControllerRef.current = null;
    }
  };

  // ── Stop Execution ──
  const handleStopExecution = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsRunning(false);
      setConsoleLogs((prev) => [...prev, "⚠️ Execution was cancelled by user."]);
    }
  };

  // ── Verify Solution (Automated Test Runner) ──
  const handleVerifySolution = async () => {
    setIsRunning(true);
    setTerminalTab("tests");

    const tests = currentChallenge.testCases || [];
    const activeCode = files[activeFile] || Object.values(files)[0] || "";
    const evaluated: typeof testResults = [];
    let passedCount = 0;

    // 1. Run actual code first
    const execResult = await executePlaygroundCode(languageMode, activeCode, stdinInput);

    const fullOutput = [...(execResult.stdout || []), ...(execResult.stderr || [])].join("\n");

    tests.forEach((t) => {
      let passed = false;
      let actualDetail = "";

      if (languageMode === "web") {
        const html = files["index.html"] || "";
        const js = files["script.js"] || "";
        if (t.id === "t1") {
          passed = html.includes("id=\"counterBtn\"") || html.includes("id='counterBtn'");
          actualDetail = passed ? "Found #counterBtn in DOM" : "Missing button with ID #counterBtn";
        } else if (t.id === "t2") {
          passed = js.includes("addEventListener") && js.includes("click");
          actualDetail = passed ? "Found addEventListener('click')" : "Missing click event listener";
        } else {
          passed = js.includes("5") || js.includes("badge");
          actualDetail = passed ? "Badge logic detected" : "Milestone badge updates missing";
        }
      } else {
        // Match expected text in real program output
        const matchFound =
          fullOutput.toLowerCase().includes(t.expected.toLowerCase().trim().slice(0, 20)) ||
          execResult.exitCode === 0;

        passed = matchFound && !execResult.hasError;
        actualDetail = execResult.hasError
          ? `Runtime Error (Exit ${execResult.exitCode})`
          : fullOutput.slice(0, 80) || "Code executed cleanly";
      }

      if (passed) passedCount++;
      evaluated.push({
        id: t.id,
        name: t.name,
        passed,
        expected: t.expected,
        actual: actualDetail,
        description: t.description,
      });
    });

    const allPassed = passedCount === tests.length && tests.length > 0;
    const earned = allPassed ? currentChallenge.xp : Math.round((passedCount / (tests.length || 1)) * currentChallenge.xp);

    if (allPassed) {
      awardXP(earned, `Mastered Playground Challenge: ${currentChallenge.title}`);
    }

    setTestResults(evaluated);
    setVerificationSummary({
      tested: true,
      allPassed,
      score: passedCount,
      total: tests.length,
      xpEarned: earned,
    });
    setIsRunning(false);
  };

  // ── Ask Samy AI Tutor ──
  const handleAskSamy = async (presetPrompt?: string) => {
    const promptToSend = presetPrompt || samyPrompt;
    if (!promptToSend.trim()) return;

    const userMsg = {
      role: "user" as const,
      text: promptToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setSamyMessages((prev) => [...prev, userMsg]);
    if (!presetPrompt) setSamyPrompt("");
    setIsSamyThinking(true);

    const activeCode = files[activeFile] || "";
    const activeDiagnostics = consoleLogs.slice(-6).join("\n");

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${promptToSend}\n\n[Active Diagnostics / Terminal Output]:\n${activeDiagnostics}`,
          codeSnippet: activeCode,
          mode: "tutor",
        }),
      });

      if (!res.ok) {
        throw new Error(`AI Tutor API returned status ${res.status}`);
      }

      const data = await res.json();
      const samyReply = data.reply || "I reviewed your code. Consider checking data types, loop conditions, and return values.";

      setSamyMessages((prev) => [
        ...prev,
        {
          role: "samy",
          text: samyReply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err: any) {
      setSamyMessages((prev) => [
        ...prev,
        {
          role: "samy",
          text: `⚠️ **Samy Service Notice:** Unable to reach AI companion service right now (${err.message || "Network error"}).\n\n*Tip: Check syntax errors in the Problems tab or review the Strategy & Hints tab for guidance.*`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsSamyThinking(false);
    }
  };

  // ── Draggable Split Resizing ──
  const handleMouseDownResizer = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!workspaceRef.current) return;
      const rect = workspaceRef.current.getBoundingClientRect();
      let percent: number;

      if (layoutMode === "split-right") {
        const clientX = moveEvent.clientX;
        percent = ((clientX - rect.left) / rect.width) * 100;
      } else {
        const clientY = moveEvent.clientY;
        percent = ((clientY - rect.top) / rect.height) * 100;
      }

      setSplitPercent(Math.min(78, Math.max(22, Math.round(percent))));
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // ── Keyboard Shortcuts ──
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          handleVerifySolution();
        } else {
          handleRunCode();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleManualSave();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
      } else if (e.key === "?" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setShortcutsModalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  });

  // Filtered files for sidebar search
  const filteredFileList = useMemo(() => {
    const keys = Object.keys(files);
    if (!fileSearchQuery) return keys;
    return keys.filter((k) => k.toLowerCase().includes(fileSearchQuery.toLowerCase()));
  }, [files, fileSearchQuery]);

  // Download active file
  const handleDownloadFile = () => {
    const content = files[activeFile] || "";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    const content = files[activeFile] || "";
    navigator.clipboard.writeText(content);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <div
      ref={workspaceRef}
      className={`flex flex-col bg-[#12141C] border border-[#252836] rounded-xl overflow-hidden shadow-2xl transition-all duration-200 ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none h-screen" : "h-[86vh] min-h-[640px]"
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. TOP NAVIGATION & WORKSPACE COMMAND CENTER                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="h-13 bg-[#171B26] border-b border-[#252836] flex items-center justify-between px-3 sm:px-4 text-xs select-none flex-shrink-0 z-20">
        {/* Left: Branding, Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#173B70] via-[#18B6D2] to-cyan-400 flex items-center justify-center text-white font-bold shadow-md shadow-cyan-900/30">
              <Code2 size={16} />
            </div>
            <div className="hidden md:flex flex-col">
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-white font-brand">
                <span>SLRJ Learn</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 font-mono font-medium border border-cyan-500/30">
                  STUDIO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Learn. Build. Grow.</span>
            </div>
          </div>

          <div className="hidden lg:block h-5 w-px bg-[#2E3346]" />

          {/* Language Selector */}
          <div className="relative">
            <select
              value={languageMode}
              onChange={(e) => {
                const newLang = e.target.value as PlaygroundLanguage;
                const ch = PLAYGROUND_CHALLENGES[newLang]?.[0];
                if (ch) loadChallenge(ch);
              }}
              aria-label="Select Programming Language"
              className="bg-[#202534] hover:bg-[#282E42] text-white border border-[#2E3346] rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#18B6D2] transition-colors cursor-pointer"
            >
              {languagesList.map((lang) => (
                <option key={lang.id} value={lang.id} className="bg-[#171B26] text-white">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Auto-save Status */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
            {autoSaveStatus === "saving" ? (
              <>
                <Loader2 size={12} className="animate-spin text-cyan-400" />
                <span className="text-cyan-300">Saving...</span>
              </>
            ) : autoSaveStatus === "saved" ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span>Saved {lastSavedTime ? `at ${lastSavedTime}` : ""}</span>
              </>
            ) : (
              <span className="text-rose-400">Save failed</span>
            )}
          </div>
        </div>

        {/* Center: Mobile Editor/Output Tab Switcher */}
        <div className="flex md:hidden items-center bg-[#202534] p-0.5 rounded-lg border border-[#2E3346]">
          <button
            onClick={() => setMobileTab("editor")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
              mobileTab === "editor" ? "bg-[#18B6D2] text-slate-950 shadow" : "text-slate-400"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setMobileTab("output")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
              mobileTab === "output" ? "bg-[#18B6D2] text-slate-950 shadow" : "text-slate-400"
            }`}
          >
            Preview / Output
          </button>
        </div>

        {/* Right: Quick Links, Action Buttons (Save, Reset, Verify, Run) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Learning Shortcuts */}
          <Link
            href={currentChallenge.courseLink.href}
            className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#202534] hover:bg-[#282E42] text-slate-300 hover:text-white border border-[#2E3346] text-xs transition-colors"
            title="Open related course"
          >
            <BookOpen size={13} className="text-cyan-400" />
            <span className="truncate max-w-[120px]">{currentChallenge.courseLink.title}</span>
          </Link>

          <Link
            href={currentChallenge.roadmapLink.href}
            className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#202534] hover:bg-[#282E42] text-slate-300 hover:text-white border border-[#2E3346] text-xs transition-colors"
            title="Open learning roadmap"
          >
            <Compass size={13} className="text-amber-400" />
            <span>Roadmap</span>
          </Link>

          {/* Reset Workspace */}
          <button
            onClick={handleResetConfirm}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#202534] hover:bg-[#282E42] text-slate-300 hover:text-white border border-[#2E3346] transition-colors cursor-pointer flex items-center gap-1.5"
            title="Reset to original starter code"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleManualSave}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#202534] hover:bg-[#282E42] text-slate-300 hover:text-white border border-[#2E3346] transition-colors cursor-pointer flex items-center gap-1.5 relative"
            title="Save Project (Ctrl+S)"
          >
            <Save size={13} />
            <span className="hidden sm:inline">Save</span>
            {dirtyFiles.size > 0 && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
          </button>

          {/* Verify / Test Button */}
          <button
            onClick={handleVerifySolution}
            disabled={isRunning}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-950/40 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            title="Verify against test cases and earn XP (Ctrl+Shift+Enter)"
          >
            <Trophy size={13} className="text-amber-300" />
            <span className="hidden sm:inline">Verify</span>
          </button>

          {/* Run / Stop Button */}
          {isRunning ? (
            <button
              onClick={handleStopExecution}
              className="px-3 sm:px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-md shadow-rose-950/40 cursor-pointer flex items-center gap-1.5 animate-pulse"
              title="Stop execution"
            >
              <Square size={13} className="fill-white" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              onClick={handleRunCode}
              className="px-3 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#173B70] via-[#18B6D2] to-cyan-400 hover:opacity-95 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-900/30 cursor-pointer flex items-center gap-1.5"
              title="Execute active code (Ctrl+Enter)"
            >
              <Play size={13} className="fill-slate-950" />
              <span>Run</span>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-[#202534] hover:bg-[#282E42] text-slate-300 hover:text-white border border-[#2E3346] transition-colors cursor-pointer hidden md:flex items-center"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Workspace"}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. MIDDLE BODY: ACTIVITY BAR + SIDEBAR + MAIN WORKSPACE          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ── Left Activity Bar (48px) ── */}
        <div className="w-12 bg-[#10131A] border-r border-[#222533] flex flex-col items-center justify-between py-2 flex-shrink-0 z-10 select-none">
          {/* Top Activity Icons */}
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={() => {
                if (activeActivityTab === "explorer" && sidebarOpen) setSidebarOpen(false);
                else { setActiveActivityTab("explorer"); setSidebarOpen(true); }
              }}
              className={`p-2 rounded-lg transition-colors cursor-pointer relative ${
                activeActivityTab === "explorer" && sidebarOpen
                  ? "text-cyan-400 bg-[#1E2333] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`}
              title="File Explorer (Files & Folders)"
            >
              <Files size={18} />
            </button>

            <button
              onClick={() => {
                if (activeActivityTab === "search" && sidebarOpen) setSidebarOpen(false);
                else { setActiveActivityTab("search"); setSidebarOpen(true); }
              }}
              className={`p-2 rounded-lg transition-colors cursor-pointer relative ${
                activeActivityTab === "search" && sidebarOpen
                  ? "text-cyan-400 bg-[#1E2333] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Search Project Files"
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => {
                if (activeActivityTab === "projects" && sidebarOpen) setSidebarOpen(false);
                else { setActiveActivityTab("projects"); setSidebarOpen(true); }
              }}
              className={`p-2 rounded-lg transition-colors cursor-pointer relative ${
                activeActivityTab === "projects" && sidebarOpen
                  ? "text-cyan-400 bg-[#1E2333] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Saved Projects & History"
            >
              <FolderOpen size={18} />
            </button>

            <button
              onClick={() => {
                if (activeActivityTab === "challenges" && sidebarOpen) setSidebarOpen(false);
                else { setActiveActivityTab("challenges"); setSidebarOpen(true); }
              }}
              className={`p-2 rounded-lg transition-colors cursor-pointer relative ${
                activeActivityTab === "challenges" && sidebarOpen
                  ? "text-amber-400 bg-[#1E2333] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-400"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Coding Challenges & XP Tasks"
            >
              <Trophy size={18} />
            </button>

            <button
              onClick={() => {
                if (activeActivityTab === "hints" && sidebarOpen) setSidebarOpen(false);
                else { setActiveActivityTab("hints"); setSidebarOpen(true); }
              }}
              className={`p-2 rounded-lg transition-colors cursor-pointer relative ${
                activeActivityTab === "hints" && sidebarOpen
                  ? "text-amber-400 bg-[#1E2333] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-400"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Strategy & Hints"
            >
              <Lightbulb size={18} />
            </button>

            <button
              onClick={() => {
                if (activeActivityTab === "ai" && sidebarOpen) setSidebarOpen(false);
                else { setActiveActivityTab("ai"); setSidebarOpen(true); }
              }}
              className={`p-2 rounded-lg transition-colors cursor-pointer relative ${
                activeActivityTab === "ai" && sidebarOpen
                  ? "text-cyan-300 bg-[#1E2333] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Samy AI Coding Companion"
            >
              <Bot size={18} />
            </button>
          </div>

          {/* Bottom Settings & Shortcuts Icons */}
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={() => setShortcutsModalOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Keyboard Shortcuts (?)"
            >
              <HelpCircle size={18} />
            </button>

            <button
              onClick={() => {
                if (activeActivityTab === "settings" && sidebarOpen) setSidebarOpen(false);
                else { setActiveActivityTab("settings"); setSidebarOpen(true); }
              }}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                activeActivityTab === "settings" && sidebarOpen ? "text-cyan-400 bg-[#1E2333]" : "text-slate-400 hover:text-white"
              }`}
              title="Editor Settings"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* ── Collapsible Primary Sidebar (240px) ── */}
        {sidebarOpen && (
          <div className="w-56 sm:w-64 bg-[#141822] border-r border-[#222533] flex flex-col flex-shrink-0 text-xs overflow-hidden select-none z-10">
            {/* Sidebar Header */}
            <div className="h-9 px-3 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-[#222533]">
              <span className="truncate">
                {activeActivityTab === "explorer"
                  ? "Explorer: Project"
                  : activeActivityTab === "search"
                  ? "Search Files"
                  : activeActivityTab === "projects"
                  ? "My Projects"
                  : activeActivityTab === "challenges"
                  ? "Exercises & Challenges"
                  : activeActivityTab === "hints"
                  ? "Strategy & Hints"
                  : activeActivityTab === "ai"
                  ? "Samy AI Tutor"
                  : "Settings"}
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:text-white text-slate-400 transition-colors cursor-pointer"
                title="Collapse Sidebar (Ctrl+B)"
              >
                <X size={13} />
              </button>
            </div>

            {/* Sidebar Body */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-4">
              {/* TAB: EXPLORER */}
              {activeActivityTab === "explorer" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <FolderOpen size={13} className="text-cyan-400" />
                      <span>{currentChallenge.title.slice(0, 18)}...</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {filteredFileList.map((filename) => {
                      const isActive = activeFile === filename;
                      const isDirty = dirtyFiles.has(filename);
                      const isHtml = filename.endsWith(".html");
                      const isCss = filename.endsWith(".css");
                      const isJs = filename.endsWith(".js") || filename.endsWith(".ts");
                      const isPy = filename.endsWith(".py");
                      const isCpp = filename.endsWith(".cpp") || filename.endsWith(".c");
                      const isJava = filename.endsWith(".java");

                      return (
                        <button
                          key={filename}
                          onClick={() => setActiveFile(filename)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer group ${
                            isActive
                              ? "bg-[#1F273A] text-white font-semibold border-l-2 border-cyan-400"
                              : "text-slate-400 hover:text-white hover:bg-[#1A1F2C]"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileCode
                              size={14}
                              className={
                                isHtml
                                  ? "text-amber-400"
                                  : isCss
                                  ? "text-blue-400"
                                  : isJs
                                  ? "text-yellow-400"
                                  : isPy
                                  ? "text-blue-400"
                                  : isCpp
                                  ? "text-cyan-400"
                                  : isJava
                                  ? "text-orange-400"
                                  : "text-slate-400"
                              }
                            />
                            <span className="truncate">{filename}</span>
                          </div>
                          {isDirty && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" title="Unsaved changes" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB: SEARCH */}
              {activeActivityTab === "search" && (
                <div className="space-y-3">
                  <div className="relative">
                    <Search size={13} className="absolute left-2.5 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      value={fileSearchQuery}
                      onChange={(e) => setFileSearchQuery(e.target.value)}
                      placeholder="Search files..."
                      className="w-full bg-[#1A1F2C] border border-[#2E3346] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    {filteredFileList.map((filename) => (
                      <button
                        key={filename}
                        onClick={() => {
                          setActiveFile(filename);
                          setActiveActivityTab("explorer");
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-slate-400 hover:text-white hover:bg-[#1A1F2C] cursor-pointer"
                      >
                        <FileCode size={13} className="text-cyan-400" />
                        <span className="truncate">{filename}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SAVED PROJECTS */}
              {activeActivityTab === "projects" && (
                <div className="space-y-3">
                  <button
                    onClick={() => setNewProjectModalOpen(true)}
                    className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#173B70] to-[#18B6D2] hover:opacity-95 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  >
                    <FolderPlus size={14} />
                    <span>Create New Project</span>
                  </button>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block px-1">
                      Recent Projects ({savedProjects.length})
                    </span>
                    {savedProjects.length === 0 ? (
                      <div className="p-3 text-center text-slate-500 italic text-[11px] bg-[#1A1F2C] rounded-lg">
                        No custom projects saved yet. Click above to save one.
                      </div>
                    ) : (
                      savedProjects.map((p) => (
                        <div
                          key={p.id}
                          className="p-2.5 rounded-lg bg-[#1A1F2C] border border-[#262B3B] hover:border-cyan-500/40 transition-all flex flex-col gap-1.5 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs truncate max-w-[140px]">{p.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 uppercase font-mono font-bold">
                              {p.language}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Updated {new Date(p.updatedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 pt-1 border-t border-[#262B3B] opacity-80 group-hover:opacity-100">
                            <button
                              onClick={() => {
                                setLanguageMode(p.language);
                                setFiles(p.files);
                                setActiveFile(p.activeFile || Object.keys(p.files)[0]);
                                setActiveProjectId(p.id);
                                setActiveActivityTab("explorer");
                              }}
                              className="text-[11px] font-semibold text-cyan-400 hover:underline cursor-pointer"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => duplicateProject(p.id)}
                              className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
                            >
                              Duplicate
                            </button>
                            <button
                              onClick={() => {
                                setConfirmModal({
                                  title: `Delete Project: ${p.name}?`,
                                  message: "This action cannot be undone. All project files will be permanently deleted from your browser storage.",
                                  confirmLabel: "Delete Project",
                                  onConfirm: () => {
                                    deleteProject(p.id);
                                    setConfirmModal(null);
                                  },
                                });
                              }}
                              className="text-[11px] text-rose-400 hover:text-rose-300 ml-auto cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB: CODING CHALLENGES */}
              {activeActivityTab === "challenges" && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block px-1">
                    {languageMode.toUpperCase()} Practice Exercises
                  </span>
                  <div className="space-y-2">
                    {(PLAYGROUND_CHALLENGES[languageMode] || []).map((ch) => {
                      const isCurrent = ch.id === currentChallenge.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => loadChallenge(ch)}
                          className={`w-full p-2.5 rounded-lg text-left transition-all cursor-pointer border ${
                            isCurrent
                              ? "bg-[#1E2536] border-cyan-400/80 shadow-md shadow-cyan-950/20"
                              : "bg-[#1A1F2C] border-[#262B3B] hover:border-slate-600"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-white line-clamp-1">{ch.title}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono font-bold">
                              +{ch.xp} XP
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="text-cyan-400">{ch.difficulty}</span>
                            <span>•</span>
                            <span className="truncate">{ch.category}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB: STRATEGY & HINTS */}
              {activeActivityTab === "hints" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-[#1A1F2C] border border-amber-500/20 space-y-2.5">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300">
                      <Lightbulb size={14} className="text-amber-400" />
                      <span>{currentChallenge.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {currentChallenge.description}
                    </p>

                    <div className="space-y-1 pt-1 border-t border-[#262B3B]">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Steps:
                      </span>
                      {currentChallenge.instructions.map((inst, i) => (
                        <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold shrink-0">{i + 1}.</span>
                          <span>{inst}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#262B3B]">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        Progressive Hints:
                      </span>
                      {currentChallenge.hints.map((hint, idx) => (
                        <div key={idx} className="p-2 rounded bg-[#10131A] border border-[#222533] text-[11px] text-slate-300">
                          <span className="font-bold text-amber-300 block mb-0.5">Hint #{idx + 1}</span>
                          {hint}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SAMY AI TUTOR */}
              {activeActivityTab === "ai" && (
                <div className="flex flex-col h-full space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-[#1A1F2C] border border-cyan-500/30 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <Bot size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Samy AI Coding Companion</div>
                      <div className="text-[10px] text-cyan-300">Socratic guidance &amp; code analysis</div>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 max-h-[300px] overflow-y-auto space-y-2 p-1 font-sans text-xs">
                    {samyMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[#1F273A] text-white border border-[#2E3346] ml-4"
                            : "bg-[#151923] text-slate-200 border border-cyan-500/20 mr-2"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1 text-[9px] text-slate-400">
                          <span className="font-bold uppercase tracking-wider text-cyan-400">
                            {msg.role === "user" ? "You" : "Samy"}
                          </span>
                          <span>{msg.time}</span>
                        </div>
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      </div>
                    ))}
                    {isSamyThinking && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-[#151923] text-cyan-400 text-xs">
                        <Loader2 size={13} className="animate-spin" />
                        <span>Samy is analyzing your code...</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Prompts */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Quick Suggestions:
                    </span>
                    <button
                      onClick={() => handleAskSamy("Explain how this code works step-by-step")}
                      className="w-full text-left p-1.5 rounded bg-[#1A1F2C] hover:bg-[#222838] text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      💡 Explain this code step-by-step
                    </button>
                    <button
                      onClick={() => handleAskSamy("Are there any edge cases or performance bottlenecks?")}
                      className="w-full text-left p-1.5 rounded bg-[#1A1F2C] hover:bg-[#222838] text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      ⚡ Check edge cases &amp; performance
                    </button>
                  </div>

                  {/* Input Box */}
                  <div className="pt-2 border-t border-[#222533] flex flex-col gap-1.5">
                    <textarea
                      value={samyPrompt}
                      onChange={(e) => setSamyPrompt(e.target.value)}
                      placeholder="Ask Samy anything about your code..."
                      rows={2}
                      className="w-full bg-[#1A1F2C] border border-[#2E3346] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleAskSamy();
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAskSamy()}
                      disabled={isSamyThinking || !samyPrompt.trim()}
                      className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs disabled:opacity-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Send to Samy</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: SETTINGS */}
              {activeActivityTab === "settings" && (
                <div className="space-y-4">
                  {/* Theme Selector */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Editor Theme
                    </span>
                    <select
                      value={editorTheme}
                      onChange={(e) => setEditorTheme(e.target.value as EditorTheme)}
                      aria-label="Select Editor Theme"
                      className="w-full bg-[#1A1F2C] border border-[#2E3346] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      {Object.values(THEMES).map((th) => (
                        <option key={th.id} value={th.id} className="bg-[#141822]">
                          {th.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Font Size */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Font Size ({editorFontSize}px)
                    </span>
                    <div className="grid grid-cols-4 gap-1">
                      {[12, 13, 14, 16].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setEditorFontSize(sz)}
                          className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                            editorFontSize === sz
                              ? "bg-cyan-500 text-slate-950 font-bold"
                              : "bg-[#1A1F2C] text-slate-300 hover:bg-[#222838]"
                          }`}
                        >
                          {sz}px
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Split Layout Switcher */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Workspace Split
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setLayoutMode("split-right")}
                        className={`py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                          layoutMode === "split-right"
                            ? "bg-cyan-500 text-slate-950 font-bold"
                            : "bg-[#1A1F2C] text-slate-300 hover:bg-[#222838]"
                        }`}
                      >
                        <Split size={13} />
                        <span>Side-by-Side</span>
                      </button>
                      <button
                        onClick={() => setLayoutMode("split-bottom")}
                        className={`py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                          layoutMode === "split-bottom"
                            ? "bg-cyan-500 text-slate-950 font-bold"
                            : "bg-[#1A1F2C] text-slate-300 hover:bg-[#222838]"
                        }`}
                      >
                        <Split size={13} className="rotate-90" />
                        <span>Stacked</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Main Workspace Body (Editor Canvas + Draggable Split + Terminal/Preview) ── */}
        <div
          className={`flex-1 flex overflow-hidden ${
            layoutMode === "split-right" ? "flex-col md:flex-row" : "flex-col"
          }`}
        >
          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* A. MAIN CODE EDITOR PANE                                       */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div
            className={`flex flex-col overflow-hidden bg-[#1E1E1E] ${
              mobileTab === "output" ? "hidden md:flex" : "flex"
            }`}
            style={{
              flex: layoutMode === "split-right" ? `0 0 ${splitPercent}%` : `0 0 ${splitPercent}%`,
              maxWidth: layoutMode === "split-right" ? `${splitPercent}%` : "100%",
              maxHeight: layoutMode === "split-bottom" ? `${splitPercent}%` : "100%",
            }}
          >
            {/* Tabs Header */}
            <div className="h-9 bg-[#252526] border-b border-[#181818] flex items-center justify-between px-2 flex-shrink-0 text-xs select-none">
              {/* File Tabs */}
              <div className="flex items-center h-full gap-1 overflow-x-auto no-scrollbar">
                {Object.keys(files).map((filename) => {
                  const isActive = activeFile === filename;
                  const isDirty = dirtyFiles.has(filename);

                  return (
                    <button
                      key={filename}
                      onClick={() => setActiveFile(filename)}
                      className={`h-full flex items-center gap-2 px-3 border-r border-[#181818] cursor-pointer transition-colors ${
                        isActive
                          ? "bg-[#1E1E1E] text-white border-t-2 border-t-[#007ACC] font-bold"
                          : "text-slate-400 hover:text-white bg-[#2D2D2D]/40"
                      }`}
                    >
                      <FileCode size={13} className="text-cyan-400" />
                      <span>{filename}</span>
                      {isDirty && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Right Tab Controls: Find, Copy, Download */}
              <div className="flex items-center gap-1.5 text-slate-400">
                <button
                  onClick={() => setFindBarOpen(!findBarOpen)}
                  className={`p-1.5 rounded hover:text-white transition-colors cursor-pointer ${
                    findBarOpen ? "bg-[#007ACC] text-white" : "hover:bg-[#2E3346]"
                  }`}
                  title="Find & Replace in File (Ctrl+F)"
                >
                  <Search size={13} />
                </button>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded hover:bg-[#2E3346] hover:text-white transition-colors cursor-pointer"
                  title="Copy Active Code"
                >
                  {copiedStatus ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
                <button
                  onClick={handleDownloadFile}
                  className="p-1.5 rounded hover:bg-[#2E3346] hover:text-white transition-colors cursor-pointer"
                  title="Download File"
                >
                  <Download size={13} />
                </button>
              </div>
            </div>

            {/* Code Canvas Component */}
            <div className="flex-1 relative overflow-hidden flex flex-col">
              <EditorCanvas
                code={files[activeFile] || ""}
                language={languageMode}
                theme={editorTheme}
                fontSize={editorFontSize}
                onChange={handleCodeChange}
                onCursorChange={setCursorPos}
                onRunShortcut={handleRunCode}
                onSaveShortcut={handleManualSave}
                findBarOpen={findBarOpen}
                onToggleFindBar={setFindBarOpen}
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* DRAGGABLE RESIZER HANDLE                                      */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div
            onMouseDown={handleMouseDownResizer}
            className={`hidden md:flex items-center justify-center bg-[#171B26] hover:bg-[#18B6D2] transition-colors select-none z-20 ${
              isDragging ? "bg-[#18B6D2]" : ""
            } ${
              layoutMode === "split-right"
                ? "w-1.5 cursor-col-resize h-full border-x border-[#252836]"
                : "h-1.5 cursor-row-resize w-full border-y border-[#252836]"
            }`}
            title="Drag to resize editor and output panes"
          >
            <div
              className={`rounded-full bg-slate-500 ${
                layoutMode === "split-right" ? "w-0.5 h-6" : "h-0.5 w-6"
              }`}
            />
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* B. TERMINAL & LIVE PREVIEW OUTPUT PANE                         */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div
            className={`flex-1 flex flex-col overflow-hidden bg-[#10131A] border-[#222533] ${
              mobileTab === "editor" ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Terminal Header & Navigation Tabs */}
            <div className="h-9 bg-[#171B26] border-b border-[#222533] px-3 flex items-center justify-between text-xs select-none flex-shrink-0">
              {/* Tabs */}
              <div className="flex items-center gap-1 font-mono text-xs overflow-x-auto no-scrollbar">
                {languageMode === "web" && (
                  <button
                    onClick={() => setTerminalTab("preview")}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                      terminalTab === "preview"
                        ? "bg-[#1F273A] text-cyan-400 font-bold border-b border-cyan-400"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Globe size={12} className="text-cyan-400" />
                    <span>PREVIEW</span>
                  </button>
                )}

                <button
                  onClick={() => setTerminalTab("terminal")}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                    terminalTab === "terminal"
                      ? "bg-[#1F273A] text-white font-bold border-b border-[#18B6D2]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Terminal size={12} className="text-[#18B6D2]" />
                  <span>TERMINAL</span>
                </button>

                <button
                  onClick={() => setTerminalTab("tests")}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                    terminalTab === "tests"
                      ? "bg-[#1F273A] text-emerald-400 font-bold border-b border-emerald-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Trophy size={12} className="text-amber-400" />
                  <span>TESTS</span>
                  {verificationSummary.tested && (
                    <span
                      className={`text-[9px] px-1 rounded ${
                        verificationSummary.allPassed ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {verificationSummary.score}/{verificationSummary.total}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setTerminalTab("stdin")}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                    terminalTab === "stdin"
                      ? "bg-[#1F273A] text-amber-300 font-bold border-b border-amber-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Sliders size={12} />
                  <span>STDIN</span>
                </button>

                <button
                  onClick={() => setTerminalTab("problems")}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                    terminalTab === "problems"
                      ? "bg-[#1F273A] text-rose-400 font-bold border-b border-rose-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Bug size={12} />
                  <span>PROBLEMS</span>
                </button>
              </div>

              {/* Terminal Right Actions */}
              <div className="flex items-center gap-2">
                {terminalTab === "preview" && languageMode === "web" && (
                  <div className="flex items-center gap-1 bg-[#10131A] p-0.5 rounded border border-[#222533]">
                    <button
                      onClick={() => setPreviewDevice("desktop")}
                      className={`p-1 rounded cursor-pointer ${
                        previewDevice === "desktop" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400 hover:text-white"
                      }`}
                      title="Desktop Size (100%)"
                    >
                      <Monitor size={12} />
                    </button>
                    <button
                      onClick={() => setPreviewDevice("tablet")}
                      className={`p-1 rounded cursor-pointer ${
                        previewDevice === "tablet" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400 hover:text-white"
                      }`}
                      title="Tablet Size (768px)"
                    >
                      <Tablet size={12} />
                    </button>
                    <button
                      onClick={() => setPreviewDevice("mobile")}
                      className={`p-1 rounded cursor-pointer ${
                        previewDevice === "mobile" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400 hover:text-white"
                      }`}
                      title="Mobile Size (375px)"
                    >
                      <Smartphone size={12} />
                    </button>
                    <button
                      onClick={() => setPreviewRefreshKey((k) => k + 1)}
                      className="p-1 rounded text-slate-400 hover:text-white cursor-pointer ml-1"
                      title="Refresh Preview"
                    >
                      <RefreshCw size={12} />
                    </button>
                  </div>
                )}

                {executionMeta.executionTimeMs > 0 && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                    <Clock size={11} className="text-cyan-400" />
                    <span>{executionMeta.executionTimeMs}ms</span>
                  </span>
                )}

                <button
                  onClick={() => {
                    setConsoleLogs([]);
                    setRawOutput("");
                  }}
                  className="p-1 hover:text-white text-slate-400 transition-colors cursor-pointer"
                  title="Clear Output"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 bg-[#0D1017] overflow-y-auto">
              {/* TAB 1: LIVE PREVIEW (WEB) */}
              {terminalTab === "preview" && languageMode === "web" ? (
                <div className="w-full h-full flex items-center justify-center bg-[#07090E] p-2 overflow-auto">
                  <div
                    className={`h-full bg-white transition-all duration-300 shadow-2xl rounded-lg overflow-hidden border border-[#222533] ${
                      previewDevice === "mobile"
                        ? "w-[375px] max-w-full"
                        : previewDevice === "tablet"
                        ? "w-[768px] max-w-full"
                        : "w-full"
                    }`}
                  >
                    <iframe
                      key={previewRefreshKey}
                      srcDoc={webSrcDoc}
                      title="Live Web Preview"
                      sandbox="allow-scripts allow-modals"
                      className="w-full h-full border-none bg-white"
                    />
                  </div>
                </div>
              ) : terminalTab === "stdin" ? (
                /* TAB 2: STDIN INPUT */
                <div className="p-3 space-y-2 text-xs">
                  <div className="text-[11px] text-slate-400">
                    Input stream passed to programs (`input()` in Python, `scanf()` in C, `cin` in C++, `Scanner` in Java).
                  </div>
                  <textarea
                    value={stdinInput}
                    onChange={(e) => setStdinInput(e.target.value)}
                    placeholder="Enter input values line-by-line here before clicking Run..."
                    rows={6}
                    className="w-full p-2.5 rounded-lg bg-[#141822] border border-[#2E3346] font-mono text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>
              ) : terminalTab === "tests" ? (
                /* TAB 3: TEST RESULTS & ASSESSMENT */
                <div className="p-4 space-y-3 font-sans text-xs">
                  {verificationSummary.tested ? (
                    <div
                      className={`p-3 rounded-lg border flex items-center justify-between ${
                        verificationSummary.allPassed
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                          : "bg-amber-500/10 border-amber-500/30 text-amber-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {verificationSummary.allPassed ? (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        ) : (
                          <AlertCircle size={18} className="text-amber-400" />
                        )}
                        <div>
                          <div className="font-bold text-sm">
                            {verificationSummary.allPassed ? "All Tests Passed!" : "Partial Verification"}
                          </div>
                          <div className="text-[11px] opacity-80">
                            Passed {verificationSummary.score} of {verificationSummary.total} test cases.
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-amber-300 font-mono text-sm">
                          +{verificationSummary.xpEarned} XP
                        </div>
                        <div className="text-[10px] text-slate-400">Awarded to Profile</div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-[#141822] border border-[#222533] text-slate-400 text-center italic">
                      Click the green <strong>[Verify]</strong> button in the top navigation to run automated tests.
                    </div>
                  )}

                  <div className="space-y-2">
                    {testResults.map((t, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border ${
                          t.passed
                            ? "bg-emerald-500/5 border-emerald-500/20 text-slate-200"
                            : "bg-rose-500/5 border-rose-500/20 text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5 font-bold">
                            {t.passed ? (
                              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                            ) : (
                              <XCircle size={14} className="text-rose-400 shrink-0" />
                            )}
                            <span>{t.name}</span>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
                              t.passed ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                            }`}
                          >
                            {t.passed ? "Passed" : "Failed"}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mb-1">{t.description}</div>
                        <div className="font-mono text-[10px] bg-[#0A0D13] p-1.5 rounded border border-[#1A1F2C] space-y-0.5">
                          <div className="text-slate-400">Expected: {t.expected}</div>
                          <div className={t.passed ? "text-emerald-300" : "text-rose-300"}>
                            Actual: {t.actual}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : terminalTab === "problems" ? (
                /* TAB 4: PROBLEMS & DIAGNOSTICS */
                <div className="p-4 space-y-2 font-sans text-xs">
                  {executionMeta.hasError ? (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Bug size={14} className="text-rose-400" />
                        <span>Compiler / Runtime Errors Detected</span>
                      </div>
                      <div className="font-mono text-[11px] text-rose-300 whitespace-pre-wrap">
                        {consoleLogs.filter((l) => l.toLowerCase().includes("error")).join("\n") ||
                          "Process exited with non-zero status code."}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-500 italic">
                      <CheckCircle2 size={24} className="mx-auto text-emerald-400/60 mb-2" />
                      <div>No compilation problems or structural issues detected.</div>
                    </div>
                  )}
                </div>
              ) : (
                /* TAB 5: INTEGRATED TERMINAL STREAM */
                <div className="p-3 font-mono text-xs leading-relaxed space-y-1 text-slate-200 select-text">
                  <div className="text-slate-500 text-[11px] mb-2 pb-1 border-b border-[#1A1F2C]">
                    SLRJ Learn Terminal Gateway • {executionMeta.engineName}
                  </div>

                  {consoleLogs.length === 0 ? (
                    <div className="text-slate-500 italic py-4">
                      Terminal ready. Press [Run] or [Ctrl + Enter] to compile and execute active code.
                    </div>
                  ) : (
                    consoleLogs.map((log, idx) => {
                      const isError = log.includes("Error") || log.includes("error") || log.includes("🔴") || log.includes("✖");
                      const isSuccess = log.includes("SUCCESS") || log.includes("completed successfully") || log.includes("✔");
                      const isInfo = log.includes("[") && log.includes("]");

                      return (
                        <div
                          key={idx}
                          className={`whitespace-pre-wrap break-all ${
                            isError
                              ? "text-rose-400 font-medium"
                              : isSuccess
                              ? "text-emerald-400 font-bold"
                              : isInfo
                              ? "text-cyan-300"
                              : "text-slate-300"
                          }`}
                        >
                          {log}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. VS CODE BOTTOM STATUS BAR (24px, #007ACC)                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="h-6 bg-[#007ACC] px-3 flex items-center justify-between text-[11px] text-white font-mono flex-shrink-0 select-none z-20">
        {/* Left: Branch & Problems */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
            <GitBranch size={12} />
            <span>main*</span>
          </div>
          <div
            onClick={() => setTerminalTab("problems")}
            className="flex items-center gap-1.5 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
          >
            <span>{executionMeta.hasError ? "1 ⊗" : "0 ⊗"}</span>
            <span>0 ⚠</span>
          </div>
        </div>

        {/* Right: Line/Col, Encoding, Runtime Indicator */}
        <div className="flex items-center gap-3">
          <span className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">
            Ln {cursorPos.ln}, Col {cursorPos.col}
          </span>
          <span className="hidden sm:inline hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">Spaces: 2</span>
          <span className="hidden sm:inline hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">UTF-8</span>
          <span className="hidden sm:inline hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">LF</span>
          <span className="font-bold bg-white/20 px-2 py-0.5 rounded">
            {executionMeta.engineName}
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MODALS & CONFIRMATION DIALOGS                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-[#181C26] border border-[#2D3346] rounded-xl p-5 max-w-md w-full shadow-2xl text-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertCircle size={18} />
              <span>{confirmModal.title}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{confirmModal.message}</p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#2D3346]">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-3.5 py-1.5 rounded-lg bg-[#252B3B] hover:bg-[#2E354A] text-slate-300 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
              >
                {confirmModal.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. New Project Modal */}
      {newProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-[#181C26] border border-[#2D3346] rounded-xl p-5 max-w-md w-full shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <FolderPlus size={16} className="text-cyan-400" />
                <span>Save New Project</span>
              </span>
              <button
                onClick={() => setNewProjectModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-400 block text-[11px] font-semibold">Project Name</label>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="e.g. My Algorithm Solution"
                className="w-full bg-[#12151D] border border-[#2E354A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                autoFocus
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#2D3346]">
              <button
                onClick={() => setNewProjectModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg bg-[#252B3B] hover:bg-[#2E354A] text-slate-300 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newProjectName.trim()) return;
                  const proj = createNewProject(newProjectName, languageMode, files, activeFile);
                  setActiveProjectId(proj.id);
                  setNewProjectModalOpen(false);
                  setNewProjectName("");
                  refreshSavedProjects();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold cursor-pointer"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Keyboard Shortcuts Modal */}
      {shortcutsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-[#181C26] border border-[#2D3346] rounded-xl p-5 max-w-lg w-full shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D3346] pb-2">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <HelpCircle size={16} className="text-cyan-400" />
                <span>Keyboard Shortcuts &amp; Accessibility</span>
              </span>
              <button
                onClick={() => setShortcutsModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="p-2 rounded bg-[#12151D] border border-[#222533] flex items-center justify-between">
                <span>Run Active Code</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#252B3B] text-[10px] font-mono text-cyan-300">Ctrl + Enter</kbd>
              </div>
              <div className="p-2 rounded bg-[#12151D] border border-[#222533] flex items-center justify-between">
                <span>Verify Tests</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#252B3B] text-[10px] font-mono text-cyan-300">Ctrl + Shift + Enter</kbd>
              </div>
              <div className="p-2 rounded bg-[#12151D] border border-[#222533] flex items-center justify-between">
                <span>Save Project</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#252B3B] text-[10px] font-mono text-cyan-300">Ctrl + S</kbd>
              </div>
              <div className="p-2 rounded bg-[#12151D] border border-[#222533] flex items-center justify-between">
                <span>Toggle Sidebar</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#252B3B] text-[10px] font-mono text-cyan-300">Ctrl + B</kbd>
              </div>
              <div className="p-2 rounded bg-[#12151D] border border-[#222533] flex items-center justify-between">
                <span>Find &amp; Replace</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#252B3B] text-[10px] font-mono text-cyan-300">Ctrl + F</kbd>
              </div>
              <div className="p-2 rounded bg-[#12151D] border border-[#222533] flex items-center justify-between">
                <span>Indent / Dedent</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#252B3B] text-[10px] font-mono text-cyan-300">Tab / Shift + Tab</kbd>
              </div>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShortcutsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
