<script lang="ts" setup>
import birdImage from '@/assets/svg/bird.svg?url'

import bannerImage from '@/assets/svg/banner-1.svg?url'

const imageSrc = [bannerImage, birdImage]
</script>

<template>
  <a-carousel
    class="h-45 overflow-hidden rounded-1"
    indicator-type="slider"
    show-arrow="hover"
    auto-play
  >
    <a-carousel-item
      v-for="(src, idx) in imageSrc"
      :key="idx"
    >
      <img
        class="h-full w-full bg-white"
        :src="src"
        alt="banner"
      >
    </a-carousel-item>
  </a-carousel>
</template>

<style scoped lang="less">
:deep(.arco-carousel-arrow > div) {
  background-color: rgba(0, 0, 0, 0.3);
}

:deep(.arco-carousel-arrow > div:hover) {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
