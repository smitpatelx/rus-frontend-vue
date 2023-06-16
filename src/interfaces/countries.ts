import AllCountries from '@/assets/name_alpha2_calling_codes.json';

export interface Country {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
}

export const countries = AllCountries as Country[];

export const usableCountries: Record<string, Country> = AllCountries.reduce((acc, country) => {
  acc[country.alpha2Code?.toLowerCase()] = country;
  return acc;
}, {} as Record<string, Country>);

export const listOfCodes = countries.map((country) => country.alpha2Code);

export const getDialCode = (code: string) => {
  if (usableCountries[code] && usableCountries[code]?.callingCodes?.[0]) {
    return `+${usableCountries[code]?.callingCodes?.[0]}`;
  }
  return '';
};
