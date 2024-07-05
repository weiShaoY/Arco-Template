import { createApp } from 'vue'

import ArcoVueIcon from '@arco-design/web-vue/es/icon'

import router from './router'

import store from './store'

import App from './App.vue'

import '@/components' // 引入全局组件

import '@unocss/reset/tailwind.css'

import './styles/main.css'

import 'uno.css'

// import './assets/style/index.less'

import './assets/style/global.less'

const app = createApp(App)

app.use(ArcoVueIcon)

app.use(router)

app.use(store)

app.mount('#app')
