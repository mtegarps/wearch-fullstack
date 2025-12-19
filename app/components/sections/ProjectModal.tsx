"use client";

import { motion } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { Project } from "@/app/types";

interface ProjectModalProps {
  project: Project | undefined;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  onClose: () => void;
}

export function ProjectModal({
  project,
  currentImageIndex,
  setCurrentImageIndex,
  onClose,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-[#242222]"
      onClick={onClose}
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="fixed top-6 right-6 z-[110] w-12 h-12 bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#BBFF00] hover:text-[#242222] transition-all border border-white/20 hover:border-[#BBFF00]"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={20} />
      </motion.button>

      {/* Project Title - Fixed Position */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-6 left-6 z-[110] bg-white/10 backdrop-blur-md text-white px-6 py-3 border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <p className="text-xs tracking-[0.2em] uppercase opacity-50">
            {project.category}
          </p>
          <p className="text-sm font-light">{project.title}</p>
        </div>
      </motion.div>

      {/* Image Counter - Fixed Position */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-6 left-6 z-[110] bg-white/10 backdrop-blur-md text-white px-6 py-3 text-sm border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[#BBFF00] font-light text-lg">
          {String(currentImageIndex + 1).padStart(2, "0")}
        </span>
        <span className="opacity-40 mx-2">/</span>
        <span className="opacity-60">
          {String(project.gallery.length).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Scroll Container - Horizontal Smooth Scroll */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          delay: 0.1,
        }}
        className="relative w-full h-full flex items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onScroll={(e) => {
            const container = e.currentTarget;
            const scrollLeft = container.scrollLeft;
            const itemWidth = container.clientWidth;
            const newIndex = Math.round(scrollLeft / itemWidth);
            if (newIndex !== currentImageIndex) {
              setCurrentImageIndex(newIndex);
            }
          }}
        >
          <div className="flex h-full">
            {project.gallery.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-8 md:p-16"
              >
                {/* Image Container - Full Width */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                  className="relative w-full h-full flex items-center justify-center group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent blur-2xl scale-95" />

                  <img
                    src={item.url}
                    alt={item.title}
                    className="relative w-full h-full object-contain drop-shadow-2xl"
                  />

                  <motion.div
                    className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#BBFF00]/0 group-hover:border-[#BBFF00]/50 transition-all duration-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#BBFF00]/0 group-hover:border-[#BBFF00]/50 transition-all duration-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />

                  {/* Overlay info saat hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-md p-6 border border-white/20"
                  >
                    <p className="text-xs tracking-[0.3em] uppercase mb-2 text-[#BBFF00]">
                      {String(idx + 1).padStart(2, "0")} — {item.title}
                    </p>
                    <p className="text-sm leading-relaxed text-white/80">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Only show on desktop */}
        <div className="hidden md:block">
          {currentImageIndex > 0 && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                const container = document.querySelector(".overflow-x-auto");
                if (container) {
                  container.scrollBy({
                    left: -container.clientWidth,
                    behavior: "smooth",
                  });
                }
              }}
              className="fixed left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 hover:border-[#BBFF00] z-[105]"
              whileHover={{
                scale: 1.1,
                x: -5,
                backgroundColor: "rgba(187, 255, 0, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ChevronDown size={24} className="rotate-90" />
            </motion.button>
          )}
          {currentImageIndex < project.gallery.length - 1 && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                const container = document.querySelector(".overflow-x-auto");
                if (container) {
                  container.scrollBy({
                    left: container.clientWidth,
                    behavior: "smooth",
                  });
                }
              }}
              className="fixed right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 hover:border-[#BBFF00] z-[105]"
              whileHover={{
                scale: 1.1,
                x: 5,
                backgroundColor: "rgba(187, 255, 0, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ChevronDown size={24} className="-rotate-90" />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-[110] flex gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {project.gallery.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              setCurrentImageIndex(idx);
              const container = document.querySelector(".overflow-x-auto");
              if (container) {
                container.scrollTo({
                  left: container.clientWidth * idx,
                  behavior: "smooth",
                });
              }
            }}
            className={`h-1 transition-all ${
              currentImageIndex === idx
                ? "w-12 bg-[#BBFF00]"
                : "w-8 bg-white/30 hover:bg-white/50"
            }`}
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}