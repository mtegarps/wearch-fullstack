"use client";

import { motion, MotionValue } from "framer-motion";
import { Settings } from "@/lib/types";

interface GlobalEffectsProps {
  settings: Settings;
  isDark: boolean;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  scaleProgress: MotionValue<number>;
}

export default function GlobalEffects({
  settings,
  isDark,
  cursorX,
  cursorY,
  scaleProgress,
}: GlobalEffectsProps) {
  return (
    <>
      {/* Custom Cursor */}
      {settings.enableCursor !== false && (
        <motion.div
          className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference hidden md:block"
          style={{ x: cursorX, y: cursorY }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: settings.primaryColor || "#BBFF00" }}
          />
        </motion.div>
      )}

      {/* Grain Texture */}
      {settings.enableGrain !== false && (
        <div
          className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${
              isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"
            } 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, ${
              isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"
            } 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 4px)`,
          }}
        />
      )}

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{
          scaleX: scaleProgress,
          backgroundColor: settings.primaryColor || "#BBFF00",
        }}
      />

      {/* Swiper CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.7/swiper-bundle.min.css"
      />
    </>
  );
}
