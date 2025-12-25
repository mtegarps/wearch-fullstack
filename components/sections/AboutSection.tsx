"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Settings } from "@/lib/types";

interface AboutService {
  id: number;
  title: string;
  description: string | null;
  iconUrl: string | null;
  order: number;
}

interface AboutSectionProps {
  settings: Settings;
  isDark: boolean;
  aboutServices?: AboutService[];
}

// Default services as fallback
const defaultServices = [
  {
    id: 1,
    iconUrl: "/uploads/general/residence.png", 
    title: "Residence",
    description: "Design a house become a place to live, giving its own character to the owner. Create a space s that offer both aesthetic and function, offering sanctuaries where life can flourish.",
    order: 1
  },
  {
    id: 2,
    iconUrl: "/uploads/general/commercial.png", 
    title: "Commercial",
    description: "We focus on functionality and space optimization. We aim to build something with high business value while providing comfort for its users, while also providing a distinct identity for our clients' brands. Through this approach, we aim to create attractive, productive, and competitive commercial spaces.",
    order: 2
  },
  {
    id: 3,
    iconUrl: "/uploads/general/urbandesign.png", 
    title: "Urban Design",
    description: "Create a beneficial environment for the surrounding users. We envision all as living ecosystems where architecture, landscape, and urban flow come together in harmony, enriching the daily lives of their inhabitants.",
    order: 3
  },
  {
    id: 4,
    iconUrl: "/uploads/general/landscape.png", 
    title: "Landscape",
    description: "Not changing but shaping the nature into immersive experiences, blending art with ecology. Creating spaces where nature and humanity can coexist peacefully and meaningfully.",
    order: 4
  }
];

export default function AboutSection({ settings, isDark, aboutServices }: AboutSectionProps) {
  // Use provided services or fallback to defaults
  const services = aboutServices && aboutServices.length > 0 ? aboutServices : defaultServices;

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
            className="text-sm md:text-base lg:text-lg tracking-tight text-white/80"
            style={{
              fontFamily: settings.headingFont || "Sk-Modernist Bold, sans-serif",
              fontWeight: 700,
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
                  src={service.iconUrl || "/uploads/general/residence.png"}
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
              {settings.projectsCompleted || "50+"}
            </p>
            <p
              className="text-sm md:text-base tracking-[0.3em]"
              style={{
                fontFamily: settings.bodyFont || "Manrope, sans-serif",
                fontWeight: 400,
                color: "#FFFFFF",
              }}
            >
              {settings.projectsLabel || "projects completed"}
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
              {settings.yearsExperience || "7+"}
            </p>
            <p
              className="text-sm md:text-base tracking-[0.3em]"
              style={{
                fontFamily: settings.bodyFont || "Manrope, sans-serif",
                fontWeight: 400,
                color: "#FFFFFF",
              }}
            >
              {settings.yearsLabel || "years service"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}