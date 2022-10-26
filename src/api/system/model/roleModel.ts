export interface PageParams {
  pageNum?: number;
  pageSize: number;
}

export interface PageResultParams {
  currentPage: number;
  rows: [];
  total: number;
  totalPage: number;
}

export interface SetRoleStatusParams {
  roleId: number;
  status: string;
}
