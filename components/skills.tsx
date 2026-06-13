"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

export default function Skills() {
  const { ref } = useSectionInView("Case Files"); // Group under Case Files active section scroll
  
  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40 px-4"
    >
      <SectionHeading>
        CAPABILITIES ASSESSMENT MATRIX
      </SectionHeading>
      
      <div className="font-mono text-xs border border-[#cbd2c0] dark:border-[#3a2f26] rounded-lg p-6 bg-[#fdfbf7] dark:bg-[#1e1b19] text-left grid grid-cols-2 sm:grid-cols-3 gap-3">
        {skillsData.map((skill, index) => (
          <div key={index} className="flex items-center gap-2 text-zinc-850 dark:text-zinc-300">
            <span className="text-red-650 font-bold">[✓]</span>
            <span className="uppercase">{skill}</span>
          </div>
        ))}
      </div>
    </section>
  );
}