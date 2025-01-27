import { createRouter, createWebHistory } from 'vue-router' // 导入 vue-router 的创建路由器和历史模式函数

/**
 * 导入进度条插件 nprogress
 */
import NProgress from 'nprogress'

/**
 * 导入进度条样式
 */
import 'nprogress/nprogress.css'

import { appRoutes } from './routes'

import { NOT_FOUND_ROUTE, REDIRECT_MAIN } from './routes/base'

import createRouteGuard from './guard'

/**
 * 配置进度条插件的显示方式
 */
NProgress.configure({ showSpinner: false }) // 配置进度条不显示旋转图标

/**
 * 创建并配置路由器
 */
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 历史模式
  routes: [
    {
      path: '/',
      redirect: 'login', // 根路径重定向到登录页
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index.vue'), // 动态导入登录页面组件
      meta: {
        requiresAuth: false, // 不需要登录认证
      },
    },

    ...appRoutes,

    REDIRECT_MAIN,

    NOT_FOUND_ROUTE,
  ],

  /**
   *  每次路由切换时滚动到页面顶部
   */
  scrollBehavior() {
    return { top: 0 }
  },
})

/**
 * 创建并使用路由守卫
 */
createRouteGuard(router)

export default router // 导出路由器实例
