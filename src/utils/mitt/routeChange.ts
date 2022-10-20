/**
 * 用于监视路由更改，以更改菜单和选项卡的状态。不需要监视路由，
 * 因为路由状态的更改会受到页面呈现时间的影响，而页面呈现时间会很慢
 */

import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import mitt from './mitt';

const emitter = mitt();

const key = Symbol();

let lastChangeTab: RouteLocationNormalized;

function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  // 与给定路由地址匹配的标准化的路由记录数组
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute);
  emitter.emit(key, r);
  lastChangeTab = r;
}

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true,
) {
  emitter.on(key, callback);
  immediate && lastChangeTab && callback(lastChangeTab);
}

export function removeTabChangeListener() {
  emitter.clear();
}
