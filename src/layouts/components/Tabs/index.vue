<template>
  <div class="layout-tabs">
    <a-tabs
      class="tabs"
      :activeKey="activeKeyRef"
      :hideAdd="true"
      type="editable-card"
      size="small"
      @change="handleChange"
      @edit="handleEdit"
    >
      <a-tab-pane key="1" tab="Tab 1"></a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2"></a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import { useGo } from '/@/utils/usePage';

  const permissionStore = usePermissionStore();
  const go = useGo();
  const router = useRouter();
  const activeKeyRef = ref('');
  const tabStore = useMultipleTabStore();
  console.log(permissionStore.getMenuList());
  const getTabsState = computed(() => {
    return tabStore.getTabList().filter((item) => !item.meta?.hideMenu);
  });
  const unClose = computed(() => unref(getTabsState).length === 1);

  const handleChange = (activeKey) => {
    activeKeyRef.value = activeKey;
    go(activeKey, false);
  };

  // Close the current tab
  const handleEdit = (targetKey: string) => {
    if (unref(unClose)) {
      return;
    }
    tabStore.closeTabByKey(targetKey, router);
  };
</script>

<style lang="less" scoped>
  .layout-tabs {
    @apply h-auto pt-2;
    line-height: 42px;
    background-color: #fff;

    .tabs {
      margin-left: 16px;
      ::v-deep(.ant-tabs-nav) {
        margin: 0;
      }

      ::v-deep(.ant-tabs-tab) {
        border-top: 2px solid #fff;
      }

      ::v-deep(.ant-tabs-tab):hover {
        padding: 0 30px 0 30px;
      }

      ::v-deep(.ant-tabs-tab-active) {
        border-top: 2px solid var(--ant-primary-color);
      }
    }
  }
</style>
