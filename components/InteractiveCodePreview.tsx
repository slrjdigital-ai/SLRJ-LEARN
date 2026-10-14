"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Copy, Check, Sparkles, Terminal, Code2 } from "lucide-react";

const INITIAL_HTML = `<div class="card">
  <div class="badge">LIVE DEMO</div>
  <h2>Interactive Web App</h2>
  <p>Edit HTML, CSS, or JS and press Run!</p>
  <button id="counter-btn" class="btn">
    Clicked: <span id="count">0</span> times
  </button>
</div>`;

const INITIAL_CSS = `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #030712;
  font-family: system-ui, -apple-system, sans-serif;
  color: #fff;
}
.card {
  background: #0d1527;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 1.75rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  max-width: 280px;
}
.badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  background: rgba(6, 182, 212, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 9999px;
  margin-bottom: 0.75rem;
}
h2 {
  font-size: 1.15rem;
  margin: 0 0 0.5rem 0;
  color: #fff;
}
p {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 1.25rem;
}
.btn {
  background: linear-gradient(135deg, #06b6d4, #10b981);
  color: #000;
  border: none;
  padding: 8px 16px;
  font-weight: 700;
  font-size: 0.85rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.btn:hover {
  transform: scale(1.05);
}`;

const INITIAL_JS = `let count = 0;
const btn = document.getElementById('counter-btn');
const countSpan = document.getElementById('count');

btn.addEventListener('click', () => {
  count++;
  countSpan.textContent = count;
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => btn.style.transform = 'scale(1)', 100);
});`;

export default function InteractiveCodePreview() {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [htmlCode, setHtmlCode] = useState(INITIAL_HTML);
  const [cssCode, setCssCode] = useState(INITIAL_CSS);
  const [jsCode, setJsCode] = useState(INITIAL_JS);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = () => {
    setIsRunning(true);
    if (!iframeRef.current) return;

    const combinedDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `;

    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(combinedDoc);
      doc.close();
    }
    setTimeout(() => setIsRunning(false), 300);
  };

  useEffect(() => {
    updatePreview();
  }, []);

  const handleReset = () => {
    setHtmlCode(INITIAL_HTML);
    setCssCode(INITIAL_CSS);
    setJsCode(INITIAL_JS);
    setTimeout(() => {
      updatePreview();
    }, 50);
  };

  const handleCopy = () => {
    const currentCode =
      activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : jsCode;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A] border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all">
      {/* ── Editor Top Window Controls ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#050814] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-300 hidden sm:inline flex items-center gap-1.5">
            <Code2 size={13} className="text-cyan-400" />
            <span>Interactive Code Playground</span>
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab("html")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "html" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            index.html
          </button>
          <button
            onClick={() => setActiveTab("css")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "css" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            style.css
          </button>
          <button
            onClick={() => setActiveTab("js")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "js" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            app.js
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Reset code"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={updatePreview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold text-xs shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Play size={12} fill="currentColor" />
            <span>{isRunning ? "Running..." : "Run"}</span>
          </button>
        </div>
      </div>

      {/* ── Split Layout: Code Area (Left) & Live Preview (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 min-h-[300px]">
        {/* Code Input */}
        <div className="relative bg-[#070B18] p-3 flex flex-col font-mono text-xs">
          <textarea
            value={activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : jsCode}
            onChange={(e) => {
              if (activeTab === "html") setHtmlCode(e.target.value);
              else if (activeTab === "css") setCssCode(e.target.value);
              else setJsCode(e.target.value);
            }}
            spellCheck={false}
            className="w-full h-56 sm:h-64 lg:h-72 bg-transparent text-slate-200 resize-none focus:outline-none leading-relaxed font-mono selection:bg-cyan-500/30"
          />
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
            <span>Editable in real time</span>
            <span>Press Run to re-render</span>
          </div>
        </div>

        {/* Live Output Iframe */}
        <div className="relative bg-black flex flex-col min-h-[200px]">
          <div className="px-3 py-1.5 bg-[#050814] border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal size={12} className="text-emerald-400" />
              <span>Live Render Output</span>
            </span>
            <span className="text-emerald-400 font-bold text-[10px]">Active</span>
          </div>
          <iframe
            ref={iframeRef}
            title="Live Code Preview"
            sandbox="allow-scripts"
            className="w-full h-full min-h-[220px] lg:min-h-[270px] border-none bg-[#030712]"
          />
        </div>
      </div>
    </div>
  );
}
