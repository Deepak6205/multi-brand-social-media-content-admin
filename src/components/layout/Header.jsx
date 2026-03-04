import { Search, Bell, Command, ChevronDown, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';

export const Header = () => {
    const { logout, user } = useAuth();

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <div className="relative group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search brands, posts, team..."
                        className="w-full pl-12 pr-12 py-3 bg-slate-100 border-transparent focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 rounded-2xl transition-all outline-none text-slate-600 font-medium"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <Command size={12} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400">K</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
                    <Bell size={22} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-slate-200"></div>

                <div className="relative group">
                    <button className="flex items-center gap-3 pl-1 pr-2 py-1 hover:bg-slate-100 rounded-2xl transition-all group-hover:bg-slate-50">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
                            {user?.email[0].toUpperCase() || 'A'}
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-bold text-slate-800">{user?.email.split('@')[0] || 'Admin'}</p>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-tight">Super Admin</p>
                        </div>
                        <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </button>

                    
                    <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-slate-100 rounded-[1.5rem] shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto p-2 border-slate-200/50 backdrop-blur-xl">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all text-sm font-bold">
                            <UserIcon size={18} className="text-slate-400" />
                            Account Settings
                        </button>
                        <div className="h-[1px] bg-slate-50 my-1"></div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all text-sm font-bold"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
