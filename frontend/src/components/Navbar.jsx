import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, SquareCheckBig } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-400">
                <SquareCheckBig /> NeuroTask
            </Link>
            <div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300">Hello, {user.username}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link to="/login" className="hover:text-blue-300">Login</Link>
                        <Link to="/signup" className="hover:text-blue-300">Signup</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
