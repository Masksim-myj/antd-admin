import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

export const install = (app: App) => {
  app.use(store);
};
