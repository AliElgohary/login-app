import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFormValidation } from '../hooks/useFormValidation';
import { FormField } from './common/FormField';
import { Button } from './common/Button';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import './Auth.css';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isSubmitting, error, clearError } = useAuth();

  const initialFormData = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  };

  const {
    formData,
    errors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  } = useFormValidation(initialFormData, {
    email: [
      {
        test: (value: string) => value.length > 0,
        message: 'Email is required',
      },
      {
        test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please enter a valid email address',
      },
    ],
    name: [
      {
        test: (value: string) => value.length > 0,
        message: 'Name is required',
      },
      {
        test: (value: string) => value.length >= 3,
        message: 'Name must be at least 3 characters long',
      },
    ],
    password: [
      {
        test: (value: string) => value.length > 0,
        message: 'Password is required',
      },
      {
        test: (value: string) => value.length >= 8,
        message: 'Password must be at least 8 characters long',
      },
      {
        test: (value: string) => /[a-zA-Z]/.test(value),
        message: 'Password must contain at least one letter',
      },
      {
        test: (value: string) => /\d/.test(value),
        message: 'Password must contain at least one number',
      },
      {
        test: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
        message: 'Password must contain at least one special character',
      },
    ],
    confirmPassword: [
      {
        test: (value: string) => value.length > 0,
        message: 'Please confirm your password',
      },
      {
        test: (value: string, allFormData) => value === (allFormData?.password || ''),
        message: 'Passwords do not match',
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await signup(formData.email, formData.name, formData.password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the useAuth hook
    }
  };

  const handleInputChange = (name: string, value: string) => {
    handleChange(name, value);
    clearError();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <img src="/egLogo.svg" alt="EasyGenerator Logo" />
        </div>
        <h2 className="auth-subtitle">Sign up to get started</h2>
        
        {error && (
          <div className="error-message" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            placeholder="Enter your email"
            required
            autoComplete="email"
          />

          <FormField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            placeholder="Enter your name"
            required
            autoComplete="name"
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            placeholder="Enter your password"
            required
            autoComplete="new-password"
          />

          <PasswordStrengthIndicator password={formData.password} />

          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={isSubmitting}
            disabled={!isFormValid}
            className="auth-button"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/signin" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 