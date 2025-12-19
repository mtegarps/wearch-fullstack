"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  isDark: boolean;
  settings?: any;
}

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string): string {
  if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([^?&]+)/);
    return match ? match[1] : '';
  }
  
  const regExp = /^.*(youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2]) ? match[2] : '';
}

// Helper function to extract start time from YouTube URL
function getYouTubeStartTime(url: string): number {
  const timeMatch = url.match(/[?&]t=(\d+)/);
  return timeMatch ? parseInt(timeMatch[1]) : 0;
}

export function HeroSection({ isDark, settings }: HeroSectionProps) {
  const heroTitle = settings?.heroTitle || "Creating spaces that inspire life";
  const heroSubtitle = settings?.heroSubtitle || "We transform ideas into architectural excellence through innovative design and meticulous attention to detail";
  const heroButtonText = settings?.heroButtonText || "View Projects";
  const tagline = settings?.tagline || "Architecture Studio · Bandung";
  
  // Background settings
  const heroBgType = settings?.heroBgType || "color"; // "color", "image", "video"
  const heroBgColor = settings?.heroBgColor;
  const heroBgImage = settings?.heroBgImage;
  const heroBgVideo = settings?.heroBgVideo;
  const heroBgOverlay = settings?.heroBgOverlay || false;
  const heroBgOverlayColor = settings?.heroBgOverlayColor || "#000000";
  const heroBgOverlayOpacity = settings?.heroBgOverlayOpacity || 0.5;
  const heroParallax = settings?.heroParallax || false;

  // Get background color
const backgroundColor = isDark 
  ? (settings?.darkBg || "#242222")
  : (settings?.lightBg || "#ffffff");

  // Check if background is light colored
  const isLightBackground = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  // Overlays for theme adaptation
  const needsDarkOverlay = isDark && heroBgType === "color" && heroBgColor && isLightBackground(heroBgColor);
  const needsLightOverlay = !isDark && heroBgType === "color" && heroBgColor && !isLightBackground(heroBgColor);

  // Check if video is YouTube
  const isYouTubeVideo = heroBgVideo && (
    heroBgVideo.includes('youtube.com') || 
    heroBgVideo.includes('youtu.be')
  );

  const youtubeVideoId = isYouTubeVideo ? getYouTubeVideoId(heroBgVideo) : '';
  const youtubeStartTime = isYouTubeVideo ? getYouTubeStartTime(heroBgVideo) : 0;

  // Hide content when video background is active
  const isVideoBackground = heroBgType === "video";

  // Text colors
  const textColor = isDark ? "text-white" : "text-[#242222]";
  const subtextColor = isDark ? "text-white/60" : "text-[#242222]/60";
  const taglineColor = isDark ? "text-white/40" : "text-[#242222]/40";

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative px-6 md:px-12 pt-24 overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Background Image */}
      {heroBgType === "image" && heroBgImage && (
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${heroParallax ? "bg-fixed" : ""}`}
          style={{ backgroundImage: `url(${heroBgImage})` }}
        />
      )}

      {/* Background Video */}
      {heroBgType === "video" && heroBgVideo && (
        <>
          {isYouTubeVideo ? (
            <iframe
              className="absolute inset-0 w-full h-full pointer-events-none"
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&playlist=${youtubeVideoId}${youtubeStartTime > 0 ? `&start=${youtubeStartTime}` : ''}`}
              allow="autoplay; encrypted-media"
              style={{ 
                border: 'none',
                transform: 'scale(1.5)',
                transformOrigin: 'center center'
              }}
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={heroBgVideo} type="video/mp4" />
            </video>
          )}
        </>
      )}

      {/* Overlay for image/video */}
      {(heroBgType === "image" || heroBgType === "video") && heroBgOverlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: heroBgOverlayColor,
            opacity: heroBgOverlayOpacity,
          }}
        />
      )}

      {/* Theme-adaptive overlay for color backgrounds */}
      {needsDarkOverlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      
      {needsLightOverlay && (
        <div className="absolute inset-0 bg-white/50" />
      )}

      {/* Content - Hidden when video background */}
      {!isVideoBackground && (
        <div className="relative z-10 text-center max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.p 
              className={`text-xs md:text-sm tracking-[0.3em] uppercase mb-8 ${taglineColor}`}
              animate={{ opacity: [0.4, 0.6, 0.4] }} 
              transition={{ duration: 3, repeat: Infinity }}
            >
              {tagline}
            </motion.p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, delay: 0.4 }}
            className={`text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-8 tracking-tight ${textColor}`}
          >
            {heroTitle.split(" ").slice(0, -2).join(" ")}<br />
            <motion.span 
              className="inline-block italic font-extralight" 
              whileHover={{ skewX: -3, x: 10, transition: { duration: 0.3 } }}
            >
              {heroTitle.split(" ").slice(-2).join(" ")}
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.6 }}
            className={`text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed ${subtextColor}`}
          >
            {heroSubtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.a 
              href="#work" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#BBFF00] text-[#242222] text-sm tracking-[0.1em] uppercase relative overflow-hidden font-semibold"
            >
              <motion.div 
                className={`absolute inset-0 ${isDark ? "bg-white" : "bg-[#242222]"}`} 
                initial={{ scaleX: 0 }} 
                whileHover={{ scaleX: 1 }} 
                transition={{ duration: 0.4 }} 
                style={{ originX: 0 }} 
              />
              <span className={`relative z-10 transition-colors ${isDark ? "group-hover:text-[#242222]" : "group-hover:text-[#BBFF00]"}`}>
                {heroButtonText}
              </span>
              <motion.span 
                animate={{ x: [0, 5, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity }} 
                className={`relative z-10 ${isDark ? "group-hover:text-[#242222]" : "group-hover:text-[#BBFF00]"}`}
              >
                <ArrowRight size={16} />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      )}

      {/* Scroll Indicator - Hidden when video background */}
      {!isVideoBackground && (
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5 }}
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }} 
            className={isDark ? "text-white/30" : "text-[#242222]/30"}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}