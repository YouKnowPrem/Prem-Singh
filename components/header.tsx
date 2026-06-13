"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useCaseFile } from "@/context/case-file-context";
import { useTheme } from "@/context/theme-context";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";

export const navLinks = [
  { name: "Home", hash: "#home" },
  { name: "Case Files", hash: "#cases" },
  { name: "Experiment Lab", hash: "#lab" },
  { name: "Briefing", hash: "#briefing" },
  { name: "Articles", hash: "#articles" },
  { name: "Timeline", hash: "#timeline" },
  { name: "Contact", hash: "#contact" },
] as const;

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { investigationProgress } = useCaseFile();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="z-[999] relative">
      {/* Case File Header Banner */}
      <motion.div
        className="fixed top-0 left-0 w-full h-[5rem] bg-[#eddcb9] dark:bg-[#28211a] border-b border-[#cbd2c0] dark:border-[#3a2f26] shadow-md z-[990]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Progress Meter HUD bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-amber-600 transition-all duration-500" style={{ width: `${investigationProgress}%` }} />
        <div className="absolute bottom-1.5 left-4 text-[9px] font-mono uppercase tracking-widest text-[#7c6344] dark:text-[#a0896d] font-bold">
          CASE DOSSIER PROGRESS: {investigationProgress}% READ
        </div>
      </motion.div>

      {/* Desktop Theme Switcher */}
      <div className="fixed z-[1000] hidden md:flex items-center top-4 right-6">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full border bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27] dark:bg-[#3e342a] dark:border-[#4d4033] dark:text-[#a0896d] hover:bg-[#decfa7] dark:hover:bg-[#4d4033] transition-all hover:scale-110 active:scale-95 shadow-sm"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Theme Switcher */}
      <div className="fixed top-4 left-4 z-[1000] md:hidden">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full border bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27] dark:bg-[#3e342a] dark:border-[#4d4033] dark:text-[#a0896d] shadow-md active:scale-95 transition-all"
        >
          {theme === "light" ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Button - Folder Index Tab */}
      <motion.button
        className="fixed top-4 right-4 z-[1000] sm:hidden flex items-center gap-1.5 px-3 py-2 text-[10px] font-mono font-bold uppercase rounded-md border bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27] dark:bg-[#3e342a] dark:border-[#4d4033] dark:text-[#a0896d] shadow-md hover:bg-[#decfa7] active:scale-95 transition-all"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {isMobileMenuOpen ? (
          <>
            <HiX className="w-3.5 h-3.5 text-red-600" />
            <span>CLOSE</span>
          </>
        ) : (
          <>
            <HiMenu className="w-3.5 h-3.5 text-[#7c6344] dark:text-[#a0896d]" />
            <span>INDEX</span>
          </>
        )}
      </motion.button>

      {/* Centered Desktop Navigation */}
      <nav className="hidden sm:flex fixed z-[995] top-[0.5rem] left-1/2 -translate-x-1/2 h-[4.5rem] py-0">
        <ul className="flex items-center gap-1.5 text-[0.8rem] font-bold font-mono text-[#5c4a34] dark:text-[#a59179] select-none">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <motion.li
                className="relative"
                key={link.hash}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {/* Folder Divider Tab styling for Case File Mode */}
                <Link
                  className={clsx(
                    "flex items-center px-4 py-2 text-[10px] uppercase tracking-wider rounded-t-lg border-t border-x transition-all duration-300 relative",
                    isActive
                      ? "bg-[#f5efe2] border-[#cbd2c0] text-[#dc2626] font-extrabold translate-y-[9px] z-10 dark:bg-[#1b1714] dark:border-[#3a2f26]"
                      : "bg-[#decfa7] border-[#bcae91] text-[#7c6344] hover:bg-[#e6d8b3] dark:bg-[#3e342a] dark:border-[#4d4033] dark:text-[#a0896d] translate-y-[7px] hover:translate-y-[8px]"
                  )}
                  href={link.hash}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  📂 {link.name}

                  {/* Metal Paper Clip sliding animation */}
                  {isActive && (
                    <motion.svg
                      layoutId="activeTabClip"
                      className="absolute -top-2 left-2 w-3.5 h-6 text-zinc-500 dark:text-zinc-400 drop-shadow-md z-30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </motion.svg>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[998] sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Box */}
            <motion.nav
              className="absolute top-20 right-4 w-56 rounded-xl shadow-2xl p-4 border bg-[#fbf9f3] dark:bg-[#1e1b19] border-[#c0b090] dark:border-[#4d4033] text-[#1c1917] dark:text-[#ebdcd0] font-mono z-[1001]"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="text-[9px] text-zinc-400 font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-3 uppercase tracking-wider">
                DOSSIER INDEX
              </div>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.name;
                  return (
                    <li key={link.hash}>
                      <Link
                        className={clsx(
                          "block px-3 py-2 text-xs font-bold rounded transition-all",
                          isActive
                            ? "bg-[#ebdcb9] text-[#dc2626] dark:bg-[#3e342a] dark:text-red-400 border border-[#c0b090] dark:border-[#4d4033]"
                            : "text-[#7c6344] hover:bg-[#ebdcb9]/40 dark:text-[#a0896d] dark:hover:bg-[#3e342a]/40"
                        )}
                        href={link.hash}
                        onClick={() => {
                          setActiveSection(link.name);
                          setTimeOfLastClick(Date.now());
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        📂 {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
