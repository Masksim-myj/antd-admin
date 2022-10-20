<template>
  <a-config-provider>
    <RouterView />
    <a-button class="hidden!" type="primary">解决 vite 插入编译问题</a-button>
  </a-config-provider>
</template>

<script setup lang="ts">
  import { ConfigProvider } from 'ant-design-vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  const setting = useRootSetting();

  ConfigProvider.config({
    theme: { primaryColor: setting.getThemeColor.value },
  });

  useHead({ title: 'NG Admin' });
</script>
