import type { LocationQueryRaw, Router } from 'vue-router'

import NProgress from 'nprogress' // 进度条

import { useUserStore } from '@/store'

// import { isLogin } from '@/utils/auth';

/**
 *  设置用户登录信息守卫
 * @param {Router} router - 路由器实例
 */
export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start() // 开始进度条

    const userStore = useUserStore()

    //  判断用户是否已登录
    if (userStore.token) {
      // 如果用户已登录 且 用户角色已存在
      if (userStore.role) {
        // 如果用户角色已存在
        next() // 继续导航
      }
      else {
        try {
          // await userStore.getUserInfo() // 获取用户信息
          next() // 继续导航
        }
        catch (error) {
          await userStore.logout() // 登出用户
          next({
            name: 'login', // 重定向到登录页面
            query: {
              redirect: to.name, // 重定向参数设置为当前页面名称
              ...to.query, // 保留原始查询参数
            } as LocationQueryRaw,
          })
        }
      }
    }
    else {
      if (to.name === 'login') {
        // 如果目标页面是登录页面
        next() // 继续导航

        return
      }

      next({
        name: 'login', // 重定向到登录页面
        query: {
          redirect: to.name, // 重定向参数设置为当前页面名称
          ...to.query, // 保留原始查询参数
        } as LocationQueryRaw,
      })
    }
  })
}
