"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, X, Image as ImageIcon } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const categories = ["All", "Residential", "Commercial", "Urban Design", "Landscape Design"];

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects?all=true");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects(projects.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleSave = async (formData: any) => {
    try {
      if (editingProject) {
        console.log("Sending update with data:", formData);
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const updated = await res.json();
        console.log("Updated project:", updated);
        setProjects(projects.map((p) => p.id === editingProject.id ? updated : p));
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const newProject = await res.json();
        setProjects([...projects, newProject]);
      }
      setIsModalOpen(false);
      setEditingProject(null);
      
      // Refresh data untuk memastikan sinkron dengan database
      await fetchProjects();
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save project. Check console for details.");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-8 h-8 border-2 border-[#BBFF00] border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-white">Projects</h1>
          <p className="text-white/40 text-sm mt-1">Manage your portfolio projects</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setEditingProject(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg">
          <Plus size={18} />Add Project
        </motion.button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#242222] border border-white/10 text-white placeholder-white/30 pl-12 pr-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-white/40" />
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 text-sm rounded-lg ${filterCategory === cat ? "bg-[#BBFF00] text-[#242222]" : "bg-[#242222] text-white/60 border border-white/10 hover:border-white/20"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: idx * 0.05 }}
              className="group bg-[#242222] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 relative">
              <div className="relative aspect-video overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingProject(project); setIsModalOpen(true); }} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30"><Edit size={14} /></button>
                  <button onClick={() => setDeleteConfirm(project.id)} className="w-8 h-8 bg-red-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/30"><Trash2 size={14} /></button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs rounded-full backdrop-blur-sm ${project.status === "Published" ? "bg-green-400/20 text-green-400" : "bg-yellow-400/20 text-yellow-400"}`}>{project.status}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-medium">{project.title}</h3>
                  <span className="text-white/40 text-xs">{project.year}</span>
                </div>
                <p className="text-white/40 text-sm mb-3">{project.location} · {project.category}</p>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>{project.area}</span>
                  <span>{project.duration}</span>
                </div>
                {project.gallery && project.gallery.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <span className="text-xs text-white/40">{project.gallery.length} gallery images</span>
                  </div>
                )}
              </div>
              <AnimatePresence>
                {deleteConfirm === project.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#242222]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6">
                    <p className="text-white text-center">Delete "{project.title}"?</p>
                    <div className="flex gap-3">
                      <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20">Cancel</button>
                      <button onClick={() => handleDelete(project.id)} className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">Delete</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4"><ImageIcon size={24} className="text-white/30" /></div>
          <p className="text-white/60 mb-2">No projects found</p>
        </div>
      )}

      {isModalOpen && <ProjectModal onClose={() => { setIsModalOpen(false); setEditingProject(null); }} onSave={handleSave} project={editingProject} />}
    </div>
  );
}

function ProjectModal({ onClose, onSave, project }: { onClose: () => void; onSave: (data: any) => void; project: any }) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    location: project?.location || "",
    year: project?.year || new Date().getFullYear().toString(),
    category: project?.category || "Residential",
    image: project?.image || "",
    area: project?.area || "",
    duration: project?.duration || "",
    client: project?.client || "",
    description: project?.description || "",
    status: project?.status || "Draft",
    gallery: project?.gallery || [],
  });
  const [activeTab, setActiveTab] = useState("basic");
  const [saving, setSaving] = useState(false);

  // 🔥 IMPORTANT: Re-sync formData when project prop changes
  useEffect(() => {
    if (project) {
      console.log("🔵 Modal opened with project:", project);
      console.log("🔵 Initial status:", project.status);
      setFormData({
        title: project.title || "",
        location: project.location || "",
        year: project.year || new Date().getFullYear().toString(),
        category: project.category || "Residential",
        image: project.image || "",
        area: project.area || "",
        duration: project.duration || "",
        client: project.client || "",
        description: project.description || "",
        status: project.status || "Draft",
        gallery: project.gallery || [],
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔵 Form submit - formData:", formData);
    console.log("🔵 Status being sent:", formData.status);
    setSaving(true);
    await onSave(formData);
    setSaving(false);
  };

  const addGalleryItem = () => {
    setFormData({
      ...formData,
      gallery: [...formData.gallery, { url: "", title: "", description: "" }]
    });
  };

  const updateGalleryItem = (index: number, field: string, value: string) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = { ...newGallery[index], [field]: value };
    setFormData({ ...formData, gallery: newGallery });
  };

  const removeGalleryItem = (index: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_: any, i: number) => i !== index)
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#242222] border border-white/10 rounded-xl">
        <div className="sticky top-0 bg-[#242222] border-b border-white/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-xl font-medium text-white">{project ? "Edit Project" : "Add New Project"}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={24} /></button>
        </div>

        <div className="border-b border-white/10 px-6">
          <div className="flex gap-6">
            {["basic", "details", "gallery"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 text-sm capitalize border-b-2 ${activeTab === tab ? "border-[#BBFF00] text-[#BBFF00]" : "border-transparent text-white/40 hover:text-white/60"}`}>{tab}</button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {activeTab === "basic" && (
            <>
              <div className="space-y-2">
                <label className="text-xs tracking-[0.15em] uppercase text-white/40">Project Title *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Modern Villa"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.15em] uppercase text-white/40">Location *</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Bandung"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.15em] uppercase text-white/40">Year *</label>
                  <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.15em] uppercase text-white/40">Category *</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50">
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Urban Design">Urban Design</option>
                    <option value="Landscape Design">Landscape Design</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.15em] uppercase text-white/40">
                    Status * 
                    <span className={`ml-2 text-xs font-bold ${formData.status === 'Published' ? 'text-green-400' : 'text-yellow-400'}`}>
                      (Current: {formData.status})
                    </span>
                  </label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      console.log("🟢 Status dropdown changed!");
                      console.log("🟢 Old status:", formData.status);
                      console.log("🟢 New status:", newStatus);
                      setFormData((prev) => {
                        const updated = { ...prev, status: newStatus };
                        console.log("🟢 Updated formData:", updated);
                        return updated;
                      });
                    }}
                    className={`w-full border px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50 ${
                      formData.status === 'Published' 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                        : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    }`}>
                    <option value="Draft">📝 Draft</option>
                    <option value="Published">✅ Published</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-[0.15em] uppercase text-white/40">Cover Image URL *</label>
                <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" required />
                {formData.image && <div className="mt-2 aspect-video rounded-lg overflow-hidden bg-white/5"><img src={formData.image} alt="Preview" className="w-full h-full object-cover" /></div>}
              </div>
            </>
          )}

          {activeTab === "details" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.15em] uppercase text-white/40">Area</label>
                  <input type="text" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} placeholder="e.g. 450 m²"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.15em] uppercase text-white/40">Duration</label>
                  <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 8 Months"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-[0.15em] uppercase text-white/40">Client</label>
                <input type="text" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} placeholder="e.g. Private Client"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-[0.15em] uppercase text-white/40">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Project description..." rows={4}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50 resize-none" />
              </div>
            </>
          )}

          {activeTab === "gallery" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white text-sm font-medium">Gallery Images</h3>
                  <p className="text-white/40 text-xs mt-1">Add multiple images with descriptions</p>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addGalleryItem}
                  className="flex items-center gap-2 px-3 py-2 bg-[#BBFF00] text-[#242222] text-xs font-medium rounded-lg"
                >
                  <Plus size={14} />
                  Add Image
                </motion.button>
              </div>

              <div className="space-y-4">
                {formData.gallery.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-white/10 rounded-lg">
                    <ImageIcon size={32} className="text-white/20 mx-auto mb-3" />
                    <p className="text-white/40 text-sm">No gallery images yet</p>
                    <p className="text-white/30 text-xs mt-1">Click "Add Image" to start</p>
                  </div>
                ) : (
                  formData.gallery.map((item: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs tracking-[0.15em] uppercase text-[#BBFF00]">
                          Image {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeGalleryItem(index)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/40">Image URL *</label>
                        <input
                          type="url"
                          value={item.url}
                          onChange={(e) => updateGalleryItem(index, "url", e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50"
                          required
                        />
                      </div>

                      {item.url && (
                        <div className="aspect-video rounded-lg overflow-hidden bg-white/5">
                          <img src={item.url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-xs text-white/40">Title *</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateGalleryItem(index, "title", e.target.value)}
                          placeholder="e.g. Tower Facade"
                          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/40">Description *</label>
                        <textarea
                          value={item.description}
                          onChange={(e) => updateGalleryItem(index, "description", e.target.value)}
                          placeholder="Describe this image..."
                          rows={2}
                          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50 resize-none"
                          required
                        />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white/5 text-white text-sm rounded-lg hover:bg-white/10">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg disabled:opacity-50">
              {saving ? "Saving..." : project ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}