"use client";

import { motion } from "framer-motion";
import { Settings, Contact } from "@/lib/types";

interface FooterProps {
  settings: Settings;
  isDark: boolean;
  contact: Contact;
}

export default function Footer({ settings, isDark, contact }: FooterProps) {
  return (
    <footer
      className="py-16 px-6 md:px-12 relative overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? settings.darkBg : settings.mutedText,
        color: isDark ? "white" : settings.darkText,
      }}
    >
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? "white" : "black"} 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <motion.div className="flex items-center gap-3 mb-6" whileHover={{ scale: 1.05 }}>
              <div>
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt={settings.siteName}
                    style={{ width: settings.logoWidth || 40, height: settings.logoHeight || 40 }}
                  />
                ) : (
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                    <path d="M20 20 L35 80 L20 80 Z" fill={settings.secondaryColor} />
                    <path d="M42 20 L57 80 L42 80 Z" fill={settings.secondaryColor} />
                    <path d="M64 20 L79 80 L64 80 Z" fill={settings.secondaryColor} />
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className="text-lg font-bold tracking-tight leading-none"
                  style={{ fontFamily: settings.navFont, fontWeight: 700 }}
                >
                  {settings.siteName}
                </span>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase mt-0.5 opacity-40"
                  style={{ fontFamily: settings.navFont, fontWeight: 500 }}
                >
                  {settings.established}
                </span>
              </div>
            </motion.div>
            <p className={`text-sm leading-relaxed max-w-sm ${isDark ? "text-white/50" : "opacity-60"}`}>
              {settings.footerDescription}
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-px mt-8"
              style={{ backgroundColor: isDark ? `${settings.primaryColor}4D` : `${settings.darkText}4D` }}
            />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 opacity-50">Quick Links</h4>
            <ul className="space-y-3">
              {["Work", "About", "Services", "Contact"].map((link, idx) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    className={`text-sm transition-colors inline-block ${isDark ? "text-white/60 hover:text-white" : "opacity-60 hover:opacity-100"}`}
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 opacity-50">Get In Touch</h4>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href={`mailto:${contact.email}`}
                  className={`text-sm transition-colors block ${isDark ? "text-white/60 hover:text-white" : "opacity-60 hover:opacity-100"}`}
                >
                  {contact.email}
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className={`text-sm transition-colors block ${isDark ? "text-white/60 hover:text-white" : "opacity-60 hover:opacity-100"}`}
                >
                  {contact.phone}
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <span className={`text-sm block ${isDark ? "text-white/60" : "opacity-60"}`}>
                  {contact.address}
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={`flex flex-wrap justify-center md:justify-start gap-6 text-xs ${isDark ? "text-white/40" : "opacity-40"}`}
          >
            <motion.span whileHover={{ opacity: 1 }} className="tracking-[0.15em] uppercase">
              {settings.copyrightText || `© ${new Date().getFullYear()} ${settings.siteName}`}
            </motion.span>
            <span className="opacity-30">•</span>
            <motion.a
              href="#"
              className="tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <span className="opacity-30">•</span>
            <motion.a
              href="#"
              className="tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            {["IG", "LI", "BE"].map((social, idx) => (
              <motion.a
                key={social}
                href="#"
                className={`w-10 h-10 border flex items-center justify-center text-xs tracking-wider transition-all ${
                  isDark
                    ? "border-white/20 hover:border-white/40 hover:bg-white hover:text-black"
                    : "border-black/20 hover:border-black/40 hover:bg-black hover:text-white"
                }`}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + idx * 0.1 }}
              >
                {social}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
