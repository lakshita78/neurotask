const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { protect } = require('../middleware/authMiddleware');

// @route GET /api/tasks
router.get('/', protect, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route POST /api/tasks
router.post('/', protect, async (req, res) => {
    const { title, description, status, priority } = req.body;
    try {
        const task = new Task({
            user: req.user,
            title,
            description,
            status,
            priority
        });
        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route PUT /api/tasks/:id
router.put('/:id', protect, async (req, res) => {
    const { title, description, status, priority } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route DELETE /api/tasks/:id
router.delete('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
