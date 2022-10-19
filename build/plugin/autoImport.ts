import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export const configAutoImportPlugin = () => [
  AutoImport({
    // 自动导入 vue vue-router @vueuse/head @vueuse/core
    imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
    vueTemplate: true,
    dirs: ['src/composables', 'src/store'],
    dts: 'types/auto-imports.d.ts',
  }),
  Components({
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: 'types/components.d.ts',
    resolvers: [IconsResolver(), AntDesignVueResolver({ importStyle: 'less' })],
  }),
  // 自动导入 icon
  Icons({
    autoInstall: true,
  }),
];
