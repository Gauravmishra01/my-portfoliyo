"use client";

import { useEffect, useState, MouseEvent, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Github, Linkedin, MousePointer2 } from "lucide-react";

/**
 * Hook: useTypewriter
 * Animates text character by character for a high-end terminal effect.
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
 * Component: Magnetic
 * A reusable wrapper that creates a physical "pull" effect toward the cursor.
 */
const Magnetic = ({
  children,
  distance = 0.3,
}: {
  children: React.ReactNode;
  distance?: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * distance);
    mouseY.set((clientY - centerY) * distance);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
};

export default function Hero() {
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const typewriterText = useTypewriter(
    "Building scalable solutions for the modern web.",
    60
  );

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    spotlightX.set(clientX - left);
    spotlightY.set(clientY - top);
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 px-4 pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* 1. LAYER: GRID BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* 2. LAYER: SPOTLIGHT */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 md:block hidden"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${spotlightX}px ${spotlightY}px,
              rgba(34, 211, 238, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* 3. LAYER: MAIN CONTENT */}
      <div className="relative z-20 w-full max-w-5xl text-center px-4">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 mb-8 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] md:text-xs font-medium text-emerald-400 uppercase tracking-[0.2em]">
            Available for new projects
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]"
        >
          Gaurav{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent block sm:inline">
            Mishra
          </span>
        </motion.h1>

        {/* Description */}
        <div className="min-h-[5rem] flex items-center justify-center mb-10">
          <p className="text-lg md:text-2xl text-slate-400 font-mono max-w-2xl leading-relaxed">
            {typewriterText}
            <span className="animate-pulse text-cyan-500 ml-1">|</span>
          </p>
        </div>

        {/* CTAs with Magnetic Effect */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Magnetic distance={0.2}>
            <button
              onClick={() => scrollToSection("projects")}
              className="group w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30 cursor-pointer"
            >
              Explore Projects
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Magnetic>

          <Magnetic distance={0.2}>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-800 text-white font-bold hover:bg-slate-800 transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
            >
              Get in touch
            </button>
          </Magnetic>
        </div>

        {/* Social Links with Magnetic Icons */}
        <div className="mt-16 flex items-center justify-center gap-8">
          <Magnetic distance={0.5}>
            <a
              href="https://github.com/Gauravmishra01"
              target="_blank"
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-500 hover:text-white transition-colors"
            >
              <Github size={20} /> Github
            </a>
          </Magnetic>

          <div className="w-1 h-1 bg-slate-800 rounded-full" />

          <Magnetic distance={0.5}>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-500 hover:text-white transition-colors"
            >
              <Linkedin size={20} /> LinkedIn
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Bounce Mouse Icon */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 hidden md:block"
      >
        <MousePointer2 size={24} />
      </motion.div>
    </section>
  );
}
