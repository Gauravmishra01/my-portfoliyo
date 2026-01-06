import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack"; // Added previously
import Projects from "@/components/Projects";
import Skills from "@/components/Skills"; // New
import Timeline from "@/components/Timeline";

import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <TechStack />
      <div className="space-y-12">
        <Projects />
        <Skills />
        <Timeline />

        <Contact />
      </div>
    </main>
  );
}
