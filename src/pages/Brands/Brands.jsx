import { useState } from 'react';
import { Plus, Search, MoreHorizontal, Instagram, Youtube, Trash2, Edit3, Target, Palette, ExternalLink, X, Check, Zap, Users, Calendar, BarChart3, Settings as SettingsIcon, BookOpen, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrand } from '../../store/BrandContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const FeaturesModal = ({ isOpen, onClose }) => {
    const features = [
        { icon: Target, title: 'Brand Management', desc: 'Create and manage multiple brands with custom themes and colors.' },
        { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track performance, follower growth, and engagement metrics.' },
        { icon: Calendar, title: 'Content Calendar', desc: 'Plan and schedule posts across different platforms.' },
        { icon: Zap, title: 'Kanban Workflow', desc: 'Organize content through Draft, Review, Approved, Scheduled, and Published stages.' },
        { icon: Users, title: 'Team Collaboration', desc: 'Invite team members and manage roles and permissions.' },
        { icon: SettingsIcon, title: 'Settings Control', desc: 'Customize notifications, privacy, preferences, and security settings.' }
    ];

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
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">Explore All Features</h2>
                            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {features.map((feature, idx) => {
                                    const Icon = feature.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-primary/30 hover:shadow-lg transition-all group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-brand-primary/10 rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-all">
                                                    <Icon size={24} className="text-brand-primary group-hover:text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                                                    <p className="text-sm text-slate-600">{feature.desc}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const DocumentationModal = ({ isOpen, onClose }) => {
    const docs = [
        { icon: BookOpen, title: 'Getting Started', desc: 'Learn the basics and set up your first brand.' },
        { icon: Users, title: 'Team Management', desc: 'Invite team members and configure permissions.' },
        { icon: Calendar, title: 'Content Planning', desc: 'Master the calendar and workflow features.' },
        { icon: BarChart3, title: 'Analytics Guide', desc: 'Understand metrics and performance data.' },
        { icon: Globe, title: 'Platform Support', desc: 'Details about Instagram and YouTube integration.' },
        { icon: SettingsIcon, title: 'Settings & Security', desc: 'Configure your account settings safely.' }
    ];

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
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">Documentation</h2>
                            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {docs.map((doc, idx) => {
                                    const Icon = doc.icon;
                                    return (
                                        <motion.a
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            href="#"
                                            className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-primary/30 hover:shadow-lg transition-all group cursor-pointer"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-brand-primary/10 rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-all">
                                                    <Icon size={24} className="text-brand-primary group-hover:text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                                                        {doc.title}
                                                        <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </h3>
                                                    <p className="text-sm text-slate-600">{doc.desc}</p>
                                                </div>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4">Need More Help?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <a href="#" className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-center">
                                        <p className="font-bold text-blue-900">📧 Contact Support</p>
                                        <p className="text-xs text-blue-700 mt-1">Get help from our support team</p>
                                    </a>
                                    <a href="#" className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors text-center">
                                        <p className="font-bold text-emerald-900">💬 Community Forum</p>
                                        <p className="text-xs text-emerald-700 mt-1">Connect with other users</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const CreateBrandModal = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [platform, setPlatform] = useState('instagram');
    const [color, setColor] = useState('#6366F1');
    const [category, setCategory] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            name,
            platform,
            themeColor: color,
            category: category || 'General',
            logo: name.substring(0, 2).toUpperCase()
        });
        onClose();
        setName('');
        setCategory('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative z-10 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Brand</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Brand Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Acme Studio"
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all font-medium"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Primary Platform</label>
                        <div className="flex gap-3">
                            {['instagram', 'youtube'].map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPlatform(p)}
                                    className={cn(
                                        "flex-1 py-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-bold capitalize",
                                        platform === p
                                            ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                                            : "border-slate-100 text-slate-400 hover:border-slate-200"
                                    )}
                                >
                                    {p === 'instagram' ? <Instagram size={18} /> : <Youtube size={18} />}
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Theme Color</label>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {['#6366F1', '#E1306C', '#FF0000', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6'].map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={cn(
                                        "w-8 h-8 rounded-full shrink-0 transition-all transform hover:scale-110 ring-offset-2",
                                        color === c ? "ring-2 ring-slate-900" : ""
                                    )}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-8 h-8 rounded-full overflow-hidden border-none p-0 cursor-pointer bg-transparent"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category / Niche</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="e.g. Travel, Tech, Fashion"
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-4 bg-brand-primary text-white rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-all"
                        >
                            Create Brand
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const BrandsPage = () => {
    const { brands, activeBrand, setActiveBrand, addBrand, deleteBrand } = useBrand();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);
    const [isDocumentationModalOpen, setIsDocumentationModalOpen] = useState(false);

    const filteredBrands = brands.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Brand Management</h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Organize and switch between your client brands.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="pl-12 pr-6 py-2 sm:py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 outline-none w-full sm:max-w-64 text-xs sm:text-sm font-medium shadow-sm transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-brand-primary text-white rounded-xl font-bold text-xs sm:text-sm hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center sm:justify-start gap-2 whitespace-nowrap"
                    >
                        <Plus size={18} sm:size={20} />
                        <span>Add Brand</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBrands.map((brand) => (
                    <div
                        key={brand.id}
                        className={cn(
                            "bg-white rounded-[2.5rem] border-2 transition-all duration-500 p-8 flex flex-col items-center text-center relative group overflow-hidden",
                            activeBrand?.id === brand.id
                                ? "border-slate-900 shadow-2xl scale-[1.02]"
                                : "border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-xl hover:-translate-y-2"
                        )}
                    >
                        {activeBrand?.id === brand.id && (
                            <div className="absolute top-6 right-6 px-3 py-1 bg-slate-950 text-white text-[10px] font-black uppercase tracking-tighter rounded-full">
                                Active
                            </div>
                        )}

                        <div
                            className="w-24 h-24 rounded-3xl flex items-center justify-center font-bold text-2xl text-white shadow-lg mb-6 transform transition-transform group-hover:rotate-6 duration-500"
                            style={{ backgroundColor: brand.themeColor }}
                        >
                            {brand.logo}
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2">{brand.name}</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                            {brand.platform === 'instagram' ? <Instagram size={14} className="text-pink-600" /> : <Youtube size={14} className="text-red-600" />}
                            {brand.category}
                        </p>

                        <div className="grid grid-cols-2 w-full gap-4 mt-4 mb-8">
                            <div className="bg-slate-50 p-4 rounded-2xl">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Followers</p>
                                <p className="text-sm font-black text-slate-800">{(brand.followers || 0).toLocaleString()}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Market</p>
                                <p className="text-sm font-black text-slate-800">Global</p>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full">
                            <button
                                onClick={() => setActiveBrand(brand)}
                                className={cn(
                                    "flex-1 py-3 rounded-xl font-bold text-sm transition-all",
                                    activeBrand?.id === brand.id
                                        ? "bg-slate-900 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                )}
                            >
                                {activeBrand?.id === brand.id ? 'ActiveNow' : 'Select'}
                            </button>
                            <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                                <Edit3 size={18} />
                            </button>
                            <button
                                onClick={() => deleteBrand(brand.id)}
                                className="p-3 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        
                        <div
                            className="absolute -bottom-12 -right-12 w-32 h-32 blur-3xl rounded-full opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
                            style={{ backgroundColor: brand.themeColor }}
                        />
                    </div>
                ))}

                
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group hover:border-brand-primary hover:bg-brand-primary/[0.02] transition-all min-h-[400px]"
                >
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-300 shadow-sm group-hover:scale-110 group-hover:text-brand-primary group-hover:shadow-lg transition-all mb-6">
                        <Plus size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Add New Brand</h3>
                    <p className="text-sm text-slate-400 mt-2 max-w-[200px]">Expand your portfolio and manage more content.</p>
                </button>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden group">
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/5">
                        <Target size={14} className="text-brand-primary" />
                        <span>Growth Strategy</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1]">Organize your agency workflow with ease.</h2>
                    <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">Switch between brands instantly. The entire dashboard adapts to your brand's theme, colors, and specific audience data.</p>
                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => setIsFeaturesModalOpen(true)}
                            className="px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all">
                            Explore All Features
                        </button>
                        <button 
                            onClick={() => setIsDocumentationModalOpen(true)}
                            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2">
                            Documentation <ExternalLink size={18} />
                        </button>
                    </div>
                </div>

                
                <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
                        {[brandData[0], brandData[1], brandData[2]].map((b, i) => (
                            <div
                                key={i}
                                className="absolute bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl animate-in fade-in"
                                style={{
                                    top: `${i * 20}%`,
                                    left: `${i * 15}%`,
                                    zIndex: 10 - i,
                                    transform: `rotate(${i * 5 - 5}deg)`
                                }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style={{ backgroundColor: b.themeColor }}>{b.logo}</div>
                                    <div className="h-2 w-20 bg-white/20 rounded-full"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-1.5 w-full bg-white/10 rounded-full"></div>
                                    <div className="h-1.5 w-2/3 bg-white/10 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full mr-20 mb-20"></div>
            </div>

            <CreateBrandModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={addBrand}
            />

            <FeaturesModal
                isOpen={isFeaturesModalOpen}
                onClose={() => setIsFeaturesModalOpen(false)}
            />

            <DocumentationModal
                isOpen={isDocumentationModalOpen}
                onClose={() => setIsDocumentationModalOpen(false)}
            />
        </div>
    );
};


const brandData = [
    { logo: 'IG', themeColor: '#E1306C' },
    { logo: 'YT', themeColor: '#FF0000' },
    { logo: 'AG', themeColor: '#6366F1' },
];

export default BrandsPage;
