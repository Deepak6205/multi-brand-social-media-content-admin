import { TrendingUp, Users, Calendar as CalendarIcon, BarChart3, ArrowUpRight, ArrowDownRight, MoreHorizontal, Instagram, Youtube } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useBrand } from '../../store/BrandContext';
import { usePosts } from '../../store/PostContext';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

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

    const brandPosts = posts.filter(p => !activeBrand || p.brandId === activeBrand.id);
    const activePostsCount = brandPosts.filter(p => p.status === 'scheduled' || p.status === 'pending').length;
    const publishedPosts = brandPosts.filter(p => p.status === 'published').slice(0, 3);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        {activeBrand?.name} Dashboard
                        {activeBrand?.platform === 'instagram' ? <Instagram size={24} className="text-pink-600" /> : <Youtube size={24} className="text-red-600" />}
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Global performance overview for your brand.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        Export Report
                    </button>
                    <button className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all">
                        + New Strategy
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Followers" value={(activeBrand?.followers || 0).toLocaleString()} change="+12" trend="up" icon={Users} />
                <StatCard title="Avg. Engagement" value="4.82%" change="+2.4" trend="up" icon={TrendingUp} />
                <StatCard title="Active Posts" value={activePostsCount.toString()} change="+2" trend="up" icon={CalendarIcon} />
                <StatCard title="Monthly Reach" value="850.4K" change="+14" trend="up" icon={BarChart3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
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
                <div className="xl:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Content</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="pb-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Content</th>
                                    <th className="pb-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Date</th>
                                    <th className="pb-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Engagement</th>
                                    <th className="pb-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="pb-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {publishedPosts.length > 0 ? publishedPosts.map((post, i) => (
                                    <tr key={post.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-4">
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
                                        <td className="py-4">
                                            <span className="text-sm font-medium text-slate-400">{new Date(post.scheduledDate).toLocaleDateString()}</span>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-brand-primary rounded-full transition-all duration-1000" style={{ width: i === 0 ? '85%' : i === 1 ? '65%' : '45%' }}></div>
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{i === 0 ? '8.5%' : i === 1 ? '6.2%' : '4.1%'}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={cn(
                                                "px-3 py-1 text-xs font-bold rounded-lg uppercase",
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

                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Power up with AI</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">Let our AI suggest the best captions and posting times for maximum engagement.</p>
                        <button className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all">
                            Generate Now
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full -ml-12 -mb-12"></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
