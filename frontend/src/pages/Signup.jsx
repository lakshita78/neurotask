import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            navigate('/');
        } catch (error) {
            const message = error.response?.data?.message || 'Signup failed. User may already exist.';
            alert(message);
        }
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">Sign Up</h2>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition font-semibold">
                    Sign Up
                </button>
                <p className="mt-4 text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
