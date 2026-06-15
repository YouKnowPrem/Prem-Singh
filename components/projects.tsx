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
    title: "Kaizen Quest",
    description: "A premium, gamified habit-building and productivity platform built and delivered to a startup founder. Designed to turn routine goals and tasks into engaging, interactive quest pathways with tracking metrics.",
    category: "Gamified Productivity Platform",
    status: "Closed",
    verdict: "Successfully Delivered",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Database"],
    imagePath: "https://kaizen-quest.vercel.app/",
    imageUrl: "/Kaizen.png",
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
  {
    id: "case-005",
    caseNumber: "005",
    title: "Motion Scroll Website",
    description: "An immersive scroll-driven showcase website demonstrating advanced fluid scroll animations, premium typography transitions, and dynamic page motion.",
    category: "Motion Web Template",
    status: "Closed",
    verdict: "Successfully Completed",
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "GSAP", "Tailwind CSS"],
    imagePath: "https://web-template1-rust.vercel.app/",
    imageUrl: "/Motion scroll website.png",
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
