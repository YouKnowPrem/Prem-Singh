"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { useCaseFile } from "@/context/case-file-context";
import { FiSearch, FiCalendar, FiClock, FiX, FiCheckCircle } from "react-icons/fi";

type Article = {
  id: string;
  title: string;
  category: "Law" | "Development" | "Experiments" | "Research" | "Thoughts";
  date: string;
  readTime: string;
  summary: string;
  content: string[];
};

const mockArticles: Article[] = [
  {
    id: "art-01",
    title: "The Code is the Law? Smart Contracts and Jurisprudence",
    category: "Law",
    date: "June 08, 2026",
    readTime: "5 min read",
    summary: "An analysis of smart contracts, algorithmic execution, and how traditional contract law rules (offer, acceptance, breach) map onto blockchain consensus models.",
    content: [
      "1. INTRODUCTION // THE RULE OF CODE",
      "For centuries, contract law has relied on statutory interpretation, human intent, and judicial discretion. The emergence of blockchain technology introduced the concept of smart contracts—self-executing agreements with the terms directly written into lines of code. This raises a fundamental legal question: Is code truly law, or is it merely evidentiary proof of an underlying agreement?",
      "2. STATUTORY FORMALITIES VS. CRYPTOGRAPHIC CONSENSUS",
      "Traditional contract formation requires offer, acceptance, consideration, and the meeting of minds (consensus ad idem). A smart contract triggers execution upon receipt of a cryptographic transaction. In legal jurisprudence, we must dissect this action: Does the compilation of bytecode constitute a legally binding offer, or is it an 'invitation to treat'? If an exploit or code bug is executed, is that a breach of contract or merely the execution of the terms as written?",
      "3. REFRACTORING DISPUTE RESOLUTION",
      "Because blockchain transactions are immutable, traditional remedies like rescission or specific performance cannot easily be enforced. Resolving smart contract disputes requires either (a) writing legal 'kill-switches' and multi-signature gates into the source code, or (b) recognizing decentralized arbitration protocols (like Kleros) under statutory arbitration frameworks. Ultimately, code cannot fully replace judicial oversight, but legal frameworks must evolve to interpret algorithmic intent."
    ]
  },
  {
    id: "art-02",
    title: "Digital Governance: Data Protection Laws in the Age of LLMs",
    category: "Research",
    date: "May 24, 2026",
    readTime: "6 min read",
    summary: "Examining how modern privacy compliance frameworks, such as India's DPDP Act, handle unstructured weights, training pipelines, and data retrieval in LLMs.",
    content: [
      "1. COMPLIANCE CHALLENGES IN UNSTRUCTURED NETWORKS",
      "The passage of India's Digital Personal Data Protection (DPDP) Act has established strict guardrails for data fiduciary duties. However, Large Language Models (LLMs) operate on neural network weights rather than indexable databases. When personal data is ingested during pre-training, it becomes compressed into millions of parameters. This makes fulfilling 'the right to erasure' or 'the right to correction' practically impossible without costly retraining.",
      "2. THE DE-IDENTIFICATION DEBATE",
      "Many model builders claim that training data is sufficiently aggregated and de-identified. Yet, research shows that prompt injection and adversarial attacks can trigger 'memorization leakage', leading to the regurgitation of sensitive personal info. Under the DPDP Act, does neural weight compression count as safe de-identification? If a model regurgitates private information, who is liable: the data fiduciary, the model developer, or the user who crafted the query?",
      "3. THE PATH FORWARD FOR DESIGN POLICY",
      "To align machine learning with digital privacy governance, developers must implement (a) differential privacy during gradient updates, (b) machine unlearning protocols to scrub specific parameters, and (c) strict input/output filters. Technology policy must transition from regulating static storage to regulating active inference interfaces."
    ]
  },
  {
    id: "art-03",
    title: "Refactoring Legislation: Statutes as Structured Code",
    category: "Thoughts",
    date: "April 15, 2026",
    readTime: "4 min read",
    summary: "A philosophical exploration of statutory drafting. Can we write laws like software to prevent loopholes, reduce ambiguity, and automate regulatory compliance?",
    content: [
      "1. STATUTES AS INSTRUCTIONS",
      "At their core, legislative statutes are algorithms. They define variables (definitions), specify conditions (if/else), and execute outcomes (penalties or rights). Yet, natural language introduces massive room for ambiguity. By mapping legal statutes to formal logic structures (such as Prolog or custom declarative loops), we can identify structural contradictions and logical dead-ends before a bill is enacted into law.",
      "2. LEGAL IDEs AND SYNTAX CHECKING",
      "Imagine drafting a tax code in an IDE. When a lawyer drafts an exemption, the system runs a static analysis compile-check, flagging: 'Error: Clause 4 contradicts Clause 12; this creates an infinite tax loophole.' By building domain-specific compilers for legal text, we can democratize statutory draft review, ensuring laws are clean, consistent, and logically sound.",
      "3. THE BOUNDARIES OF FORMALIZATION",
      "However, legal systems require an escape valve. Hardcoded algorithms lack equity, empathy, and mercy. Human judges provide the critical 'catch' block in the societal try-catch loop, interpreting laws in the context of changing social norms. The goal is not automated justice, but clean legislative code."
    ]
  }
];

