import type { App } from 'vue';
import VXETable from 'vxe-table';

export const install = (app: App) => {
  VXETable.setup({
    table: {
      border: true,
      showOverflow: true,
    },
  });
  app.use(VXETable);
};
