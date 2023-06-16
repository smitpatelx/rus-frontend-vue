export const randomAlpha = (): string => {
  const length = 9;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Formats given date to Indian Standard Date format.
 * Use: IN_DATE.format(new Date())
 */
export const IN_DATE = Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

/**
 * Formats given date to US Standard Date format.
 * Use: US_DATE.format(new Date())
 */
export const US_DATE = Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

/**
 * Format phone number
 * From: 2345367886
 * To: 234-536-7886
 */
export const formatPhone = (phone: string) => {
  const areaCode = phone.slice(0, 3);
  const firstThree = phone.slice(3, 6);
  const lastFour = phone.slice(6, 10);

  return `${areaCode}-${firstThree}-${lastFour}`;
};
