"use client";


import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight, BsGithub, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { SiLeetcode } from "react-icons/si";


export default function Intro() {

    const { ref } = useSectionInView("Home", 0.5);
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
    return (
        <section
            ref={ref} id='home'
            className='relative mb-28 max-w-[50rem] text-center 
        sm:mb-0 scroll-mt-[100rem] overflow-hidden'
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
            </div>
            <div className='flex items-center justify-center'>
                <div className='relative'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "tween",
                            duration: 0.2,
                        }}
                    >
                        <Image
                            src="/photo.png" alt="Prem"
                            width="320"
                            height="320"
                            quality="95"
                            priority={true}
                            className='h-40 w-40 rounded-full object-cover 
                        border-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-500
                        shadow-2xl ring-4 ring-purple-200 ring-opacity-50
                        hover:scale-105 transition-transform duration-300'
                        />
                    </motion.div>
                    <motion.span className='absolute bottom-0 right-0 text-4xl'
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 125,
                            delay: 0.1,
                            duration: 0.7,
                        }}
                    >
                        👋
                    </motion.span>
                </div>
            </div>
            <motion.h1
                className='mb-10 mt-4 px-4 text-2xl 
            font-medium !leading-[1.5] 
            sm:text-4xl'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className='font-handwriting text-5xl sm:text-6xl gradient-text-warm font-bold'>Hello, I'm Prem</span>
                <span className='text-3xl sm:text-4xl'> — </span>
                <span>a </span>
                <span className='font-bold'>law student</span>
                <span> and </span>
                <span className='font-bold italic text-blue-600 dark:text-blue-400'>web design enthusiast</span>
                <span>, passionate about blending </span>
                <span className='font-bold'>creativity</span>
                <span> with </span>
                <span className='italic'>critical thinking</span>
                <span>. I also enjoy </span>
                <span className='font-bold text-purple-600 dark:text-purple-400'>chess</span>
                <span>, </span>
                <span className='font-bold italic text-green-600 dark:text-green-400'>CODM</span>
                <span>, and </span>
                <span className='italic'>other games</span>
                <span>.</span>
            </motion.h1>
            <motion.div
                className='flex flex-col sm:flex-row items-center justify-center 
            gap-4 
            px-4 text-lg font-medium'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.1,
                }}
            >
                <Link
                    href="#contact"
                    className='group bg-gray-900 text-white px-7 py-3 flex 
                items-center gap-2 rounded-full outline-none 
                focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105
                transition cursor-pointer borderBlack dark:bg-white dark:bg-opacity-10'
                    onClick={() => {
                        setActiveSection("Contact");
                        setTimeOfLastClick(Date.now());
                    }}
                >
                    Contact me here
                    <BsArrowRight className='opacity-70 group-hover:translate-x-1 transition' />
                </Link>
                <a
                    className='group bg-white px-7 py-3 flex items-center 
                gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 
                active:scale-105 transition cursor-pointer borderBlack 
                dark:bg-white/10'
                    href='/myResume.pdf'
                    download
                >
                    Download CV (not made yet)
                    <HiDownload className='opacity-60 group-hover:translate-y-1 transition' />
                </a>
                <a
                    className='bg-white p-4 text-gray-700 flex items-center 
                gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] 
                active:scale-105 transition cursor-pointer borderBlack 
                dark:bg-white/10 dark:text-white/60'
                    href='https://linkedin.com/in/yourprofile' target='_blank'
                >
                    <BsLinkedin />
                </a>
                <a
                    className='bg-white p-4 text-gray-700 flex items-center 
                gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] 
                active:scale-105 transition cursor-pointer borderBlack 
                dark:bg-white/10 dark:text-white/60'
                    href='https://github.com/youknowprem' target='_blank'
                >
                    <BsGithub />
                </a>
            </motion.div>
        </section>
    )
}


