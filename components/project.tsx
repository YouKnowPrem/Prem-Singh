"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";
import { useCaseFile } from "@/context/case-file-context";
import clsx from "clsx";

type ProjectProps = {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  category: string;
  status: string;
  verdict: string;
  tags: string[];
  imagePath: string;
  imageUrl: string;
  index: number;
};

export default function Project({
  id,
  caseNumber,
  title,
  description,
  category,
  status,
  verdict,
  tags,
  imagePath,
  imageUrl,
  index,
}: ProjectProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { caseFileMode, markProjectViewed, viewedProjects } = useCaseFile();
  const isViewed = viewedProjects.includes(id);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isViewed) {
      markProjectViewed(id);
    }
  };

  if (caseFileMode) {
    // --- CASE FILE MODE: Interactive Manila Folder Evidence Sheet ---
    return (
      <motion.div
        layout
        className={clsx(
          "w-full rounded-lg border text-left font-mono overflow-hidden transition-all duration-300 shadow-sm",
          isExpanded
            ? "bg-[#fdfcf7] dark:bg-[#1e1b19] border-[#c0b090] dark:border-[#4d4033]"
            : "bg-[#ebdcb9] hover:bg-[#ebd0ab] dark:bg-[#2d251e] dark:hover:bg-[#382d24] border-[#cbd2c0] dark:border-[#3a2f26]"
        )}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Folder Tab / Header */}
        <div
          onClick={handleExpand}
          className="flex items-center justify-between p-4 cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <span className={clsx(
              "text-xs font-bold px-2 py-0.5 rounded border uppercase tracking-wider",
              status === "Closed"
                ? "border-green-600/30 text-green-700 dark:text-green-400 bg-green-500/5"
                : "border-red-650/30 text-red-700 dark:text-red-400 bg-red-500/5 animate-pulse"
            )}>
              CASE #{caseNumber}
            </span>
            <h3 className="text-sm sm:text-base font-black uppercase text-zinc-950 dark:text-white truncate max-w-[200px] sm:max-w-md">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {isViewed && (
              <span className="text-[9px] text-green-700 dark:text-green-500 font-bold uppercase tracking-widest">
                ✓ EXAMINED
              </span>
            )}
            <span className="text-xs text-[#7c6344] dark:text-[#a0896d]">
              {isExpanded ? "[ CLOSE DOSSIER ]" : "[ EXAMINE FILE ]"}
            </span>
          </div>
        </div>

        {/* Expanded Folder Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="border-t border-[#cbd2c0] dark:border-[#3a2f26] bg-[#fbf9f3] dark:bg-[#181513] overflow-hidden"
            >
              <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                
                {/* Left Side: Polaroid Photo Evidence */}
                <div className="w-full md:w-2/5 shrink-0 flex flex-col items-center">
                  <div className="bg-white p-3 pb-6 border border-zinc-200 shadow-md rotate-[-2deg] max-w-[200px]">
                    <div className="relative w-40 h-28 bg-zinc-100 overflow-hidden border border-zinc-150">
                      <Image
                        src={imageUrl}
                        alt={`${title} Evidence`}
                        fill
                        className="object-cover grayscale"
                        sizes="160px"
                      />
                    </div>
                    <div className="text-center font-handwriting text-[#dc2626] text-xs mt-2 font-bold">
                      EXHIBIT A-{caseNumber}
                    </div>
                  </div>
                </div>

                {/* Right Side: Typewriter Case Logs */}
                <div className="flex-1 space-y-3 text-xs text-zinc-700 dark:text-zinc-400">
                  <div>
                    <span className="font-bold text-zinc-950 dark:text-white">CASE FILE:</span> PREM-SINGH-{caseNumber}
                  </div>
                  <div>
                    <span className="font-bold text-zinc-950 dark:text-white">CLASSIFICATION:</span> {category}
                  </div>
                  <div>
                    <span className="font-bold text-zinc-950 dark:text-white">INVESTIGATION STATUS:</span> {status === "Closed" ? "CLOSED / RESOLVED" : "ACTIVE / OPEN"}
                  </div>
                  <div>
                    <span className="font-bold text-zinc-950 dark:text-white">VERDICT DECISION:</span> {verdict}
                  </div>
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <span className="font-bold text-zinc-950 dark:text-white block mb-1">INCIDENT REPORT:</span>
                    <p className="leading-relaxed">{description}</p>
                  </div>
                  <div className="pt-2">
                    <span className="font-bold text-zinc-950 dark:text-white block mb-1">TECHNICAL EVIDENCE (STACK):</span>
                    <div className="flex flex-wrap gap-1">
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-[#ebdcb9]/60 dark:bg-[#3a2f26]/60 px-1.5 py-0.5 text-[9px] rounded text-zinc-700 dark:text-zinc-300 border border-zinc-300/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Launch button */}
                  {imagePath !== "#" && (
                    <div className="pt-4">
                      <a
                        href={imagePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-650 text-white rounded font-bold uppercase tracking-wider hover:bg-red-700 transition"
                      >
                        Launch Evidence Demo
                        <HiExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // --- STANDARD MODE: Sleek Editorial Cards with Parallax Hover ---
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <Link
        href={imagePath === "#" ? "" : imagePath}
        target={imagePath === "#" ? undefined : "_blank"}
        rel="noopener noreferrer"
        onClick={() => markProjectViewed(id)}
      >
        <section className="bg-white border border-zinc-200/60 dark:border-zinc-800/40 overflow-hidden relative hover:bg-zinc-50 dark:bg-zinc-900/50 dark:hover:bg-zinc-850 transition-all duration-300 rounded-xl hover:shadow-xl flex flex-col sm:flex-row sm:h-[18rem] group-even:sm:flex-row-reverse">
          {/* Mobile Image */}
          <div className="relative h-44 sm:hidden overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              quality={95}
              sizes="(max-width: 640px) 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {imagePath !== "#" && (
              <HiExternalLink className="absolute top-4 right-4 w-5 h-5 text-white drop-shadow-md" />
            )}
          </div>

          {/* Card Info Content */}
          <div className="p-6 sm:p-8 sm:max-w-[55%] flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500">
                  CASE #{caseNumber} // {category}
                </span>
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white group-hover:text-amber-500 transition-colors">
                  {title}
                </h3>
                {imagePath !== "#" && (
                  <HiExternalLink className="hidden sm:block w-4.5 h-4.5 text-zinc-400 group-hover:text-amber-500 transition-colors shrink-0 ml-2" />
                )}
              </div>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                {description}
              </p>
            </div>

            <ul className="flex flex-wrap mt-4 gap-1.5 sm:mt-auto">
              {tags.map((tag, index) => (
                <li
                  className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[9px] uppercase tracking-wider text-zinc-650 dark:text-zinc-350 rounded border border-zinc-250/20"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Parallax Zoom Image */}
          <div className="absolute hidden sm:block top-6 -right-24 w-[22rem] h-[13rem] overflow-hidden rounded-lg shadow-xl transition-all duration-350 group-hover:scale-[1.03] group-hover:-translate-x-3 group-hover:-translate-y-1 group-hover:rotate-1 group-even:-left-24 group-even:right-auto">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              quality={95}
              sizes="352px"
            />
          </div>
        </section>
      </Link>
    </motion.div>
  );
}
