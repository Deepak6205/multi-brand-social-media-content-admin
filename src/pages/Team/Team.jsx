import React from 'react';
import { Plus, Search, MoreVertical, Mail, Shield, UserPlus } from 'lucide-react';

const TeamPage = () => {
    const members = [
        { name: 'John Doe', email: 'john@agency.com', role: 'Super Admin', status: 'active', avatar: 'JD' },
        { name: 'Sarah Creator', email: 'sarah@brand.com', role: 'Content Creator', status: 'active', avatar: 'SC' },
        { name: 'Mike Analyst', email: 'mike@stats.com', role: 'Analyst', status: 'active', avatar: 'MA' },
        { name: 'Emma Manager', email: 'emma@brand.com', role: 'Brand Manager', status: 'away', avatar: 'EM' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Team Members</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage roles and permissions for your agency team.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center gap-2">
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
                            {members.map((member, i) => (
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
                                            <div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></div>
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
