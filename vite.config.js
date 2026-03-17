/*
 * @Author: Czy
 * @Date: 2025-01-20 10:53:35
 * @FilePath: /travel-business/vite.config.js
 *
 */
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
// import PrerenderSpaPlugin from "prerender-spa-plugin";
// import path from "path";
// https://vite.dev/config/
var proxyUrl = 'http://b2b-gw.qc.arltr.cn'
const proxyUrlZS = 'http://sztripwise.hoimore.com'
// const testUrl = 'https://b2b-website.qc.arltr.cn'
// const testUrl = 'http://192.168.10.144:8080'
const testUrl = 'http://127.0.0.1:4523/m1/5755873-5439120-6db2620e'
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: ['./src/composables', './src/utils'],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    // new PrerenderSpaPlugin({
    //   staticDir: path.join(__dirname, "dist"),
    //   routes: ["/", "/home", "/test", "/about"],
    //   renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
    //     timeout: 0,
    //     maxConcurrentRoutes: 1,
    //     renderAfterTime: 5000,
    //     headless: false,
    //   }),
    // }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'arcoblue-6': '#165DFF',
          'primary-6': 'rgb(var(--arcoblue-6))',
          'primary-color': 'rgb(var(--arcoblue-6))',
          'success-color': 'rgb(var(--green-6))',
          'warn-color': 'rgb(var(--red-6))',
          'error-color': 'rgb(var(--red-6))',
          'border-color-base': '#F3F4F8',
          'warning-color': '#faad14',
          'text-color-second': 'var(--color-neutral-6)',
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        token: path.resolve(__dirname, 'token.html'),
        index: path.resolve(__dirname, 'index.html'),
      },
      output: {
        dir: path.resolve(__dirname, './dist'),
      },
    },
  },
  server: {
    host: true,
    open: true,
    proxy: {
      // '^/app/b2b/reconciliation': {
      //   // target: 'http://192.168.8.34:8055',
      //   target: testUrl,
      //   changeOrigin: true,
      //   rewrite: (path) => {
      //     return path.replace(/^\/app\/b2b\/reconciliation/, '')
      //   },
      // },
      '^/app': {
        target: proxyUrl,
        // target: 'https://jms.hitrips.cn',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
