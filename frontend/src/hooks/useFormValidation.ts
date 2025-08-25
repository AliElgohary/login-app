import { useState, useCallback, useMemo } from 'react';

interface ValidationRule {
  test: (value: string, allFormData?: { [key: string]: string }) => boolean;
  message: string;
}

interface ValidationRules {
  [key: string]: ValidationRule[];
}

interface FormData {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = (initialData: FormData, validationRules: ValidationRules) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback((name: string, value: string): string => {
    const fieldRules = validationRules[name];
    if (!fieldRules) return '';

    for (const rule of fieldRules) {
      if (!rule.test(value, formData)) {
        return rule.message;
      }
    }
    return '';
  }, [validationRules, formData]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validationRules, validateField]);

  const handleChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name, formData[name] || '');
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [formData, validateField]);

  const isFormValid = useMemo(() => {
    return Object.keys(validationRules).every(fieldName => {
      return !validateField(fieldName, formData[fieldName] || '');
    });
  }, [formData, validationRules, validateField]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  return {
    formData,
    errors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFormData,
    setErrors,
  };
}; 