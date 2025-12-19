"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { Settings, Project } from "@/lib/types";

interface ProjectModalProps {
  settings: Settings;
  project: Project | null;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  onClose: () => void;
}

export default function ProjectModal({
  settings,
  project,
  currentImageIndex,
  setCurrentImageIndex,
  onClose,
}: ProjectModalProps) {
  // Initialize Swiper when modal opens
  useEffect(() => {
    if (project && typeof window !== "undefined" && (window as any).Swiper) {
      setTimeout(() => {
        new (window as any).Swiper(".swiper-container", {
          slidesPerView: "auto",
          spaceBetween: 20,
          centeredSlides: false,
          speed: 600,
          loop: false,
          grabCursor: true,
          freeMode: {
            enabled: true,
            momentum: true,
            momentumRatio: 0.5,
            momentumVelocityRatio: 0.5,
          },
          resistance: true,
          resistanceRatio: 0.85,
          navigation: {
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          },
          keyboard: { enabled: true },
          mousewheel: { forceToAxis: true, releaseOnEdges: true },
          on: {
            slideChange: function (this: any) {
              setCurrentImageIndex(this.activeIndex);
            },
          },
        });
      }, 200);
    }
  }, [project, setCurrentImageIndex]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ backgroundColor: settings.darkBg }}
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        onClick={onClose}
        className="fixed top-6 right-6 z-[110] w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 hover:border-[#BBFF00]"
        style={{ borderColor: `${settings.primaryColor}4D` }}
      >
        <X size={24} />
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-6 left-6 z-[105] space-y-2"
      >
        <div className="flex items-center gap-4">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: settings.primaryColor }}
          >
            {project.category}
          </span>
          <div className="w-8 h-px" style={{ backgroundColor: `${settings.primaryColor}80` }} />
          <span className="text-white/40 text-xs">{project.year}</span>
        </div>
        <h2 className="text-2xl md:text-3xl text-white font-light tracking-tight">
          {project.title}
        </h2>
        <p className="text-white/40 text-sm max-w-md">{project.location}</p>
      </motion.div>

      {/* Image Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-6 left-6 z-[110] bg-white/10 backdrop-blur-md text-white px-6 py-3 text-sm border border-white/20"
      >
        <span className="font-light text-lg" style={{ color: settings.primaryColor }}>
          {String(currentImageIndex + 1).padStart(2, "0")}
        </span>
        <span className="opacity-40 mx-2">/</span>
        <span className="opacity-60">
          {String(project.gallery.length).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Gallery Swiper - Full Screen */}
      <div className="swiper-container w-full h-full">
        <div className="swiper-wrapper items-center">
          {project.gallery.map((item, idx) => (
            <div key={idx} className="swiper-slide !w-auto !h-full flex items-center">
              <div className="h-full flex items-center">
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-full w-auto max-h-screen object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="swiper-button-prev-custom fixed left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 hover:border-[#BBFF00] z-[105]">
        <ChevronDown size={24} className="rotate-90" />
      </button>
      <button className="swiper-button-next-custom fixed right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 hover:border-[#BBFF00] z-[105]">
        <ChevronDown size={24} className="-rotate-90" />
      </button>

      {/* Progress Indicator */}
      <div className="fixed bottom-6 right-6 z-[110] flex gap-2">
        {project.gallery.map((_, idx) => (
          <button
            key={idx}
            className={`h-1 transition-all ${
              currentImageIndex === idx ? "w-12" : "w-8 bg-white/30 hover:bg-white/50"
            }`}
            style={{
              backgroundColor: currentImageIndex === idx ? settings.primaryColor : undefined,
            }}
          />
        ))}
      </div>

      {/* Swiper Styles */}
      <style jsx global>{`
        .swiper-container {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .swiper-wrapper {
          display: flex;
          align-items: center;
          height: 100%;
        }
        .swiper-slide {
          flex-shrink: 0;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .swiper-slide img {
          display: block;
        }
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          transition: all 0.3s ease;
        }
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          background-color: rgba(187, 255, 0, 0.2);
          transform: translateY(-50%) scale(1.1);
        }
      `}</style>
    </motion.div>
  );
}