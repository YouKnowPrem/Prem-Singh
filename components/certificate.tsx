"use client";

import React from 'react';
import { certificatesData } from '@/lib/data'
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type CertificateProps = (typeof certificatesData)[number] & {
    index: number;
};

export default function Certificate({ title, description, tags, imagePath, category, index }:
    CertificateProps) {

    const getStampDetails = () => {
        switch (category) {
            case "Pitch Deck":
                return { text: "PITCH DECK", className: "case-stamp-blue" };
            case "Offer Letter":
                return { text: "OFFER LETTER", className: "case-stamp-red" };
            case "Certificate":
            default:
                return { text: "VERIFIED", className: "case-stamp-green" };
        }
    };
    
    const stamp = getStampDetails();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group mb-4 last:mb-0 font-mono text-xs"
        >
            <Link href={imagePath} target="_blank" rel="noopener noreferrer">
                <section className="bg-[#fdfcf7] hover:bg-[#f8f6ee] dark:bg-[#1e1b19] dark:hover:bg-[#25211e] border border-[#cbd2c0] dark:border-[#3a2f26] p-4 rounded-lg flex flex-col sm:flex-row gap-4 items-center justify-between transition-colors shadow-sm">
                    <div className="flex items-center gap-3">
                        <span className={clsx("case-stamp shrink-0 scale-90 font-black tracking-widest", stamp.className)}>
                            {stamp.text}
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
        </motion.div>
    );
}
