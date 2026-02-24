"use client";

import React, { useRef } from 'react';
import { gamesData } from '@/lib/data';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import Link from 'next/link';
import { HiPlay, HiExternalLink } from 'react-icons/hi';

type GameCardProps = (typeof gamesData)[number];

export default function GameCard({ 
  title, 
  description, 
  tags, 
  imageUrl, 
  imagePath, 
  category 
}: GameCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group"
    >
      <Link href={imagePath} target="_blank" rel="noopener noreferrer">
        <div className="relative bg-white dark:bg-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-black/5 dark:border-white/10 group-hover:border-black/10 dark:group-hover:border-white/20">
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-black/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
            <motion.div
              className="bg-white/90 dark:bg-gray-900/90 rounded-full p-4 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiPlay className="w-8 h-8 text-gray-900 dark:text-white ml-1" />
            </motion.div>
          </div>

          {/* Game Image */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              quality={95}
            />
          </div>

          {/* Game Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              <HiExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" />
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}