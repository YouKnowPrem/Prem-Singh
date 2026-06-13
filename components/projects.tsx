"use client";

import React from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

export const featuredCases = [
  {
    id: "case-001",
    caseNumber: "001",
    title: "Historic Cities Jammu 2025",
    description: "Official event website and digital archive showcasing historical architecture and heritage sites of Jammu. Built as a high-performance Next.js tourism portal with fluid animations.",
    category: "Official Event Website",
    status: "Closed",
    verdict: "Successfully Delivered",
    tags: ["Next.js", "React", "JavaScript", "Framer Motion", "Locomotive Scroll", "Tailwind CSS"],
    imagePath: "https://historic-cities-jammu2025.vercel.app/",
    imageUrl: "/historic-cities.png",
  },
  {
    id: "case-002",
    caseNumber: "002",
    title: "Focus V1",
    description: "Founder & Developer of Focus V1. A Flutter productivity and time-management application designed to block distraction loops and encourage deep-work cycles.",
    category: "Productivity Application",
    status: "Active",
    verdict: "Under Continuous Development",
    tags: ["Flutter", "Dart", "App Development", "Productivity UI", "State Management"],
    imagePath: "https://focus-v1-ebon.vercel.app/",
    imageUrl: "/StarEffect.png",
  },
  {
    id: "case-003",
    caseNumber: "003",
    title: "Portfolio V2",
    description: "An interactive personal operating system and digital case-file archive designed to display multidisciplinary skills at the intersection of technology and law.",
    category: "Personal Operating System",
    status: "Open",
    verdict: "In Progress",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis"],
    imagePath: "#",
    imageUrl: "/WebPortfolioDark.png",
  },
  {
    id: "case-004",
    caseNumber: "004",
    title: "Parinda",
    description: "A clean, paper-themed minimalist portfolio portal displaying creative interactions, smooth paper-flip animations, and bespoke typography layouts.",
    category: "Creative Web Experience",
    status: "Closed",
    verdict: "Successful",
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "Lenis", "Tailwind CSS"],
    imagePath: "https://parinda-pi.vercel.app",
    imageUrl: "/Parinda.png",
  },
];

export default function Projects() {
  const { ref } = useSectionInView("Case Files", 0.3);

  return (
    <section ref={ref} id="cases" className="scroll-mt-28 mb-28 max-w-[50rem] w-full px-4">
      <SectionHeading>
        FEATURED CASE FILES
      </SectionHeading>
      
      <div className="text-center font-mono text-[10px] uppercase tracking-widest text-[#7c6344] dark:text-[#a0896d] mb-6 -mt-4">
        WARNING: REVIEWING EVIDENCE FILES INCREASES CASE PROGRESS
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {featuredCases.map((project, index) => (
          <Project key={project.id} {...project} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
