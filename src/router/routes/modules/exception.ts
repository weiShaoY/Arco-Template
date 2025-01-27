import { DEFAULT_LAYOUT } from '../base'

import type { AppRouteRecordRaw } from '../types'

const EXCEPTION: AppRouteRecordRaw = {
  path: '/exception',
  name: 'Exception',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '异常页',
    requiresAuth: true,
    icon: 'icon-exclamation-circle',
    order: 2,
  },
  children: [
    {
      path: '403',
      name: '403',
      component: () => import('@/pages/exception/403/index.vue'),
      meta: {
        locale: '403',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '404',
      name: '404',
      component: () => import('@/pages/exception/404/index.vue'),
      meta: {
        locale: '404',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '500',
      name: '500',
      component: () => import('@/pages/exception/500/index.vue'),
      meta: {
        locale: '500',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}

export default EXCEPTION
