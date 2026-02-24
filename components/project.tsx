"use client";

import React, { useRef } from 'react';
import { projectsData } from '@/lib/data'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion';
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';

type ProjectProps = (typeof projectsData)[number] & {
    imagePath: string;
    index: number;
    totalLength: number;
};

export default function Project({ title, description, tags, imageUrl, imagePath, index, totalLength }:
    ProjectProps) {
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
                top: `calc(20vh + ${index * 30}px)`
            }}
            className='group mb-6 sm:mb-8 last:mb-0 sm:sticky tracking-tighter'
        >
            <Link
                href={imagePath}
                target="_blank"
                rel="noopener noreferrer"
            >
                <section
                    className='group bg-gray-100 max-w-[42rem] border 
                    border-black/5 overflow-hidden 
                    relative hover:bg-gray-200 
                    transition-all duration-300 rounded-xl
                    dark:text-white dark:bg-white/10 
                    dark:hover:bg-white/20 hover:shadow-lg
                    flex flex-col sm:flex-row sm:h-[20rem]
                    group-even:sm:flex-row-reverse'
                >
                    {/* Mobile Image */}
                    <div className="relative h-48 sm:hidden overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            quality={95}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <HiExternalLink className="absolute top-4 right-4 w-6 h-6 text-white drop-shadow-lg" />
                    </div>

                    {/* Content */}
                    <div
                        className='pt-4 pb-6 px-5 sm:pt-10 sm:pb-7 sm:px-10
                        sm:max-w-[50%] flex flex-col 
                        h-full justify-between'
                    >
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <h3 className='text-xl sm:text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                                    {title}
                                </h3>
                                <HiExternalLink className="hidden sm:block w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" />
                            </div>
                            <p
                                className='mt-2 leading-relaxed text-gray-700 
                                dark:text-white/70 text-sm sm:text-base'
                            >
                                {description}
                            </p>
                        </div>

                        <ul
                            className='flex flex-wrap mt-4 gap-2 
                            sm:mt-auto'
                        >
                            {tags.map((tag, index) => (
                                <li
                                    className='bg-black/[0.7] px-2 py-1 text-[0.65rem] sm:text-[0.7rem]
                                    uppercase 
                                    tracking-wider text-white rounded-full dark:text-white/70'
                                    key={index}
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop Image */}
                    <Image
                        src={imageUrl} alt={title} quality={95}
                        className='absolute hidden sm:block top-8 -right-40 w-[28.25rem] object-cover
                        rounded-t-lg shadow-2xl
                        transition-all duration-300
                        group-hover:scale-[1.04] 
                        group-hover:-translate-x-3
                        group-hover:-translate-y-3
                        group-hover:rotate-2
                        group-even:group-hover:-translate-x-3
                        group-even:group-hover:-translate-y-3
                        group-even:group-hover:rotate-2
                        group-even:right-[initial] 
                        group-even:-left-40'
                    />
                </section>
            </Link>
        </motion.div>
    );
}



