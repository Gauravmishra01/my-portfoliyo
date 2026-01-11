"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  category: string;
  className: string;
  gradient: string;
  liveLink: string;
  githubLink: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "📍Realtime Tracker",
    category: "Node.js • Express.js • Socket.io",
    className: "md:col-span-2", // Spans 2 columns on desktop, 1 on mobile
    gradient: "from-cyan-500/20 to-blue-500/20",
    liveLink: "https://realtime-tracker-2z3j.onrender.com/",
    githubLink: "https://github.com/Gauravmishra01/Realtime_Tracker",
    image: "/projects/tracker.jpg",
  },
  {
    id: 2,
    title: "🐺Wolf Experience",
    category: "Three.js • React • Vite • ESLint",
    className: "md:col-span-1",
    gradient: "from-purple-500/20 to-pink-500/20",
    liveLink: "https://3js-ui-animation.vercel.app/",
    githubLink: "https://github.com/Gauravmishra01/3js_Ui_Animation",
    image: "/projects/wolf.png",
  },
  {
    id: 3,
    title: "🚀 AI Startup Validator",
    category: "React • Vite • TailwindCSS • Groq • MongoDB",
    className: "md:col-span-1",
    gradient: "from-emerald-500/20 to-green-500/20",
    liveLink: "https://ai-startup-validator-five.vercel.app/",
    githubLink: "https://github.com/Gauravmishra01/ai-startup-validator",
    image: "/projects/startup.jpg",
  },
  {
    id: 4,
    title: "🛒 Ekart E-commerce Platform",
    category: "React • Vite • TailwindCSS • Node.js • MongoDB",
    className: "md:col-span-2",
    gradient: "from-orange-500/20 to-red-500/20",
    liveLink: "https://ekart-ecommerce.vercel.app/",
    githubLink: "https://github.com/Gauravmishra01/ekart-ecommerce",
    image: "/projects/ecommerce.jpg",
  },
  {
    id: 4,
    title: "🛒 Ekart E-commerce Platform",
    category: "React • Vite • TailwindCSS • Node.js • MongoDB",
    className: "md:col-span-2",
    gradient: "from-orange-500/20 to-red-500/20",
    liveLink: "https://ekart-ecommerce.vercel.app/",
    githubLink: "https://github.com/Gauravmishra01/ekart-ecommerce",
    image: "/projects/ecommerce.jpg",
  },
  {
    id: 4,
    title: "🛒 Ekart E-commerce Platform",
    category: "React • Vite • TailwindCSS • Node.js • MongoDB",
    className: "md:col-span-2",
    gradient: "from-orange-500/20 to-red-500/20",
    liveLink: "https://ekart-ecommerce.vercel.app/",
    githubLink: "https://github.com/Gauravmishra01/ekart-ecommerce",
    image: "/projects/ecommerce.jpg",
  },
];

const Card = ({ project }: { project: Project }) => {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      whileHover={{ scale: 1.01 }}
      className={`relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-5 md:p-6 ${project.className} group flex flex-col justify-between`}
    >
      {/* Dynamic Background Gradient on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full min-h-[280px] md:min-h-[320px]">
        {/* Header Section: Title & Category */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium">
              {project.category}
            </p>
          </div>

          {/* Action Icons */}
          <div className="flex gap-2 shrink-0">
            <Link
              href={project.githubLink}
              target="_blank"
              aria-label="GitHub Repository"
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <Github size={18} />
            </Link>
            <Link
              href={project.liveLink}
              target="_blank"
              aria-label="Live Demo"
              className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full text-cyan-400 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Image Preview Area */}
        <Link
          href={project.liveLink}
          target="_blank"
          className="block mt-6 overflow-hidden rounded-2xl border border-white/5 group/preview relative aspect-video sm:aspect-auto sm:h-44 md:h-52"
        >
          <div className="w-full h-full relative">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover opacity-70 group-hover/preview:opacity-100 group-hover/preview:scale-105 transition-all duration-700 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Mobile-friendly overlay (always visible or on-tap) */}
            <div className="absolute inset-0 bg-slate-950/20 md:bg-slate-950/40 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity">
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest bg-slate-900/90 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                View Live Project
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 md:py-32 px-4 max-w-7xl mx-auto scroll-mt-20"
    >
      <div className="mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Selected <span className="text-cyan-400 italic">Work</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl">
            A collection of fullstack experiments, 3D experiences, and
            production-ready applications.
          </p>
        </motion.div>
      </div>

      {/* Grid: 1 column on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={project.className}
          >
            <Card project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
