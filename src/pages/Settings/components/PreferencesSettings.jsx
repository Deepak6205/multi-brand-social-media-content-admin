import React from 'react';
import { Save, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const PreferencesSettings = ({ preferences, onPreferenceChange, savePreferences }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">App Preferences</h2>

            {/* Theme */}
            <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">Theme</label>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { value: 'light', label: 'Light', icon: Sun },
                        { value: 'dark', label: 'Dark', icon: Moon }
                    ].map(theme => {
                        const Icon = theme.icon;
                        return (
                            <motion.button
                                key={theme.value}
                                type="button"
                                onClick={() => onPreferenceChange('theme', theme.value)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center flex-col gap-2 font-bold cursor-pointer ${
                                    preferences.theme === theme.value
                                        ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/20'
                                        : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
                                }`}
                            >
                                <Icon size={24} />
                                {theme.label}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Language */}
            <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">Language</label>
                <select
                    value={preferences.language}
                    onChange={(e) => onPreferenceChange('language', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900 dark:text-slate-100"
                >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                </select>
            </div>

            {/* Timezone */}
            <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">Timezone</label>
                <select
                    value={preferences.timezone}
                    onChange={(e) => onPreferenceChange('timezone', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900 dark:text-slate-100"
                >
                    <option>UTC</option>
                    <option>EST</option>
                    <option>CST</option>
                    <option>MST</option>
                    <option>PST</option>
                    <option>IST</option>
                </select>
            </div>

            {/* Email Digest Frequency */}
            <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">Email Digest Frequency</label>
                <select
                    value={preferences.emailDigest}
                    onChange={(e) => onPreferenceChange('emailDigest', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900 dark:text-slate-100"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="never">Never</option>
                </select>
            </div>

            <button
                onClick={savePreferences}
                className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
            >
                <Save size={20} />
                Save Changes
            </button>
        </div>
    );
};

export default PreferencesSettings;
