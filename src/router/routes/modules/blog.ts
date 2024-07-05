import { DEFAULT_LAYOUT } from '../base'

import type { AppRouteRecordRaw } from '../types'

const BLOG: AppRouteRecordRaw = {
  path: '/blog',
  name: 'Blog',
  redirect: { name: 'Category' },
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '博客',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 1,
    roles: -1,
  },
  children: [
    {
      path: 'category',
      name: 'Category',
      component: () => import('@/pages/blog/category/index.vue'),
      meta: {
        locale: '分类管理',
        requiresAuth: true,
        roles: -1,
      },
    },
    {
      path: 'tag',
      name: 'Tag',
      component: () => import('@/pages/blog/tag/index.vue'),
      meta: {
        locale: '标签管理',
        requiresAuth: true,
        roles: -1,
      },
    },
    {
      path: 'friendLink',
      name: 'FriendLink',
      component: () => import('@/pages/blog/friendLink/index.vue'),
      meta: {
        locale: '友链管理',
        requiresAuth: true,
        roles: -1,
      },
    },
    {
      path: 'article',
      name: 'Article',
      component: () => import('@/pages/blog/article/index.vue'),
      meta: {
        locale: '文章管理',
        requiresAuth: true,
        roles: -1,
      },
    },

    {
      path: 'album',
      name: 'Album',
      component: () => import('@/pages/blog/album/index.vue'),
      meta: {
        locale: '图库管理',
        requiresAuth: true,
        roles: -1,
      },
    },

  ],
}

export default BLOG
