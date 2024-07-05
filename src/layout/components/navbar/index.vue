<script lang="ts" setup>
import { computed, inject, ref } from 'vue'

import { useDark, useFullscreen, useToggle } from '@vueuse/core'

import MessageBox from '../message-box/index.vue'

import Menu from '../menu/index.vue'

import { useAppStore } from '@/store'

import useUser from '@/hooks/user'

const appStore = useAppStore()

const { logout } = useUser()

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

const theme = computed(() => {
  return appStore.state.theme
})

const topMenu = computed(() => appStore.state.topMenu && appStore.state.menu)

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    // overridden default behavior
    appStore.toggleTheme(dark)
  },
})

const toggleTheme = useToggle(isDark)

function handleToggleTheme() {
  toggleTheme()
}

const refBtn = ref()

function setPopoverVisible() {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })

  refBtn.value.dispatchEvent(event)
}

/**
 *  显示页面配置
 */
function showGlobalSettings() {
  appStore.updateSettings({ globalSettings: true })
}

/**
 *  退出登录
 */
function handleLogout() {
  logout()
}

async function switchRoles() {
  // const res = await userStore.switchRoles()

  // Message.success(res as string)
}

const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void
</script>

<template>
  <div
    class="navbar"
  >
    <!-- 左侧  -->
    <div
      class="left-side"
    >
      <a-space>

        <img
          src="@/assets/images/WeiShaoY.svg"
          class="h-20"
        >

        <a-typography-title
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          薇少爷
        </a-typography-title>

        <icon-menu-fold
          v-if="!topMenu && appStore.state.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>

    <div
      class="center-side"
    >
      <Menu
        v-if="topMenu"
      />
    </div>

    <ul
      class="right-side"
    >

      <li>
        <a-tooltip
          :content="
            theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'

          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="handleToggleTheme"
          >
            <template
              #icon
            >
              <icon-moon-fill
                v-if="theme === 'dark'"
              />

              <icon-sun-fill
                v-else
              />
            </template>
          </a-button>
        </a-tooltip>
      </li>

      <li>
        <a-tooltip
          content="消息通知"
        >

          <div
            class="message-box-trigger"
          >
            <a-badge
              :count="9"
              dot
            >
              <a-button
                class="nav-btn"
                type="outline"
                shape="circle"
                @click="setPopoverVisible"
              >
                <icon-notification />
              </a-button>
            </a-badge>
          </div>
        </a-tooltip>

        <a-popover
          trigger="click"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: 0, minWidth: '400px' }"
          content-class="message-popover"
        >
          <div
            ref="refBtn"
            class="ref-btn"
          />

          <template
            #content
          >
            <MessageBox />
          </template>
        </a-popover>
      </li>

      <li>
        <a-tooltip
          :content="
            isFullscreen
              ? '点击退出全屏模式'
              : '点击切换全屏模式'
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="toggleFullScreen"
          >
            <template
              #icon
            >
              <icon-fullscreen-exit
                v-if="isFullscreen"
              />

              <icon-fullscreen
                v-else
              />
            </template>
          </a-button>
        </a-tooltip>
      </li>

      <li>
        <a-tooltip
          content="页面配置"
        >
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="showGlobalSettings"
          >
            <template
              #icon
            >
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
      </li>

      <li>
        <a-dropdown
          trigger="click"
        >
          <a-avatar
            :size="32"
            :style="{ marginRight: '8px', cursor: 'pointer' }"
          >
            <img
              alt="avatar"
              src="@/assets/images/avatar.png"
            >
          </a-avatar>

          <template
            #content
          >
            <a-doption>
              <a-space
                @click="switchRoles"
              >
                <icon-tag />

                <span>
                  切换角色
                </span>
              </a-space>
            </a-doption>

            <a-doption>
              <a-space
                @click="$router.push({
                  name: 'Info',
                })"
              >
                <icon-user />

                <span>
                  用户中心
                </span>
              </a-space>
            </a-doption>

            <a-doption>
              <a-space
                @click="$router.push({ name: 'Setting' })"
              >
                <icon-settings />

                <span>
                  用户设置
                </span>
              </a-space>
            </a-doption>

            <a-doption>
              <a-space
                @click="handleLogout"
              >
                <icon-export />

                <span>
                  退出登录
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
  .navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;
  :deep(.locale-select) {
    border-radius: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
  .message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
