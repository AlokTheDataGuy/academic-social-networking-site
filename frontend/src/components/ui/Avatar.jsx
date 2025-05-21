import React from 'react';
import PropTypes from 'prop-types';

/**
 * Avatar component for user profile pictures
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for the image
 * @param {string} props.size - Avatar size (xs, sm, md, lg, xl)
 * @param {string} props.status - User status (online, away, offline, busy)
 * @param {boolean} props.bordered - Whether to add border
 * @param {string} props.className - Additional CSS classes
 */
const Avatar = ({
  src,
  alt = 'User avatar',
  size = 'md',
  status,
  bordered = false,
  className = '',
  ...rest
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24',
  };
  
  // Status colors
  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
  };
  
  // Border classes
  const borderClasses = bordered ? 'border-2 border-white ring-2 ring-secondary-600' : '';
  
  // Combine all classes
  const avatarClasses = `
    ${sizeClasses[size] || sizeClasses.md}
    ${borderClasses}
    rounded-full object-cover
    ${className}
  `.trim();
  
  // Generate initials from alt text if no image is provided
  const getInitials = () => {
    if (!alt) return '';
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Font size based on avatar size
  const initialsSize = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };
  
  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={avatarClasses}
          {...rest}
        />
      ) : (
        <div
          className={`${avatarClasses} flex items-center justify-center bg-primary-200 text-secondary-700 font-medium ${initialsSize[size] || initialsSize.md}`}
          {...rest}
        >
          {getInitials()}
        </div>
      )}
      
      {status && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ${statusColors[status] || statusColors.offline} ring-2 ring-white`}
          style={{
            width: size === 'xs' ? '0.5rem' : size === 'sm' ? '0.625rem' : '0.75rem',
            height: size === 'xs' ? '0.5rem' : size === 'sm' ? '0.625rem' : '0.75rem',
          }}
        />
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  status: PropTypes.oneOf(['online', 'away', 'offline', 'busy']),
  bordered: PropTypes.bool,
  className: PropTypes.string,
};

export default Avatar;
