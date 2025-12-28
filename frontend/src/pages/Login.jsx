import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            alert(message);
        }
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">Login</h2>
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
                    Login
                </button>
                <p className="mt-4 text-center text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
