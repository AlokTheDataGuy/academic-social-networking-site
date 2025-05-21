import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge component for labels, tags, and status indicators
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Badge style variant (primary, secondary, success, warning, error, info)
 * @param {string} props.size - Badge size (sm, md, lg)
 * @param {boolean} props.rounded - Whether badge should have fully rounded corners
 * @param {boolean} props.outlined - Whether badge should have outline style
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} props.className - Additional CSS classes
 */
const Badge = ({
  variant = 'primary',
  size = 'md',
  rounded = false,
  outlined = false,
  children,
  className = '',
  ...rest
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center font-medium';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };
  
  // Border radius
  const radiusClasses = rounded ? 'rounded-full' : 'rounded';
  
  // Variant classes for solid badges
  const solidVariantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    accent: 'bg-accent-100 text-accent-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  
  // Variant classes for outlined badges
  const outlinedVariantClasses = {
    primary: 'bg-transparent text-primary-700 border border-primary-700',
    secondary: 'bg-transparent text-secondary-700 border border-secondary-700',
    accent: 'bg-transparent text-accent-700 border border-accent-700',
    success: 'bg-transparent text-green-700 border border-green-700',
    warning: 'bg-transparent text-yellow-700 border border-yellow-700',
    error: 'bg-transparent text-red-700 border border-red-700',
    info: 'bg-transparent text-blue-700 border border-blue-700',
    gray: 'bg-transparent text-gray-700 border border-gray-700',
  };
  
  // Choose variant classes based on outlined prop
  const variantClasses = outlined
    ? outlinedVariantClasses[variant] || outlinedVariantClasses.primary
    : solidVariantClasses[variant] || solidVariantClasses.primary;
  
  // Combine all classes
  const badgeClasses = `
    ${baseClasses}
    ${sizeClasses[size] || sizeClasses.md}
    ${radiusClasses}
    ${variantClasses}
    ${className}
  `.trim();
  
  return (
    <span className={badgeClasses} {...rest}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'gray']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.bool,
  outlined: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Badge;
