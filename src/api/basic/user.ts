import type { ErrorMessageMode } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  GetPictureModel,
  getMenuListResultModel,
} from './model/userModel';

enum Api {
  Login = '/system/token/login', // 登录
  Logout = '/system/token/logout', // 退出登录
  GetUserInfo = '/system/user/getInfo', // 获取用户信息
  GetPictureCode = '/code',
  GetMenuList = '/system/menu/getRouters',
}
/** 登录表单提交 */
export const loginApi = (params: LoginParams, mode: ErrorMessageMode = 'modal') =>
  defHttp.post<LoginResultModel>({ url: Api.Login, params }, { errorMessageMode: mode });
/** 获取用户信息 */
export const getUserInfoAsync = () => defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
/** 退出登录 */
export const doLogout = () => defHttp.delete({ url: Api.Logout });
/** 获取图片验证码 */
export const getPictureCode = () => defHttp.get<GetPictureModel>({ url: Api.GetPictureCode });
/** 获取路由菜单列表 */
export const getMenuList = () => defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
