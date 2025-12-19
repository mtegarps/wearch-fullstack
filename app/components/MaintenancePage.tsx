"use client";

import { motion } from "framer-motion";
import { Construction, Clock, Mail, ArrowRight } from "lucide-react";

interface MaintenancePageProps {
  settings: {
    siteName: string;
    maintenanceTitle: string;
    maintenanceMessage: string;
    maintenanceEndDate: string;
    maintenanceBgImage: string;
    primaryColor: string;
    darkBg: string;
  };
  contact?: {
    email: string;
  };
}

export default function MaintenancePage({ settings, contact }: MaintenancePageProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: settings.darkBg || "#242222",
        backgroundImage: settings.maintenanceBgImage ? `url(${settings.maintenanceBgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {settings.maintenanceBgImage && <div className="absolute inset-0 bg-black/70" />}

      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      <motion.div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full opacity-20"
        style={{ backgroundColor: settings.primaryColor }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-10"
        style={{ backgroundColor: settings.primaryColor }}
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${settings.primaryColor}20`, border: `2px solid ${settings.primaryColor}` }}>
          <Construction size={40} style={{ color: settings.primaryColor }} />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4">{settings.siteName}</motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight">
          {settings.maintenanceTitle || "We'll Be Back Soon"}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-white/60 text-lg mb-8 leading-relaxed">
          {settings.maintenanceMessage || "We're currently performing scheduled maintenance. Please check back soon."}
        </motion.p>

        {settings.maintenanceEndDate && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8"
            style={{ backgroundColor: `${settings.primaryColor}15`, border: `1px solid ${settings.primaryColor}30` }}>
            <Clock size={18} style={{ color: settings.primaryColor }} />
            <span className="text-white/80 text-sm">Expected back: <strong className="text-white">{formatDate(settings.maintenanceEndDate)}</strong></span>
          </motion.div>
        )}

        {contact?.email && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <p className="text-white/40 text-sm mb-4">Need urgent assistance?</p>
            <a href={`mailto:${contact.email}`} className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-medium"
              style={{ backgroundColor: settings.primaryColor, color: settings.darkBg }}>
              <Mail size={18} />Contact Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex justify-center gap-2 mt-12">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}
              animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
