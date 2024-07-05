<script lang="ts" setup>
import { nextTick, ref } from 'vue'

import VCharts from 'vue-echarts'

defineProps({

  /**
   *  配置
   */
  options: {
    type: Object,
    default() {
      return {}
    },
  },

  /**
   *  自适应
   */
  autoResize: {
    type: Boolean,
    default: true,
  },

  /**
   *  宽
   */
  width: {
    type: String,
    default: '100%',
  },

  /**
   *  高
   */
  height: {
    type: String,
    default: '100%',
  },
})

const renderChart = ref(false)

nextTick(() => {
  renderChart.value = true
})
</script>

<template>
  <VCharts
    class="chart_box"
    :option="options"
    autoresize
  />
</template>

<style scoped lang="less"></style>
