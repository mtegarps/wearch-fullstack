"use client";

import { motion, MotionValue } from "framer-motion";

interface ProgressBarProps {
  scaleProgress: MotionValue<number>;
}

export function ProgressBar({ scaleProgress }: ProgressBarProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#BBFF00] origin-left z-50"
      style={{ scaleX: scaleProgress }}
    />
  );
}
