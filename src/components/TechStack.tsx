"use client";
import { motion } from "framer-motion";
import { Database, Layout, Server, Cpu, Globe, Lock } from "lucide-react";

const techs = [
  { name: "React", icon: Layout },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "TypeScript", icon: Cpu },
  { name: "Next.js", icon: Globe },
  { name: "Auth.js", icon: Lock },
];

export default function TechStack() {
  return (
    <div className="py-10 bg-slate-900/30 border-y border-white/5 overflow-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex w-[200%] gap-12 items-center"
      >
        {[...techs, ...techs].map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default"
          >
            <tech.icon className="text-cyan-400" size={28} />
            <span className="text-2xl font-bold text-slate-500 hover:text-white transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
