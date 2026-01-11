"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";

/**
 * Component: CustomCursor
 * Performance Optimized: Uses MotionValues to avoid React state re-renders on every mouse move.
 */
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const edgeX = useSpring(cursorX, springConfig);
  const edgeY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{ x: edgeX, y: edgeY }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-500 pointer-events-none z-[9999] hidden md:block"
    />
  );
}

// Variants for scroll-based entrance
const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
  },
};

export default function Home() {
  return (
    <main className="relative bg-slate-950 min-h-screen selection:bg-cyan-500/30 overflow-x-hidden">
      {/* 1. Global Interactive Elements */}
      <CustomCursor />
      <Navbar />

      {/* 2. Hero Section - Immediate Entrance for LCP */}
      <Hero />

      {/* 3. Infinite Marquee Tech Stack */}
      <section className="py-10">
        <TechStack />
      </section>

      {/* 4. Main Content Sections with Scroll Reveal */}
      <div className="space-y-24 pb-24">
        <SectionWrapper>
          <Projects />
        </SectionWrapper>
        <SectionWrapper>
          <Skills />
        </SectionWrapper>
        <SectionWrapper>
          <Timeline />
        </SectionWrapper>
        <SectionWrapper>
          <Contact />
        </SectionWrapper>
      </div>

      {/* 5. Footer */}
      <footer className="py-10 text-center text-slate-600 text-xs font-mono border-t border-white/5">
        © {new Date().getFullYear()} Gaurav Mishra • Built with Next.js & Framer
        Motion
      </footer>
    </main>
  );
}

/**
 * Helper Component: SectionWrapper
 * Ensures sections animate in only when they enter the user's viewport.
 */
function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}
