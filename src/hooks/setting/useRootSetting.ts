import type { ProjectConfig } from '/#/config';

import { computed } from 'vue';

import { useAppStore } from '/@/store/app';
import { ThemeEnum } from '/@/enums/appEnum';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;
/** 单独把配置抽离 */
export function useRootSetting() {
  const appStore = useAppStore();
  // 页面加载状态
  const getPageLoading = computed(() => appStore.getPageLoading);
  // 是否缓存
  const getOpenKeepAlive = computed(() => appStore.getProjectConfig().openKeepAlive);
  // 主题色
  const getThemeColor = computed(() => appStore.getProjectConfig().themeColor);
  // 是否全屏
  const getFullContent = computed(() => appStore.getProjectConfig().fullContent);
  // 亮色 | 暗色主题
  const getDarkMode = computed(() => appStore.getDarkMode);

  const setRootSetting = (setting: Partial<RootSetting>) => {
    appStore.setProjectConfig(setting);
  };

  const setDarkMode = (mode: ThemeEnum) => {
    appStore.setDarkMode(mode);
  };

  return {
    setRootSetting,
    setDarkMode,

    getFullContent,
    getPageLoading,
    getOpenKeepAlive,
    getThemeColor,
    getDarkMode,
  };
}
