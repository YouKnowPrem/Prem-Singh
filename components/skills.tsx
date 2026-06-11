"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useCaseFile } from "@/context/case-file-context";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeInAnimationsVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.08 * index,
      },
    }),
};
export default function Skills() {
  const { ref } = useSectionInView("Case Files"); // Group under Case Files active section scroll
  const { caseFileMode } = useCaseFile();
  
  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40 px-4"
    >
      <SectionHeading>
        {caseFileMode ? "CAPABILITIES ASSESSMENT MATRIX" : "My Skills"}
      </SectionHeading>
      
      {caseFileMode ? (
        // Case File Mode: Typed checklist matrix
        <div className="font-mono text-xs border border-[#cbd2c0] dark:border-[#3a2f26] rounded-lg p-6 bg-[#fdfbf7] dark:bg-[#1e1b19] text-left grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skillsData.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 text-zinc-850 dark:text-zinc-350">
              <span className="text-red-650 font-bold">[✓]</span>
              <span className="uppercase">{skill}</span>
            </div>
          ))}
        </div>
      ) : (
        // Standard Mode: Floating list cards
        <ul className="flex flex-wrap justify-center gap-2.5 text-xs sm:text-sm text-gray-800">
          {skillsData.map((skill, index) => (
            <motion.li
              className="bg-white border border-zinc-200 rounded-xl px-4 py-2 dark:bg-zinc-800/40 dark:text-zinc-300 dark:border-zinc-800"
              key={index}
              variants={fadeInAnimationsVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}