import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedUserType) {
      setUserType(storedUserType);
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Profile header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile information */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and information.</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={user?.firstName || 'John'}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={user?.lastName || 'Doe'}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={user?.email || 'john.doe@example.com'}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="user-type" className="block text-sm font-medium text-gray-700">
                        User Type
                      </label>
                      <div className="mt-1">
                        <select
                          id="user-type"
                          name="user-type"
                          autoComplete="user-type"
                          className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          disabled
                          defaultValue={userType || 'student'}
                        >
                          <option value="student">Student</option>
                          <option value="faculty">Faculty</option>
                          <option value="alumni">Alumni</option>
                          <option value="admin">Administrator</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        About
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="shadow-sm focus:ring-secondary-500 focus:border-secondary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          defaultValue={''}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Brief description for your profile.</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User profile card */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col items-center">
                    <div className="flex-shrink-0 mb-4">
                      <img
                        className="h-24 w-24 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-medium text-gray-900">{user?.name || 'John Doe'}</p>
                      <p className="text-sm text-gray-500">
                        {userType === 'student' ? 'Student' :
                         userType === 'faculty' ? 'Faculty' :
                         userType === 'alumni' ? 'Alumni' :
                         userType === 'admin' ? 'Administrator' : 'Guest'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">125</p>
                      <p className="text-xs text-gray-500">Connections</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">48</p>
                      <p className="text-xs text-gray-500">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">350</p>
                      <p className="text-xs text-gray-500">Sanskar Points</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                    >
                      Change Profile Picture
                    </button>
                  </div>
                </div>
              </div>

              {/* Account settings */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                  <div className="mt-4 space-y-4">
                    <Link
                      to="/settings/password"
                      className="block text-sm font-medium text-gray-700 hover:text-secondary-600"
                    >
                      Change Password
                    </Link>
                    <Link
                      to="/settings/notifications"
                      className="block text-sm font-medium text-gray-700 hover:text-secondary-600"
                    >
                      Notification Settings
                    </Link>
                    <Link
                      to="/settings/privacy"
                      className="block text-sm font-medium text-gray-700 hover:text-secondary-600"
                    >
                      Privacy Settings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
