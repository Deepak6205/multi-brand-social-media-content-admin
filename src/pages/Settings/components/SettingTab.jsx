import React from 'react';
import { ChevronRight } from 'lucide-react';

const SettingTab = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium ${
            isActive
                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
        }`}
    >
        <Icon size={20} />
        <span>{label}</span>
        {isActive && <ChevronRight size={18} className="ml-auto" />}
    </button>
);

export default SettingTab;
