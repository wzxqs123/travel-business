/*
 * @Author: Czy
 * @Date: 2025-01-20 17:24:26
 * @FilePath: /b2b-official-website/src/vite-env.d.ts
 *
 */
/// <reference types="vite/client" />
declare module "wow.js";
declare module "prerender-spa-plugin";
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
