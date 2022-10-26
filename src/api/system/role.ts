import { defHttp } from '/@/utils/axios';
import { PageParams, PageResultParams, SetRoleStatusParams } from './model/roleModel';

enum Api {
  GetRoleList = '/system/role/list',
  SetRoleStatus = '/system/role/changeStatus',
}

// 获取角色列表
export const getRoleList = (params: PageParams) =>
  defHttp.get<PageResultParams>({ url: Api.GetRoleList, params });

// 修改用户对应的状态
export const setRoleStatus = (params: SetRoleStatusParams) =>
  defHttp.put({ url: Api.SetRoleStatus, params });
