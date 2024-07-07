<script lang="ts" setup>
import { ref } from 'vue'

import ChatList from './chat-list.vue'

import useLoading from '@/hooks/loading'

type ChatRecord = {
  id: number
  username: string
  content: string
  time: string
  isCollect: boolean
}

const { loading, setLoading } = useLoading(true)

console.log('%c Line:17 🍺 loading', 'color:#ed9ec7', loading)

const chatList = ref<ChatRecord[]>([])

async function fetchData() {
  setLoading(true)
  try {
    // const { data } = await queryChatList()

    chatList.value = [
      {
        id: 1,
        username: '用户7352772',
        content: '马上就开始了，好激动！',
        time: '13:09:12',
        isCollect: true,
      },
    ]
  }
  catch (err) {
    // you can report use errorHandler or other
  }
  finally {
    setLoading(false)
  }
}

fetchData()
</script>

<template>
  <a-card
    class="general-card chat-panel"
    title="聊天窗口"
    :bordered="false"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{
      height: '100%',
      paddingTop: '16px',
      display: 'flex',
      flexFlow: 'column',
    }"
  >
    <a-space
      :size="8"
    >
      <a-select
        style="width: 86px"
        default-value="all"
      >
        <a-option
          value="all"
        >
          全部
        </a-option>
      </a-select>

      <a-input-search
        placeholder="搜索类目"
      />

      <a-button
        type="text"
      >
        <icon-download />
      </a-button>
    </a-space>

    <div
      class="chat-panel-content"
    >
      <a-spin
        :loading="loading"
        style="width: 100%"
      >
        <ChatList
          :render-list="chatList"
        />
      </a-spin>
    </div>

    <div
      class="chat-panel-footer"
    >
      <a-space
        :size="8"
      >
        <a-Input>
          <template
            #suffix
          >
            <icon-face-smile-fill />
          </template>
        </a-Input>

        <a-button
          type="primary"
        >
          更新
        </a-button>
      </a-space>
    </div>
  </a-card>
</template>

<style scoped lang="less">
.chat-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-bg-2);

  &-content {
    flex: 1;
    margin: 20px 0;
  }
}
</style>
