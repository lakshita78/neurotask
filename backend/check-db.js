require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const Task = require('./models/Task');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB. Fetching data...');

        const users = await User.find({}, 'username email createdAt');
        console.log('\n--- USERS In "todo" Database ---');
        console.table(users.map(u => ({
            id: u._id.toString(),
            username: u.username,
            email: u.email
        })));

        const tasks = await Task.find({}).populate('user', 'username');
        console.log('\n--- TASKS (Todos) In "todo" Database ---');
        if (tasks.length === 0) {
            console.log("No tasks found yet.");
        } else {
            console.table(tasks.map(t => ({
                title: t.title,
                status: t.status,
                priority: t.priority,
                user: t.user ? t.user.username : 'Unknown'
            })));
        }

        console.log('--------------------------------\n');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
