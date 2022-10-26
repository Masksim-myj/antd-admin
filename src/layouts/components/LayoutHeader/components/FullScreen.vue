<template>
  <a-tooltip :title="getTitle">
    <div :class="getIcon" @click="toggle"></div>
  </a-tooltip>
</template>

<script setup lang="ts">
  const { t } = useI18n();
  const { toggle, isFullscreen } = useFullscreen();

  const getIcon = computed(() =>
    unref(isFullscreen)
      ? 'i-ant-design:fullscreen-exit-outlined'
      : 'i-ant-design:fullscreen-outlined',
  );
  const getTitle = computed(() =>
    unref(isFullscreen) ? t('header.tooltipExitFull') : t('header.tooltipEntryFull'),
  );
</script>
