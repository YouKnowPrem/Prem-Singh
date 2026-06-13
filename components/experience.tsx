"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

const timelineLogs = [
  {
    entry: "01",
    title: "Discovered Programming",
    date: "2022",
    description: "Initial discovery of software development, scripting, and web hosting architectures. Self-taught basics of scripting and hosting configurations.",
    category: "Development",
    location: "Jammu, India",
  },
  {
    entry: "02",
    title: "Built First Websites & Cloud Migration",
    date: "2023 - 2024",
    description: "Managed infrastructure for various portals. Gained expertise in DNS routing, staging systems, and migrated legacy architectures to Google Cloud Platform.",
    category: "Development",
    location: "Jammu, India",
  },
  {
    entry: "03",
    title: "Entered Law School (University of Jammu)",
    date: "2025",
    description: "Admitted to the integrated B.A. LL.B. (Hons.) 5-year program. Began researching the intersection of emerging technologies, governance, and technology law.",
    category: "Academic",
    location: "University of Jammu",
  },
  {
    entry: "04",
    title: "Started Building Real Projects & Google Honors",
    date: "2025 - Present",
    description: "Recognized as a Legend Tier Winner in Google Skill Boost Program. Acted as Lead Developer for the official Historic Cities Jammu 2025 portal and launched Flutter productivity apps.",
    category: "Product / Research",
    location: "Jammu, India",
  },
];

export default function Experience() {
  const { ref } = useSectionInView("Timeline", 0.3);

  return (
    <section ref={ref} id="timeline" className="scroll-mt-28 mb-28 sm:mb-40 w-full max-w-[50rem] px-4">
      <SectionHeading>
        INVESTIGATION TIMELOG // TIMELINE
      </SectionHeading>

      {/* --- CASE FILE MODE: Chronological Case Entry Logs (Pleading paper layout) --- */}
      <div className="legal-pleading border border-[#cbd2c0] dark:border-[#3a2f26] rounded-lg shadow-sm py-8 pr-6 pl-12 bg-[#fdfbf7] dark:bg-[#1e1b19] relative">
        <div className="absolute top-4 right-6 text-[9px] font-bold text-zinc-400">
          OFFICER ACTIVITY LOG
        </div>
        
        <div className="space-y-8 relative">
          {timelineLogs.map((log) => (
            <div key={log.entry} className="relative group pl-2">
              {/* Visual marker dot */}
              <div className="absolute -left-[2.1rem] top-1.5 w-2 h-2 rounded-full bg-amber-600 z-10" />
              
              <div className="font-mono text-xs text-zinc-700 dark:text-zinc-400 space-y-1">
                <div className="text-[10px] text-zinc-400 dark:text-zinc-550 font-bold uppercase tracking-wider">
                  CASE ENTRY {log.entry} // DATE: {log.date}
                </div>
                <h3 className="text-sm font-black uppercase text-zinc-950 dark:text-white">
                  {log.title}
                </h3>
                <div className="text-[10px] italic text-[#7c6344] dark:text-[#a0896d]">
                  Location: {log.location} | Category: {log.category}
                </div>
                <p className="pt-1 text-zinc-650 dark:text-zinc-350 leading-relaxed font-sans text-xs">
                  {log.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
