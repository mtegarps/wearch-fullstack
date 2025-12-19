"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Users, Eye, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ projects: 0, team: 0, services: 0 });
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, teamRes, servicesRes] = await Promise.all([
          fetch("/api/projects?all=true"),
          fetch("/api/team"),
          fetch("/api/services"),
        ]);
        const [projectsData, teamData, servicesData] = await Promise.all([
          projectsRes.json(),
          teamRes.json(),
          servicesRes.json(),
        ]);
        setStats({ projects: projectsData.length, team: teamData.length, services: servicesData.length });
        setProjects(projectsData.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statsData = [
    { label: "Total Projects", value: stats.projects.toString(), change: "+2", trend: "up", icon: FolderKanban, color: "#BBFF00" },
    { label: "Team Members", value: stats.team.toString(), change: "+1", trend: "up", icon: Users, color: "#00D4FF" },
    { label: "Page Views", value: "2.4K", change: "+12%", trend: "up", icon: Eye, color: "#FF6B6B" },
    { label: "Services", value: stats.services.toString(), change: "0", trend: "up", icon: TrendingUp, color: "#A78BFA" },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-8 h-8 border-2 border-[#BBFF00] border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Welcome back! Here's what's happening with your website.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 rounded-lg">
            <Calendar size={16} />Last 30 days
          </button>
          <motion.a href="/" target="_blank" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-4 py-2.5 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-lg">
            View Website<ArrowUpRight size={16} />
          </motion.a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="bg-[#242222] border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-white/10">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20" style={{ background: stat.color }} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{stat.change}
                </span>
              </div>
              <p className="text-3xl font-light text-white mb-1">{stat.value}</p>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 bg-[#242222] border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-white font-medium">Recent Projects</h2>
            <a href="/admin/projects" className="text-[#BBFF00] text-sm hover:underline">View All</a>
          </div>
          <div className="divide-y divide-white/5">
            {projects.map((project, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                    {project.image ? <img src={project.image} alt="" className="w-full h-full object-cover" /> : <FolderKanban size={20} className="text-white/40" />}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{project.title}</p>
                    <p className="text-white/40 text-xs">{project.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${project.status === "Published" ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`}>{project.status}</span>
                  <button className="text-white/40 hover:text-white"><MoreHorizontal size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#BBFF00]/10 to-transparent border border-[#BBFF00]/20 rounded-xl p-6">
          <h3 className="text-white font-medium mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/admin/projects" className="block px-4 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-lg hover:bg-white/10">+ Add Project</a>
            <a href="/admin/team" className="block px-4 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-lg hover:bg-white/10">+ Add Team Member</a>
            <a href="/admin/settings" className="block px-4 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-lg hover:bg-white/10">Edit Settings</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
