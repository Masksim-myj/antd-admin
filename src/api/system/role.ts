import { defHttp } from '/@/utils/axios';
import {
  PageParams,
  PageResultParams,
  SetRoleStatusParams,
  GetSelectResult,
} from './model/roleModel';

enum Api {
  GetRoleList = '/system/role/list',
  SetRoleStatus = '/system/role/changeStatus',
  ControlRole = '/system/role',
  GetTreeSelect = '/system/menu/treeselect',
  RoleMenuTreeSelect = '/system/menu/roleMenuTreeselect/',
  RoleDeptTreeselect = '/system/dept/roleDeptTreeselect/',
}

// 获取角色列表
export const getRoleList = (params: PageParams) =>
  defHttp.get<PageResultParams>({ url: Api.GetRoleList, params });

// 修改用户对应的状态
export const setRoleStatus = (params: SetRoleStatusParams) =>
  defHttp.put({ url: Api.SetRoleStatus, params });

// 获取角色列表
export const getTreeSelect = () => defHttp.get({ url: Api.GetTreeSelect });

// 获取用户对应的菜单权限
export const getRoleMenuTreeSelect = (params: string) =>
  defHttp.get<GetSelectResult>({ url: Api.RoleMenuTreeSelect, params });

// 新增角色
export const addRole = (params) => defHttp.post({ url: Api.ControlRole, params });
// 修改角色
export const editRole = (params) => defHttp.put({ url: Api.ControlRole, params });
