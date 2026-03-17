import React from 'react';
import {
    LayoutDashboard,
    Calendar,
    Kanban,
    BarChart3,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Plus,
    ChevronDown
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useBrand } from '../../store/BrandContext';
import { useAuth } from '../../store/AuthContext';
import { CreatePostModal } from '../dashboard/PostFlow';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Kanban, label: 'Workflow', path: '/kanban' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: LayoutDashboard, label: 'Brands', path: '/brands' },
];

export const Sidebar = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const { activeBrand, brands, setActiveBrand } = useBrand();
    const { logout } = useAuth();
    const [showBrands, setShowBrands] = React.useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = React.useState(false);

    return (
        <>
            <aside
                className={cn(
                    "bg-brand-secondary text-white h-screen transition-all duration-300 flex flex-col sticky top-0 z-20",
                    collapsed ? "w-20" : "w-72"
                )}
            >
                <div className="p-6 flex items-center justify-between border-b border-slate-800">
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center transition-colors">
                                <span className="font-bold text-lg text-white">G</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight">Gravity</span>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <div className="px-4 py-3">
                    <div className="relative">
                        <button
                            onClick={() => !collapsed && setShowBrands(!showBrands)}
                            className={cn(
                                "w-full flex items-center gap-3 p-3 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all",
                                collapsed ? "justify-center px-0" : ""
                            )}
                        >
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white shrink-0"
                                style={{ backgroundColor: activeBrand?.themeColor }}
                            >
                                {activeBrand?.logo}
                            </div>
                            {!collapsed && (
                                <>
                                    <div className="flex-1 text-left min-w-0">
                                        <p className="text-sm font-bold truncate">{activeBrand?.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{activeBrand?.platform}</p>
                                    </div>
                                    <ChevronDown size={14} className={cn("text-slate-500 transition-transform", showBrands ? "rotate-180" : "")} />
                                </>
                            )}
                        </button>

                        {!collapsed && showBrands && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-2 space-y-1">
                                    {brands.map((brand) => (
                                        <button
                                            key={brand.id}
                                            onClick={() => {
                                                setActiveBrand(brand);
                                                setShowBrands(false);
                                            }}
                                            className={cn(
                                                "w-full flex items-center gap-3 p-2 rounded-xl transition-all",
                                                activeBrand?.id === brand.id ? "bg-slate-700/50" : "hover:bg-slate-700/30"
                                            )}
                                        >
                                            <div
                                                className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] text-white shrink-0"
                                                style={{ backgroundColor: brand.themeColor }}
                                            >
                                                {brand.logo}
                                            </div>
                                            <span className="text-sm font-medium">{brand.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-brand-primary text-white shadow-lg shadow-indigo-500/20"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon size={22} />
                            {!collapsed && <span className="font-medium">{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="px-4 py-3 space-y-2 border-t border-slate-800">
                    {!collapsed && (
                        <button
                            onClick={() => setIsPostModalOpen(true)}
                            className="w-full flex items-center gap-3 p-4 bg-brand-primary text-white rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mb-4"
                        >
                            <Plus size={22} />
                            <span className="font-medium">New Post</span>
                        </button>
                    )}
                    {collapsed && (
                        <button
                            onClick={() => setIsPostModalOpen(true)}
                            className="w-12 h-12 bg-brand-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20 hover:scale-110 transition-all mx-auto mb-4"
                        >
                            <Plus size={24} />
                        </button>
                    )}
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 p-3 rounded-xl transition-all",
                            isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        )}
                    >
                        <Settings size={22} />
                        {!collapsed && <span className="font-medium">Settings</span>}
                    </NavLink>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 p-3 text-slate-300 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all font-medium"
                    >
                        <LogOut size={22} />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            <CreatePostModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
        </>
    );
};
