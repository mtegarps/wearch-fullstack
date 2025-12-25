"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, FolderKanban, Users, Briefcase, Phone, Settings, LogOut, Menu, X, ChevronRight, Bell, Search, FileText, Grid2X2 } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: FolderKanban, label: "Projects", href: "/admin/projects" },
  { icon: FileText, label: "Articles", href: "/admin/articles" },
  { icon: Users, label: "Team", href: "/admin/team" },
  { icon: Grid2X2, label: "About Services", href: "/admin/about-services" },
  { icon: Briefcase, label: "Services", href: "/admin/services" },
  { icon: Phone, label: "Contact", href: "/admin/contact" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setIsLoading(false);
      } catch {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-8 h-8 border-2 border-[#BBFF00] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Desktop Sidebar */}
      <motion.aside initial={false} animate={{ width: isSidebarOpen ? 280 : 80 }} transition={{ duration: 0.3 }} className="hidden lg:flex flex-col bg-[#242222] border-r border-white/5 fixed h-full z-40">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
              <path d="M20 20 L35 80 L20 80 Z" fill="#BBFF00" />
              <path d="M42 20 L57 80 L42 80 Z" fill="#BBFF00" />
              <path d="M64 20 L79 80 L64 80 Z" fill="#BBFF00" />
            </svg>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col">
                  <span className="text-white font-semibold tracking-tight">Wearch</span>
                  <span className="text-[#BBFF00] text-xs tracking-wider">ADMIN</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.a key={item.href} href={item.href} whileHover={{ x: 4 }}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-[#BBFF00]/10 text-[#BBFF00]" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                <item.icon size={20} />
                <AnimatePresence>
                  {isSidebarOpen && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="text-sm font-medium">{item.label}</motion.span>}
                </AnimatePresence>
                {isActive && isSidebarOpen && <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-1.5 bg-[#BBFF00] rounded-full" />}
              </motion.a>
            );
          })}
        </nav>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute -right-3 top-20 w-6 h-6 bg-[#BBFF00] rounded-full flex items-center justify-center text-[#242222]">
          <ChevronRight size={14} className={`transition-transform ${isSidebarOpen ? "rotate-180" : ""}`} />
        </button>

        <div className="p-4 border-t border-white/5">
          <motion.button onClick={handleLogout} whileHover={{ x: 4 }} className="flex items-center gap-4 px-4 py-3 w-full text-white/60 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <AnimatePresence>
              {isSidebarOpen && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="text-sm font-medium">Logout</motion.span>}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25 }} className="fixed inset-y-0 left-0 w-[280px] bg-[#242222] border-r border-white/5 z-50 lg:hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                  <path d="M20 20 L35 80 L20 80 Z" fill="#BBFF00" />
                  <path d="M42 20 L57 80 L42 80 Z" fill="#BBFF00" />
                  <path d="M64 20 L79 80 L64 80 Z" fill="#BBFF00" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-white font-semibold tracking-tight">Wearch</span>
                  <span className="text-[#BBFF00] text-xs tracking-wider">ADMIN</span>
                </div>
              </div>
              <button onClick={() => setIsMobileSidebarOpen(false)} className="text-white/60"><X size={24} /></button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <a key={item.href} href={item.href} onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-[#BBFF00]/10 text-[#BBFF00]" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/5">
              <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 w-full text-white/60 hover:text-red-400">
                <LogOut size={20} /><span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-[280px]" : "lg:ml-[80px]"}`}>
        <header className="sticky top-0 z-30 bg-[#1a1a1a]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white"><Menu size={24} /></button>

            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="text" placeholder="Search..." className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 pl-12 pr-4 py-2.5 text-sm rounded-lg focus:outline-none focus:border-[#BBFF00]/50" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative text-white/60 hover:text-white">
                <Bell size={20} /><span className="absolute -top-1 -right-1 w-2 h-2 bg-[#BBFF00] rounded-full" />
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="w-9 h-9 bg-[#BBFF00]/20 rounded-full flex items-center justify-center text-[#BBFF00] text-sm font-semibold">
                  {user?.name?.charAt(0) || "A"}
                </div>
                <div className="hidden sm:block">
                  <p className="text-white text-sm font-medium">{user?.name || "Admin"}</p>
                  <p className="text-white/40 text-xs">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
