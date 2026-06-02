import React from 'react';
import { Save } from 'lucide-react';

const PrivacySettings = ({ privacy, onPrivacyChange, saveSettings }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Privacy Settings</h2>

        <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">Profile Visibility</label>
                <div className="space-y-2">
                    {[
                        { value: 'private', label: 'Private', desc: 'Only you can see your profile' },
                        { value: 'team', label: 'Team Members', desc: 'visible to your team only' },
                        { value: 'public', label: 'Public', desc: 'Anyone can see your profile' }
                    ].map((option) => (
                        <label key={option.value} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                            <input
                                type="radio"
                                name="visibility"
                                value={option.value}
                                checked={privacy.profileVisibility === option.value}
                                onChange={() => onPrivacyChange('profileVisibility', option.value)}
                                className="w-5 h-5 text-brand-primary cursor-pointer"
                            />
                            <div>
                                <p className="font-medium text-slate-900">{option.label}</p>
                                <p className="text-xs text-slate-500">{option.desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                        <p className="font-bold text-slate-900">Data Collection</p>
                        <p className="text-sm text-slate-500 font-medium">Allow anonymous usage analytics</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={privacy.dataCollection}
                            onChange={() => onPrivacyChange('dataCollection', !privacy.dataCollection)}
                            className="w-6 h-6 rounded-lg border-2 border-slate-200 text-brand-primary focus:ring-brand-primary cursor-pointer"
                        />
                    </label>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                        <p className="font-bold text-slate-900">Third-party Sharing</p>
                        <p className="text-sm text-slate-500 font-medium">Share data with trusted partners</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={privacy.thirdPartySharing}
                            onChange={() => onPrivacyChange('thirdPartySharing', !privacy.thirdPartySharing)}
                            className="w-6 h-6 rounded-lg border-2 border-slate-200 text-brand-primary focus:ring-brand-primary cursor-pointer"
                        />
                    </label>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                        <p className="font-bold text-slate-900">Activity Log</p>
                        <p className="text-sm text-slate-500 font-medium">Keep track of account activities</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={privacy.activityLog}
                            onChange={() => onPrivacyChange('activityLog', !privacy.activityLog)}
                            className="w-6 h-6 rounded-lg border-2 border-slate-200 text-brand-primary focus:ring-brand-primary cursor-pointer"
                        />
                    </label>
                </div>
            </div>
        </div>

        <button
            onClick={saveSettings}
            className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
        >
            <Save size={20} />
            Save Changes
        </button>
    </div>
);

export default PrivacySettings;
