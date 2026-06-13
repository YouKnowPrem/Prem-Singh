"use client";

import React, { useRef } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.5);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>
        DEPOSITION REQUEST // CONTACT
      </SectionHeading>

      <p className="-mt-6 leading-relaxed font-mono text-xs text-[#7c6344] dark:text-[#a0896d] uppercase">
        TO ALL PARTIES: YOU ARE HEREBY REQUESTED TO TRANSMIT WRITTEN INQUIRIES OR DEPOSITIONS DIRECTLY TO{" "}
        <a className="underline font-bold text-red-650" href="mailto:thepremsingh2111@gmail.com">
          thepremsingh2111@gmail.com
        </a>{" "}
        OR VIA THE LOG ENTRY SHEETS BELOW.
      </p>

      <form
        ref={formRef}
        className="mt-10 flex flex-col transition-all duration-300 font-mono text-xs bg-[#fbf9f3] dark:bg-[#1c1917] p-6 border border-[#c0b090] dark:border-[#4d4033] rounded-lg shadow-sm text-left folder-clip"
        action={async (formData) => {
          const { error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }
          toast.success("Deposition logged successfully!");
          
          if (formRef.current) {
            formRef.current.reset();
          }
        }}
      >
        <label className="text-[10px] text-zinc-400 uppercase font-bold mb-1">
          01 / DEPOSING PARTY EMAIL (SENDER)
        </label>
        <input
          className="h-14 px-4 rounded-lg transition-all focus:ring-0 border outline-none bg-transparent border-[#cbd2c0] dark:border-[#4d4033] placeholder-[#8a7a60]/50 focus:border-[#dc2626] mb-4 dark:text-white"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="INSPECTOR_EMAIL@DOMAIN.COM"
        />

        <label className="text-[10px] text-zinc-400 uppercase font-bold mb-1">
          02 / STATEMENT DETAILS (MESSAGE BODY)
        </label>
        <textarea
          className="h-52 p-4 rounded-lg transition-all focus:ring-0 border outline-none bg-transparent border-[#cbd2c0] dark:border-[#4d4033] placeholder-[#8a7a60]/50 focus:border-[#dc2626] mb-4 dark:text-white"
          name="message"
          placeholder="SUBSTANTIVE STATEMENT ENQUIRY..."
          required
          maxLength={5000}
        />

        <div className="self-end">
          <SubmitBtn />
        </div>
      </form>
    </motion.section>
  );
}
