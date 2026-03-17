/*
 * @Author: Czy
 * @Date: 2025-01-20 10:53:35
 * @FilePath: /b2b-official-website/src/main.ts
 *
 */
import { createApp } from 'vue'
import './style.less'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import router from './router/index'
import store from './store'

import App from './App.vue'
//引入动画
// import "animate.css";

createApp(App).use(router).use(ArcoVue).use(ArcoVueIcon).use(store).mount('#app')
