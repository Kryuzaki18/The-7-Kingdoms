import { Layout } from '../types/layout';

const defLayout: Layout = 'grid';
const defPageSize: number = 20;

export const APP_SETTINGS = {
  layout: defLayout,
  pageSize: defPageSize,
} as const;
