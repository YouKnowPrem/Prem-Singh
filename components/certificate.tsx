"use client";

import React, { useRef } from 'react';
import { certificatesData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCaseFile } from '@/context/case-file-context';

gsap.registerPlugin(ScrollTrigger);

type CertificateProps = (typeof certificatesData)[number] & {
    index: number;
};

export default function Certificate({ title, description, tags, imageUrl, imagePath, index }:
    CertificateProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { caseFileMode } = useCaseFile();

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

    if (caseFileMode) {
        // --- CASE FILE MODE: Verified Exhibit Credential ---
        return (
            <div ref={ref} className="group mb-4 last:mb-0 font-mono text-xs">
                <Link href={imagePath} target="_blank" rel="noopener noreferrer">
                    <section className="bg-[#fdfcf7] hover:bg-[#f8f6ee] dark:bg-[#1e1b19] dark:hover:bg-[#25211e] border border-[#cbd2c0] dark:border-[#3a2f26] p-4 rounded-lg flex flex-col sm:flex-row gap-4 items-center justify-between transition-colors shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className="case-stamp case-stamp-green shrink-0 scale-90">
                                VERIFIED
                            </span>
                            <div>
                                <h3 className="font-black uppercase text-zinc-950 dark:text-white flex items-center gap-1 hover:text-amber-500 transition-colors">
                                    EXHIBIT C-0{index + 1}: {title}
                                    <HiExternalLink className="w-3.5 h-3.5" />
                                </h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-[10px] mt-0.5 uppercase">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                            {tags.map((tag, i) => (
                                <span key={i} className="bg-[#ebdcb9] text-[#7c6344] dark:bg-[#3e342a] dark:text-[#a0896d] px-1.5 py-0.5 rounded text-[9px] uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </section>
                </Link>
            </div>
        );
    }

    // --- STANDARD MODE: Sleek publication-style card ---
    return (
        <div ref={ref} className='group mb-4 last:mb-0'>
            <Link href={imagePath} target="_blank" rel="noopener noreferrer">
                <section
                    className='group bg-white max-w-[50rem] border border-zinc-200/60 overflow-hidden relative hover:bg-zinc-50 transition-all duration-300 rounded-xl dark:text-white dark:bg-zinc-900/50 dark:border-zinc-800 dark:hover:bg-zinc-850 hover:shadow-md flex flex-col sm:flex-row sm:h-[10rem]'
                >
                    <div className="relative h-36 sm:h-full sm:w-[12rem] overflow-hidden flex-shrink-0">
                        <Image 
                            src={typeof imageUrl === 'string' && imageUrl.startsWith("public/") ? "/" + imageUrl.substring(7) : imageUrl} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                            quality={95} 
                            sizes="192px" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent sm:hidden" />
                        <HiExternalLink className="absolute top-3 right-3 w-5 h-5 text-white drop-shadow-md sm:hidden" />
                    </div>

                    <div className='p-5 flex flex-col justify-between flex-grow h-full'>
                        <div>
                            <div className="flex items-start justify-between">
                                <h3 className='text-base sm:text-lg font-bold text-zinc-950 dark:text-white group-hover:text-amber-500 transition-colors flex items-center gap-1.5'>
                                    {title}
                                    <HiExternalLink className="hidden sm:block w-4 h-4 text-zinc-400 group-hover:text-amber-500 transition-colors" />
                                </h3>
                            </div>
                            <p className='mt-1 leading-relaxed text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm'>
                                {description}
                            </p>
                        </div>
                        <ul className='flex flex-wrap gap-1.5 mt-3 sm:mt-0'>
                            {tags.map((tag, i) => (
                                <li className='bg-zinc-100 px-2 py-0.5 text-[9px] uppercase tracking-wider text-zinc-500 rounded border border-zinc-200/10 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-800' key={i}>
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
