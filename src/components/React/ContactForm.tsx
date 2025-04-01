import React, { useState, useCallback } from 'react';
import type { FormEvent } from 'react';
import styles from './ContactForm.module.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const validateField = useCallback((name: keyof FormData, value: string): string => {
    if (!value.trim()) return 'This field is required';

    switch (name) {
      case 'name':
        if (/\d/.test(value)) return 'Numbers are not allowed in the name field';
        if (value.length < 2) return 'Name must be at least 2 characters long';
        if (!/^[A-Za-z\s-]+$/.test(value)) return 'Please enter only letters, spaces, and hyphens';
        break;
      case 'email':
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'message':
        if (value.length < 10) return 'Message must be at least 10 characters long';
        if (value.length > 500) return 'Message must be less than 500 characters';
        break;
    }
    return '';
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name as keyof FormData, value) }));
  }, [validateField]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('https://formspree.io/f/mqapdveq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setStatus({ type: 'success', message: 'Perfect! I\'ll be in touch within 24 hours to discuss your vision.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(`Form submission failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: error instanceof Error && error.name === 'AbortError'
          ? 'Oops! The request timed out. Please try again.'
          : 'Something went wrong. Please try again or email me directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="name" className={styles.field}>
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
          placeholder="e.g., Sarah Johnson"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <div id="name-error" className={styles.errorMessage} role="alert">{errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="email" className={styles.field}>
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
          placeholder="e.g., sarah@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <div id="email-error" className={styles.errorMessage} role="alert">{errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="message" className={styles.field}>
          Tell Me About Your Vision
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`${styles.formInput} ${errors.message ? styles.error : ''}`}
          placeholder="e.g., I'm planning a family portrait session next month. We'd love to capture some candid moments in nature..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <div id="message-error" className={styles.errorMessage} role="alert">{errors.message}</div>
        )}
      </div>

      {status && (
        <div className={status.type === 'success' ? styles.successMessage : styles.errorContainer} role="alert">
          <div className="flex items-center">
            <svg className={styles.icon} fill="currentColor" viewBox="0 0 20 20">
              {status.type === 'success' ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              )}
            </svg>
            {status.message}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
        aria-label="Send message"
      >
        {isSubmitting ? 'Sending Your Message...' : 'Start Your Photography Journey'}
      </button>
    </form>
  );
};

export default ContactForm; 