import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component with various style options
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Whether to add hover effect
 * @param {boolean} props.bordered - Whether to add border
 * @param {string} props.padding - Padding size (none, sm, md, lg)
 */
const Card = ({
  children,
  className = '',
  hover = true,
  bordered = false,
  padding = 'md',
  ...rest
}) => {
  // Base classes
  const baseClasses = 'bg-white rounded-lg shadow-sm';
  
  // Hover effect
  const hoverClasses = hover ? 'transition-shadow duration-300 hover:shadow-md' : '';
  
  // Border
  const borderClasses = bordered ? 'border border-gray-200' : '';
  
  // Padding
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };
  
  // Combine all classes
  const cardClasses = `
    ${baseClasses}
    ${hoverClasses}
    ${borderClasses}
    ${paddingClasses[padding] || paddingClasses.md}
    ${className}
  `.trim();
  
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  bordered: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
};

export default Card;
