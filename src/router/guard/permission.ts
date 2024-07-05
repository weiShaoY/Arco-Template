import type { Router } from 'vue-router'

import NProgress from 'nprogress' // 导入进度条插件

import { appRoutes } from '../routes' // 导入应用路由配置

import { NOT_FOUND } from '../constants' // 导入白名单和 404 路由配置

import usePermission from '@/hooks/permission' // 导入权限相关的 hook

import { useUserStore } from '@/store' // 导入用户和应用存储

/**
 * 设置权限守卫
 * @param {Router} router - 路由器实例
 */
export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    /**
     *  权限处理实例
     */
    const Permission = usePermission()

    /**
     *  检查当前路由是否有权限访问
     */
    const permissionsAllow = Permission.accessRouter(to)

    if (permissionsAllow) {
      next() // 如果有权限访问，继续导航
    }
    else {
      const destination
        = Permission.findFirstPermissionRoute(appRoutes, userStore.role)
        || NOT_FOUND

      next(destination) // 导航到第一个有权限访问的路由或 404 页面
    }

    NProgress.done() // 结束进度条
  })
}
