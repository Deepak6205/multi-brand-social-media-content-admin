import React from 'react';
import { Save } from 'lucide-react';

const notificationOptions = [
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your accounts' },
    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get real-time push notifications' },
    { key: 'digestEmail', label: 'Weekly Digest', desc: 'Summary of your account activity' },
    { key: 'weeklyReport', label: 'Weekly Report', desc: 'Detailed analytics report every week' },
    { key: 'campaignAlerts', label: 'Campaign Alerts', desc: 'Notifications for campaign milestones' },
    { key: 'teamInvites', label: 'Team Invites', desc: 'Notifications when added to teams' }
];

const NotificationSettings = ({ notifications, onNotificationChange, saveSettings }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Notification Settings</h2>

        <div className="space-y-4">
            {notificationOptions.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div>
                        <p className="font-bold text-slate-900">{item.label}</p>
                        <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={() => onNotificationChange(item.key)}
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
);

export default NotificationSettings;
