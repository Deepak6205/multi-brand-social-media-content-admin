import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
    const getStrength = () => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        return strength;
    };

    const strength = getStrength();
    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500'];

    return (
        <div className="space-y-2">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-all ${
                            i < strength ? colors[strength - 1] : 'bg-slate-200 dark:bg-slate-600'
                        }`}
                    />
                ))}
            </div>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {password ? labels[strength - 1] || 'Weak' : 'Enter a password'}
            </p>
        </div>
    );
};

export default PasswordStrengthIndicator;
