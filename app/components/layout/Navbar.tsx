"use client";

import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Logo } from "../ui/Logo";

interface NavbarProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const navItems = ["Work", "About", "Contact"];

export function Navbar({
  isDark,
  setIsDark,
  isMenuOpen,
  setIsMenuOpen,
}: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <Logo variant="light" />

        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -2 }}
              className="text-sm tracking-[0.1em] uppercase text-gray-600 hover:text-[#c8ff00] transition-colors"
            >
              {item}
            </motion.a>
          ))}

          <motion.button
            onClick={() => setIsDark(!isDark)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
              isDark
                ? "border-[#BBFF00] bg-[#BBFF00]/10 text-[#BBFF00]"
                : "border-gray-300 bg-white text-gray-600 hover:border-[#c8ff00] hover:text-[#c8ff00]"
            }`}
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>
    </motion.nav>
  );
}
