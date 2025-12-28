import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
    const { user } = useAuth();

    const handleToggle = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.put(
                `http://localhost:5000/api/tasks/${task._id}`,
                { status: task.status === 'done' ? 'todo' : 'done' },
                config
            );
            onTaskUpdated(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, config);
            onTaskDeleted(task._id);
        } catch (error) {
            console.error(error);
        }
    };

    const priorityColor = {
        low: 'border-l-4 border-green-500',
        medium: 'border-l-4 border-yellow-500',
        high: 'border-l-4 border-red-500',
    };

    return (
        <div className={`bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center mb-3 ${priorityColor[task.priority]}`}>
            <div className="flex items-center gap-3">
                <button onClick={handleToggle} className="text-blue-400 hover:text-blue-300">
                    {task.status === 'done' ? <CheckCircle size={24} /> : <Circle size={24} />}
                </button>
                <div>
                    <h4 className={`text-lg font-semibold ${task.status === 'done' ? 'line-through text-gray-500' : 'text-white'}`}>
                        {task.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{task.description}</p>
                </div>
            </div>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-400 p-2">
                <Trash2 size={20} />
            </button>
        </div>
    );
};

export default TaskItem;
