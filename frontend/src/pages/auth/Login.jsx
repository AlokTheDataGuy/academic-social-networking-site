import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginBg from '../../assets/images/login_background.jpg';
import dsvvLogo from '../../assets/images/dsvv_logo.png';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      setTimeout(() => {
        // For demo purposes, hardcode a successful login
        // In a real app, this would be replaced with an actual API call

        // Simulate different user types based on email domain
        let userType = 'student';
        let userData = { name: 'Demo User', email: formData.email };

        if (formData.email.includes('faculty')) {
          userType = 'faculty';
          userData = {
            ...userData,
            name: 'Dr. Faculty User',
            userType: 'faculty',
            employeeId: 'FAC2023001',
            designation: 'Assistant Professor',
            department: 'Computer Science'
          };
        } else if (formData.email.includes('alumni')) {
          userType = 'alumni';
          userData = {
            ...userData,
            name: 'Alumni User',
            userType: 'alumni',
            graduationYear: 2018,
            degree: 'B.Tech',
            department: 'Computer Science',
            currentCompany: 'Tech Innovations Inc.'
          };
        } else {
          userData = {
            ...userData,
            name: 'Student User',
            userType: 'student',
            rollNumber: 'CS2023001',
            batch: '2023',
            program: 'B.Tech',
            semester: 3,
            department: 'Computer Science'
          };
        }

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('userType', userType);

        setLoading(false);
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center">
            <Link to="/">
              <img
                className="h-12 w-auto"
                src={dsvvLogo}
                alt="DSVV Logo"
              />
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-secondary-600 hover:text-secondary-500">
              create a new account
            </Link>
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-secondary-600 hover:text-secondary-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={loginBg}
          alt="DSVV Campus"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-600/30 to-primary-900/30 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold font-yatra mb-4">DSVV Connect</h1>
          <p className="text-xl max-w-md text-center">
            A specialized social platform for Dev Sanskriti Vishwavidyalaya
          </p>
        </div>
      </div>
    </div>
  );
}
