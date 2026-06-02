import React, { useRef } from 'react';
import { Save, Upload } from 'lucide-react';

const ProfileSettings = ({ profile, onProfileChange, onAvatarUpload, saveSettings }) => {
    const fileInputRef = useRef(null);
    const initials = profile.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            onAvatarUpload(file);
        }
        event.target.value = '';
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Profile Settings</h2>

                <div className="mb-8 pb-8 border-b border-slate-100">
                    <label className="block text-sm font-bold text-slate-900 mb-4">Profile Picture</label>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-linear-to-br from-brand-primary to-brand-primary/70 flex items-center justify-center font-bold text-white text-2xl shadow-lg">
                            {profile.imageUrl ? (
                                <img src={profile.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                initials
                            )}
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-6 py-3 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center gap-2 border border-slate-200"
                            >
                                <Upload size={18} />
                                Upload Image
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-900 mb-2">Full Name</label>
                    <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => onProfileChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                    <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => onProfileChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-900 mb-2">Job Title</label>
                    <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => onProfileChange('title', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-900 mb-2">Bio</label>
                    <textarea
                        value={profile.bio}
                        onChange={(e) => onProfileChange('bio', e.target.value)}
                        rows="4"
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900 resize-none"
                    />
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
};

export default ProfileSettings;
