"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X, ChevronDown, ChevronUp, Upload, Image as ImageIcon, Save, BarChart3 } from "lucide-react";

interface AboutService {
  id: number;
  title: string;
  description: string | null;
  iconUrl: string | null;
  order: number;
}

interface StatsSettings {
  projectsCompleted: string;
  projectsLabel: string;
  yearsExperience: string;
  yearsLabel: string;
}

export default function AboutServicesPage() {
  const [services, setServices] = useState<AboutService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<AboutService | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  
  // Stats settings
  const [stats, setStats] = useState<StatsSettings>({
    projectsCompleted: "50+",
    projectsLabel: "projects completed",
    yearsExperience: "7+",
    yearsLabel: "years service",
  });
  const [savingStats, setSavingStats] = useState(false);
  const [statsSaved, setStatsSaved] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/about-services");
      const data = await res.json();
      if (Array.isArray(data)) {
        setServices(data);
      }
    } catch (error) {
      console.error("Failed to fetch about services:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setStats({
        projectsCompleted: data.projectsCompleted || "50+",
        projectsLabel: data.projectsLabel || "projects completed",
        yearsExperience: data.yearsExperience || "7+",
        yearsLabel: data.yearsLabel || "years service",
      });
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchServices(), fetchStats()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSaveStats = async () => {
    setSavingStats(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });
      setStatsSaved(true);
      setTimeout(() => setStatsSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save stats:", error);
    } finally {
      setSavingStats(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/about-services/${id}`, { method: "DELETE" });
      setServices(services.filter((s) => s.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleSave = async (formData: Partial<AboutService>) => {
    try {
      if (editingService) {
        const res = await fetch(`/api/about-services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setServices(services.map((s) => (s.id === editingService.id ? updated : s)));
      } else {
        const res = await fetch("/api/about-services", {
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
      await fetch("/api/about-services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: newServices.map((s) => s.id) }),
      });
    } catch (error) {
      console.error("Failed to reorder:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#BBFF00] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-white">About Section</h1>
          <p className="text-white/40 text-sm mt-1">
            Manage the "Our Services" section and statistics on landing page
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#242222] border border-white/5 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-medium flex items-center gap-2">
            <BarChart3 size={20} className="text-[#BBFF00]" />
            Statistics
          </h2>
          {statsSaved && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-green-400 text-sm"
            >
              ✓ Saved!
            </motion.span>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Projects Stats */}
          <div className="space-y-4 p-4 bg-white/5 rounded-lg">
            <p className="text-xs tracking-[0.15em] uppercase text-[#BBFF00]">Projects</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-white/40 mb-1 block">Number (e.g. 50+)</label>
                <input
                  type="text"
                  value={stats.projectsCompleted}
                  onChange={(e) => setStats({ ...stats, projectsCompleted: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50"
                  placeholder="50+"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">Label</label>
                <input
                  type="text"
                  value={stats.projectsLabel}
                  onChange={(e) => setStats({ ...stats, projectsLabel: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50"
                  placeholder="projects completed"
                />
              </div>
            </div>
          </div>

          {/* Years Stats */}
          <div className="space-y-4 p-4 bg-white/5 rounded-lg">
            <p className="text-xs tracking-[0.15em] uppercase text-[#BBFF00]">Years</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-white/40 mb-1 block">Number (e.g. 7+)</label>
                <input
                  type="text"
                  value={stats.yearsExperience}
                  onChange={(e) => setStats({ ...stats, yearsExperience: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50"
                  placeholder="7+"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">Label</label>
                <input
                  type="text"
                  value={stats.yearsLabel}
                  onChange={(e) => setStats({ ...stats, yearsLabel: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50"
                  placeholder="years service"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveStats}
            disabled={savingStats}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg disabled:opacity-50"
          >
            {savingStats ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-[#242222] border-t-transparent rounded-full"
              />
            ) : (
              <Save size={16} />
            )}
            {savingStats ? "Saving..." : "Save Statistics"}
          </motion.button>
        </div>
      </motion.div>

      {/* Services Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-white font-medium">Services List</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingService(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg"
        >
          <Plus size={16} />
          Add Service
        </motion.button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <p className="text-blue-400 text-sm">
          <strong>Note:</strong> These services appear in the dark "Our Services" section with icons. 
          They are different from the main Services page which shows service categories with sub-items.
        </p>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#242222] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 relative"
            >
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveService(service.id, "up")}
                      disabled={idx === 0}
                      className="text-white/20 hover:text-white/60 disabled:opacity-30"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => moveService(service.id, "down")}
                      disabled={idx === services.length - 1}
                      className="text-white/20 hover:text-white/60 disabled:opacity-30"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  {/* Icon Preview */}
                  <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-lg overflow-hidden">
                    {service.iconUrl ? (
                      <img
                        src={service.iconUrl}
                        alt={service.title}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <ImageIcon size={24} className="text-white/30" />
                    )}
                  </div>

                  {/* Title and Description Preview */}
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{service.title}</h3>
                    <p className="text-white/40 text-sm line-clamp-1">
                      {service.description || "No description"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingService(service);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-white/40 hover:text-[#BBFF00]"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(service.id)}
                    className="p-2 text-white/40 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Delete Confirmation */}
              <AnimatePresence>
                {deleteConfirm === service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#242222]/95 backdrop-blur-sm flex items-center justify-center gap-4 p-6"
                  >
                    <p className="text-white">Delete "{service.title}"?</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {services.length === 0 && (
          <div className="text-center py-12 text-white/40">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>No services yet. Add your first service to get started.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ServiceModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingService(null);
          }}
          onSave={handleSave}
          service={editingService}
        />
      )}
    </div>
  );
}

interface ServiceModalProps {
  onClose: () => void;
  onSave: (data: Partial<AboutService>) => void;
  service: AboutService | null;
}

function ServiceModal({ onClose, onSave, service }: ServiceModalProps) {
  const [formData, setFormData] = useState({
    title: service?.title || "",
    description: service?.description || "",
    iconUrl: service?.iconUrl || "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("folder", "general");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, iconUrl: data.url });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(formData);
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#242222] border border-white/10 rounded-xl"
      >
        <div className="sticky top-0 bg-[#242222] border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-white">
            {service ? "Edit Service" : "Add Service"}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Icon Upload */}
          <div className="space-y-2">
            <label className="text-xs tracking-[0.15em] uppercase text-white/40">
              Icon Image
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                {formData.iconUrl ? (
                  <img
                    src={formData.iconUrl}
                    alt="Icon preview"
                    className="w-14 h-14 object-contain"
                  />
                ) : (
                  <ImageIcon size={32} className="text-white/30" />
                )}
              </div>
              <div className="flex-1">
                <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/60 text-sm rounded-lg cursor-pointer hover:border-[#BBFF00]/50 hover:text-white">
                  <Upload size={16} />
                  {uploading ? "Uploading..." : "Upload Icon"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <p className="text-white/30 text-xs mt-2">
                  Recommended: PNG with transparent background, 50x50px
                </p>
              </div>
            </div>
            {/* Manual URL Input */}
            <input
              type="text"
              value={formData.iconUrl}
              onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
              placeholder="Or enter image URL manually"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-2 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50 mt-2"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs tracking-[0.15em] uppercase text-white/40">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Residence"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs tracking-[0.15em] uppercase text-white/40">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Service description that will appear on the landing page..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-white/5 text-white text-sm rounded-lg hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : service ? "Save Changes" : "Add Service"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
