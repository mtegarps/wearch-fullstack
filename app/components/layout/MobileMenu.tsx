"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface MobileMenuProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const navItems = ["Work", "About", "Contact"];

export function MobileMenu({
  isDark,
  setIsDark,
  isMenuOpen,
  setIsMenuOpen,
}: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: isMenuOpen ? 1 : 0,
        pointerEvents: isMenuOpen ? "auto" : "none",
      }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-30 flex items-center justify-center md:hidden ${
        isDark ? "bg-[#242222]" : "bg-[#F5F5F5]"
      }`}
    >
      <div className="space-y-8 text-center">
        {navItems.map((item, idx) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              y: isMenuOpen ? 0 : 20,
            }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setIsMenuOpen(false)}
            className="block text-4xl font-light tracking-tight"
          >
            {item}
          </motion.a>
        ))}

        <motion.button
          onClick={() => setIsDark(!isDark)}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            y: isMenuOpen ? 0 : 20,
          }}
          transition={{ delay: 0.3 }}
          className={`w-14 h-14 rounded-full border-2 mx-auto flex items-center justify-center ${
            isDark
              ? "border-[#BBFF00] bg-[#BBFF00]/10 text-[#BBFF00]"
              : "border-[#B8B8B8] bg-white text-[#242222]"
          }`}
        >
          {isDark ? <Moon size={24} /> : <Sun size={24} />}
        </motion.button>
      </div>
    </motion.div>
  );
}
