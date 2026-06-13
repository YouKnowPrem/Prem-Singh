"use client";

import React, { useRef } from 'react';
import { certificatesData } from '@/lib/data'
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type CertificateProps = (typeof certificatesData)[number] & {
    index: number;
};

export default function Certificate({ title, description, tags, imagePath, index }:
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
                            <p className="text-zinc-550 dark:text-zinc-400 text-[10px] mt-0.5 uppercase">
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
