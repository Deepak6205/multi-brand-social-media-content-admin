import React, { useState, useEffect } from 'react';
import { Bell, Eye, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import SettingTab from '../../components/Settings/SettingTab';
import SuccessNotification from '../../components/Settings/SuccessNotification';
import ProfileSettings from '../../components/Settings/ProfileSettings';
import NotificationSettings from '../../components/Settings/NotificationSettings';
import PrivacySettings from '../../components/Settings/PrivacySettings';

const tabs = [
    { name: 'profile', label: 'Profile', icon: Shield },
    { name: 'notifications', label: 'Notifications', icon: Bell },
    { name: 'privacy', label: 'Privacy', icon: Eye }
];

const PROFILE_STORAGE_KEY = 'app-profile-settings';
const NOTIFICATIONS_STORAGE_KEY = 'app-notification-settings';
const PRIVACY_STORAGE_KEY = 'app-privacy-settings';

const initialProfile = {
    name: 'Deepak Kumar',
    email: 'deepak@agency.com',
    title: 'Marketing Manager',
    bio: 'Social media and content strategy expert',
    avatar: 'DK',
    imageUrl: null
};

const initialNotifications = {
    emailNotifications: true,
    pushNotifications: true,
    digestEmail: true,
    weeklyReport: true,
    campaignAlerts: true,
    teamInvites: true
};

const initialPrivacy = {
    profileVisibility: 'team',
    dataCollection: false,
    thirdPartySharing: false,
    activityLog: true
};

const Settings = () => {
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState('profile');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [profile, setProfile] = useState(initialProfile);
    const [notifications, setNotifications] = useState(initialNotifications);
    const [privacy, setPrivacy] = useState(initialPrivacy);

    useEffect(() => {
        const storedProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);
        const storedNotifications = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
        const storedPrivacy = window.localStorage.getItem(PRIVACY_STORAGE_KEY);

        if (storedProfile) {
            try {
                setProfile(JSON.parse(storedProfile));
            } catch {
                setProfile(initialProfile);
            }
        }

        if (storedNotifications) {
            try {
                setNotifications(JSON.parse(storedNotifications));
            } catch {
                setNotifications(initialNotifications);
            }
        }

        if (storedPrivacy) {
            try {
                setPrivacy(JSON.parse(storedPrivacy));
            } catch {
                setPrivacy(initialPrivacy);
            }
        }
    }, []);

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        const validTabs = tabs.map((tab) => tab.name);
        if (tabParam && validTabs.includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [searchParams]);

    const saveProfileToStorage = (newProfile) => {
        window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
        window.dispatchEvent(new Event('profileUpdated'));
    };

    const saveNotificationsToStorage = (newNotifications) => {
        window.localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(newNotifications));
    };

    const savePrivacyToStorage = (newPrivacy) => {
        window.localStorage.setItem(PRIVACY_STORAGE_KEY, JSON.stringify(newPrivacy));
    };

    const handleProfileChange = (field, value) => {
        setProfile((prev) => {
            const next = { ...prev, [field]: value };
            saveProfileToStorage(next);
            return next;
        });
    };

    const handleNotificationChange = (field) => {
        setNotifications((prev) => {
            const next = { ...prev, [field]: !prev[field] };
            saveNotificationsToStorage(next);
            return next;
        });
    };

    const handlePrivacyChange = (field, value) => {
        setPrivacy((prev) => {
            const next = { ...prev, [field]: value };
            savePrivacyToStorage(next);
            return next;
        });
    };

    const handleAvatarUpload = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl = reader.result;
            setProfile((prev) => {
                const next = { ...prev, imageUrl };
                saveProfileToStorage(next);
                return next;
            });
        };
        reader.readAsDataURL(file);
    };

    const saveSettings = () => {
        saveProfileToStorage(profile);
        saveNotificationsToStorage(notifications);
        savePrivacyToStorage(privacy);
        setSuccessMessage('Settings saved successfully!');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SuccessNotification show={showSuccess} message={successMessage} />

            <div>
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 font-medium mt-1">Manage your account and application settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-2">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-2">
                        {tabs.map((tab) => (
                            <SettingTab
                                key={tab.name}
                                icon={tab.icon}
                                label={tab.label}
                                isActive={activeTab === tab.name}
                                onClick={() => setActiveTab(tab.name)}
                            />
                        ))}
                    </div>
                </div>

                <div className="md:col-span-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-8"
                        >
                            {activeTab === 'profile' && (
                                <ProfileSettings
                                    profile={profile}
                                    onProfileChange={handleProfileChange}
                                    onAvatarUpload={handleAvatarUpload}
                                    saveSettings={saveSettings}
                                />
                            )}

                            {activeTab === 'notifications' && (
                                <NotificationSettings
                                    notifications={notifications}
                                    onNotificationChange={handleNotificationChange}
                                    saveSettings={saveSettings}
                                />
                            )}

                            {activeTab === 'privacy' && (
                                <PrivacySettings privacy={privacy} onPrivacyChange={handlePrivacyChange} saveSettings={saveSettings} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Settings;
