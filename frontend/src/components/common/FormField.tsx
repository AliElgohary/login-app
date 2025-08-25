import React from 'react';
import './FormField.css';

interface FormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  'aria-describedby'?: string;
}

export const FormField: React.FC<FormFieldProps> = React.memo(({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  autoComplete,
  'aria-describedby': ariaDescribedBy,
}) => {
  const fieldId = `${name}-field`;
  const errorId = `${name}-error`;
  const hasError = touched && error;

  return (
    <div className="form-field">
      <label htmlFor={fieldId} className="form-field__label">
        {label}
        {required && <span className="form-field__required" aria-label="required">*</span>}
      </label>
      
      <input
        id={fieldId}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        className={`form-field__input ${hasError ? 'form-field__input--error' : ''}`}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={hasError ? errorId : ariaDescribedBy}
        aria-invalid={hasError ? 'true' : 'false'}
      />
      
      {hasError && (
        <span 
          id={errorId} 
          className="form-field__error" 
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
});

FormField.displayName = 'FormField'; 