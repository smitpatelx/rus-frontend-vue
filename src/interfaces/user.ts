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
