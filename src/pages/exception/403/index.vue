<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: '403',
}
</script>

<template>
  <div
    class="wrap"
  >
    <Breadcrumb
      :items="['异常页', '403']"
    />

    <div
      class="content"
    >
      <a-result
        class="result"
        status="403"
        subtitle="对不起，您没有访问该资源的权限"
      />

      <a-button
        key="back"
        type="primary"
        @click="$router.back()"
      >
        返回
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="less">
  .wrap {
  padding: 0 20px 20px 20px;
  height: calc(100% - 40px);
  :deep(.content) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    background-color: var(--color-bg-1);
    border-radius: 4px;
  }
}
</style>
