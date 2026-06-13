"use client";

import React, { useState } from 'react';
import SectionHeading from './section-heading';
import { certificatesData } from '@/lib/data';
import Certificate from './certificate';
import { useSectionInView } from '@/lib/hooks';
import clsx from 'clsx';

export default function Certificates() {
    const { ref } = useSectionInView("Timeline", 0.3); // Group under Timeline active section scroll
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const categories = ["All", "Pitch Decks", "Offer Letters", "Certificates"] as const;

    const filteredCerts = certificatesData.filter((cert) => {
        if (selectedCategory === "All") return true;
        if (selectedCategory === "Pitch Decks") return cert.category === "Pitch Deck";
        if (selectedCategory === "Offer Letters") return cert.category === "Offer Letter";
        if (selectedCategory === "Certificates") return cert.category === "Certificate";
        return true;
    });

    return (
        <section ref={ref} id='certificates' className='scroll-mt-28 mb-28 px-4 max-w-[50rem] w-full'>
            <SectionHeading>
                CREDENTIAL EVIDENCE CABINET // VERIFIED EXHIBITS
            </SectionHeading>

            {/* Folder tab filtering console */}
            <div className="p-4 rounded-xl border mb-6 flex justify-center bg-[#ebdcb9]/40 border-[#cbd2c0] dark:bg-[#2d251e]/40 dark:border-[#3a2f26] font-mono text-xs">
                <div className="flex flex-wrap gap-1.5 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={clsx(
                                "px-3 py-1 rounded-full text-[10px] uppercase font-bold transition-all",
                                selectedCategory === cat
                                    ? "bg-[#dc2626] text-white"
                                    : "bg-[#ebdcb9] text-[#7c6344] hover:bg-[#decfa7] dark:bg-[#3e342a] dark:text-[#a0896d]"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Document Exhibit list */}
            <div className="space-y-4">
                {filteredCerts.map((cert, index) => {
                    // Find actual original index for proper exhibit numbering label
                    const actualIndex = certificatesData.findIndex(c => c.title === cert.title);
                    return (
                        <React.Fragment key={cert.title}>
                            <Certificate {...cert} index={actualIndex} />
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
}
