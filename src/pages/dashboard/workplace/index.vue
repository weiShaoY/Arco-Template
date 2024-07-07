<script lang="ts" setup>
import DataPanel from './components/data-panel.vue'

import ContentChart from './components/content-chart.vue'

import PopularContent from './components/popular-content.vue'

import CategoriesPercent from './components/categories-percent.vue'

import RecentlyVisited from './components/recently-visited.vue'

import QuickOperation from './components/quick-operation.vue'

import Announcement from './components/announcement.vue'

import Carousel from './components/carousel.vue'
</script>

<script lang="ts">
export default {
  name: 'Dashboard', // If you want the include property of keep-alive to take effect, you must name the component
}
</script>

<template>
  <div
    class="flex flex-1 flex-col bg-#F2F3F5 p-x-5 p-t-5"
  >

    <!-- 上边 -->
    <a-grid
      :cols="24"
      :col-gap="16"
      :row-gap="16"
    >

      <a-grid-item
        :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 20, xxl: 20 }"
        class=""
      >

        <a-grid
          :cols="24"
          :col-gap="16"
          :row-gap="16"
        >

          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
          >
            <DataPanel />
          </a-grid-item>

          <!-- 表格  -->
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 12 }"
            class="h-full bg-fuchsia"
          >
            <PopularContent />
          </a-grid-item>

          <!-- 饼图  -->
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 12 }"
            class="flex-1"
          >
            <CategoriesPercent />
          </a-grid-item>
        </a-grid>

      </a-grid-item>

      <a-grid-item
        :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 4, xxl: 4 }"
      >
        <!-- 快捷操作  -->
        <QuickOperation />

        <!-- 最近访问  -->
        <RecentlyVisited
          class="m-y-2"
        />

        <!-- 轮播图  -->
        <Carousel />

      </a-grid-item>

    </a-grid>

    <a-grid
      :cols="24"
      :col-gap="16"
      :row-gap="16"
      class="flex-1 p-t-4"
    >

      <!-- 折线图  -->
      <a-grid-item
        :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 20 }"
        class=""
      >
        <ContentChart />

      </a-grid-item>

      <!-- 公告  -->
      <a-grid-item
        :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 4 }"
      >
        <Announcement />
      </a-grid-item>

    </a-grid>

  </div>
</template>

<style lang="less" scoped>

</style>
