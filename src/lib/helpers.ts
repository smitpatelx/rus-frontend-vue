
export const randomAlpha = (): string => {
  const length=9;
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let result           = '';

  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const formatDateToDDMMYYYY = (date: Date): string => {
  const newDate = date.toLocaleString('en-CA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return newDate;
}

