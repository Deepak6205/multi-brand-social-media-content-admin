import { createContext, useContext, useState, useEffect } from 'react';

const initialBrands = [
    {
        id: '1',
        name: 'Instagram Main',
        logo: 'IG',
        themeColor: '#E1306C',
        platform: 'instagram',
        category: 'Lifestyle',
        followers: 125000,
    },
    {
        id: '2',
        name: 'YouTube Tech',
        logo: 'YT',
        themeColor: '#FF0000',
        platform: 'youtube',
        category: 'Technology',
        followers: 850000,
    },
    {
        id: '3',
        name: 'Agency Global',
        logo: 'AG',
        themeColor: '#6366F1',
        platform: 'instagram',
        category: 'Agency',
        followers: 45000,
    },
];

const BrandContext = createContext(undefined);

export const BrandProvider = ({ children }) => {
    const [brands, setBrands] = useState(() => {
        const saved = localStorage.getItem('brands');
        return saved ? JSON.parse(saved) : initialBrands;
    });

    const [activeBrand, setActiveBrand] = useState(() => {
        const savedActive = localStorage.getItem('activeBrandId');
        if (savedActive) {
            const found = brands.find(b => b.id === savedActive);
            if (found) return found;
        }
        return brands[2] || brands[0]; // Default to Agency or first available
    });

    useEffect(() => {
        localStorage.setItem('brands', JSON.stringify(brands));
    }, [brands]);

    useEffect(() => {
        if (activeBrand) {
            localStorage.setItem('activeBrandId', activeBrand.id);
            document.documentElement.style.setProperty('--brand-primary', activeBrand.themeColor);
        }
    }, [activeBrand]);

    const addBrand = (newBrand) => {
        const brand = {
            ...newBrand,
            id: Math.random().toString(36).substr(2, 9),
            followers: 0
        };
        setBrands(prev => [brand, ...prev]);
        return brand;
    };

    const updateBrand = (id, updates) => {
        setBrands(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
        if (activeBrand?.id === id) {
            setActiveBrand(prev => ({ ...prev, ...updates }));
        }
    };

    const deleteBrand = (id) => {
        setBrands(prev => {
            const filtered = prev.filter(b => b.id !== id);
            if (activeBrand?.id === id) {
                setActiveBrand(filtered[0] || null);
            }
            return filtered;
        });
    };

    return (
        <BrandContext.Provider value={{
            activeBrand,
            setActiveBrand,
            brands,
            addBrand,
            updateBrand,
            deleteBrand
        }}>
            {children}
        </BrandContext.Provider>
    );
};

export const useBrand = () => {
    const context = useContext(BrandContext);
    if (context === undefined) {
        throw new Error('useBrand must be used within a BrandProvider');
    }
    return context;
};
