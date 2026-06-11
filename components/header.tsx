"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useCaseFile } from "@/context/case-file-context";
import { useTheme } from "@/context/theme-context";
import { HiMenu, HiX } from "react-icons/hi";
import { FiFolder, FiFolderMinus, FiSun, FiMoon } from "react-icons/fi";

export const navLinks = [
  { name: "Home", hash: "#home" },
  { name: "Case Files", hash: "#cases" },
  { name: "Experiment Lab", hash: "#lab" },
  { name: "Articles", hash: "#articles" },
  { name: "Timeline", hash: "#timeline" },
  { name: "Contact", hash: "#contact" },
] as const;

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { caseFileMode, toggleCaseFileMode, investigationProgress } = useCaseFile();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="z-[999] relative">
      {/* Desktop Header */}
      {!caseFileMode ? (
        // Standard Mode Header: Sleek glassmorphic floating menu
        <motion.div
          className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[46rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        />
      ) : (
        // Case File Mode Header: Manila folder divider top border
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
      )}

      {/* Desktop Mode Toggle Switches (positioned top right) */}
      <div className={clsx(
        "fixed z-[1000] hidden md:flex items-center gap-4",
        caseFileMode ? "top-4 right-6" : "top-[1.65rem] right-12"
      )}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={clsx(
            "p-2 rounded-full border transition-all hover:scale-110 active:scale-95",
            caseFileMode
              ? "bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27]"
              : "bg-white/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 backdrop-blur-sm"
          )}
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
        </button>

        {/* Case File Mode Toggle Button */}
        <button
          onClick={toggleCaseFileMode}
          className={clsx(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase transition-all hover:scale-105 active:scale-95",
            caseFileMode
              ? "bg-[#dc2626] border-[#b91c1c] text-white"
              : "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border-transparent"
          )}
        >
          {caseFileMode ? (
            <>
              <FiFolderMinus className="w-3.5 h-3.5" />
              <span>Standard Mode</span>
            </>
          ) : (
            <>
              <FiFolder className="w-3.5 h-3.5" />
              <span>Case File Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Mode Controls */}
      <div className="fixed top-4 left-4 z-[1000] md:hidden flex gap-2">
        <button
          onClick={toggleTheme}
          className={clsx(
            "p-2 rounded-full border",
            caseFileMode ? "bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27]" : "bg-white/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-850 backdrop-blur-sm"
          )}
        >
          {theme === "light" ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleCaseFileMode}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono font-bold uppercase",
            caseFileMode ? "bg-red-600 border-red-700 text-white" : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent"
          )}
        >
          {caseFileMode ? "Standard" : "Case File"}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        className={clsx(
          "fixed top-4 right-4 z-[1000] sm:hidden p-2 rounded-full shadow-lg border backdrop-blur-sm transition-all",
          caseFileMode
            ? "bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27]"
            : "bg-white bg-opacity-80 border-zinc-200 dark:bg-gray-950 dark:border-zinc-800 dark:bg-opacity-75"
        )}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {isMobileMenuOpen ? (
          <HiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <HiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </motion.button>

      {/* Desktop Navigation */}
      <nav className={clsx(
        "hidden sm:flex fixed z-[995]",
        caseFileMode
          ? "top-1 left-[15%] h-[4.5rem] py-0"
          : "top-[0.15rem] left-1/2 -translate-x-1/2 h-12 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0"
      )}>
        <ul className={clsx(
          "flex items-center",
          caseFileMode
            ? "gap-1 text-[0.8rem] font-bold font-mono text-[#5c4a34] dark:text-[#a59179] select-none"
            : "gap-5 text-[0.9rem] font-medium text-gray-500"
        )}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <motion.li
                className="relative"
                key={link.hash}
                initial={caseFileMode ? false : { y: -100, opacity: 0 }}
                animate={caseFileMode ? { y: 0 } : { y: 0, opacity: 1 }}
              >
                {caseFileMode ? (
                  // Folder Divider Tab styling for Case File Mode
                  <Link
                    className={clsx(
                      "flex items-center px-4 py-2 text-[10px] uppercase tracking-wider rounded-t-lg border-t border-x transition-all duration-300",
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
                  </Link>
                ) : (
                  // Sleek glass pill tab for Standard Mode
                  <Link
                    className={clsx(
                      "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-400 dark:hover:text-gray-200",
                      isActive && "text-gray-950 dark:text-gray-200 font-semibold"
                    )}
                    href={link.hash}
                    onClick={() => {
                      setActiveSection(link.name);
                      setTimeOfLastClick(Date.now());
                    }}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-zinc-800"
                        layoutId="activeSection"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                )}
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
              className={clsx(
                "absolute top-20 right-4 rounded-2xl shadow-2xl p-6 border",
                caseFileMode
                  ? "bg-[#f5efe2] border-[#c0b090] text-[#1c1917] font-mono"
                  : "bg-white bg-opacity-95 dark:bg-zinc-950 dark:bg-opacity-95 border-zinc-200 dark:border-zinc-800"
              )}
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ul className="flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.name;
                  return (
                    <motion.li
                      key={link.hash}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        className={clsx(
                          "block px-4 py-2.5 text-base font-semibold rounded-lg transition-all",
                          isActive
                            ? caseFileMode
                              ? "bg-[#ebdcb9] text-[#dc2626]"
                              : "bg-gray-150 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100"
                            : caseFileMode
                            ? "text-[#7c6344] hover:bg-[#ebdcb9]"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        )}
                        href={link.hash}
                        onClick={() => {
                          setActiveSection(link.name);
                          setTimeOfLastClick(Date.now());
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {caseFileMode ? `📂 ${link.name}` : link.name}
                      </Link>
                    </motion.li>
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
