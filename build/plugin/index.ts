import type { PluginOption } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import mkcert from 'vite-plugin-mkcert';
import Unocss from 'unocss/vite';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
// 用于读取 three.js 材质文件
import glsl from 'vite-plugin-glsl';

import Inspect from 'vite-plugin-inspect';

import { configAutoImportPlugin } from './autoImport';

export const createVitePlugins = (): PluginOption[] => [
  vue(),
  vueJsx(),
  mkcert(),
  VueI18n({
    runtimeOnly: true,
    include: [path.resolve(process.cwd(), 'locales/**')],
  }),
  Unocss(),
  glsl(),
  ...configAutoImportPlugin(),
  Inspect(),
];
