/* eslint-disable @typescript-eslint/no-explicit-any */

// Table
export type CustomTabPanelType = {
  label: string;
  locale?: string;
  component: React.ComponentType<any> | React.FC<any>;
  data?: any;
};

export type tableRowsType = {
  [key: string]: any;
};

export type TableColsType = {
  name: string;
  locale?: string;
  render: (value: any, id?: any) => JSX.Element;
  comparator?: (a: any, b: any) => number;
};

export type TableDataType = {
  cols: TableColsType[];
  rows: tableRowsType[];
  toolbar?: React.ReactNode;
};

// Kanban

export type KanbanCardType = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  assignedTo?: string;
  dueDate?: string;
};

export type KanbanColumnType = {
  id: string;
  title: string;
  cards: KanbanCardType[];
};

export type KanbanBoardType = {
  columns: KanbanColumnType[];
};
