"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ServicesSectionProps {
  isDark: boolean;
  services?: any[];
}

export function ServicesSection({ isDark, services = [] }: ServicesSectionProps) {
  const defaultServices = [
    { icon: "▲", title: "Architecture", desc: "Innovative spatial design solutions", services: ["Residential Design", "Commercial Spaces", "Urban Planning"] },
    { icon: "●", title: "Interior Design", desc: "Curated interior experiences", services: ["Space Planning", "Furniture Design", "Lighting Design"] },
    { icon: "■", title: "Consulting", desc: "Strategic project guidance", services: ["Project Management", "Feasibility Studies", "Quality Assurance"] },
  ];

  const displayServices = services.length > 0 ? services.map(s => ({
    icon: s.icon,
    title: s.title,
    desc: s.description,
    services: s.items || [],
  })) : defaultServices;

  return (
    <section className={`py-32 md:py-40 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#242222] text-white" : "bg-white text-[#242222]"}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24 md:mb-32">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 0.5, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-xs tracking-[0.3em] uppercase mb-6">What We Do</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }} className="text-5xl md:text-7xl font-light tracking-tight mb-6">Our Expertise</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 0.6, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive architectural solutions tailored to bring your vision to life
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-1 md:gap-2 mb-20">
          {displayServices.map((service, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15, duration: 0.8 }} className="group relative">
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }}
                className={`h-full p-10 md:p-12 relative overflow-hidden transition-all duration-500 ${isDark ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#BBFF00]/50" : "bg-[#F5F5F5] hover:bg-white border border-black/5 hover:border-[#BBFF00]/70"}`}>
                <div className="relative z-10">
                  <motion.div className="mb-8" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 + 0.3, type: "spring" }}>
                    <motion.div className={`inline-flex items-center justify-center w-16 h-16 border-2 transition-all duration-500 ${isDark ? "border-[#BBFF00]/30 group-hover:border-[#BBFF00] group-hover:bg-[#BBFF00]/10" : "border-[#BBFF00]/50 group-hover:border-[#BBFF00] group-hover:bg-[#BBFF00]/20"}`}
                      whileHover={{ rotate: 180, scale: 1.1 }} transition={{ duration: 0.6 }}>
                      <span className="text-2xl text-[#BBFF00]">{service.icon}</span>
                    </motion.div>
                  </motion.div>
                  <motion.h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">{service.title}</motion.h3>
                  <motion.div className="h-px bg-[#BBFF00]/30 mb-6 group-hover:bg-[#BBFF00] transition-all duration-500" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} style={{ originX: 0 }} />
                  <motion.p className="text-sm leading-relaxed mb-8 opacity-70 group-hover:opacity-90">{service.desc}</motion.p>
                  <div className="space-y-3">
                    {service.services.map((item: string, i: number) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 + 0.7 + i * 0.1 }} className="flex items-center gap-3 group/item">
                        <motion.div className="w-1 h-1 bg-[#BBFF00] group-hover/item:w-6 transition-all duration-300" whileHover={{ scale: 2 }} />
                        <span className="text-xs tracking-[0.05em] uppercase opacity-50 group-hover/item:opacity-80 group-hover/item:translate-x-2 transition-all duration-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="text-center">
          <motion.a href="#contact" className={`group inline-flex items-center gap-4 px-10 py-5 border-2 border-[#BBFF00] text-sm tracking-[0.15em] uppercase relative overflow-hidden ${isDark ? "text-white" : "text-[#242222]"}`}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.div className="absolute inset-0 bg-[#BBFF00]" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.4 }} />
            <span className="relative z-10 transition-colors group-hover:text-[#242222]">Discuss Your Project</span>
            <motion.div className="relative z-10" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowRight size={18} className="transition-colors group-hover:text-[#242222]" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
