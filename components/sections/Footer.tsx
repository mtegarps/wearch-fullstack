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
            className="flex flex-col items-center gap-3"
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
            <span
              className="text-sm font-bold tracking-tight leading-none"
              style={{ fontFamily: settings.navFont, fontWeight: 700, color: "#2E2E2E" }}
            >
              {settings.siteName}
            </span>
          </motion.div>

          {/* Right: Icons and Back to Top */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-4 md:gap-6"
          >
            {/* Phone Icon - Filled */}
            {contact.phone && (
              <motion.a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="transition-opacity hover:opacity-70"
                whileHover={{ scale: 1.05 }}
                title={contact.phone}
              >
                <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="#2E2E2E">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </motion.a>
            )}
            
            {/* Location Pin Icon - Filled */}
            {contact.address && (
              <motion.a
                href={contact.fullAddress ? `https://maps.google.com/?q=${encodeURIComponent(contact.fullAddress)}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                whileHover={{ scale: 1.05 }}
                title={contact.address}
              >
                <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="#2E2E2E">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </motion.a>
            )}
            
            {/* Email Icon - Filled */}
            {contact.email && (
              <motion.a
                href={`mailto:${contact.email}`}
                className="transition-opacity hover:opacity-70"
                whileHover={{ scale: 1.05 }}
                title={contact.email}
              >
                <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" fill="#2E2E2E"/>
                  <path d="M3 7 L12 13 L21 7" stroke="#B8B8B8" strokeWidth="1.5" fill="none"/>
                </svg>
              </motion.a>
            )}
            
            {/* Instagram Icon - Only show if instagram URL exists */}
            {contact.instagram && (
              <motion.a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                whileHover={{ scale: 1.05 }}
                title="Instagram"
              >
                <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="#2E2E2E"/>
                  <circle cx="12" cy="12" r="4" stroke="#B8B8B8" strokeWidth="1.5" fill="none"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#B8B8B8"/>
                </svg>
              </motion.a>
            )}

            {/* LinkedIn Icon - Only show if linkedin URL exists */}
            {contact.linkedin && (
              <motion.a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                whileHover={{ scale: 1.05 }}
                title="LinkedIn"
              >
                <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="#2E2E2E">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </motion.a>
            )}

            {/* Facebook Icon - Only show if facebook URL exists */}
            {contact.facebook && (
              <motion.a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                whileHover={{ scale: 1.05 }}
                title="Facebook"
              >
                <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="#2E2E2E">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                </svg>
              </motion.a>
            )}

            {/* Twitter/X Icon - Only show if twitter URL exists */}
            {contact.twitter && (
              <motion.a
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                whileHover={{ scale: 1.05 }}
                title="Twitter/X"
              >
                <svg className="w-7 h-7 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="#2E2E2E">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
            )}

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
          <div className="text-[11px] font-medium tracking-wide" style={{ color: "#2E2E2E" }}>
            {settings.copyrightText || `COPYRIGHT © ${new Date().getFullYear()} ${settings.siteName.toLowerCase()}`}
          </div>
        <div
          className="text-[11px] font-medium tracking-wide"
          style={{ color: "#2E2E2E" }}
        >
          POWERED BY <span className="lowercase">{settings.siteName}</span>
        </div>
        </div>
      </div>
    </footer>
  );
}