"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "@/app/types";

interface ProjectItemProps {
  project: Project;
  index: number;
  isDark: boolean;
  onClick: (id: number) => void;
}

export function ProjectItem({
  project,
  index,
  isDark,
  onClick,
}: ProjectItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1, 0.9]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.3]
  );
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`grid md:grid-cols-12 gap-8 md:gap-16 items-center ${index % 2 === 1 ? "md:direction-rtl" : ""}`}
      >
        {/* Text Content */}
        <motion.div
          className={`md:col-span-5 space-y-6 ${index % 2 === 1 ? "md:col-start-8 md:direction-ltr" : ""}`}
          style={{ y }}
        >
          {/* Category Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-block"
          >
            <motion.span
              className={`inline-block px-4 py-2 border text-xs tracking-[0.2em] uppercase ${
                isDark ? "border-white/10" : "border-black/10"
              }`}
              whileHover={{
                borderColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                scale: 1.05,
              }}
            >
              {project.category}
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.h3
              className={`text-3xl md:text-5xl font-light tracking-tight leading-tight mb-4 ${
                isDark ? "text-white" : "text-[#242222]"
              }`}
              animate={isHovered ? { x: 10 } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {project.title}
            </motion.h3>

            {/* Location & Year */}
            <div className={`flex items-center gap-4 text-sm ${isDark ? "opacity-50" : "opacity-50"}`}>
              <span className="tracking-[0.1em] uppercase">
                {project.location}
              </span>
              <span className={`w-1 h-1 rounded-full ${isDark ? "bg-white" : "bg-black"}`} />
              <span className="tracking-[0.1em]">{project.year}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 0.6, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`text-sm leading-relaxed max-w-md ${isDark ? "text-white/60" : "text-[#242222]/60"}`}
          >
            {project.description}
          </motion.p>

          {/* Animated Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: isHovered ? "100px" : "60px" } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`h-px ${isDark ? "bg-white" : "bg-black"}`}
          />

          {/* View Project Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.button
              onClick={() => onClick(project.id)}
              className={`group/btn inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase cursor-pointer ${
                isDark ? "text-white" : "text-[#242222]"
              }`}
              whileHover={{ x: 10 }}
            >
              <span className="opacity-60 group-hover/btn:opacity-100 transition-opacity">
                View Project
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={14} />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-8 pt-4"
          >
            <div>
              <p className={`text-xs tracking-[0.2em] uppercase mb-1 ${isDark ? "opacity-40" : "opacity-40"}`}>
                Area
              </p>
              <p className="text-sm font-light">{project.area}</p>
            </div>
            <div>
              <p className={`text-xs tracking-[0.2em] uppercase mb-1 ${isDark ? "opacity-40" : "opacity-40"}`}>
                Duration
              </p>
              <p className="text-sm font-light">{project.duration}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          ref={imageRef}
          className={`md:col-span-7 relative ${index % 2 === 1 ? "md:col-start-1 md:row-start-1 md:direction-ltr" : ""}`}
          style={{ scale, opacity, rotate }}
        >
          {/* Image Container with Layered Effect */}
          <div className="relative">
            {/* Shadow Layer */}
            <motion.div
              className={`absolute inset-0 blur-2xl ${isDark ? "bg-white/5" : "bg-black/5"}`}
              animate={
                isHovered
                  ? { scale: 1.05, opacity: 0.3 }
                  : { scale: 1, opacity: 0.1 }
              }
              transition={{ duration: 0.6 }}
            />

            {/* Main Image Container */}
            <motion.div
              className={`relative aspect-[4/3] overflow-hidden cursor-pointer ${
                isDark ? "bg-white/5" : "bg-black/5"
              }`}
              onClick={() => onClick(project.id)}
              whileHover={{
                boxShadow: isDark 
                  ? "0 25px 50px -12px rgba(255, 255, 255, 0.1)" 
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
              transition={{ duration: 0.6 }}
            >
              {/* Image */}
              <motion.div
                className="w-full h-full"
                style={{ scale: imageScale }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Hover Info Overlay */}
              <motion.div
                className="absolute inset-0 flex items-end justify-end p-8"
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="flex items-center gap-3 text-white cursor-pointer"
                  onClick={() => onClick(project.id)}
                  initial={{ y: 20 }}
                  animate={isHovered ? { y: 0 } : { y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="text-sm tracking-[0.1em] uppercase">
                    Explore
                  </span>
                  <motion.div
                    className="w-10 h-10 border border-white rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Corner Accent */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isHovered
                    ? { opacity: 0.3, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.4 }}
                style={{ originX: 1, originY: 0 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-white"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isHovered
                    ? { opacity: 0.3, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{ originX: 0, originY: 1 }}
              />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className={`absolute -bottom-4 -right-4 w-24 h-24 border ${
                isDark ? "border-white/5" : "border-black/5"
              }`}
              animate={
                isHovered
                  ? {
                      scale: 1.1,
                      rotate: 45,
                    }
                  : {
                      scale: 1,
                      rotate: 0,
                    }
              }
              transition={{ duration: 0.6 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Separator Line */}
      <motion.div
        className={`absolute -bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          isDark ? "via-white/10" : "via-black/10"
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.2 }}
      />
    </motion.div>
  );
}