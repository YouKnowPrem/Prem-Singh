
"use client";

import React from "react";
import { motion } from "framer-motion";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <motion.h2 
      className='text-3xl sm:text-4xl font-medium capitalize 
      mb-8 sm:mb-12 text-center'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    >
      {children}
    </motion.h2>
  );
}
