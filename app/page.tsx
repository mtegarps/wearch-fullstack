"use client";

import { useState, useEffect } from "react";
import { useScroll, useSpring, useMotionValue } from "framer-motion";
import {
  Navigation,
  HeroSection,
  AboutSection,
  ProjectsSection,
  Footer,
  ProjectModal,
  GlobalEffects,
} from "@/components/sections";
import {
  Settings,
  Project,
  TeamMember,
  Contact,
  defaultSettings,
  defaultContact,
} from "@/lib/types";

export default function WearchLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, teamRes, contactRes, settingsRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/team"),
          fetch("/api/contact"),
          fetch("/api/settings"),
        ]);

        const [projectsData, teamData, contactData, settingsData] = await Promise.all([
          projectsRes.json(),
          teamRes.json(),
          contactRes.json(),
          settingsRes.json(),
        ]);

        setProjects(projectsData);
        setTeam(teamData);
        setContact(contactData);
        setSettings(settingsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setContact(defaultContact);
        setSettings(defaultSettings);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Mouse tracking for cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

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
    document.body.style.overflow = selectedProject !== null ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject]);

  // Load Swiper
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.7/swiper-bundle.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.7/swiper-bundle.min.js";
    document.head.appendChild(script);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#242222] flex items-center justify-center">
        <div className="text-center">
          <img 
            src={settings?.logoUrl} 
            alt="Logo" 
            className="mx-auto mb-4 h-16 w-auto animate-pulse"
          />
          <p className="text-white/40 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Use settings or defaults
  const displaySettings = settings || defaultSettings;
  const displayContact = contact || defaultContact;

  const selectedProjectData = projects.find((p) => p.id === selectedProject) || null;

  return (
    <div
      className={`${isDark ? "text-white" : "text-[#242222]"} overflow-hidden relative transition-colors duration-500`}
      style={{
        backgroundColor: isDark ? displaySettings.darkBg : displaySettings.lightBg,
        fontFamily: displaySettings.bodyFont || "system-ui",
        fontSize: `calc(${displaySettings.bodySize || "16px"} * ${displaySettings.fontSizeMultiplier || 1})`,
      }}
    >
      {/* Global Effects */}
      <GlobalEffects
        settings={displaySettings}
        isDark={isDark}
        cursorX={cursorX}
        cursorY={cursorY}
        scaleProgress={scaleProgress}
      />

      {/* Navigation */}
      <Navigation
        settings={displaySettings}
        isDark={isDark}
        setIsDark={setIsDark}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Hero Section */}
      <HeroSection settings={displaySettings} isDark={isDark} />

      {/* Projects Section */}
      <ProjectsSection
        settings={displaySettings}
        isDark={isDark}
        projects={projects}
        onProjectClick={(id) => {
          setSelectedProject(id);
          setCurrentImageIndex(0);
        }}
      />

      {/* About Section */}
      <AboutSection settings={displaySettings} isDark={isDark} />

      {/* Footer */}
      <Footer settings={displaySettings} isDark={isDark} contact={displayContact} />

      {/* Project Modal */}
      {selectedProject !== null && (
        <ProjectModal
          settings={displaySettings}
          project={selectedProjectData}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          onClose={() => {
            setSelectedProject(null);
            setCurrentImageIndex(0);
          }}
        />
      )}
    </div>
  );
}