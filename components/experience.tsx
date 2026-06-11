"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { useCaseFile } from "@/context/case-file-context";
import { LuGraduationCap } from "react-icons/lu";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact, FaServer } from "react-icons/fa";

// Case entries corresponding to the chronological journey matching the brief
const timelineLogs = [
  {
    entry: "01",
    title: "Discovered Programming",
    date: "2022",
    description: "Initial discovery of software development, scripting, and web hosting architectures. Self-taught basics of scripting and hosting configurations.",
    category: "Development",
    location: "Jammu, India",
    icon: <CgWorkAlt />,
  },
  {
    entry: "02",
    title: "Built First Websites & Cloud Migration",
    date: "2023 - 2024",
    description: "Managed infrastructure for various portals. Gained expertise in DNS routing, staging systems, and migrated legacy architectures to Google Cloud Platform.",
    category: "Development",
    location: "Jammu, India",
    icon: <FaServer />,
  },
  {
    entry: "03",
    title: "Entered Law School (University of Jammu)",
    date: "2025",
    description: "Admitted to the integrated B.A. LL.B. (Hons.) 5-year program. Began researching the intersection of emerging technologies, governance, and technology law.",
    category: "Academic",
    location: "University of Jammu",
    icon: <LuGraduationCap />,
  },
  {
    entry: "04",
    title: "Started Building Real Projects & Google Honors",
    date: "2025 - Present",
    description: "Recognized as a Legend Tier Winner in Google Skill Boost Program. Acted as Lead Developer for the official Historic Cities Jammu 2025 portal and launched Flutter productivity apps.",
    category: "Product / Research",
    location: "Jammu, India",
    icon: <FaReact />,
  },
];

export default function Experience() {
  const { ref } = useSectionInView("Timeline", 0.3);
  const { theme } = useTheme();
  const { caseFileMode } = useCaseFile();

  return (
    <section ref={ref} id="timeline" className="scroll-mt-28 mb-28 sm:mb-40 w-full max-w-[50rem] px-4">
      <SectionHeading>
        {caseFileMode ? "INVESTIGATION TIMELOG // TIMELINE" : "Timeline"}
      </SectionHeading>

      {caseFileMode ? (
        // --- CASE FILE MODE: Chronological Case Entry Logs (Pleading paper layout) ---
        <div className="legal-pleading border border-[#cbd2c0] dark:border-[#3a2f26] rounded-lg shadow-sm py-8 pr-6 pl-12 bg-[#fdfbf7] dark:bg-[#1e1b19]">
          <div className="absolute top-4 right-6 text-[9px] font-bold text-zinc-400">
            OFFICER ACTIVITY LOG
          </div>
          
          <div className="space-y-8 relative">
            {timelineLogs.map((log) => (
              <div key={log.entry} className="relative group pl-2">
                {/* Visual marker dot */}
                <div className="absolute -left-[2.1rem] top-1.5 w-2 h-2 rounded-full bg-amber-600 z-10" />
                
                <div className="font-mono text-xs text-zinc-700 dark:text-zinc-455 space-y-1">
                  <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
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
      ) : (
        // --- STANDARD MODE: Sleek vertical timeline ---
        <VerticalTimeline lineColor={theme === "light" ? "#f3f4f6" : "#2d2d30"}>
          {timelineLogs.map((item, index) => (
            <React.Fragment key={index}>
              <VerticalTimelineElement
                contentStyle={{
                  background: theme === "light" ? "#ffffff" : "rgba(24, 24, 27, 0.5)",
                  boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.05), 0px 4px 6px -2px rgba(0, 0, 0, 0.02)",
                  border: theme === "light" ? "1px solid #e4e4e7" : "1px solid rgba(63, 63, 70, 0.4)",
                  textAlign: "left",
                  borderRadius: "16px",
                  padding: "1.5rem 2rem",
                }}
                contentArrowStyle={{
                  borderRight: theme === "light" ? "0.4rem solid #e4e4e7" : "0.4rem solid rgba(63, 63, 70, 0.4)",
                }}
                date={item.date}
                icon={item.icon}
                iconStyle={{
                  background: theme === "light" ? "#ffffff" : "#18181b",
                  color: theme === "light" ? "#1f2937" : "#f4f4f5",
                  border: theme === "light" ? "1px solid #e4e4e7" : "1px solid rgba(63, 63, 70, 0.4)",
                  fontSize: "1.2rem",
                  boxShadow: "none",
                }}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                  Entry 0{index + 1} // {item.category}
                </span>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                <p className="font-medium text-xs text-zinc-500 dark:text-zinc-400 !mt-0">{item.location}</p>
                <p className="!mt-2 font-normal text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed">
                  {item.description}
                </p>
              </VerticalTimelineElement>
            </React.Fragment>
          ))}
        </VerticalTimeline>
      )}
    </section>
  );
}
