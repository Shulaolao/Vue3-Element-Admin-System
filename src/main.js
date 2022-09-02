import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'modern-css-reset/src/reset.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { i18n } from './locales/i18n.js'
import myDirectives from '@/directive/index.js'
import registerCom from './icons/index.js'

import './permission.js'

import mockXHR from '@/mock/index.js'
mockXHR()

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 批量注册全局指令
// myDirectives(app)

// 注册全局组件 svg-icon
registerCom(app)

// use 可用来注册插件、自定义指令、组件等，此处为自定义指令
app.use(store).use(router).use(ElementPlus).use(i18n).use(myDirectives).mount('#app')
