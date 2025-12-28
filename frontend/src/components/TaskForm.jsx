import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/tasks',
                { title, description, priority },
                config
            );

            onTaskAdded(data);
            setTitle('');
            setDescription('');
            setPriority('medium');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-xl text-white mb-4">Add New Task</h3>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Task Title"
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <textarea
                    placeholder="Description"
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="flex justify-between items-center">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
