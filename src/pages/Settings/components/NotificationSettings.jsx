import React from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationSettings = ({ notifications, onNotificationChange, saveNotifications }) => {
    const notificationOptions = [
        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your accounts' },
        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get real-time push notifications' },
        { key: 'digestEmail', label: 'Weekly Digest', desc: 'Summary of your account activity' },
        { key: 'weeklyReport', label: 'Weekly Report', desc: 'Detailed analytics report every week' },
        { key: 'campaignAlerts', label: 'Campaign Alerts', desc: 'Notifications for campaign milestones' },
        { key: 'teamInvites', label: 'Team Invites', desc: 'Notifications when added to teams' },
        { key: 'contentApprovals', label: 'Content Approvals', desc: 'Notifications for content approval requests' },
        { key: 'collaborationInvites', label: 'Collaboration Invites', desc: 'Get notified when invited to collaborate' }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Notification Settings</h2>

            <div className="space-y-4">
                {notificationOptions.map(item => (
                    <motion.div
                        key={item.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    >
                        <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100">{item.label}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications[item.key]}
                                onChange={() => onNotificationChange(item.key)}
                                className="w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-600 text-brand-primary focus:ring-brand-primary cursor-pointer"
                            />
                        </label>
                    </motion.div>
                ))}
            </div>

            <button
                onClick={saveNotifications}
                className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
            >
                <Save size={20} />
                Save Changes
            </button>
        </div>
    );
};

export default NotificationSettings;
