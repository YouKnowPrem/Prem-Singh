"use client";

import React, { useState } from "react";
import Image from "next/image";
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
}: ProjectProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { markProjectViewed, viewedProjects } = useCaseFile();
  const isViewed = viewedProjects.includes(id);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isViewed) {
      markProjectViewed(id);
    }
  };

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
