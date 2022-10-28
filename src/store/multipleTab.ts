import type { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router';
import { defineStore } from 'pinia';
import { useGo } from '/@/utils/usePage';
import projectSetting from '/@/settings/projectSetting';
import { MULTIPLE_TABS_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { PageEnum } from '/@/enums/pageEnum';

interface MultipleTabState {
  cacheTabList: Set<string>;
  tabList: RouteLocationNormalized[];
  lastDragEndIndex: number;
}

const cacheTab = projectSetting.multiTabsSetting.cache;

const handleGotoPage = (router: Router) => {
  const go = useGo(router);
  go(unref(router.currentRoute).path, true);
};

export const useMultipleTabStore = defineStore('app-multiple-tab', () => {
  const state = reactive<MultipleTabState>({
    cacheTabList: new Set(),
    tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
    // Index of the last moved tab
    lastDragEndIndex: 0,
  });
  // 获取当前 tabs
  const getTabList = (): RouteLocationNormalized[] => state.tabList;
  // 获取缓存列表中的 tabs
  const getCachedTabList = (): string[] => Array.from(state.cacheTabList);
  const getLastDragEndIndex = (): number => state.lastDragEndIndex;

  const getToTarget = (tabItem: RouteLocationNormalized) => {
    const { params, path, query } = tabItem;
    return {
      params: params || {},
      path,
      query: query || {},
    };
  };

  const closeTab = async (tab: RouteLocationNormalized, router: Router) => {
    const close = (route: RouteLocationNormalized) => {
      const { fullPath, meta: { affix } = {} } = route;
      if (affix) {
        return;
      }
      const index = state.tabList.findIndex((item) => item.fullPath === fullPath);
      index !== -1 && state.tabList.splice(index, 1);
    };

    const { currentRoute, replace } = router;

    const { path } = unref(currentRoute);
    if (path !== tab.path) {
      // Closed is not the activation tab
      close(tab);
      return;
    }

    // Closed is activated atb
    let toTarget: RouteLocationRaw = {};

    const index = state.tabList.findIndex((item) => item.path === path);

    // If the current is the leftmost tab
    if (index === 0) {
      if (state.tabList.length === 1) {
        toTarget = PageEnum.BASE_HOME;
      } else {
        //  Jump to the right tab
        const page = state.tabList[index + 1];
        toTarget = getToTarget(page);
      }
    } else {
      // Close the current tab
      const page = state.tabList[index - 1];
      toTarget = getToTarget(page);
    }
    close(currentRoute.value);
    await replace(toTarget);
  };
  const closeTabByKey = async (key: string, router: Router) => {
    const index = state.tabList.findIndex((item) => (item.fullPath || item.path) === key);
    if (index !== -1) {
      await closeTab(state.tabList[index], router);
      const { currentRoute, replace } = router;
      // 检查当前路由是否存在于tabList中
      const isActivated = state.tabList.findIndex((item) => {
        return item.fullPath === currentRoute.value.fullPath;
      });
      // 如果当前路由不存在于TabList中，尝试切换到其它路由
      if (isActivated === -1) {
        let pageIndex;
        if (index > 0) {
          pageIndex = index - 1;
        } else if (index < state.tabList.length - 1) {
          pageIndex = index + 1;
        } else {
          pageIndex = -1;
        }
        if (pageIndex >= 0) {
          const page = state.tabList[index - 1];
          const toTarget = getToTarget(page);
          await replace(toTarget);
        }
      }
    }
  };

  return {
    getTabList,
    getCachedTabList,
    getLastDragEndIndex,

    closeTabByKey,
  };
});
