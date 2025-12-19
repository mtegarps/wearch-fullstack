"use client";

import { useState, useEffect } from "react";
import { useScroll, useSpring, useMotionValue } from "framer-motion";
import {
  Navigation,
  HeroSection,
  AboutSection,
  ProjectsSection,
  ServicesSection,
  ContactSection,
  Footer,
  ProjectModal,
  GlobalEffects,
} from "@/components/sections";
import {
  Settings,
  Project,
  TeamMember,
  Service,
  Contact,
  defaultSettings,
  defaultContact,
} from "@/lib/types";

// Fallback data
const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Modern Villa",
    location: "Dago",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
    category: "Residential",
    area: "450 m²",
    duration: "8 Months",
    client: "Private Client",
    description: "A harmonious blend of contemporary design and functional elegance.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop", title: "Grand Entrance", description: "A striking façade that welcomes you with clean lines." },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop", title: "Living Space", description: "An open-concept living area flooded with natural light." },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop", title: "Master Suite", description: "A serene private sanctuary featuring minimalist design." },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop", title: "Outdoor Terrace", description: "Expansive outdoor living space with integrated landscaping." },
    ],
  },
  {
    id: 2,
    title: "Creative Hub",
    location: "Bandung",
    year: "2023",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
    category: "Commercial",
    area: "1200 m²",
    duration: "14 Months",
    client: "Tech Startup Inc",
    description: "An innovative workspace designed to foster creativity and collaboration.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop", title: "Tower Exterior", description: "A bold architectural statement featuring glass and steel." },
      { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop", title: "Collaboration Space", description: "Flexible work zones designed to foster creativity." },
      { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop", title: "Innovation Lab", description: "A state-of-the-art workspace where ideas come to life." },
      { url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop", title: "Sky Lounge", description: "An elevated retreat offering panoramic city views." },
    ],
  },
  {
    id: 3,
    title: "Eco House",
    location: "Lembang",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
    category: "Residential",
    area: "320 m²",
    duration: "10 Months",
    client: "Green Living Co",
    description: "Sustainable architecture at its finest with eco-friendly systems.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop", title: "Sustainable Design", description: "Green architecture at its finest." },
      { url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=800&fit=crop", title: "Natural Interior", description: "Organic materials and earthy tones." },
      { url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop", title: "Garden Integration", description: "Lush greenery surrounds the structure." },
      { url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop", title: "Evening Ambiance", description: "Energy-efficient lighting design." },
    ],
  },
];

const fallbackTeam: TeamMember[] = [
  { id: 1, name: "Taufiq Ibrahim", role: "Lead Architect", specialty: "Conceptual Design", image: "https://i.ibb.co/S75HHXPg/taufiq.jpg" },
  { id: 2, name: "Azmi Azzami", role: "Design Director", specialty: "Urban Planning", image: "https://i.ibb.co/67RYqQfk/azmi.jpg" },
  { id: 3, name: "Alfiadi Rakhman", role: "Project Manager", specialty: "Execution & Quality", image: "https://i.ibb.co/Y4dq0226/alfiadi.jpg" },
];

const fallbackServices: Service[] = [
  { id: 1, title: "Architecture", icon: "▲", description: "Innovative spatial design solutions that blend form and function seamlessly.", items: ["Residential Design", "Commercial Spaces", "Urban Planning", "Conceptual Design"] },
  { id: 2, title: "Interior Design", icon: "●", description: "Curated interior experiences that reflect your vision and lifestyle.", items: ["Space Planning", "Furniture Design", "Material Selection", "Lighting Design"] },
  { id: 3, title: "Consulting", icon: "■", description: "Strategic project guidance from concept to completion.", items: ["Project Management", "Feasibility Studies", "Technical Advisory", "Quality Assurance"] },
];

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
  const [services, setServices] = useState<Service[]>([]);
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
        const [projectsRes, teamRes, servicesRes, contactRes, settingsRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/team"),
          fetch("/api/services"),
          fetch("/api/contact"),
          fetch("/api/settings"),
        ]);

        const [projectsData, teamData, servicesData, contactData, settingsData] = await Promise.all([
          projectsRes.json(),
          teamRes.json(),
          servicesRes.json(),
          contactRes.json(),
          settingsRes.json(),
        ]);

        setProjects(projectsData);
        setTeam(teamData);
        setServices(servicesData);
        setContact(contactData);
        setSettings(settingsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setProjects(fallbackProjects);
        setTeam(fallbackTeam);
        setServices(fallbackServices);
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
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="mx-auto mb-4 animate-pulse">
            <path d="M20 20 L35 80 L20 80 Z" fill="#BBFF00" />
            <path d="M42 20 L57 80 L42 80 Z" fill="#BBFF00" />
            <path d="M64 20 L79 80 L64 80 Z" fill="#BBFF00" />
          </svg>
          <p className="text-white/40 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Use settings or defaults
  const displaySettings = settings || defaultSettings;
  const displayContact = contact || defaultContact;
  const displayTeam = team.length > 0 ? team : fallbackTeam;
  const displayServices = services.length > 0 ? services : fallbackServices;
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  const selectedProjectData = displayProjects.find((p) => p.id === selectedProject) || null;

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
        projects={displayProjects}
        onProjectClick={(id) => {
          setSelectedProject(id);
          setCurrentImageIndex(0);
        }}
      />

      {/* About Section */}
      <AboutSection settings={displaySettings} isDark={isDark} team={displayTeam} />

      {/* Services Section */}
      <ServicesSection settings={displaySettings} isDark={isDark} services={displayServices} />

      {/* Contact Section */}
      <ContactSection settings={displaySettings} isDark={isDark} contact={displayContact} />

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
