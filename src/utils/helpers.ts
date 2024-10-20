export const generateUuid = (prefix = 'uuid') => prefix + '-' + crypto.randomUUID();

export const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};