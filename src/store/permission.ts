import type { AppRouteRecordRaw, Menu } from '/@/router/types';

import { acceptHMRUpdate, defineStore } from 'pinia';
import { PageEnum } from '/@/enums/pageEnum';
import { useMessage } from '/@/utils/useMessage';
import { i18n } from '/@/modules/i18n';
import { getBackMenuList } from '/@/api/basic/menu';
import { transformRouteToMenu } from '/@/router/helper/menuHelper';
import { transformObjToRoute } from '/@/router/helper/routeHelper';

interface PermissionState {
  isDynamicAddedRoute: boolean;
  lastBuildMenuTime: number;
  menuList: Menu[];
}
export const usePermissionStore = defineStore('app-permission', () => {
  const state = reactive<PermissionState>({
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // 后台菜单列表
    menuList: [],
  });

  const getMenuList = () => state.menuList;
  const getLastBuildMenuTime = () => state.lastBuildMenuTime;
  const getIsDynamicAddedRoute = () => state.isDynamicAddedRoute;

  const setLastBuildMenuTime = () => {
    state.lastBuildMenuTime = new Date().getTime();
  };

  const setMenuList = (list: Menu[]) => {
    state.menuList = list;
    list?.length > 0 && setLastBuildMenuTime();
  };

  const setDynamicAddedRoute = (added: boolean) => {
    state.isDynamicAddedRoute = added;
  };

  // 构建路由
  const buildRoutesAction = async (): Promise<AppRouteRecordRaw[]> => {
    let routes: AppRouteRecordRaw[] = [];

    /**
     * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
     * */

    const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
      if (!routes || routes.length === 0) return;
      let homePath: string = PageEnum.BASE_HOME;

      function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
        if (parentPath) parentPath = parentPath + '/';
        routes.forEach((route: AppRouteRecordRaw) => {
          const { path, children, redirect } = route;
          const currentPath = path.startsWith('/') ? path : parentPath + path;
          if (currentPath === homePath) {
            if (redirect) {
              homePath = route.redirect! as string;
            } else {
              route.meta = Object.assign({}, route.meta, { affix: true });
              throw new Error('end');
            }
          }
          children && children.length > 0 && patcher(children, currentPath);
        });
      }

      try {
        patcher(routes);
      } catch (e) {
        // 已处理完毕跳出循环
      }
      return;
    };

    const { createMessage } = useMessage();
    createMessage.loading({
      content: i18n.global.t('app.menuLoading'),
      duration: 1,
    });

    let result = await getBackMenuList();
    let routeList = result.data;
    routeList = transformObjToRoute(routeList);
    //  后台路由到菜单结构
    const menuList = transformRouteToMenu(routeList);
    setMenuList(menuList as Menu[]);

    patchHomeAffix(routes);
    return routes;
  };

  const resetState = () => {
    state.isDynamicAddedRoute = false;
    state.lastBuildMenuTime = 0;
    state.menuList = [];
  };

  return {
    getMenuList,
    getLastBuildMenuTime,
    getIsDynamicAddedRoute,

    setMenuList,
    setDynamicAddedRoute,
    buildRoutesAction,
    resetState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
