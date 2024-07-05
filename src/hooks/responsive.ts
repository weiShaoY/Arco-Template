import { onBeforeMount, onBeforeUnmount, onMounted } from 'vue' // 导入 Vue 的生命周期钩子函数

import { useDebounceFn } from '@vueuse/core' // 导入 vueuse 中的防抖函数

import { useAppStore } from '@/store' // 导入应用状态管理

import { addEventListen, removeEventListen } from '@/utils' // 导入事件监听器添加和移除工具函数

const WIDTH = 992 // 响应式断点宽度

/**
 * 检查设备类型
 * @returns {boolean} 是否为移动设备
 */
function queryDevice() {
  const rect = document.body.getBoundingClientRect() // 获取文档主体的边界矩形

  return rect.width - 1 < WIDTH // 判断设备宽度是否小于响应式断点宽度
}

/**
 * 自定义响应式 Hook
 * @param {boolean} immediate - 是否立即执行防抖函数
 */
export default function useResponsive(immediate?: boolean) {
  const appStore = useAppStore() // 获取应用状态管理实例

  /**
   * 窗口大小改变的处理函数
   */
  function resizeHandler() {
    if (!document.hidden) { // 检查文档是否隐藏
      const isMobile = queryDevice() // 查询是否为移动设备

      appStore.toggleDevice(isMobile ? 'mobile' : 'desktop') // 切换设备类型

      appStore.toggleMenu(isMobile) // 切换菜单显示状态
    }
  }

  const debounceFn = useDebounceFn(resizeHandler, 100) // 使用防抖函数包装窗口大小改变的处理函数

  onMounted(() => {
    if (immediate)
      debounceFn() // 组件挂载后，如果立即执行标志为真，则执行防抖函数
  })

  onBeforeMount(() => {
    addEventListen(window, 'resize', debounceFn) // 组件挂载前，添加窗口大小改变事件监听器
  })

  onBeforeUnmount(() => {
    removeEventListen(window, 'resize', debounceFn) // 组件卸载前，移除窗口大小改变事件监听器
  })
}
