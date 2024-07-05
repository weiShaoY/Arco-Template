import { computed } from 'vue'

import { useAppStore } from '@/store'

/**
 * 自定义 Hook，用于处理主题相关的逻辑
 * @returns  包含 isDark 计算属性的对象
 */
export default function useThemes() {
  const appStore = useAppStore() // 获取应用的存储对象

  /**
   * 计算属性，判断当前主题是否为暗黑模式
   * @returns {boolean} 如果主题是 'dark'，返回 true；否则返回 false
   */
  const isDark = computed(() => {
    return appStore.state.theme === 'dark' // 根据 appStore 的状态判断主题是否为暗黑模式
  })

  return {
    isDark, // 返回 isDark 计算属性
  }
}
