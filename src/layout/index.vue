<script lang="ts" setup>
import { computed, onMounted, provide, ref, watch } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import PageLayout from './components/page-layout/index.vue'

import NavBar from './components/navbar/index.vue'

import Menu from './components/menu/index.vue'

import Footer from './components/footer/index.vue'

import TabBar from './components/tab-bar/index.vue'

import Breadcrumb from './components/breadcrumb/index.vue'

import { useAppStore, useUserStore } from '@/store'

import usePermission from '@/hooks/permission'

import useResponsive from '@/hooks/responsive'

/**
 * 用于标识是否初始化
 * @type {boolean}
 */
const isInit = ref(false)

/**
 * 获取应用状态 store
 * @type {ReturnType<typeof useAppStore>}
 */
const appStore = useAppStore()

/**
 * 获取用户状态 store
 * @type {ReturnType<typeof useUserStore>}
 */
const userStore = useUserStore()

/**
 * 获取 router 实例
 * @type {ReturnType<typeof useRouter>}
 */
const router = useRouter()

/**
 * 获取当前 route 实例
 * @type {ReturnType<typeof useRoute>}
 */
const route = useRoute()

/**
 * 获取权限管理实例
 * @type {ReturnType<typeof usePermission>}
 */
const permission = usePermission()

/**
 * 响应式布局处理
 * @param {boolean} immediate - 是否立即执行
 */
useResponsive(true)

/**
 * 导航栏高度
 * @type {string}
 */
const navbarHeight = `60px`

/**
 * 计算属性，获取导航栏状态
 * @returns {boolean} 是否显示导航栏
 */
const navbar = computed(() => appStore.state.navbar)

/**
 * 计算属性，判断是否渲染菜单
 * @returns {boolean} 是否渲染菜单
 */
const renderMenu = computed(() => appStore.state.menu && !appStore.state.topMenu)

/**
 * 计算属性，判断是否隐藏菜单
 * @returns {boolean} 是否隐藏菜单
 */
const hideMenu = computed(() => appStore.state.hideMenu)

/**
 * 计算属性，获取页脚状态
 * @returns {boolean} 是否显示页脚
 */
// const footer = computed(() => appStore.state.footer)

/**
 * 计算属性，获取菜单宽度
 * @returns {number} 菜单宽度
 */
const menuWidth = computed(() => {
  return appStore.state.menuCollapse ? 48 : appStore.state.menuWidth
})

/**
 * 计算属性，获取菜单折叠状态
 * @returns {boolean} 菜单是否折叠
 */
const collapsed = computed(() => {
  return appStore.state.menuCollapse
})

/**
 * 计算属性，获取内容区域的内边距样式
 * @returns {object} 内边距样式
 */
const paddingStyle = computed(() => {
  const paddingLeft = renderMenu.value && !hideMenu.value ? { paddingLeft: `${menuWidth.value}px` } : {}

  const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {}

  return { ...paddingLeft, ...paddingTop }
})

/**
 * 设置菜单折叠状态
 * @param {boolean} val - 菜单折叠状态
 */
function setCollapsed(val: boolean) {
  if (!isInit.value)
    return // 用于页面初始化时菜单状态的问题
  appStore.updateSettings({ menuCollapse: val })
}

/**
 * 监听用户角色变化
 * @param {string} roleValue - 用户角色值
 */
watch(
  () => userStore.role,
  (roleValue) => {
    if (roleValue && !permission.accessRouter(route))
      router.push({ name: 'notFound' })
  },
)

/**
 * 抽屉菜单可见状态
 * @type {boolean}
 */
const drawerVisible = ref(false)

/**
 * 取消抽屉菜单
 */
function drawerCancel() {
  drawerVisible.value = false
}

/**
 * 提供一个方法用于切换抽屉菜单可见状态
 */
provide('toggleDrawerMenu', () => {
  drawerVisible.value = !drawerVisible.value
})

/**
 * 组件挂载时执行
 */
onMounted(() => {
  isInit.value = true

  console.log('%c Line:173 🍎 router', 'color:#2eafb0', router)
})
</script>

<template>
  <a-layout
    class="layout"
    :class="{ mobile: appStore.state.hideMenu }"
  >
    <div
      v-if="navbar"
      class="layout-navbar"
    >
      <NavBar />
    </div>

    <a-layout>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu"
          v-show="!hideMenu"
          class="layout-sider"
          breakpoint="xl"
          :collapsed="collapsed"
          :collapsible="true"
          :width="menuWidth"
          :style="{ paddingTop: navbar ? '60px' : '' }"
          :hide-trigger="true"
          @collapse="setCollapsed"
        >
          <div
            class="menu-wrapper"
          >
            <Menu />
          </div>
        </a-layout-sider>

        <a-drawer
          v-if="hideMenu"
          :visible="drawerVisible"
          placement="left"
          :footer="false"
          mask-closable
          :closable="false"
          @cancel="drawerCancel"
        >
          <Menu />
        </a-drawer>

        <a-layout
          class="layout-content min-h-100vh overflow-y-hidden bg-#F2F3F5"
          :style="paddingStyle"
        >
          <!-- 多页签 -->
          <TabBar
            v-if="appStore.state.tabBar"
          />

          <!-- 面包屑 -->
          <Breadcrumb
            v-if="appStore.state.breadcrumb"
          />

          <!-- 内容区域 -->
          <a-layout-content
            class="m-x-5 m-b-5 bg-white p-t-0"
          >

            <PageLayout />

          </a-layout-content>

          <Footer
            v-if="appStore.state.footer"
          />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

.layout-content {
  // min-height: 100vh;
  // overflow-y: hidden;
  // background-color: var(--color-fill-2);
  // background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
