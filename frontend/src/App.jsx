import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="min-h-screen bg-charcoal text-white font-sans antialiased selection:bg-electric-indigo selection:text-white">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
