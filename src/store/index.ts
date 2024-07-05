import { createPinia } from 'pinia'

import { createPersistedState } from 'pinia-plugin-persistedstate'

import useAppStore from './modules/app'

import useUserStore from './modules/user'

import useTabBarStore from './modules/tab-bar';


const pinia = createPinia()

pinia.use(
  createPersistedState(), // 持久化 pinia
)

export { useAppStore, useUserStore, useTabBarStore }

export default pinia
