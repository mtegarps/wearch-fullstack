"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Home, GripVertical, Star, StarOff, Save, Eye, EyeOff, Settings as SettingsIcon, ChevronUp, ChevronDown } from "lucide-react";

interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  image: string;
  category: string;
  status: string;
  featuredOnHome: boolean;
  homeOrder: number;
}

export default function HomepageSettingsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [maxProjects, setMaxProjects] = useState(3);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch all projects and settings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, settingsRes] = await Promise.all([
          fetch("/api/projects?all=true"),
          fetch("/api/settings"),
        ]);
        
        const projectsData = await projectsRes.json();
        const settingsData = await settingsRes.json();
        
        // Get published projects only for selection
        const publishedProjects = projectsData.filter((p: Project) => p.status === "Published");
        setProjects(publishedProjects);
        
        // Get featured projects sorted by order
        const featured = publishedProjects
          .filter((p: Project) => p.featuredOnHome)
          .sort((a: Project, b: Project) => a.homeOrder - b.homeOrder);
        setFeaturedProjects(featured);
        
        // Get max projects count from settings
        setMaxProjects(settingsData.homeProjectsCount || 3);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Toggle featured status
  const toggleFeatured = (project: Project) => {
    if (project.featuredOnHome) {
      // Remove from featured
      setFeaturedProjects(featuredProjects.filter(p => p.id !== project.id));
    } else {
      // Add to featured (if not exceeding max)
      if (featuredProjects.length < maxProjects) {
        const newFeatured = [...featuredProjects, { ...project, featuredOnHome: true, homeOrder: featuredProjects.length }];
        setFeaturedProjects(newFeatured);
      }
    }
  };

  // Check if project is featured
  const isFeatured = (projectId: number) => {
    return featuredProjects.some(p => p.id === projectId);
  };

  // Move project up in order
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...featuredProjects];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setFeaturedProjects(newOrder);
  };

  // Move project down in order
  const moveDown = (index: number) => {
    if (index === featuredProjects.length - 1) return;
    const newOrder = [...featuredProjects];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setFeaturedProjects(newOrder);
  };

  // Save all changes
  const handleSave = async () => {
    setSaving(true);
    try {
      // First, reset all projects to not featured
      const allProjectIds = projects.map(p => p.id);
      
      // Update each project
      for (const project of projects) {
        const isFeaturedNow = featuredProjects.some(f => f.id === project.id);
        const orderIndex = featuredProjects.findIndex(f => f.id === project.id);
        
        await fetch(`/api/projects/${project.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...project,
            featuredOnHome: isFeaturedNow,
            homeOrder: isFeaturedNow ? orderIndex : 0,
          }),
        });
      }

      // Update max projects in settings
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeProjectsCount: maxProjects }),
      });

      setSuccessMessage("Homepage settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save homepage settings");
    } finally {
      setSaving(false);
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-white flex items-center gap-3">
            <Home className="text-[#BBFF00]" size={24} />
            Homepage Projects
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Select and order projects to display on the homepage
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Changes"}
        </motion.button>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Card */}
      <div className="bg-[#242222] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <SettingsIcon size={18} className="text-[#BBFF00]" />
          <h2 className="text-white font-medium">Display Settings</h2>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-white/60 text-sm">Maximum projects to show:</label>
          <select 
            value={maxProjects} 
            onChange={(e) => setMaxProjects(parseInt(e.target.value))}
            className="bg-white/5 border border-white/10 text-white px-4 py-2 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50"
          >
            {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(num => (
              <option key={num} value={num}>{num} projects</option>
            ))}
          </select>
          <span className="text-white/40 text-xs">
            (Currently showing {featuredProjects.length} of {maxProjects})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Projects (Orderable) */}
        <div className="bg-[#242222] border border-white/10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-[#BBFF00]/5">
            <h2 className="text-white font-medium flex items-center gap-2">
              <Star size={18} className="text-[#BBFF00]" />
              Featured on Homepage ({featuredProjects.length}/{maxProjects})
            </h2>
            <p className="text-white/40 text-xs mt-1">
              Drag to reorder or use arrows. First project appears at the top.
            </p>
          </div>
          
          <div className="p-4 space-y-3 min-h-[300px]">
            {featuredProjects.length === 0 ? (
              <div className="text-center py-12">
                <Star size={32} className="text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No featured projects yet</p>
                <p className="text-white/30 text-xs mt-1">Select projects from the right panel</p>
              </div>
            ) : (
              featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3 bg-white/5 border border-[#BBFF00]/20 rounded-lg p-3 group"
                >
                  {/* Order Number */}
                  <div className="w-8 h-8 bg-[#BBFF00] text-[#242222] rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Image */}
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                    {project.image && (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium truncate">{project.title}</h3>
                    <p className="text-white/40 text-xs truncate">{project.location} · {project.year}</p>
                  </div>

                  {/* Order Controls */}
                  <div className="flex flex-col gap-1">
                    <button 
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="p-1 hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronUp size={16} className="text-white/60" />
                    </button>
                    <button 
                      onClick={() => moveDown(index)}
                      disabled={index === featuredProjects.length - 1}
                      className="p-1 hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronDown size={16} className="text-white/60" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => toggleFeatured(project)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Remove from homepage"
                  >
                    <StarOff size={18} className="text-red-400" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Available Projects */}
        <div className="bg-[#242222] border border-white/10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-white font-medium flex items-center gap-2">
              <Eye size={18} className="text-white/40" />
              Available Projects ({projects.filter(p => !isFeatured(p.id)).length})
            </h2>
            <p className="text-white/40 text-xs mt-1">
              Click to add project to homepage
            </p>
          </div>
          
          <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
            {projects.filter(p => !isFeatured(p.id)).length === 0 ? (
              <div className="text-center py-12">
                <EyeOff size={32} className="text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">All published projects are featured</p>
              </div>
            ) : (
              projects
                .filter(p => !isFeatured(p.id))
                .map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3 hover:border-white/20 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                      {project.image && (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-medium truncate">{project.title}</h3>
                      <p className="text-white/40 text-xs truncate">{project.location} · {project.year}</p>
                      <span className="text-[#BBFF00]/60 text-xs">{project.category}</span>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={() => toggleFeatured(project)}
                      disabled={featuredProjects.length >= maxProjects}
                      className={`p-2 rounded-lg transition-colors ${
                        featuredProjects.length >= maxProjects
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-[#BBFF00]/20"
                      }`}
                      title={featuredProjects.length >= maxProjects ? "Maximum projects reached" : "Add to homepage"}
                    >
                      <Star size={18} className="text-[#BBFF00]" />
                    </button>
                  </motion.div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Preview Info */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-medium mb-3">Preview Order</h3>
        <div className="flex flex-wrap gap-4">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="flex items-center gap-2 bg-[#242222] px-3 py-2 rounded-lg">
              <span className="w-6 h-6 bg-[#BBFF00] text-[#242222] rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
              <span className="text-white text-sm">{project.title}</span>
            </div>
          ))}
          {featuredProjects.length === 0 && (
            <p className="text-white/40 text-sm">No projects selected</p>
          )}
        </div>
      </div>
    </div>
  );
}
