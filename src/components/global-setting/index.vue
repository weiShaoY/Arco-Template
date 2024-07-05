<script lang="ts" setup>
import { computed } from 'vue'

import { Message } from '@arco-design/web-vue'

import { useClipboard } from '@vueuse/core'

import Block from './block.vue'

import { useAppStore } from '@/store'

const emit = defineEmits(['cancel'])

const appStore = useAppStore()

const { copy } = useClipboard()

const visible = computed(() => appStore.state.globalSettings)

const contentOpts = computed(() => [
  {
    name: '菜单栏',
    key: 'menu',
    defaultVal: appStore.state.menu,
  },

  {
    name: '顶部菜单栏',
    key: 'topMenu',
    defaultVal: appStore.state.topMenu,
  },

  {
    name: '导航栏',
    key: 'navbar',
    defaultVal: appStore.state.navbar,
  },

  {
    name: '多页签',
    key: 'tabBar',
    defaultVal: appStore.state.tabBar,
  },

  {
    name: '面包屑',
    key: 'breadcrumb',
    defaultVal: appStore.state.breadcrumb,
  },

  {
    name: '底部',
    key: 'footer',
    defaultVal: appStore.state.footer,
  },

  {
    name: '菜单来源于后台',
    key: 'menuFromServer',
    defaultVal: appStore.state.menuFromServer,
  },

  {
    name: '菜单宽度 (px)',
    key: 'menuWidth',
    defaultVal: appStore.state.menuWidth,
    type: 'number',
  },
])

const othersOpts = computed(() => [
  {
    name: '色弱模式',
    key: 'colorWeak',
    defaultVal: appStore.state.colorWeak,
  },
])

/**
 *  取消
 */
function cancel() {
  appStore.updateSettings({ globalSettings: false })
  emit('cancel')
}

/**
 *  复制配置
 */
async function copySettings() {
  const text = JSON.stringify(appStore.state.$state, null, 2)

  await copy(text)
  Message.success('复制成功，请粘贴到 src/settings.json 文件中')
}

/**
 *  显示页面配置
 */
function setVisible() {
  appStore.updateSettings({ globalSettings: true })
}
</script>

<template>
  <div
    v-if="!appStore.state.navbar"
    class="fixed-settings"
    @click="setVisible"
  >
    <a-button
      type="primary"
    >
      <template
        #icon
      >
        <icon-settings />
      </template>
    </a-button>
  </div>

  <a-drawer
    :width="300"
    unmount-on-close
    cancel-text="关闭"
    ok-text="复制配置"
    :visible="visible"
    @ok="copySettings"
    @cancel="cancel"
  >
    <template
      #title
    >
      页面配置
    </template>

    <Block
      :options="contentOpts"
      title="内容区域"
    />

    <Block
      :options="othersOpts"
      title="其他设置"
    />

    <a-alert>
      配置之后仅是临时生效，要想真正作用于项目，点击下方的“复制配置＂按钮，将配置替换到settings.json 中即可
    </a-alert>
  </a-drawer>
</template>

<style scoped lang="less">
  .fixed-settings {
  position: fixed;
  top: 280px;
  right: 0;

  svg {
    font-size: 18px;
    vertical-align: -4px;
  }
}
</style>
