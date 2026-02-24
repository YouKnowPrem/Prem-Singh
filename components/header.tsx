"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
    const { activeSection, setActiveSection, setTimeOfLastClick} =
      useActiveSectionContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    return (
      <header className="z-[999] relative">
        {/* Desktop Header */}
        <motion.div
          className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[42rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
        ></motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="fixed top-4 right-4 z-[1000] sm:hidden p-2 bg-white bg-opacity-80 backdrop-blur-[0.5rem] rounded-full shadow-lg dark:bg-gray-950 dark:bg-opacity-75"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isMobileMenuOpen ? (
            <HiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <HiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
          <ul className="flex w-[initial] flex-nowrap items-center justify-center gap-5 text-[0.9rem] font-medium text-gray-500">
            {links.map((link) => (
              <motion.li
                className="h-3/4 flex items-center justify-center relative"
                key={link.hash}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  className={clsx(
                    "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
                    {
                      "text-gray-950 dark:text-gray-300":
                        activeSection === link.name,
                    }
                  )}
                  href={link.hash}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {link.name}
  
                  {link.name === activeSection && (
                    <motion.span
                      className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              </motion.li>
            ))}
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
              
              {/* Menu */}
              <motion.nav
                className="absolute top-20 right-4 bg-white bg-opacity-95 backdrop-blur-[0.5rem] rounded-2xl shadow-2xl p-6 dark:bg-gray-950 dark:bg-opacity-95"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <ul className="flex flex-col gap-4">
                  {links.map((link, index) => (
                    <motion.li
                      key={link.hash}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        className={clsx(
                          "block px-4 py-3 text-lg font-medium rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                          {
                            "text-gray-950 bg-gray-100 dark:text-gray-300 dark:bg-gray-800":
                              activeSection === link.name,
                            "text-gray-600 dark:text-gray-400":
                              activeSection !== link.name,
                          }
                        )}
                        href={link.hash}
                        onClick={() => {
                          setActiveSection(link.name);
                          setTimeOfLastClick(Date.now());
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
}
