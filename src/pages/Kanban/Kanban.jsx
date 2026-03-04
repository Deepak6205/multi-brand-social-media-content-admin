import { useState } from 'react';
import { Plus, MoreHorizontal, MessageSquare, Clock, Instagram, Youtube } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { usePosts } from '../../store/PostContext';
import { useBrand } from '../../store/BrandContext';

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

    const brandPosts = posts.filter(p => !activeBrand || p.brandId === activeBrand.id);

    const moveTask = (taskId, newColumn) => {
        updatePostStatus(taskId, newColumn);
    };

    return (
        <div className="h-full flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Workflow Board</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your content production pipeline. Drag tasks between columns.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        Manage Columns
                    </button>
                    <button className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center gap-2">
                        <Plus size={20} />
                        <span>New Task</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-8 -mx-8 px-8">
                <div className="flex gap-6 min-h-full min-w-max">
                    {initialColumns.map(column => (
                        <Column
                            key={column.id}
                            column={column}
                            tasks={brandPosts.filter(t => t.status === column.id)}
                            onMoveTask={moveTask}
                        />
                    ))}
                </div>
            </div>
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

export default KanbanPage;
