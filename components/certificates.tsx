"use client";

import React, { useEffect } from 'react';
import SectionHeading from './section-heading';
import { certificatesData } from '@/lib/data';
import Certificate from './certificate';
import { useInView } from 'react-intersection-observer';
import { useActiveSectionContext } from '@/context/active-section-context';

export default function Certificates() {
    const { ref, inView } = useInView({ threshold: 0.5 });
    const { setActiveSection } = useActiveSectionContext();

    useEffect(() => {
        if (inView) {
            setActiveSection("Certificates");
        }
    }, [inView, setActiveSection]);

    return (
        <section ref={ref} id='certificates' className='scroll-mt-28 mb-28'>
            <SectionHeading>My Certificates</SectionHeading>
            <div>
                {certificatesData.map((cert, index) => (
                    <React.Fragment key={index}>
                        <Certificate {...cert} index={index} />
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
