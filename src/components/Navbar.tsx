"use client";

import { motion } from "framer-motion";
import { Home, User, Briefcase, Mail } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", icon: Home, href: "#hero" },
  { name: "Work", icon: Briefcase, href: "#projects" },
  { name: "About", icon: User, href: "#about" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

/**
 * Component: Magnetic Wrapper
 * Reusable logic to provide a "pull" effect on navigation items.
 */
const Magnetic = ({ children }: { children: React.ReactNode }) => {
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
    mouseX.set((clientX - centerX) * 0.4);
    mouseY.set((clientY - centerY) * 0.4);
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

import { useMotionValue, useSpring } from "framer-motion";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  // Fix for Hydration Error: Only render the interactive part after mounting on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/10 bg-slate-950/40 backdrop-blur-lg shadow-lg shadow-cyan-500/10 transition-all duration-300"
      >
        {/* Branding initials */}
        <div className="hidden xs:flex pr-2 sm:pr-4 border-r border-white/10 mr-1 sm:mr-2">
          <span className="text-white font-bold tracking-tighter text-sm sm:text-lg">
            GM<span className="text-cyan-500">.</span>
          </span>
        </div>

        {/* Nav Items */}
        <div className="flex items-center">
          {navItems.map((item) => (
            <Magnetic key={item.name}>
              <Link
                href={item.href}
                className="relative group p-2 sm:p-3 flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-400 group-hover:text-cyan-400 transition-colors"
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />

                  {/* Tooltip: Classes kept on a single line to prevent hydration mismatches */}
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity text-[10px] sm:text-xs font-medium text-cyan-200 bg-slate-900/90 px-2 py-1 rounded border border-white/5 whitespace-nowrap">
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            </Magnetic>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}
