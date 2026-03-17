import React, { useState } from 'react';
import { Bell, Lock, Eye, Globe, Mail, Shield, ChevronRight, Save, Upload, Moon, Sun, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessNotification = ({ show, message }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg z-50"
                >
                    <Check size={20} />
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const SettingTab = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium ${
            isActive
                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                : 'text-slate-600 hover:bg-slate-50'
        }`}
    >
        <Icon size={20} />
        <span>{label}</span>
        {isActive && <ChevronRight size={18} className="ml-auto" />}
    </button>
);

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Profile Settings State
    const [profile, setProfile] = useState({
        name: 'Deepak Kumar',
        email: 'deepak@agency.com',
        title: 'Marketing Manager',
        bio: 'Social media and content strategy expert',
        avatar: 'DK'
    });

    // Notification Settings State
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: true,
        digestEmail: true,
        weeklyReport: true,
        campaignAlerts: true,
        teamInvites: true
    });

    // Privacy Settings State
    const [privacy, setPrivacy] = useState({
        profileVisibility: 'team',
        dataCollection: false,
        thirdPartySharing: false,
        activityLog: true
    });

    // Preferences State
    const [preferences, setPreferences] = useState({
        theme: 'light',
        language: 'English',
        timezone: 'UTC'
    });

    // Security State
    const [security, setSecurityState] = useState({
        showPasswordForm: false,
        twoFactorEnabled: false,
        newPassword: '',
        confirmPassword: ''
    });

    const handleProfileChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleNotificationChange = (field) => {
        setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handlePrivacyChange = (field, value) => {
        setPrivacy(prev => ({ ...prev, [field]: value }));
    };

    const handlePreferenceChange = (field, value) => {
        setPreferences(prev => ({ ...prev, [field]: value }));
    };

    const handleSecurityChange = (field, value) => {
        setSecurityState(prev => ({ ...prev, [field]: value }));
    };

    const saveSettings = () => {
        setSuccessMessage('Settings saved successfully!');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const enableTwoFactor = () => {
        setSecurityState(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
        setSuccessMessage(security.twoFactorEnabled ? 'Two-factor authentication disabled' : 'Two-factor authentication enabled');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SuccessNotification show={showSuccess} message={successMessage} />

            <div>
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 font-medium mt-1">Manage your account and application preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1 space-y-2">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-2">
                        <SettingTab icon={Shield} label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                        <SettingTab icon={Bell} label="Notifications" isActive={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
                        <SettingTab icon={Eye} label="Privacy" isActive={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} />
                        <SettingTab icon={Globe} label="Preferences" isActive={activeTab === 'preferences'} onClick={() => setActiveTab('preferences')} />
                        <SettingTab icon={Lock} label="Security" isActive={activeTab === 'security'} onClick={() => setActiveTab('security')} />
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-3">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-8"
                    >
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Profile Settings</h2>

                                    {/* Avatar Section */}
                                    <div className="mb-8 pb-8 border-b border-slate-100">
                                        <label className="block text-sm font-bold text-slate-900 mb-4">Profile Picture</label>
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/70 flex items-center justify-center font-bold text-white text-2xl shadow-lg">
                                                {profile.avatar}
                                            </div>
                                            <button className="px-6 py-3 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center gap-2 border border-slate-200">
                                                <Upload size={18} />
                                                Upload Image
                                            </button>
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-slate-900 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) => handleProfileChange('name', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => handleProfileChange('email', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                                        />
                                    </div>

                                    {/* Title */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-slate-900 mb-2">Job Title</label>
                                        <input
                                            type="text"
                                            value={profile.title}
                                            onChange={(e) => handleProfileChange('title', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                                        />
                                    </div>

                                    {/* Bio */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-bold text-slate-900 mb-2">Bio</label>
                                        <textarea
                                            value={profile.bio}
                                            onChange={(e) => handleProfileChange('bio', e.target.value)}
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
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">Notification Settings</h2>

                                <div className="space-y-4">
                                    {[
                                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your accounts' },
                                        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get real-time push notifications' },
                                        { key: 'digestEmail', label: 'Weekly Digest', desc: 'Summary of your account activity' },
                                        { key: 'weeklyReport', label: 'Weekly Report', desc: 'Detailed analytics report every week' },
                                        { key: 'campaignAlerts', label: 'Campaign Alerts', desc: 'Notifications for campaign milestones' },
                                        { key: 'teamInvites', label: 'Team Invites', desc: 'Notifications when added to teams' }
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                            <div>
                                                <p className="font-bold text-slate-900">{item.label}</p>
                                                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                                            </div>
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications[item.key]}
                                                    onChange={() => handleNotificationChange(item.key)}
                                                    className="w-6 h-6 rounded-lg border-2 border-slate-200 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={saveSettings}
                                    className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    Save Changes
                                </button>
                            </div>
                        )}

                        {/* Privacy Tab */}
                        {activeTab === 'privacy' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">Privacy Settings</h2>

                                <div className="space-y-6">
                                    {/* Profile Visibility */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-3">Profile Visibility</label>
                                        <div className="space-y-2">
                                            {[
                                                { value: 'private', label: 'Private', desc: 'Only you can see your profile' },
                                                { value: 'team', label: 'Team Members', desc: 'visible to your team only' },
                                                { value: 'public', label: 'Public', desc: 'Anyone can see your profile' }
                                            ].map(option => (
                                                <label key={option.value} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                                                    <input
                                                        type="radio"
                                                        name="visibility"
                                                        value={option.value}
                                                        checked={privacy.profileVisibility === option.value}
                                                        onChange={() => handlePrivacyChange('profileVisibility', option.value)}
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

                                    {/* Data Collection */}
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
                                                    onChange={() => handlePrivacyChange('dataCollection', !privacy.dataCollection)}
                                                    className="w-6 h-6 rounded-lg border-2 border-slate-200 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Third Party Sharing */}
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
                                                    onChange={() => handlePrivacyChange('thirdPartySharing', !privacy.thirdPartySharing)}
                                                    className="w-6 h-6 rounded-lg border-2 border-slate-200 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Activity Log */}
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
                                                    onChange={() => handlePrivacyChange('activityLog', !privacy.activityLog)}
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
                        )}

                        {/* Preferences Tab */}
                        {activeTab === 'preferences' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">App Preferences</h2>

                                {/* Theme */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 mb-3">Theme</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: 'light', label: 'Light', icon: Sun },
                                            { value: 'dark', label: 'Dark', icon: Moon }
                                        ].map(theme => {
                                            const Icon = theme.icon;
                                            return (
                                                <button
                                                    key={theme.value}
                                                    onClick={() => handlePreferenceChange('theme', theme.value)}
                                                    className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center flex-col gap-2 font-bold ${
                                                        preferences.theme === theme.value
                                                            ? 'border-brand-primary bg-brand-primary/5'
                                                            : 'border-slate-100 hover:border-slate-200'
                                                    }`}
                                                >
                                                    <Icon size={24} />
                                                    {theme.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Language */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 mb-2">Language</label>
                                    <select
                                        value={preferences.language}
                                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
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
                                    <label className="block text-sm font-bold text-slate-900 mb-2">Timezone</label>
                                    <select
                                        value={preferences.timezone}
                                        onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                                    >
                                        <option>UTC</option>
                                        <option>EST</option>
                                        <option>CST</option>
                                        <option>MST</option>
                                        <option>PST</option>
                                        <option>IST</option>
                                    </select>
                                </div>

                                <button
                                    onClick={saveSettings}
                                    className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    Save Changes
                                </button>
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">Security Settings</h2>

                                {/* Change Password */}
                                <div className="pb-8 border-b border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Change Password</h3>
                                    <button
                                        onClick={() => handleSecurityChange('showPasswordForm', !security.showPasswordForm)}
                                        className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                                    >
                                        {security.showPasswordForm ? 'Cancel' : 'Update Password'}
                                    </button>
                                    {security.showPasswordForm && (
                                        <div className="mt-4 space-y-4">
                                            <input
                                                type="password"
                                                placeholder="Current Password"
                                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                                            />
                                            <input
                                                type="password"
                                                placeholder="New Password"
                                                value={security.newPassword}
                                                onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                                            />
                                            <input
                                                type="password"
                                                placeholder="Confirm Password"
                                                value={security.confirmPassword}
                                                onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                                            />
                                            <button className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all">
                                                Update Password
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Two Factor Authentication */}
                                <div>
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                        <div>
                                            <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                                            <p className="text-sm text-slate-500 font-medium">Add an extra layer of security</p>
                                        </div>
                                        <button
                                            onClick={enableTwoFactor}
                                            className={`px-6 py-2 rounded-lg font-bold transition-all ${
                                                security.twoFactorEnabled
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                            }`}
                                        >
                                            {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                        </button>
                                    </div>
                                </div>

                                {/* Active Sessions */}
                                <div className="border-t border-slate-100 pt-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Active Sessions</h3>
                                    <div className="space-y-3">
                                        {[
                                            { device: 'Chrome on Windows', date: 'Current Session', ip: '192.168.1.1' },
                                            { device: 'Safari on MacOS', date: 'Today at 10:45 AM', ip: '192.168.1.2' },
                                            { device: 'Mobile App', date: 'Yesterday at 02:30 PM', ip: '192.168.1.3' }
                                        ].map((session, i) => (
                                            <div key={i} className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                                                <div>
                                                    <p className="font-bold text-slate-900">{session.device}</p>
                                                    <p className="text-sm text-slate-500">{session.date} • {session.ip}</p>
                                                </div>
                                                {i === 0 ? (
                                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">Current</span>
                                                ) : (
                                                    <button className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg transition-colors">
                                                        Sign Out
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Settings;