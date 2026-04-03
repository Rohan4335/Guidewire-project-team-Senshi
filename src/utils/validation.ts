/**
 * Form validation utilities
 */

export interface ValidationRule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate: (value: any) => boolean | string; // returns true if valid, or error message
}

export interface ValidationField {
  [key: string]: ValidationRule[];
}

export const phoneValidation: ValidationRule[] = [
  {
    validate: (value: string) => {
      if (!value || value.trim() === '') {
        return 'Phone number is required';
      }
      return true;
    },
  },
  {
    validate: (value: string) => {
      const cleanedValue = (value || '').replace(/\D/g, '');
      if (cleanedValue.length !== 10) {
        return 'Phone number must be exactly 10 digits';
      }
      return true;
    },
  },
];

export const nameValidation: ValidationRule[] = [
  {
    validate: (value: string) => {
      if (!value || value.trim() === '') {
        return 'Name is required';
      }
      return true;
    },
  },
  {
    validate: (value: string) => {
      if (value.length < 2) {
        return 'Name must be at least 2 characters';
      }
      if (value.length > 50) {
        return 'Name cannot exceed 50 characters';
      }
      return true;
    },
  },
  {
    validate: (value: string) => {
      if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes';
      }
      return true;
    },
  },
];

export const platformValidation: ValidationRule[] = [
  {
    validate: (value: string | null) => {
      if (!value) {
        return 'Platform selection is required';
      }
      const validPlatforms = ['Zomato', 'Swiggy', 'Zepto', 'Blinkit'];
      if (!validPlatforms.includes(value)) {
        return 'Invalid platform selected';
      }
      return true;
    },
  },
];

export const zoneValidation: ValidationRule[] = [
  {
    validate: (value: string | null) => {
      if (!value || value.trim() === '') {
        return 'Zone selection is required';
      }
      return true;
    },
  },
];

/**
 * Validate a field against multiple rules
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateField(value: any, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    const result = rule.validate(value);
    if (result !== true) {
      return typeof result === 'string' ? result : 'Invalid value';
    }
  }
  return null;
}

/**
 * Validate all fields
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateForm(
  formData: Record<string, any>,
  validationRules: ValidationField
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.keys(validationRules).forEach((field) => {
    const error = validateField(formData[field], validationRules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

/**
 * Format and validate phone number
 */
export function formatPhoneNumber(value: string): string {
  const cleaned = (value || '').replace(/\D/g, '');
  return cleaned.slice(0, 10);
}

/**
 * Check if form has errors
 */
export function hasErrors(errors: Record<string, string>): boolean {
  return Object.keys(errors).some((field) => errors[field]);
}
