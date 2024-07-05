<script lang="ts" setup>
import GlobalSetting from '@/components/global-setting/index.vue'
</script>

<template>
  <a-config-provider
    global
  >
    <router-view />

    <!-- 页面配置  -->
    <GlobalSetting />

  </a-config-provider>
</template>
