"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Settings } from "@/lib/types";

interface AboutSectionProps {
  settings: Settings;
  isDark: boolean;
}

export default function AboutSection({ settings, isDark }: AboutSectionProps) {
  const services = [
    {
      iconPath: "/uploads/general/residence.png", 
      title: "Residence",
      description: "Design a house become a place to live, giving its own character to the owner. Create a space s that offer both aesthetic and function, offering sanctuaries where life can flourish."
    },
    {
      iconPath: "/uploads/general/commercial.png", 
      title: "Commercial",
      description: "We focus on functionality and space optimization. We aim to build something with high business value while providing comfort for its users, while also providing a distinct identity for our clients' brands. Through this approach, we aim to create attractive, productive, and competitive commercial spaces."
    },
    {
      iconPath: "/uploads/general/urbandesign.png", 
      title: "Urban Design",
      description: "Create a beneficial environment for the surrounding users. We envision all as living ecosystems where architecture, landscape, and urban flow come together in harmony, enriching the daily lives of their inhabitants."
    },
    {
      iconPath: "/uploads/general/landscape.png", 
      title: "Landscape",
      description: "Not changing but shaping the nature into immersive experiences, blending art with ecology. Creating spaces where nature and humanity can coexist peacefully and meaningfully."
    }
  ];

  return (
    <section
      className="py-20 px-6 md:px-12 relative overflow-hidden"
      id="about"
      style={{ 
        backgroundColor: "#242222"
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="tracking-tight"
            style={{
              fontFamily: settings.headingFont || "Sk-Modernist Bold, sans-serif",
              color: "rgba(255, 255, 255, 0.8)",
              fontWeight: 700,
              fontSize: `calc(16px * ${settings.fontSizeMultiplier || 1})`,
            }}
          >
            our services
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-20 mb-24">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Icon */}
              <div className="mb-8 w-[50px] h-[50px] relative flex items-center justify-center">
                <Image
                  src={service.iconPath}
                  alt={`${service.title} icon`}
                  width={50}
                  height={50}
                  className="object-contain"
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                />
              </div>

              {/* Title and Description */}
              <div 
                className="text-justify w-full"
                lang="en"
                style={{ 
                  textWrap: "pretty",
                  hyphens: "auto",
                  wordBreak: "break-word",
                  textAlignLast: "left"
                }}
              >
                <span
                  className="text-base"
                  style={{
                    fontFamily: settings.bodyFont || "Manrope, sans-serif",
                    color: "#FFFFFF",
                    fontWeight: 700,
                  }}
                >
                  {service.title}
                </span>
                <span
                  className="text-base"
                  style={{
                    fontFamily: settings.bodyFont || "Manrope, sans-serif",
                    color: "#FFFFFF",
                    fontWeight: 500,
                  }}
                >
                  {" - "}
                </span>
                <span
                  className="text-base"
                  style={{
                    fontFamily: settings.bodyFont || "Manrope, sans-serif",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    lineHeight: "1.6",
                  }}
                >
                  {service.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 md:gap-24 max-w-5xl mx-auto text-center"
        >
          {/* Projects */}
          <div>
            <p
              className="text-6xl sm:text-7xl md:text-8xl mb-3"
              style={{
                fontFamily: settings.headingFont || "Manrope, sans-serif",
                fontWeight: 700,
                color: settings.accentColor || "#BBFF00",
                lineHeight: "1",
              }}
            >
              50+
            </p>
            <p
              className="text-sm md:text-base tracking-[0.3em]"
              style={{
                fontFamily: settings.bodyFont || "Manrope, sans-serif",
                fontWeight: 400,
                color: "#FFFFFF",
              }}
            >
              projects completed
            </p>
          </div>

          {/* Years */}
          <div>
            <p
              className="text-6xl sm:text-7xl md:text-8xl mb-3"
              style={{
                fontFamily: settings.headingFont || "Manrope, sans-serif",
                fontWeight: 700,
                color: settings.accentColor || "#BBFF00",
                lineHeight: "1",
              }}
            >
              7+
            </p>
            <p
              className="text-sm md:text-base tracking-[0.3em]"
              style={{
                fontFamily: settings.bodyFont || "Manrope, sans-serif",
                fontWeight: 400,
                color: "#FFFFFF",
              }}
            >
              years service
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}