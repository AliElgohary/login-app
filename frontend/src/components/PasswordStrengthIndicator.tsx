import React, { useMemo } from 'react';
import './PasswordStrengthIndicator.css';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const requirements: Requirement[] = useMemo(() => [
    {
      label: 'At least 8 characters',
      test: (pwd: string) => pwd.length >= 8,
    },
    {
      label: 'At least one letter',
      test: (pwd: string) => /[a-zA-Z]/.test(pwd),
    },
    {
      label: 'At least one number',
      test: (pwd: string) => /\d/.test(pwd),
    },
    {
      label: 'At least one special character',
      test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ], []);

  const strengthScore = useMemo(() => {
    return requirements.reduce((score, requirement) => {
      return score + (requirement.test(password) ? 1 : 0);
    }, 0);
  }, [password, requirements]);

  const strengthLevel = useMemo(() => {
    if (strengthScore === 0) return 'none';
    if (strengthScore <= 2) return 'weak';
    if (strengthScore <= 3) return 'medium';
    return 'strong';
  }, [strengthScore]);

  if (!password) return null;

  return (
    <div className="password-strength" role="region" aria-label="Password strength indicator">
      <div className="password-strength__bar">
        <div 
          className={`password-strength__progress password-strength__progress--${strengthLevel}`}
          style={{ width: `${(strengthScore / requirements.length) * 100}%` }}
          aria-valuenow={strengthScore}
          aria-valuemin={0}
          aria-valuemax={requirements.length}
          role="progressbar"
          aria-label={`Password strength: ${strengthLevel}`}
        />
      </div>
      
      <div className="password-strength__label">
        <span className="password-strength__text">
          Strength: <strong className={`password-strength__level--${strengthLevel}`}>
            {strengthLevel.charAt(0).toUpperCase() + strengthLevel.slice(1)}
          </strong>
        </span>
      </div>

      <div className="password-requirements">
        <small className="password-requirements__title">Password must contain:</small>
        <ul className="password-requirements__list" role="list">
          {requirements.map((requirement, index) => {
            const isValid = requirement.test(password);
            return (
              <li 
                key={index} 
                className={`password-requirements__item ${isValid ? 'password-requirements__item--valid' : 'password-requirements__item--invalid'}`}
                role="listitem"
              >
                <span className="password-requirements__icon" aria-hidden="true">
                  {isValid ? '✓' : '○'}
                </span>
                {requirement.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}; 