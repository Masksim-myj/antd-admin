import type { MenuSetting } from '/#/config';

import { computed, unref, ref } from 'vue';

import { useAppStore } from '/@/store/app';

const mixSideHasChildren = ref(false);

export function useMenuSetting() {
  const appStore = useAppStore();

  const getCollapsed = computed(() => appStore.getMenuSetting().collapsed);

  const getMenuHidden = computed(() => appStore.getMenuSetting().hidden);

  const getMenuTheme = computed(() => appStore.getMenuSetting().theme);

  const getMenuBgColor = computed(() => appStore.getMenuSetting().bgColor);

  const changeCollapsed = () => {
    appStore.getMenuSetting().collapsed = !appStore.getMenuSetting().collapsed;
  };

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    setMenuSetting,
    changeCollapsed,
    toggleCollapsed,

    getCollapsed,
    getMenuTheme,
    getMenuHidden,
    getMenuBgColor,
    mixSideHasChildren,
  };
}
