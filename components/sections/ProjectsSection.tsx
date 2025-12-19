"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Settings, Project } from "@/lib/types";

interface ProjectsSectionProps {
  settings: Settings;
  isDark: boolean;
  projects: Project[];
  onProjectClick: (id: number) => void;
}

interface ProjectItemProps {
  project: Project;
  index: number;
  onProjectClick: (id: number) => void;
  settings: Settings;
}

function ProjectItem({ project, index, onProjectClick, settings }: ProjectItemProps) {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.88, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.4]);
  const imageScale = useSpring(isHovered ? 1.08 : 1, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
        {/* Text Content */}
        <motion.div className="md:col-span-5 space-y-6" style={{ y }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-block"
          >
            <motion.span
              className="inline-block px-4 py-2 text-xs tracking-[0.2em] uppercase"
              style={{ 
                fontFamily: "Sk-Modernist, sans-serif",
                fontWeight: 400,
                color: "#B8B8B8",
              }}
              whileHover={{ scale: 1.05 }}
            >
              {project.category}
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.h3
              className="text-3xl md:text-5xl tracking-tight leading-tight mb-4"
              animate={isHovered ? { x: 10 } : { x: 0 }}
              transition={{ duration: 0.4 }}
              style={{ 
                fontFamily: "Sk-Modernist Bold, sans-serif",
                fontWeight: 700,
                color: "#242222",
              }}
            >
              {project.title}
            </motion.h3>

            <div 
              className="flex items-center gap-4 text-sm"
              style={{
                fontFamily: "Sk-Modernist, sans-serif",
                fontWeight: 400,
                color: "#B8B8B8",
              }}
            >
              <span className="tracking-[0.1em] uppercase">{project.location}</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#B8B8B8" }} />
              <span className="tracking-[0.1em]">{project.year}</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm leading-relaxed max-w-md"
            style={{ 
              fontFamily: "Sk-Modernist, sans-serif",
              fontWeight: 400,
              color: "#B8B8B8",
            }}
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.button
              onClick={() => onProjectClick(project.id)}
              className="group/btn inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase cursor-pointer"
              whileHover={{ x: 10 }}
              style={{
                fontFamily: "Sk-Modernist Bold, sans-serif",
                fontWeight: 700,
                color: "#242222",
              }}
            >
              <span className="group-hover/btn:text-[#BBFF00] transition-colors">View Project</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={14} />
              </motion.div>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-8 pt-4"
          >
            <div>
              <p 
                className="text-xs tracking-[0.2em] uppercase mb-1"
                style={{
                  fontFamily: "Sk-Modernist, sans-serif",
                  fontWeight: 400,
                  color: "#B8B8B8",
                }}
              >
                Area
              </p>
              <p 
                className="text-sm"
                style={{
                  fontFamily: "Sk-Modernist Bold, sans-serif",
                  fontWeight: 700,
                  color: "#242222",
                }}
              >
                {project.area}
              </p>
            </div>
            <div>
              <p 
                className="text-xs tracking-[0.2em] uppercase mb-1"
                style={{
                  fontFamily: "Sk-Modernist, sans-serif",
                  fontWeight: 400,
                  color: "#B8B8B8",
                }}
              >
                Duration
              </p>
              <p 
                className="text-sm"
                style={{
                  fontFamily: "Sk-Modernist Bold, sans-serif",
                  fontWeight: 700,
                  color: "#242222",
                }}
              >
                {project.duration}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div ref={imageRef} className="md:col-span-7 relative" style={{ scale, opacity }}>
          <div className="relative">
            <motion.div
              className="relative aspect-[4/3] overflow-hidden bg-black/5 cursor-pointer"
              onClick={() => onProjectClick(project.id)}
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div className="w-full h-full" style={{ scale: imageScale }}>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="absolute inset-0 flex items-end justify-end p-8"
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="flex items-center gap-3 text-white cursor-pointer"
                  onClick={() => onProjectClick(project.id)}
                  initial={{ y: 20 }}
                  animate={isHovered ? { y: 0 } : { y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  style={{
                    fontFamily: "Sk-Modernist Bold, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  <span className="text-sm tracking-[0.1em] uppercase">Explore</span>
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#BBFF00" }}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                  >
                    <ArrowRight size={16} style={{ color: "#242222" }} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ settings, isDark, projects, onProjectClick }: ProjectsSectionProps) {
  if (settings.showProjectsSection === false) return null;

  return (
    <section
      id="work"
      className={`${settings.sectionPadding || "py-24"} md:py-32 px-6 md:px-12 relative transition-colors duration-500`}
      style={{ backgroundColor: isDark ? settings.darkBg || "#242222" : settings.lightBg || "#F5F5F5" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32"
        >
          <div className="flex items-center gap-6 mb-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xs tracking-[0.3em] uppercase"
              style={{
                fontFamily: "Sk-Modernist, sans-serif",
                fontWeight: 400,
                color: "#B8B8B8",
              }}
            >
              Portfolio
            </motion.span>
          </div>
          <h2
            className="text-4xl md:text-6xl tracking-tight"
            style={{ 
              fontFamily: "Sk-Modernist Bold, sans-serif",
              fontWeight: 700,
              color: "#242222",
            }}
          >
            Selected Works
          </h2>
        </motion.div>

        <div className="space-y-40 md:space-y-48">
          {projects.slice(0, 3).map((project, idx) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={idx}
              onProjectClick={onProjectClick}
              settings={settings}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-32"
        >
          <motion.a
            href="/projects"
            className="group inline-flex items-center gap-4 text-sm tracking-[0.15em] uppercase"
            whileHover={{ gap: "24px" }}
            style={{
              fontFamily: "Sk-Modernist Bold, sans-serif",
              fontWeight: 700,
              color: "#242222",
            }}
          >
                        <span 
              className="text-sm group-hover:text-[#BBFF00] transition-colors"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800,
                color: "#242222",
              }}
            >
              View All Projects
            </span>
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              style={{
                backgroundColor: "#BBFF00",
              }}
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={16} style={{ color: "#242222" }} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}