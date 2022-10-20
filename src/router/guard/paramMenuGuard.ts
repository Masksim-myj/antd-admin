import type { Router } from 'vue-router';
import { configureDynamicParamsMenu } from '../helper/menuHelper';
import { Menu } from '../types';
import { usePermissionStore } from '/@/store/permission';

export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStore();
  router.beforeEach(async (to, _, next) => {
    // filter no name route
    if (!to.name) {
      next();
      return;
    }

    // menu has been built.
    if (!permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    let menus: Menu[] = [];
    menus = permissionStore.getMenuList();
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params));

    next();
  });
}
