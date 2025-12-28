import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/tasks', config);
                setTasks(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (user) {
            fetchTasks();
        }
    }, [user]);

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    };

    const handleTaskDeleted = (id) => {
        setTasks(tasks.filter((task) => task._id !== id));
    };

    return (
        <div className="min-h-screen bg-charcoal flex">
            {/* Sidebar - Hidden on mobile, fixed on desktop */}
            <Sidebar />

            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 bg-charcoal border-b border-gray-800 p-4 flex items-center justify-between md:hidden z-50">
                <span className="text-xl font-bold text-electric-indigo">NeuroTask</span>
                <button className="text-white" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                    <Menu />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 pt-20 md:pt-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
                        <p className="text-gray-400">Welcome back, {user?.username}. Here's what's on your plate.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Form Section - Takes 1 column on large screens, or full width if preferred. 
                Let's make it sit on top or side. Based on request, "1 col mobile, 3 cols desktop" likely refers to the task grid.
                I'll put the form above or in a modal eventually, but for now let's keep it simple.
            */}
                        <div className="lg:col-span-4">
                            <TaskForm onTaskAdded={handleTaskAdded} />
                        </div>

                        {/* Tasks Grid */}
                        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        onTaskUpdated={handleTaskUpdated}
                                        onTaskDeleted={handleTaskDeleted}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
                                    <p className="text-gray-500 text-lg">No tasks found. Start by adding one!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
