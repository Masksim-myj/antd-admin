import type { BasicResult } from '/@/api/model/baseModel';
import type { getMenuListResultModel, MenuParams } from './model/menuModel';
import { defHttp } from '/@/utils/axios';
// import { menuList } from './menulist';

enum Api {
  GetMenuList = '/system/menu/getRouters',
  List = '/system/menu/list',
  Menu = '/system/menu/',
}

/**
 * @description: Get user menu based on id
 */

export const getBackMenuList = () => defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });

export const getList = (params?: MenuParams) =>
  defHttp.get<getMenuListResultModel>({ url: Api.List, params });

export const deleteList = (id: number) => {
  defHttp.delete<BasicResult>({ url: Api.Menu + id });
};

export const addMenu = (params) => {
  defHttp.post<BasicResult>({ url: Api.Menu, params });
};

export const setMenu = (params) => {
  defHttp.put<BasicResult>({ url: Api.Menu, params });
};
