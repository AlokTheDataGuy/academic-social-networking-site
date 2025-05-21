import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  CalendarIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Avatar from '../ui/Avatar';

// Placeholder for authentication context
const useAuth = () => {
  // This would be replaced with actual auth context
  return {
    user: {
      name: 'Rahul Sharma',
      profilePicture: 'https://picsum.photos/200/200?random=1',
      userType: 'student',
      sanskarPoints: 120
    }
  };
};

const Sidebar = ({ collapsed = false, toggleCollapsed }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigation = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Forums', href: '/forums', icon: ChatBubbleLeftRightIcon },
    { name: 'Resources', href: '/resources', icon: BookOpenIcon },
    { name: 'Events', href: '/events', icon: CalendarIcon },
    { name: 'Career', href: '/career', icon: BriefcaseIcon },
    { name: 'Alumni', href: '/alumni', icon: AcademicCapIcon },
    { name: 'Wellness', href: '/wellness', icon: HeartIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* User profile section */}
      <div className={`p-4 border-b border-gray-200 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <Avatar src={user.profilePicture} alt={user.name} size="md" />
        ) : (
          <div className="flex items-center">
            <Avatar src={user.profilePicture} alt={user.name} size="md" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900 truncate">{user.name}</h3>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 capitalize">{user.userType}</span>
                <div className="ml-2 flex items-center text-xs text-accent-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mr-1">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  {user.sanskarPoints}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation links */}
      <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive(item.href)
                    ? 'bg-secondary-50 text-secondary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <item.icon
                  className={`${
                    isActive(item.href) ? 'text-secondary-600' : 'text-gray-400 group-hover:text-gray-500'
                  } ${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`}
                  aria-hidden="true"
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Sanskar Points section */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-primary-50 rounded-lg p-3">
            <h4 className="text-xs font-medium text-gray-700 mb-2">Sanskar Points</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent-600">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-lg font-semibold text-gray-800">{user.sanskarPoints}</span>
              </div>
              <Link to="/sanskar-points" className="text-xs text-secondary-600 hover:text-secondary-700">
                View Details
              </Link>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-accent-600 h-2 rounded-full"
                style={{ width: `${Math.min((user.sanskarPoints / 500) * 100, 100)}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {500 - user.sanskarPoints} points until next level
            </p>
          </div>
        </div>
      )}
      
      {/* Collapse button */}
      <div className="p-4 border-t border-gray-200 flex justify-center">
        <button
          type="button"
          onClick={toggleCollapsed}
          className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
        >
          <span className="sr-only">
            {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {collapsed ? (
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  toggleCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;
