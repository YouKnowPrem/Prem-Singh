import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Games from "@/components/games";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import Certificates from "@/components/certificates";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Games />
      <Skills />
      <Experience />
      <SectionDivider />
      <Certificates />
      <Contact />
    </main>
  );
}
