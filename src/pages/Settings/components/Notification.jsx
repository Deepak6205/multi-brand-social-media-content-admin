import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ show, message, type = 'success' }) => {
    const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-red-500';
    const Icon = type === 'success' ? Check : AlertCircle;
    
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`fixed top-6 right-6 ${bgColor} text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg z-50`}
                >
                    <Icon size={20} />
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;
