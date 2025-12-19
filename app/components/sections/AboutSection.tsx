"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface AboutSectionProps {
  isDark: boolean;
  team?: any[];
  settings?: any;
}

export function AboutSection({ isDark, team = [], settings }: AboutSectionProps) {
  const stats = [
    { value: settings?.projectsCompleted || "150+", label: "Projects Completed" },
    { value: settings?.yearsExperience || "12", label: "Years Experience" },
    { value: settings?.awardsWon || "28", label: "Awards Won" },
  ];

  const coreValues = [
    { title: "Innovation", desc: "Pushing boundaries of design" },
    { title: "Sustainability", desc: "Building for future generations" },
    { title: "Excellence", desc: "Uncompromising quality standards" },
    { title: "Collaboration", desc: "Partnership-driven approach" },
  ];

  return (
    <section id="about" className={`py-32 md:py-48 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#242222] text-white" : "bg-[#F5F5F5] text-[#242222]"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid lg:grid-cols-2 gap-16 md:gap-24 mb-32">
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 0.5, x: 0 }} viewport={{ once: true }} className="text-xs tracking-[0.3em] uppercase mb-6">Our Philosophy</motion.p>
            <motion.blockquote initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-light leading-tight tracking-tight mb-8">
              "{settings?.aboutQuote || "Architecture is the thoughtful making of space"}"
            </motion.blockquote>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-sm tracking-wide">
              — {settings?.aboutQuoteAuthor || "Louis Kahn"}
            </motion.p>
          </div>
          <div className="space-y-8">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 0.8, y: 0 }} viewport={{ once: true }} className="text-base md:text-lg leading-relaxed">
              {settings?.aboutDescription1 || "We believe architecture transcends mere buildings—it's about creating experiences that enhance human connection and inspire daily life."}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 0.6, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-base leading-relaxed">
              {settings?.aboutDescription2 || "Every project is a unique dialogue between space, light, and purpose, crafted with precision and passion."}
            </motion.p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-32">
          {stats.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center">
              <motion.p className="text-5xl md:text-7xl font-light tracking-tight text-[#BBFF00]" whileHover={{ scale: 1.05 }}>{stat.value}</motion.p>
              <p className="text-xs tracking-[0.2em] uppercase mt-4 opacity-50">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        {team.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <motion.p className="text-xs tracking-[0.3em] uppercase mb-12 text-center opacity-50">Our Team</motion.p>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <motion.div key={member.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}
                  className="group relative">
                  <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDark ? "bg-gradient-to-t from-[#242222] via-transparent to-transparent" : "bg-gradient-to-t from-white via-transparent to-transparent"}`} />
                  </div>
                  <h3 className="text-xl font-light tracking-tight mb-1">{member.name}</h3>
                  <p className="text-[#BBFF00] text-sm mb-2">{member.role}</p>
                  <p className="text-xs opacity-50">{member.specialty}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Core Values */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-32">
          <motion.p className="text-xs tracking-[0.3em] uppercase mb-12 text-center opacity-50">Core Values</motion.p>
          <div className="grid md:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className={`p-6 border ${isDark ? "border-white/10 hover:border-[#BBFF00]/50" : "border-black/5 hover:border-[#BBFF00]/70"} transition-colors group`}>
                <h4 className="text-lg font-light mb-2 group-hover:text-[#BBFF00] transition-colors">{value.title}</h4>
                <p className="text-xs opacity-50">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
