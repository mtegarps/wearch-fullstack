"use client";

interface GrainOverlayProps {
  isDark: boolean;
}

export function GrainOverlay({ isDark }: GrainOverlayProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 4px),
                         repeating-linear-gradient(90deg, transparent, transparent 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 2px, ${isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)"} 4px)`,
      }}
    />
  );
}
