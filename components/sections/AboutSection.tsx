"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Settings, TeamMember } from "@/lib/types";

interface AboutSectionProps {
  settings: Settings;
  isDark: boolean;
  team: TeamMember[];
}

export default function AboutSection({ settings, isDark, team }: AboutSectionProps) {
  if (settings.showAboutSection === false) return null;

  const coreValues = [
    { label: "Innovation", icon: "◆", desc: "Pushing boundaries" },
    { label: "Sustainability", icon: "◆", desc: "Green future" },
    { label: "Excellence", icon: "◆", desc: "Quality first" },
    { label: "Integrity", icon: "◆", desc: "Honest work" },
  ];

  const stats = [
    {
      label: settings.projectsLabel || "Projects Completed",
      value: settings.projectsCompleted || "150+",
      desc: settings.projectsDesc || "Across residential & commercial sectors",
      metric: `Since ${settings.established || "2018"}`,
    },
    {
      label: settings.yearsLabel || "Years Experience",
      value: settings.yearsExperience || "12",
      desc: settings.yearsDesc || "Of architectural excellence and innovation",
      metric: "And counting",
    },
    {
      label: settings.awardsLabel || "Awards Won",
      value: settings.awardsWon || "28",
      desc: settings.awardsDesc || "National & international recognitions",
      metric: "Industry honors",
    },
  ];

  return (
    <section
      id="about"
      className={`${settings.sectionPadding || "py-32"} md:py-40 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${
        isDark ? "text-white" : "text-[#242222]"
      }`}
      style={{ backgroundColor: isDark ? settings.darkBg : settings.lightBg }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              isDark ? "rgba(187, 255, 0, 0.03)" : "rgba(187, 255, 0, 0.05)"
            } 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-px h-32 ${
              isDark
                ? "bg-gradient-to-b from-[#BBFF00]/20 to-transparent"
                : "bg-gradient-to-b from-[#BBFF00]/30 to-transparent"
            }`}
            style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "backOut" }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.div
              className={`h-px w-20`}
              style={{ backgroundColor: isDark ? `${settings.primaryColor}66` : `${settings.primaryColor}99` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="w-3 h-3 border-2 rotate-45" style={{ borderColor: settings.primaryColor }} />
            </motion.div>
            <motion.div
              className={`h-px w-20`}
              style={{ backgroundColor: isDark ? `${settings.primaryColor}66` : `${settings.primaryColor}99` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xs tracking-[0.3em] uppercase mb-6"
          >
            About Us
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
            style={{ fontFamily: settings.headingFont, fontWeight: settings.headingWeight }}
          >
            {settings.aboutSectionTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: settings.bodyFont }}
          >
            {settings.aboutSectionSubtitle}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-20 mb-32">
          {/* Quote & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Quote */}
            <motion.div className="relative group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
              <motion.div
                className="absolute -left-6 top-0 w-1.5 h-full rounded-full"
                style={{ background: `linear-gradient(to bottom, ${settings.primaryColor}, ${settings.primaryColor}80, transparent)` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="pl-10"
              >
                <motion.p
                  className="text-2xl md:text-3xl font-light leading-relaxed italic mb-6 opacity-90"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  "{settings.aboutQuote}"
                </motion.p>
                <div className="flex items-center gap-4">
                  <motion.div
                    className="h-px w-16"
                    style={{ backgroundColor: `${settings.primaryColor}80` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  />
                  <p className="text-sm tracking-wide opacity-50">{settings.aboutQuoteAuthor}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Philosophy Text */}
            <motion.div
              className="space-y-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <motion.p
                className="text-base md:text-lg leading-relaxed opacity-80 pl-6"
                whileHover={{ x: 5, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {settings.aboutDescription1}
              </motion.p>
              <motion.p
                className="text-base md:text-lg leading-relaxed opacity-80 pl-6"
                whileHover={{ x: 5, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {settings.aboutDescription2}
              </motion.p>
            </motion.div>

            {/* Core Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="pt-8"
            >
              <motion.div
                className="h-px mb-8"
                style={{ background: `linear-gradient(to right, ${settings.primaryColor}80, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.8 }}
              />
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">Core Values</p>
              <div className="grid grid-cols-2 gap-6">
                {coreValues.map((value, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.1 + idx * 0.1 }}
                    whileHover={{ x: 8, scale: 1.05 }}
                    className="group cursor-pointer relative overflow-hidden p-4 border border-transparent hover:border-[#BBFF00]/20 transition-all duration-300"
                  >
                    <div className="relative z-10 flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <motion.span
                          className="text-xs"
                          style={{ color: settings.primaryColor }}
                          whileHover={{ rotate: 45, scale: 1.3 }}
                          transition={{ duration: 0.3 }}
                        >
                          {value.icon}
                        </motion.span>
                        <span className="text-sm tracking-wide opacity-60 group-hover:opacity-100 transition-opacity font-medium">
                          {value.label}
                        </span>
                      </div>
                      <span className="text-xs opacity-40 group-hover:opacity-60 transition-opacity pl-6">
                        {value.desc}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-16"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.15, duration: 0.8 }}
                whileHover={{ x: 10 }}
                className="group cursor-pointer relative"
              >
                <motion.div
                  className={`absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isDark ? "bg-white/5" : "bg-black/5"
                  }`}
                  initial={{ x: -20, scaleX: 0 }}
                  whileHover={{ x: 0, scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="p-6">
                  <div className="flex items-baseline gap-6 mb-4">
                    <motion.p
                      className="text-6xl md:text-7xl font-extralight tracking-tight"
                      whileHover={{ scale: 1.05, color: settings.primaryColor }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.p>
                    <motion.div
                      className="flex-1 h-px transition-all duration-500"
                      style={{
                        background: `linear-gradient(to right, ${settings.primaryColor}4D, transparent)`,
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.15, duration: 0.6 }}
                    />
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-3 group-hover:opacity-70 transition-opacity">
                    {stat.label}
                  </p>
                  <p className="text-sm leading-relaxed opacity-60 mb-2 group-hover:opacity-80 transition-opacity">
                    {stat.desc}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + idx * 0.15 }}
                    className="inline-flex items-center gap-2 mt-4"
                  >
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: settings.primaryColor }} />
                    <span className="text-xs opacity-40">{stat.metric}</span>
                  </motion.div>
                </div>
                <motion.div
                  className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-transparent group-hover:border-[#BBFF00]/30 transition-colors duration-500"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + idx * 0.15, type: "spring" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Team Section */}
        {settings.showTeamSection !== false && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`pt-20 border-t ${isDark ? "border-white/10" : "border-black/10"}`}
          >
            <div className="text-center mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="h-px w-12" style={{ backgroundColor: isDark ? `${settings.primaryColor}66` : `${settings.primaryColor}99` }} />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: settings.primaryColor }}
                />
                <div className="h-px w-12" style={{ backgroundColor: isDark ? `${settings.primaryColor}66` : `${settings.primaryColor}99` }} />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-light tracking-tight mb-4"
                style={{ fontFamily: settings.headingFont, fontWeight: settings.headingWeight }}
              >
                {settings.teamSectionTitle}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-sm tracking-wide"
              >
                {settings.teamSectionSubtitle}
              </motion.p>
            </div>

            <div className={`grid grid-cols-1 gap-12 md:gap-16`} style={{ gridTemplateColumns: `repeat(${settings.teamGridCols || 3}, minmax(0, 1fr))` }}>
              {team.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.3, duration: 0.8 }}
                  className="group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative aspect-[3/4] mb-6 overflow-hidden"
                  >
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        isDark
                          ? "from-black/80 via-black/20 to-transparent"
                          : "from-black/70 via-black/10 to-transparent"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-6 left-6 right-6"
                    >
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2">
                        <p className="text-xs tracking-[0.15em] uppercase text-white/60">Specialty</p>
                        <p className="text-sm text-white font-light">{member.specialty}</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-transparent group-hover:border-[#BBFF00] transition-all duration-500"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.5, type: "spring" }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-transparent group-hover:border-[#BBFF00] transition-all duration-500"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.6, type: "spring" }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{ backgroundColor: settings.primaryColor }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                  <motion.div className="space-y-3" whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                    <h4 className="text-xl md:text-2xl font-light leading-tight group-hover:opacity-90 transition-opacity">
                      {member.name}
                    </h4>
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-8 h-px group-hover:w-12 transition-all duration-500"
                        style={{ backgroundColor: `${settings.primaryColor}80` }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 + 0.7, duration: 0.6 }}
                      />
                      <p className="text-xs tracking-[0.15em] uppercase opacity-40 group-hover:opacity-70 transition-opacity">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center mt-20"
            >
              <motion.a
                href="#"
                className="group inline-flex flex-col items-center gap-4"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-14 h-14 border-2 flex items-center justify-center transition-all duration-500"
                  style={{ borderColor: isDark ? `${settings.primaryColor}4D` : `${settings.primaryColor}80` }}
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ArrowRight size={18} className="rotate-90" style={{ color: settings.primaryColor }} />
                </motion.div>
                <span className="text-xs tracking-[0.2em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                  View Full Team
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
