"use client";

import React, { useRef } from 'react';
import { certificatesData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type CertificateProps = (typeof certificatesData)[number] & {
    index: number;
};

export default function Certificate({ title, description, tags, imageUrl, imagePath, index }:
    CertificateProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(ref.current, {
            scrollTrigger: {
                trigger: ref.current,
                start: "top bottom-=100",
                end: "center center",
                scrub: true,
            },
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 1
        });
    }, { scope: ref });

    return (
        <div ref={ref} className='group mb-6 sm:mb-8 last:mb-0'>
            <Link href={imagePath} target="_blank" rel="noopener noreferrer">
                <section
                    className='group bg-gray-100 max-w-[42rem] border 
                    border-black/5 overflow-hidden 
                    relative hover:bg-gray-200 
                    transition-all duration-300 rounded-xl
                    dark:text-white dark:bg-white/10 
                    dark:hover:bg-white/20 hover:shadow-lg
                    flex flex-col sm:flex-row sm:h-[16rem]'
                >
                    <div className="relative h-48 sm:h-full sm:w-[16rem] overflow-hidden flex-shrink-0">
                        <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" quality={95} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:hidden" />
                        <HiExternalLink className="absolute top-4 right-4 w-6 h-6 text-white drop-shadow-lg sm:hidden" />
                    </div>

                    <div className='pt-4 pb-6 px-5 sm:px-8 flex flex-col h-full justify-between flex-grow'>
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <h3 className='text-xl sm:text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                                    {title}
                                </h3>
                                <HiExternalLink className="hidden sm:block w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" />
                            </div>
                            <p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70 text-sm sm:text-base'>
                                {description}
                            </p>
                        </div>
                        <ul className='flex flex-wrap mt-4 gap-2'>
                            {tags.map((tag, i) => (
                                <li className='bg-black/[0.7] px-2 py-1 text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70' key={i}>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </Link>
        </div>
    );
}
