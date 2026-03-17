import React, { useState } from 'react';
import { Share2, BarChart3, TrendingUp, X, Copy, Check } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

const lineData = [
    { name: 'Week 1', ig: 4000, yt: 2400 },
    { name: 'Week 2', ig: 3000, yt: 1398 },
    { name: 'Week 3', ig: 2000, yt: 3800 },
    { name: 'Week 4', ig: 2780, yt: 3908 },
    { name: 'Week 5', ig: 1890, yt: 4800 },
    { name: 'Week 6', ig: 2390, yt: 3800 },
    { name: 'Week 7', ig: 3490, yt: 4300 },
];

const pieData = [
    { name: 'Instagram', value: 65, color: '#E1306C' },
    { name: 'YouTube', value: 35, color: '#FF0000' },
];

const HeatmapCell = ({ value }) => {
    const opacity = value / 100;
    return (
        <div
            className="w-full h-8 rounded-sm transition-all hover:ring-2 hover:ring-brand-primary cursor-pointer relative group"
            style={{ backgroundColor: `rgba(99, 102, 241, ${opacity})` }}
        >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900/80 rounded-sm z-10 transition-opacity">
                <span className="text-[10px] font-bold text-white">{value}%</span>
            </div>
        </div>
    );
};

const AnalyticsPage = () => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const insightsSummary = `📊 ANALYTICS REPORT
Generated: ${new Date().toLocaleString()}

📈 FOLLOWER GROWTH FACTOR
- Week 7: 3,490 followers (Instagram)
- Week 7: 4,300 engagement (YouTube)

🎯 PLATFORM DISTRIBUTION
- Instagram: 65% of audience
- YouTube: 35% of audience

⚡ KEY INSIGHTS
1. Optimal Post Time: Thursdays at 6:00 PM (45% higher engagement)
2. Virality Potential: Short-form video content (<30s) has 3x higher share rate
3. Best Performing Platform: Instagram leads with 65% audience distribution

📱 RECOMMENDATION
Focus on publishing short-form video content on Thursdays at 6:00 PM for maximum reach and engagement.`;

    const handleExportPDF = () => {
        const csvContent = `Analytics Report,${new Date().toISOString()}
Follower Growth Data,
Week,Instagram,YouTube
Week 1,4000,2400
Week 2,3000,1398
Week 3,2000,3800
Week 4,2780,3908
Week 5,1890,4800
Week 6,2390,3800
Week 7,3490,4300

Platform Distribution,
Platform,Percentage
Instagram,65%
YouTube,35%

Smart Insights,
Optimal Post Time,Thursdays at 6:00 PM (45% higher engagement)
Virality Potential,Video content under 30s has 3x higher share rate

Report Generated,${new Date().toLocaleString()}`;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `analytics-report-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const handleCopyInsights = () => {
        navigator.clipboard.writeText(insightsSummary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Advanced Analytics</h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Deep dive into your brand's cross-platform performance.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                        onClick={handleExportPDF}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-slate-200 rounded-xl font-bold text-xs sm:text-sm text-slate-600 hover:bg-slate-50 transition-all shadow-sm whitespace-nowrap"
                    >
                        Export PDF
                    </button>
                    <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-brand-primary text-white rounded-xl font-bold text-xs sm:text-sm hover:shadow-lg hover:shadow-brand-primary/20 transition-all whitespace-nowrap"
                    >
                        Share Insights
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 lg:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-8">Follower Growth Factor</h3>
                    <div className="h-[250px] sm:h-[300px] lg:h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={lineData}>
                                <defs>
                                    <linearGradient id="colorIg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E1306C" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#E1306C" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorYt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF0000" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="ig" stroke="#E1306C" strokeWidth={3} fillOpacity={1} fill="url(#colorIg)" />
                                <Area type="monotone" dataKey="yt" stroke="#FF0000" strokeWidth={3} fillOpacity={1} fill="url(#colorYt)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Platform Distribution</h3>
                        <p className="text-sm text-slate-400 font-medium mb-8">Where your audience lives</p>
                    </div>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                        {pieData.map(entry => (
                            <div key={entry.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                    <span className="text-sm font-bold text-slate-600">{entry.name}</span>
                                </div>
                                <span className="text-sm font-black text-slate-900">{entry.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-8">Performance Heatmap</h3>
                    <div className="grid grid-cols-8 gap-1">
                        <div className="h-8"></div>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="h-8 text-[10px] font-bold text-slate-400 text-center uppercase">{day}</div>
                        ))}

                        {[8, 10, 12, 14, 16, 18, 20].map(hour => (
                            <React.Fragment key={hour}>
                                <div className="h-8 text-[10px] font-bold text-slate-400 flex items-center pr-2 uppercase">{hour}:00</div>
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <HeatmapCell key={i} value={Math.floor(Math.random() * 100)} />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-400">Darker colors indicate higher engagement probability.</p>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-300">LOW</span>
                            <div className="flex gap-0.5">
                                {[0.2, 0.4, 0.6, 0.8, 1].map(o => <div key={o} className="w-4 h-2 rounded-sm" style={{ backgroundColor: `rgba(99, 102, 241, ${o})` }}></div>)}
                            </div>
                            <span className="text-[10px] font-bold text-brand-primary">HIGH</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold">Smart Insights</h3>
                        <div className="p-2 bg-slate-800 rounded-xl">
                            <BarChart3 size={20} className="text-brand-primary" />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex gap-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-brand-primary transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 flex-shrink-0">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Optimal Post Time</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">Your engagement is 45% higher on Thursdays at 6:00 PM.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-brand-primary transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 flex-shrink-0">
                                <Share2 size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Virality Potential</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">Video content under 30s has a 3x higher share rate this month.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ShareInsightsModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                insightsSummary={insightsSummary}
                onCopy={handleCopyInsights}
                copied={copied}
            />
        </div>
    );
};

const ShareInsightsModal = ({ isOpen, onClose, insightsSummary, onCopy, copied }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative z-10 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Share Insights</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 mb-6 max-h-96 overflow-y-auto">
                    <p className="text-xs text-slate-400 font-mono leading-relaxed whitespace-pre-wrap">
                        {insightsSummary}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onCopy}
                        className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                            copied
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-brand-primary text-white hover:shadow-lg hover:shadow-brand-primary/20'
                        }`}
                    >
                        {copied ? (
                            <>
                                <Check size={18} />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy size={18} />
                                Copy to Clipboard
                            </>
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
