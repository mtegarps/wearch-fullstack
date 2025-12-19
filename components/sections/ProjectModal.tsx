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
          slidesPerView: 1.2,
          spaceBetween: 20,
          centeredSlides: true,
          speed: 800,
          loop: false,
          grabCursor: true,
          freeMode: {
            enabled: true,
            momentum: true,
            momentumRatio: 0.8,
            momentumVelocityRatio: 0.8,
            momentumBounce: false,
          },
          resistance: true,
          resistanceRatio: 0.5,
          watchSlidesProgress: true,
          navigation: {
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          },
          keyboard: { enabled: true },
          mousewheel: { forceToAxis: true, releaseOnEdges: true, sensitivity: 1 },
          breakpoints: {
            320: { slidesPerView: 1.1, spaceBetween: 15 },
            640: { slidesPerView: 1.15, spaceBetween: 20 },
            768: { slidesPerView: 1.2, spaceBetween: 25 },
            1024: { slidesPerView: 1.25, spaceBetween: 30 },
          },
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

      {/* Gallery Swiper */}
      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 md:px-0">
        <div className="w-full max-w-6xl mx-auto h-full">
          <div className="swiper-container w-full h-full">
            <div className="swiper-wrapper">
              {project.gallery.map((item, idx) => (
                <div key={idx} className="swiper-slide">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-5xl px-4">
                      {/* Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="w-full md:w-2/3 aspect-[4/3] relative overflow-hidden"
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className="relative w-full h-full object-contain drop-shadow-2xl"
                        />
                        <div
                          className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 transition-all duration-500"
                          style={{ borderColor: `${settings.primaryColor}80` }}
                        />
                        <div
                          className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 transition-all duration-500"
                          style={{ borderColor: `${settings.primaryColor}80` }}
                        />
                      </motion.div>

                      {/* Description */}
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="w-full md:w-1/3 h-auto space-y-6 text-white"
                      >
                        <div
                          className="h-px"
                          style={{ background: `linear-gradient(to right, ${settings.primaryColor}, transparent)` }}
                        />
                        <div>
                          <p
                            className="text-xs tracking-[0.3em] uppercase mb-3 opacity-50"
                            style={{ color: settings.primaryColor }}
                          >
                            {String(idx + 1).padStart(2, "0")} — Featured View
                          </p>
                          <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-tight mb-4">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm md:text-base leading-relaxed text-white/80">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                          <div className="w-12 h-px bg-white/30" />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: settings.primaryColor }}
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          overflow: visible !important;
        }
        .swiper-wrapper {
          align-items: center;
        }
        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
        }
        .swiper-slide-active {
          opacity: 1;
          z-index: 10;
        }
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          background-color: rgba(187, 255, 0, 0.2);
          transform: scale(1.1);
        }
      `}</style>
    </motion.div>
  );
}
