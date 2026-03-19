import React from 'react';
import { Save, Upload } from 'lucide-react';

const ProfileSettings = ({ profile, errors, onProfileChange, onAvatarUpload, saveProfileSettings }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>

            {/* Avatar Section */}
            <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-4">Profile Picture</label>
                <div className="flex items-center gap-6">
                    {profile.avatarImage ? (
                        <img
                            src={profile.avatarImage}
                            alt="Avatar"
                            className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/70 flex items-center justify-center font-bold text-white text-2xl shadow-lg">
                            {profile.avatar}
                        </div>
                    )}
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onAvatarUpload}
                            className="hidden"
                        />
                        <span className="px-6 py-3 bg-gray-100 dark:bg-neutral-900 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all flex items-center gap-2 border border-gray-200 dark:border-gray-700 inline-flex">
                            <Upload size={18} />
                            Upload Image
                        </span>
                    </label>
                </div>
            </div>

            {/* Name */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Full Name *</label>
                <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => onProfileChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border-2 rounded-xl focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-gray-900 dark:text-white transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-brand-primary'
                    }`}
                />
                {errors.name && <p className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Email Address *</label>
                <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => onProfileChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border-2 rounded-xl focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-gray-900 dark:text-white transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-brand-primary'
                    }`}
                />
                {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Phone Number</label>
                <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => onProfileChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-gray-900 dark:text-white"
                />
            </div>

            {/* Title */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Job Title *</label>
                <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => onProfileChange('title', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border-2 rounded-xl focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-gray-900 dark:text-white transition-colors ${
                        errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-brand-primary'
                    }`}
                />
                {errors.title && <p className="text-red-500 text-xs font-bold mt-1">{errors.title}</p>}
            </div>

            {/* Company */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Company</label>
                <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => onProfileChange('company', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-gray-900 dark:text-white"
                />
            </div>

            {/* Bio */}
            <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Bio</label>
                <textarea
                    value={profile.bio}
                    onChange={(e) => onProfileChange('bio', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-gray-900 dark:text-white resize-none"
                />
            </div>

            <button
                onClick={saveProfileSettings}
                className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
            >
                <Save size={20} />
                Save Changes
            </button>
        </div>
    );
};

export default ProfileSettings;
