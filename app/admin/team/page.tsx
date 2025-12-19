"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, X, Mail, Phone } from "lucide-react";

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setTeam(data);
    } catch (error) {
      console.error("Failed to fetch team:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTeam(); }, []);

  const filteredMembers = team.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/team/${id}`, { method: "DELETE" });
      setTeam(team.filter((m) => m.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleSave = async (formData: any) => {
    try {
      if (editingMember) {
        const res = await fetch(`/api/team/${editingMember.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setTeam(team.map((m) => m.id === editingMember.id ? updated : m));
      } else {
        const res = await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const newMember = await res.json();
        setTeam([...team, newMember]);
      }
      setIsModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-8 h-8 border-2 border-[#BBFF00] border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-white">Team Members</h1>
          <p className="text-white/40 text-sm mt-1">Manage your team</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setEditingMember(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg">
          <Plus size={18} />Add Member
        </motion.button>
      </div>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input type="text" placeholder="Search team..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#242222] border border-white/10 text-white placeholder-white/30 pl-12 pr-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredMembers.map((member, idx) => (
            <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: idx * 0.05 }}
              className="group bg-[#242222] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#242222] via-transparent to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingMember(member); setIsModalOpen(true); }} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30"><Edit size={14} /></button>
                  <button onClick={() => setDeleteConfirm(member.id)} className="w-8 h-8 bg-red-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/30"><Trash2 size={14} /></button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-lg font-medium mb-1">{member.name}</h3>
                  <p className="text-[#BBFF00] text-sm mb-1">{member.role}</p>
                  <p className="text-white/40 text-xs">{member.specialty}</p>
                </div>
              </div>
              <div className="p-4 border-t border-white/5 flex items-center gap-4 text-white/40">
                {member.email && <a href={`mailto:${member.email}`} className="hover:text-[#BBFF00]"><Mail size={16} /></a>}
                {member.phone && <a href={`tel:${member.phone}`} className="hover:text-[#BBFF00]"><Phone size={16} /></a>}
              </div>
              <AnimatePresence>
                {deleteConfirm === member.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#242222]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6">
                    <p className="text-white text-center">Remove "{member.name}"?</p>
                    <div className="flex gap-3">
                      <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg">Cancel</button>
                      <button onClick={() => handleDelete(member.id)} className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg">Remove</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isModalOpen && <TeamModal onClose={() => { setIsModalOpen(false); setEditingMember(null); }} onSave={handleSave} member={editingMember} />}
    </div>
  );
}

function TeamModal({ onClose, onSave, member }: { onClose: () => void; onSave: (data: any) => void; member: any }) {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    role: member?.role || "",
    specialty: member?.specialty || "",
    image: member?.image || "",
    email: member?.email || "",
    phone: member?.phone || "",
    linkedin: member?.linkedin || "",
    instagram: member?.instagram || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(formData);
    setSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#242222] border border-white/10 rounded-xl">
        <div className="sticky top-0 bg-[#242222] border-b border-white/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-xl font-medium text-white">{member ? "Edit Member" : "Add Team Member"}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs tracking-[0.15em] uppercase text-white/40">Profile Image URL</label>
            <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            {formData.image && <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden bg-white/5"><img src={formData.image} alt="Preview" className="w-full h-full object-cover" /></div>}
          </div>
          <div className="space-y-2">
            <label className="text-xs tracking-[0.15em] uppercase text-white/40">Full Name *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. John Doe"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40">Role *</label>
              <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Lead Architect"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs tracking-[0.15em] uppercase text-white/40">Specialty</label>
              <input type="text" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} placeholder="e.g. Urban Design"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-white/40">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Phone</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+62 812 xxxx xxxx"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white/5 text-white text-sm rounded-lg hover:bg-white/10">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg disabled:opacity-50">{saving ? "Saving..." : member ? "Save Changes" : "Add Member"}</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