export default function KnowledgeGarden() {
  const { ref } = useSectionInView("Articles", 0.35);
  const { caseFileMode } = useCaseFile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const categories = ["All", "Law", "Research", "Development", "Thoughts"];

  const filteredArticles = mockArticles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <section ref={ref} id="articles" className="scroll-mt-28 mb-28 max-w-[50rem] w-full px-4">
      <SectionHeading>
        {caseFileMode ? "KNOWLEDGE GARDEN // LEGAL & TECH BRIEFS" : "Knowledge Garden"}
      </SectionHeading>

      {/* Filters & Search toolbar */}
      <div className={`p-4 rounded-xl border mb-8 flex flex-col md:flex-row gap-4 items-center justify-between ${
        caseFileMode
          ? "bg-[#ebdcb9]/40 border-[#cbd2c0] font-mono text-xs"
          : "bg-white border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800"
      }`}>
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold transition-all ${
                selectedCategory === cat
                  ? caseFileMode
                    ? "bg-[#dc2626] text-white"
                    : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : caseFileMode
                  ? "bg-[#ebdcb9] text-[#7c6344] hover:bg-[#decfa7] dark:bg-[#3e342a] dark:text-[#a0896d]"
                  : "bg-zinc-100 hover:bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder={caseFileMode ? "SEARCH CASES/REPORTS..." : "Search articles..."}
            className={`w-full pl-9 pr-4 py-1.5 rounded-full text-xs outline-none transition border ${
              caseFileMode
                ? "bg-transparent border-[#c0b090] placeholder-[#8a7a60] focus:border-[#dc2626] text-zinc-950 dark:text-white"
                : "bg-transparent border-zinc-200 dark:border-zinc-800 placeholder-zinc-400 focus:border-zinc-400 focus:ring-0"
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        {filteredArticles.length === 0 ? (
          <div className="text-center font-mono py-12 text-zinc-400 text-xs border border-dashed rounded-xl">
            NO RECORDED DATA MATCHES SELECTION
          </div>
        ) : (
          filteredArticles.map((art) => (
            <motion.article
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className={`p-6 rounded-xl border cursor-pointer hover:shadow-md transition duration-300 relative group flex flex-col justify-between ${
                caseFileMode
                  ? "bg-[#ebdcb9]/20 hover:bg-[#ebdcb9]/40 border-[#cbd2c0]/60 dark:border-[#3a2f26]/60 font-mono text-xs"
                  : "bg-white border-zinc-200 dark:bg-zinc-900/20 dark:border-zinc-800/80"
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="flex items-center gap-4 text-[10px] text-zinc-400 dark:text-zinc-500 mb-2">
                  <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                    caseFileMode ? "bg-[#ebdcb9] text-[#7c6344]" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                  }`}>
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1"><FiCalendar /> {art.date}</span>
                  <span className="flex items-center gap-1"><FiClock /> {art.readTime}</span>
                </div>
                <h3 className={`text-base sm:text-lg font-bold group-hover:text-amber-500 transition-colors mb-2 ${
                  caseFileMode ? "uppercase text-zinc-950 dark:text-white" : "text-zinc-950 dark:text-white font-serif"
                }`}>
                  {art.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-xs sm:text-sm">
                  {art.summary}
                </p>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-amber-500 group-hover:translate-x-1.5 transition-transform duration-300 mt-4 self-start">
                {caseFileMode ? "→ READ BRIEF" : "→ Read article"}
              </div>
            </motion.article>
          ))
        )}
      </div>

      {/* Newsletter signup - Subpoena style in Case File, minimalist in Standard */}
      <div className={`mt-12 p-6 rounded-xl border ${
        caseFileMode
          ? "bg-[#fbf9f3] dark:bg-[#1c1917] border-[#c0b090] font-mono text-xs folder-clip"
          : "bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800"
      }`}>
        <h3 className={`text-sm font-bold uppercase mb-2 ${
          caseFileMode ? "text-zinc-950 dark:text-white" : "text-zinc-900 dark:text-zinc-100"
        }`}>
          {caseFileMode ? "SUBPOENA // WEEKLY DISCOVERY TRANSCRIPTS" : "Subscribe to the newsletter"}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
          {caseFileMode
            ? "REGISTER EMAIL TO AUTOMATICALLY RECEIVE SUBSTANTIVE BRIEFS CONCERNING EMERGING LAWS AND SYSTEM UPGRADES."
            : "Get essays on legal engineering, software design, and recent experiments delivered directly to your inbox."}
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
          <input
            type="email"
            placeholder={caseFileMode ? "INSPECTOR_EMAIL@DOMAIN.COM" : "Enter your email address"}
            required
            className={`px-4 py-2 text-xs rounded-lg border outline-none flex-1 transition ${
              caseFileMode
                ? "bg-transparent border-[#cbd2c0] placeholder-[#8a7a60] focus:border-[#dc2626] dark:text-white"
                : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 placeholder-zinc-550 focus:border-zinc-400"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className={`px-5 py-2 text-xs font-bold uppercase rounded-lg transition-all ${
              caseFileMode
                ? "bg-[#1f1a16] text-[#f5efe2] hover:bg-black"
                : "bg-zinc-900 text-white hover:bg-zinc-950 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            }`}
          >
            {isSubscribed ? "SUBSCRIBED" : "REGISTER"}
          </button>
        </form>
        {isSubscribed && (
          <div className="flex items-center gap-2 mt-2 text-green-600 font-mono text-[10px] uppercase font-bold animate-pulse">
            <FiCheckCircle />
            <span>Registration Logged. Check your mail fiduciary.</span>
          </div>
        )}
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            {/* Backdrop close */}
            <div className="absolute inset-0" onClick={() => setActiveArticle(null)} />

            {/* Reader Card */}
            <motion.div
              className={`relative w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border transition-all ${
                caseFileMode
                  ? "bg-[#fdfbf7] dark:bg-[#1e1b19] border-[#c0b090] font-mono text-xs text-zinc-950 dark:text-[#ebdcd0]"
                  : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
              }`}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              {/* Header bar */}
              <div className={`flex items-center justify-between px-6 py-4 border-b shrink-0 ${
                caseFileMode
                  ? "bg-[#f5efe2] dark:bg-[#251f19] border-[#cbd2c0] dark:border-[#3a2f26]"
                  : "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-100 dark:border-zinc-900"
              }`}>
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  <span>📂 {activeArticle.category} BRIEF</span>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className={`p-1 rounded transition ${
                    caseFileMode ? "hover:bg-[#ebdcb9] text-[#7c6344]" : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500"
                  }`}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Reader Body (Legalpad pleading styling in case file mode) */}
              <div className={`flex-1 overflow-y-auto p-6 sm:p-10 ${caseFileMode ? "legal-pleading" : ""}`}>
                <h1 className={`text-xl sm:text-2xl font-black mb-6 leading-tight ${
                  caseFileMode ? "uppercase text-zinc-950 dark:text-white" : "font-serif text-zinc-950 dark:text-white"
                }`}>
                  {activeArticle.title}
                </h1>

                {/* Subtitle details */}
                <div className="flex items-center gap-4 text-[10px] text-zinc-400 mb-8 font-mono">
                  <span>LOGGED: {activeArticle.date}</span>
                  <span>TIME: {activeArticle.readTime}</span>
                </div>

                {/* Paragraph segments */}
                <div className={`space-y-6 ${caseFileMode ? "font-mono" : "font-serif text-sm sm:text-base leading-relaxed text-zinc-750 dark:text-zinc-300"}`}>
                  {activeArticle.content.map((p, index) => {
                    const isTitle = p.startsWith("1.") || p.startsWith("2.") || p.startsWith("3.");
                    return (
                      <p
                        key={index}
                        className={isTitle ? "font-bold text-zinc-950 dark:text-white uppercase tracking-wider pt-2" : ""}
                      >
                        {p}
                      </p>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
