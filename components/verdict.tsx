"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCaseFile } from "@/context/case-file-context";

export default function Verdict() {
  const { markVerdictReached } = useCaseFile();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      markVerdictReached();
    }
  }, [inView, markVerdictReached]);

  return (
    <div ref={ref} className="scroll-mt-28 mb-28 max-w-[50rem] w-full px-4 flex justify-center">
      {/* --- CASE FILE MODE: Official Court Judgment Paper --- */}
      <motion.div
        className="w-full bg-[#fdfcf7] dark:bg-[#1e1b19] border-2 border-red-750 dark:border-red-900 rounded-lg p-8 sm:p-12 font-mono text-xs shadow-lg relative text-left"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        {/* Official Seal / Watermark graphic background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(220,38,38,0.015)_2px,transparent_2px)] pointer-events-none" />
        
        <div className="text-center border-b border-double border-zinc-200 dark:border-zinc-800 pb-6 mb-6">
          <h2 className="text-lg font-black uppercase tracking-widest text-zinc-950 dark:text-white">
            IN THE HIGH COURT OF DISCIPLINARY ENQUIRY
          </h2>
          <p className="text-[10px] text-zinc-450 mt-1 uppercase font-bold tracking-wider">
            JURISDICTION: CREATIVE EXPERIMENTATION & DIGITAL POLICY
          </p>
        </div>

        <div className="space-y-6 text-zinc-800 dark:text-zinc-350 leading-relaxed">
          <div className="flex justify-between font-bold text-zinc-950 dark:text-white">
            <span>STATE INQUIRY REFERENCE: SEC-BBS-003</span>
            <span>DATE: {new Date().toLocaleDateString("en-US")}</span>
          </div>

          <div>
            <p className="font-bold text-zinc-950 dark:text-white uppercase mb-2">JUDGMENT ORDER:</p>
            <p>
              AFTER REVIEWING ALL AVAILABLE EVIDENCE FILED UNDER CASE FILES #001 THROUGH #004, 
              AND EXAMINING ALL LABORATORY SAMPLES EMBODIED IN EXPERIMENTS A-01 THROUGH A-04, 
              THE COURT HEREBY DELIVERS ITS SOLEMN FINDINGS.
            </p>
          </div>

          <div className="p-4 border-l-4 border-red-650 bg-red-500/5 my-4">
            <span className="font-black text-red-650 dark:text-red-400 uppercase tracking-wider block mb-1">
              VERDICT: GUILTY
            </span>
            <p className="font-bold text-zinc-950 dark:text-white">
              THE SUBJECT, PREM SINGH, IS FOUND GUILTY ON ALL COUNTS OF RELENTLESS CURIOSITY, 
              CREATIVE EXPERIMENTATION, AND BUILDING DIGITAL STRUCTURES WELL BEYOND THE ACADEMIC SYLLABUS EXPECTATIONS.
            </p>
          </div>

          <div>
            <span className="font-bold text-zinc-950 dark:text-white block mb-1">SENTENCE MANDATE:</span>
            <p className="italic font-bold text-zinc-900 dark:text-white uppercase">
              THE SUBJECT IS SENTENCED TO CONTINUE BUILDING, CODING, AND EXPLORING WITHOUT DISCIPLINARY RESTRICTION.
            </p>
          </div>

          <div className="pt-6 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-400 font-bold uppercase">SIGNATURE OF THE BENCH:</p>
              <div className="font-handwriting text-red-650 dark:text-red-400 text-lg font-bold">
                Chief Judge of Creativity
              </div>
            </div>
            <div className="case-stamp case-stamp-red transform rotate-[-6deg] font-black text-sm select-none shrink-0 px-6 py-2">
              CASE CLOSED
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
