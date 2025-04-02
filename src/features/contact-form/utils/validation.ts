export const validateName = (name: string): string[] => {
  const errors: string[] = [];
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    errors.push('Name is required');
  } else {
    if (trimmedName.length < 2) errors.push('Name must be at least 2 characters');
    if (trimmedName.length > 50) errors.push('Name must be less than 50 characters');
    if (!nameRegex.test(trimmedName)) errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
    if (trimmedName.includes("''")) errors.push('Name cannot contain consecutive apostrophes');
    if (trimmedName.includes('--')) errors.push('Name cannot contain consecutive hyphens');
  }
  return errors;
};

export const validateEmail = (email: string): string[] => {
  const errors: string[] = [];
  const trimmedEmail = email.trim();
  
  if (!trimmedEmail) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.push('Please enter a valid email address');
  }
  return errors;
};

export const validateMessage = (message: string): string[] => {
  const errors: string[] = [];
  if (!message.trim()) {
    errors.push('Message is required');
  }
  return errors;
}; 