import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { PageTransition } from '../components/layout/PageTransition';
import { AnimatePresence } from 'framer-motion';

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-brand-background">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <PageTransition key={location.pathname}>
                            <Outlet />
                        </PageTransition>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
