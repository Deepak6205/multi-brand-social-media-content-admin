import { createContext, useContext, useState } from 'react';

const mockPosts = [
    {
        id: '1',
        brandId: '3',
        caption: 'Building the future of social media management 🚀',
        mediaUrl: '',
        status: 'published',
        scheduledDate: '2026-03-01T10:00:00Z',
        platform: 'instagram',
        metrics: { likes: 120, comments: 15, shares: 8 }
    },
    {
        id: '2',
        brandId: '3',
        caption: 'Our new Kanban workflow is live! 📋',
        mediaUrl: '',
        status: 'scheduled',
        scheduledDate: '2026-03-05T14:00:00Z',
        platform: 'instagram',
        metrics: { likes: 0, comments: 0, shares: 0 }
    },
    {
        id: '3',
        brandId: '3',
        caption: 'Deep dive into tech trends for 2026 💻',
        mediaUrl: '',
        status: 'pending',
        scheduledDate: '2026-03-07T09:00:00Z',
        platform: 'youtube',
        metrics: { likes: 0, comments: 0, shares: 0 }
    }
];

const PostContext = createContext(undefined);

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(mockPosts);

    const addPost = (newPost) => {
        const post = {
            ...newPost,
            id: Math.random().toString(36).slice(2, 9),
            metrics: { likes: 0, comments: 0, shares: 0 }
        };
        setPosts(prev => [post, ...prev]);
    };

    const updatePostStatus = (postId, status) => {
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, status } : p));
    };

    const deletePost = (postId) => {
        setPosts(prev => prev.filter(p => p.id !== postId));
    };

    return (
        <PostContext.Provider value={{ posts, addPost, updatePostStatus, deletePost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
};
