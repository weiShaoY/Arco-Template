<script lang="ts" setup>
import LoginForm from './components/login-form.vue'
</script>

<template>
  <div
    class="wrap h-full flex flex-col items-center justify-center"
  >

    <div
      class="m-b-5"
    >
      <!-- dynamic typing effect 动态打字效果 -->
      <a
        href="https://blog.sunguoqi.com/"
      >
        <img
          class="color-white"
          src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=22&pause=1000&color=ffffff&center=true&vCenter=true&random=false&width=500&lines=console.log(%22Hello%2CWorld!%22);No+Bugs"
          alt="Typing SVG"
        >
      </a>

    </div>

    <LoginForm />

  </div>
</template>

<style lang="less" scoped>
.wrap {
  // background-image: url('@/assets/images/login-bg.jpg');
  // background-size: cover;

  background-color: #222325;

  // background-image: linear-gradient(to left, #bdbbbe 0%, #9d9ea3 100%),
  //   radial-gradient(
  //     88% 271%,
  //     rgba(255, 255, 255, 0.25) 0%,
  //     rgba(254, 254, 254, 0.25) 1%,
  //     rgba(0, 0, 0, 0.25) 100%
  //   ),
  //   radial-gradient(
  //     50% 100%,
  //     rgba(255, 255, 255, 0.3) 0%,
  //     rgba(0, 0, 0, 0.3) 100%
  //   );
  // background-blend-mode: normal, lighten, soft-light;
}
</style>
