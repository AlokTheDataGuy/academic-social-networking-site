import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  VideoCameraIcon,
  PhotoIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  BookmarkIcon,
  ShareIcon,
  CheckBadgeIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const ResourceCard = ({ resource, variant = 'default' }) => {
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get file type icon
  const getFileTypeIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <DocumentTextIcon className="h-6 w-6 text-red-500" aria-hidden="true" />;
      case 'video':
        return <VideoCameraIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />;
      case 'image':
        return <PhotoIcon className="h-6 w-6 text-green-500" aria-hidden="true" />;
      default:
        return <DocumentIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />;
    }
  };
  
  // Get category badge
  const getCategoryBadge = (category) => {
    const categories = {
      lecture: { variant: 'primary', label: 'Lecture' },
      research: { variant: 'secondary', label: 'Research' },
      assignment: { variant: 'info', label: 'Assignment' },
      book: { variant: 'accent', label: 'Book' },
      other: { variant: 'gray', label: 'Other' },
    };
    
    const categoryInfo = categories[category] || categories.other;
    
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
        <div className="flex-shrink-0 mr-3">
          {getFileTypeIcon(resource.fileType)}
        </div>
        <div className="flex-1 min-w-0">
          <Link to={`/resources/${resource.id}`} className="text-sm font-medium text-gray-900 hover:text-secondary-600 truncate">
            {resource.title}
          </Link>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span>{resource.subject}</span>
            <span className="mx-1">•</span>
            <span>{formatFileSize(resource.fileSize)}</span>
          </div>
        </div>
        {getCategoryBadge(resource.category)}
      </div>
    );
  }
  
  // List variant
  if (variant === 'list') {
    return (
      <div className="flex items-center p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
        <div className="flex-shrink-0 mr-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            {getFileTypeIcon(resource.fileType)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <Link to={`/resources/${resource.id}`} className="text-base font-medium text-gray-900 hover:text-secondary-600 truncate">
              {resource.title}
            </Link>
            {resource.isVerified && (
              <CheckBadgeIcon className="ml-1 h-4 w-4 text-secondary-600" aria-hidden="true" />
            )}
          </div>
          <p className="text-sm text-gray-500 line-clamp-1 mt-1">{resource.description}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span>{resource.department}</span>
            <span className="mx-1">•</span>
            <span>{resource.subject}</span>
            <span className="mx-1">•</span>
            <span>{formatDate(resource.uploadedAt)}</span>
          </div>
        </div>
        <div className="flex-shrink-0 ml-4 flex items-center space-x-2">
          {getCategoryBadge(resource.category)}
          <Button
            variant="outline"
            size="sm"
            href={resource.fileUrl}
            className="flex items-center"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-1" aria-hidden="true" />
            <span>Download</span>
          </Button>
        </div>
      </div>
    );
  }
  
  // Default variant (card)
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Resource header */}
      <div className="p-4 border-b border-gray-100 flex items-center">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
          {getFileTypeIcon(resource.fileType)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <Link to={`/resources/${resource.id}`} className="text-base font-medium text-gray-900 hover:text-secondary-600 truncate">
              {resource.title}
            </Link>
            {resource.isVerified && (
              <CheckBadgeIcon className="ml-1 h-4 w-4 text-secondary-600" aria-hidden="true" />
            )}
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span>{formatDate(resource.uploadedAt)}</span>
            <span className="mx-1">•</span>
            <span>{formatFileSize(resource.fileSize)}</span>
          </div>
        </div>
        <div className="ml-2">
          {getCategoryBadge(resource.category)}
        </div>
      </div>
      
      {/* Resource content */}
      <div className="p-4 flex-1">
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {resource.description}
        </p>
        
        {/* Resource metadata */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-20">Subject:</span>
            <span className="text-gray-900 font-medium">{resource.subject}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-20">Department:</span>
            <span className="text-gray-900 font-medium">{resource.department}</span>
          </div>
          {resource.author && (
            <div className="flex items-center text-sm">
              <span className="text-gray-500 w-20">Uploaded by:</span>
              <span className="text-gray-900 font-medium">{resource.author}</span>
            </div>
          )}
        </div>
        
        {/* Resource tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {resource.tags.map((tag) => (
              <Link key={tag} to={`/resources/tags/${tag}`}>
                <Badge variant="primary" size="sm">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Resource actions */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <Button
          variant="primary"
          size="sm"
          href={resource.fileUrl}
          className="flex items-center"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-1" aria-hidden="true" />
          <span>Download</span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
            {resource.isSaved ? (
              <BookmarkIconSolid className="h-5 w-5 text-secondary-600" aria-hidden="true" />
            ) : (
              <BookmarkIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
            <ShareIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

ResourceCard.propTypes = {
  resource: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    fileUrl: PropTypes.string.isRequired,
    fileType: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    author: PropTypes.string,
    uploadedAt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    isVerified: PropTypes.bool,
    isSaved: PropTypes.bool,
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'compact', 'list']),
};

export default ResourceCard;
