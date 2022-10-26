<template>
  <a-layout class="h-screen">
    <a-layout-sider
      v-model:collapsed="menuSetting.getCollapsed.value"
      :trigger="null"
      collapsible
      class="layout-side-bar"
      :collapsedWidth="48"
    >
      <Menu />
    </a-layout-sider>
    <a-layout :style="getRightContainerStyle">
      <a-layout-header class="p-0!"> <Header /> </a-layout-header>
      <a-layout-content class="layout-content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import Menu from './components/Menu/index.vue';
  import Header from './components/LayoutHeader/index.vue';
  const menuSetting = useMenuSetting();
  const getRightContainerStyle = computed(() =>
    menuSetting.getCollapsed.value ? 'margin-left: 48px;' : 'margin-left: 200px;',
  );
</script>

<style lang="less" scoped>
  .layout-side-bar {
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
  }

  .layout-side-bar::-webkit-scrollbar {
    display: none;
  }

  .layout-content {
    padding: 24px 16px;
  }
</style>
