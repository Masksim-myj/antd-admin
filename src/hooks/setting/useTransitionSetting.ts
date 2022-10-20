import type { TransitionSetting } from '/#/config';

import { computed } from 'vue';

import { useAppStore } from '/@/store/app';

export function useTransitionSetting() {
  const appStore = useAppStore();

  const getOpenNProgress = computed(() => appStore.getTransitionSetting().openNProgress);

  const getOpenPageLoading = computed(
    (): boolean => !!appStore.getTransitionSetting().openPageLoading,
  );

  const getBasicTransition = computed(() => appStore.getTransitionSetting().basicTransition);

  const setTransitionSetting = (transitionSetting: Partial<TransitionSetting>) => {
    appStore.setProjectConfig({ transitionSetting });
  };

  return {
    setTransitionSetting,

    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
