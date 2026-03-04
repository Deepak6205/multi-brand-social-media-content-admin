import { useState, useRef } from 'react';
import { X, Image as ImageIcon, Send, Sparkles, Clock, AlertCircle, CheckCircle2, Upload, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePosts } from '../../store/PostContext';
import { useBrand } from '../../store/BrandContext';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const CreatePostModal = ({ isOpen, onClose }) => {
    const [caption, setCaption] = useState('');
    const [platform, setPlatform] = useState('instagram');
    const [generating, setGenerating] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const { addPost } = usePosts();
    const { activeBrand } = useBrand();

    if (!isOpen) return null;

    const handleGenerateAI = () => {
        setGenerating(true);
        setTimeout(() => {
            setCaption("✨ Unlock your brand's true potential with our new Multi-Brand Dashboard! 🚀 Manage everything in one place. #SocialMedia #Marketing #Innovation");
            setGenerating(false);
        }, 1500);
    };

    const handleSubmitReview = () => {
        if (!activeBrand) return;

        addPost({
            brandId: activeBrand.id,
            caption,
            mediaUrl: selectedImage || '',
            status: 'pending',
            scheduledDate: new Date().toISOString(),
            platform: platform
        });

        
        setCaption('');
        setSelectedImage(null);
        onClose();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (e) => {
        e.stopPropagation();
        setSelectedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>

            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative z-10 flex flex-col md:flex-row h-[95vh]">
                <div className="flex-1 p-8 overflow-y-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Create New Post</h2>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                            <X size={20} className="text-slate-400" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Social Platform</label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setPlatform('instagram')}
                                    className={cn(
                                        "flex-1 p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 font-bold",
                                        platform === 'instagram' ? "border-brand-primary bg-brand-primary/5 text-brand-primary" : "border-slate-100 text-slate-400 hover:border-slate-200"
                                    )}
                                >
                                    <ImageIcon size={20} />
                                    Instagram
                                </button>
                                <button
                                    onClick={() => setPlatform('youtube')}
                                    className={cn(
                                        "flex-1 p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 font-bold",
                                        platform === 'youtube' ? "border-red-500 bg-red-50 text-red-500" : "border-slate-100 text-slate-400 hover:border-slate-200"
                                    )}
                                >
                                    <ImageIcon size={20} />
                                    YouTube
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Caption</label>
                                <button
                                    onClick={handleGenerateAI}
                                    disabled={generating}
                                    className="flex items-center gap-2 text-xs font-bold text-brand-primary hover:bg-brand-primary/5 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                                >
                                    <Sparkles size={14} className={generating ? "animate-pulse" : ""} />
                                    {generating ? "Generating..." : "AI Suggestions"}
                                </button>
                            </div>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Write something engaging..."
                                className="w-full h-40 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-primary/20 outline-none resize-none font-medium text-slate-700 placeholder:text-slate-300 transition-all"
                            ></textarea>
                        </div>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="p-10 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center group hover:border-brand-primary hover:bg-brand-primary/[0.02] transition-all cursor-pointer relative overflow-hidden h-48"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                            />

                            {selectedImage ? (
                                <div className="absolute inset-0 group/img">
                                    <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button onClick={() => fileInputRef.current?.click()} className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-all">
                                            <Upload size={20} />
                                        </button>
                                        <button onClick={removeImage} className="p-3 bg-rose-500/80 backdrop-blur-md rounded-2xl text-white hover:bg-rose-600 transition-all">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all transform group-hover:scale-110 mb-4">
                                        <Upload size={28} />
                                    </div>
                                    <p className="text-base font-bold text-slate-700">Drop your file here or browse</p>
                                    <p className="text-sm text-slate-400 mt-2">Supports high-res PNG, JPG, WebP</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-80 bg-slate-50 p-8 border-l border-slate-100 flex flex-col">
                    <div className="flex-1 space-y-6">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">Mobile Preview</h3>
                        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[9/16] border-[6px] border-slate-900 relative group max-w-[240px] mx-auto ring-4 ring-slate-200/50">
                            <div className="p-3 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
                                    <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
                                </div>

                                <div className="aspect-square bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 overflow-hidden relative">
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon size={32} className="opacity-30" />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <div className="w-4 h-4 bg-slate-100 rounded-full"></div>
                                        <div className="w-4 h-4 bg-slate-100 rounded-full"></div>
                                        <div className="w-4 h-4 bg-slate-100 rounded-full"></div>
                                    </div>
                                    <p className="text-[9px] text-slate-600 font-medium leading-relaxed line-clamp-4">
                                        <span className="font-bold mr-1">yourbrand</span>
                                        {caption || "Your engaging caption will appear here..."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-500">
                                <Clock size={16} />
                                <span className="text-xs font-bold">Scheduled: Today, 2:00 PM</span>
                            </div>
                            <div className="flex items-center gap-3 text-amber-600 bg-amber-50 p-3 rounded-2xl border border-amber-100">
                                <AlertCircle size={16} className="shrink-0" />
                                <span className="text-[10px] font-bold leading-tight">Requires Brand Manager review before publishing.</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 space-y-4">
                        <button
                            onClick={handleSubmitReview}
                            disabled={!selectedImage && !caption}
                            className="w-full py-3 bg-brand-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-primary/30 transition-all disabled:opacity-50 disabled:shadow-none"
                        >
                            <Send size={18} />
                            Submit Review
                        </button>
                        <button className="w-full py-4 bg-white text-slate-500 rounded-2xl font-bold border border-slate-200 hover:bg-slate-100 transition-all text-sm">
                            Save Draft
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ApprovalLog = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest px-2">Approval Log</h3>
        <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
            {[
                { user: 'Sarah Creator', action: 'Submitted draft', time: '2h ago', status: 'pending' },
                { user: 'John Manager', action: 'Requested changes: "Add more hashtags"', time: '1h ago', status: 'rejected' },
                { user: 'Sarah Creator', action: 'Updated draft', time: '30m ago', status: 'pending' },
                { user: 'John Manager', action: 'Approved for scheduling', time: '5m ago', status: 'approved' },
            ].map((item, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center border-4 border-white shrink-0",
                        item.status === 'approved' ? "bg-emerald-500 text-white" :
                            item.status === 'rejected' ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-400"
                    )}>
                        {item.status === 'approved' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                    </div>
                    <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-bold text-slate-800">{item.user}</p>
                            <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">{item.action}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
