import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

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

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, handleSubmit] = useForm("mqapdveq");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate the field in real-time
    const newErrors: FormErrors = { ...errors };
    
    if (name === 'name') {
      const nameRegex = /^[a-zA-Z\s'-]+$/;
      const name = value.trim();
      const nameErrors: string[] = [];
      
      if (!name) {
        nameErrors.push('Name is required');
      } else {
        if (name.length < 2) {
          nameErrors.push('Name must be at least 2 characters');
        }
        if (name.length > 50) {
          nameErrors.push('Name must be less than 50 characters');
        }
        if (!nameRegex.test(name)) {
          nameErrors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
        }
        if (name.includes("''")) {
          nameErrors.push('Name cannot contain consecutive apostrophes');
        }
        if (name.includes('--')) {
          nameErrors.push('Name cannot contain consecutive hyphens');
        }
      }
      
      newErrors.name = nameErrors.length > 0 ? nameErrors.join(' and ') : undefined;
    } else if (name === 'message') {
      if (!value.trim()) {
        newErrors.message = 'Message is required';
      } else {
        newErrors.message = undefined;
      }
    }

    setErrors(newErrors);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value.trim();
    const newErrors: FormErrors = { ...errors };
    const emailErrors: string[] = [];

    if (!email) {
      emailErrors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailErrors.push('Please enter a valid email address');
    }

    newErrors.email = emailErrors.length > 0 ? emailErrors.join(' and ') : undefined;
    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    const name = formData.name.trim();
    const nameErrors: string[] = [];
    
    if (!name) {
      nameErrors.push('Name is required');
    } else {
      if (name.length < 2) {
        nameErrors.push('Name must be at least 2 characters');
      }
      if (name.length > 50) {
        nameErrors.push('Name must be less than 50 characters');
      }
      if (!nameRegex.test(name)) {
        nameErrors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
      }
      if (name.includes("''")) {
        nameErrors.push('Name cannot contain consecutive apostrophes');
      }
      if (name.includes('--')) {
        nameErrors.push('Name cannot contain consecutive hyphens');
      }
    }
    
    if (nameErrors.length > 0) {
      newErrors.name = nameErrors.join(' and ');
    }
    
    // Email validation
    const emailErrors: string[] = [];
    if (!formData.email.trim()) {
      emailErrors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      emailErrors.push('Please enter a valid email address');
    }
    if (emailErrors.length > 0) {
      newErrors.email = emailErrors.join(' and ');
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clean up spaces in name field before validation
    const cleanedFormData = {
      ...formData,
      name: formData.name.replace(/\s+/g, ' ').trim()
    };
    setFormData(cleanedFormData);
    
    if (!validateForm()) {
      return;
    }

    try {
      await handleSubmit(e);
      // Clear form on success
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (state.succeeded) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank you!</h3>
        <p className="text-gray-600">Your message has been sent successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full px-4 py-2.5 rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200 ${
            errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Enter your name"
        />
        {errors.name && (
          <div className="mt-2 flex items-center text-sm text-red-600">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            {errors.name}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          className={`mt-1 block w-full px-4 py-2.5 rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200 ${
            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <div className="mt-2 flex items-center text-sm text-red-600">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            {errors.email}
          </div>
        )}
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
          className="mt-2 flex items-center text-sm text-red-600"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`mt-1 block w-full px-4 py-2.5 rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200 ${
            errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Enter your message"
        />
        {errors.message && (
          <div className="mt-2 flex items-center text-sm text-red-600">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            {errors.message}
          </div>
        )}
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
          className="mt-2 flex items-center text-sm text-red-600"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={state.submitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9C8B7E] hover:bg-[#8A7B6E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9C8B7E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {state.submitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
} 