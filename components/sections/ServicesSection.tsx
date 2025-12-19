"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Settings, Service } from "@/lib/types";

interface ServicesSectionProps {
  settings: Settings;
  isDark: boolean;
  services: Service[];
}

export default function ServicesSection({ settings, isDark, services }: ServicesSectionProps) {
  if (settings.showServicesSection === false) return null;

  return (
    <section
      className={`${settings.sectionPadding || "py-32"} md:py-40 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${
        isDark ? "text-white" : "text-[#242222]"
      }`}
      style={{ backgroundColor: isDark ? settings.darkBg : "white" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ background: `radial-gradient(circle, ${settings.primaryColor} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 md:mb-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "backOut" }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.div
              className="h-px w-16"
              style={{ backgroundColor: isDark ? `${settings.primaryColor}80` : settings.primaryColor }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2"
              style={{ backgroundColor: settings.primaryColor }}
            />
            <motion.div
              className="h-px w-16"
              style={{ backgroundColor: isDark ? `${settings.primaryColor}80` : settings.primaryColor }}
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
            What We Do
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
            style={{ fontFamily: settings.headingFont, fontWeight: settings.headingWeight }}
          >
            {settings.servicesSectionTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: settings.bodyFont }}
          >
            {settings.servicesSectionSubtitle}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-1 md:gap-2 mb-20">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className={`h-full p-10 md:p-12 relative overflow-hidden transition-all duration-500 ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#BBFF00]/50"
                    : "bg-[#F5F5F5] hover:bg-white border border-black/5 hover:border-[#BBFF00]/70"
                }`}
              >
                {/* Hover Gradient Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${
                      isDark ? "rgba(187, 255, 0, 0.05)" : "rgba(187, 255, 0, 0.08)"
                    }, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="mb-8"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.3, type: "spring" }}
                  >
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 border-2 transition-all duration-500 ${
                        isDark
                          ? "border-[#BBFF00]/30 group-hover:border-[#BBFF00] group-hover:bg-[#BBFF00]/10"
                          : "border-[#BBFF00]/50 group-hover:border-[#BBFF00] group-hover:bg-[#BBFF00]/20"
                      }`}
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-2xl" style={{ color: settings.primaryColor }}>
                        {service.icon}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl md:text-3xl font-light tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500"
                    style={{ fontFamily: settings.headingFont, fontWeight: settings.headingWeight }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.4 }}
                  >
                    {service.title}
                  </motion.h3>

                  {/* Decorative Line */}
                  <motion.div
                    className="h-px mb-6 transition-all duration-500"
                    style={{ backgroundColor: isDark ? `${settings.primaryColor}4D` : `${settings.primaryColor}4D` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.5, duration: 0.8 }}
                  />

                  {/* Description */}
                  <motion.p
                    className="text-sm leading-relaxed mb-8 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                    style={{ fontFamily: settings.bodyFont }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.6 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Services List */}
                  <div className="space-y-3">
                    {service.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 + 0.7 + i * 0.1 }}
                        className="flex items-center gap-3 group/item"
                      >
                        <motion.div
                          className="w-1 h-1 group-hover/item:w-6 transition-all duration-300"
                          style={{ backgroundColor: settings.primaryColor }}
                          whileHover={{ scale: 2 }}
                        />
                        <span className="text-xs tracking-[0.05em] uppercase opacity-50 group-hover/item:opacity-80 group-hover/item:translate-x-2 transition-all duration-300">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.2, rotate: -45 }}
                  >
                    <div
                      className="w-10 h-10 border-2 flex items-center justify-center"
                      style={{ borderColor: settings.primaryColor }}
                    >
                      <ArrowRight size={16} style={{ color: settings.primaryColor }} />
                    </div>
                  </motion.div>
                </div>

                {/* Corner Decorations */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ borderColor: settings.primaryColor }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.8 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ borderColor: settings.primaryColor }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.9 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className={`h-px mx-auto mb-16 ${
              isDark
                ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
                : "bg-gradient-to-r from-transparent via-black/10 to-transparent"
            }`}
            style={{ width: "60%" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm mb-8 tracking-wide"
          >
            Need a custom solution tailored to your unique vision?
          </motion.p>

          <motion.a
            href="#contact"
            className={`group inline-flex items-center gap-4 px-10 py-5 border-2 text-sm tracking-[0.15em] uppercase relative overflow-hidden`}
            style={{ borderColor: settings.primaryColor, color: isDark ? "white" : settings.darkText }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: settings.primaryColor }}
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 transition-colors group-hover:text-[#242222]">
              Discuss Your Project
            </span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={16} className="group-hover:text-[#242222] transition-colors" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
