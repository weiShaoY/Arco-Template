<script lang="tsx">
import { computed, defineComponent, h, ref, resolveComponent } from 'vue' // 引入 Vue 的 API

import { useRoute, useRouter } from 'vue-router' // 引入 Vue Router 的 API

import type { RouteMeta, RouteRecordRaw } from 'vue-router' // 引入类型定义

import useMenuTree from './use-menu-tree' // 引入自定义的 useMenuTree hook

import { useAppStore } from '@/store' // 引入应用状态管理

import { listenerRouteChange } from '@/utils/route-listener' // 引入路由变化监听工具

export default defineComponent({

  emit: ['collapse'], // 定义折叠事件

  setup() {
    const appStore = useAppStore()

    const router = useRouter()

    const route = useRoute()

    const { menuTree } = useMenuTree()

    // 计算属性：菜单是否折叠
    const collapsed = computed({
      get() {
        if (appStore.state.device === 'desktop') {
          // 如果是桌面设备

          // 返回菜单折叠状态
          return appStore.state.menuCollapse
        }

        return false // 移动设备不折叠
      },
      set(value: boolean) {
        // 更新菜单折叠状态
        appStore.updateSettings({ menuCollapse: value })
      },
    })

    /**
     *  是否显示顶部菜单
     */
    const topMenu = computed(() => appStore.state.topMenu)

    /**
     *  菜单展开的项
     */
    const openKeys = ref<string[]>([])

    /**
     *  选中的菜单项
     */
    const selectedKey = ref<string[]>([])

    /**
     * 跳转到指定路由
     * @param {RouteRecordRaw} item - 路由项
     */
    const goto = (item: RouteRecordRaw) => {
      const { hideInMenu, activeMenu } = item.meta as RouteMeta // 获取路由的 meta 信息

      // 如果当前路由已经是目标路由，且不隐藏在菜单中，且没有激活菜单，则更新选中项
      if (route.name === item.name && !hideInMenu && !activeMenu) {
        selectedKey.value = [item.name as string] // 更新选中的菜单项
        return // 终止函数
      }

      // 触发路由跳转
      router.push({
        name: item.name,
      })
    }

    /**
     * 查找菜单展开项
     * @param {string} target - 目标路由名称
     * @returns {string[]} 菜单展开项数组
     */
    const findMenuOpenKeys = (target: string) => {
      const result: string[] = [] // 存储结果的数组

      let isFind = false // 是否找到目标

      /**
       * 递归回溯查找目标路由
       * @param {RouteRecordRaw} item - 当前路由项
       * @param {string[]} keys - 当前路径的 keys
       */
      const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target) { // 如果找到目标
          isFind = true // 设置找到目标
          result.push(...keys) // 将路径 keys 添加到结果数组
          return // 终止函数
        }

        // 如果有子路由
        if (item.children?.length) {
          item.children.forEach((el) => {
            // 递归查找子路由
            backtrack(el, [...keys, el.name as string])
          })
        }
      }

      // 遍历菜单树
      menuTree.value.forEach((el: RouteRecordRaw) => {
        // 如果已经找到目标，终止遍历
        if (isFind)
          return

        // 回溯查找
        backtrack(el, [el.name as string])
      })

      // 返回结果数组
      return result
    }

    /**
     *  监听路由变化事件
     */
    listenerRouteChange((newRoute) => {
      const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta // 获取路由的 meta 信息

      // 如果需要认证且没有隐藏在菜单中或者有激活菜单
      if (requiresAuth && (!hideInMenu || activeMenu)) {
        /**
         *  菜单展开项数组
         */
        const menuOpenKeys = findMenuOpenKeys((activeMenu || newRoute.name) as string)

        /**
         *  合并当前展开项和新找到的展开项
         */
        const keySet = new Set([...menuOpenKeys, ...openKeys.value])

        /**
         *  更新展开项
         */
        openKeys.value = [...keySet]

        /**
         *  更新选中的菜单项
         */
        selectedKey.value = [(activeMenu as string) || (menuOpenKeys[menuOpenKeys.length - 1] as string)]
      }
    }, true)

    /**
     * 设置菜单折叠状态
     * @param {boolean} val - 折叠状态
     */
    const setCollapse = (val: boolean) => {
      // 如果是桌面设备
      if (appStore.state.device === 'desktop')

      // 更新菜单折叠状态
        appStore.updateSettings({ menuCollapse: val })
    }

    /**
     * 渲染子菜单
     * @returns {JSX.Element[]} 渲染的子菜单项
     */
    const renderSubMenu = () => {
      /**
       * 遍历路由树
       * @param {RouteRecordRaw[]} _route - 路由数组
       * @param {JSX.Element[]} nodes - 渲染的节点数组
       * @returns {JSX.Element[]} 渲染的节点数组
       */
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) { // 如果路由数组不为空
          _route.forEach((element) => { // 遍历路由数组
            // 如果有图标，通过 resolveComponent 解析为图标组件
            const icon = element?.meta?.icon
              ? () => h(resolveComponent(element?.meta?.icon as string))
              : null

            // 如果有子菜单，递归调用 travel 函数继续遍历
            const node = element?.children
              && element?.children.length !== 0
              ? (
                  <a-sub-menu
                    key={element?.name}
                    v-slots={{
                      icon,
                      title: () => element?.meta?.locale || '',
                    }}
                  >
                    {travel(element?.children)}
                  </a-sub-menu>
                )
              : (

            // 如果没有子菜单，就是菜单项，点击后跳转到对应的路由
                  <a-menu-item
                    key={element?.name}
                    v-slots={{ icon }}
                    onClick={() => goto(element)}
                  >
                    {element?.meta?.locale || ''}
                  </a-menu-item>
                )

            // 将节点添加到节点数组
            nodes.push(node as never)
          })
        }

        // 返回节点数组
        return nodes
      }

      // 调用 travel 函数渲染子菜单
      return travel(menuTree.value)
    }

    return () => (
      <a-menu
        mode={topMenu.value ? 'horizontal' : 'vertical'} // 菜单模式
        v-model:collapsed={collapsed.value} // 菜单折叠状态
        v-model:open-keys={openKeys.value} // 菜单展开项
        show-collapse-button={appStore.state.device !== 'mobile'} // 是否显示折叠按钮
        auto-open={false} // 自动展开
        selected-keys={selectedKey.value} // 选中的菜单项
        auto-open-selected={true} // 自动展开选中的项
        level-indent={34} // 缩进级别
        style="height: 100%;width:100%;" // 样式
        onCollapse={setCollapse} // 菜单折叠事件
      >
        {/* 渲染子菜单 */}
        { renderSubMenu()}
      </a-menu>
    )
  },
})
</script>

<style lang="less" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex; // 设置为弹性盒子布局
    align-items: center; // 子项垂直居中
  }

  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px; // 设置图标字体大小
    }
  }
}
</style>
