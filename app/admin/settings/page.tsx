"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Save, Globe, Palette, Type, Image, FileText, Users, Briefcase, Mail, LayoutGrid, 
  Upload, Sparkles, MousePointer2, Eye, EyeOff, Monitor, Smartphone, Settings2,
  Navigation, Layers, Grid3X3, AlertTriangle, GalleryHorizontalEnd, Move,
  Play, ImageIcon, Video, AlignCenter, AlignLeft, AlignRight, SplitSquareHorizontal
} from "lucide-react";

// ==================== CLEAN GOOGLE FONTS (NO DUPLICATES) ====================
const GOOGLE_FONTS = [
  "Abel", "Abril Fatface", "Acme", "Actor", "Advent Pro", "Aldrich", "Alef", "Alegreya Sans",
  "Alex Brush", "Alfa Slab One", "Alike", "Alike Angular", "Allerta Stencil", "Allura",
  "Amaranth", "Amatic SC", "Amiko", "Amiri", "Andika", "Anonymous Pro", "Antic", "Antic Slab",
  "Antonio", "Arapey", "Architects Daughter", "Archivo", "Archivo Black", "Archivo Narrow",
  "Arimo", "Armata", "Artifika", "Arvo", "Asap", "Asap Condensed", "Assistant", "Athiti",
  "Atkinson Hyperlegible", "Audiowide", "Average", "Average Sans", "Azeret Mono",
  "B612", "Bai Jamjuree", "Balsamiq Sans", "Bangers", "Barlow", "Barlow Condensed",
  "Barlow Semi Condensed", "Barriecito", "Barrio", "Basic", "Baskervville", "Battambang",
  "Be Vietnam Pro", "Bebas Neue", "Belgrano", "Bellota", "BenchNine", "Berkshire Swash",
  "Big Shoulders Display", "BioRhyme", "Biryani", "Bitter", "Black And White Picture",
  "Black Han Sans", "Black Ops One", "Bodoni Moda", "Boogaloo", "Bowlby One", "Bowlby One SC",
  "Brawler", "Bree Serif", "Bubblegum Sans", "Buenard", "Bungee", "Bungee Inline", "Bungee Shade",
  "Cabin", "Cabin Condensed", "Cabin Sketch", "Cagliostro", "Cairo", "Calistoga", "Cambay",
  "Cambo", "Candal", "Cantarell", "Cantata One", "Cantora One", "Capriola", "Cardo", "Carme",
  "Carrois Gothic", "Carter One", "Catamaran", "Caudex", "Caveat", "Cedarville Cursive",
  "Ceviche One", "Chakra Petch", "Changa", "Changa One", "Chau Philomene One", "Chewy",
  "Chicle", "Chivo", "Cinzel", "Cinzel Decorative", "Coda", "Codystar", "Comfortaa",
  "Commissioner", "Concert One", "Contrail One", "Convergence", "Cookie", "Copse", "Corben",
  "Cormorant", "Cormorant Garamond", "Cormorant Infant", "Cormorant SC", "Cormorant Unicase",
  "Courgette", "Cousine", "Covered By Your Grace", "Creepster", "Crete Round", "Crimson Pro",
  "Crimson Text", "Croissant One", "Cuprum", "Cutive", "Cutive Mono",
  "DM Mono", "DM Sans", "DM Serif Display", "DM Serif Text", "Damion", "Dancing Script",
  "David Libre", "Dawning of a New Day", "Days One", "Dela Gothic One", "Delius",
  "Delius Swash Caps", "Delius Unicase", "Della Respira", "Devonshire", "Didact Gothic",
  "Diplomata", "Diplomata SC", "Do Hyeon", "Dokdo", "Domine", "Donegal One", "Doppio One",
  "Dorsa", "Dosis",
  "EB Garamond", "East Sea Dokdo", "Economica", "Eczar", "Electrolize", "Encode Sans",
  "Enriqueta", "Epilogue", "Exo 2",
  "Fahkwang", "Faster One", "Fauna One", "Fenix", "Figtree", "Finger Paint", "Fira Code",
  "Fira Mono", "Fira Sans", "Fontdiner Swanky", "Forum", "Fragment Mono", "Fraunces",
  "Fredoka One",
  "Gabriela", "Gaegu", "Gamja Flower", "Gelasio", "Gentium Book Basic", "Gilda Display",
  "Gloria Hallelujah", "Gothic A1", "Goudy Bookletter 1911", "Graduate", "Grand Hotel",
  "Gravitas One", "Great Vibes", "Gruppo", "Gudea", "Gugi",
  "Habibi", "Halant", "Hammersmith One", "Handlee", "Happy Monkey", "Headland One", "Heebo",
  "Henny Penny", "Hi Melody", "Hind", "Holtwood One SC", "Homemade Apple",
  "IBM Plex Mono", "IBM Plex Serif", "Iceland", "Inconsolata", "Indie Flower", "Inika",
  "Inknut Antiqua", "Inter", "Irish Grover", "Itim",
  "JetBrains Mono", "Josefin Slab", "Jost", "Jua", "Judson", "Just Another Hand",
  "K2D", "Kadwa", "Kameron", "Kanit", "Karla", "Kaushan Script", "Kelly Slab", "Kirang Haerang",
  "Knewave", "Kodchasan", "Kosugi", "Kosugi Maru", "Kranky", "Kristi", "Krub", "Kurale",
  "La Belle Aurore", "Laila", "Lato", "Leckerli One", "Ledger", "Lemon", "Lexend", "Libre Baskerville",
  "Libre Franklin", "Limelight", "Linden Hill", "Liu Jian Mao Cao", "Lobster", "Lobster Two",
  "Londrina Solid", "Long Cang", "Lora", "Love Ya Like A Sister", "Loved by the King",
  "Luckiest Guy", "Lustria",
  "M PLUS 1p", "M PLUS Rounded 1c", "Ma Shan Zheng", "Macondo", "Mada", "Major Mono Display",
  "Manrope", "Marcellus", "Marcellus SC", "Marck Script", "Marko One", "Martian Mono", "Martel",
  "Mate", "Mate SC", "Maven Pro", "Meddon", "Merriweather", "Merriweather Sans", "Michroma",
  "Mitr", "Monda", "Mono", "Monoton", "Montserrat", "Mr Dafoe", "Mukta", "Mulish",
  "Nanum Brush Script", "Nanum Gothic", "Nanum Gothic Coding", "Nanum Myeongjo", "Nanum Pen Script",
  "Neuton", "Newsreader", "Niconne", "Niramit", "Nixie One", "Nobile", "Norican",
  "Nothing You Could Do", "Noticia Text", "Noto Sans", "Noto Sans Arabic", "Noto Sans Bengali",
  "Noto Sans Devanagari", "Noto Sans Hebrew", "Noto Sans JP", "Noto Sans KR", "Noto Sans SC",
  "Noto Sans TC", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", "Noto Serif",
  "Noto Serif JP", "Noto Serif KR", "Noto Serif SC", "Noto Serif TC", "Nova Cut", "Nova Flat",
  "Nova Mono", "Nova Round", "Nova Slim", "Nova Square", "Nunito", "Nunito Sans",
  "Old Standard TT", "Open Sans", "Orbitron", "Oswald", "Outfit", "Over the Rainbow",
  "Overpass", "Overpass Mono", "Oxygen",
  "PT Mono", "PT Sans", "PT Serif", "Pacifico", "Passion One", "Patrick Hand", "Permanent Marker",
  "Piedra", "Pinyon Script", "Plaster", "Playfair Display", "Plus Jakarta Sans", "Poiret One",
  "Pontano Sans", "Poor Story", "Poppins", "Press Start 2P", "Prompt", "Public Sans",
  "Quantico", "Questrial", "Quicksand",
  "Racing Sans One", "Rajdhani", "Raleway", "Rancho", "Readex Pro", "Red Hat Display",
  "Red Hat Mono", "Reenie Beanie", "Righteous", "Roboto", "Roboto Mono", "Roboto Slab",
  "Rochester", "Rock Salt", "Rokkitt", "Ropa Sans", "Rubik", "Rye",
  "Sacramento", "Sail", "Sarabun", "Satisfy", "Sawarabi Gothic", "Sawarabi Mincho", "Schoolbell",
  "Shadows Into Light", "Shadows Into Light Two", "Share Tech", "Share Tech Mono", "Shojumaru",
  "Short Stack", "Signika", "Single Day", "Six Caps", "Slackey", "Smokum", "Smythe", "Sniglet",
  "Snowburst One", "Song Myung", "Sora", "Sorts Mill Goudy", "Source Code Pro", "Source Sans Pro",
  "Source Serif Pro", "Space Grotesk", "Space Mono", "Special Elite", "Spectral", "Spicy Rice",
  "Spirax", "Squada One", "Stardos Stencil", "Stint Ultra Condensed", "Stint Ultra Expanded",
  "Stylish", "Sunflower", "Swanky and Moo Moo", "Syne Mono",
  "Tangerine", "Taviraj", "Telex", "Tenor Sans", "The Girl Next Door", "Tinos", "Titillium Web",
  "Ubuntu", "Ubuntu Mono", "Urbanist",
  "VT323", "Varela Round", "Volkhov",
  "Waiting for the Sunrise", "Wallpoet", "Work Sans",
  "Yanone Kaffeesatz", "Yellowtail", "Yeon Sung",
  "ZCOOL QingKe HuangYou", "ZCOOL XiaoWei", "Zeyada", "Zhi Mang Xing", "Zilla Slab"
].sort();

