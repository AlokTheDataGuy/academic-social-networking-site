import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import dsvvLogo from '../../assets/images/dsvv_logo.png';
import logoText from '../../assets/images/logo-text.png';
import logoTextWhite from '../../assets/images/logo-text-white.png';

// Navigation items
const commonNavigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Profile', href: '/profile', current: false },
  { name: 'Events', href: '/events', current: false },
  { name: 'Resources', href: '/resources', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navigation, setNavigation] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Update current page in navigation
    const updatedNavigation = commonNavigation.map(item => ({
      ...item,
      current: item.href === location.pathname
    }));

    setNavigation(updatedNavigation);
  }, [location.pathname]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <Disclosure as="nav" className={`fixed w-full z-50 transition-all duration-500 ${isHomePage && !scrolled
        ? 'opacity-0 -translate-y-full pointer-events-none'
        : scrolled || !isHomePage
          ? 'bg-white shadow-md opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <img
                    className="h-8 w-auto"
                    src={dsvvLogo}
                    alt="DSVV Logo"
                  />
                  <img
                    className="h-6 w-auto ml-2"
                    src={scrolled || !isHomePage ? logoText : logoTextWhite}
                    alt="DSVV Connect"
                  />
                </Link>
              </div>

              <div className="hidden md:block mx-auto">
                <div className="flex justify-center space-x-4 lg:space-x-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-secondary-600 text-white'
                          : scrolled || !isHomePage
                            ? 'text-gray-800 hover:bg-secondary-50 hover:text-secondary-600'
                            : 'text-white hover:bg-white/20 hover:text-white',
                        'rounded-md px-3 lg:px-4 py-2 text-sm transition-colors duration-300',
                        (scrolled || !isHomePage) ? 'font-bold' : 'font-semibold'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile menu button - moved to right */}
              <div className="md:hidden">
                <Disclosure.Button className={`relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-600 transition-colors duration-300 ${scrolled || !isHomePage
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/20'
                  }`}>
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden md:flex items-center ml-6">
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
                      className={`rounded-md px-3 py-2 text-sm transition-colors duration-300 ${scrolled || !isHomePage
                          ? 'text-gray-700 hover:bg-secondary-50 hover:text-secondary-600 font-semibold'
                          : 'text-white hover:bg-white/20 hover:text-white font-medium'
                        }`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className={`rounded-md px-3 py-2 text-sm transition-colors duration-300 ${scrolled || !isHomePage
                          ? 'bg-secondary-600 text-white hover:bg-secondary-700 font-semibold'
                          : 'bg-white/20 text-white hover:bg-white/30 font-medium border border-white/50'
                        }`}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className={`md:hidden shadow-md ${scrolled || !isHomePage ? 'bg-white' : 'bg-transparent backdrop-blur-sm'}`}>
            <div className="px-2 pb-3 pt-2">
              {/* Navigation items */}
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-secondary-600 text-white'
                        : scrolled || !isHomePage
                          ? 'text-gray-800 hover:bg-secondary-50 hover:text-secondary-600'
                          : 'text-white hover:bg-white/20 hover:text-white',
                      'block rounded-md px-3 py-2 text-base transition-colors duration-300',
                      (scrolled || !isHomePage) ? 'font-bold' : 'font-semibold'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>

              {/* Login/Register buttons in mobile menu if not logged in */}
              {!isLoggedIn && (
                <div className="mt-4 pt-3 border-t border-gray-200/20 flex flex-col space-y-2 px-3">
                  <Link
                    to="/login"
                    className={`rounded-md px-3 py-2 text-sm text-center transition-colors duration-300 ${scrolled || !isHomePage
                        ? 'text-gray-700 hover:bg-secondary-50 hover:text-secondary-600 font-semibold'
                        : 'text-white hover:bg-white/20 hover:text-white font-medium'
                      }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`rounded-md px-3 py-2 text-sm text-center transition-colors duration-300 ${scrolled || !isHomePage
                        ? 'bg-secondary-600 text-white hover:bg-secondary-700 font-semibold'
                        : 'bg-white/20 text-white hover:bg-white/30 font-medium border border-white/50'
                      }`}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
