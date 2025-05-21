import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';

// Protected Route Component
const ProtectedRoute = ({ children, allowedUserTypes = ['student', 'faculty', 'alumni', 'admin'] }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const userType = localStorage.getItem('userType');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedUserTypes.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Protected routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Student-specific routes */}
          <Route
            path="resources"
            element={
              <ProtectedRoute allowedUserTypes={['student', 'faculty', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Faculty-specific routes */}
          <Route
            path="content-verification"
            element={
              <ProtectedRoute allowedUserTypes={['faculty', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Alumni-specific routes */}
          <Route
            path="job-postings"
            element={
              <ProtectedRoute allowedUserTypes={['alumni', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin-specific routes */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedUserTypes={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Add more routes as needed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
