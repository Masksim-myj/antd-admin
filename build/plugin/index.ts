import type { PluginOption } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import mkcert from "vite-plugin-mkcert";
import Unocss from "unocss/vite";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import Inspect from "vite-plugin-inspect";

import { configAutoImportPlugin } from "./autoImport";

export const createVitePlugins = (): PluginOption[] => [
  vue(),
  mkcert(),
  VueI18n({
    runtimeOnly: true,
    include: [path.resolve(process.cwd(), "locales/**")],
  }),
  Unocss(),
  ...configAutoImportPlugin(),
  Inspect(),
];
