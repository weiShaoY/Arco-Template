<script lang="ts" setup>
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface'

import { useStorage } from '@vueuse/core'

import { useUserStore } from '@/store'

import useLoading from '@/hooks/loading'

const { loading, setLoading } = useLoading()

const userStore = useUserStore()

const errorMessage = ref('')

const loginConfig = useStorage('login-config', {
  rememberPassword: true,
  username: 'admin', // 演示默认值
  password: 'admin', // demo default value
})

const userInfo = ref({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
})

async function handleSubmit({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) {
  console.log('%c Line:37 🥕 values', 'color:#ed9ec7', values)

  if (loading.value)
    return
  if (!errors) {
    setLoading(true)
    try {
      await userStore.login(values.username, values.password)
    }
    catch (err) {
      errorMessage.value = (err as Error).message
    }
    finally {
      setLoading(false)
    }
  }
}
</script>

<template>
  <div
    class="m-b-20 w-80 rounded-3 bg-white p-5"
  >
    <div
      class="text-center text-4 font-600 lh-8"
    >

      一键抚平天下不平事
    </div>

    <div
      class="h-5 text-3 color-red"
    >
      {{ errorMessage }}
    </div>

    <a-form
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          placeholder="请输入用户名"
        >
          <template
            #prefix
          >
            <icon-user />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        field="password"
        :rules="[{ required: true, message: '请输入密码' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          placeholder="请输入密码"
          allow-clear
        >
          <template
            #prefix
          >
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>

      <a-space
        :size="16"
        direction="vertical"
      >

        <a-button
          type="primary"
          html-type="submit"
          long
          :loading="loading"
        >
          登录
        </a-button>

        <!-- <a-button
          type="text"
          long
          class="login-form-register-btn"
        >
          注册
        </a-button> -->
      </a-space>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
  .login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
