import type { TableHeaderItem } from "@/interfaces/table";


export const USER_TABLE_HEADER: TableHeaderItem[] = [
  {
    label: 'Username',
    align: 'left',
    sortable: true,
    sortActive: false,
    canHide: false,
  },
  {
    label: 'First name',
    align: 'left',
    sortable: true,
    sortActive: false,
    canHide: true,
  },
  {
    label: 'Last name',
    align: 'left',
    sortable: true,
    sortActive: false,
    canHide: true,
  },
  {
    label: 'Phone',
    align: 'left',
    sortable: true,
    sortActive: false,
    canHide: true,
  },
  {
    label: 'Email',
    align: 'left',
    sortable: true,
    sortActive: false,
    canHide: false,
  },
  {
    label: 'Company Name',
    align: 'left',
    sortable: true,
    sortActive: false,
    canHide: true,
  },
  {
    label: 'Created At',
    align: 'left',
    sortable: true,
    sortActive: true,
    canHide: true,
  },
  {
    label: 'Actions',
    align: 'right',
    sortable: false,
    sortActive: false,
    canHide: false,
  },
];
