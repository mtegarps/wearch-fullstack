"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ArrowRight, ArrowLeft, X, ChevronDown, Sun, Moon, Menu, Filter } from "lucide-react";
import Link from "next/link";

interface GalleryItem {
  url: string;
  title: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  image: string;
  category: string;
  gallery: GalleryItem[];
  area: string;
  duration: string;
  client: string;
  description: string;
}

// Fixed category order
const CATEGORY_ORDER = ["All", "Residential", "Commercial", "Urban Design", "Landscape Design"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState<string>("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Close modal on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (selectedProject !== null) {
        setSelectedProject(null);
        setCurrentImageIndex(0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedProject]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject]);

  // Load Swiper
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.7/swiper-bundle.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.7/swiper-bundle.min.js';
    document.head.appendChild(script);
  }, []);

  // Initialize Swiper when project is selected
  useEffect(() => {
    if (selectedProject !== null && typeof window !== 'undefined' && (window as any).Swiper) {
      setTimeout(() => {
        new (window as any).Swiper('.swiper-container', {
          slidesPerView: 'auto',
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
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          },
          keyboard: {
            enabled: true,
          },
          mousewheel: {
            forceToAxis: true,
            releaseOnEdges: true,
          },
          on: {
            slideChange: function(this: any) {
              setCurrentImageIndex(this.activeIndex);
            }
          }
        });
      }, 200);
    }
  }, [selectedProject]);

  // Get categories that have projects + ordered
  const availableCategories = CATEGORY_ORDER.filter(cat => 
    cat === "All" || projects.some(p => p.category === cat)
  );
  
  // Filter projects
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#242222] flex items-center justify-center">
        <div className="text-center">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="mx-auto mb-4 animate-pulse">
            <path d="M20 20 L35 80 L20 80 Z" fill="#BBFF00" />
            <path d="M42 20 L57 80 L42 80 Z" fill="#BBFF00" />
            <path d="M64 20 L79 80 L64 80 Z" fill="#BBFF00" />
          </svg>
          <p className="text-white/40 text-sm">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#242222] text-white" : "bg-[#F5F5F5] text-[#242222]"} transition-colors duration-500`}>
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      >
        <div className="w-full h-full bg-[#BBFF00] rounded-full" />
      </motion.div>

      {/* Subtle Grain Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 4px)`,
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                <path d="M20 20 L35 80 L20 80 Z" fill="#c8ff00" />
                <path d="M42 20 L57 80 L42 80 Z" fill="#c8ff00" />
                <path d="M64 20 L79 80 L64 80 Z" fill="#c8ff00" />
              </svg>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none text-[#242222]" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontWeight: 700 }}>
                  Wearch Studio
                </span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mt-0.5" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontWeight: 500 }}>
                  est 2018
                </span>
              </div>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {["Work", "About", "Contact"].map((item) => (
              <Link key={item} href={`/#${item.toLowerCase()}`}>
                <motion.span whileHover={{ y: -2 }} className="text-sm tracking-[0.1em] uppercase text-gray-600 hover:text-[#c8ff00] transition-colors cursor-pointer">
                  {item}
                </motion.span>
              </Link>
            ))}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                isDark ? "border-[#BBFF00] bg-[#BBFF00]/10 text-[#BBFF00]" : "border-gray-300 bg-white text-gray-600 hover:border-[#c8ff00] hover:text-[#c8ff00]"
              }`}
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, pointerEvents: isMenuOpen ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-30 flex items-center justify-center md:hidden ${isDark ? "bg-[#242222]" : "bg-[#F5F5F5]"}`}
      >
        <div className="space-y-8 text-center">
          {["Work", "About", "Contact"].map((item, idx) => (
            <motion.div key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }} transition={{ delay: idx * 0.1 }}>
              <Link href={`/#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>
                <span className="block text-4xl font-light tracking-tight">{item}</span>
              </Link>
            </motion.div>
          ))}
          <motion.button
            onClick={() => setIsDark(!isDark)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
            transition={{ delay: 0.3 }}
            className={`w-14 h-14 rounded-full border-2 mx-auto flex items-center justify-center ${
              isDark ? "border-[#BBFF00] bg-[#BBFF00]/10 text-[#BBFF00]" : "border-[#B8B8B8] bg-white text-[#242222]"
            }`}
          >
            {isDark ? <Moon size={24} /> : <Sun size={24} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <Link href="/">
              <motion.div
                whileHover={{ x: -5 }}
                className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase opacity-60 hover:opacity-100 transition-opacity mb-8 cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </motion.div>
            </Link>

            <div className="flex items-center gap-6 mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="h-px bg-[#BBFF00]"
              />
              <span className={`text-xs tracking-[0.3em] uppercase ${isDark ? "text-white/50" : "text-[#242222]/50"}`}>
                Portfolio
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
              All Projects
            </h1>

            <p className={`text-lg max-w-2xl ${isDark ? "text-white/60" : "text-[#242222]/60"}`}>
              Explore our complete collection of architectural works spanning residential, commercial, and urban developments.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <Filter size={18} className="opacity-50" />
            {availableCategories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-all ${
                  filter === cat
                    ? "bg-[#BBFF00] border-[#BBFF00] text-[#242222]"
                    : isDark
                    ? "border-white/20 hover:border-[#BBFF00]"
                    : "border-black/20 hover:border-[#BBFF00]"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProject(project.id);
                  setCurrentImageIndex(0);
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Hover Info */}
                  <motion.div
                    className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <div className="flex items-center gap-3 text-white">
                      <span className="text-sm tracking-[0.1em] uppercase">View Project</span>
                      <motion.div
                        className="w-10 h-10 border border-white rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs tracking-[0.1em] uppercase bg-black/30 text-white backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#BBFF00]/0 group-hover:border-[#BBFF00] transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#BBFF00]/0 group-hover:border-[#BBFF00] transition-all duration-500" />
                </div>

                {/* Info */}
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                  <h3 className="text-xl md:text-2xl font-light tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm opacity-50">
                    <span>{project.location}</span>
                    <span className="w-1 h-1 bg-current rounded-full" />
                    <span>{project.year}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-lg opacity-50">No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={() => {
            setSelectedProject(null);
            setCurrentImageIndex(0);
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black"
          />

          {/* Close Button - Fixed Position */}
          <motion.button
            onClick={() => {
              setSelectedProject(null);
              setCurrentImageIndex(0);
            }}
            className="fixed top-6 right-6 z-[110] w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20"
            whileHover={{
              scale: 1.1,
              rotate: 90,
              backgroundColor: "rgba(187, 255, 0, 0.2)",
              borderColor: "#BBFF00",
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <X size={24} />
          </motion.button>

          {/* Navigation Info - Fixed Position */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="fixed top-6 left-6 z-[110] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 border border-white/20">
              <p className="text-xs tracking-[0.2em] uppercase opacity-60 mb-1">
                Viewing
              </p>
              <p className="text-sm font-light">
                {projects.find((p) => p.id === selectedProject)?.title}
              </p>
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
              {String(
                projects.find((p) => p.id === selectedProject)?.gallery
                  .length || 0
              ).padStart(2, "0")}
            </span>
          </motion.div>

          {/* Swiper Container - Full Screen */}
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
            <div className="swiper-container w-full h-full">
              <div className="swiper-wrapper items-center">
                {projects
                  .find((p) => p.id === selectedProject)
                  ?.gallery.map((item, idx) => (
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
              {projects
                .find((p) => p.id === selectedProject)
                ?.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    className={`swiper-pagination-bullet h-1 transition-all ${
                      currentImageIndex === idx
                        ? "w-12 bg-[#BBFF00]"
                        : "w-8 bg-white/30 hover:bg-white/50"
                    }`}
                    data-index={idx}
                  />
                ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Swiper Custom Styles */}
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
    </div>
  );
}