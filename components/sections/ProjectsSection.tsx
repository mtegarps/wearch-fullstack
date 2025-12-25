"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      className="relative mb-12 md:mb-16"
      style={{ y, opacity }}
    >
      {/* Image Gallery Container - With Padding */}
      <div className="relative w-full px-6 md:px-12 lg:px-16">
        {/* Scroll Container - Smooth free scroll with gap */}
        <div
          className="w-full overflow-x-auto overflow-y-hidden scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onScroll={(e) => {
            const container = e.currentTarget;
            const scrollLeft = container.scrollLeft;
            const itemWidth = container.clientWidth + 20; // Include gap
            const newIndex = Math.round(scrollLeft / itemWidth);
            if (newIndex !== currentImageIndex) {
              setCurrentImageIndex(newIndex);
            }
          }}
        >
          <div className="flex gap-5">
            {project.gallery.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-full"
              >
                {/* Image Container - Reduced Height */}
                <motion.div
                  className="relative w-full h-[40vh] md:h-[45vh] group cursor-pointer rounded-sm overflow-hidden"
                  onClick={() => onProjectClick(project.id)}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                >
                  {/* Main Image */}
                  <img
                    src={item.url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* FIRST IMAGE ONLY - Complete Project Info (SMALLER) */}
                  {idx === 0 && (
                    <>
                      {/* Top Section - Category (Smaller) */}
                      <motion.div
                        className="absolute top-6 left-6 md:top-8 md:left-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        <div className="inline-flex items-center justify-center bg-[#BBFF00]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2">
                          <span
                            className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-medium text-center"
                            style={{
                              fontFamily: "Sk-Modernist Bold, sans-serif",
                              fontWeight: 700,
                              color: "#242222",
                            }}
                          >
                            {project.category}
                          </span>
                        </div>
                      </motion.div>

                      {/* Bottom Section - Main Info (Compact) */}
                      <motion.div
                        className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <div className="max-w-3xl">
                          {/* Title (Smaller) */}
                          <h3
                            className="text-xl md:text-3xl lg:text-4xl text-white mb-2 md:mb-3 tracking-tight leading-tight"
                            style={{
                              fontFamily: "Sk-Modernist Bold, sans-serif",
                              fontWeight: 700,
                            }}
                          >
                            {project.title}
                          </h3>

                          {/* Location, Year & Client (Compact) */}
                          <div
                            className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4 text-xs md:text-sm"
                            style={{
                              fontFamily: "Sk-Modernist, sans-serif",
                              fontWeight: 400,
                            }}
                          >
                            <span className="text-white/90 tracking-[0.08em] uppercase">
                              {project.location}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-[#BBFF00]" />
                            <span className="text-white/90">{project.year}</span>
                            {project.client && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-[#BBFF00]" />
                                <span className="text-white/90">Client: {project.client}</span>
                              </>
                            )}
                          </div>

                          {/* Area Info - Compact Box */}
                          <div className="mb-3 md:mb-4">
                            <div className="inline-block bg-white/10 backdrop-blur-md px-2.5 py-1.5 md:px-3 md:py-2 border border-white/20">
                              <p
                                className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase mb-0.5 text-[#BBFF00]"
                                style={{
                                  fontFamily: "Sk-Modernist, sans-serif",
                                  fontWeight: 400,
                                }}
                              >
                                Area
                              </p>
                              <p
                                className="text-[11px] md:text-xs text-white"
                                style={{
                                  fontFamily: "Sk-Modernist Bold, sans-serif",
                                  fontWeight: 700,
                                }}
                              >
                                {project.area}
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          {project.description && (
                            <motion.p
                              className="text-sm md:text-base text-white/90 leading-relaxed max-w-2xl"
                              style={{
                                fontFamily: "Sk-Modernist, sans-serif",
                                fontWeight: 400,
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={isInView ? { opacity: 1, y: 0 } : {}}
                              transition={{ delay: 0.4, duration: 0.6 }}
                            >
                              {project.description}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Desktop, Positioned outside */}
        <div className="hidden lg:block">
          {currentImageIndex > 0 && (
            <motion.button
              onClick={() => {
                const container = ref.current?.querySelector(".overflow-x-auto");
                if (container) {
                  const scrollAmount = container.clientWidth + 20; // Include gap
                  container.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth",
                  });
                }
              }}
              className="absolute -left-20 top-1/2 -translate-y-1/2 w-16 h-16 bg-white hover:bg-[#BBFF00] text-[#242222] flex items-center justify-center transition-all shadow-lg z-10"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </motion.button>
          )}

          {currentImageIndex < project.gallery.length - 1 && (
            <motion.button
              onClick={() => {
                const container = ref.current?.querySelector(".overflow-x-auto");
                if (container) {
                  const scrollAmount = container.clientWidth + 20; // Include gap
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }
              }}
              className="absolute -right-20 top-1/2 -translate-y-1/2 w-16 h-16 bg-white hover:bg-[#BBFF00] text-[#242222] flex items-center justify-center transition-all shadow-lg z-10"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </motion.button>
          )}
        </div>

        {/* Progress Dots - Elegant */}
        {project.gallery.length > 1 && (
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {project.gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentImageIndex(idx);
                  const container = ref.current?.querySelector(".overflow-x-auto");
                  if (container) {
                    const scrollAmount = (container.clientWidth + 20) * idx; // Include gap
                    container.scrollTo({
                      left: scrollAmount,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`h-1.5 transition-all rounded-full ${
                  currentImageIndex === idx
                    ? "w-12 bg-[#BBFF00]"
                    : "w-1.5 bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ settings, isDark, projects, onProjectClick }: ProjectsSectionProps) {
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (settings.showProjectsSection === false) return null;

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  // Filter projects by category
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <>
      <section
        id="work"
        className={`${settings.sectionPadding || "py-20"} md:py-32 lg:py-40 relative transition-colors duration-500`}
        style={{ backgroundColor: "#242222" }}
      >
        <div className="max-w-[1920px] mx-auto relative">
          {/* Header - Left Aligned, Smaller */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 md:mb-16 px-6 md:px-12 lg:px-16"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight"
              style={{
                fontFamily: "Sk-Modernist Bold, sans-serif",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              our projects
            </h2>
            <motion.div
              className="w-16 h-1 bg-[#BBFF00] mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.div>

          {/* Projects List */}
          <div>
            {projects.map((project, idx) => (
              <ProjectItem
                key={project.id}
                project={project}
                index={idx}
                onProjectClick={onProjectClick}
                settings={settings}
              />
            ))}
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mt-24 md:mt-32 px-6"
          >
            <motion.button
              onClick={() => setShowAllModal(true)}
              className="group inline-flex items-center gap-5 text-sm md:text-base tracking-[0.15em] uppercase"
              whileHover={{ gap: "32px" }}
              style={{
                fontFamily: "Sk-Modernist Bold, sans-serif",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              <span className="group-hover:text-[#BBFF00] transition-colors duration-300">
                View All Projects
              </span>
              {/* Triangle Arrow Right */}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-l-[18px]"
                style={{
                  borderLeftColor: "#BBFF00",
                }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Hide scrollbar */}
        <style jsx global>{`
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#242222] overflow-hidden"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowAllModal(false)}
              className="fixed top-8 right-8 z-50 w-14 h-14 bg-white hover:bg-[#BBFF00] text-[#242222] flex items-center justify-center transition-all shadow-lg"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={24} strokeWidth={2.5} />
            </motion.button>

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto">
              <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-20 md:py-24">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="mb-16 md:mb-20"
                >
                  <h2
                    className="text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight"
                    style={{
                      fontFamily: "Sk-Modernist Bold, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    All Projects
                  </h2>
                  <div className="w-24 h-1 bg-[#BBFF00]" />
                </motion.div>

                {/* Category Filter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-12 flex flex-wrap gap-3"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-3 text-sm tracking-[0.15em] uppercase transition-all ${
                        selectedCategory === category
                          ? "bg-[#BBFF00] text-[#242222]"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                      style={{
                        fontFamily: "Sk-Modernist Bold, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>

                {/* Projects Count */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/60 mb-8 text-sm"
                  style={{
                    fontFamily: "Sk-Modernist, sans-serif",
                  }}
                >
                  Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                </motion.p>

                {/* Projects Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  layout
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                        className="group cursor-pointer"
                        onClick={() => {
                          onProjectClick(project.id);
                        }}
                      >
                        {/* Project Card */}
                        <div className="relative overflow-hidden bg-white/5 h-[400px]">
                          {/* Image */}
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <div className="bg-[#BBFF00] px-3 py-1.5">
                              <span
                                className="text-[9px] tracking-[0.2em] uppercase text-[#242222]"
                                style={{
                                  fontFamily: "Sk-Modernist Bold, sans-serif",
                                  fontWeight: 700,
                                }}
                              >
                                {project.category}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3
                              className="text-2xl text-white mb-2 tracking-tight"
                              style={{
                                fontFamily: "Sk-Modernist Bold, sans-serif",
                                fontWeight: 700,
                              }}
                            >
                              {project.title}
                            </h3>

                            <div
                              className="flex items-center gap-2 text-xs text-white/80 mb-3"
                              style={{
                                fontFamily: "Sk-Modernist, sans-serif",
                              }}
                            >
                              <span className="tracking-[0.08em] uppercase">{project.location}</span>
                              <span className="w-1 h-1 rounded-full bg-[#BBFF00]" />
                              <span>{project.year}</span>
                            </div>

                            {/* Hover Details */}
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              whileHover={{ opacity: 1, height: "auto" }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-2 gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                <div className="bg-white/10 backdrop-blur-md px-2.5 py-1.5 border border-white/20">
                                  <p
                                    className="text-[8px] tracking-[0.2em] uppercase mb-0.5 text-[#BBFF00]"
                                    style={{
                                      fontFamily: "Sk-Modernist, sans-serif",
                                    }}
                                  >
                                    Area
                                  </p>
                                  <p
                                    className="text-[11px] text-white"
                                    style={{
                                      fontFamily: "Sk-Modernist Bold, sans-serif",
                                      fontWeight: 700,
                                    }}
                                  >
                                    {project.area}
                                  </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md px-2.5 py-1.5 border border-white/20">
                                  <p
                                    className="text-[8px] tracking-[0.2em] uppercase mb-0.5 text-[#BBFF00]"
                                    style={{
                                      fontFamily: "Sk-Modernist, sans-serif",
                                    }}
                                  >
                                    Duration
                                  </p>
                                  <p
                                    className="text-[11px] text-white"
                                    style={{
                                      fontFamily: "Sk-Modernist Bold, sans-serif",
                                      fontWeight: 700,
                                    }}
                                  >
                                    {project.duration}
                                  </p>
                                </div>
                              </div>

                              <p
                                className="text-xs text-white/80 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150"
                                style={{
                                  fontFamily: "Sk-Modernist, sans-serif",
                                }}
                              >
                                {project.description}
                              </p>
                            </motion.div>

                            {/* Arrow Icon */}
                            <motion.div
                              className="absolute bottom-6 right-6 w-10 h-10 bg-[#BBFF00] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              whileHover={{ scale: 1.1, rotate: -45 }}
                            >
                              <ArrowRight size={16} style={{ color: "#242222" }} strokeWidth={2.5} />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}