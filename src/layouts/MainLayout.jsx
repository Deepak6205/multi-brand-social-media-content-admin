import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { PageTransition } from '../components/layout/PageTransition';
import { CreatePostModal } from '../components/dashboard/PostFlow';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const MainLayout = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-brand-background">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - hidden on mobile, visible on md and up */}
            <div className="hidden md:block">
                <Sidebar onPostModalOpen={() => setIsPostModalOpen(true)} />
            </div>

            {/* Mobile sidebar - fixed overlay */}
            {sidebarOpen && (
                <div className="fixed inset-y-0 left-0 w-72 z-20 md:hidden">
                    <Sidebar 
                        onClose={() => setSidebarOpen(false)}
                        onPostModalOpen={() => {
                            setIsPostModalOpen(true);
                            setSidebarOpen(false);
                        }}
                    />
                </div>
            )}

            <div className="flex-1 flex flex-col min-w-0">
                <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 sm:p-6 md:p-8">
                        <AnimatePresence mode="wait">
                            <PageTransition key={location.pathname}>
                                <Outlet />
                            </PageTransition>
                        </AnimatePresence>
                    </div>
                </main>
            </div>

            {/* Post Modal - rendered at root layout level for proper z-index stacking */}
            <CreatePostModal 
                isOpen={isPostModalOpen} 
                onClose={() => setIsPostModalOpen(false)} 
            />
        </div>
    );
};

export default MainLayout;
