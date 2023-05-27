import type { TableHeaderItem } from "@/interfaces/table";


export const USER_TABLE_HEADER: TableHeaderItem[] = [
  {
    label: 'Username',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'First name',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'Last name',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'Phone',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'Email',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'Company Name',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'Created At',
    align: 'left',
    sortable: true,
    sortActive: true,
  },
  {
    label: 'Actions',
    align: 'right',
    sortable: false,
    sortActive: false,
  },
];
