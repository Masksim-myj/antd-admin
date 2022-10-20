import type { RouteMeta } from 'vue-router';
import type { BasicResult } from '/@/api/model/baseModel';

export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
  hidden?: boolean;
  alwaysShow: boolean;
}

export interface getMenuListResultModel extends BasicResult {
  data: RouteItem[];
}

export type MenuParams = {
  menuName?: string;
  status?: string;
};
