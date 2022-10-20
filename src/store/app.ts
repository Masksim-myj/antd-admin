import type { ProjectConfig } from '/#/config';
import type { BeforeMiniState } from '/#/store';

import { acceptHMRUpdate, defineStore } from 'pinia';
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { ThemeEnum } from '/@/enums/appEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { merge } from 'lodash-es';
import { resetRouter } from '/@/router';

let timeId: TimeoutHandle;

export const useAppStore = defineStore('app', () => {
  const state = reactive({
    darkMode: ThemeEnum.LIGHT,
    pageLoading: false,
    projectConfig: (Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig) || {},
    beforeMiniInfo: {},
  });
  // 获取页面 loading 状态
  const getPageLoading = () => state.pageLoading;
  // 获取页面模式配置 'light' | 'dark'
  const getDarkMode = () => state.darkMode;
  // 获取页面变化/缩小前配置
  const getBeforeMiniInfo = () => state.beforeMiniInfo;
  // 获取项目所有配置
  const getProjectConfig = () => state.projectConfig;
  // 获取头部设置配置
  const getHeaderSetting = () => state.projectConfig.headerSetting;
  // 获取菜单配置
  const getMenuSetting = () => state.projectConfig.menuSetting;
  // 获取 切换场景 配置
  const getTransitionSetting = () => state.projectConfig.transitionSetting;
  // 获取多tabs页配置
  const getMultiTabsSetting = () => state.projectConfig.multiTabsSetting;

  // 设置页面加载状态
  const setPageLoading = (loading: boolean) => {
    state.pageLoading = loading;
  };
  // 设置页面模式配置
  const setDarkMode = (mode: ThemeEnum) => {
    state.darkMode = mode;
  };
  // 记录页面变化前配置
  const setBeforeMiniInfo = (beforeMiniInfo: BeforeMiniState) => {
    state.beforeMiniInfo = beforeMiniInfo;
  };
  // 配置钩子在 hooks/setting 这里只做缓存
  const setProjectConfig = (config: DeepPartial<ProjectConfig>) => {
    state.projectConfig = merge(state.projectConfig || {}, config);
    Persistent.setLocal(PROJ_CFG_KEY, state.projectConfig);
  };

  // 重置 state
  const resetAllState = async () => {
    resetRouter();
    Persistent.clearAll();
  };

  const setPageLoadingAction = async (loading: boolean) => {
    if (loading) {
      clearTimeout(timeId);
      // Prevent flicker
      timeId = setTimeout(() => {
        setPageLoading(loading);
      }, 50);
    } else {
      setPageLoading(loading);
      clearTimeout(timeId);
    }
  };

  return {
    getPageLoading,
    getDarkMode,
    getProjectConfig,
    getTransitionSetting,
    getMultiTabsSetting,
    getHeaderSetting,
    getBeforeMiniInfo,
    getMenuSetting,

    setPageLoading,
    setDarkMode,
    setBeforeMiniInfo,
    setProjectConfig,
    setPageLoadingAction,

    resetAllState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
