/**
 * 单独监听路由会浪费渲染性能。使用发布订阅模式进行分发管理。
 */
import type { Handler } from 'mitt' // 从 'mitt' 导入 Handler 类型

import mitt from 'mitt' // 从 'mitt' 导入 mitt 函数

import type { RouteLocationNormalized } from 'vue-router' // 从 'vue-router' 导入 RouteLocationNormalized 类型

const emitter = mitt() // 创建一个事件发射器实例

const key = Symbol('ROUTE_CHANGE') // 定义一个唯一的符号作为事件键

/**
 *  存储最新的路由信息
 */
let latestRoute: RouteLocationNormalized

/**
 * 设置路由发射器，发射路由变化事件
 * @param {RouteLocationNormalized} to - 目标路由
 */
export function setRouteEmitter(to: RouteLocationNormalized) {
  emitter.emit(key, to) // 通过发射器发射路由变化事件
  latestRoute = to // 更新最新的路由信息
}

/**
 * 监听路由变化事件
 * @param {Function} handler - 处理路由变化的回调函数
 * @param {boolean} [immediate] - 是否立即执行回调函数
 */
export function listenerRouteChange(
  handler: (route: RouteLocationNormalized) => void,
  immediate = true,
) {
  // 注册路由变化事件的监听器
  emitter.on(key, handler as Handler)
  if (immediate && latestRoute) {
    // 如果 immediate 为 true 且存在最新路由，则立即执行回调函数
    handler(latestRoute)
  }
}

/**
 * 移除路由变化事件的监听器
 */
export function removeRouteListener() {
  emitter.off(key) // 移除路由变化事件的监听器
}
