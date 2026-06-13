"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { FiChevronLeft, FiChevronRight, FiBriefcase, FiAlertTriangle, FiCheckSquare, FiTrendingUp, FiCpu, FiDollarSign } from "react-icons/fi";
import clsx from "clsx";

type Slide = {
  id: string;
  tabLabel: string;
  icon: React.ReactNode;
  header: string;
  topic: string;
  details: string;
  bulletPoints: string[];
  stamp: string;
};

const slidesData: Slide[] = [
  {
    id: "slide-01",
    tabLabel: "Problem",
    icon: <FiAlertTriangle className="w-4 h-4 text-red-650" />,
    header: "01 / SYSTEMIC INEFFICIENCY",
    topic: "THE LEGAL-TECH COGNITIVE GAP",
    details: "Modern legal operations are trapped in static document structures. Traditional workflows rely on manual, error-prone auditing of complex statutes, resulting in: ",
    bulletPoints: [
      "LOOSELY DEFINED VARIABLES: Ambiguous syntax in contracts leading to litigation.",
      "ISOLATED DATA SILOS: Regulatory changes requiring complete manual rewrites.",
      "UNAUDITED LOGICAL LOOPHOLES: Compliance oversight costing enterprises millions."
    ],
    stamp: "URGENT GAP"
  },
  {
    id: "slide-02",
    tabLabel: "Solution",
    icon: <FiCheckSquare className="w-4 h-4 text-green-650" />,
    header: "02 / PROPOSED REMEDY",
    topic: "COMPUTATIONAL JURISPRUDENCE SYSTEM",
    details: "Translating legislative rules directly into declarative code logic. Our protocol compiles static statutory texts into live, executable audit nodes:",
    bulletPoints: [
      "DECLARATIVE STATUTE PARSING: Logical models representing rights and rules.",
      "REAL-TIME LOOP COMPILE: Custom IDE tools scanning drafts for contradictions.",
      "DOCKERIZED COMPLIANCE HUB: Microservice audit checks triggered via API requests."
    ],
    stamp: "DECLASSIFIED"
  },
  {
    id: "slide-03",
    tabLabel: "Market",
    icon: <FiTrendingUp className="w-4 h-4 text-blue-600" />,
    header: "03 / TARGET SEGMENTS",
    topic: "COMPLIANCE AUDIT TARGET MATRIX",
    details: "Positioned at the intersection of emerging digital fiduciaries, AI agencies, and public administration. The demand for machine-verifiable legal code is surging: ",
    bulletPoints: [
      "ENTERPRISE COUNSEL: Automating multi-jurisdictional compliance logs.",
      "BLOCKCHAIN PROTOCOLS: Smart contract audit engines linking code to state law.",
      "GOVERNANCE TEAMS: Digital-first city councils building automated public policies."
    ],
    stamp: "SCALABLE INQUIRY"
  },
  {
    id: "slide-04",
    tabLabel: "Product",
    icon: <FiCpu className="w-4 h-4 text-amber-600" />,
    header: "04 / CORE ARCHITECTURE",
    topic: "PROLOG-POWERED ANALYSIS ENGINE",
    details: "A high-fidelity framework built using structured logical models and modern web interfaces, enabling instant compliance diagnostics: ",
    bulletPoints: [
      "STATUTORY SYNTAX COMPILER: Translating natural legal texts to logic trees.",
      "GSAP DUAL STATE MONITOR: Visualizing rules and exemptions in real-time.",
      "RESTful ENDPOINT DISPATCH: Secure, low-latency API verification hooks."
    ],
    stamp: "SECURE INTEL"
  },
  {
    id: "slide-05",
    tabLabel: "Business Model",
    icon: <FiDollarSign className="w-4 h-4 text-emerald-600" />,
    header: "05 / REVENUE CHANNELS",
    topic: "LICENSING & SUBSCRIPTION STRUCTURE",
    details: "Designed to scale alongside enterprise pipeline sizes. Generates predictable recurring cash-flows from three distinct revenue channels: ",
    bulletPoints: [
      "ENTERPRISE SaaS: Recurring subscriptions for in-house corporate legal teams.",
      "COMPLIANCE API: Pay-per-query verification tokens for automated audit checkups.",
      "STRATEGIC RETAINERS: Custom implementation modules for high-level system upgrades."
    ],
    stamp: "APPROVED MODEL"
  },
  {
    id: "slide-06",
    tabLabel: "Roadmap",
    icon: <FiBriefcase className="w-4 h-4 text-indigo-600" />,
    header: "06 / OPERATIONAL TARGETS",
    topic: "MILESTONE RETRIEVAL LOG",
    details: "A strategic phased release plan designed to expand logical capabilities, secure enterprise integrations, and lead computational governance:",
    bulletPoints: [
      "PHASE 1 (Q3 2026): Launch open-source declarative parser for Indian legislation.",
      "PHASE 2 (Q4 2026): Deploy real-time compliance IDE extension for draft auditing.",
      "PHASE 3 (Q1 2027): Onboard pilot digital fiduciaries and smart contract platforms."
    ],
    stamp: "MANDATE APPROVED"
  }
];

