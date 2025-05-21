import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import dsvvLogo from '../../assets/images/dsvv_logo.png';

// Common navigation items for all user types
const commonNavigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Discussion Forums', href: '/forums', current: false },
  { name: 'Events', href: '/events', current: false },
  { name: 'Wellness Center', href: '/wellness', current: false },
];

// Student-specific navigation items
const studentNavigation = [
  { name: 'Academic Resources', href: '/resources', current: false },
  { name: 'Career Center', href: '/careers', current: false },
  { name: 'Alumni Network', href: '/alumni', current: false },
];

// Faculty-specific navigation items
const facultyNavigation = [
  { name: 'Academic Resources', href: '/resources', current: false },
  { name: 'Content Verification', href: '/content-verification', current: false },
  { name: 'Student Mentoring', href: '/mentoring', current: false },
];

// Alumni-specific navigation items
const alumniNavigation = [
  { name: 'Alumni Network', href: '/alumni', current: false },
  { name: 'Job Postings', href: '/job-postings', current: false },
  { name: 'Mentoring', href: '/mentoring', current: false },
];

// Admin-specific navigation items
const adminNavigation = [
  { name: 'Admin Panel', href: '/admin', current: false },
  { name: 'User Management', href: '/admin/users', current: false },
  { name: 'Content Management', href: '/admin/content', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [navigation, setNavigation] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    const storedUser = localStorage.getItem('user');

    if (token) {
      setIsLoggedIn(true);

      if (storedUserType) {
        setUserType(storedUserType);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    // Set navigation items based on user type
    if (!userType) {
      setNavigation(commonNavigation);
      return;
    }

    let userNavigation = [...commonNavigation];

    switch (userType) {
      case 'student':
        userNavigation = [...commonNavigation, ...studentNavigation];
        break;
      case 'faculty':
        userNavigation = [...commonNavigation, ...facultyNavigation];
        break;
      case 'alumni':
        userNavigation = [...commonNavigation, ...alumniNavigation];
        break;
      case 'admin':
        userNavigation = [...commonNavigation, ...adminNavigation];
        break;
      default:
        userNavigation = commonNavigation;
    }

    setNavigation(userNavigation);
  }, [userType]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-600">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="h-8 w-auto"
                      src={dsvvLogo}
                      alt="DSVV Logo"
                    />
                  </Link>
                  <span className="ml-2 text-lg font-semibold text-secondary-600 font-yatra">DSVV Connect</span>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-secondary-600 text-white'
                            : 'text-gray-700 hover:bg-secondary-50 hover:text-secondary-600',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isLoggedIn ? (
                  <>
                    <button
                      type="button"
                      className="relative rounded-full bg-white p-1 text-gray-700 hover:text-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-600"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary-600">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/settings"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full text-left px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <Link
                      to="/login"
                      className="text-gray-700 hover:bg-secondary-50 hover:text-secondary-600 rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-secondary-600 text-white hover:bg-secondary-700 rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-secondary-600 text-white'
                      : 'text-gray-700 hover:bg-secondary-50 hover:text-secondary-600',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
