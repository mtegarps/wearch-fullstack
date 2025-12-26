// ==================== SHARED TYPES ====================

export interface GalleryItem {
  url: string;
  title: string;
  description: string;
}

export interface Project {
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
  status?: string;
  featuredOnHome?: boolean;
  homeOrder?: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
}

export interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  items: string[];
}

export interface Contact {
  email: string;
  phone: string;
  address: string;
  fullAddress?: string;
  workingHours?: string;
  mapEmbed?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
}

export interface Settings {
  siteName: string;
  tagline: string;
  established: string;
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroTitleSize: string;
  heroSubtitleSize: string;
  heroTitleFont: string;
  heroTitleWeight: string;
  heroTitleColor: string;
  heroSubtitleFont: string;
  heroSubtitleWeight: string;
  heroSubtitleColor: string;
  heroTaglineFont: string;
  heroTaglineColor: string;
  heroBgType: string;
  heroBgColor: string;
  heroBgImage: string;
  heroBgVideo: string;
  heroBgOverlay: boolean;
  heroBgOverlayColor: string;
  heroBgOverlayOpacity: number;
  heroLayout: string;
  heroHeight: string;
  heroContentWidth: string;
  heroParallax: boolean;
  heroScrollIndicator: boolean;
  // Navigation
  navStyle: string;
  navPosition: string;
  navAlignment: string;
  navHeight: string;
  navBgColor: string;
  navBgOpacity: number;
  navHideOnScroll: boolean;
  navShowLogo: boolean;
  mobileMenuStyle: string;
  // Section visibility
  showHeroSection: boolean;
  showAboutSection: boolean;
  showProjectsSection: boolean;
  showTeamSection: boolean;
  showServicesSection: boolean;
  showContactSection: boolean;
  sectionOrder: string;
  sectionPadding: string;
  sectionAnimation: string;
  // About
  aboutSectionTitle: string;
  aboutSectionSubtitle: string;
  aboutQuote: string;
  aboutQuoteAuthor: string;
  aboutDescription1: string;
  aboutDescription2: string;
  // Stats
  projectsCompleted: string;
  projectsLabel: string;
  projectsDesc: string;
  yearsExperience: string;
  yearsLabel: string;
  yearsDesc: string;
  awardsWon: string;
  awardsLabel: string;
  awardsDesc: string;
  // Projects
  projectCardStyle: string;
  projectGridCols: number;
  projectAspectRatio: string;
  projectHoverEffect: string;
  projectShowInfo: boolean;
  projectShowCategory: boolean;
  projectShowYear: boolean;
  // Team
  teamSectionTitle: string;
  teamSectionSubtitle: string;
  teamLayout: string;
  teamCardStyle: string;
  teamShowSocial: boolean;
  teamGridCols: number;
  // Services
  servicesSectionTitle: string;
  servicesSectionSubtitle: string;
  serviceCardStyle: string;
  // Contact
  contactSectionTitle: string;
  contactSectionSubtitle: string;
  contactCTA: string;
  contactButtonText: string;
  // Footer
  footerDescription: string;
  copyrightText: string;
  // Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkBg: string;
  lightBg: string;
  darkText: string;
  lightText: string;
  mutedText: string;
  // Buttons
  buttonBg: string;
  buttonText: string;
  buttonHoverBg: string;
  buttonHoverText: string;
  buttonRadius: string;
  // Typography
  headingFont: string;
  headingWeight: string;
  headingColor: string;
  headingColorDark: string;
  bodyFont: string;
  bodyWeight: string;
  bodySize: string;
  bodyColor: string;
  bodyColorDark: string;
  navFont: string;
  navWeight: string;
  navSize: string;
  navLetterSpacing: string;
  // Effects
  enableGrain: boolean;
  enableCursor: boolean;
  enableAnimations: boolean;
  // Mobile
  mobileFontScale: number;
  mobileDisableAnimations: boolean;
  // Accessibility
  enableHighContrast: boolean;
  fontSizeMultiplier: number;
  enableReduceMotion: boolean;
  focusIndicatorColor: string;
  // Maintenance
  maintenanceMode: boolean;
  maintenanceTitle: string;
  maintenanceMessage: string;
  maintenanceEndDate: string;
  maintenanceAllowAdmin: boolean;
  maintenanceBgImage: string;
  // Homepage
  homeProjectsCount?: number;
}

