import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import CalendarPage from './pages/Calendar/Calendar';
import KanbanPage from './pages/Kanban/Kanban';
import AnalyticsPage from './pages/Analytics/Analytics';
import TeamPage from './pages/Team/Team';
import BrandsPage from './pages/Brands/Brands';
import Login from './pages/Auth/Login';
import { BrandProvider } from './store/BrandContext';
import { PostProvider } from './store/PostContext';
import { AuthProvider, useAuth } from './store/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
    return (
        <AuthProvider>
            <BrandProvider>
                <PostProvider>
                    <Router>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                                <Route index element={<Dashboard />} />
                                <Route path="calendar" element={<CalendarPage />} />
                                <Route path="kanban" element={<KanbanPage />} />
                                <Route path="analytics" element={<AnalyticsPage />} />
                                <Route path="team" element={<TeamPage />} />
                                <Route path="brands" element={<BrandsPage />} />
                                <Route path="settings" element={<div className="p-8">Settings Page (Coming Soon)</div>} />
                            </Route>
                        </Routes>
                    </Router>
                </PostProvider>
            </BrandProvider>
        </AuthProvider>
    );
}

export default App;
