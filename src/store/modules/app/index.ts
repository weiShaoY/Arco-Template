import { defineStore } from 'pinia'

import type { RouteRecordNormalized } from 'vue-router'

import { computed, ref } from 'vue'

import type { AppState } from './types'

import defaultSettings from '@/config/settings.json'

/**
 * 定义名为 'app' 的 store
 */
const useAppStore = defineStore('app', () => {
  /**
   * 定义 store 的状态
   */
  const state = ref<AppState>({ ...defaultSettings })

  /**
   * 获取当前应用设置
   */
  const appCurrentSetting = computed(() => ({ ...state.value }))

  /**
   * 获取当前设备类型
   */
  const appDevice = computed(() => state.value.device)

  /**
   * 获取异步加载的菜单
   */
  const appAsyncMenus = computed(() => state.value.serverMenu as unknown as RouteRecordNormalized[])

  /**
   * 更新应用设置
   * @param {Partial<AppState>} partial - 部分应用状态
   */
  function updateSettings(partial: Partial<AppState>) {
    // 使用 Object.assign 方法局部更新状态
    Object.assign(state.value, partial)
  }

  /**
   * 切换主题颜色
   * @param {boolean} dark - 是否为暗色主题
   */
  function toggleTheme(dark: boolean) {
    if (dark) {
      // 切换到暗色主题
      state.value.theme = 'dark'
      document.body.setAttribute('arco-theme', 'dark')
    }
    else {
      // 切换到亮色主题
      state.value.theme = 'light'
      document.body.removeAttribute('arco-theme')
    }
  }

  /**
   * 切换设备类型
   * @param {string} device - 设备类型
   */
  function toggleDevice(device: string) {
    state.value.device = device
  }

  /**
   * 切换菜单显示状态
   * @param {boolean} value - 菜单是否隐藏
   */
  function toggleMenu(value: boolean) {
    console.log('%c Line:74 🍏 value', 'color:#3f7cff', value)
    state.value.hideMenu = value
  }

  /**
   * 清空服务器菜单数据
   */
  function clearServerMenu() {
    state.value.serverMenu = []
  }

  return {
    state,
    appCurrentSetting,
    appDevice,
    appAsyncMenus,
    updateSettings,
    toggleTheme,
    toggleDevice,
    toggleMenu,
    clearServerMenu,
  }
})

export default useAppStore
