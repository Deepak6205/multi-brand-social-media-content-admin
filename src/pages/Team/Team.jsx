import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Mail, Shield, UserPlus, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InviteMemberModal = ({ isOpen, onClose, onInvite }) => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        role: 'Content Creator',
        brands: []
    });
    const [invited, setInvited] = useState(false);

    const roles = ['Super Admin', 'Brand Manager', 'Content Creator', 'Analyst'];
    const availableBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance'];

    const handleBrandToggle = (brand) => {
        setFormData(prev => ({
            ...prev,
            brands: prev.brands.includes(brand)
                ? prev.brands.filter(b => b !== brand)
                : [...prev.brands, brand]
        }));
    };

    const handleInvite = () => {
        if (formData.email && formData.name) {
            onInvite({
                email: formData.email,
                name: formData.name,
                role: formData.role,
                brands: formData.brands
            });
            setInvited(true);
            setTimeout(() => {
                setFormData({ email: '', name: '', role: 'Content Creator', brands: [] });
                setInvited(false);
                onClose();
            }, 1500);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-96 max-h-[90vh] overflow-y-auto z-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">Invite Team Member</h2>
                            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            {!invited ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter member name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900 placeholder-slate-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="Enter email address"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900 placeholder-slate-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-2">Role</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none font-medium text-slate-900"
                                        >
                                            {roles.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-3">Assign Brands</label>
                                        <div className="space-y-2">
                                            {availableBrands.map(brand => (
                                                <label key={brand} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.brands.includes(brand)}
                                                        onChange={() => handleBrandToggle(brand)}
                                                        className="w-5 h-5 rounded-lg border-2 border-slate-200 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                                    />
                                                    <span className="font-medium text-slate-900">{brand}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleInvite}
                                        className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all mt-6"
                                    >
                                        Send Invite
                                    </button>
                                </>
                            ) : (
                                <motion.div
                                    className="py-8 text-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <motion.div
                                        className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <Check size={32} className="text-emerald-600" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Invite Sent!</h3>
                                    <p className="text-slate-500 font-medium">Invitation sent to {formData.email}</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const TeamPage = () => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [teamMembers, setTeamMembers] = useState([
        { name: 'John Doe', email: 'john@agency.com', role: 'Super Admin', status: 'active', avatar: 'JD' },
        { name: 'Sarah Creator', email: 'sarah@brand.com', role: 'Content Creator', status: 'active', avatar: 'SC' },
        { name: 'Mike Analyst', email: 'mike@stats.com', role: 'Analyst', status: 'active', avatar: 'MA' },
        { name: 'Emma Manager', email: 'emma@brand.com', role: 'Brand Manager', status: 'away', avatar: 'EM' },
    ]);

    const handleInviteMember = (inviteData) => {
        const newMember = {
            name: inviteData.name,
            email: inviteData.email,
            role: inviteData.role,
            status: 'pending',
            avatar: inviteData.name.split(' ').map(n => n[0]).join('')
        };
        setTeamMembers([...teamMembers, newMember]);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <InviteMemberModal 
                isOpen={isInviteModalOpen} 
                onClose={() => setIsInviteModalOpen(false)}
                onInvite={handleInviteMember}
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Team Members</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage roles and permissions for your agency team.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsInviteModalOpen(true)}
                        className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center gap-2">
                        <UserPlus size={20} />
                        <span>Invite Member</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-primary/20 outline-none w-full md:w-80 text-sm font-medium"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">All Roles</button>
                        <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Active</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Member</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Brands</th>
                                <th className="px-8 py-4 text-xs font-bold"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {teamMembers.map((member, i) => (
                                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-500 shadow-sm ring-2 ring-white">
                                                {member.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{member.name}</p>
                                                <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                                    <Mail size={12} />
                                                    {member.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Shield size={14} className="text-brand-primary" />
                                            <span className="text-sm font-bold">{member.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-emerald-500 animate-pulse' : member.status === 'pending' ? 'bg-orange-400' : 'bg-amber-400'}`}></div>
                                            <span className="text-xs font-bold text-slate-700 capitalize">{member.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-xl border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm">
                                                    B{i}
                                                </div>
                                            ))}
                                            <div className="w-8 h-8 rounded-xl border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                                +2
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
