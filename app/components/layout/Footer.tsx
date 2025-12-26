"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { Logo } from "../ui/Logo";

interface FooterProps {
  isDark: boolean;
  contact?: any;
  settings?: any;
}

export function Footer({ isDark, contact, settings }: FooterProps) {
  const footerLinks = [
    { title: "Navigation", links: [{ label: "Work", href: "#work" }, { label: "About", href: "#about" }, { label: "Services", href: "#services" }, { label: "Contact", href: "#contact" }] },
    { title: "Services", links: [{ label: "Architecture", href: "#" }, { label: "Interior Design", href: "#" }, { label: "Consulting", href: "#" }] },
  ];

  const socialLinks = [
    { icon: Instagram, href: contact?.instagram || "#", label: "Instagram" },
    { icon: Linkedin, href: contact?.linkedin || "#", label: "LinkedIn" },
    { icon: Facebook, href: contact?.facebook || "#", label: "Facebook" },
    { icon: Twitter, href: contact?.twitter || "#", label: "Twitter" },
  ].filter(s => s.href && s.href !== "#");

  return (
    <footer className={`py-20 px-6 md:px-12 border-t transition-colors duration-500 ${isDark ? "bg-[#1a1a1a] border-white/10 text-white" : "bg-white border-black/10 text-[#242222]"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
              <Logo variant={isDark ? "dark" : "light"} />
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 0.6, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-sm leading-relaxed mb-6">
              {settings?.tagline || "Architecture Studio · Bandung"}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 0.4 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xs">
              {settings?.established || "2018"}
            </motion.p>
          </div>

          {footerLinks.map((group, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (idx + 1) * 0.1 }}>
              <h4 className="text-xs tracking-[0.2em] uppercase mb-6 opacity-40">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <motion.a href={link.href} whileHover={{ x: 5 }} className="text-sm opacity-70 hover:opacity-100 hover:text-[#BBFF00] transition-all inline-flex items-center gap-2 group">
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6 opacity-40">Contact</h4>
            <ul className="space-y-4">
              <li><a href={`mailto:${contact?.email || "hello@wearch.id"}`} className="text-sm opacity-70 hover:opacity-100 hover:text-[#BBFF00] transition-all">{contact?.email || "hello@wearch.id"}</a></li>
              <li><a href={`tel:${contact?.phone}`} className="text-sm opacity-70 hover:opacity-100 hover:text-[#BBFF00] transition-all">{contact?.phone || "+62 812 3456 7890"}</a></li>
              <li><span className="text-sm opacity-70">{contact?.address || "Bandung, Indonesia"}</span></li>
            </ul>

            {socialLinks.length > 0 && (
              <div className="flex gap-4 mt-8">
                {socialLinks.map((social, i) => (
                  <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.1 }}
                    className={`w-10 h-10 border flex items-center justify-center transition-all hover:bg-[#BBFF00] hover:border-[#BBFF00] hover:text-[#242222] ${isDark ? "border-white/20 text-white/60" : "border-black/10 text-[#242222]/60"}`}>
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? "border-white/10" : "border-black/10"}`}>
          <p className="text-xs opacity-40">© {new Date().getFullYear()} {settings?.siteName || "wearch Studio"}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs opacity-40 hover:opacity-100 hover:text-[#BBFF00] transition-all">Privacy Policy</a>
            <a href="#" className="text-xs opacity-40 hover:opacity-100 hover:text-[#BBFF00] transition-all">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}