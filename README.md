# 🧠 NeuroTask - Full Stack Task Manager

**NeuroTask** is a professional productivity web application designed to streamline task management. Built with the **MERN stack**, it features a secure authentication system, real-time data handling, and a modern, responsive interface.
## 🚀 Features
- **Secure Authentication**: Implemented user registration and login using **JWT (JSON Web Tokens)** and **Bcrypt** for password encryption.
- **Task Management (CRUD)**: Full Create, Read, Update, and Delete capabilities for personal tasks.
- **Protected Routes**: Ensuring that user dashboards and task data are only accessible to authenticated users.
- **Responsive Design**: A mobile-first UI built with **Tailwind CSS**, providing a seamless experience across all devices.
- **RESTful API**: Modular backend architecture designed for scalability and clean separation of concerns.
- **Real-time Updates**: Instant UI feedback for task status changes.
---
## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **State Management**: React Hooks & Context API
- **Authentication**: JWT, LocalStorage
---
## 📂 Project Structure

NeuroTask/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Navbar, TaskCard, TaskForm
│   │   ├── pages/         # Login, Register, Dashboard
│   │   ├── context/       # AuthContext for global state
│   │   └── api/           # Axios configurations
├── server/                # Node.js Backend
│   ├── models/            # Mongoose Schemas (User.js, Task.js)
│   ├── routes/            # API Endpoints (auth.js, tasks.js)
│   ├── middleware/        # JWT Verification (authMiddleware.js)
│   └── config/            # Database connection logic
└── .env                   # Environment Variables (Keep Secret!)
