"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ContactSectionProps {
  isDark: boolean;
  contact?: any;
}

export function ContactSection({ isDark, contact }: ContactSectionProps) {
  const contactItems = [
    { icon: "✉", label: "Email", value: contact?.email || "hello@wearch.id", href: `mailto:${contact?.email || "hello@wearch.id"}` },
    { icon: "☎", label: "Phone", value: contact?.phone || "+62 812 3456 7890", href: `tel:${contact?.phone || "+62 812 3456 7890"}` },
    { icon: "◎", label: "Location", value: contact?.address || "Bandung, Indonesia", href: "#" },
  ];

  return (
    <section id="contact" className={`py-32 md:py-48 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#242222] text-white" : "bg-[#F5F5F5] text-[#242222]"}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="text-7xl md:text-9xl font-light tracking-tight leading-none mb-4">
              <motion.span className="inline-block" whileHover={{ scale: 1.05, x: 10 }} transition={{ duration: 0.3 }}>Let's</motion.span>{" "}
              <motion.span className="inline-block" whileHover={{ scale: 1.05, x: -10 }} transition={{ duration: 0.3 }}>Create</motion.span>
            </h2>
            <motion.span className="text-7xl md:text-9xl italic font-extralight tracking-tight" whileHover={{ skewX: -8, scale: 1.08, color: "#BBFF00" }} transition={{ duration: 0.4 }}>Together</motion.span>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
            className={`text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mt-12 ${isDark ? "text-white/70" : "text-[#242222]/70"}`}>
            Ready to transform your vision into architectural excellence?
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-1">
            {contactItems.map((item, idx) => (
              <motion.a key={idx} href={item.href} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 + idx * 0.15 }}
                className={`group relative overflow-hidden p-8 flex flex-col items-center ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-[#F5F5F5] hover:bg-white"}`}>
                <motion.div className="relative mb-5" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <motion.div className={`w-12 h-12 flex items-center justify-center text-2xl transition-all ${isDark ? "text-[#BBFF00] group-hover:text-[#242222]" : "text-[#BBFF00] group-hover:text-[#242222]"}`}>
                    <motion.div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-[#BBFF00]" animate={{ scale: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
                    <span className="relative z-10">{item.icon}</span>
                  </motion.div>
                </motion.div>
                <p className={`text-xs tracking-[0.25em] uppercase mb-2 ${isDark ? "text-white/40 group-hover:text-[#BBFF00]/70" : "text-[#242222]/40 group-hover:text-[#BBFF00]"} transition-colors`}>{item.label}</p>
                <motion.p className={`text-base md:text-lg font-light text-center ${isDark ? "text-white" : "text-[#242222]"}`} whileHover={{ scale: 1.05 }}>{item.value}</motion.p>
                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#BBFF00] to-transparent" initial={{ scaleX: 0, opacity: 0 }} whileHover={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.4 }} />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.2 }} className="text-center">
          <motion.a href={`mailto:${contact?.email || "hello@wearch.id"}`} className="group inline-flex items-center gap-6 px-12 py-6 bg-[#BBFF00] text-[#242222] text-sm tracking-[0.15em] uppercase relative overflow-hidden font-semibold"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.div className={`absolute inset-0 ${isDark ? "bg-white" : "bg-[#242222]"}`} initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.4 }} />
            <span className={`relative z-10 transition-colors ${isDark ? "group-hover:text-[#242222]" : "group-hover:text-[#BBFF00]"}`}>Start Your Project</span>
            <motion.div className="relative z-10" animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowRight size={20} className={isDark ? "group-hover:text-[#242222]" : "group-hover:text-[#BBFF00]"} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