const FONT_OPTIONS = [
  { value: "system-ui", label: "System Default", id: "system" },
  ...GOOGLE_FONTS.map((font, idx) => ({ value: `'${font}', sans-serif`, label: font, id: `font-${idx}` }))
];

const FONT_WEIGHTS = [
  { value: "100", label: "Thin (100)" },
  { value: "200", label: "Extra Light (200)" },
  { value: "300", label: "Light (300)" },
  { value: "400", label: "Regular (400)" },
  { value: "500", label: "Medium (500)" },
  { value: "600", label: "Semi Bold (600)" },
  { value: "700", label: "Bold (700)" },
  { value: "800", label: "Extra Bold (800)" },
  { value: "900", label: "Black (900)" },
];

const FONT_SIZES = ["10px", "11px", "12px", "13px", "14px", "15px", "16px", "17px", "18px", "20px", "24px"];
const HEADING_SIZES = ["4xl", "5xl", "6xl", "7xl", "8xl", "9xl"];
const LETTER_SPACINGS = ["0", "0.025em", "0.05em", "0.1em", "0.15em", "0.2em", "0.3em"];
const BORDER_RADIUS = ["0px", "2px", "4px", "6px", "8px", "12px", "16px", "24px", "9999px"];
const HERO_HEIGHTS = ["100vh", "90vh", "80vh", "70vh", "60vh", "50vh"];
const CONTENT_WIDTHS = ["max-w-3xl", "max-w-4xl", "max-w-5xl", "max-w-6xl", "max-w-7xl", "max-w-full"];
const SECTION_PADDINGS = ["py-12", "py-16", "py-20", "py-24", "py-32", "py-40"];
const GRID_COLS = [2, 3, 4, 5, 6];
const ASPECT_RATIOS = ["1/1", "4/3", "3/2", "16/9", "2/1", "3/4"];
const NAV_HEIGHTS = ["60px", "70px", "80px", "90px", "100px"];

// Separate Input Component to prevent re-renders
const InputField = ({ label, value, field, placeholder, textarea, onChange }: {
  label: string;
  value: string;
  field: string;
  placeholder?: string;
  textarea?: boolean;
  onChange: (field: string, value: string) => void;
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xs tracking-[0.15em] uppercase text-white/40">{label}</label>
      {textarea ? (
        <textarea 
          value={value ?? ""} 
          onChange={(e) => onChange(field, e.target.value)} 
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50 min-h-[100px] resize-none" 
        />
      ) : (
        <input 
          type="text" 
          value={value ?? ""} 
          onChange={(e) => onChange(field, e.target.value)} 
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" 
        />
      )}
    </div>
  );
};

