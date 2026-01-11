"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Magnetic({
  children,
}: {
  children: React.ReactElement;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for X and Y positions
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth "elastic" movement
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Calculate the distance from the center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Set the "pull" strength (0.35 means it moves 35% of the distance to the mouse)
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block" // Ensures the magnetic field is tight around the element
    >
      {children}
    </motion.div>
  );
}
