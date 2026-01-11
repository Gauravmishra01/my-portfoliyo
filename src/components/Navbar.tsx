"use client";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Mail } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", icon: Home, href: "#hero" },
  { name: "Work", icon: Briefcase, href: "#projects" },
  { name: "About", icon: User, href: "#about" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        /* Added max-w-fit to prevent stretching and responsive gap/padding */
        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/10 bg-slate-950/40 backdrop-blur-lg shadow-lg shadow-cyan-500/10 transition-all duration-300"
      >
        {/* Branding/Initials - Hidden on very small mobile to save space */}
        <div className="hidden xs:flex pr-2 sm:pr-4 border-r border-white/10 mr-1 sm:mr-2">
          <span className="text-white font-bold tracking-tighter text-sm sm:text-lg">
            GM<span className="text-cyan-500">.</span>
          </span>
        </div>

        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="relative group p-2 sm:p-3"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-400 group-hover:text-cyan-400 transition-colors flex items-center justify-center"
            >
              <item.icon className="w-5 h-5 sm:w-[20px] sm:h-[20px]" />

              {/* Responsive Tooltip: Only visible on desktop/hover */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity text-[10px] sm:text-xs font-medium text-cyan-200 bg-slate-900/90 px-2 py-1 rounded border border-white/5 whitespace-nowrap">
                {item.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </motion.nav>
    </div>
  );
}
