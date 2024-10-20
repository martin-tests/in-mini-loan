export const generateUuid = (prefix = 'uuid') => prefix + '-' + crypto.randomUUID();

export const formatNumberWithCurrency = (value: number) => {
  return value.toFixed(2) + ' €';
}

export const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};