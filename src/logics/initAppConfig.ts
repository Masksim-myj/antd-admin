/**
 * Application configuration
 */
import type { ProjectConfig } from '/#/config';

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';

// import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground';
// import { updateDarkTheme } from '/@/logics/theme/dark';
// import { changeTheme } from '/@/logics/theme';

import { useAppStore } from '/@/store/app';
// import { useLocaleStore } from '/@/store/locale';

import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env';

import { primaryColor } from '/@/settings/designSetting';
import { Persistent } from '/@/utils/cache/persistent';
import { merge } from 'lodash-es';
// import { ThemeEnum } from '/@/enums/appEnum';
import { ConfigProvider } from 'ant-design-vue';

// Initial project configuration
export function initAppConfigStore() {
  //   const localeStore = useLocaleStore();
  const appStore = useAppStore();
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = merge(projectSetting, projCfg || {});

  ConfigProvider.config({
    theme: { primaryColor: projCfg.themeColor },
  });
  console.log(projCfg);
  //   const darkMode = appStore.getDarkMode;
  //   const {
  //     themeColor,

  //     headerSetting: { bgColor: headerBgColor } = {},
  //     menuSetting: { bgColor } = {},
  //   } = projCfg;
  //   try {
  //     if (themeColor && themeColor !== primaryColor) {
  //       changeTheme(themeColor);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  appStore.setProjectConfig(projCfg);

  // init dark mode
  //   updateDarkTheme(darkMode);
  //   if (darkMode() === ThemeEnum.DARK) {
  //     updateHeaderBgColor();
  //     updateSidebarBgColor();
  //   } else {
  //     headerBgColor && updateHeaderBgColor(headerBgColor);
  //     bgColor && updateSidebarBgColor(bgColor);
  //   }
  // init store
  //   localeStore.initLocale();

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
