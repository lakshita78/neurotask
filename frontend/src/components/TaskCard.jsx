import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }) => {
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

    // Modern gradient styles for priority badges
    const priorityStyles = {
        low: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border-blue-500/30',
        medium: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-orange-300 border-yellow-500/30',
        high: 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-pink-300 border-red-500/30',
    };

    return (
        <div className={`
      relative group
      bg-gray-800/40 backdrop-blur-xl 
      border border-white/5 
      rounded-2xl p-6 
      hover:-translate-y-1 hover:shadow-2xl hover:shadow-electric-indigo/10 hover:border-electric-indigo/40
      transition-all duration-300 ease-out
      overflow-hidden
    `}>
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-electric-indigo/10 blur-3xl rounded-full group-hover:bg-electric-indigo/20 transition-all duration-500"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border ${priorityStyles[task.priority] || priorityStyles.medium}`}>
                    {task.priority}
                </span>
                <button
                    onClick={handleDelete}
                    className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/5 rounded-lg"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <h3 className={`text-xl font-bold mb-2 tracking-tight ${task.status === 'done' ? 'line-through text-gray-600 decoration-electric-indigo/50' : 'text-white'}`}>
                {task.title}
            </h3>

            <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed font-light">
                {task.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium font-mono">
                    <Clock size={14} className="text-electric-indigo" />
                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
                <button
                    onClick={handleToggle}
                    className={`
            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
            ${task.status === 'done'
                            ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20'
                            : 'bg-white/5 text-gray-300 hover:bg-electric-indigo hover:text-white hover:shadow-lg hover:shadow-electric-indigo/20 border border-white/5 hover:border-electric-indigo/50'}
          `}
                >
                    {task.status === 'done' ? (
                        <>
                            <CheckCircle size={16} /> Completed
                        </>
                    ) : (
                        <>
                            <Circle size={16} /> Mark Done
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
