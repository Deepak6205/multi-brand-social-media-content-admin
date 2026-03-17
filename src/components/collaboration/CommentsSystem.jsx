import { useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const mockComments = [
    { id: '1', user: 'Sarah Creator', avatar: 'SC', message: 'I updated the first image, what do you think?', time: '2h ago', role: 'creator' },
    { id: '2', user: 'John Manager', avatar: 'JM', message: '@Sarah looks much better! Can we also tweak the caption to be more professional?', time: '1h ago', role: 'manager' },
    { id: '3', user: 'Sarah Creator', avatar: 'SC', message: 'Done! AI suggested a great alternative.', time: '30m ago', role: 'creator' },
];

const currentUser = {
    name: 'Deepak Kumar',
    avatar: 'DK',
    role: 'manager'
};

const getTimeAgo = () => {
    return 'now';
};

export const CommentsSystem = () => {
    const [comments, setComments] = useState(mockComments);
    const [messageInput, setMessageInput] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;

        const newComment = {
            id: Date.now().toString(),
            user: currentUser.name,
            avatar: currentUser.avatar,
            message: messageInput,
            time: 'now',
            role: currentUser.role
        };

        setIsSending(true);
        
        // Simulate sending delay
        setTimeout(() => {
            setComments([...comments, newComment]);
            setMessageInput('');
            setIsSending(false);
        }, 300);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSendMessage();
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[600px] overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Team Comments</h3>
                {comments.length > 0 && (
                    <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded-lg uppercase">{comments.length} Message{comments.length !== 1 ? 's' : ''}</span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {comments.map((comment) => (
                    <div key={comment.id} className={cn(
                        "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                        comment.role === 'manager' ? "flex-row-reverse text-right" : ""
                    )}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-600 shrink-0 shadow-sm">
                            {comment.avatar}
                        </div>
                        <div className="space-y-1 max-w-[80%]">
                            <div className={cn("flex items-center gap-2", comment.role === 'manager' ? "flex-row-reverse" : "")}>
                                <span className="text-xs font-bold text-slate-800">{comment.user}</span>
                                <span className="text-[10px] font-bold text-slate-300 uppercase">{comment.time}</span>
                            </div>
                            <div className={cn(
                                "p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                                comment.role === 'manager' ? "bg-brand-primary text-white rounded-tr-none" : "bg-slate-50 text-slate-600 rounded-tl-none"
                            )}>
                                {comment.message}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
                <div className="relative group">
                    <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message, use @ to mention... (Ctrl+Enter to send)"
                        disabled={isSending}
                        className="w-full pl-4 pr-12 py-4 bg-white border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 rounded-2xl outline-none transition-all resize-none text-sm font-medium shadow-sm hover:shadow-md h-24 disabled:opacity-50"
                    ></textarea>
                    <div className="absolute right-3 bottom-3 flex items-center gap-2">
                        <button 
                            disabled={isSending}
                            className="p-2 text-slate-400 hover:text-brand-primary transition-colors disabled:opacity-50"
                        >
                            <Smile size={20} />
                        </button>
                        <button 
                            disabled={isSending}
                            className="p-2 text-slate-400 hover:text-brand-primary transition-colors disabled:opacity-50"
                        >
                            <Paperclip size={20} />
                        </button>
                        <button 
                            onClick={handleSendMessage}
                            disabled={!messageInput.trim() || isSending}
                            className="p-2 bg-brand-primary text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Press Ctrl+Enter to send</p>
            </div>
        </div>
    );
};
