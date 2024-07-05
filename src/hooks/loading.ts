import { ref } from 'vue' // 从 'vue' 导入 ref 函数

/**
 * 自定义 Hook，用于管理加载状态
 * @param {boolean} [initValue] 初始化加载状态的值，默认为 false
 * @returns {object} 包含 loading 状态和控制该状态的方法的对象
 */
export default function useLoading(initValue = false) {
  /**
   *  加载状态
   */
  const loading = ref(initValue)

  /**
   * 设置加载状态
   * @param {boolean} value 要设置的加载状态值
   */
  const setLoading = (value: boolean) => {
    loading.value = value // 更新 loading 的值
  }

  /**
   * 切换加载状态
   */
  const toggle = () => {
    loading.value = !loading.value
  }

  return {
    loading,
    setLoading,
    toggle,
  }
}
