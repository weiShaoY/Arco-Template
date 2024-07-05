// / <reference types="vitest" /> // 引用 vitest 类型声明文件，用于类型检查

import path from 'node:path'

import { defineConfig, loadEnv } from 'vite'

import Vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'

import AutoImport from 'unplugin-auto-import/vite'

import UnoCSS from 'unocss/vite'

import VueMacros from 'unplugin-vue-macros/vite'

import VueRouter from 'unplugin-vue-router/vite'

// 导入 Vue 路由自动导入插件
import { vitePluginForArco } from '@arco-plugins/vite-vue'

import vueJsx from '@vitejs/plugin-vue-jsx'

export default ({ mode }) => {
  const VITE_API_URL = loadEnv(mode, process.cwd()).VITE_API_URL

  return defineConfig({

    server: {
      proxy: {
        '/api': {
          changeOrigin: true, //  是否跨域
          target: VITE_API_URL,
          secure: false,
        },
      },
    },

    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`, // 设置路径别名
        '~/': `${path.resolve(__dirname, 'src')}/`, // 设置路径别名
      },
    },
    plugins: [

      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
          }),
        },
      }),

      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        extensions: ['.vue'],
        dts: 'src/typed-router.d.ts',
      }),

      // VueRouter(), // 使用 VueRouter 插件

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          '@vueuse/core',
          'vue-router',

          // {
          //   // 添加其他依赖的自动导入
          //   'vue-router/auto': ['useLink'],
          // },
        ],
        dts: true, // 生成类型定义文件
        dirs: [
          'src/composables',
          'src/store',

        ],
        vueTemplate: true, // 启用 Vue 模板
      }),

      vueJsx(),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true, // 生成类型定义文件
      }),

      // https://github.com/antfu/unocss
      // 查看 uno.config.ts 文件进行 Uno.css 配置
      UnoCSS(),

      //  Arco 按需引入
      vitePluginForArco({
        // style: 'css',
      }),

    ],

  })
}
