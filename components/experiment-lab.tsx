"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { useCaseFile } from "@/context/case-file-context";
import { HiExternalLink } from "react-icons/hi";

// Pre-seeded experiment records matching games and concepts
const experiments = [
  {
    evidenceId: "A-01",
    title: "Whack a Mole",
    concept: "Arcade Reflex & Timing Game",
    notes: "An interactive, fast-paced reflex grid. Measures coordination and click-response latency.",
    status: "Completed",
    tags: ["Next.js", "React", "Framer Motion", "GSAP", "Tailwind CSS"],
    imagePath: "https://whack-a-mole-10.vercel.app/",
    imageUrl: "/Whack-a-Mole.png",
  },
  {
    evidenceId: "A-02",
    title: "Snake Web Game",
    concept: "Classic Retro Grid Engine",
    notes: "Nostalgic game mechanics written in pure canvas context. Focuses on grid movement calculations.",
    status: "Stable",
    tags: ["HTML5", "CSS3", "JavaScript"],
    imagePath: "https://snake-game-ashen-psi.vercel.app",
    imageUrl: "/Snakeweb.png",
  },
  {
    evidenceId: "A-03",
    title: "Flappy Bird Clone",
    concept: "Physics Canvas Simulation",
    notes: "Flappy flight mechanics with custom bounding box calculations and pipe scroll generators.",
    status: "Stable",
    tags: ["HTML5", "CSS3", "Canvas API", "JavaScript"],
    imagePath: "https://flappy-svg.vercel.app/",
    imageUrl: "/Flappy bird .png",
  },
  {
    evidenceId: "A-04",
    title: "Duel Web Clock",
    concept: "Dual Timezone Synchronizer",
    notes: "Timezone mapping utility with smooth circular dial animations and accurate offset clocks.",
    status: "Completed",
    tags: ["HTML5", "CSS3", "JavaScript", "SVG Animation"],
    imagePath: "https://web-duel-clock.vercel.app",
    imageUrl: "/Webclock.png",
  },
];

export default function ExperimentLab() {
  const { ref } = useSectionInView("Experiment Lab", 0.3);
  const { caseFileMode } = useCaseFile();

  return (
    <section ref={ref} id="lab" className="scroll-mt-28 mb-28 max-w-[50rem] w-full px-4">
      <SectionHeading>
        {caseFileMode ? "EXPERIMENT LAB // EVIDENCE RECORD" : "Experiment Lab"}
      </SectionHeading>

      <p className="text-center text-sm text-zinc-550 dark:text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed">
        {caseFileMode
          ? "RECORD OF SEIZED DEMONSTRATIONS AND INTERACTIVE PROTOTYPES SECURED FOR REGULATORY ANALYSIS."
          : "An interactive laboratory showcasing ideas, mini-games, prototypes, and future engineering concepts."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {experiments.map((exp, index) => (
          <motion.div
            key={exp.evidenceId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, type: "spring" }}
            className={`flex flex-col rounded-xl overflow-hidden border transition-all duration-300 relative ${
              caseFileMode
                ? "bg-[#ebdcb9]/40 hover:bg-[#ebdcb9]/60 dark:bg-[#2d251e]/40 dark:hover:bg-[#2d251e]/60 border-[#cbd2c0]/60 dark:border-[#3a2f26]/60 font-mono text-xs"
                : "bg-white border-zinc-200 hover:border-zinc-350 dark:bg-zinc-900/40 dark:border-zinc-800 hover:shadow-lg"
            }`}
          >
            {/* Header Badge */}
            <div className={`px-4 py-2 border-b flex justify-between items-center ${
              caseFileMode
                ? "bg-[#decfa7]/50 border-[#cbd2c0]/65 text-[#7c6344] dark:bg-[#3e342a]/50 dark:border-[#4d4033]/65 dark:text-[#a0896d] font-bold"
                : "bg-zinc-55/40 dark:bg-zinc-950/20 border-zinc-150 dark:border-zinc-800/80 text-zinc-400 font-semibold"
            }`}>
              <span>{caseFileMode ? `EVIDENCE RECORD A-${exp.evidenceId}` : `Prototype ${exp.evidenceId}`}</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-mono border ${
                caseFileMode
                  ? "border-[#bcae91] text-[#7c6344] bg-[#ebdcb9]/20"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-500"
              }`}>
                {exp.status}
              </span>
            </div>

            {/* Experiment Image Preview */}
            <div className="relative h-40 w-full overflow-hidden shrink-0 border-b border-zinc-200/40 dark:border-zinc-800/40">
              <Image
                src={exp.imageUrl}
                alt={exp.title}
                fill
                className={`object-cover transition-transform duration-300 hover:scale-103 ${
                  caseFileMode ? "grayscale contrast-125" : ""
                }`}
                sizes="(max-width: 640px) 100vw, 384px"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className={`text-base font-bold ${
                  caseFileMode ? "uppercase text-zinc-950 dark:text-white" : "text-zinc-900 dark:text-zinc-100"
                }`}>
                  {exp.title}
                </h3>
                
                <div className="space-y-1">
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold">Concept:</p>
                  <p className={caseFileMode ? "text-[#7c6344] dark:text-[#a0896d]" : "text-zinc-600 dark:text-zinc-400 text-xs font-serif italic"}>
                    {exp.concept}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold">Notes:</p>
                  <p className={caseFileMode ? "text-[#1f1a16] dark:text-[#ebdcd0]" : "text-zinc-650 dark:text-zinc-455 text-xs"}>
                    {exp.notes}
                  </p>
                </div>
              </div>

              {/* Tags & Action Link */}
              <div className="space-y-3 pt-2 border-t border-zinc-150/40 dark:border-zinc-800/40">
                <div className="flex flex-wrap gap-1">
                  {exp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-1.5 py-0.5 text-[9px] rounded uppercase ${
                        caseFileMode
                          ? "bg-[#ebdcb9] text-[#7c6344] dark:bg-[#3e342a] dark:text-[#a0896d]"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={exp.imagePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-1.5 py-2 w-full text-center text-[10px] uppercase font-bold tracking-widest rounded border transition ${
                    caseFileMode
                      ? "bg-[#1f1a16] text-[#f5efe2] border-transparent hover:bg-black font-mono"
                      : "bg-zinc-900 text-white border-transparent hover:bg-zinc-950 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  }`}
                >
                  <span>Launch Prototype</span>
                  <HiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
