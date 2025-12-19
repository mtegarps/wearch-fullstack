"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";

const iconOptions = ["▲", "●", "■", "◆", "★", "◎", "⬡", "⬢"];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      setServices(services.filter((s) => s.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleSave = async (formData: any) => {
    try {
      if (editingService) {
        const res = await fetch(`/api/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setServices(services.map((s) => s.id === editingService.id ? updated : s));
      } else {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const newService = await res.json();
        setServices([...services, newService]);
      }
      setIsModalOpen(false);
      setEditingService(null);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const moveService = async (id: number, direction: "up" | "down") => {
    const index = services.findIndex((s) => s.id === id);
    if ((direction === "up" && index === 0) || (direction === "down" && index === services.length - 1)) return;
    const newServices = [...services];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newServices[index], newServices[swapIndex]] = [newServices[swapIndex], newServices[index]];
    setServices(newServices);
    try {
      await fetch("/api/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: newServices.map((s) => s.id) }),
      });
    } catch (error) {
      console.error("Failed to reorder:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-8 h-8 border-2 border-[#BBFF00] border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-white">Services</h1>
          <p className="text-white/40 text-sm mt-1">Manage your services</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setEditingService(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg">
          <Plus size={18} />Add Service
        </motion.button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {services.map((service, idx) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ delay: idx * 0.05 }}
              className="bg-[#242222] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 relative">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveService(service.id, "up")} disabled={idx === 0} className="text-white/20 hover:text-white/60 disabled:opacity-30"><ChevronUp size={16} /></button>
                    <button onClick={() => moveService(service.id, "down")} disabled={idx === services.length - 1} className="text-white/20 hover:text-white/60 disabled:opacity-30"><ChevronDown size={16} /></button>
                  </div>
                  <div className="w-12 h-12 bg-[#BBFF00]/10 border border-[#BBFF00]/30 flex items-center justify-center text-[#BBFF00] text-xl rounded-lg">{service.icon}</div>
                  <div>
                    <h3 className="text-white font-medium">{service.title}</h3>
                    <p className="text-white/40 text-sm">{service.items?.length || 0} sub-services</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setExpandedId(expandedId === service.id ? null : service.id)} className="p-2 text-white/40 hover:text-white">
                    <ChevronDown size={20} className={`transition-transform ${expandedId === service.id ? "rotate-180" : ""}`} />
                  </button>
                  <button onClick={() => { setEditingService(service); setIsModalOpen(true); }} className="p-2 text-white/40 hover:text-[#BBFF00]"><Edit size={18} /></button>
                  <button onClick={() => setDeleteConfirm(service.id)} className="p-2 text-white/40 hover:text-red-400"><Trash2 size={18} /></button>
                </div>
              </div>
              <AnimatePresence>
                {expandedId === service.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-white/5">
                    <div className="p-6 space-y-4">
                      <div>
                        <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-2">Description</p>
                        <p className="text-white/70 text-sm">{service.description}</p>
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-3">Sub-services</p>
                        <div className="flex flex-wrap gap-2">
                          {service.items?.map((item: string, i: number) => (
                            <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 text-sm rounded-lg">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {deleteConfirm === service.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#242222]/95 backdrop-blur-sm flex items-center justify-center gap-4 p-6">
                    <p className="text-white">Delete "{service.title}"?</p>
                    <div className="flex gap-3">
                      <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg">Cancel</button>
                      <button onClick={() => handleDelete(service.id)} className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg">Delete</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isModalOpen && <ServiceModal onClose={() => { setIsModalOpen(false); setEditingService(null); }} onSave={handleSave} service={editingService} />}
    </div>
  );
}

function ServiceModal({ onClose, onSave, service }: { onClose: () => void; onSave: (data: any) => void; service: any }) {
  const [formData, setFormData] = useState({
    title: service?.title || "",
    icon: service?.icon || "▲",
    description: service?.description || "",
    items: service?.items || [""],
  });
  const [saving, setSaving] = useState(false);

  const addItem = () => setFormData({ ...formData, items: [...formData.items, ""] });
  const removeItem = (idx: number) => setFormData({ ...formData, items: formData.items.filter((_: any, i: number) => i !== idx) });
  const updateItem = (idx: number, value: string) => {
    const newItems = [...formData.items];
    newItems[idx] = value;
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...formData, items: formData.items.filter((i: string) => i.trim()) });
    setSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#242222] border border-white/10 rounded-xl">
        <div className="sticky top-0 bg-[#242222] border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-white">{service ? "Edit Service" : "Add Service"}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs tracking-[0.15em] uppercase text-white/40">Icon</label>
            <div className="flex gap-2 flex-wrap">
              {iconOptions.map((icon) => (
                <button key={icon} type="button" onClick={() => setFormData({ ...formData, icon })}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg ${formData.icon === icon ? "bg-[#BBFF00] text-[#242222]" : "bg-white/5 text-white/60 border border-white/10 hover:border-white/30"}`}>{icon}</button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs tracking-[0.15em] uppercase text-white/40">Title *</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Architecture"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs tracking-[0.15em] uppercase text-white/40">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Service description..." rows={3}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50 resize-none" />
          </div>
          <div className="space-y-3">
            <label className="text-xs tracking-[0.15em] uppercase text-white/40">Sub-services</label>
            {formData.items.map((item: string, idx: number) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={item} onChange={(e) => updateItem(idx, e.target.value)} placeholder={`Sub-service ${idx + 1}`}
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-2 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
                {formData.items.length > 1 && <button type="button" onClick={() => removeItem(idx)} className="px-3 text-red-400 hover:bg-red-400/10 rounded-lg"><X size={18} /></button>}
              </div>
            ))}
            <button type="button" onClick={addItem} className="w-full py-2 border border-dashed border-white/20 text-white/40 text-sm rounded-lg hover:border-[#BBFF00]/50 hover:text-[#BBFF00]">+ Add Sub-service</button>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white/5 text-white text-sm rounded-lg hover:bg-white/10">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg disabled:opacity-50">{saving ? "Saving..." : service ? "Save Changes" : "Add Service"}</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
