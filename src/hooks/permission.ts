import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

import { useUserStore } from '@/store'

/**
 *  使用权限
 */
export default function usePermission() {
  const userStore = useUserStore()

  return {
    /**
     *  检查路由是否可以访问
     *  @param {RouteLocationNormalized | RouteRecordRaw} route - 路由对象
     *  @returns {boolean} 是否可以访问
     */
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return !!(
        !route.meta?.requiresAuth // 不需要认证的路由直接可访问
        || !route.meta?.roles // 没有指定角色要求的路由直接可访问
        || route.meta?.roles === -1 // 包含通配角色的路由直接可访问
        || (typeof route.meta?.roles === 'number' && userStore.userInfo.auth.includes(route.meta.roles))
      )
    },

    /**
     *  查找第一个具有权限的路由
     *  @param {Array<RouteRecordRaw>} _routers - 路由列表
     *  @param {string} role - 用户角色
     *  @returns {RouteLocationNormalized | null} 第一个具有权限的路由
     */
    findFirstPermissionRoute(_routers: any, role = 'admin') {
      const cloneRouters = [..._routers]

      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()

        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role)
          })
        ) {
          return { name: firstElement.name }
        } // 返回第一个具有权限的路由名称

        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children)
        }
      }

      return null // 没有找到具有权限的路由
    },

    // 您可以添加任何其他规则
  }
}
