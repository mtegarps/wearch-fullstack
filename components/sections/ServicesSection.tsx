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
      className={`${settings.sectionPadding || "py-32"} md:py-40 px-6 md:px-12 relative overflow-hidden transition-colors duration-500`}
      style={{ 
        backgroundColor: isDark ? settings.darkBg || "#242222" : "white",
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
          className="text-center mb-24 md:mb-32"
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
            What We Do
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
            {settings.servicesSectionTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ 
              fontFamily: "Sk-Modernist, sans-serif",
              fontWeight: 400,
              color: "#B8B8B8",
            }}
          >
            {settings.servicesSectionSubtitle}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-20">
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
                className="h-full p-10 md:p-12 relative overflow-hidden transition-all duration-500 bg-[#F5F5F5]"
              >
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
                      className="inline-flex items-center justify-center w-16 h-16"
                      style={{ backgroundColor: "#BBFF00" }}
                    >
                      <span className="text-2xl" style={{ color: "#242222" }}>
                        {service.icon}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl md:text-3xl tracking-tight mb-4"
                    style={{ 
                      fontFamily: "Sk-Modernist Bold, sans-serif",
                      fontWeight: 700,
                      color: "#242222",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.4 }}
                  >
                    {service.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-sm leading-relaxed mb-8"
                    style={{ 
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 500,
                      color: "#B8B8B8",
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
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
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: "#BBFF00" }}
                        />
                        <span 
                          className="text-xs tracking-[0.05em] uppercase"
                          style={{
                            fontFamily: "Manrope, sans-serif",
                            fontWeight: 400,
                            color: "#B8B8B8",
                          }}
                        >
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm mb-8"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              color: "#B8B8B8",
            }}
          >
            Need a custom solution tailored to your unique vision?
          </motion.p>

          <motion.a
            href="#contact"
            className="group inline-flex items-center gap-4 px-10 py-5 text-sm tracking-[0.15em] uppercase relative overflow-hidden"
            style={{ 
              backgroundColor: "#BBFF00",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span 
              className="relative z-10"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800,
                color: "#242222",
              }}
            >
              Discuss Your Project
            </span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={16} style={{ color: "#242222" }} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}