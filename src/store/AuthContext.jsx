import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const STATIC_EMAIL = 'admin@example.com';
const STATIC_PASSWORD = 'password123';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAuth = sessionStorage.getItem('isLoggedIn');
        const storedUser = sessionStorage.getItem('userEmail');
        if (storedAuth === 'true' && storedUser) {
            setIsAuthenticated(true);
            setUser({ email: storedUser });
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
            setIsAuthenticated(true);
            setUser({ email });
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userEmail', email);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userEmail');
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
