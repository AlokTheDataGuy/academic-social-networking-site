import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Button component with multiple variants
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button style variant (primary, secondary, outline, text)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {string} props.to - If provided, button renders as Link component
 * @param {string} props.href - If provided, button renders as anchor tag
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  to,
  href,
  disabled = false,
  children,
  onClick,
  className = '',
  ...rest
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500',
    secondary: 'bg-primary-50 hover:bg-primary-100 text-secondary-600 border border-secondary-600 focus:ring-primary-500',
    outline: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-secondary-500',
    text: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
    accent: 'bg-accent-600 hover:bg-accent-700 text-white focus:ring-accent-500',
  };
  
  // Disabled classes
  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';
  
  // Full width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size] || sizeClasses.md}
    ${variantClasses[variant] || variantClasses.primary}
    ${disabled ? disabledClasses : ''}
    ${widthClass}
    ${className}
  `.trim();
  
  // Render as Link if 'to' prop is provided
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...rest}>
        {children}
      </Link>
    );
  }
  
  // Render as anchor if 'href' prop is provided
  if (href) {
    return (
      <a href={href} className={buttonClasses} {...rest}>
        {children}
      </a>
    );
  }
  
  // Render as button by default
  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'accent']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
