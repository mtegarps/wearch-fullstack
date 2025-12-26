"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Settings } from "@/lib/types";

interface HeroSectionProps {
  settings: Settings;
  isDark: boolean;
}

export default function HeroSection({ settings, isDark }: HeroSectionProps) {
  if (settings.showHeroSection === false) return null;

  // Split title for animation
  const titleWords = settings.heroTitle?.split(" ") || [];
  const mainTitle = titleWords.slice(0, -2).join(" ");
  const italicTitle = titleWords.slice(-2).join(" ");

  // Cek apakah pakai video background
  const isUsingVideo = settings.heroBgType === "video" && settings.heroBgVideo;

  // Get title size class
  const getTitleSizeClass = () => {
    switch (settings.heroTitleSize) {
      case "9xl":
        return "text-5xl md:text-7xl lg:text-9xl";
      case "8xl":
        return "text-5xl md:text-7xl lg:text-8xl";
      case "7xl":
        return "text-4xl md:text-6xl lg:text-7xl";
      case "6xl":
        return "text-4xl md:text-5xl lg:text-6xl";
      case "5xl":
        return "text-3xl md:text-4xl lg:text-5xl";
      default:
        return "text-2xl md:text-3xl lg:text-4xl";
    }
  };

  // Get subtitle size class
  const getSubtitleSizeClass = () => {
    switch (settings.heroSubtitleSize) {
      case "2xl":
        return "text-xl md:text-2xl";
      case "xl":
        return "text-lg md:text-xl";
      case "lg":
        return "text-base md:text-lg";
      case "base":
        return "text-sm md:text-base";
      default:
        return "text-xs md:text-sm";
    }
  };

  // Get layout alignment
  const getLayoutAlignment = () => {
    switch (settings.heroLayout) {
      case "left":
        return "text-left mr-auto";
      case "right":
        return "text-right ml-auto";
      default:
        return "text-center mx-auto";
    }
  };

  // Hero background always dark
  const heroBgColor = "#242222";

  // Check if video is YouTube
  const isYouTube = settings.heroBgVideo && (
    settings.heroBgVideo.includes('youtube.com') || 
    settings.heroBgVideo.includes('youtu.be')
  );

  // Extract YouTube video ID
  let videoId = '';
  if (isYouTube && settings.heroBgVideo) {
    if (settings.heroBgVideo.includes('youtu.be/')) {
      videoId = settings.heroBgVideo.split('youtu.be/')[1].split('?')[0];
    } else if (settings.heroBgVideo.includes('youtube.com/watch?v=')) {
      videoId = settings.heroBgVideo.split('v=')[1].split('&')[0];
    } else if (settings.heroBgVideo.includes('youtube.com/embed/')) {
      videoId = settings.heroBgVideo.split('embed/')[1].split('?')[0];
    }
  }

  return (
    <section
      className="relative flex items-center justify-center px-6 md:px-12 pt-16 overflow-hidden"
      style={{
        minHeight: settings.heroHeight || "100vh",
        backgroundColor: heroBgColor,
      }}
    >
      {/* Background Image */}
      {settings.heroBgType === "image" && settings.heroBgImage && (
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
            settings.heroParallax ? "bg-fixed" : ""
          }`}
          style={{ backgroundImage: `url(${settings.heroBgImage})` }}
        />
      )}

      {/* Background Video - YouTube */}
      {settings.heroBgType === "video" && isYouTube && videoId && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080`}
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full pointer-events-none"
            style={{ 
              border: 'none',
              transform: 'translate(-50%, -50%)',
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}

      {/* Background Video - Regular File */}
      {settings.heroBgType === "video" && !isYouTube && settings.heroBgVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={settings.heroBgVideo} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      {(settings.heroBgType === "image" || settings.heroBgType === "video") &&
        settings.heroBgOverlay && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: settings.heroBgOverlayColor || "#000000",
              opacity: settings.heroBgOverlayOpacity || 0.5,
            }}
          />
        )}

      {/* Content - HIDE KALAU PAKAI VIDEO */}
      {!isUsingVideo && (
        <div
          className={`relative z-10 ${
            settings.heroContentWidth || "max-w-5xl"
          } ${getLayoutAlignment()}`}
        >
          {/* Logo */}
          {settings.logoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="mb-8 flex justify-center -mt-24"
            >
              <img
                src={settings.logoUrl}
                alt="Logo"
                className="h-16 md:h-20 lg:h-24 w-auto object-contain"
              />
            </motion.div>
          )}

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4"
          >
          <motion.p
            className="text-xs md:text-sm tracking-[0.3em] uppercase mb-8 text-white font-bold"
            style={{
              fontFamily: "Sk-Modernist, sans-serif",
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {settings.tagline}
          </motion.p>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className={`leading-tight mb-8 mt-24 tracking-tight ${getTitleSizeClass()}`}
            style={{
              fontFamily: "Sk-Modernist Bold, sans-serif",
              fontWeight: "700",
              color: "#FFFFFF",
            }}
          >
            {mainTitle}
            <br />
            <span
              className="inline-block"
              style={{ 
                fontFamily: "Sk-Modernist Bold, sans-serif",
                fontWeight: "700"
              }}
            >
              {italicTitle}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`mb-12 mt-12 max-w-2xl leading-relaxed ${
              settings.heroLayout === "center" ? "mx-auto" : ""
            } ${getSubtitleSizeClass()}`}
            style={{
              fontFamily: "Sk-Modernist, sans-serif",
              fontWeight: "400",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {settings.heroSubtitle}
          </motion.p>

          {/* CTA - Our Projects dengan Triangle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.a
              href="#work"
              whileHover={{ y: -5 }}
              className="text-sm md:text-base lg:text-lg tracking-tight text-white/80 hover:text-white transition-colors"
              style={{
                fontFamily: "Sk-Modernist Bold, sans-serif",
                fontWeight: "700",
              }}
            >
              our projects
            </motion.a>
            
            {/* Triangle Arrow */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px]"
              style={{
                borderTopColor: "#BBFF00",
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Scroll Indicator - HIDE KALAU PAKAI VIDEO */}
      {!isUsingVideo && settings.heroScrollIndicator !== false && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className={`text-xs tracking-[0.2em] uppercase ${
              isDark ? "text-white/40" : "text-[#242222]/40"
            }`}
            style={{
              fontFamily: "Sk-Modernist, sans-serif",
            }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}