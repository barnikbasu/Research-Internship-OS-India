import { motion } from "motion/react";
import { Search, GraduationCap, Briefcase, Users, LayoutDashboard, Settings, LogOut, ChevronRight, Menu, X, Bell, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'internships', label: 'Explore Internships', icon: Briefcase, path: '/internships' },
  { id: 'professors', label: 'Professor Network', icon: GraduationCap, path: '/professors' },
  { id: 'mentor', label: 'Research Mentor', icon: Search, path: '/mentor' },
  { id: 'community', label: 'Research Hub', icon: Users, path: '/community' },
  { id: 'settings', label: 'Account Settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <motion.aside 
            initial={false}
            animate={{ width: collapsed ? 80 : 280 }}
            className="h-screen sticky top-0 bg-slate-900 text-slate-400 border-r border-slate-800 flex flex-col z-50 overflow-hidden"
        >
            <div className="p-6 flex items-center justify-between">
                {!collapsed && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <GraduationCap className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-white tracking-tight">ResearchOS</span>
                    </motion.div>
                )}
                <button 
                  onClick={() => setCollapsed(!collapsed)} 
                  className="p-1 hover:bg-slate-800 rounded transition-colors"
                  id="sidebar-toggle"
                >
                    {collapsed ? <ChevronRight size={20} /> : <X size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-4 mt-6 space-y-2">
                {SIDEBAR_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link 
                            key={item.id} 
                            to={item.path}
                            className={cn(
                                "flex items-center gap-4 p-3 rounded-xl transition-all group relative",
                                isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 hover:text-white"
                            )}
                            id={`nav-${item.id}`}
                        >
                            <item.icon size={20} className={isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"} />
                            {!collapsed && (
                                <motion.span 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-medium whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {isActive && !collapsed && (
                                <motion.div 
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center gap-4 p-3 w-full rounded-xl hover:bg-slate-800 transition-all text-slate-500 hover:text-red-400">
                    <LogOut size={20} />
                    {!collapsed && <span className="font-medium">Sign Out</span>}
                </button>
            </div>
        </motion.aside>
    );
}

export function Topbar() {
    return (
        <header className="h-16 px-8 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search for internships, professors, or papers..." 
                        className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        id="global-search"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 relative">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                    <Moon size={20} />
                </button>
                <div className="h-8 w-px bg-slate-200"></div>
                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-900">Aryan Singh</p>
                        <p className="text-[10px] text-slate-500">IIT Kharagpur</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border-2 border-white shadow-sm overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan" alt="User" />
                    </div>
                </div>
            </div>
        </header>
    );
}
