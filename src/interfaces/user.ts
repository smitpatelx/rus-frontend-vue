import { usableCountries } from './countries';
import zod from 'zod';

export enum InputTypeEnums {
  Text = 'text',
  Select = 'select',
}

export type FormField = {
  label: string;
  inputType: InputTypeEnums;
  options?: Record<string, unknown>;
  getLabel?: (key: string) => string;
  getValue?: (key: string) => string;
};

export enum EditFormKeys {
  Country = 'country',
  Phone = 'phone',
  FirstName = 'firstName',
  LastName = 'lastName',
  Username = 'username',
  Email = 'email',
  Company = 'company',
}

export const editFormFields: Record<EditFormKeys, FormField> = {
  [EditFormKeys.Country]: {
    label: 'Country',
    inputType: InputTypeEnums.Select,
    options: usableCountries,
    getLabel: (code: string) => usableCountries[code]?.name,
    getValue: (code: string) => code,
  },
  [EditFormKeys.Phone]: {
    label: 'Phone',
    inputType: InputTypeEnums.Text,
  },
  [EditFormKeys.FirstName]: {
    label: 'First name',
    inputType: InputTypeEnums.Text,
  },
  [EditFormKeys.LastName]: {
    label: 'Last name',
    inputType: InputTypeEnums.Text,
  },
  [EditFormKeys.Username]: {
    label: 'Username',
    inputType: InputTypeEnums.Text,
  },
  [EditFormKeys.Email]: {
    label: 'Email',
    inputType: InputTypeEnums.Text,
  },
  [EditFormKeys.Company]: {
    label: 'Company',
    inputType: InputTypeEnums.Text,
  },
};

export type EditFormField = Record<EditFormKeys, string>;

export interface User {
  roles: string[];
  username: string;
  id: number;
  first_name: string;
  last_name: string;
  user_registered: string;
  email: string;
  billing_company: string;
  billing_address_1: string;
  billing_city: string;
  billing_state: string;
  billing_postcode: string;
  billing_country: string;
  billing_phone: string;
}

export type GetAllUserRes = User[];

export type GetUserRes = User;

export const formValidation = zod.object({
  username: zod
    .string()
    .trim()
    .nonempty('Username is required.')
    .min(3, 'Username must be more than 3 characters.')
    .max(30, 'Username must be less than 30 characters.'),
  email: zod
    .string()
    .trim()
    .nonempty('Email is required.')
    .email('Please enter a valid email address.'),
  firstName: zod
    .string()
    .trim()
    .nonempty('First name is required.')
    .regex(new RegExp(/^[a-zA-Z]+$/, 'g'), 'First name must be letters only.')
    .max(40, 'First name must be less than 40 characters.'),
  lastName: zod
    .string()
    .trim()
    .nonempty('Last name is required.')
    .regex(new RegExp(/^[a-zA-Z]+$/, 'g'), 'Last name must be letters only.')
    .max(40, 'Last name must be less than 40 characters.'),
  phone: zod
    .string()
    .trim()
    .nonempty('Phone number is required.')
    .min(12, 'Phone number must be 10 digits.')
    .max(12, 'Phone number must be 10 digits.'),
  company: zod
    .string()
    .trim()
    .nonempty('Company name is required.')
    .min(1, 'Company name must be more than 1 characters.')
    .max(40, 'Company name must be less than 40 characters.'),
  country: zod
    .string()
    .trim()
    .nonempty('Country code is required.')
    .regex(new RegExp(/^[a-z]{2}$/, 'g'), 'Country code must be 2 lower-case letters.'),
});

export interface EditUserReq {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  company: string;
  billing_country: string;
}

export interface EditUserRes {
  message: string;
}
