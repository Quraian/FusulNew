import { PaginationMetaData } from '@fusul/common';
import { Status } from './types';

export interface AsyncOp<T> {
  status: Status;
  result: T;
  errorMessage?: string;
}

export interface ListQuery {
  perPage?: number;
  page: number | null;
  filter?: number[];
}

export interface ListResponse<T> {
  data: T[];
  meta: PaginationMetaData;
}
