import { DEFAULT_LAYOUT } from '../base'

import type { AppRouteRecordRaw } from '../types'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  redirect: { name: 'Workplace' },

  component: DEFAULT_LAYOUT,
  meta: {
    locale: '仪表盘',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
    roles: -1,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/pages/dashboard/workplace/index.vue'),
      meta: {
        locale: '工作台',
        requiresAuth: true,
        roles: -1,
        noShowBreadcrumb: true,
        noShowFooter: true,
      },
    },

    {
      path: 'monitor',
      name: 'Monitor',
      component: () => import('@/pages/dashboard/monitor/index.vue'),
      meta: {
        locale: '实时监控',
        requiresAuth: true,
        roles: -1,
      },
    },

  ],
}

export default DASHBOARD
