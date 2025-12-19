"use client";

import { motion } from "framer-motion";
import { ProjectItem } from "./ProjectItem";

interface ProjectsSectionProps {
  isDark: boolean;
  projects: any[];
  onProjectClick: (id: number) => void;
}

export function ProjectsSection({ isDark, projects, onProjectClick }: ProjectsSectionProps) {
  return (
    <section id="work" className={`py-32 md:py-48 px-6 md:px-12 relative transition-colors duration-500 ${isDark ? "bg-[#1a1a1a]" : "bg-white"}`}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 0.5, x: 0 }} viewport={{ once: true }} className="text-xs tracking-[0.3em] uppercase mb-4">Featured Work</motion.p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">Selected Projects</h2>
          </div>
          <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 0.6, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className={`mt-6 md:mt-0 text-sm max-w-xs ${isDark ? "text-white/60" : "text-[#242222]/60"}`}>
            A curated selection of our finest architectural achievements
          </motion.p>
        </motion.div>

        <div className="space-y-40 md:space-y-60">
          {projects.map((project, idx) => (
            <ProjectItem key={project.id} project={project} index={idx} isDark={isDark} onClick={() => onProjectClick(project.id)} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
