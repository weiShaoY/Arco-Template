import { useRouter } from 'vue-router' // 导入Vue Router中的useRouter函数

import { Message } from '@arco-design/web-vue' // 导入@arco-design/web-vue组件库中的Message组件

import { useUserStore } from '@/store' // 导入名为useUserStore的自定义函数，用于获取用户信息的store

export default function useUser() {
  // 导出名为useUser的函数
  const router = useRouter() // 使用useRouter函数获取Vue Router实例

  const userStore = useUserStore() // 使用自定义函数获取用户信息的store

  const logout = async (logoutTo?: string) => {
    /**
     *  调用用户信息的store中的logout方法，退出登录状态
     */
    await userStore.logout()

    /**
     *  当前的路由信息
     */
    const currentRoute = router.currentRoute.value

    Message.success('登出成功')
    await router.push({
      // 调用router实例的push方法，跳转到指定路由
      name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'login', // 如果提供了登出后跳转的路由名，则使用该路由，否则跳转到登录页面
      query: {
        // 在路由的query参数中添加当前路由的名称，方便在登录后跳转回当前页面
        ...router.currentRoute.value.query,

        /**
         *  重定向到当前路由的名称
         */
        redirect: currentRoute.name as string,
      },
    })
  }

  return {
    /**
     *  退出登录
     */
    logout,
  }
}
