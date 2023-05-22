
export const DIALOG_MODE = {
  view: 'view',
  edit: 'edit',
  delete: 'delete'
} as const;

export type DialogMode = keyof typeof DIALOG_MODE