"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Sparkles, Clock, Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

// Types
interface Settings {
  showContactSection?: boolean;
  sectionPadding?: string;
  darkBg: string;
  lightBg: string;
  primaryColor: string;
  headingFont: string;
  headingWeight: string;
  bodyFont: string;
  contactSectionTitle: string;
  contactSectionSubtitle: string;
  contactCTA: string;
  buttonBg: string;
  buttonText: string;
  buttonRadius: string;
  buttonHoverBg: string;
  buttonHoverText: string;
  contactButtonText: string;
}

interface Contact {
  email: string;
  phone: string;
  address: string;
  fullAddress?: string;
  workingHours?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
}

interface ContactSectionProps {
  settings: Settings;
  isDark: boolean;
  contact: Contact;
}

// Floating Particles Component
const FloatingParticles = ({ primaryColor }: { primaryColor: string }) => {
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: primaryColor,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, href, settings }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      className="group inline-flex items-center gap-4 px-10 py-5 text-sm tracking-[0.15em] uppercase relative overflow-hidden"
      style={{
        backgroundColor: settings.buttonBg,
        color: settings.buttonText,
        borderRadius: settings.buttonRadius,
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gradient Moving Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${settings.buttonHoverBg}, ${settings.primaryColor})`,
        }}
        initial={{ x: "-100%", opacity: 0 }}
        animate={isHovered ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${settings.primaryColor}40, transparent)`,
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Sparkle Effect */}
      {isHovered && (
        <motion.div
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="text-white" size={16} />
        </motion.div>
      )}

      <span className="relative z-10 transition-colors group-hover:text-white">
        {children}
      </span>
    </motion.a>
  );
};

