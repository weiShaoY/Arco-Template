import { Message } from '@arco-design/web-vue'

import { ref } from 'vue'

import { defineStore } from 'pinia'

import router from '@/router'

import useMenuTree from '@/layout/components/menu/use-menu-tree'

const useUserStore = defineStore(
  'user',
  () => {
    /**
     *  用户登录token
     */
    const token = ref('')

    /**
     *  用户角色
     *  -1: 管理员
     */
    const role = ref('admin')

    /**
     *  用户信息
     */
    const userInfo = ref({
      /**
       *  用户id
       */
      userId: 0,

      /**
       *  用户名
       */
      userName: 'test',

      /**
       *  用户邮箱
       */
      userEmail: '',

      /**
       *  用户头像
       */
      userAvatar: 'https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image',

      /**
       *  用户权限
       */
      auth: [] as number[],
    })

    /**
     *  用户登录
     */
    async function login(username: string, password: string): Promise<any> {
      console.log('%c Line:57 🥒 password', 'color:#2eafb0', password)

      token.value = '123'

      role.value = 'admin'

      userInfo.value = {
        userId: 0,
        userName: username,
        userEmail: '123@qq.com',
        userAvatar: 'https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image',
        auth: [],
      }

      // debugger

      // const res = await AuthApi.SignIn(account, password);

      // this.token = res.token;

      //  获取菜单树
      const { menuTree } = useMenuTree()

      console.log('%c Line:79 🥐 menuTree', 'color:#7f2b82', menuTree)

      const { redirect, ...othersQuery } = router.currentRoute.value.query

      // await router.push({
      //   name: (redirect as string) || menuTree.value[0].name,
      //   query: {
      //     ...othersQuery,
      //   },
      // });

      // await router.push({
      //   name: menuTree.value[0].name,
      // });

      if (
        redirect
        && menuTree.value.some((item: any) => item.name === redirect)
      ) {
        await router.push({
          name: redirect as string,
          query: {
            ...othersQuery,
          },
        })
      }
      else {
        await router.push({
          name: menuTree.value[0].name,
          query: {
            ...othersQuery,
          },
        })
      }

      Message.success('登录成功')
    }

    /**
     *  退出登录
     */
    async function logout() {
      token.value = ''
      userInfo.value = {
        userId: 0,
        userName: '',
        userEmail: '',
        userAvatar: '',
        auth: [],
      }
      await router.push({
        name: 'login',
        query: {
          ...router.currentRoute.value.query,
          redirect: router.currentRoute.value.name as string,
        },
      })

      Message.success('退出登录成功')
    }

    return {
      token,
      role,
      userInfo,
      login,
      logout,
    }
  },
  {
    persist: true, // 数据持久化
  },
)

export default useUserStore
