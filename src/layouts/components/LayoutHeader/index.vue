<template>
  <div class="h-full">
    <div class="flex-center-h-full">
      <div class="flex-center-h-full text-white">
        <div class="collapsedBtn flex-center-h-full" @click="menuSetting.changeCollapsed">
          <div class="text-lg" :class="unfoldClass"></div>
        </div>
        <a-breadcrumb class="breadcrumb" :routes="routes">
          <template #itemRender="{ route, routes, paths }">
            <span v-if="hasRedirect(routes, route)">
              {{ route.meta.title }}
            </span>
            <router-link v-else to="" @click="handleClick(route, paths, $event)">
              {{ route.meta.title }}
            </router-link>
          </template>
        </a-breadcrumb>
      </div>
      <rightHeader />
    </div>
    <Tabs />
  </div>
</template>

<script setup lang="ts">
  import type { RouteLocationMatched } from 'vue-router';
  import type { Menu } from '/@/router/types';

  import { isString } from 'lodash-es';
  import { useGo } from '/@/utils/usePage';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { REDIRECT_NAME } from '/@/router/constant';
  import rightHeader from './rightHeader.vue';
  import Tabs from '../Tabs/index.vue';
  import { filter } from '/@/utils/helper/treeHelper';
  import { getAllParentPath } from '/@/router/helper/menuHelper';

  const go = useGo();
  const menuSetting = useMenuSetting();
  const { currentRoute } = useRouter();
  const permissionStore = usePermissionStore();
  const routes = ref<RouteLocationMatched[]>([]);

  watchEffect(async () => {
    if (currentRoute.value.name === REDIRECT_NAME) return;
    const menus = permissionStore.getMenuList();
    console.log(menus);

    const routeMatched = currentRoute.value.matched;
    const cur = routeMatched?.[routeMatched.length - 1];
    let path = currentRoute.value.path;

    if (cur && cur?.meta?.currentActiveMenu) {
      path = cur.meta.currentActiveMenu as string;
    }

    const parent = getAllParentPath(menus, path);
    const filterMenus = menus.filter((item) => item.path === parent[0]);
    const matched = getMatched(filterMenus, parent) as any;

    if (!matched || matched.length === 0) return;

    const breadcrumbList = filterItem(matched);

    if (currentRoute.value.meta?.currentActiveMenu) {
      breadcrumbList.push({
        ...currentRoute.value,
        name: currentRoute.value.meta?.title || currentRoute.value.name,
      } as unknown as RouteLocationMatched);
    }
    console.log(breadcrumbList);
    routes.value = breadcrumbList;
  });

  function getMatched(menus: Menu[], parent: string[]) {
    const metched: Menu[] = [];
    menus.forEach((item) => {
      if (parent.includes(item.path)) {
        metched.push({
          ...item,
          name: (item.meta?.title as string) || item.name,
        });
      }
      if (item.children?.length) {
        metched.push(...getMatched(item.children, parent));
      }
    });
    return metched;
  }

  function filterItem(list: RouteLocationMatched[]) {
    return filter(list, (item) => {
      const { meta, name } = item;
      if (!meta) {
        return !!name;
      }
      const { title, hideBreadcrumb, hideMenu } = meta;
      if (!title || hideBreadcrumb || hideMenu) {
        return false;
      }
      return true;
    }).filter((item) => !item.meta?.hideBreadcrumb);
  }

  const hasRedirect = (routes: RouteLocationMatched[], route: RouteLocationMatched) => {
    return routes.indexOf(route) === routes.length - 1;
  };

  const unfoldClass = computed(() =>
    menuSetting.getCollapsed.value
      ? 'i-ant-design:menu-unfold-outlined'
      : 'i-ant-design:menu-fold-outlined',
  );

  const handleClick = (route: RouteLocationMatched, paths: string[], e: Event) => {
    e?.preventDefault();
    const { children, redirect, meta } = route;

    if (children?.length && !redirect) {
      e?.stopPropagation();
      return;
    }
    if (meta?.carryParam) {
      return;
    }

    if (redirect && isString(redirect)) {
      go(redirect);
    } else {
      let goPath = '';
      if (paths.length === 1) {
        goPath = paths[0];
      } else {
        const ps = paths.slice(1);
        const lastPath = ps.pop() || '';
        goPath = `${lastPath}`;
      }
      goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
      go(goPath);
    }
  };
</script>

<style lang="less" scoped>
  .flex-center-h-full {
    @apply flex items-center h-16 justify-between;
  }
  .collapsedBtn {
    @apply justify-center  w-9 cursor-pointer overflow-hidden;
  }
  .collapsedBtn:hover {
    background-color: #0f2438;
  }

  .breadcrumb {
    ::v-deep(.anticon),
    ::v-deep(.ant-breadcrumb-link),
    ::v-deep(.ant-breadcrumb-link > a),
    ::v-deep(.ant-breadcrumb-separator) {
      color: rgba(255, 255, 255, 0.65) !important;
      font-size: 14px;
    }
  }
</style>
