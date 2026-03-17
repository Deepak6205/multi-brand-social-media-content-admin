import { useState } from 'react';
import { Plus, MoreHorizontal, MessageSquare, Clock, Instagram, Youtube, X, Eye, EyeOff } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { usePosts } from '../../store/PostContext';
import { useBrand } from '../../store/BrandContext';
import { CreatePostModal } from '../../components/dashboard/PostFlow';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const initialColumns = [
    { id: 'draft', title: 'Draft' },
    { id: 'pending', title: 'In Review' },
    { id: 'approved', title: 'Approved' },
    { id: 'scheduled', title: 'Scheduled' },
    { id: 'published', title: 'Published' },
];

const KanbanPage = () => {
    const { posts, updatePostStatus } = usePosts();
    const { activeBrand } = useBrand();
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isColumnsModalOpen, setIsColumnsModalOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState(new Set(initialColumns.map(c => c.id)));

    const brandPosts = posts.filter(p => !activeBrand || p.brandId === activeBrand.id);

    const moveTask = (taskId, newColumn) => {
        updatePostStatus(taskId, newColumn);
    };

    const toggleColumnVisibility = (columnId) => {
        const newVisible = new Set(visibleColumns);
        if (newVisible.has(columnId)) {
            newVisible.delete(columnId);
        } else {
            newVisible.add(columnId);
        }
        setVisibleColumns(newVisible);
    };

    const displayedColumns = initialColumns.filter(c => visibleColumns.has(c.id));

    return (
        <div className="h-full flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Workflow Board</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your content production pipeline. Drag tasks between columns.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsColumnsModalOpen(true)}
                        className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        Manage Columns
                    </button>
                    <button
                        onClick={() => setIsPostModalOpen(true)}
                        className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center gap-2"
                    >
                        <Plus size={20} />
                        <span>New Task</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-8 -mx-8 px-8">
                <div className="flex gap-6 min-h-full min-w-max">
                    {displayedColumns.map(column => (
                        <Column
                            key={column.id}
                            column={column}
                            tasks={brandPosts.filter(t => t.status === column.id)}
                            onMoveTask={moveTask}
                        />
                    ))}
                </div>
            </div>

            <CreatePostModal
                isOpen={isPostModalOpen}
                onClose={() => setIsPostModalOpen(false)}
                initialPlatform={activeBrand?.platform || 'instagram'}
                initialStatus="draft"
            />

            <ManageColumnsModal
                isOpen={isColumnsModalOpen}
                onClose={() => setIsColumnsModalOpen(false)}
                columns={initialColumns}
                visibleColumns={visibleColumns}
                onToggleVisibility={toggleColumnVisibility}
            />
        </div>
    );
};

const Column = ({ column, tasks, onMoveTask }) => {
    const [isOver, setIsOver] = useState(false);

    return (
        <div
            className="w-80 flex flex-col"
            onDragOver={(e) => {
                e.preventDefault();
                setIsOver(true);
            }}
            onDragLeave={() => setIsOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsOver(false);
                const taskId = e.dataTransfer.getData("taskId");
                onMoveTask(taskId, column.id);
            }}
        >
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-3">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{column.title}</h3>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg">{tasks.length}</span>
                </div>
                <button className="p-1 hover:bg-slate-100 rounded text-slate-400 transition-colors">
                    <Plus size={16} />
                </button>
            </div>

            <div className={cn(
                "flex-1 bg-slate-50/50 rounded-2xl p-3 space-y-4 border border-dashed transition-colors",
                isOver ? "bg-brand-primary/5 border-brand-primary shadow-inner" : "border-slate-200"
            )}>
                <AnimatePresence>
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </AnimatePresence>

                <button className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-slate-300 hover:text-slate-500 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100 group">
                    <Plus size={14} className="group-hover:scale-110 transition-transform" />
                    Add Card
                </button>
            </div>
        </div>
    );
};

const TaskCard = ({ task }) => {
    return (
        <motion.div
            layoutId={task.id}
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("taskId", task.id);
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98, cursor: 'grabbing' }}
            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-grab group active:rotate-2"
        >
            <div className="flex items-start justify-between mb-3">
                <div className={cn(
                    "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter",
                    task.status === 'scheduled' ? "bg-amber-50 text-amber-600" :
                        task.status === 'published' ? "bg-emerald-50 text-emerald-600" :
                            "bg-indigo-50 text-indigo-600"
                )}>
                    {task.status}
                </div>
                <button className="p-1 text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal size={14} />
                </button>
            </div>

            {task.mediaUrl && (
                <div className="aspect-video w-full rounded-lg overflow-hidden mb-3 bg-slate-50 border border-slate-100">
                    <img src={task.mediaUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
            )}

            <h4 className="text-sm font-bold text-slate-800 leading-snug mb-4 line-clamp-2">{task.caption}</h4>

            <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                    {[1].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500">
                            U{i}
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        <span className="text-[10px] font-bold">{task.metrics.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold">Today</span>
                    </div>
                    <div className="px-1.5 py-1 bg-slate-50 rounded-lg">
                        {task.platform === 'instagram' ? <Instagram size={10} /> : <Youtube size={10} />}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ManageColumnsModal = ({ isOpen, onClose, columns, visibleColumns, onToggleVisibility }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative z-10 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Manage Columns</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                <div className="space-y-3">
                    {columns.map(column => (
                        <button
                            key={column.id}
                            onClick={() => onToggleVisibility(column.id)}
                            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all border border-slate-200 hover:border-slate-300"
                        >
                            <div className="text-left">
                                <p className="font-bold text-slate-900">{column.title}</p>
                                <p className="text-xs text-slate-400 mt-1 capitalize">{column.id}</p>
                            </div>
                            {visibleColumns.has(column.id) ? (
                                <Eye size={18} className="text-emerald-600" />
                            ) : (
                                <EyeOff size={18} className="text-slate-400" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-8 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KanbanPage;
