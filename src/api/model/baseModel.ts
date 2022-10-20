export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface BasicPageParams {
  pageNum: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface BasicResult {
  code: number;
  msg: string;
}
