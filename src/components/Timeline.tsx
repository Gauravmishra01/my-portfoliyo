"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    title: "President & Lead Developer",
    company: "XDev Club",
    date: "2025 - Present",
    desc: "Developed and optimized applications in collaboration with a team, focusing on functionality and efficiency. Engaged in coding, debugging, and performance enhancements while contributing to knowledge-sharing sessions and workshops on advanced development practices.",
    type: "work",
  },
  {
    title: "Fullstack Developer Summer Internship",
    company: "Staxtech",
    date: "2025 - 2025",
    desc: "As a Full-Stack Developer Intern, I built and optimized end-to-end web applications using React, Node.js, and MongoDB. I collaborated with teams to develop responsive UIs, backend APIs, and gained hands-on experience across the full development lifecycle.",
    type: "work",
  },
  {
    title: "Master of Computer Applications",
    company: "Manav Rachna International Institute Of Research And Studies",
    date: "2024 - 2026",
    desc: "Pursuing advanced studies in computer applications with a focus on software development and system design.",
    type: "education",
  },
  {
    title: "Bachelor of Computer Applications",
    company: "Maharshi Dayanand University",
    date: "2020 - 2023",
    desc: "Specialized in Software Engineering and Database Management Systems.",
    type: "education",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth out the scroll progress for the drawing line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 relative max-w-4xl mx-auto px-4"
    >
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
        <p className="text-slate-400">My professional journey and education.</p>
      </div>

      <div className="relative">
        {/* The Animated Vertical Line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-4 md:left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent origin-top transform md:-translate-x-1/2"
        />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center justify-between w-full mb-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Desktop Empty Space for alignment */}
              <div className="hidden md:block w-[45%]" />

              {/* Central Icon/Dot */}
              <div className="absolute left-4 md:left-1/2 z-20 w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                {exp.type === "work" ? (
                  <Briefcase className="text-cyan-400" size={14} />
                ) : (
                  <GraduationCap className="text-purple-400" size={14} />
                )}
              </div>

              {/* Content Card */}
              <div className="ml-12 md:ml-0 md:w-[45%] p-6 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">
                  {exp.date}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {exp.title}
                </h3>
                <p className="text-slate-300 font-medium mb-2">{exp.company}</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