// Separate Select Component
const SelectField = ({ label, value, field, options, onChange }: {
  label: string;
  value: string;
  field: string;
  options: Array<{ value: string; label: string } | string>;
  onChange: (field: string, value: string) => void;
}) => (
  <div className="space-y-2">
    <label className="text-xs tracking-[0.15em] uppercase text-white/40">{label}</label>
    <select 
      value={value ?? ""} 
      onChange={(e) => onChange(field, e.target.value)}
      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50 appearance-none"
    >
      {options.map((opt: any, idx: number) => (
        <option key={`opt-${idx}`} value={opt.value ?? opt} className="bg-[#242222]">
          {opt.label ?? opt}
        </option>
      ))}
    </select>
  </div>
);

// Separate Font Select Component with its own search state
const FontSelectField = ({ label, value, field, onChange }: {
  label: string;
  value: string;
  field: string;
  onChange: (field: string, value: string) => void;
}) => {
  const [localSearch, setLocalSearch] = useState("");
  
  const filteredFonts = useMemo(() => {
    return FONT_OPTIONS.filter(f => 
      f.label.toLowerCase().includes(localSearch.toLowerCase())
    );
  }, [localSearch]);

  return (
    <div className="space-y-2">
      <label className="text-xs tracking-[0.15em] uppercase text-white/40">{label}</label>
      <input 
        type="text" 
        placeholder="Search fonts..." 
        value={localSearch} 
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50 mb-2" 
      />
      <select 
        value={value ?? ""} 
        onChange={(e) => onChange(field, e.target.value)} 
        size={8}
        className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50"
      >
        {filteredFonts.map((opt) => (
          <option key={opt.id} value={opt.value} className="bg-[#242222] py-1">{opt.label}</option>
        ))}
      </select>
      <p className="text-white/30 text-xs">{filteredFonts.length} fonts available</p>
    </div>
  );
};

// Color Field Component
const ColorField = ({ label, value, field, onChange }: {
  label: string;
  value: string;
  field: string;
  onChange: (field: string, value: string) => void;
}) => (
  <div className="space-y-2">
    <label className="text-xs tracking-[0.15em] uppercase text-white/40">{label}</label>
    <div className="flex gap-3">
      <input 
        type="color" 
        value={value || "#000000"} 
        onChange={(e) => onChange(field, e.target.value)} 
        className="w-12 h-12 rounded-lg bg-transparent cursor-pointer border border-white/10" 
      />
      <input 
        type="text" 
        value={value || ""} 
        onChange={(e) => onChange(field, e.target.value)}
        className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" 
      />
    </div>
  </div>
);

// Toggle Field Component
const ToggleField = ({ label, value, field, description, onChange }: {
  label: string;
  value: boolean;
  field: string;
  description?: string;
  onChange: (field: string, value: boolean) => void;
}) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
    <div>
      <p className="text-white text-sm">{label}</p>
      {description && <p className="text-white/40 text-xs mt-1">{description}</p>}
    </div>
    <button 
      type="button" 
      onClick={() => onChange(field, !value)}
      className={`w-12 h-6 rounded-full transition-all relative ${value ? "bg-[#BBFF00]" : "bg-white/20"}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${value ? "left-7" : "left-1"}`} />
    </button>
  </div>
);

// Slider Field Component
const SliderField = ({ label, value, field, min, max, step, onChange }: {
  label: string;
  value: number;
  field: string;
  min: number;
  max: number;
  step: number;
  onChange: (field: string, value: number) => void;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <label className="text-xs tracking-[0.15em] uppercase text-white/40">{label}</label>
      <span className="text-[#BBFF00] text-sm">{value}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value ?? 1} 
      onChange={(e) => onChange(field, parseFloat(e.target.value))}
      className="w-full accent-[#BBFF00]" 
    />
  </div>
);

