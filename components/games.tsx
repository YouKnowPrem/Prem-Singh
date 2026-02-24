"use client";

import React, { useEffect } from 'react';
import SectionHeading from './section-heading';
import { gamesData } from '@/lib/data';
import GameCard from './game-card';
import { useInView } from 'react-intersection-observer';
import { useActiveSectionContext } from '@/context/active-section-context';
import { motion } from 'framer-motion';

export default function Games() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { setActiveSection } = useActiveSectionContext();

  useEffect(() => {
    if (inView) {
      setActiveSection("Games");
    }
  }, [inView, setActiveSection]);

  return (
    <section ref={ref} id='games' className='scroll-mt-28 mb-28'>
      <SectionHeading>My Games</SectionHeading>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {gamesData.map((game, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100 
            }}
          >
            <GameCard {...game} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}