import NProgress from 'nprogress';
import { router } from '/@/router';

export const install = () => {
  router.beforeEach((to, from) => {
    if (to.path !== from.path) {
      NProgress.start();
    }
  });
  router.afterEach(() => {
    NProgress.done();
  });
};
