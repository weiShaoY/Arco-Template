import type { RouteRecordRaw } from 'vue-router'

import { REDIRECT_ROUTE_NAME } from '@/router/constants'

/**
 * 默认布局组件
 */
export const DEFAULT_LAYOUT = () => import('@/layout/index.vue')

/**
 * 重定向路由配置
 * @type {RouteRecordRaw}
 */
export const REDIRECT_MAIN: RouteRecordRaw = {
  path: '/redirect',
  name: 'redirectWrapper',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    hideInMenu: true,
  },
  children: [
    {
      path: '/redirect/:path',
      name: REDIRECT_ROUTE_NAME,
      component: () => import('@/pages/redirect/index.vue'),
      meta: {
        requiresAuth: true,
        hideInMenu: true,
      },
    },
  ],
}

/**
 * 404 Not Found 路由配置
 * @type {RouteRecordRaw}
 */
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/pages/not-found/index.vue'),
}
