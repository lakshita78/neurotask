import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { User, Mail, Calendar, Key, Shield } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-charcoal flex">
            <Sidebar />

            <main className="flex-1 md:ml-72 p-8 pt-20 md:pt-8 w-full">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

                    <div className="bg-gray-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                        {/* Header Background */}
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-electric-indigo/20 to-purple-600/20"></div>

                        <div className="relative pt-12 mb-8 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full border-4 border-charcoal bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-2xl mb-4">
                                <span className="text-4xl font-bold text-white">{user?.username?.[0]?.toUpperCase()}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
                            <span className="text-gray-400">Pro Member</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-electric-indigo/30 transition-colors group">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                        <User size={20} />
                                    </div>
                                    <h3 className="text-gray-400 text-sm font-medium">Username</h3>
                                </div>
                                <p className="text-white text-lg font-semibold pl-12">{user?.username}</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-electric-indigo/30 transition-colors group">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <h3 className="text-gray-400 text-sm font-medium">Email Address</h3>
                                </div>
                                <p className="text-white text-lg font-semibold pl-12">{user?.email}</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-electric-indigo/30 transition-colors group">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-2 rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors">
                                        <Calendar size={20} />
                                    </div>
                                    <h3 className="text-gray-400 text-sm font-medium">Member Since</h3>
                                </div>
                                <p className="text-white text-lg font-semibold pl-12">
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-electric-indigo/30 transition-colors group">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                                        <Shield size={20} />
                                    </div>
                                    <h3 className="text-gray-400 text-sm font-medium">Account ID</h3>
                                </div>
                                <p className="text-white text-lg font-semibold pl-12 text-sm font-mono opacity-70">{user?._id}</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex justify-end">
                            <button className="flex items-center gap-2 bg-white/5 hover:bg-electric-indigo/10 text-gray-300 hover:text-electric-indigo px-6 py-3 rounded-xl transition-all font-medium border border-white/5">
                                <Key size={18} />
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
