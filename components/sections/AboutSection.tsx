"use client";

import { motion } from "framer-motion";
import { Settings, TeamMember } from "@/lib/types";

interface AboutSectionProps {
  settings: Settings;
  isDark: boolean;
  team: TeamMember[];
}

export default function AboutSection({ settings, isDark, team }: AboutSectionProps) {
  if (settings.showAboutSection === false) return null;

  const coreValues = [
    { label: "Innovation", desc: "Pushing boundaries" },
    { label: "Sustainability", desc: "Green future" },
    { label: "Excellence", desc: "Quality first" },
    { label: "Integrity", desc: "Honest work" },
  ];

  const stats = [
    {
      label: settings.projectsLabel || "PROJECTS COMPLETED",
      value: settings.projectsCompleted || "150+",
      desc: settings.projectsDesc || "Across residential & commercial sectors",
      metric: settings.established || "Since 2018",
    },
    {
      label: settings.yearsLabel || "YEARS EXPERIENCE",
      value: settings.yearsExperience || "12",
      desc: settings.yearsDesc || "Of architectural excellence and innovation",
      metric: "And counting",
    },
    {
      label: settings.awardsLabel || "AWARDS WON",
      value: settings.awardsWon || "28",
      desc: settings.awardsDesc || "National & international recognitions",
      metric: "Industry honors",
    },
  ];

  return (
    <section
      id="about"
      className={`${settings.sectionPadding || "py-32"} md:py-40 px-6 md:px-12 relative overflow-hidden transition-colors duration-500`}
      style={{ 
        backgroundColor: isDark ? settings.darkBg || "#242222" : settings.lightBg || "#F5F5F5",
        color: isDark ? "#FFFFFF" : "#242222",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          {/* Logo - STATIC, NO ROTATION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt={settings.siteName}
                style={{
                  width: settings.logoWidth || 60,
                  height: settings.logoHeight || 60,
                }}
              />
            ) : (
              <svg
                width={settings.logoWidth || 60}
                height={settings.logoHeight || 60}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 20 L35 80 L20 80 Z"
                  fill="#BBFF00"
                />
                <path
                  d="M42 20 L57 80 L42 80 Z"
                  fill="#BBFF00"
                />
                <path
                  d="M64 20 L79 80 L64 80 Z"
                  fill="#BBFF00"
                />
              </svg>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xs tracking-[0.3em] uppercase mb-6"
            style={{
              fontFamily: "Sk-Modernist, sans-serif",
              fontWeight: 400,
              color: "#B8B8B8",
            }}
          >
            About Us
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl tracking-tight mb-6"
            style={{ 
              fontFamily: "Sk-Modernist Bold, sans-serif",
              fontWeight: 700,
              color: "#242222",
            }}
          >
            {settings.aboutSectionTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ 
              fontFamily: "Sk-Modernist, sans-serif",
              fontWeight: 400,
              color: "#B8B8B8",
            }}
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
            <motion.div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.p
                  className="text-2xl md:text-3xl leading-relaxed italic mb-6"
                  style={{
                    fontFamily: "Sk-Modernist Bold, sans-serif",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: "#242222",
                  }}
                >
                  "{settings.aboutQuote}"
                </motion.p>
                <div className="flex items-center gap-4">
                  <p 
                    className="text-sm"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 500,
                      color: "#B8B8B8",
                    }}
                  >
                    {settings.aboutQuoteAuthor}
                  </p>
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
                className="text-base md:text-lg leading-relaxed"
                style={{
                  fontFamily: "Sk-Modernist, sans-serif",
                  fontWeight: 400,
                  color: "#B8B8B8",
                }}
              >
                {settings.aboutDescription1}
              </motion.p>
              <motion.p
                className="text-base md:text-lg leading-relaxed"
                style={{
                  fontFamily: "Sk-Modernist, sans-serif",
                  fontWeight: 400,
                  color: "#B8B8B8",
                }}
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
              <p 
                className="text-xs tracking-[0.2em] uppercase mb-6"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 800,
                  color: "#B8B8B8",
                }}
              >
                CORE VALUES
              </p>
              <div className="grid grid-cols-2 gap-6">
                {coreValues.map((value, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.1 + idx * 0.1 }}
                    className="relative"
                  >
                    <div className="relative z-10 flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#BBFF00" }}
                        />
                        <span 
                          className="text-sm tracking-wide"
                          style={{
                            fontFamily: "Sk-Modernist Bold, sans-serif",
                            fontWeight: 700,
                            color: "#242222",
                          }}
                        >
                          {value.label}
                        </span>
                      </div>
                      <span 
                        className="text-xs pl-5"
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontWeight: 500,
                          color: "#B8B8B8",
                        }}
                      >
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
                className="relative"
              >
                <div className="space-y-3">
                  <motion.p
                    className="text-6xl md:text-7xl tracking-tight"
                    style={{
                      fontFamily: "Sk-Modernist Bold, sans-serif",
                      fontWeight: 700,
                      color: "#242222",
                    }}
                  >
                    {stat.value}
                  </motion.p>
                  <p 
                    className="text-xs tracking-[0.1em] uppercase"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 400,
                      color: "#B8B8B8",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 500,
                      color: "#B8B8B8",
                    }}
                  >
                    {stat.desc}
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + idx * 0.15 }}
                    className="inline-flex items-center gap-2 mt-2"
                  >
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#BBFF00" }} />
                    <span 
                      className="text-xs"
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: 800,
                        color: "#B8B8B8",
                      }}
                    >
                      {stat.metric}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* TEAM SECTION DIHAPUS */}
      </div>
    </section>
  );
}