import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  EyeIcon,
  ClockIcon,
  CheckBadgeIcon,
  UserIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

const ForumCard = ({ forum, variant = 'default' }) => {
  // Format date to relative time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  };
  
  // Get category badge
  const getCategoryBadge = (category) => {
    const categories = {
      academic: { variant: 'primary', label: 'Academic' },
      research: { variant: 'secondary', label: 'Research' },
      campus: { variant: 'info', label: 'Campus Life' },
      career: { variant: 'accent', label: 'Career' },
      wellness: { variant: 'success', label: 'Wellness' },
      general: { variant: 'gray', label: 'General' },
    };
    
    const categoryInfo = categories[category] || categories.general;
    
    return (
      <Badge variant={categoryInfo.variant} size="sm">
        {categoryInfo.label}
      </Badge>
    );
  };
  
  // Compact variant
  if (variant === 'compact') {
    return (
      <div className="flex items-center p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
        <div className="flex-1 min-w-0">
          <Link to={`/forums/${forum.id}`} className="text-sm font-medium text-gray-900 hover:text-secondary-600 truncate">
            {forum.title}
          </Link>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span>by {forum.author.name}</span>
            <span className="mx-1">•</span>
            <span>{formatDate(forum.createdAt)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 ml-4">
          <div className="flex items-center text-xs text-gray-500">
            <ChatBubbleLeftRightIcon className="h-3 w-3 mr-1" aria-hidden="true" />
            <span>{forum.repliesCount}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
            <span>{forum.viewsCount}</span>
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        {/* Forum header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {getCategoryBadge(forum.category)}
            {forum.isVerified && (
              <Badge variant="success" size="sm" className="ml-2">
                <span className="flex items-center">
                  <CheckBadgeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  Verified
                </span>
              </Badge>
            )}
            {forum.isTrending && (
              <Badge variant="warning" size="sm" className="ml-2">
                <span className="flex items-center">
                  <ArrowTrendingUpIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  Trending
                </span>
              </Badge>
            )}
          </div>
          <div className="text-xs text-gray-500">
            <ClockIcon className="h-3 w-3 inline mr-1" aria-hidden="true" />
            {formatDate(forum.createdAt)}
          </div>
        </div>
        
        {/* Forum title */}
        <Link to={`/forums/${forum.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-secondary-600 mb-2">
            {forum.title}
          </h3>
        </Link>
        
        {/* Forum content preview */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {forum.content}
        </p>
        
        {/* Forum tags */}
        {forum.tags && forum.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {forum.tags.map((tag) => (
              <Link key={tag} to={`/forums/tags/${tag}`}>
                <Badge variant="primary" size="sm" rounded>
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
        
        {/* Forum footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          {/* Author info */}
          <div className="flex items-center">
            <Avatar 
              src={forum.author.profilePicture} 
              alt={forum.author.name} 
              size="sm" 
            />
            <div className="ml-2">
              <Link to={`/profile/${forum.author.id}`} className="text-sm font-medium text-gray-900 hover:text-secondary-600">
                {forum.author.name}
              </Link>
              <div className="text-xs text-gray-500 capitalize">{forum.author.userType}</div>
            </div>
          </div>
          
          {/* Forum stats */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
              <span>{forum.repliesCount}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <EyeIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
              <span>{forum.viewsCount}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <UserIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
              <span>{forum.participantsCount}</span>
            </div>
          </div>
        </div>
        
        {/* Last reply info */}
        {forum.lastReply && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center text-xs text-gray-500">
            <span>Last reply by </span>
            <Link to={`/profile/${forum.lastReply.author.id}`} className="font-medium text-gray-700 hover:text-secondary-600 mx-1">
              {forum.lastReply.author.name}
            </Link>
            <span className="mx-1">•</span>
            <span>{formatDate(forum.lastReply.createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

ForumCard.propTypes = {
  forum: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
      userType: PropTypes.string.isRequired,
    }).isRequired,
    repliesCount: PropTypes.number.isRequired,
    viewsCount: PropTypes.number.isRequired,
    participantsCount: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    isVerified: PropTypes.bool,
    isTrending: PropTypes.bool,
    lastReply: PropTypes.shape({
      author: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'compact']),
};

export default ForumCard;
