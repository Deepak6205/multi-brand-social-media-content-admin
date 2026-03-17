import { useState } from 'react';
import { TrendingUp, Users, Calendar as CalendarIcon, BarChart3, ArrowUpRight, ArrowDownRight, MoreHorizontal, Instagram, Youtube, X, Download, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrand } from '../../store/BrandContext';
import { usePosts } from '../../store/PostContext';
import { CreatePostModal } from '../../components/dashboard/PostFlow';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const ExportReportModal = ({ isOpen, onClose, onExport, hasData }) => {
    const [exported, setExported] = useState(false);

    const handleExport = () => {
        onExport();
        setExported(true);
        setTimeout(() => {
            setExported(false);
            onClose();
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-96 max-h-[90vh] overflow-y-auto z-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">Export Report</h2>
                            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="p-8">
                            {!exported ? (
                                <>
                                    {hasData ? (
                                        <div className="space-y-4">
                                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                                <p className="text-sm font-medium text-blue-900">📊 Report Details</p>
                                                <p className="text-xs text-blue-700 mt-2">Download a CSV file containing all your posts with detailed metrics including likes, comments, and shares.</p>
                                            </div>
                                            <button
                                                onClick={handleExport}
                                                className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Download size={20} />
                                                Export Report
                                            </button>
                                        </div>
                                    ) : (
                                        <motion.div
                                            className="py-8 text-center"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                        >
                                            <motion.div
                                                className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                            >
                                                <span className="text-3xl">📭</span>
                                            </motion.div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-2">No Posts Available</h3>
                                            <p className="text-slate-500 font-medium">Create some posts first to export a report.</p>
                                        </motion.div>
                                    )}
                                </>
                            ) : (
                                <motion.div
                                    className="py-8 text-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <motion.div
                                        className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <Check size={32} className="text-emerald-600" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Report Exported!</h3>
                                    <p className="text-slate-500 font-medium">Your CSV file has been downloaded successfully.</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const data = [
    { name: 'Mon', followers: 4000, engagement: 2400 },
    { name: 'Tue', followers: 3000, engagement: 1398 },
    { name: 'Wed', followers: 2000, engagement: 9800 },
    { name: 'Thu', followers: 2780, engagement: 3908 },
    { name: 'Fri', followers: 1890, engagement: 4800 },
    { name: 'Sat', followers: 2390, engagement: 3800 },
    { name: 'Sun', followers: 3490, engagement: 4300 },
];

const StatCard = ({ title, value, change, trend, icon: Icon }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                <Icon size={24} />
            </div>
            <div className={cn(
                "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg",
                trend === 'up' ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
            )}>
                {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}%
            </div>
        </div>
        <h3 className="text-slate-500 font-medium text-sm mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
);

const Dashboard = () => {
    const { activeBrand } = useBrand();
    const { posts } = usePosts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    const brandPosts = posts.filter(p => !activeBrand || p.brandId === activeBrand.id);
    const activePostsCount = brandPosts.filter(p => p.status === 'scheduled' || p.status === 'pending').length;
    const recentPosts = [...brandPosts]
        .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
        .slice(0, 3);

    const handleExportReport = () => {
        const csvRows = [
            ['ID', 'Caption', 'Platform', 'Status', 'Scheduled Date', 'Likes', 'Comments', 'Shares'],
            ...brandPosts.map(post => [
                post.id,
                `"${post.caption.replace(/"/g, '""')}"`,
                post.platform,
                post.status,
                post.scheduledDate,
                post.metrics?.likes ?? 0,
                post.metrics?.comments ?? 0,
                post.metrics?.shares ?? 0
            ])
        ];
        const csvString = csvRows.map(r => r.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${activeBrand?.name || 'all-brands'}-posts-${new Date().toISOString().slice(0,10)}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const handleOpenExportModal = () => {
        setIsExportModalOpen(true);
    };

    const handleNewStrategy = () => {
        setIsModalOpen(true);
    };
    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2 sm:gap-3 break-words">
                        {activeBrand?.name} Dashboard
                        {activeBrand?.platform === 'instagram' ? <Instagram size={20} sm:size={24} className="text-pink-600 flex-shrink-0" /> : <Youtube size={20} sm:size={24} className="text-red-600 flex-shrink-0" />}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Global performance overview for your brand.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                        onClick={handleOpenExportModal}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-slate-200 rounded-xl font-bold text-xs sm:text-sm text-slate-600 hover:bg-slate-50 transition-all shadow-sm whitespace-nowrap"
                    >
                        Export Report
                    </button>
                    <button
                        onClick={handleNewStrategy}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-brand-primary text-white rounded-xl font-bold text-xs sm:text-sm hover:shadow-lg hover:shadow-brand-primary/20 transition-all whitespace-nowrap"
                    >
                        + New Strategy
                    </button>
                </div>
            </div>

            <ExportReportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                onExport={handleExportReport}
                hasData={brandPosts.length > 0}
            />

            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialPlatform={activeBrand?.platform || 'instagram'}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                <StatCard title="Total Followers" value={(activeBrand?.followers || 0).toLocaleString()} change="+12" trend="up" icon={Users} />
                <StatCard title="Avg. Engagement" value="4.82%" change="+2.4" trend="up" icon={TrendingUp} />
                <StatCard title="Active Posts" value={activePostsCount.toString()} change="+2" trend="up" icon={CalendarIcon} />
                <StatCard title="Monthly Reach" value="850.4K" change="+14" trend="up" icon={BarChart3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 md:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Follower Growth</h3>
                            <p className="text-sm text-slate-400 font-medium">Tracking growth over the last 7 days</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        padding: '12px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="followers"
                                    stroke="var(--brand-primary)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorFollowers)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Engagement Rate</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        padding: '12px'
                                    }}
                                />
                                <Bar
                                    dataKey="engagement"
                                    fill="var(--brand-primary)"
                                    radius={[6, 6, 0, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Recent Content</h3>
                        <button className="text-xs font-bold uppercase tracking-wide px-3 py-2 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition">Show All</button>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-3">
                            <thead>
                                <tr className="bg-slate-50 rounded-xl">
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Content</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Engagement</th>
                                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentPosts.length > 0 ? recentPosts.map((post, i) => (
                                    <tr key={post.id} className="group hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden">
                                                    {post.mediaUrl ? (
                                                        <img src={post.mediaUrl} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                            {post.platform === 'instagram' ? <Instagram size={20} /> : <Youtube size={20} />}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-bold text-slate-700 line-clamp-1">{post.caption}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm font-medium text-slate-400">{new Date(post.scheduledDate).toLocaleDateString()}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-brand-primary rounded-full transition-all duration-1000" style={{ width: i === 0 ? '85%' : i === 1 ? '65%' : '45%' }}></div>
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{i === 0 ? '8.5%' : i === 1 ? '6.2%' : '4.1%'}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={cn(
                                                "px-3 py-1 text-xs font-bold rounded-full uppercase",
                                                post.status === 'published' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                            )}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">No recent content found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group self-start h-[280px] min-h-[280px] max-h-[280px]">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Power up with AI</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">Let our AI suggest the best captions and posting times for maximum engagement.</p>
                        <button className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all">
                            Generate Now
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-36 h-36 bg-brand-primary/20 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-28 h-28 bg-purple-500/10 blur-2xl rounded-full -ml-16 -mb-16 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
