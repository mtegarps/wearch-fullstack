"use client";

import { motion, MotionValue } from "framer-motion";

interface CustomCursorProps {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}

export function CustomCursor({ cursorX, cursorY }: CustomCursorProps) {
  return (
    <motion.div
      className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference hidden md:block"
      style={{ x: cursorX, y: cursorY }}
    >
      <div className="w-full h-full bg-[#BBFF00] rounded-full" />
    </motion.div>
  );
}
