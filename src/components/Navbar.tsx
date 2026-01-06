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
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-slate-950/50 backdrop-blur-md shadow-lg shadow-cyan-500/10"
      >
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="relative group p-3">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-400 group-hover:text-cyan-400 transition-colors"
            >
              <item.icon size={20} />
              {/* Tooltip Effect */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-cyan-200 bg-slate-900 px-2 py-1 rounded">
                {item.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </motion.nav>
    </div>
  );
}
