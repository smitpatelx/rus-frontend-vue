
export type TableAlign = 'left' | 'center' | 'right';
export type TableSortDirection = 'asc' | 'desc';

export interface TableHeaderItem {
  label: string;
  align: TableAlign;
  sortable: boolean;
  sortActive: boolean;
  canHide: boolean;
  sortDirection?: 'asc' | 'desc';
}

export type TableHeaderItems = TableHeaderItem[];