// Image Upload Component
const ImageUpload = ({ label, value, field, onUpload, uploading }: {
  label: string;
  value: string;
  field: string;
  onUpload: (file: File, field: string) => void;
  uploading: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className="space-y-2">
      <label className="text-xs tracking-[0.15em] uppercase text-white/40">{label}</label>
      <div className="flex gap-4 items-center">
        {value && <img src={value} alt="Preview" className="w-16 h-16 object-contain bg-white/5 rounded-lg" />}
        <button 
          onClick={() => inputRef.current?.click()} 
          disabled={uploading}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg flex items-center gap-2"
        >
          <Upload size={16} />{uploading ? "Uploading..." : "Upload"}
        </button>
        <input 
          ref={inputRef} 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0], field)} 
        />
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("branding");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<any>({
    siteName: "", tagline: "", established: "",
    logoUrl: "", logoWidth: 40, logoHeight: 40, faviconUrl: "",
    heroTitle: "", heroSubtitle: "", heroButtonText: "", heroTitleSize: "8xl", heroSubtitleSize: "lg",
    heroTitleFont: "system-ui", heroTitleWeight: "300", heroTitleColor: "#FFFFFF",
    heroSubtitleFont: "system-ui", heroSubtitleWeight: "400", heroSubtitleColor: "#FFFFFF",
    heroTaglineFont: "system-ui", heroTaglineColor: "#FFFFFF",
    heroBgType: "color", heroBgColor: "#242222", heroBgImage: "", heroBgVideo: "",
    heroBgOverlay: true, heroBgOverlayColor: "#000000", heroBgOverlayOpacity: 0.5,
    heroLayout: "center", heroHeight: "100vh", heroContentWidth: "max-w-5xl",
    heroParallax: false, heroScrollIndicator: true,
    navStyle: "blur", navPosition: "fixed", navAlignment: "between", navHeight: "80px",
    navBgColor: "#FFFFFF", navBgOpacity: 0.9, navHideOnScroll: false, navShowLogo: true,
    mobileMenuStyle: "slide", mobileLogo: "", mobileLogoWidth: 32, mobileLogoHeight: 32,
    showHeroSection: true, showAboutSection: true, showProjectsSection: true,
    showTeamSection: true, showServicesSection: true, showContactSection: true,
    sectionOrder: "hero,about,projects,team,services,contact",
    sectionPadding: "py-24", sectionAnimation: "fade",
    aboutSectionTitle: "", aboutSectionSubtitle: "", aboutQuote: "", aboutQuoteAuthor: "",
    aboutDescription1: "", aboutDescription2: "", aboutBgType: "color", aboutBgColor: "", aboutBgImage: "",
    projectsCompleted: "", projectsLabel: "", projectsDesc: "",
    yearsExperience: "", yearsLabel: "", yearsDesc: "",
    awardsWon: "", awardsLabel: "", awardsDesc: "",
    projectCardStyle: "overlay", projectGridCols: 3, projectAspectRatio: "4/3",
    projectHoverEffect: "zoom", projectShowInfo: true, projectShowCategory: true, projectShowYear: true,
    teamSectionTitle: "", teamSectionSubtitle: "",
    teamLayout: "grid", teamCardStyle: "photo", teamShowSocial: true, teamShowContact: false, teamGridCols: 3,
    servicesSectionTitle: "", servicesSectionSubtitle: "", serviceCardStyle: "icon", serviceIconStyle: "filled",
    contactSectionTitle: "", contactSectionSubtitle: "", contactCTA: "", contactButtonText: "",
    footerDescription: "", copyrightText: "",
    primaryColor: "#BBFF00", secondaryColor: "#c8ff00", accentColor: "#BBFF00",
    darkBg: "#242222", lightBg: "#F5F5F5", darkText: "#242222", lightText: "#FFFFFF", mutedText: "#B8B8B8",
    buttonBg: "#BBFF00", buttonText: "#242222", buttonHoverBg: "#242222", buttonHoverText: "#BBFF00", buttonRadius: "0px",
    headingFont: "system-ui", headingWeight: "300", headingColor: "#242222", headingColorDark: "#FFFFFF",
    bodyFont: "system-ui", bodyWeight: "400", bodySize: "16px", bodyColor: "#242222", bodyColorDark: "#FFFFFF",
    navFont: "system-ui", navWeight: "500", navSize: "12px", navLetterSpacing: "0.1em",
    enableGrain: true, enableCursor: true, enableAnimations: true,
    mobileFontScale: 1.0, mobileDisableAnimations: false, mobileTouchFriendly: true,
    enableHighContrast: false, fontSizeMultiplier: 1.0, enableReduceMotion: false, focusIndicatorColor: "#BBFF00",
    galleryLightboxStyle: "modern", galleryFilterAnimation: "fade", galleryLayout: "grid",
    galleryPagination: "pagination", galleryItemsPerPage: 9,
    maintenanceMode: false, maintenanceTitle: "We'll Be Back Soon", maintenanceMessage: "",
    maintenanceEndDate: "", maintenanceAllowAdmin: true, maintenanceBgImage: "",
    metaTitle: "", metaDescription: "",
  });

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(data => {
      if (data) setFormData((prev: any) => ({ ...prev, ...data }));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Use useCallback to prevent recreation of handler functions
  const handleFieldChange = useCallback((field: string, value: string | number | boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleUpload = async (file: File, field: string) => {
    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formDataUpload });
      const data = await res.json();
      if (data.url) handleFieldChange(field, data.url);
    } catch (e) { console.error(e); }
    setUploading(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#BBFF00] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const tabs = [
    { id: "branding", label: "Branding", icon: Globe },
    { id: "typography", label: "Typography", icon: Type },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "hero", label: "Hero", icon: ImageIcon },
    { id: "navigation", label: "Navigation", icon: Navigation },
    { id: "sections", label: "Sections", icon: Layers },
    { id: "projects", label: "Projects", icon: Grid3X3 },
    { id: "team", label: "Team", icon: Users },
    { id: "gallery", label: "Gallery", icon: GalleryHorizontalEnd },
    { id: "mobile", label: "Mobile", icon: Smartphone },
    { id: "accessibility", label: "Accessibility", icon: Eye },
    { id: "maintenance", label: "Maintenance", icon: AlertTriangle },
    { id: "seo", label: "SEO", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {saved && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 bg-[#BBFF00] text-[#242222] px-6 py-3 rounded-lg font-medium z-50">
          Settings saved successfully!
        </motion.div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-[#242222] border-r border-white/10 p-4 sticky top-0">
          <h1 className="text-xl font-bold mb-8 text-[#BBFF00]">Settings</h1>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${activeTab === tab.id ? "bg-[#BBFF00] text-[#242222]" : "text-white/60 hover:bg-white/5"}`}>
                <tab.icon size={18} />{tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 max-w-4xl">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-light">{tabs.find(t => t.id === activeTab)?.label}</h2>
            <button onClick={handleSave} disabled={saving}
              className="px-6 py-3 bg-[#BBFF00] text-[#242222] font-medium rounded-lg flex items-center gap-2 hover:bg-[#a8e600] transition-colors disabled:opacity-50">
              <Save size={18} />{saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Branding Tab */}
          {activeTab === "branding" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <InputField label="Site Name" value={formData.siteName} field="siteName" placeholder="Your Site Name" onChange={handleFieldChange} />
                <InputField label="Established Year" value={formData.established} field="established" placeholder="2018" onChange={handleFieldChange} />
              </div>
              <InputField label="Tagline" value={formData.tagline} field="tagline" placeholder="Your tagline here" onChange={handleFieldChange} />
              <div className="grid grid-cols-2 gap-6">
                <ImageUpload label="Logo" value={formData.logoUrl} field="logoUrl" onUpload={handleUpload} uploading={uploading} />
                <ImageUpload label="Favicon" value={formData.faviconUrl} field="faviconUrl" onUpload={handleUpload} uploading={uploading} />
              </div>
              {formData.logoUrl && (
                <div className="grid grid-cols-2 gap-6">
                  <InputField label="Logo Width (px)" value={formData.logoWidth} field="logoWidth" onChange={handleFieldChange} />
                  <InputField label="Logo Height (px)" value={formData.logoHeight} field="logoHeight" onChange={handleFieldChange} />
                </div>
              )}
              <InputField label="Footer Description" value={formData.footerDescription} field="footerDescription" textarea onChange={handleFieldChange} />
              <InputField label="Copyright Text" value={formData.copyrightText} field="copyrightText" placeholder="© 2024 Your Company" onChange={handleFieldChange} />
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === "typography" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Heading Typography</h3>
                <FontSelectField label="Font Family" value={formData.headingFont} field="headingFont" onChange={handleFieldChange} />
                <div className="grid grid-cols-2 gap-6">
                  <SelectField label="Font Weight" value={formData.headingWeight} field="headingWeight" options={FONT_WEIGHTS} onChange={handleFieldChange} />
                  <ColorField label="Light Mode Color" value={formData.headingColor} field="headingColor" onChange={handleFieldChange} />
                </div>
                <ColorField label="Dark Mode Color" value={formData.headingColorDark} field="headingColorDark" onChange={handleFieldChange} />
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-white/40 text-xs mb-2">Preview</p>
                  <h2 style={{ fontFamily: formData.headingFont, fontWeight: formData.headingWeight, color: formData.headingColorDark }} className="text-3xl">
                    The quick brown fox jumps
                  </h2>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Body Typography</h3>
                <FontSelectField label="Font Family" value={formData.bodyFont} field="bodyFont" onChange={handleFieldChange} />
                <div className="grid grid-cols-3 gap-6">
                  <SelectField label="Font Weight" value={formData.bodyWeight} field="bodyWeight" options={FONT_WEIGHTS} onChange={handleFieldChange} />
                  <SelectField label="Font Size" value={formData.bodySize} field="bodySize" options={FONT_SIZES} onChange={handleFieldChange} />
                  <ColorField label="Light Mode" value={formData.bodyColor} field="bodyColor" onChange={handleFieldChange} />
                </div>
                <ColorField label="Dark Mode Color" value={formData.bodyColorDark} field="bodyColorDark" onChange={handleFieldChange} />
              </div>

              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Navigation Typography</h3>
                <div className="grid grid-cols-3 gap-6">
                  <SelectField label="Font Weight" value={formData.navWeight} field="navWeight" options={FONT_WEIGHTS} onChange={handleFieldChange} />
                  <SelectField label="Font Size" value={formData.navSize} field="navSize" options={FONT_SIZES} onChange={handleFieldChange} />
                  <SelectField label="Letter Spacing" value={formData.navLetterSpacing} field="navLetterSpacing" options={LETTER_SPACINGS} onChange={handleFieldChange} />
                </div>
              </div>
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === "colors" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Brand Colors</h3>
                <div className="grid grid-cols-3 gap-6">
                  <ColorField label="Primary" value={formData.primaryColor} field="primaryColor" onChange={handleFieldChange} />
                  <ColorField label="Secondary" value={formData.secondaryColor} field="secondaryColor" onChange={handleFieldChange} />
                  <ColorField label="Accent" value={formData.accentColor} field="accentColor" onChange={handleFieldChange} />
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Background Colors</h3>
                <div className="grid grid-cols-2 gap-6">
                  <ColorField label="Dark Background" value={formData.darkBg} field="darkBg" onChange={handleFieldChange} />
                  <ColorField label="Light Background" value={formData.lightBg} field="lightBg" onChange={handleFieldChange} />
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Text Colors</h3>
                <div className="grid grid-cols-3 gap-6">
                  <ColorField label="Dark Text" value={formData.darkText} field="darkText" onChange={handleFieldChange} />
                  <ColorField label="Light Text" value={formData.lightText} field="lightText" onChange={handleFieldChange} />
                  <ColorField label="Muted Text" value={formData.mutedText} field="mutedText" onChange={handleFieldChange} />
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Button Styles</h3>
                <div className="grid grid-cols-2 gap-6">
                  <ColorField label="Button Background" value={formData.buttonBg} field="buttonBg" onChange={handleFieldChange} />
                  <ColorField label="Button Text" value={formData.buttonText} field="buttonText" onChange={handleFieldChange} />
                  <ColorField label="Hover Background" value={formData.buttonHoverBg} field="buttonHoverBg" onChange={handleFieldChange} />
                  <ColorField label="Hover Text" value={formData.buttonHoverText} field="buttonHoverText" onChange={handleFieldChange} />
                </div>
                <SelectField label="Button Border Radius" value={formData.buttonRadius} field="buttonRadius" options={BORDER_RADIUS} onChange={handleFieldChange} />
              </div>
            </div>
          )}

          {/* Hero Tab */}
          {activeTab === "hero" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Hero Content</h3>
                <InputField label="Hero Title" value={formData.heroTitle} field="heroTitle" placeholder="Your main headline" onChange={handleFieldChange} />
                <InputField label="Hero Subtitle" value={formData.heroSubtitle} field="heroSubtitle" textarea placeholder="Supporting text" onChange={handleFieldChange} />
                <InputField label="Button Text" value={formData.heroButtonText} field="heroButtonText" placeholder="View Projects" onChange={handleFieldChange} />
                <div className="grid grid-cols-2 gap-6">
                  <SelectField label="Title Size" value={formData.heroTitleSize} field="heroTitleSize" options={HEADING_SIZES} onChange={handleFieldChange} />
                  <SelectField label="Subtitle Size" value={formData.heroSubtitleSize} field="heroSubtitleSize" options={["sm", "base", "lg", "xl", "2xl"]} onChange={handleFieldChange} />
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Hero Typography</h3>
                
                {/* Title Font */}
                <div className="space-y-4">
                  <p className="text-sm text-white/60 uppercase tracking-wider">Title Font</p>
                  <div className="grid grid-cols-3 gap-4">
                    <SelectField label="Font Family" value={formData.heroTitleFont} field="heroTitleFont" options={FONT_OPTIONS} onChange={handleFieldChange} />
                    <SelectField label="Font Weight" value={formData.heroTitleWeight} field="heroTitleWeight" options={FONT_WEIGHTS} onChange={handleFieldChange} />
                    <ColorField label="Title Color" value={formData.heroTitleColor} field="heroTitleColor" onChange={handleFieldChange} />
                  </div>
                </div>

                {/* Subtitle Font */}
                <div className="space-y-4">
                  <p className="text-sm text-white/60 uppercase tracking-wider">Subtitle Font</p>
                  <div className="grid grid-cols-3 gap-4">
                    <SelectField label="Font Family" value={formData.heroSubtitleFont} field="heroSubtitleFont" options={FONT_OPTIONS} onChange={handleFieldChange} />
                    <SelectField label="Font Weight" value={formData.heroSubtitleWeight} field="heroSubtitleWeight" options={FONT_WEIGHTS} onChange={handleFieldChange} />
                    <ColorField label="Subtitle Color" value={formData.heroSubtitleColor} field="heroSubtitleColor" onChange={handleFieldChange} />
                  </div>
                </div>

                {/* Tagline Font */}
                <div className="space-y-4">
                  <p className="text-sm text-white/60 uppercase tracking-wider">Tagline Font</p>
                  <div className="grid grid-cols-2 gap-4">
                    <SelectField label="Font Family" value={formData.heroTaglineFont} field="heroTaglineFont" options={FONT_OPTIONS} onChange={handleFieldChange} />
                    <ColorField label="Tagline Color" value={formData.heroTaglineColor} field="heroTaglineColor" onChange={handleFieldChange} />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Background</h3>
                <div className="flex gap-4">
                  {["color", "image", "video"].map(type => (
                    <button key={type} onClick={() => handleFieldChange("heroBgType", type)}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${formData.heroBgType === type ? "border-[#BBFF00] bg-[#BBFF00]/10" : "border-white/10 hover:border-white/30"}`}>
                      {type === "color" && <Palette size={24} />}
                      {type === "image" && <ImageIcon size={24} />}
                      {type === "video" && <Video size={24} />}
                      <span className="text-sm capitalize">{type}</span>
                    </button>
                  ))}
                </div>
                {formData.heroBgType === "color" && <ColorField label="Background Color" value={formData.heroBgColor} field="heroBgColor" onChange={handleFieldChange} />}
                {formData.heroBgType === "image" && <ImageUpload label="Background Image" value={formData.heroBgImage} field="heroBgImage" onUpload={handleUpload} uploading={uploading} />}
                {formData.heroBgType === "video" && <InputField label="Video URL" value={formData.heroBgVideo} field="heroBgVideo" placeholder="https://..." onChange={handleFieldChange} />}
                {(formData.heroBgType === "image" || formData.heroBgType === "video") && (
                  <div className="space-y-4">
                    <ToggleField label="Enable Overlay" value={formData.heroBgOverlay} field="heroBgOverlay" onChange={handleFieldChange} />
                    {formData.heroBgOverlay && (
                      <>
                        <ColorField label="Overlay Color" value={formData.heroBgOverlayColor} field="heroBgOverlayColor" onChange={handleFieldChange} />
                        <SliderField label="Overlay Opacity" value={formData.heroBgOverlayOpacity} field="heroBgOverlayOpacity" min={0} max={1} step={0.1} onChange={handleFieldChange} />
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Layout</h3>
                <div className="flex gap-4">
                  {[{ id: "center", icon: AlignCenter }, { id: "left", icon: AlignLeft }, { id: "right", icon: AlignRight }, { id: "split", icon: SplitSquareHorizontal }].map(layout => (
                    <button key={layout.id} onClick={() => handleFieldChange("heroLayout", layout.id)}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${formData.heroLayout === layout.id ? "border-[#BBFF00] bg-[#BBFF00]/10" : "border-white/10 hover:border-white/30"}`}>
                      <layout.icon size={24} />
                      <span className="text-sm capitalize">{layout.id}</span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <SelectField label="Hero Height" value={formData.heroHeight} field="heroHeight" options={HERO_HEIGHTS} onChange={handleFieldChange} />
                  <SelectField label="Content Width" value={formData.heroContentWidth} field="heroContentWidth" options={CONTENT_WIDTHS} onChange={handleFieldChange} />
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-xl space-y-4">
                <h3 className="text-lg font-medium text-[#BBFF00]">Effects</h3>
                <ToggleField label="Parallax Background" value={formData.heroParallax} field="heroParallax" description="Background moves slower on scroll" onChange={handleFieldChange} />
                <ToggleField label="Scroll Indicator" value={formData.heroScrollIndicator} field="heroScrollIndicator" description="Show arrow at bottom" onChange={handleFieldChange} />
              </div>
            </div>
          )}

          {/* Navigation Tab */}
          {activeTab === "navigation" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Navigation Style</h3>
                <SelectField label="Style" value={formData.navStyle} field="navStyle" options={[{ value: "transparent", label: "Transparent" }, { value: "solid", label: "Solid" }, { value: "blur", label: "Blur/Glass" }]} onChange={handleFieldChange} />
                <SelectField label="Position" value={formData.navPosition} field="navPosition" options={[{ value: "fixed", label: "Fixed" }, { value: "sticky", label: "Sticky" }, { value: "static", label: "Static" }]} onChange={handleFieldChange} />
                <div className="grid grid-cols-2 gap-6">
                  <SelectField label="Height" value={formData.navHeight} field="navHeight" options={NAV_HEIGHTS} onChange={handleFieldChange} />
                  <SelectField label="Alignment" value={formData.navAlignment} field="navAlignment" options={[{ value: "between", label: "Space Between" }, { value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }]} onChange={handleFieldChange} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <ColorField label="Background Color" value={formData.navBgColor} field="navBgColor" onChange={handleFieldChange} />
                  <SliderField label="Background Opacity" value={formData.navBgOpacity} field="navBgOpacity" min={0} max={1} step={0.1} onChange={handleFieldChange} />
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-4">
                <h3 className="text-lg font-medium text-[#BBFF00]">Behavior</h3>
                <ToggleField label="Hide on Scroll" value={formData.navHideOnScroll} field="navHideOnScroll" onChange={handleFieldChange} />
                <ToggleField label="Show Logo" value={formData.navShowLogo} field="navShowLogo" onChange={handleFieldChange} />
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Mobile Menu</h3>
                <SelectField label="Mobile Menu Style" value={formData.mobileMenuStyle} field="mobileMenuStyle" options={[{ value: "slide", label: "Slide from right" }, { value: "overlay", label: "Full overlay" }, { value: "dropdown", label: "Dropdown" }]} onChange={handleFieldChange} />
              </div>
            </div>
          )}

          {/* Sections Tab */}
          {activeTab === "sections" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-4">
                <h3 className="text-lg font-medium text-[#BBFF00]">Section Visibility</h3>
                <ToggleField label="Hero Section" value={formData.showHeroSection} field="showHeroSection" onChange={handleFieldChange} />
                <ToggleField label="About Section" value={formData.showAboutSection} field="showAboutSection" onChange={handleFieldChange} />
                <ToggleField label="Projects Section" value={formData.showProjectsSection} field="showProjectsSection" onChange={handleFieldChange} />
                <ToggleField label="Team Section" value={formData.showTeamSection} field="showTeamSection" onChange={handleFieldChange} />
                <ToggleField label="Services Section" value={formData.showServicesSection} field="showServicesSection" onChange={handleFieldChange} />
                <ToggleField label="Contact Section" value={formData.showContactSection} field="showContactSection" onChange={handleFieldChange} />
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Section Styling</h3>
                <SelectField label="Section Padding" value={formData.sectionPadding} field="sectionPadding" options={SECTION_PADDINGS} onChange={handleFieldChange} />
                <SelectField label="Section Animation" value={formData.sectionAnimation} field="sectionAnimation" options={[{ value: "none", label: "None" }, { value: "fade", label: "Fade In" }, { value: "slide", label: "Slide Up" }, { value: "zoom", label: "Zoom In" }]} onChange={handleFieldChange} />
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">About Section</h3>
                <InputField label="Section Title" value={formData.aboutSectionTitle} field="aboutSectionTitle" onChange={handleFieldChange} />
                <InputField label="Section Subtitle" value={formData.aboutSectionSubtitle} field="aboutSectionSubtitle" textarea onChange={handleFieldChange} />
                <InputField label="Quote" value={formData.aboutQuote} field="aboutQuote" onChange={handleFieldChange} />
                <InputField label="Quote Author" value={formData.aboutQuoteAuthor} field="aboutQuoteAuthor" onChange={handleFieldChange} />
                <InputField label="Description 1" value={formData.aboutDescription1} field="aboutDescription1" textarea onChange={handleFieldChange} />
                <InputField label="Description 2" value={formData.aboutDescription2} field="aboutDescription2" textarea onChange={handleFieldChange} />
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <InputField label="Projects Number" value={formData.projectsCompleted} field="projectsCompleted" onChange={handleFieldChange} />
                  <InputField label="Projects Label" value={formData.projectsLabel} field="projectsLabel" onChange={handleFieldChange} />
                  <InputField label="Projects Desc" value={formData.projectsDesc} field="projectsDesc" onChange={handleFieldChange} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputField label="Years Number" value={formData.yearsExperience} field="yearsExperience" onChange={handleFieldChange} />
                  <InputField label="Years Label" value={formData.yearsLabel} field="yearsLabel" onChange={handleFieldChange} />
                  <InputField label="Years Desc" value={formData.yearsDesc} field="yearsDesc" onChange={handleFieldChange} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputField label="Awards Number" value={formData.awardsWon} field="awardsWon" onChange={handleFieldChange} />
                  <InputField label="Awards Label" value={formData.awardsLabel} field="awardsLabel" onChange={handleFieldChange} />
                  <InputField label="Awards Desc" value={formData.awardsDesc} field="awardsDesc" onChange={handleFieldChange} />
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Services Section</h3>
                <InputField label="Section Title" value={formData.servicesSectionTitle} field="servicesSectionTitle" onChange={handleFieldChange} />
                <InputField label="Section Subtitle" value={formData.servicesSectionSubtitle} field="servicesSectionSubtitle" textarea onChange={handleFieldChange} />
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Contact Section</h3>
                <InputField label="Section Title" value={formData.contactSectionTitle} field="contactSectionTitle" onChange={handleFieldChange} />
                <InputField label="Section Subtitle" value={formData.contactSectionSubtitle} field="contactSectionSubtitle" textarea onChange={handleFieldChange} />
                <InputField label="CTA Text" value={formData.contactCTA} field="contactCTA" textarea onChange={handleFieldChange} />
                <InputField label="Button Text" value={formData.contactButtonText} field="contactButtonText" onChange={handleFieldChange} />
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Project Card Style</h3>
                <SelectField label="Card Style" value={formData.projectCardStyle} field="projectCardStyle" options={[{ value: "minimal", label: "Minimal" }, { value: "detailed", label: "Detailed" }, { value: "overlay", label: "Overlay" }]} onChange={handleFieldChange} />
                <div className="grid grid-cols-2 gap-6">
                  <SelectField label="Grid Columns" value={formData.projectGridCols} field="projectGridCols" options={GRID_COLS.map(n => ({ value: String(n), label: `${n} columns` }))} onChange={handleFieldChange} />
                  <SelectField label="Aspect Ratio" value={formData.projectAspectRatio} field="projectAspectRatio" options={ASPECT_RATIOS} onChange={handleFieldChange} />
                </div>
                <SelectField label="Hover Effect" value={formData.projectHoverEffect} field="projectHoverEffect" options={[{ value: "none", label: "None" }, { value: "zoom", label: "Zoom" }, { value: "slide", label: "Slide" }, { value: "fade", label: "Fade" }]} onChange={handleFieldChange} />
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-4">
                <h3 className="text-lg font-medium text-[#BBFF00]">Display Options</h3>
                <ToggleField label="Show Project Info" value={formData.projectShowInfo} field="projectShowInfo" onChange={handleFieldChange} />
                <ToggleField label="Show Category" value={formData.projectShowCategory} field="projectShowCategory" onChange={handleFieldChange} />
                <ToggleField label="Show Year" value={formData.projectShowYear} field="projectShowYear" onChange={handleFieldChange} />
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Team Section</h3>
                <InputField label="Section Title" value={formData.teamSectionTitle} field="teamSectionTitle" onChange={handleFieldChange} />
                <InputField label="Section Subtitle" value={formData.teamSectionSubtitle} field="teamSectionSubtitle" textarea onChange={handleFieldChange} />
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Layout</h3>
                <SelectField label="Layout Style" value={formData.teamLayout} field="teamLayout" options={[{ value: "grid", label: "Grid" }, { value: "carousel", label: "Carousel" }, { value: "list", label: "List" }]} onChange={handleFieldChange} />
                <SelectField label="Card Style" value={formData.teamCardStyle} field="teamCardStyle" options={[{ value: "photo", label: "Photo Focus" }, { value: "info", label: "Info Focus" }, { value: "minimal", label: "Minimal" }]} onChange={handleFieldChange} />
                <SelectField label="Grid Columns" value={formData.teamGridCols} field="teamGridCols" options={GRID_COLS.map(n => ({ value: String(n), label: `${n} columns` }))} onChange={handleFieldChange} />
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-4">
                <h3 className="text-lg font-medium text-[#BBFF00]">Display Options</h3>
                <ToggleField label="Show Social Links" value={formData.teamShowSocial} field="teamShowSocial" onChange={handleFieldChange} />
                <ToggleField label="Show Contact Info" value={formData.teamShowContact} field="teamShowContact" onChange={handleFieldChange} />
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Gallery Settings</h3>
                <SelectField label="Lightbox Style" value={formData.galleryLightboxStyle} field="galleryLightboxStyle" options={[{ value: "modern", label: "Modern" }, { value: "classic", label: "Classic" }, { value: "minimal", label: "Minimal" }]} onChange={handleFieldChange} />
                <SelectField label="Filter Animation" value={formData.galleryFilterAnimation} field="galleryFilterAnimation" options={[{ value: "fade", label: "Fade" }, { value: "slide", label: "Slide" }, { value: "none", label: "None" }]} onChange={handleFieldChange} />
                <SelectField label="Layout" value={formData.galleryLayout} field="galleryLayout" options={[{ value: "grid", label: "Grid" }, { value: "masonry", label: "Masonry" }]} onChange={handleFieldChange} />
                <SelectField label="Pagination Style" value={formData.galleryPagination} field="galleryPagination" options={[{ value: "pagination", label: "Pagination" }, { value: "infinite", label: "Infinite Scroll" }, { value: "loadmore", label: "Load More Button" }]} onChange={handleFieldChange} />
                <InputField label="Items Per Page" value={formData.galleryItemsPerPage} field="galleryItemsPerPage" onChange={handleFieldChange} />
              </div>
            </div>
          )}

          {/* Mobile Tab */}
          {activeTab === "mobile" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Mobile Settings</h3>
                <SliderField label="Font Size Scale" value={formData.mobileFontScale} field="mobileFontScale" min={0.8} max={1.2} step={0.05} onChange={handleFieldChange} />
                <ToggleField label="Disable Animations" value={formData.mobileDisableAnimations} field="mobileDisableAnimations" description="Disable animations on mobile for better performance" onChange={handleFieldChange} />
                <ToggleField label="Touch-Friendly Buttons" value={formData.mobileTouchFriendly} field="mobileTouchFriendly" description="Increase button sizes for easier tapping" onChange={handleFieldChange} />
              </div>
            </div>
          )}

          {/* Accessibility Tab */}
          {activeTab === "accessibility" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Accessibility Options</h3>
                <ToggleField label="High Contrast Mode" value={formData.enableHighContrast} field="enableHighContrast" onChange={handleFieldChange} />
                <SliderField label="Font Size Multiplier" value={formData.fontSizeMultiplier} field="fontSizeMultiplier" min={0.8} max={1.5} step={0.1} onChange={handleFieldChange} />
                <ToggleField label="Reduce Motion" value={formData.enableReduceMotion} field="enableReduceMotion" description="Respect user's motion preferences" onChange={handleFieldChange} />
                <ColorField label="Focus Indicator Color" value={formData.focusIndicatorColor} field="focusIndicatorColor" onChange={handleFieldChange} />
              </div>
              <div className="p-6 bg-white/5 rounded-xl space-y-4">
                <h3 className="text-lg font-medium text-[#BBFF00]">Visual Effects</h3>
                <ToggleField label="Enable Grain Texture" value={formData.enableGrain} field="enableGrain" onChange={handleFieldChange} />
                <ToggleField label="Custom Cursor" value={formData.enableCursor} field="enableCursor" onChange={handleFieldChange} />
                <ToggleField label="Enable Animations" value={formData.enableAnimations} field="enableAnimations" onChange={handleFieldChange} />
              </div>
            </div>
          )}

          {/* Maintenance Tab */}
          {activeTab === "maintenance" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">Maintenance Mode</h3>
                <div className={`p-4 rounded-lg ${formData.maintenanceMode ? "bg-red-500/20 border border-red-500" : "bg-white/5"}`}>
                  <ToggleField label="Enable Maintenance Mode" value={formData.maintenanceMode} field="maintenanceMode" description={formData.maintenanceMode ? "⚠️ Site is currently in maintenance mode!" : "Site is live"} onChange={handleFieldChange} />
                </div>
                <InputField label="Maintenance Title" value={formData.maintenanceTitle} field="maintenanceTitle" placeholder="We'll Be Back Soon" onChange={handleFieldChange} />
                <InputField label="Maintenance Message" value={formData.maintenanceMessage} field="maintenanceMessage" textarea placeholder="We're performing scheduled maintenance..." onChange={handleFieldChange} />
                <InputField label="Expected Back Date" value={formData.maintenanceEndDate} field="maintenanceEndDate" placeholder="2024-12-31T12:00" onChange={handleFieldChange} />
                <ToggleField label="Allow Admin Access" value={formData.maintenanceAllowAdmin} field="maintenanceAllowAdmin" description="Let logged-in admins bypass maintenance mode" onChange={handleFieldChange} />
                <InputField label="Background Image URL" value={formData.maintenanceBgImage} field="maintenanceBgImage" placeholder="https://..." onChange={handleFieldChange} />
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === "seo" && (
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-xl space-y-6">
                <h3 className="text-lg font-medium text-[#BBFF00]">SEO Settings</h3>
                <div className="space-y-2">
                  <InputField label="Meta Title" value={formData.metaTitle} field="metaTitle" placeholder="Your Site Title | Tagline" onChange={handleFieldChange} />
                  <p className={`text-xs ${(formData.metaTitle?.length || 0) > 60 ? "text-red-400" : "text-white/40"}`}>
                    {formData.metaTitle?.length || 0}/60 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <InputField label="Meta Description" value={formData.metaDescription} field="metaDescription" textarea placeholder="A brief description of your site..." onChange={handleFieldChange} />
                  <p className={`text-xs ${(formData.metaDescription?.length || 0) > 160 ? "text-red-400" : "text-white/40"}`}>
                    {formData.metaDescription?.length || 0}/160 characters
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-white/40 text-xs mb-2">Google Search Preview</p>
                  <p className="text-blue-400 text-lg hover:underline cursor-pointer">{formData.metaTitle || formData.siteName || "Your Site Title"}</p>
                  <p className="text-green-500 text-sm">https://yoursite.com</p>
                  <p className="text-white/60 text-sm">{formData.metaDescription || "Your site description will appear here..."}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}