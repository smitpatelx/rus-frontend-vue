import { usableCountries } from "./countries";

export type InputTypes = 'text' | 'select';
export type FormField = {
  label: string;
  inputType: InputTypes;
  options?: Record<string, unknown>;
  getLabel?: (key: string) => string;
  getValue?: (key: string) => string;
};

export const editFormFields = {
  country: {
    label: 'Country',
    inputType: 'select',
    options: usableCountries,
    getLabel: (code: string) => usableCountries[code]?.name,
    getValue: (code: string) => code,
  },
  phone: {
    label: 'Phone',
    inputType: 'text',
  },
  firstName: {
    label: 'First name',
    inputType: 'text',
  },
  lastName: {
    label: 'Last name',
    inputType: 'text',
  },
  username: {
    label: 'Username',
    inputType: 'text',
  },
  email: {
    label: 'Email',
    inputType: 'text',
  },
  company: {
    label: 'Company',
    inputType: 'text',
  },
} as const;

export type EditFormFieldName = keyof typeof editFormFields;
export type EditFormField = Record<EditFormFieldName, string>;
