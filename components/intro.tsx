"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsGithub, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useCaseFile } from "@/context/case-file-context";
import ResumeDossier from "./resume-dossier";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { caseFileMode, clickedRedactedText, setClickedRedactedText } = useCaseFile();
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  return (
    <section
      ref={ref}
      id="home"
      className="relative mb-24 max-w-[52rem] text-center sm:mb-0 scroll-mt-[100rem] overflow-hidden py-12 px-4"
    >
      {/* Background decorative elements - disabled in Case File Mode */}
      {!caseFileMode && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
        </div>
      )}

      {/* Main content grid */}
      <div className="flex flex-col items-center">
        {caseFileMode ? (
          // Case File Mode Hero: Stamped Dossier Header & Polaroid Photo Evidence
          <div className="w-full text-left font-mono relative p-6 bg-[#fdfcf7] dark:bg-[#1e1b19] border border-[#cbd2c0] dark:border-[#3a2f26] rounded-lg shadow-sm folder-clip">
            
            {/* Dossier Header Info */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-6">
              <div className="space-y-1.5">
                <span className="case-stamp case-stamp-red mb-3">RESTRICTED DOSSIER</span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white leading-none">
                  THE CURIOUS CASE OF PREM SINGH
                </h1>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                  DOCUMENT NO. BALLB-003-2025 // DEPT OF INTERDISCIPLINARY STUDIES
                </p>
                <div className="pt-2 text-xs text-zinc-700 dark:text-zinc-400 space-y-1">
                  <p><span className="font-bold">SUBJECT:</span> SINGH, PREM</p>
                  <p><span className="font-bold">PRIMARY IDENTITY:</span> Law Student (B.A. LL.B Hons.) @ University of Jammu</p>
                  <p><span className="font-bold">SECONDARY IDENTITY:</span> Web Developer & Experimental Architect</p>
                  <p><span className="font-bold">CORE PHILOSOPHY:</span> "Building Things Beyond the Syllabus"</p>
                </div>
              </div>

              {/* Polaroid Photo Evidence */}
              <motion.div 
                className="self-center md:self-start bg-white p-3 pb-6 border border-zinc-200 shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300 w-36 shrink-0 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-28 h-28 bg-zinc-100 mx-auto overflow-hidden border border-zinc-150">
                  <Image
                    src="/photo.png"
                    alt="Subject Portrait"
                    fill
                    className="object-cover grayscale contrast-125"
                    sizes="112px"
                    priority
                  />
                  <div className="absolute inset-0 bg-red-900/10 pointer-events-none" />
                </div>
                <div className="font-handwriting text-[#dc2626] text-sm mt-2 tracking-wide font-bold">
                  EXHIBIT A-00
                </div>
              </motion.div>
            </div>

            {/* Biography with Redacted text */}
            <div className="space-y-4 text-sm text-zinc-800 dark:text-zinc-300 leading-relaxed">
              <p>
                <strong>ANALYSIS SUMMARY:</strong> Prem Singh explores ideas beyond the classroom boundaries through technology, design, experimentation, and continuous learning. He combines legal reasoning, technical skills, and creative thinking in an uncommon way.
              </p>
              <p>
                <strong>INTERROGATION TRANSCRIPT // BIO SPECIFICS:</strong><br />
                "I am a law student passionate about building digital structures. I refuse to stay within the boundaries of a single syllabus. In my free time, I manage cloud infrastructure, write React applications, and study technology policy. My secret hobbies include {" "}
                <span 
                  className={`redacted-block ${clickedRedactedText ? "revealed" : ""}`}
                  onClick={() => setClickedRedactedText(true)}
                  title="Click to declassify evidence"
                >
                  {clickedRedactedText ? "Chess strategies and high-tier competitive CODM gaming" : "[REDACTED EVIDENCE]"}
                </span>. I believe that statutory law can be refactored like code, and code can be regulated like law."
              </p>
            </div>
          </div>
        ) : (
          // Standard Mode Hero: Ultra-Premium Bold Editorial Reveal
          <>
            {/* Avatar image */}
            <div className="relative mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              >
                <div className="relative h-36 w-36 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-2xl p-1 bg-white dark:bg-zinc-900">
                  <Image
                    src="/photo.png"
                    alt="Prem Singh Portrait"
                    width="144"
                    height="144"
                    quality="95"
                    priority={true}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.span
                className="absolute bottom-1 right-1 text-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
              >
                👋
              </motion.span>
            </div>

            {/* Primary Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.1] max-w-2xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              THE CURIOUS CASE OF <span className="text-zinc-650 dark:text-zinc-350">PREM SINGH</span>
            </motion.h1>

            {/* Tagline & Supporting Identity */}
            <motion.p
              className="text-lg sm:text-xl font-bold tracking-tight text-purple-650 dark:text-amber-500 mb-2 font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Building Things Beyond the Syllabus
            </motion.p>
            
            <motion.p
              className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Law Student. Developer. Experimental Thinker.
            </motion.p>

            {/* Extended Description */}
            <motion.p
              className="text-base sm:text-lg text-zinc-650 dark:text-zinc-350 max-w-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Exploring the intersection of law, technology, design, and experimentation through projects, research, and creative problem solving. A law student who refuses to stay within the boundaries of a single discipline.
            </motion.p>
          </>
        )}

        {/* Buttons / Controls */}
        <motion.div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-sm font-medium mt-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Link
            href="#contact"
            className={`group px-6 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-95 transition-all cursor-pointer ${
              caseFileMode
                ? "bg-[#1f1a16] text-[#f5efe2] hover:bg-black font-mono border border-transparent"
                : "bg-gray-900 text-white hover:bg-gray-950 dark:bg-white dark:text-zinc-900 border border-transparent"
            }`}
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
            }}
          >
            Contact me here
            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
          </Link>

          {/* CV Dossier Toggle */}
          <button
            onClick={() => setIsDossierOpen(true)}
            className={`group px-6 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-95 transition-all cursor-pointer ${
              caseFileMode
                ? "bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27] hover:bg-[#decfa7] font-mono border"
                : "bg-white text-zinc-900 border border-zinc-200 dark:bg-white/10 dark:text-white dark:border-zinc-800"
            }`}
          >
            Open Dossier Record (CV)
            <HiDownload className="opacity-60 group-hover:translate-y-0.5 transition" />
          </button>

          {/* Socials */}
          <div className="flex gap-3 mt-4 sm:mt-0">
            <a
              className={`p-3.5 flex items-center gap-2 rounded-full hover:scale-110 active:scale-95 transition-all cursor-pointer border ${
                caseFileMode
                  ? "bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27] hover:bg-[#decfa7]"
                  : "bg-white border-zinc-200 text-zinc-700 dark:bg-white/10 dark:text-white dark:border-zinc-800"
              }`}
              href="https://www.linkedin.com/in/the-prem-singh/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
            >
              <BsLinkedin className="w-4 h-4" />
            </a>
            <a
              className={`p-3.5 flex items-center gap-2 rounded-full hover:scale-110 active:scale-95 transition-all cursor-pointer border ${
                caseFileMode
                  ? "bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27] hover:bg-[#decfa7]"
                  : "bg-white border-zinc-200 text-zinc-700 dark:bg-white/10 dark:text-white dark:border-zinc-800"
              }`}
              href="https://github.com/youknowprem"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
            >
              <BsGithub className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen CV Dossier Modal */}
      <ResumeDossier isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />
    </section>
  );
}
