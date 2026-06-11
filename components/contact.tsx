"use client";

import React, { useRef } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { useCaseFile } from "@/context/case-file-context";
import clsx from "clsx";

export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.5);
  const { caseFileMode } = useCaseFile();
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
        {caseFileMode ? "DEPOSITION REQUEST // CONTACT" : "Contact Me"}
      </SectionHeading>

      <p className={clsx(
        "-mt-6 leading-relaxed",
        caseFileMode
          ? "font-mono text-xs text-[#7c6344] dark:text-[#a0896d] uppercase"
          : "text-zinc-600 dark:text-zinc-400"
      )}>
        {caseFileMode ? (
          <>
            TO ALL PARTIES: YOU ARE HEREBY REQUESTED TO TRANSMIT WRITTEN INQUIRIES OR DEPOSITIONS DIRECTLY TO{" "}
            <a className="underline font-bold text-red-650" href="mailto:thepremsingh2111@gmail.com">
              thepremsingh2111@gmail.com
            </a>{" "}
            OR VIA THE LOG ENTRY SHEETS BELOW.
          </>
        ) : (
          <>
            Please contact me directly at{" "}
            <a className="underline hover:text-amber-500 transition-colors" href="mailto:thepremsingh2111@gmail.com">
              thepremsingh2111@gmail.com
            </a>{" "}
            or through this form.
          </>
        )}
      </p>

      <form
        ref={formRef}
        className={clsx(
          "mt-10 flex flex-col transition-all duration-300",
          caseFileMode
            ? "font-mono text-xs bg-[#fbf9f3] dark:bg-[#1c1917] p-6 border border-[#c0b090] rounded-lg shadow-sm text-left folder-clip"
            : "dark:text-black"
        )}
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
        {caseFileMode && (
          <label className="text-[10px] text-zinc-400 uppercase font-bold mb-1">
            01 / DEPOSING PARTY EMAIL (SENDER)
          </label>
        )}
        <input
          className={clsx(
            "h-14 px-4 rounded-lg transition-all focus:ring-0 border outline-none",
            caseFileMode
              ? "bg-transparent border-[#cbd2c0] placeholder-[#8a7a60] focus:border-[#dc2626] mb-4 dark:text-white"
              : "borderBlack dark:bg-white dark:bg-opacity-10 dark:focus:bg-opacity-100"
          )}
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder={caseFileMode ? "INSPECTOR_EMAIL@DOMAIN.COM" : "Your email"}
        />

        {caseFileMode && (
          <label className="text-[10px] text-zinc-400 uppercase font-bold mb-1">
            02 / STATEMENT DETAILS (MESSAGE BODY)
          </label>
        )}
        <textarea
          className={clsx(
            "h-52 p-4 rounded-lg transition-all focus:ring-0 border outline-none",
            caseFileMode
              ? "bg-transparent border-[#cbd2c0] placeholder-[#8a7a60] focus:border-[#dc2626] mb-4 dark:text-white"
              : "borderBlack my-3 dark:bg-[#f3f4f6] dark:bg-opacity-10 dark:focus:bg-opacity-100"
          )}
          name="message"
          placeholder={caseFileMode ? "SUBSTANTIVE STATEMENT ENQUIRY..." : "Your message"}
          required
          maxLength={5000}
        />

        <div className={caseFileMode ? "self-end" : "self-center sm:self-start"}>
          <SubmitBtn />
        </div>
      </form>
    </motion.section>
  );
}
