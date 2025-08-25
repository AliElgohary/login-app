import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFormValidation } from '../hooks/useFormValidation';
import { FormField } from './common/FormField';
import { Button } from './common/Button';
import './Auth.css';
const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login, isSubmitting, error, clearError } = useAuth();

  const initialFormData = {
    email: '',
    password: '',
  };

  const {
    formData,
    errors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    validateForm,
  } = useFormValidation(initialFormData, {
    email: [
      {
        test: (value: string) => value.length > 0,
        message: 'Email is required',
      },
    ],
    password: [
      {
        test: (value: string) => value.length > 0,
        message: 'Password is required',
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
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
        <h2 className="auth-subtitle">Sign in to your account</h2>

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
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={isSubmitting}
            disabled={!isFormValid}
            className="auth-button"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 