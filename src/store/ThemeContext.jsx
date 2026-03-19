import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Load theme from localStorage or default to 'light'
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                return settings.preferences?.theme || 'light';
            } catch (e) {
                return 'light';
            }
        }
        return 'light';
    });

    // Apply theme to DOM
    useEffect(() => {
        const htmlElement = document.documentElement;
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = useCallback((newTheme) => {
        setTheme(newTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
