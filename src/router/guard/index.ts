import type { Router } from 'vue-router'

import setupUserLoginInfoGuard from './userLoginInfo'

import setupPermissionGuard from './permission'

import { setRouteEmitter } from '@/utils/route-listener'

/**
 * 设置页面守卫
 * @param {Router} router - 路由器实例
 */
function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // 触发路由变更事件
    setRouteEmitter(to)
  })
}

/**
 * 创建并设置路由守卫
 * @param {Router} router - 路由器实例
 */
export default function createRouteGuard(router: Router) {
  // 设置页面守卫
  setupPageGuard(router)

  // 设置用户登录信息守卫
  setupUserLoginInfoGuard(router)

  // 设置权限守卫
  setupPermissionGuard(router)
}
