import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Filter, Instagram, Youtube } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePosts } from '../../store/PostContext';
import { useBrand } from '../../store/BrandContext';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const statusColors = {
    draft: 'bg-slate-100 text-slate-600',
    pending: 'bg-amber-50 text-amber-600',
    approved: 'bg-blue-50 text-blue-600',
    scheduled: 'bg-indigo-50 text-indigo-600',
    published: 'bg-emerald-50 text-emerald-600',
};

const CalendarPage = () => {
    const [view, setView] = useState('month');
    const { posts } = usePosts();
    const { activeBrand } = useBrand();

    
    const days = Array.from({ length: 35 }, (_, i) => i - 3);

    const brandPosts = posts.filter(p => !activeBrand || p.brandId === activeBrand.id);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Content Calendar</h1>
                    <p className="text-slate-500 font-medium mt-1">Plan and schedule your content across all platforms.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
                        <button
                            onClick={() => setView('month')}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                                view === 'month' ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            Month
                        </button>
                        <button
                            onClick={() => setView('week')}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                                view === 'week' ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            Week
                        </button>
                    </div>
                    <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        <Filter size={20} />
                    </button>
                    <button className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center gap-2">
                        <Plus size={20} />
                        <span>Create Post</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-900">March 2026</h2>
                        <div className="flex items-center gap-1">
                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <button className="px-4 py-2 text-sm font-bold text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-all">
                            Today
                        </button>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            {['Draft', 'Pending', 'Scheduled', 'Published'].map(status => (
                                <div key={status} className="flex items-center gap-2">
                                    <div className={cn("w-2.5 h-2.5 rounded-full",
                                        status === 'Draft' ? 'bg-slate-300' :
                                            status === 'Pending' ? 'bg-amber-400' :
                                                status === 'Scheduled' ? 'bg-indigo-500' : 'bg-emerald-500'
                                    )}></div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-7 border-b border-slate-100">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest border-r last:border-r-0 border-slate-50 bg-slate-50/30">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 auto-rows-[160px]">
                    {days.map((day, i) => {
                        const isCurrentMonth = day > 0 && day <= 31;

                        
                        const dayPosts = brandPosts.filter(p => {
                            const postDate = new Date(p.scheduledDate);
                            return postDate.getMonth() === 2 && postDate.getDate() === day; 
                        });

                        return (
                            <div
                                key={i}
                                className={cn(
                                    "p-3 border-r border-b border-slate-100 transition-all hover:bg-slate-50/50 group relative",
                                    !isCurrentMonth ? "bg-slate-50/20" : ""
                                )}
                            >
                                <span className={cn(
                                    "text-sm font-bold inline-flex items-center justify-center w-8 h-8 rounded-full transition-all",
                                    isCurrentMonth ? "text-slate-700" : "text-slate-300",
                                    day === new Date().getDate() ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30" : ""
                                )}>
                                    {day > 0 ? day : day + 31}
                                </span>

                                <div className="mt-2 space-y-1 overflow-hidden">
                                    {dayPosts.map(post => (
                                        <div
                                            key={post.id}
                                            className={cn(
                                                "p-2 rounded-lg border border-transparent hover:border-slate-200 hover:shadow-sm cursor-pointer transition-all",
                                                statusColors[post.status]
                                            )}
                                        >
                                            <div className="flex items-center justify-between gap-1 mb-1">
                                                {post.platform === 'instagram' ? <Instagram size={10} /> : <Youtube size={10} />}
                                                <span className="text-[8px] font-bold uppercase truncate">{post.status}</span>
                                            </div>
                                            <p className="text-[10px] font-bold truncate leading-tight">{post.caption.substring(0, 30)}</p>
                                        </div>
                                    ))}
                                </div>

                                {isCurrentMonth && (
                                    <button className="absolute bottom-2 right-2 p-1.5 bg-white border border-slate-100 rounded-lg text-slate-300 opacity-0 group-hover:opacity-100 hover:text-brand-primary hover:border-brand-primary/20 transition-all shadow-sm">
                                        <Plus size={14} />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
