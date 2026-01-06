"use client";

import { useEffect, useState, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

/**
 * Hook: useTypewriter
 * Animates text character by character for a terminal-like feel.
 */
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayText;
};

/**
 * Component: LiveStatus
 * A glowing indicator to show recruiters you are currently available.
 */
const LiveStatus = () => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    </span>
    <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">
      Available for new projects
    </span>
  </div>
);

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const typewriterText = useTypewriter(
    "Building scalable solutions for the modern web.",
    60
  );

  /**
   * Smooth scrolls to a specific element by ID.
   * Ensure your sections have id="projects" and id="contact".
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /**
   * Tracks mouse movement to update the radial spotlight background.
   */
  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4 py-20"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Spotlight Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Grainy Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl text-center">
        <LiveStatus />

        {/* Name Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6"
        >
          Gaurav{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Mishra
          </span>
        </motion.h1>

        {/* Animated Sub-headline */}
        <div className="min-h-[4rem] md:h-12">
          <p className="text-lg md:text-2xl text-slate-400 font-mono max-w-2xl mx-auto">
            {typewriterText}
            <span className="animate-pulse text-cyan-500">_</span>
          </p>
        </div>

        {/* Responsive Button Group */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* View Work Button */}
          <button
            onClick={() => scrollToSection("projects")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            View Work
          </button>

          {/* Contact Button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-500 hover:scale-105 active:scale-95 transition-all"
          >
            Contact Me
          </button>
        </motion.div>
      </div>
    </div>
  );
}