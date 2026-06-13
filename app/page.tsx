import Intro from "@/components/intro";
import Projects from "@/components/projects";
import ExperimentLab from "@/components/experiment-lab";
import Skills from "@/components/skills";
import Pitchdeck from "@/components/pitchdeck";
import KnowledgeGarden from "@/components/knowledge-garden";
import Experience from "@/components/experience";
import Certificates from "@/components/certificates";
import Verdict from "@/components/verdict";
import Contact from "@/components/contact";
import CommandPalette from "@/components/command-palette";
import TerminalWidget from "@/components/terminal-widget";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* Bio / Dossier Intro */}
      <Intro />
      
      {/* Featured Projects / Case Files */}
      <Projects />
      
      {/* Skills Assessment Matrix */}
      <Skills />

      {/* Games & Prototypes / Experiment Lab */}
      <ExperimentLab />

      {/* Strategic Briefing / Pitch Deck */}
      <Pitchdeck />
      
      {/* Blog & Essays / Knowledge Garden */}
      <KnowledgeGarden />
      
      {/* Chronological Journey / Timeline */}
      <Experience />

      {/* Credentials Exhibits / Certificates */}
      <Certificates />

      {/* Dynamic Legal Order / Verdict Card */}
      <Verdict />

      {/* Deposition Contact Form / Contact */}
      <Contact />

      {/* Floating Utilities */}
      <CommandPalette />
      <TerminalWidget />
    </main>
  );
}
