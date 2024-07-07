<script lang="ts" setup></script>

<template>
  <a-grid
    :cols="24"
    :row-gap="10"
    class="b-b-0 rounded-1 bg-white p-b-0 p-l-5 p-r-5 p-t-4"
  >
    <a-grid-item
      class="border-r-1 p-l-11"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
    >
      <a-space>
        <a-avatar
          :size="54"
          class="m-r-3 bg-#EFF1F4"
        >
          <img
            alt="avatar"
            src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
          >
        </a-avatar>

        <a-statistic
          title="投放中内容"
          :value="373.5"
          :precision="1"
          :value-from="0"
          animation
          show-group-separator
        >
          <template
            #suffix
          >
            W+ <span
              class="m-l-2 text-3 color-#363D49"
            >个</span>
          </template>
        </a-statistic>
      </a-space>
    </a-grid-item>

    <a-grid-item
      class="border-r-1 p-l-11"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
    >
      <a-space>
        <a-avatar
          :size="54"
          class="m-r-3 bg-#EFF1F4"
        >
          <img
            alt="avatar"
            src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"
          >
        </a-avatar>

        <a-statistic
          title="内容投放"
          :value="368"
          :value-from="0"
          animation
          show-group-separator
        >
          <template
            #suffix
          >
            <span
              class="m-l-2 text-3 color-#363D49"
            >个</span>
          </template>
        </a-statistic>
      </a-space>
    </a-grid-item>

    <a-grid-item
      class="border-r-1 p-l-11"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
    >
      <a-space>
        <a-avatar
          :size="54"
          class="m-r-3 bg-#EFF1F4"
        >
          <img
            alt="avatar"
            src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"
          >
        </a-avatar>

        <a-statistic
          title="日新增评论"
          :value="8874"
          :value-from="0"
          animation
          show-group-separator
        >
          <template
            #suffix
          >
            <span
              class="m-l-2 text-3 color-#363D49"
            >个</span>
          </template>
        </a-statistic>
      </a-space>
    </a-grid-item>

    <a-grid-item
      class="border-r-1 p-l-11"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
      style="border-right: none"
    >
      <a-space>
        <a-avatar
          :size="54"
          class="m-r-3 bg-#EFF1F4"
        >
          <img
            alt="avatar"
            src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image"
          >
        </a-avatar>

        <a-statistic
          title="较昨日新增"
          :value="2.8"
          :precision="1"
          :value-from="0"
          animation
        >
          <template
            #suffix
          >
            % <icon-caret-up
              class="color-red-6"
            />
          </template>
        </a-statistic>
      </a-space>
    </a-grid-item>

    <a-grid-item
      :span="24"
    >
      <a-divider
        class="m-0 m-t-1"
      />
    </a-grid-item>
  </a-grid>
</template>

<style lang="less" scoped>

</style>
