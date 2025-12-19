"use client";

import { motion } from "framer-motion";

interface LogoProps {
  variant?: "light" | "dark";
}

export function Logo({ variant = "light" }: LogoProps) {
  const textColor = variant === "dark" ? "text-white" : "text-[#242222]";
  const subTextColor = variant === "dark" ? "text-white/40" : "text-gray-400";

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
      <div>
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 20 L35 80 L20 80 Z" fill="#c8ff00" />
          <path d="M42 20 L57 80 L42 80 Z" fill="#c8ff00" />
          <path d="M64 20 L79 80 L64 80 Z" fill="#c8ff00" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={`text-lg font-bold tracking-tight leading-none ${textColor}`}
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 700,
          }}
        >
          Wearch Studio
        </span>
        <span
          className={`text-[10px] tracking-[0.15em] uppercase ${subTextColor} mt-0.5`}
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 500,
          }}
        >
          est 2018
        </span>
      </div>
    </motion.div>
  );
}
