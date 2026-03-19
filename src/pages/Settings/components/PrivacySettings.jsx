import React from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacySettings = ({ privacy, onPrivacyChange, savePrivacy }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Privacy Settings</h2>

            <div className="space-y-6">
                {/* Profile Visibility */}
                <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">Profile Visibility</label>
                    <div className="space-y-2">
                        {[
                            { value: 'private', label: 'Private', desc: 'Only you can see your profile' },
                            { value: 'team', label: 'Team Members', desc: 'visible to your team only' },
                            { value: 'public', label: 'Public', desc: 'Anyone can see your profile' }
                        ].map(option => (
                            <motion.label
                                key={option.value}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl cursor-pointer transition-colors"
                            >
                                <input
                                    type="radio"
                                    name="visibility"
                                    value={option.value}
                                    checked={privacy.profileVisibility === option.value}
                                    onChange={() => onPrivacyChange('profileVisibility', option.value)}
                                    className="w-5 h-5 text-brand-primary cursor-pointer"
                                />
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">{option.label}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{option.desc}</p>
                                </div>
                            </motion.label>
                        ))}
                    </div>
                </div>

                {/* Data Collection */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100">Data Collection</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Allow anonymous usage analytics</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={privacy.dataCollection}
                                onChange={() => onPrivacyChange('dataCollection', !privacy.dataCollection)}
                                className="w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-600 text-brand-primary focus:ring-brand-primary cursor-pointer"
                            />
                        </label>
                    </div>
                </div>

                {/* Third Party Sharing */}
                <div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100">Third-party Sharing</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Share data with trusted partners</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={privacy.thirdPartySharing}
                                onChange={() => onPrivacyChange('thirdPartySharing', !privacy.thirdPartySharing)}
                                className="w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-600 text-brand-primary focus:ring-brand-primary cursor-pointer"
                            />
                        </label>
                    </div>
                </div>

                {/* Activity Log */}
                <div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100">Activity Log</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Keep track of account activities</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={privacy.activityLog}
                                onChange={() => onPrivacyChange('activityLog', !privacy.activityLog)}
                                className="w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-600 text-brand-primary focus:ring-brand-primary cursor-pointer"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <button
                onClick={savePrivacy}
                className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
            >
                <Save size={20} />
                Save Changes
            </button>
        </div>
    );
};

export default PrivacySettings;
