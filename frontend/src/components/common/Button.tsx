import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    loading && 'button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = disabled || loading;

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <span className="button__spinner" aria-hidden="true">
          <svg
            className="button__spinner-svg"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="button__spinner-circle"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
        </span>
      )}
      <span className={loading ? 'button__text--loading' : 'button__text'}>
        {children}
      </span>
    </button>
  );
}; 