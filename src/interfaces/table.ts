
export type TableAlign = 'left' | 'center' | 'right';
export type TableSortDirection = 'asc' | 'desc';

export interface TableHeaderItem {
  label: string;
  align: TableAlign;
  sortable: boolean;
  sortActive: boolean;
  sortDirection?: 'asc' | 'desc';
}

export type TableHeaderItems = TableHeaderItem[];s
