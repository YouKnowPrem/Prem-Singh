"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

type Achievement = {
  id: string;
  title: string;
  description: string;
};

export const ACHIEVEMENTS: Record<string, Achievement> = {
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
  const [caseFileMode, setCaseFileMode] = useState<boolean>(true);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [visitedSections, setVisitedSections] = useState<string[]>(["Home"]);
  const [clickedRedactedText, setClickedRedactedText] = useState<boolean>(false);
  const [viewedProjects, setViewedProjects] = useState<string[]>([]);
  const [terminalUsed, setTerminalUsed] = useState<boolean>(false);
  const [verdictReached, setVerdictReached] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    // Unconditionally add case-file class
    document.documentElement.classList.add("case-file");

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
    // Standard mode is removed, caseFileMode remains always active
  };

  const unlockAchievement = (id: string) => {
    setUnlockedAchievements((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      window.localStorage.setItem("achievements", JSON.stringify(next));

      // Display customized Awwwards/Retro Case File style notification
      const ach = ACHIEVEMENTS[id];
      if (ach) {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-[#fdfcf7] dark:bg-[#1e1b19] border-2 border-[#cbd2c0] dark:border-[#3a2f26] shadow-2xl rounded-lg pointer-events-auto flex overflow-hidden font-mono text-xs`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5 text-lg">
                    📁
                  </div>
                  <div className="ml-3 flex-1">
                    <span className="case-stamp case-stamp-red text-[8px] py-0.5 px-1.5 mb-1 scale-90 -translate-x-1.5 inline-block font-bold">
                      EVIDENCE LOGGED
                    </span>
                    <p className="text-sm font-black text-zinc-950 dark:text-white mt-1 uppercase">
                      {ach.title}
                    </p>
                    <p className="mt-1 text-xs text-[#7c6344] dark:text-[#a0896d]">
                      {ach.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-[#cbd2c0] dark:border-[#3a2f26]">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full px-4 flex items-center justify-center font-bold text-red-650 hover:bg-[#ebdcb9]/40 dark:hover:bg-[#3e342a]/40 uppercase tracking-widest text-[9px] focus:outline-none"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ),
          { duration: 5000 }
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
  // Visiting sections (up to 7 sections): 28% (4% each)
  // Clicked redacted text in bio: 22%
  // Viewed all 4 projects: 20% (5% each)
  // Opened/used terminal: 15%
  // Reached verdict: 15%
  const sectionsCount = Math.min(visitedSections.length, 7); // max 7
  const redactedFactor = clickedRedactedText ? 22 : 0;
  const projectsFactor = Math.min(viewedProjects.length, 4) * 5; // max 20
  const terminalFactor = terminalUsed ? 15 : 0;
  const verdictFactor = verdictReached ? 15 : 0;

  const investigationProgress = Math.min(
    sectionsCount * 4 + redactedFactor + projectsFactor + terminalFactor + verdictFactor,
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
