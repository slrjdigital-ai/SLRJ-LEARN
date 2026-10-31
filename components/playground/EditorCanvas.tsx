"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { tokenizeCode, THEMES, EditorTheme } from "@/lib/playground/syntaxHighlighter";
import { Search, ChevronDown, ChevronUp, X, Replace, ReplaceAll } from "lucide-react";

interface EditorCanvasProps {
  code: string;
  language: string;
  theme: EditorTheme;
  fontSize: number;
  readOnly?: boolean;
  onChange: (newCode: string) => void;
  onCursorChange?: (cursor: { ln: number; col: number }) => void;
  onRunShortcut?: () => void;
  onSaveShortcut?: () => void;
  findBarOpen?: boolean;
  onToggleFindBar?: (open: boolean) => void;
}

export default function EditorCanvas({
  code,
  language,
  theme,
  fontSize,
  readOnly = false,
  onChange,
  onCursorChange,
  onRunShortcut,
  onSaveShortcut,
  findBarOpen = false,
  onToggleFindBar,
}: EditorCanvasProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const [cursorLine, setCursorLine] = useState(1);
  const [findQuery, setFindQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [showReplaceInput, setShowReplaceInput] = useState(false);

  const themeColors = THEMES[theme] || THEMES["vs-dark"];

  // Line count
  const lines = useMemo(() => code.split("\n"), [code]);
  const lineCount = lines.length;

  // Tokenize code for syntax highlighting
  const tokens = useMemo(() => {
    return tokenizeCode(code, language);
  }, [code, language]);

  // Synchronize scrolling between textarea, pre, and gutter
  const handleScroll = () => {
    if (!textareaRef.current) return;
    const top = textareaRef.current.scrollTop;
    const left = textareaRef.current.scrollLeft;

    if (preRef.current) {
      preRef.current.scrollTop = top;
      preRef.current.scrollLeft = left;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = top;
    }
  };

  // Cursor tracking
  const updateCursor = useCallback(() => {
    if (!textareaRef.current) return;
    const selStart = textareaRef.current.selectionStart || 0;
    const textBefore = textareaRef.current.value.substring(0, selStart);
    const splitLines = textBefore.split("\n");
    const ln = splitLines.length;
    const col = (splitLines[splitLines.length - 1] || "").length + 1;
    setCursorLine(ln);
    onCursorChange?.({ ln, col });
  }, [onCursorChange]);

  // Handle Tab, bracket auto-close, indentation on Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const selStart = target.selectionStart;
    const selEnd = target.selectionEnd;
    const val = target.value;

    // Run shortcut (Ctrl+Enter / Cmd+Enter)
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onRunShortcut?.();
      return;
    }

    // Save shortcut (Ctrl+S / Cmd+S)
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      onSaveShortcut?.();
      return;
    }

    // Find shortcut (Ctrl+F / Cmd+F)
    if ((e.ctrlKey || e.metaKey) && e.key === "f") {
      e.preventDefault();
      onToggleFindBar?.(!findBarOpen);
      return;
    }

    // Escape closes find bar
    if (e.key === "Escape" && findBarOpen) {
      e.preventDefault();
      onToggleFindBar?.(false);
      return;
    }

    if (readOnly) return;

    // Tab key handling (2 spaces indent / Shift+Tab dedent)
    if (e.key === "Tab") {
      e.preventDefault();
      if (!e.shiftKey) {
        const nextVal = val.substring(0, selStart) + "  " + val.substring(selEnd);
        onChange(nextVal);
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selStart + 2;
            updateCursor();
          }
        });
      } else {
        // Shift+Tab dedent: if current line starts with spaces, remove up to 2
        const lineStartIdx = val.lastIndexOf("\n", selStart - 1) + 1;
        const linePrefix = val.substring(lineStartIdx, selStart);
        if (linePrefix.startsWith("  ")) {
          const nextVal = val.substring(0, lineStartIdx) + val.substring(lineStartIdx + 2);
          onChange(nextVal);
          requestAnimationFrame(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = Math.max(lineStartIdx, selStart - 2);
              updateCursor();
            }
          });
        }
      }
      return;
    }

    // Auto-indent on Enter
    if (e.key === "Enter") {
      const lineStartIdx = val.lastIndexOf("\n", selStart - 1) + 1;
      const currentLineText = val.substring(lineStartIdx, selStart);
      const leadingSpacesMatch = currentLineText.match(/^(\s*)/);
      let indent = leadingSpacesMatch ? leadingSpacesMatch[1] : "";

      // If line ends with { or : or ( or [, add 2 extra spaces
      const trimmedLine = currentLineText.trimEnd();
      const lastChar = trimmedLine[trimmedLine.length - 1];
      if (lastChar === "{" || lastChar === ":" || lastChar === "(" || lastChar === "[") {
        indent += "  ";
      }

      e.preventDefault();
      const nextVal = val.substring(0, selStart) + "\n" + indent + val.substring(selEnd);
      onChange(nextVal);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          const newPos = selStart + 1 + indent.length;
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newPos;
          updateCursor();
        }
      });
      return;
    }

    // Bracket auto-closing: () [] {}
    const bracketPairs: Record<string, string> = {
      "(": ")",
      "[": "]",
      "{": "}",
    };

    if (bracketPairs[e.key] && selStart === selEnd) {
      const closeChar = bracketPairs[e.key];
      const nextChar = val[selStart] || "";
      if (/^[\s\)\]\}\,\;\.\:\'\"\`]?$/.test(nextChar)) {
        e.preventDefault();
        const nextVal = val.substring(0, selStart) + e.key + closeChar + val.substring(selEnd);
        onChange(nextVal);
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selStart + 1;
            updateCursor();
          }
        });
        return;
      }
    }

    // Skip closing bracket if typed directly in front of matching bracket (only for brackets, not quotes to allow consecutive quotes)
    const closingBrackets = new Set([")", "]", "}"]);
    if (closingBrackets.has(e.key) && val[selStart] === e.key && selStart === selEnd) {
      e.preventDefault();
      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selStart + 1;
      }
      updateCursor();
      return;
    }
  };

  // Find & Replace matches
  const findMatches = useMemo(() => {
    if (!findQuery) return [];
    const matches: number[] = [];
    let pos = 0;
    const lowerCode = code.toLowerCase();
    const lowerQuery = findQuery.toLowerCase();
    while ((pos = lowerCode.indexOf(lowerQuery, pos)) !== -1) {
      matches.push(pos);
      pos += lowerQuery.length;
    }
    return matches;
  }, [code, findQuery]);

  const [activeMatchIndex, setActiveMatchIndex] = useState(0);

  const jumpToMatch = (index: number) => {
    if (!textareaRef.current || findMatches.length === 0) return;
    const normalizedIndex = (index + findMatches.length) % findMatches.length;
    setActiveMatchIndex(normalizedIndex);
    const start = findMatches[normalizedIndex];
    const end = start + findQuery.length;
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(start, end);
    updateCursor();
  };

  const handleNextMatch = () => jumpToMatch(activeMatchIndex + 1);
  const handlePrevMatch = () => jumpToMatch(activeMatchIndex - 1);

  const handleReplaceOne = () => {
    if (findMatches.length === 0 || !textareaRef.current) return;
    const start = findMatches[activeMatchIndex] || 0;
    const nextVal = code.substring(0, start) + replaceQuery + code.substring(start + findQuery.length);
    onChange(nextVal);
    requestAnimationFrame(() => {
      jumpToMatch(activeMatchIndex);
    });
  };

  const handleReplaceAll = () => {
    if (!findQuery) return;
    const regex = new RegExp(findQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    const nextVal = code.replace(regex, replaceQuery);
    onChange(nextVal);
  };

  return (
    <div
      className="flex-1 flex overflow-hidden relative select-none"
      style={{
        backgroundColor: themeColors.bg,
        color: themeColors.text,
      }}
    >
      {/* ── Line Numbers Gutter ── */}
      <div
        ref={gutterRef}
        className="w-12 sm:w-14 select-none py-3 pr-3 text-right font-mono overflow-hidden flex-shrink-0 border-r border-[#2D2D2D]/60"
        style={{
          backgroundColor: themeColors.gutterBg,
          color: themeColors.gutterText,
          fontSize: `${fontSize}px`,
          lineHeight: "24px",
        }}
      >
        {Array.from({ length: lineCount }).map((_, idx) => {
          const isCurrent = idx + 1 === cursorLine;
          return (
            <div
              key={idx}
              style={{
                color: isCurrent ? themeColors.activeLineGutter : themeColors.gutterText,
                fontWeight: isCurrent ? 700 : 400,
                height: "24px",
              }}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>

      {/* ── Editor Canvas: Underlaid Highlighted Code + Overlaid Textarea ── */}
      <div className="flex-1 relative overflow-hidden">
        {/* Floating Find & Replace Bar */}
        {findBarOpen && (
          <div className="absolute top-2 right-4 z-30 bg-[#252526] border border-[#454545] rounded-lg shadow-2xl p-2 flex flex-col gap-1.5 text-xs font-sans text-white w-72 sm:w-80 animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center gap-1.5">
              <Search size={14} className="text-[#858585] shrink-0" />
              <input
                type="text"
                value={findQuery}
                onChange={(e) => {
                  setFindQuery(e.target.value);
                  setActiveMatchIndex(0);
                }}
                placeholder="Find in file..."
                className="flex-1 bg-[#1E1E1E] border border-[#3C3C3C] rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#007ACC]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (e.shiftKey) handlePrevMatch();
                    else handleNextMatch();
                  }
                }}
              />
              <span className="text-[10px] text-[#858585] whitespace-nowrap px-1">
                {findMatches.length > 0
                  ? `${activeMatchIndex + 1} of ${findMatches.length}`
                  : findQuery
                  ? "No results"
                  : ""}
              </span>
              <button
                onClick={handlePrevMatch}
                disabled={findMatches.length === 0}
                className="p-1 hover:bg-[#3C3C3C] rounded disabled:opacity-30 cursor-pointer"
                title="Previous Match (Shift+Enter)"
              >
                <ChevronUp size={13} />
              </button>
              <button
                onClick={handleNextMatch}
                disabled={findMatches.length === 0}
                className="p-1 hover:bg-[#3C3C3C] rounded disabled:opacity-30 cursor-pointer"
                title="Next Match (Enter)"
              >
                <ChevronDown size={13} />
              </button>
              <button
                onClick={() => setShowReplaceInput(!showReplaceInput)}
                className={`p-1 rounded cursor-pointer transition-colors ${
                  showReplaceInput ? "bg-[#007ACC] text-white" : "hover:bg-[#3C3C3C] text-[#858585]"
                }`}
                title="Toggle Replace Mode"
              >
                <Replace size={13} />
              </button>
              <button
                onClick={() => onToggleFindBar?.(false)}
                className="p-1 hover:bg-[#3C3C3C] rounded cursor-pointer text-[#858585] hover:text-white"
                title="Close Find Bar (Esc)"
              >
                <X size={13} />
              </button>
            </div>

            {showReplaceInput && (
              <div className="flex items-center gap-1.5 pt-1 border-t border-[#3C3C3C]">
                <input
                  type="text"
                  value={replaceQuery}
                  onChange={(e) => setReplaceQuery(e.target.value)}
                  placeholder="Replace with..."
                  className="flex-1 bg-[#1E1E1E] border border-[#3C3C3C] rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#007ACC]"
                />
                <button
                  onClick={handleReplaceOne}
                  disabled={findMatches.length === 0}
                  className="px-2 py-1 rounded bg-[#3C3C3C] hover:bg-[#007ACC] text-[11px] disabled:opacity-30 cursor-pointer"
                  title="Replace Next"
                >
                  Replace
                </button>
                <button
                  onClick={handleReplaceAll}
                  disabled={findMatches.length === 0}
                  className="px-2 py-1 rounded bg-[#3C3C3C] hover:bg-[#007ACC] text-[11px] disabled:opacity-30 cursor-pointer flex items-center gap-1"
                  title="Replace All"
                >
                  <ReplaceAll size={11} />
                  <span>All</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Underlaid Preformatted Syntax Highlight Layer ── */}
        <pre
          ref={preRef}
          aria-hidden="true"
          className="absolute inset-0 m-0 p-3 pointer-events-none font-mono whitespace-pre-wrap break-all overflow-hidden"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: "24px",
            tabSize: 2,
            boxSizing: "border-box",
          }}
        >
          {tokens.map((token, idx) => {
            const color = (themeColors as any)[token.type] || themeColors.text;
            return (
              <span key={idx} style={{ color }}>
                {token.text}
              </span>
            );
          })}
        </pre>

        {/* ── Overlaid Transparent Textarea ── */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={updateCursor}
          onClick={updateCursor}
          onScroll={handleScroll}
          readOnly={readOnly}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label="Code Editor"
          className="relative w-full h-full p-3 font-mono whitespace-pre-wrap break-all resize-none bg-transparent caret-white focus:outline-none overflow-y-auto z-10"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: "24px",
            color: "transparent",
            caretColor: themeColors.text,
            tabSize: 2,
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
}
