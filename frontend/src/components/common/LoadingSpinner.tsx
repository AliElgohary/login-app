import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Loading...',
  fullScreen = false
}) => {
  ;
  return (
    <div className="loading-spinner">
      <img src="/egLogo.svg" alt="EasyGenerator Logo" className="loading-spinner__logo" />

      <div className="loading-spinner__dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {text && (
        <p className="loading-spinner__text" role="status" aria-live="polite">
          {text}
        </p>
      )}
    </div>
  );
};
