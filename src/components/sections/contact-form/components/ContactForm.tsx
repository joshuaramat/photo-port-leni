import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import type { FormData, FormErrors } from '../types/form';
import { validateName, validateEmail, validateMessage } from '../utils/validation';
import { ErrorMessage } from './ErrorMessage';

export const ContactForm = () => {
  // State management
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, handleSubmit] = useForm("mqapdveq");

  // Event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField('email', e.target.value);
  };

  // Validation helpers
  const validateField = (name: keyof FormData, value: string) => {
    const newErrors: FormErrors = { ...errors };
    
    switch (name) {
      case 'name':
        const nameErrors = validateName(value);
        newErrors.name = nameErrors.length > 0 ? nameErrors.join(' and ') : undefined;
        break;
      case 'email':
        const emailErrors = validateEmail(value);
        newErrors.email = emailErrors.length > 0 ? emailErrors.join(' and ') : undefined;
        break;
      case 'message':
        const messageErrors = validateMessage(value);
        newErrors.message = messageErrors.length > 0 ? messageErrors.join(' and ') : undefined;
        break;
    }
    
    setErrors(newErrors);
  };

  // Form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const cleanedFormData = {
      ...formData,
      name: formData.name.replace(/\s+/g, ' ').trim()
    };
    setFormData(cleanedFormData);
    
    // Validate all fields
    const newErrors: FormErrors = {};
    const nameErrors = validateName(cleanedFormData.name);
    const emailErrors = validateEmail(cleanedFormData.email);
    const messageErrors = validateMessage(cleanedFormData.message);
    
    if (nameErrors.length > 0) newErrors.name = nameErrors.join(' and ');
    if (emailErrors.length > 0) newErrors.email = emailErrors.join(' and');
    if (messageErrors.length > 0) newErrors.message = messageErrors.join(' and');
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;

    try {
      await handleSubmit(e);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Success state
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
        {errors.name && <ErrorMessage message={errors.name} />}
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
        {errors.email && <ErrorMessage message={errors.email} />}
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
        {errors.message && <ErrorMessage message={errors.message} />}
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
}; 