// 3D Tilt Card Component
const TiltCard = ({ children, isDark, settings }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

export default function ContactSection({ settings, isDark, contact }: ContactSectionProps) {
  if (settings.showContactSection === false) return null;

  return (
    <section
      id="contact"
      className={`${settings.sectionPadding || "py-32"} md:py-40 px-6 md:px-12 relative overflow-hidden transition-colors duration-500`}
      style={{ backgroundColor: isDark ? settings.darkBg : settings.lightBg }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Gradient Orbs */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${settings.primaryColor}20 0%, transparent 70%)`,
          }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${settings.primaryColor}15 0%, transparent 70%)`,
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${settings.primaryColor}12 0%, transparent 70%)`,
          }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${isDark ? settings.primaryColor + '10' : settings.primaryColor + '08'} 1px, transparent 1px),
                              linear-gradient(90deg, ${isDark ? settings.primaryColor + '10' : settings.primaryColor + '08'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles primaryColor={settings.primaryColor} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          {/* Animated Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "backOut" }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.div
              className="h-px w-20"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${settings.primaryColor})`,
              }}
              initial={{ scaleX: 0, originX: 1 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: settings.primaryColor }}
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <motion.div
              className="h-px w-20"
              style={{ 
                background: `linear-gradient(90deg, ${settings.primaryColor}, transparent)`,
              }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`text-xs tracking-[0.3em] uppercase mb-6 ${isDark ? "text-white/50" : "text-[#242222]/50"}`}
          >
            Get In Touch
          </motion.p>

          {/* Animated Title with Gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6 relative inline-block"
            style={{ fontFamily: settings.headingFont, fontWeight: settings.headingWeight }}
          >
            <span
              className={isDark ? "text-white" : "text-[#242222]"}
              style={{
                backgroundImage: isDark 
                  ? `linear-gradient(135deg, white 0%, ${settings.primaryColor} 100%)`
                  : `linear-gradient(135deg, #242222 0%, ${settings.primaryColor} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {settings.contactSectionTitle}
            </span>
            
            {/* Animated Underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 rounded-full"
              style={{ backgroundColor: settings.primaryColor }}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? "text-white/60" : "text-[#242222]/60"}`}
            style={{ fontFamily: settings.bodyFont }}
          >
            {settings.contactSectionSubtitle}
          </motion.p>
        </motion.div>

        {/* Enhanced Contact Content */}
        <div className="max-w-6xl mx-auto">
          {/* Contact Info Grid - 3 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16"
          >
            {[
              { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
              { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
              { icon: MapPin, label: "Address", value: contact.fullAddress || contact.address, href: null },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.15, duration: 0.6, type: "spring" }}
              >
                <TiltCard isDark={isDark} settings={settings}>
                  {item.href ? (
                    <a href={item.href} className="block group h-full">
                      <motion.div
                        className="relative p-8 rounded-3xl backdrop-blur-sm overflow-hidden h-full flex flex-col items-center text-center"
                        style={{
                          background: isDark 
                            ? `linear-gradient(135deg, ${settings.primaryColor}15, ${settings.primaryColor}05)`
                            : `linear-gradient(135deg, ${settings.primaryColor}20, ${settings.primaryColor}10)`,
                          border: `1px solid ${isDark ? settings.primaryColor + '20' : settings.primaryColor + '40'}`,
                        }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Animated Background Gradient */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(circle at center, ${settings.primaryColor}20, transparent 70%)`,
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        
                        {/* Icon Container */}
                        <motion.div
                          className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 overflow-hidden"
                          style={{
                            background: isDark ? settings.primaryColor + '25' : settings.primaryColor + '30',
                          }}
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* Icon Glow */}
                          <motion.div
                            className="absolute inset-0"
                            animate={{
                              boxShadow: [
                                `0 0 0 0 ${settings.primaryColor}00`,
                                `0 0 30px 10px ${settings.primaryColor}40`,
                                `0 0 0 0 ${settings.primaryColor}00`,
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <item.icon size={32} style={{ color: settings.primaryColor }} />
                          </motion.div>
                        </motion.div>
                        
                        {/* Label and Value */}
                        <div className="relative z-10">
                          <motion.p 
                            className={`text-xs tracking-[0.25em] uppercase mb-3 font-medium ${isDark ? "text-white/50" : "text-[#242222]/50"}`}
                            whileHover={{ y: -2 }}
                          >
                            {item.label}
                          </motion.p>
                          <motion.p 
                            className={`text-base md:text-lg font-medium leading-relaxed ${isDark ? "text-white" : "text-[#242222]"}`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.value}
                          </motion.p>
                        </div>
                      </motion.div>
                    </a>
                  ) : (
                    <motion.div
                      className="relative p-8 rounded-3xl backdrop-blur-sm overflow-hidden h-full flex flex-col items-center text-center"
                      style={{
                        background: isDark 
                          ? `linear-gradient(135deg, ${settings.primaryColor}15, ${settings.primaryColor}05)`
                          : `linear-gradient(135deg, ${settings.primaryColor}20, ${settings.primaryColor}10)`,
                        border: `1px solid ${isDark ? settings.primaryColor + '20' : settings.primaryColor + '40'}`,
                      }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Icon Container */}
                      <motion.div
                        className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                        style={{
                          background: isDark ? settings.primaryColor + '25' : settings.primaryColor + '30',
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <item.icon size={32} style={{ color: settings.primaryColor }} />
                        </motion.div>
                      </motion.div>
                      
                      {/* Label and Value */}
                      <div className="relative z-10">
                        <p className={`text-xs tracking-[0.25em] uppercase mb-3 font-medium ${isDark ? "text-white/50" : "text-[#242222]/50"}`}>
                          {item.label}
                        </p>
                        <p className={`text-base md:text-lg font-medium leading-relaxed ${isDark ? "text-white" : "text-[#242222]"}`}>
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Working Hours & Social Media */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Working Hours */}
            {contact.workingHours && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.div
                  className="relative p-8 rounded-2xl backdrop-blur-sm overflow-hidden h-full"
                  style={{
                    background: isDark 
                      ? `linear-gradient(135deg, ${settings.primaryColor}12, ${settings.primaryColor}05)`
                      : `linear-gradient(135deg, ${settings.primaryColor}18, ${settings.primaryColor}08)`,
                    border: `1px solid ${isDark ? settings.primaryColor + '15' : settings.primaryColor + '35'}`,
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <motion.div
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{
                        background: isDark ? settings.primaryColor + '20' : settings.primaryColor + '30',
                      }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock size={28} style={{ color: settings.primaryColor }} />
                    </motion.div>
                    <div>
                      <p className={`text-xs tracking-[0.25em] uppercase mb-2 ${isDark ? "text-white/40" : "text-[#242222]/40"}`}>
                        Working Hours
                      </p>
                      <p className={`text-base font-medium ${isDark ? "text-white" : "text-[#242222]"}`}>
                        {contact.workingHours}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="md:col-span-2"
            >
              <motion.div
                className="relative p-8 rounded-2xl backdrop-blur-sm overflow-hidden h-full"
                style={{
                  background: isDark 
                    ? `linear-gradient(135deg, ${settings.primaryColor}12, ${settings.primaryColor}05)`
                    : `linear-gradient(135deg, ${settings.primaryColor}18, ${settings.primaryColor}08)`,
                  border: `1px solid ${isDark ? settings.primaryColor + '15' : settings.primaryColor + '35'}`,
                }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <p className={`text-xs tracking-[0.25em] uppercase ${isDark ? "text-white/40" : "text-[#242222]/40"}`}>
                    Follow Us
                  </p>
                  <div className="flex gap-4 justify-center">
                    {[
                      { icon: Instagram, url: contact.instagram, name: 'Instagram' },
                      { icon: Linkedin, url: contact.linkedin, name: 'LinkedIn' },
                      { icon: Facebook, url: contact.facebook, name: 'Facebook' },
                      { icon: Twitter, url: contact.twitter, name: 'Twitter' },
                    ].filter(social => social.url).map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-xl flex items-center justify-center group"
                        style={{
                          background: isDark ? settings.primaryColor + '20' : settings.primaryColor + '30',
                        }}
                        whileHover={{ 
                          scale: 1.15,
                          y: -8,
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + idx * 0.1 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <social.icon 
                            size={24} 
                            style={{ color: settings.primaryColor }} 
                          />
                        </motion.div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}