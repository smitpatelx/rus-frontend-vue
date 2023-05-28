import { TableHeaderItemKey, TableAlign, type Options } from "@/interfaces/table";
import type { TableHeaderItem } from "@/interfaces/table";

export const USER_TABLE_HEADER: TableHeaderItem[] = [
  {
    key: TableHeaderItemKey.Username, // 'key' is used to identify the column in the table
    label: 'Username',
    align: TableAlign.Left,
    sortable: true,
    sortActive: false,
    canHide: false,
  },
  {
    key: TableHeaderItemKey.FirstName,
    label: 'First name',
    align: TableAlign.Left,
    sortable: true,
    sortActive: false,
    canHide: true,
  },
  {
    key: TableHeaderItemKey.LastName,
    label: 'Last name',
    align: TableAlign.Left,
    sortable: true,
    sortActive: false,
    canHide: true,
  },
  {
    key: TableHeaderItemKey.Phone,
    label: 'Phone',
    align: TableAlign.Left,
    sortable: true,
    sortActive: false,
    canHide: true,
  },
  {
    key: TableHeaderItemKey.Email,
    label: 'Email',
    align: TableAlign.Left,
    sortable: true,
    sortActive: false,
    canHide: false,
  },
  {
    key: TableHeaderItemKey.CompanyName,
    label: 'Company Name',
    align: TableAlign.Left,
    sortable: true,
    sortActive: false,
    canHide: true,
  },
  {
    key: TableHeaderItemKey.CreatedAt,
    label: 'Created At',
    align: TableAlign.Left,
    sortable: true,
    sortActive: true,
    canHide: true,
  },
  {
    key: TableHeaderItemKey.Actions,
    label: 'Actions',
    align: TableAlign.Right,
    sortable: false,
    sortActive: false,
    canHide: false,
  },
];

export const optionsForView: Options = USER_TABLE_HEADER.filter((header) => {
  return header.canHide;
}).map((header) => {
  return {
    name: header.label,
    value: header.key,
  };
});