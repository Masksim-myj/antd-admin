import type { RouteMeta } from 'vue-router';
import type { UserInfo } from '/#/store';

export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

export interface GetUserInfoModel {
  user: UserInfo;
}

export interface LoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

export interface LoginResultModel {
  access_token: string;
  expires_in: number;
}

export interface GetPictureModel {
  captchaOnOff: boolean;
  code: number;
  img: string;
  msg: string;
  uuid: string;
}
export type getMenuListResultModel = RouteItem[];
