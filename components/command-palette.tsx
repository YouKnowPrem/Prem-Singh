"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCaseFile } from "@/context/case-file-context";
import { useTheme } from "@/context/theme-context";
import { useActiveSectionContext } from "@/context/active-section-context";
import { links } from "@/lib/data";
import { FiSearch, FiMonitor, FiMoon, FiSun, FiFolder, FiNavigation, FiInfo } from "react-icons/fi";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { caseFileMode, toggleCaseFileMode, setTerminalOpen } = useCaseFile();
  const { theme, toggleTheme } = useTheme();
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle palette open/close with Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
  }, [isOpen]);

  const items = [
    // Navigation items
    ...links.map((link) => ({
      id: `nav-${link.name.toLowerCase()}`,
      title: `Go to ${link.name}`,
      category: "Navigation",
      icon: <FiNavigation className="w-4 h-4" />,
      action: () => {
        const element = document.getElementById(link.name.toLowerCase());
        if (element) {
          setActiveSection(link.name);
          setTimeOfLastClick(Date.now());
          element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
      },
    })),
    // Actions
    {
      id: "action-case-mode",
      title: caseFileMode ? "Switch to Standard Mode" : "Switch to Case File Mode",
      category: "System Settings",
      icon: <FiFolder className="w-4 h-4" />,
      action: () => {
        toggleCaseFileMode();
        setIsOpen(false);
      },
    },
    {
      id: "action-theme",
      title: theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme",
      category: "System Settings",
      icon: theme === "light" ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />,
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
    },
    {
      id: "action-terminal",
      title: "Open Retro CRT Terminal",
      category: "Interactive Utilities",
      icon: <FiMonitor className="w-4 h-4" />,
      action: () => {
        setTerminalOpen(true);
        setIsOpen(false);
      },
    },
  ];

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle keyboard selections
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <>
      {/* Floating Shortcut Badge */}
      <div className="fixed bottom-6 right-6 z-[990] flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-lg border shadow-lg transition-all duration-300 ${
            caseFileMode
              ? "bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27] hover:bg-[#decfa7] active:scale-95"
              : "bg-white/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850 backdrop-blur-md"
          }`}
        >
          <FiSearch className="w-3.5 h-3.5" />
          <span>Menu</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-500 font-sans leading-none uppercase">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Backdrop & Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              ref={containerRef}
              className={`w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl border transition-all duration-300 ${
                caseFileMode
                  ? "bg-[#fcf9f2] border-[#c0b090] text-[#1c1917] font-mono"
                  : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
              }`}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", duration: 0.35 }}
            >
              {/* Search input header */}
              <div className={`flex items-center px-4 py-3.5 border-b ${
                caseFileMode ? "border-[#ecdab0]" : "border-zinc-200 dark:border-zinc-800"
              }`}>
                <FiSearch className={`w-5 h-5 mr-3 ${caseFileMode ? "text-[#8a7a60]" : "text-zinc-400 dark:text-zinc-500"}`} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={caseFileMode ? "SEARCH INVESTIGATION DOSSIER..." : "Search files, actions, and settings..."}
                  className="w-full bg-transparent border-none outline-none text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className={`px-1.5 py-0.5 text-[10px] rounded border uppercase font-mono ${
                    caseFileMode
                      ? "border-[#c0b090] text-[#8a7a60] hover:bg-[#ebdcb9]"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  esc
                </button>
              </div>

              {/* Items List */}
              <div className="max-h-[350px] overflow-y-auto p-2">
                {filteredItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-zinc-400 font-mono text-xs">
                    <FiInfo className="w-6 h-6 mb-2 opacity-50" />
                    <span>NO EVIDENCE FOUND MATCHING QUERY</span>
                  </div>
                ) : (
                  <div>
                    {/* Render Category Grouped items */}
                    {Array.from(new Set(filteredItems.map((i) => i.category))).map((category) => (
                      <div key={category} className="mb-2">
                        <div className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider ${
                          caseFileMode ? "text-[#8a7a60]" : "text-zinc-400 dark:text-zinc-500"
                        }`}>
                          {category}
                        </div>
                        <ul className="space-y-0.5">
                          {filteredItems
                            .filter((item) => item.category === category)
                            .map((item) => {
                              // Find absolute index in filtered array
                              const absoluteIndex = filteredItems.findIndex((i) => i.id === item.id);
                              const isSelected = absoluteIndex === selectedIndex;
                              return (
                                <li key={item.id}>
                                  <button
                                    onClick={item.action}
                                    onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-sm rounded-lg transition-colors font-medium ${
                                      isSelected
                                        ? caseFileMode
                                          ? "bg-[#ebdcb9] text-[#4f3e27]"
                                          : "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                                        : "bg-transparent text-zinc-600 dark:text-zinc-400"
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className={`${isSelected ? "text-zinc-900 dark:text-zinc-100" : "opacity-60"}`}>
                                        {item.icon}
                                      </span>
                                      <span>{item.title}</span>
                                    </div>
                                    {isSelected && (
                                      <span className="text-[10px] font-mono opacity-60 uppercase">
                                        Select ↵
                                      </span>
                                    )}
                                  </button>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
