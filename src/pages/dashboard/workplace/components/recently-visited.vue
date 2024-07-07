<script lang="ts" setup>
const links = [
  {
    text: '内容管理',
    icon: 'icon-storage',
  },
  {
    text: '内容分析',
    icon: 'icon-file',
  },
  {
    text: '高级管理',
    icon: 'icon-settings',
  },
]
</script>

<template>
  <a-card
    title="最近访问"
    :header-style="{
      paddingBottom: '0',
    }"
    :body-style="{
      padding: '24px 20px 0 20px',
    }"
  >

    <a-row
      :gutter="8"
    >
      <a-col
        v-for="link in links"
        :key="link.icon"
        :span="8"
        class="link m-b-2 flex flex-col cursor-pointer items-center justify-center"
      >
        <div
          class="icon m-b-1 h-8 w-8 flex items-center justify-center bg-#F8F9FB text-4"
        >
          <component
            :is="link.icon"
          />
        </div>

        <a-typography-paragraph
          class="text"
        >
          {{ link.text }}
        </a-typography-paragraph>
      </a-col>
    </a-row>

    <a-divider
      class="split-line"
      style="margin: 0"
    />
  </a-card>
</template>

<style lang="less" scoped>
  .link:hover {
  .icon {
    color: rgb(var(--arcoblue-6));
    background-color: #e8f3ff;
  }
  .text {
    color: rgb(var(--arcoblue-6));
  }
}
</style>
