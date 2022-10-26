<template>
  <div class="h-12 flex items-center cursor-pointer">
    <img :class="getLoginClass" src="/images/basic/logo.png" />
    <span v-if="!menuSetting.getCollapsed.value" class="text-white text-lg font-bold"
      >NG EVmate</span
    >
  </div>
  <a-menu
    class="h-full"
    v-model:selected-keys="state.selectedKeys"
    mode="inline"
    theme="dark"
    forceSubMenuRender
    :open-keys="state.openKeys"
    @openChange="onOpenChange"
  >
    <SubMenu v-for="item in MenuList" :item="item" />
  </a-menu>
</template>

<script setup lang="ts">
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import SubMenu from './SubMenu.vue';

  const permissionStore = usePermissionStore();
  const menuSetting = useMenuSetting();
  //   const app = useAppStore();
  const { currentRoute } = useRouter();
  const cureentRoutePath = computed(() => currentRoute.value.path);
  const state = reactive({
    rootSubmenuKeys: [] as string[],
    openKeys: [] as string[],
    selectedKeys: [] as string[],
  });
  const MenuList = computed(() => {
    permissionStore.getMenuList().map((item) => {
      state.rootSubmenuKeys.push(item.name);
    });
    return permissionStore.getMenuList();
  });

  const getLoginClass = computed(() => {
    return menuSetting.getCollapsed.value ? 'w-6 h-6 m-l-3' : 'w-8 h-8 mr-2 ml-4';
  });

  onMounted(() => {
    const fatherName = titleCase(cureentRoutePath.value.split('/')[1]);
    state.openKeys.push(fatherName);
    state.selectedKeys.push(cureentRoutePath.value.split('/')[2]);
  });

  const titleCase = (str: string): string =>
    str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
    if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      state.openKeys = openKeys;
    } else {
      state.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
  };
</script>