export default function Pitchdeck() {
  const { ref } = useSectionInView("Briefing", 0.4);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slidesData[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slidesData.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  return (
    <section
      ref={ref}
      id="briefing"
      className="scroll-mt-28 mb-28 max-w-[50rem] w-full px-4"
    >
      <SectionHeading>
        STRATEGIC BRIEFING // PITCH DECK
      </SectionHeading>

      {/* Manila Slide Binder Folder Layout */}
      <div className="w-full flex flex-col rounded-lg border border-[#cbd2c0] dark:border-[#3a2f26] bg-[#fbf9f3] dark:bg-[#1c1917] shadow-lg relative overflow-hidden font-mono text-xs folder-clip">
        
        {/* Slide Tab Index Buttons (Desktop Slider Tabs) */}
        <div className="hidden sm:flex border-b border-[#cbd2c0] dark:border-[#3a2f26] bg-[#eddcb9]/50 dark:bg-[#251f19]/50 select-none overflow-x-auto">
          {slidesData.map((slide, idx) => {
            const isSelected = idx === currentSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={clsx(
                  "flex items-center gap-1.5 px-4 py-3 border-r border-[#cbd2c0] dark:border-[#3a2f26] font-bold uppercase transition-colors shrink-0",
                  isSelected
                    ? "bg-[#fdfcf7] dark:bg-[#1e1b19] text-[#dc2626] border-b-2 border-b-amber-600"
                    : "text-[#7c6344] hover:bg-[#ebdcb9]/40 dark:text-[#a0896d]"
                )}
              >
                {slide.icon}
                <span>{slide.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Slide Main Content Area */}
        <div className="p-6 sm:p-10 min-h-[300px] flex flex-col justify-between relative">
          {/* Watermark/Stamp */}
          <div className="absolute top-4 right-6 flex flex-col items-end gap-2 z-0">
            <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider">
              DOSSIER FILE: SLD-00{currentSlideIndex + 1}
            </span>
            <div className="case-stamp case-stamp-red scale-75 select-none origin-right transform rotate-[-3deg]">
              {currentSlide.stamp}
            </div>
          </div>

          {/* Slide Text Content */}
          <div className="space-y-4 z-10 max-w-[80%] text-left">
            <div className="text-[10px] text-zinc-400 dark:text-zinc-550 font-bold uppercase tracking-widest">
              {currentSlide.header}
            </div>
            
            <h3 className="text-sm sm:text-base font-black uppercase text-zinc-950 dark:text-white">
              {currentSlide.topic}
            </h3>

            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans text-xs sm:text-sm">
              {currentSlide.details}
            </p>

            {/* Bullet points */}
            <ul className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              {currentSlide.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-zinc-800 dark:text-zinc-400">
                  <span className="text-amber-650 font-black mt-0.5">•</span>
                  <span className="leading-relaxed font-mono text-xs">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Slider Footer & Controller Buttons */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 z-10">
            {/* Slide Indicator Dots */}
            <div className="flex gap-1.5">
              {slidesData.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={clsx(
                    "w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300",
                    idx === currentSlideIndex
                      ? "bg-amber-600 scale-110"
                      : "bg-[#cbd2c0] dark:bg-[#3a2f26] hover:bg-[#bcae91]"
                  )}
                />
              ))}
            </div>

            {/* Slide Next/Prev Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2 border rounded border-[#cbd2c0] dark:border-[#3a2f26] bg-[#ebdcb9] hover:bg-[#decfa7] dark:bg-[#3e342a] dark:text-[#a0896d] dark:hover:bg-[#4d4033] text-[#4f3e27] active:scale-90 transition-all"
                title="Previous Slide"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 border rounded border-[#cbd2c0] dark:border-[#3a2f26] bg-[#ebdcb9] hover:bg-[#decfa7] dark:bg-[#3e342a] dark:text-[#a0896d] dark:hover:bg-[#4d4033] text-[#4f3e27] active:scale-90 transition-all"
                title="Next Slide"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
