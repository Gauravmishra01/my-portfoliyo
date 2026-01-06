"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component

interface Project {
  id: number;
  title: string;
  category: string;
  className: string;
  gradient: string;
  liveLink: string;
  githubLink: string;
  image: string; // Added image property
}

const projects: Project[] = [
  {
    id: 1,
    title: "📍Realtime Tracker",
    category: "Node.js • Express.js • Socket.io",
    className: "md:col-span-2",
    gradient: "from-cyan-500/20 to-blue-500/20",
    liveLink: "https://realtime-tracker-2z3j.onrender.com/",
    githubLink: "https://github.com/Gauravmishra01/Realtime_Tracker",
    image: "/projects/tracker.jpg", // Path to image in your public folder
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
    category: "React • Vite • TailwindCSS • Express • Groq • Node.js • MongoDB",
    className: "md:col-span-1",
    gradient: "from-emerald-500/20 to-green-500/20",
    liveLink: "https://ai-startup-validator-five.vercel.app/",
    githubLink: "https://github.com/Gauravmishra01/ai-startup-validator",
    image: "/projects/startup.jpg",
  },
  {
    id: 4,
    title: "🛒 Ekart E-commerce Platform",
    category: "React • Vite • TailwindCSS • Express • Node.js • MongoDB",
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
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-6 ${project.className} group`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm mt-2">{project.category}</p>
          </div>

          <div className="flex gap-2">
            <Link
              href={project.githubLink}
              target="_blank"
              className="p-2 bg-white/5 hover:bg-white/20 rounded-full text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              <Github size={20} />
            </Link>
            <Link
              href={project.liveLink}
              target="_blank"
              className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full text-cyan-400 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
            >
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>

        {/* Improved Project Preview with Next.js Image */}
        <Link
          href={project.liveLink}
          target="_blank"
          className="block mt-8 overflow-hidden rounded-xl border border-white/5 group/preview relative"
        >
          <div className="w-full h-48 relative overflow-hidden">
            {/* Image component for optimization */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-60 group-hover/preview:opacity-100 group-hover/preview:scale-110 transition-all duration-500"
            />
            {/* Overlay for "Click to View" on hover */}
            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity">
              <span className="text-white text-xs font-bold uppercase tracking-widest bg-slate-900/80 px-4 py-2 rounded-full border border-white/10">
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
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Selected Work
        </h2>
        <p className="text-slate-400 text-lg">
          A collection of fullstack experiments and production apps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
