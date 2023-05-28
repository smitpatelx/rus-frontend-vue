
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
  sortActive: boolean;
  canHide: boolean;
  sortDirection?: TableSortDirection;
}

export type TableHeaderItems = TableHeaderItem[];

export type Options = {
  name: string,
  value: string,
}[];
