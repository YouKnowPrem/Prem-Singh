"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCaseFile } from "@/context/case-file-context";
import { FiTerminal, FiX, FiCornerDownLeft, FiMaximize2, FiMinimize2 } from "react-icons/fi";

type HistoryItem = {
  type: "input" | "output" | "error";
  text: string;
};

export default function TerminalWidget() {
  const { terminalOpen, setTerminalOpen, markTerminalUsed } = useCaseFile();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: "SYSTEM INITIALIZED: PREM SINGH ARCHIVE [v2.0]" },
    { type: "output", text: "TYPE 'help' TO VIEW LIST OF COMMANDS." },
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input when terminal opens
  useEffect(() => {
    if (terminalOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [terminalOpen, isMinimized]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Log the input command
    const newHistory = [...history, { type: "input" as const, text: `inspector@premsingh:~$ ${cmd}` }];
    markTerminalUsed(); // Triggers the System Override achievement!

    switch (trimmed) {
      case "help":
        newHistory.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  whoami    - Personal details and identity breakdown.
  projects  - List all Case Files under investigation.
  articles  - Browse recently logged Knowledge Garden briefs.
  law       - Legal disciplines and policy research domains.
  skills    - Capabilities matrix (tech + law).
  contact   - Subpoena/deposition request channels.
  clear     - Wipe console history.
  exit      - Close terminal widget.`,
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          text: `SUBJECT DOSSIER: PREM SINGH
---------------------------------
PRIMARY: Law Student (B.A. LL.B Hons.) @ University of Jammu
SECONDARY: Web Developer & Creative Thinker
CORE BELIEF: Building things beyond the academic syllabus.
TRAITS: Relentlessly curious, analytical, experimental.`,
        });
        break;

      case "projects":
      case "cases":
        newHistory.push({
          type: "output",
          text: `FEATURED CASES:
  CASE #001: Historic Cities Jammu 2025 -> Official Tourism Portal [Delivered]
  CASE #002: Focus V1                  -> Flutter Productivity Timer [Active]
  CASE #003: Portfolio V2              -> Creative Personal Operating System [Open]
  CASE #004: Parinda                   -> Minimalist Typography Portal [Closed]`,
        });
        break;

      case "articles":
        newHistory.push({
          type: "output",
          text: `RECENT RECORDED BRIEFS:
  - "The Code is the Law? Smart Contracts and Jurisprudence" [Law]
  - "Digital Governance: Data Protection Laws in the Age of LLMs" [Research]
  - "Building a Custom IDE from Scratch in Jammu" [Development]`,
        });
        break;

      case "law":
        newHistory.push({
          type: "output",
          text: `LEGAL STUDY AND INTERESTS:
  - Technology Law & Digital Governance
  - Intellectual Property Rights in Software
  - Cyber Security Regulations
  - Human-Centered Design in Legal Operations`,
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          text: `CAPABILITIES PROFILE:
  [FRONTEND] Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion
  [CLOUD/DEV] Node.js, GCP, git, WordPress Architecture
  [LEGAL] Statutory Interpretation, Legal Research, Policy Formulation
  [STRATEGY] Problem Solving, Critical Thinking, Interdisciplinary Coordination`,
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          text: `COMMUNICATION CHANNELS:
  EMAIL: youknowprem@gmail.com
  LINKEDIN: linkedin.com/in/the-prem-singh
  GITHUB: github.com/youknowprem`,
        });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
        setTerminalOpen(false);
        break;

      default:
        newHistory.push({
          type: "error",
          text: `bash: command not found: ${trimmed}. Type 'help' for support.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <>
      {/* Floating Action Button to toggle Terminal */}
      <div className="fixed bottom-6 left-6 z-[990]">
        <button
          onClick={() => {
            setTerminalOpen(!terminalOpen);
            setIsMinimized(false);
          }}
          className={`p-3 rounded-full border shadow-lg transition-all duration-300 relative ${
            terminalOpen
              ? "bg-emerald-500 border-emerald-400 text-white animate-pulse"
              : "bg-zinc-950 border-zinc-800 text-emerald-500 hover:bg-zinc-900 hover:border-emerald-600 active:scale-95"
          }`}
          title="Toggle Command Terminal"
        >
          <FiTerminal className="w-5 h-5" />
          {terminalOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white dark:border-zinc-950"></span>
            </span>
          )}
        </button>
      </div>

      {/* Terminal Dialog overlay */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            className={`fixed z-[9995] bottom-20 left-6 w-[90vw] max-w-[550px] overflow-hidden rounded-xl crt-terminal border border-zinc-800 shadow-2xl transition-all duration-300 ${
              isMinimized ? "h-11" : "h-[360px]"
            }`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 select-none">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="ml-2 text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-bold">
                  inspector@premsingh: ~
                </span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:text-white transition"
                  title={isMinimized ? "Maximize Window" : "Minimize Window"}
                >
                  {isMinimized ? <FiMaximize2 className="w-3.5 h-3.5" /> : <FiMinimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="hover:text-red-500 transition"
                  title="Close Terminal"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Console Content (Hidden if minimized) */}
            {!isMinimized && (
              <div
                className="h-[calc(100%-2.75rem)] flex flex-col p-4 font-mono text-xs text-emerald-500 overflow-y-auto cursor-text select-text"
                onClick={() => inputRef.current?.focus()}
              >
                {/* Console Logs */}
                <div className="flex-1 space-y-1.5 crt-glow">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className={
                        item.type === "input"
                          ? "text-zinc-300"
                          : item.type === "error"
                          ? "text-red-400 italic"
                          : "text-emerald-400 whitespace-pre-line leading-relaxed"
                      }
                    >
                      {item.text}
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Input Prompt Box */}
                <div className="flex items-center mt-3 pt-2 border-t border-zinc-900">
                  <span className="text-zinc-300 mr-2 shrink-0 select-none">inspector@premsingh:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 bg-transparent border-none outline-none text-emerald-400 focus:ring-0 p-0 caret-transparent font-mono text-xs"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  {/* Customized blink cursor */}
                  <span className="w-1.5 h-3.5 bg-emerald-500 animate-pulse shrink-0 ml-0.5 mr-3 select-none"></span>
                  <FiCornerDownLeft className="w-3 h-3 text-zinc-600 shrink-0 select-none" />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
