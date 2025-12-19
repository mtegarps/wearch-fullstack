"use client";

import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Settings } from "@/lib/types";

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
  const navItems = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Articles", href: "/articles" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`${settings.navPosition || "fixed"} top-0 left-0 right-0 z-40 border-b border-gray-200 ${
          settings.navStyle === "transparent"
            ? "bg-transparent"
            : settings.navStyle === "solid"
            ? "bg-white"
            : "bg-white/90 backdrop-blur-md"
        }`}
        style={{
          height: settings.navHeight || "80px",
          backgroundColor:
            settings.navStyle === "blur"
              ? `rgba(255,255,255,${settings.navBgOpacity || 0.9})`
              : undefined,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex justify-between items-center">
          {/* Logo */}
          {settings.navShowLogo !== false && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div>
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt={settings.siteName}
                    style={{
                      width: settings.logoWidth || 40,
                      height: settings.logoHeight || 40,
                    }}
                  />
                ) : (
                  <svg
                    width={settings.logoWidth || 40}
                    height={settings.logoHeight || 40}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 20 L35 80 L20 80 Z"
                      fill={settings.secondaryColor || "#c8ff00"}
                    />
                    <path
                      d="M42 20 L57 80 L42 80 Z"
                      fill={settings.secondaryColor || "#c8ff00"}
                    />
                    <path
                      d="M64 20 L79 80 L64 80 Z"
                      fill={settings.secondaryColor || "#c8ff00"}
                    />
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className="text-lg tracking-tight leading-none"
                  style={{
                    fontFamily: "Sk-Modernist Bold, sans-serif",
                    fontWeight: 700,
                    color: settings.darkText || "#242222",
                  }}
                >
                  {settings.siteName}
                </span>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase mt-0.5"
                  style={{
                    fontFamily: "Sk-Modernist, sans-serif",
                    fontWeight: 400,
                    color: settings.mutedText || "#B8B8B8",
                  }}
                >
                  {settings.established}
                </span>
              </div>
            </motion.div>
          )}

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-sm tracking-[0.1em] uppercase text-gray-600 hover:text-[#c8ff00] transition-colors"
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

            {/* Desktop Theme Toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                isDark
                  ? "border-[#BBFF00] bg-[#BBFF00]/10 text-[#BBFF00]"
                  : "border-gray-300 bg-white text-gray-600 hover:border-[#c8ff00] hover:text-[#c8ff00]"
              }`}
              style={{
                borderColor: isDark ? settings.primaryColor : undefined,
              }}
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
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

          {/* Mobile Theme Toggle */}
          <motion.button
            onClick={() => setIsDark(!isDark)}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              y: isMenuOpen ? 0 : 20,
            }}
            transition={{ delay: 0.3 }}
            className={`w-14 h-14 rounded-full border-2 mx-auto flex items-center justify-center`}
            style={{
              borderColor: isDark
                ? settings.primaryColor
                : settings.mutedText || "#B8B8B8",
              backgroundColor: isDark
                ? `${settings.primaryColor}10`
                : "white",
              color: isDark ? settings.primaryColor : settings.darkText,
            }}
          >
            {isDark ? <Moon size={24} /> : <Sun size={24} />}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}