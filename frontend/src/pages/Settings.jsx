import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, Moon, Volume2, Shield, Eye, Smartphone } from 'lucide-react';

const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [sound, setSound] = useState(true);
    const [compactMode, setCompactMode] = useState(false);

    const LinkItem = ({ icon: Icon, title, description, active, onClick }) => (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer" onClick={onClick}>
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${active ? 'bg-electric-indigo/20 text-electric-indigo' : 'bg-gray-700/50 text-gray-400'}`}>
                    <Icon size={20} />
                </div>
                <div>
                    <h3 className="text-white font-medium">{title}</h3>
                    <p className="text-gray-400 text-sm">{description}</p>
                </div>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${active ? 'bg-electric-indigo' : 'bg-gray-700'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-charcoal flex">
            <Sidebar />

            <main className="flex-1 md:ml-72 p-8 pt-20 md:pt-8 w-full">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-gray-400 mb-8">Manage your application preferences and workspace experience.</p>

                    <div className="space-y-6">
                        {/* Section 1: General */}
                        <div className="bg-gray-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl">
                            <h2 className="text-lg font-semibold text-white mb-4 px-2">General Preferences</h2>
                            <div className="space-y-3">
                                <LinkItem
                                    icon={Bell}
                                    title="Push Notifications"
                                    description="Receive updates about task deadlines"
                                    active={notifications}
                                    onClick={() => setNotifications(!notifications)}
                                />
                                <LinkItem
                                    icon={Volume2}
                                    title="Sound Effects"
                                    description="Play sounds on task completion"
                                    active={sound}
                                    onClick={() => setSound(!sound)}
                                />
                            </div>
                        </div>

                        {/* Section 2: Appearance */}
                        <div className="bg-gray-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl">
                            <h2 className="text-lg font-semibold text-white mb-4 px-2">Appearance</h2>
                            <div className="space-y-3">
                                <LinkItem
                                    icon={Eye}
                                    title="Compact Mode"
                                    description="Reduce padding for denser layouts"
                                    active={compactMode}
                                    onClick={() => setCompactMode(!compactMode)}
                                />
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 opacity-60 cursor-not-allowed">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-xl bg-gray-700/50 text-gray-400">
                                            <Moon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium">Dark Mode</h3>
                                            <p className="text-gray-400 text-sm">System default (Always On)</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-800 rounded border border-gray-700">LOCKED</span>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Integrations (Mock) */}
                        <div className="bg-gray-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl">
                            <h2 className="text-lg font-semibold text-white mb-4 px-2">Integrations</h2>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-xl bg-green-500/10 text-green-400">
                                        <Smartphone size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Google Calendar</h3>
                                        <p className="text-gray-400 text-sm">Sync tasks with your calendar</p>
                                    </div>
                                </div>
                                <button className="text-sm font-medium text-electric-indigo hover:text-white transition-colors">Connect</button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
