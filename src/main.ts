import { createApp } from 'vue';
import App from './App.vue';

import 'uno.css';
import 'nprogress/nprogress.css';
import 'ant-design-vue/dist/antd.variable.less';

import { createHead } from '@vueuse/head';
import { setupRouter, router } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { initAppConfigStore } from '/@/logics/initAppConfig';

const app = createApp(App);
// 配置 store
setupRouter(app);

Object.values(import.meta.glob<{ install: Fn }>('./modules/*.ts', { eager: true })).forEach((i) =>
  i.install?.(app),
);

// 初始化内部系统配置
initAppConfigStore();
// 路由守卫
// setupRouterGuard(router);
app.use(createHead());
app.mount('#app');