// Default/Fallback Settings
export const defaultSettings: Settings = {
  siteName: "wearch Studio",
  tagline: "Architecture Studio · Bandung",
  established: "2018",
  logoUrl: "",
  logoWidth: 40,
  logoHeight: 40,
  heroTitle: "Creating spaces that inspire life",
  heroSubtitle: "We transform ideas into architectural excellence through innovative design and meticulous attention to detail",
  heroButtonText: "View Projects",
  heroTitleSize: "8xl",
  heroSubtitleSize: "lg",
  heroTitleFont: "system-ui",
  heroTitleWeight: "300",
  heroTitleColor: "#FFFFFF",
  heroSubtitleFont: "system-ui",
  heroSubtitleWeight: "400",
  heroSubtitleColor: "#FFFFFF",
  heroTaglineFont: "system-ui",
  heroTaglineColor: "#FFFFFF",
  heroBgType: "color",
  heroBgColor: "#242222",
  heroBgImage: "",
  heroBgVideo: "",
  heroBgOverlay: true,
  heroBgOverlayColor: "#000000",
  heroBgOverlayOpacity: 0.5,
  heroLayout: "center",
  heroHeight: "100vh",
  heroContentWidth: "max-w-5xl",
  heroParallax: false,
  heroScrollIndicator: true,
  navStyle: "blur",
  navPosition: "fixed",
  navAlignment: "between",
  navHeight: "80px",
  navBgColor: "#FFFFFF",
  navBgOpacity: 0.9,
  navHideOnScroll: false,
  navShowLogo: true,
  mobileMenuStyle: "slide",
  showHeroSection: true,
  showAboutSection: true,
  showProjectsSection: true,
  showTeamSection: true,
  showServicesSection: true,
  showContactSection: true,
  sectionOrder: "hero,about,projects,team,services,contact",
  sectionPadding: "py-24",
  sectionAnimation: "fade",
  aboutSectionTitle: "Our Philosophy",
  aboutSectionSubtitle: "Architecture is the art of thoughtfully creating spaces that enhance human connection and inspire daily life",
  aboutQuote: "Architecture is the thoughtful making of space",
  aboutQuoteAuthor: "Louis Kahn",
  aboutDescription1: "At our core, we believe architecture transcends mere buildings—it's about creating experiences. We transform visions into architectural poetry that stands the test of time, blending innovation with timeless design principles.",
  aboutDescription2: "Our approach combines sustainable practices with cutting-edge technology, ensuring every structure we create is not only beautiful but also environmentally responsible and built for future generations.",
  projectsCompleted: "150+",
  projectsLabel: "Projects Completed",
  projectsDesc: "Across residential & commercial sectors",
  yearsExperience: "12",
  yearsLabel: "Years Experience",
  yearsDesc: "Of architectural excellence and innovation",
  awardsWon: "28",
  awardsLabel: "Awards Won",
  awardsDesc: "National & international recognitions",
  projectCardStyle: "overlay",
  projectGridCols: 3,
  projectAspectRatio: "4/3",
  projectHoverEffect: "zoom",
  projectShowInfo: true,
  projectShowCategory: true,
  projectShowYear: true,
  teamSectionTitle: "Meet Our Team",
  teamSectionSubtitle: "Passionate architects dedicated to excellence",
  teamLayout: "grid",
  teamCardStyle: "photo",
  teamShowSocial: true,
  teamGridCols: 3,
  servicesSectionTitle: "Our Expertise",
  servicesSectionSubtitle: "Comprehensive architectural solutions tailored to bring your vision to life",
  serviceCardStyle: "icon",
  contactSectionTitle: "Let's Create Together",
  contactSectionSubtitle: "Ready to transform your vision into architectural excellence? Let's start a conversation.",
  contactCTA: "Whether it's a residential dream home, a commercial space, or an urban development—we're here to bring your vision to life with innovative design and precision.",
  contactButtonText: "Start Your Project",
  footerDescription: "Creating architectural excellence in Bandung and beyond. Transforming visions into timeless spaces.",
  copyrightText: "© 2024 wearch",
  primaryColor: "#BBFF00",
  secondaryColor: "#c8ff00",
  accentColor: "#BBFF00",
  darkBg: "#242222",
  lightBg: "#F5F5F5",
  darkText: "#242222",
  lightText: "#FFFFFF",
  mutedText: "#B8B8B8",
  buttonBg: "#BBFF00",
  buttonText: "#242222",
  buttonHoverBg: "#242222",
  buttonHoverText: "#BBFF00",
  buttonRadius: "0px",
  headingFont: "system-ui",
  headingWeight: "300",
  headingColor: "#242222",
  headingColorDark: "#FFFFFF",
  bodyFont: "system-ui",
  bodyWeight: "400",
  bodySize: "16px",
  bodyColor: "#242222",
  bodyColorDark: "#FFFFFF",
  navFont: "system-ui",
  navWeight: "500",
  navSize: "12px",
  navLetterSpacing: "0.1em",
  enableGrain: true,
  enableCursor: true,
  enableAnimations: true,
  mobileFontScale: 1.0,
  mobileDisableAnimations: false,
  enableHighContrast: false,
  fontSizeMultiplier: 1.0,
  enableReduceMotion: false,
  focusIndicatorColor: "#BBFF00",
  maintenanceMode: false,
  maintenanceTitle: "We'll Be Back Soon",
  maintenanceMessage: "",
  maintenanceEndDate: "",
  maintenanceAllowAdmin: true,
  maintenanceBgImage: "",
};

// Default contact
export const defaultContact: Contact = {
  email: "hello@wearch.id",
  phone: "+62 812 3456 7890",
  address: "Bandung, Indonesia",
};
