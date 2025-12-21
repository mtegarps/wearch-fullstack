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
      className="relative overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: "#B8B8B8",
        color: "#2E2E2E",
      }}
    >
      <div className="max-w-full mx-auto relative z-10">
        {/* Top Row - Logo and Icons */}
        <div className="flex flex-col md:flex-row items-start md:items-start justify-between px-6 md:px-12 pt-8 md:pt-10 pb-10 md:pb-16 gap-8 md:gap-0">
          {/* Left: Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt={settings.siteName}
                style={{ width: 65, height: 45 }}
              />
            ) : (
              <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
                <path d="M20 20 L35 80 L20 80 Z" fill="#C8FF00" />
                <path d="M42 20 L57 80 L42 80 Z" fill="#C8FF00" />
                <path d="M64 20 L79 80 L64 80 Z" fill="#C8FF00" />
              </svg>
            )}
            <div className="flex flex-col -mt-1">
              <span
                className="text-sm font-bold tracking-tight leading-none"
                style={{ fontFamily: settings.navFont, fontWeight: 700, color: "#2E2E2E" }}
              >
                {settings.siteName}
              </span>
            </div>
          </motion.div>

          {/* Right: Icons and Back to Top */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-4 md:gap-6"
          >
            {/* Phone Icon - Filled */}
            <motion.a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="transition-opacity hover:opacity-70"
              whileHover={{ scale: 1.05 }}
            >
              <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="#2E2E2E">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </motion.a>
            
            {/* Location Pin Icon - Filled */}
            <motion.a
              href="#"
              className="transition-opacity hover:opacity-70"
              whileHover={{ scale: 1.05 }}
            >
              <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="#2E2E2E">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </motion.a>
            
            {/* Email Icon - Filled */}
            <motion.a
              href={`mailto:${contact.email}`}
              className="transition-opacity hover:opacity-70"
              whileHover={{ scale: 1.05 }}
            >
              <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" fill="#2E2E2E"/>
                <path d="M3 7 L12 13 L21 7" stroke="#B8B8B8" strokeWidth="1.5" fill="none"/>
              </svg>
            </motion.a>
            
            {/* Instagram Icon - Rounded Square with Camera */}
            <motion.a
              href="#"
              className="transition-opacity hover:opacity-70"
              whileHover={{ scale: 1.05 }}
            >
              <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="#2E2E2E"/>
                <circle cx="12" cy="12" r="4" stroke="#B8B8B8" strokeWidth="1.5" fill="none"/>
                <circle cx="17.5" cy="6.5" r="1" fill="#B8B8B8"/>
              </svg>
            </motion.a>

            {/* Back to Top Button */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs font-medium tracking-wide transition-opacity hover:opacity-70 md:ml-4"
              style={{ color: "#C8FF00" }}
              whileHover={{ scale: 1.03 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              <span className="lowercase">back to top</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Row - Copyright and Powered By */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-12 pb-6 md:pb-8 gap-2 md:gap-0">
          <div className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#2E2E2E" }}>
            {settings.copyrightText || `COPYRIGHT © ${new Date().getFullYear()} ${settings.siteName}`}
          </div>
          
          <div className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#2E2E2E" }}>
            POWERED BY {settings.siteName}
          </div>
        </div>
      </div>
    </footer>
  );
}