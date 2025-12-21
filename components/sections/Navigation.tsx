"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Settings } from "@/lib/types";
import { useState, useEffect } from "react";

interface NavigationProps {
  settings: Settings;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export default function Navigation({
  settings,
  isDark,
  setIsDark,
  isMenuOpen,
  setIsMenuOpen,
}: NavigationProps) {
  // State untuk track hover
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Projects", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Articles", href: "/articles" },
    { label: "", href: "#contact" }
  ];

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${settings.navPosition || "fixed"} top-0 left-0 right-0 z-40 transition-all duration-300`}
        style={{
          height: settings.navHeight || "80px",
          // Background muncul saat hover atau scroll
          backgroundColor: isHovered || isScrolled
            ? settings.navStyle === "solid"
              ? "#242222"
              : `rgba(36, 34, 34, ${settings.navBgOpacity || 0.9})`
            : "transparent",
          backdropFilter: (isHovered || isScrolled) && settings.navStyle === "blur" 
            ? "blur(12px)" 
            : "none",
          borderBottom: isHovered || isScrolled 
            ? "1px solid rgba(255,255,255,0.1)" 
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex justify-between items-center">
          {settings.navShowLogo !== false && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col"
              animate={{
                opacity: isHovered || isScrolled ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="text-lg tracking-tight leading-none"
                style={{
                  fontFamily: "Sk-Modernist Bold, sans-serif",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {settings.siteName}
              </span>
              <span
                className="text-[10px] tracking-[0.15em] uppercase mt-0.5"
                style={{
                  fontFamily: "Sk-Modernist, sans-serif",
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                {settings.established}
              </span>
            </motion.div>
          )}

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ y: -2 }}
                animate={{
                  opacity: isHovered || isScrolled ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
                className="text-sm tracking-[0.1em] uppercase text-white hover:text-[#c8ff00] transition-colors"
                style={{
                  fontFamily: "Sk-Modernist Bold, sans-serif",
                  fontWeight: 700,
                  fontSize: settings.navSize || "12px",
                  letterSpacing: settings.navLetterSpacing || "0.1em",
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            animate={{
              opacity: isHovered || isScrolled ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-30 flex items-center justify-center md:hidden`}
        style={{
          backgroundColor: isDark
            ? settings.darkBg || "#242222"
            : settings.lightBg || "#F5F5F5",
        }}
      >
        <div className="space-y-8 text-center">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20,
              }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setIsMenuOpen(false)}
              className="block text-4xl tracking-tight"
              style={{
                fontFamily: "Sk-Modernist Bold, sans-serif",
                fontWeight: 700,
                color: isDark
                  ? settings.headingColorDark
                  : settings.headingColor,
              }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}