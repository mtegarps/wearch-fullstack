"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Mail, Phone, MapPin, Instagram, Linkedin, Facebook, Twitter } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    email: "", phone: "", address: "", fullAddress: "", workingHours: "", mapEmbed: "", instagram: "", linkedin: "", facebook: "", twitter: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        // Ensure all values are strings, not null
        setFormData({
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          fullAddress: data.fullAddress || "",
          workingHours: data.workingHours || "",
          mapEmbed: data.mapEmbed || "",
          instagram: data.instagram || "",
          linkedin: data.linkedin || "",
          facebook: data.facebook || "",
          twitter: data.twitter || "",
        });
      } catch (error) {
        console.error("Failed to fetch contact:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-8 h-8 border-2 border-[#BBFF00] border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-white">Contact Information</h1>
          <p className="text-white/40 text-sm mt-1">Manage your contact details</p>
        </div>
        {saved && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 text-sm rounded-lg">Saved!</motion.div>}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#242222] border border-white/5 rounded-xl p-6">
          <h2 className="text-white font-medium mb-6 flex items-center gap-2"><div className="w-1 h-5 bg-[#BBFF00] rounded-full" />Primary Contact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40 flex items-center gap-2"><Mail size={14} />Email</label>
              <input type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40 flex items-center gap-2"><Phone size={14} />Phone</label>
              <input type="tel" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#242222] border border-white/5 rounded-xl p-6">
          <h2 className="text-white font-medium mb-6 flex items-center gap-2"><div className="w-1 h-5 bg-[#BBFF00] rounded-full" />Location</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40 flex items-center gap-2"><MapPin size={14} />Display Address</label>
              <input type="text" value={formData.address || ""} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="e.g. Bandung, Indonesia"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40">Full Address</label>
              <textarea value={formData.fullAddress || ""} onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })} rows={2}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50 resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40">Working Hours</label>
              <input type="text" value={formData.workingHours || ""} onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#242222] border border-white/5 rounded-xl p-6">
          <h2 className="text-white font-medium mb-6 flex items-center gap-2"><div className="w-1 h-5 bg-[#BBFF00] rounded-full" />Social Media</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40 flex items-center gap-2"><Instagram size={14} />Instagram</label>
              <input type="url" value={formData.instagram || ""} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40 flex items-center gap-2"><Linkedin size={14} />LinkedIn</label>
              <input type="url" value={formData.linkedin || ""} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40 flex items-center gap-2"><Facebook size={14} />Facebook</label>
              <input type="url" value={formData.facebook || ""} onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40 flex items-center gap-2"><Twitter size={14} />Twitter</label>
              <input type="url" value={formData.twitter || ""} onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end">
          <motion.button type="submit" disabled={saving} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg disabled:opacity-50">
            {saving ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-[#242222] border-t-transparent rounded-full" /> : <Save size={18} />}
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
