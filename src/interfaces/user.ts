import { usableCountries } from "./countries";

export enum InputTypeEnums {
  Text = 'text',
  Select = 'select',
};

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
};

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
