"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  explanation?: string;
}

export default function CodeBlock({
  code,
  language = "typescript",
  title,
  explanation,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#070514] shadow-2xl">
      {/* Code Window Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B0820] border-b border-white/10 select-none">
        <div className="flex items-center gap-2.5">
          {/* Mac-style traffic lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-2 ml-2">
            <Terminal size={14} className="text-cyan-400" />
            <span className="text-xs font-mono font-medium text-gray-300 truncate max-w-[220px] sm:max-w-md">
              {title || `${language.toUpperCase()} Snippet`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10 uppercase">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-all cursor-pointer active:scale-95"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} className="text-gray-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-gray-200">
        <pre className="flex">
          {/* Line Numbers Column */}
          <div className="select-none pr-4 text-right text-gray-600 border-r border-white/10 mr-4 font-mono text-xs">
            {lines.map((_, idx) => (
              <div key={idx} className="leading-6">
                {idx + 1}
              </div>
            ))}
          </div>

          {/* Code Text Column */}
          <code className="flex-1 whitespace-pre">
            {lines.map((line, idx) => {
              // Basic syntax highlighting color cues
              const isComment = line.trim().startsWith("//") || line.trim().startsWith("#") || line.trim().startsWith("/*");
              const isKeyword = line.includes("import ") || line.includes("export ") || line.includes("const ") || line.includes("function ") || line.includes("return ");
              
              return (
                <div key={idx} className={`leading-6 ${isComment ? "text-emerald-400/80 italic" : isKeyword ? "text-cyan-300" : "text-gray-200"}`}>
                  {line || " "}
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Optional Explanation Footer */}
      {explanation && (
        <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/5 text-xs text-gray-400 font-sans flex items-start gap-2">
          <span className="text-amber-400 font-bold font-mono">Note:</span>
          <span>{explanation}</span>
        </div>
      )}
    </div>
  );
}
