"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiX, FiPrinter, FiDownload, FiCheckCircle } from "react-icons/fi";

interface ResumeDossierProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeDossier({ isOpen, onClose }: ResumeDossierProps) {
  const dossierRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = dossierRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      // Create a print window or use simple print styles
      window.print();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Container Card */}
      <motion.div
        className="relative bg-[#fcf9f2] dark:bg-[#1a1715] text-[#1f1a16] dark:text-[#ebdcd0] w-full max-w-4xl rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col my-8 max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.4 }}
      >
        {/* Controls Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 text-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 text-lg">📄</span>
            <span className="font-mono text-xs uppercase tracking-wider font-bold">
              Subject Dossier: Prem_Singh_CV.pdf
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono rounded border border-zinc-700 transition"
              title="Print Dossier"
            >
              <FiPrinter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-red-400 transition"
              title="Close Dossier"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Dossier Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 print:p-0 print:overflow-visible">
          <div
            ref={dossierRef}
            className="relative bg-white dark:bg-zinc-950 p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 rounded shadow-sm print:shadow-none print:border-none print:bg-white print:text-black font-mono text-xs leading-relaxed"
          >
            {/* Folder Staple Graphic (top center, hidden in print) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2.5 w-24 h-5 bg-zinc-300 dark:bg-zinc-800 rounded border border-zinc-400 opacity-60 flex items-center justify-center text-[8px] text-zinc-500 font-bold uppercase tracking-widest pointer-events-none print:hidden">
              CLASSIFIED
            </div>

            {/* Header / Stamps */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 pb-6 border-b border-dashed border-zinc-200 dark:border-zinc-800">
              <div>
                <h1 className="text-2xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
                  SINGH, PREM
                </h1>
                <p className="text-zinc-500 uppercase text-[10px] tracking-widest font-bold mt-1">
                  File Reference: BALLB-003-2025 | STATUS: ACTIVE
                </p>
                <div className="mt-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                  <p>EMAIL: youknowprem@gmail.com</p>
                  <p>GITHUB: github.com/youknowprem</p>
                  <p>LINKEDIN: linkedin.com/in/the-prem-singh</p>
                  <p>LOCATION: Jammu, J&K, India</p>
                </div>
              </div>
              <div className="sm:self-center">
                <div className="case-stamp case-stamp-red transform rotate-[8deg] px-5 py-2.5 font-black text-center text-sm select-none">
                  DECLASSIFIED
                  <div className="text-[8px] font-normal uppercase tracking-widest mt-1">
                    Prem Singh Portfolio V2
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Brief */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-1 mb-2">
                01 // SUBJECT PROFILE SUMMARY
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300">
                A multidisciplinary creator combining legal reasoning with technical development capabilities. 
                Currently pursuing a B.A. LL.B. (Hons.) integrated law degree at the University of Jammu, with 
                a secondary specialization in modern web software engineering. Focused on the intersections of 
                technology law, policy analysis, and human-centered design, driven by a philosophy of 
                "Building Things Beyond the Syllabus."
              </p>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-1 mb-2">
                02 // ACADEMIC RECORD
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-100">
                    <span>B.A. LL.B. (HONS.) — UNIVERSITY OF JAMMU</span>
                    <span>2025 — 2030</span>
                  </div>
                  <p className="text-zinc-500 uppercase text-[9px] font-bold mt-0.5">Degree Program | Jammu, India</p>
                  <ul className="list-disc pl-4 mt-1.5 text-zinc-700 dark:text-zinc-300 space-y-1">
                    <li>Focus areas: Technology Law, Digital Governance, Cyber Security framework, and Intellectual Property Rights.</li>
                    <li>Applying engineering frameworks to statutory analysis and legislative drafts.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cloud & Web Development Experience */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-1 mb-2">
                03 // PROFESSIONAL EXPERIENCE & INVOLVEMENTS
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-100">
                    <span>CLOUD INFRASTRUCTURE & WEB DEVELOPER</span>
                    <span>2022 — 2025</span>
                  </div>
                  <p className="text-zinc-500 uppercase text-[9px] font-bold mt-0.5">Freelance & Independent Contractor | Jammu, India</p>
                  <ul className="list-disc pl-4 mt-1.5 text-zinc-700 dark:text-zinc-300 space-y-1">
                    <li>Migrated complex legacy architectures to Google Cloud Platform, optimizing load times and host metrics.</li>
                    <li>Structured secure staging pipelines, deployment tasks, and configured DNS resolution matrices.</li>
                    <li>Maintained, audited, and optimized WordPress deployments for clients with full security patches.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-100">
                    <span>CAMPUS AMBASSADOR — EDC IIT DELHI & TRYST'26</span>
                    <span>2025 — PRESENT</span>
                  </div>
                  <p className="text-zinc-500 uppercase text-[9px] font-bold mt-0.5">Leadership & Coordination | IIT Delhi Representative</p>
                  <ul className="list-disc pl-4 mt-1.5 text-zinc-700 dark:text-zinc-300 space-y-1">
                    <li>Serving as student lead representative for IIT Delhi’s Entrepreneurship Development Cell (eDC) and annual business conclave BECon'26.</li>
                    <li>Coordinating outreach programs for J&K student circles, promoting technology ventures and legal-tech opportunities.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Projects */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-1 mb-2">
                04 // LOGGED CASE INVESTIGATIONS (PROJECTS)
              </h2>
              <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
                <p>
                  <strong>CASE #001: Historic Cities Jammu 2025</strong><br />
                  Lead developer for the official Jammu tourism showcase. Structured as a performant Next.js experience.
                </p>
                <p>
                  <strong>CASE #002: Focus V1</strong><br />
                  A Flutter-based custom time-management timer designed to block distractions and support focused deep-work cycles.
                </p>
                <p>
                  <strong>CASE #003: Portfolio V2</strong><br />
                  A Next.js personal operating system designed to analyze interdisciplinary knowledge through investigation layout files.
                </p>
                <p>
                  <strong>CASE #004: Parinda</strong><br />
                  A minimalist creative typography portal themed around textured paper layouts and custom SVG animations.
                </p>
              </div>
            </div>

            {/* Skill Matrix */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-1 mb-2">
                05 // CAPABILITIES MATRIX
              </h2>
              <table className="w-full text-[10px] text-zinc-700 dark:text-zinc-300">
                <tbody>
                  <tr>
                    <td className="font-bold py-1 w-1/3">TECHNICAL STACK:</td>
                    <td className="py-1">Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion, Flutter, Git</td>
                  </tr>
                  <tr>
                    <td className="font-bold py-1 w-1/3">LEGAL CAPABILITIES:</td>
                    <td className="py-1">Statutory Interpretation, Constitutional Law Research, Tech Policy Writing</td>
                  </tr>
                  <tr>
                    <td className="font-bold py-1 w-1/3">CLOUD INFRASTRUCTURE:</td>
                    <td className="py-1">Google Cloud Platform (GCP) Operations, DNS routing, Deployment staging</td>
                  </tr>
                  <tr>
                    <td className="font-bold py-1 w-1/3">HONORS & MILESTONES:</td>
                    <td className="py-1">Legend Tier Winner — Google Cloud Skill Boost Session 1 (2025)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Verification Signature */}
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase">
              <span>RECORD AUDITED BY: ANTIGRAVITY</span>
              <span>DATE: {new Date().toLocaleDateString("en-US")}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
