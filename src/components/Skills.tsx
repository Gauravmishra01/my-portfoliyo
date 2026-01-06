"use client";
import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  Globe,
  Cpu,
  Database,
  Layout,
  Server,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    color: "text-blue-400",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "Python", "Go", "Rest API"],
    color: "text-emerald-400",
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    color: "text-purple-400",
  },
  {
    title: "DevOps",
    icon: Terminal,
    skills: ["Docker", "AWS", "GitHub Actions", "Vercel", "Linux"],
    color: "text-orange-400",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Technical Toolkit
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          The technologies and tools I use to bring digital products to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors"
          >
            <category.icon className={`${category.color} mb-6`} size={32} />
            <h3 className="text-xl font-bold text-white mb-4">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-slate-300 border border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
