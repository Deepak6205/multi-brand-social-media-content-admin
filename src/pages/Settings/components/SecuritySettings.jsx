import React from 'react';
import { LogOut, Zap, Eye as EyeIcon, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const SecuritySettings = ({
    security,
    errors,
    onSecurityChange,
    onPasswordSubmit,
    onEnableTwoFactor,
    onSignOutSession,
    onSignOutAllOtherSessions
}) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Security Settings</h2>

            {/* Change Password */}
            <div className="pb-8 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Change Password</h3>
                <button
                    onClick={() => onSecurityChange('showPasswordForm', !security.showPasswordForm)}
                    className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                >
                    {security.showPasswordForm ? 'Cancel' : 'Update Password'}
                </button>
                <AnimatePresence>
                    {security.showPasswordForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 space-y-4 overflow-hidden"
                        >
                            {/* Current Password */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">Current Password *</label>
                                <div className="relative">
                                    <input
                                        type={security.showCurrentPassword ? 'text' : 'password'}
                                        placeholder="Enter your current password"
                                        value={security.currentPassword}
                                        onChange={(e) => onSecurityChange('currentPassword', e.target.value)}
                                        className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-2 rounded-xl focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900 dark:text-slate-100 transition-colors ${
                                            errors.currentPassword ? 'border-red-500' : 'border-slate-100 dark:border-slate-600 focus:border-brand-primary'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onSecurityChange('showCurrentPassword', !security.showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                                    >
                                        {security.showCurrentPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
                                    </button>
                                </div>
                                {errors.currentPassword && <p className="text-red-500 text-xs font-bold mt-1">{errors.currentPassword}</p>}
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">New Password *</label>
                                <div className="relative">
                                    <input
                                        type={security.showNewPassword ? 'text' : 'password'}
                                        placeholder="Enter your new password"
                                        value={security.newPassword}
                                        onChange={(e) => onSecurityChange('newPassword', e.target.value)}
                                        className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-2 rounded-xl focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900 dark:text-slate-100 transition-colors ${
                                            errors.newPassword ? 'border-red-500' : 'border-slate-100 dark:border-slate-600 focus:border-brand-primary'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onSecurityChange('showNewPassword', !security.showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                                    >
                                        {security.showNewPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
                                    </button>
                                </div>
                                {errors.newPassword && <p className="text-red-500 text-xs font-bold mt-1">{errors.newPassword}</p>}
                                {security.newPassword && <PasswordStrengthIndicator password={security.newPassword} />}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">Confirm Password *</label>
                                <div className="relative">
                                    <input
                                        type={security.showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm your new password"
                                        value={security.confirmPassword}
                                        onChange={(e) => onSecurityChange('confirmPassword', e.target.value)}
                                        className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-2 rounded-xl focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900 dark:text-slate-100 transition-colors ${
                                            errors.confirmPassword ? 'border-red-500' : 'border-slate-100 dark:border-slate-600 focus:border-brand-primary'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onSecurityChange('showConfirmPassword', !security.showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                                    >
                                        {security.showConfirmPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs font-bold mt-1">{errors.confirmPassword}</p>}
                            </div>
                            
                            <button
                                onClick={onPasswordSubmit}
                                className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all"
                            >
                                Update Password
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Two Factor Authentication */}
            <div>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                    <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">Two-Factor Authentication</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Add an extra layer of security</p>
                    </div>
                    <button
                        onClick={onEnableTwoFactor}
                        className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                            security.twoFactorEnabled
                                ? 'bg-emerald-500 dark:bg-emerald-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700'
                        }`}
                    >
                        <Zap size={16} />
                        {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Active Sessions</h3>
                    {security.sessions.length > 1 && (
                        <button
                            onClick={onSignOutAllOtherSessions}
                            className="px-4 py-2 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors text-sm"
                        >
                            Sign Out All Others
                        </button>
                    )}
                </div>
                <div className="space-y-3">
                    {security.sessions.map((session) => (
                        <motion.div
                            key={session.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                            <div className="flex-1">
                                <p className="font-bold text-slate-900 dark:text-slate-100">{session.device}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{session.date} • IP: {session.ip}</p>
                            </div>
                            {session.current ? (
                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold">Current</span>
                            ) : (
                                <button
                                    onClick={() => onSignOutSession(session.id)}
                                    className="px-4 py-2 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
