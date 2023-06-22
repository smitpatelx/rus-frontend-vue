export enum TableAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum TableSortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum TableHeaderItemKey {
  Username = 'username',
  FirstName = 'first_name',
  LastName = 'last_name',
  Roles = 'roles',
  Phone = 'phone',
  Email = 'email',
  CompanyName = 'company_name',
  CreatedAt = 'created_at',
  Actions = 'actions',
}

export interface TableHeaderItem {
  key: TableHeaderItemKey;
  label: string;
  align: TableAlign;
  sortable: boolean;
  sticky?: boolean;
  canHide: boolean;
  sortDirection?: TableSortDirection | null;
}

export type TableHeaderItems = TableHeaderItem[];

export type Options = {
  name: string;
  value: string;
}[];
