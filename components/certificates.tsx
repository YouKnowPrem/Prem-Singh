"use client";

import React from 'react';
import SectionHeading from './section-heading';
import { certificatesData } from '@/lib/data';
import Certificate from './certificate';
import { useSectionInView } from '@/lib/hooks';

export default function Certificates() {
    const { ref } = useSectionInView("Timeline", 0.3); // Group under Timeline active section scroll

    return (
        <section ref={ref} id='certificates' className='scroll-mt-28 mb-28 px-4 max-w-[50rem] w-full'>
            <SectionHeading>
                CREDENTIAL EVIDENCE EXAMINED
            </SectionHeading>
            <div className="space-y-4">
                {certificatesData.map((cert, index) => (
                    <React.Fragment key={index}>
                        <Certificate {...cert} index={index} />
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
