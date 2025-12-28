import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, SquareCheckBig, LayoutDashboard, Settings, User } from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed left-0 top-0 h-full w-72 bg-charcoal/95 backdrop-blur-xl border-r border-white/5 text-white p-6 hidden md:flex flex-col z-20">

            {/* Brand */}
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-indigo to-purple-600 flex items-center justify-center shadow-lg shadow-electric-indigo/20">
                    <SquareCheckBig size={24} className="text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    NeuroTask
                </span>
            </div>

            <nav className="flex-1 space-y-2">
                <Link
                    to="/"
                    className={`
                flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium
                ${isActive('/')
                            ? 'bg-electric-indigo text-white shadow-lg shadow-electric-indigo/25'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'}
            `}
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>

                <Link
                    to="/profile"
                    className={`
              flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium
              ${isActive('/profile')
                            ? 'bg-electric-indigo text-white shadow-lg shadow-electric-indigo/25'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'}
          `}
                >
                    <User size={20} />
                    <span>Profile</span>
                </Link>
                <Link
                    to="/settings"
                    className={`
              flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium
              ${isActive('/settings')
                            ? 'bg-electric-indigo text-white shadow-lg shadow-electric-indigo/25'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'}
          `}
                >
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </nav>

            {/* User Section */}
            <div className="pt-6 border-t border-white/10">
                {user ? (
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center font-bold text-electric-indigo shadow-inner">
                                {user.username[0].toUpperCase()}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">{user.username}</h4>
                                <p className="text-xs text-gray-500 truncate max-w-[100px]">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-white hover:bg-red-500/10 py-2 rounded-lg transition-all text-sm font-medium"
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <Link to="/login" className="text-center bg-electric-indigo hover:bg-indigo-600 py-3 rounded-xl transition font-semibold shadow-lg shadow-electric-indigo/20">Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
