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
  const { clickedRedactedText, setClickedRedactedText } = useCaseFile();
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  return (
    <section
      ref={ref}
      id="home"
      className="relative mb-24 max-w-[52rem] text-center sm:mb-0 scroll-mt-[100rem] overflow-hidden py-12 px-4"
    >
      <div className="flex flex-col items-center">
        {/* Case File Mode Hero: Stamped Dossier Header & Polaroid Photo Evidence */}
        <div className="w-full text-left font-mono relative p-6 bg-[#fdfcf7] dark:bg-[#1e1b19] border border-[#cbd2c0] dark:border-[#3a2f26] rounded-lg shadow-sm folder-clip">
          
          {/* Dossier Header Info */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-6">
            <div className="space-y-1.5">
              <span className="case-stamp case-stamp-red mb-3">RESTRICTED DOSSIER</span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white leading-none">
                THE CURIOUS CASE OF PREM SINGH
              </h1>
              <p className="text-xs text-zinc-550 dark:text-zinc-500 uppercase tracking-widest font-bold">
                DOCUMENT NO. BALLB-003-2025 // DEPT OF INTERDISCIPLINARY STUDIES
              </p>
              <div className="pt-2 text-xs text-zinc-700 dark:text-zinc-405 space-y-1">
                <p><span className="font-bold">SUBJECT:</span> NYC_SINGH_PREM</p>
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

        {/* Buttons / Controls */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-sm font-medium mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Link
            href="#contact"
            className="group px-6 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-95 transition-all cursor-pointer bg-[#1f1a16] text-[#f5efe2] hover:bg-black font-mono border border-transparent dark:bg-zinc-800 dark:text-[#ebdcd0] dark:hover:bg-zinc-900"
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
            className="group px-6 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-95 transition-all cursor-pointer bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27] hover:bg-[#decfa7] font-mono border dark:bg-[#3e342a] dark:border-[#4d4033] dark:text-[#a0896d] dark:hover:bg-[#4d4033]"
          >
            Open Dossier Record (CV)
            <HiDownload className="opacity-60 group-hover:translate-y-0.5 transition" />
          </button>

          {/* Socials */}
          <div className="flex gap-3 mt-4 sm:mt-0">
            <a
              className="p-3.5 flex items-center gap-2 rounded-full hover:scale-110 active:scale-95 transition-all cursor-pointer border bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27] hover:bg-[#decfa7] dark:bg-[#3e342a] dark:border-[#4d4033] dark:text-[#a0896d] dark:hover:bg-[#4d4033]"
              href="https://www.linkedin.com/in/the-prem-singh/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
            >
              <BsLinkedin className="w-4 h-4" />
            </a>
            <a
              className="p-3.5 flex items-center gap-2 rounded-full hover:scale-110 active:scale-95 transition-all cursor-pointer border bg-[#ebdcb9] border-[#cbd2c0] text-[#4f3e27] hover:bg-[#decfa7] dark:bg-[#3e342a] dark:border-[#4d4033] dark:text-[#a0896d] dark:hover:bg-[#4d4033]"
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
