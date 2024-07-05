<script lang="ts" setup>
import { computed } from 'vue'

import { useTabBarStore } from '@/store'

const tabBarStore = useTabBarStore()

/**
 *  缓存列表
 */
const cacheList = computed(() => tabBarStore.getCacheList)
</script>

<template>
  <!-- 使用 router-view 组件，并通过插槽获取当前组件和路由 -->
  <router-view
    v-slot="{ Component, route }"
  >

    <!-- 定义过渡效果的名称为 "fade" -->
    <!-- 定义过渡模式为 "out-in" -->
    <!-- appear 在初次渲染时应用过渡效果 -->
    <transition
      name="fade"
      mode="out-in"
      appear
    >

      <!-- 动态组件绑定当前的路由组件 -->
      <!-- 如果路由元信息中忽略缓存，则直接渲染组件 -->
      <!-- 通过路由的完整路径作为组件的唯一键 -->
      <component
        :is="Component"
        v-if="route.meta.ignoreCache"
        :key="route.fullPath"
      />

      <!-- 否则启用 keep-alive 缓存组件 -->
      <!-- include 指定要缓存的组件列表 -->
      <keep-alive
        v-else
        :include="cacheList"
      >

        <component
          :is="Component"
          :key="route.fullPath"
        />

      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped lang="less"></style>
