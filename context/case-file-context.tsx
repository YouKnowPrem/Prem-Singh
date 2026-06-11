"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

type Achievement = {
  id: string;
  title: string;
  description: string;
};

export const ACHIEVEMENTS: Record<string, Achievement> = {
  "case-opened": {
    id: "case-opened",
    title: "Case Opened",
    description: "Switched to Case File Mode for the first time.",
  },
  "dossier-unlocked": {
    id: "dossier-unlocked",
    title: "Document Declassified",
    description: "Clicked and revealed the redacted text in bio.",
  },
  "evidence-collected": {
    id: "evidence-collected",
    title: "Evidence Collector",
    description: "Investigated all featured case files.",
  },
  "terminal-hacker": {
    id: "terminal-hacker",
    title: "System Override",
    description: "Used the retro CLI terminal console.",
  },
  "verdict-reached": {
    id: "verdict-reached",
    title: "Verdict Delivered",
    description: "Reviewed the court's final verdict on the subject.",
  },
};

type CaseFileContextType = {
  caseFileMode: boolean;
  toggleCaseFileMode: () => void;
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  investigationProgress: number;
  visitedSections: string[];
  markSectionVisited: (section: string) => void;
  clickedRedactedText: boolean;
  setClickedRedactedText: (clicked: boolean) => void;
  viewedProjects: string[];
  markProjectViewed: (id: string) => void;
  terminalUsed: boolean;
  markTerminalUsed: () => void;
  verdictReached: boolean;
  markVerdictReached: () => void;
};

const CaseFileContext = createContext<CaseFileContextType | null>(null);

export default function CaseFileContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [caseFileMode, setCaseFileMode] = useState<boolean>(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [visitedSections, setVisitedSections] = useState<string[]>(["Home"]);
  const [clickedRedactedText, setClickedRedactedText] = useState<boolean>(false);
  const [viewedProjects, setViewedProjects] = useState<string[]>([]);
  const [terminalUsed, setTerminalUsed] = useState<boolean>(false);
  const [verdictReached, setVerdictReached] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const localMode = window.localStorage.getItem("caseFileMode");
    if (localMode === "true") {
      setCaseFileMode(true);
      document.documentElement.classList.add("case-file");
    }

    const localAchievements = window.localStorage.getItem("achievements");
    if (localAchievements) {
      setUnlockedAchievements(JSON.parse(localAchievements));
    }

    const localProjects = window.localStorage.getItem("viewedProjects");
    if (localProjects) {
      setViewedProjects(JSON.parse(localProjects));
    }

    const localRedacted = window.localStorage.getItem("clickedRedactedText");
    if (localRedacted === "true") {
      setClickedRedactedText(true);
    }

    const localTerminalUsed = window.localStorage.getItem("terminalUsed");
    if (localTerminalUsed === "true") {
      setTerminalUsed(true);
    }
  }, []);

  const toggleCaseFileMode = () => {
    setCaseFileMode((prev) => {
      const next = !prev;
      window.localStorage.setItem("caseFileMode", String(next));
      if (next) {
        document.documentElement.classList.add("case-file");
        unlockAchievement("case-opened");
      } else {
        document.documentElement.classList.remove("case-file");
      }
      return next;
    });
  };

  const unlockAchievement = (id: string) => {
    setUnlockedAchievements((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      window.localStorage.setItem("achievements", JSON.stringify(next));

      // Display customized Awwwards style notification
      const ach = ACHIEVEMENTS[id];
      if (ach) {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                      Case Evidence Logged
                    </p>
                    <p className="text-sm font-bold text-zinc-950 dark:text-white mt-0.5">
                      {ach.title}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      {ach.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-xs font-mono uppercase font-bold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white focus:outline-none"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ),
          { duration: 4000 }
        );
      }
      return next;
    });
  };

  const markSectionVisited = (section: string) => {
    setVisitedSections((prev) => {
      if (prev.includes(section)) return prev;
      return [...prev, section];
    });
  };

  const setClickedRedactedTextState = (clicked: boolean) => {
    setClickedRedactedText(clicked);
    window.localStorage.setItem("clickedRedactedText", String(clicked));
    if (clicked) {
      unlockAchievement("dossier-unlocked");
    }
  };

  const markProjectViewed = (id: string) => {
    setViewedProjects((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      window.localStorage.setItem("viewedProjects", JSON.stringify(next));
      if (next.length >= 4) {
        unlockAchievement("evidence-collected");
      }
      return next;
    });
  };

  const markTerminalUsed = () => {
    setTerminalUsed(true);
    window.localStorage.setItem("terminalUsed", "true");
    unlockAchievement("terminal-hacker");
  };

  const markVerdictReached = () => {
    setVerdictReached(true);
    unlockAchievement("verdict-reached");
  };

  // Calculate investigation progress dynamically out of 100
  // Visiting sections (up to 6 sections): 30% (5% each)
  // Switched to Case File Mode at least once: 10%
  // Clicked redacted text in bio: 20%
  // Viewed all 4 projects: 20% (5% each)
  // Opened/used terminal: 10%
  // Reached verdict: 10%
  const sectionsCount = visitedSections.length; // max 6
  const caseModeFactor = caseFileMode || unlockedAchievements.includes("case-opened") ? 10 : 0;
  const redactedFactor = clickedRedactedText ? 20 : 0;
  const projectsFactor = Math.min(viewedProjects.length, 4) * 5; // max 20
  const terminalFactor = terminalUsed ? 10 : 0;
  const verdictFactor = verdictReached ? 10 : 0;

  const investigationProgress = Math.min(
    sectionsCount * 5 + caseModeFactor + redactedFactor + projectsFactor + terminalFactor + verdictFactor,
    100
  );

  return (
    <CaseFileContext.Provider
      value={{
        caseFileMode,
        toggleCaseFileMode,
        unlockedAchievements,
        unlockAchievement,
        terminalOpen,
        setTerminalOpen,
        investigationProgress,
        visitedSections,
        markSectionVisited,
        clickedRedactedText,
        setClickedRedactedText: setClickedRedactedTextState,
        viewedProjects,
        markProjectViewed,
        terminalUsed,
        markTerminalUsed,
        verdictReached,
        markVerdictReached,
      }}
    >
      {children}
    </CaseFileContext.Provider>
  );
}

export function useCaseFile() {
  const context = useContext(CaseFileContext);
  if (context === null) {
    throw new Error("useCaseFile must be used within a CaseFileContextProvider");
  }
  return context;
}
