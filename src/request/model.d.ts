import type { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Axios 请求拦截器的类型定义
 */
export type AxiosRequestInterceptor = {

  /**
   * 请求成功时的处理函数
   */
  onFulfilled?: (
    value: AxiosRequestConfig
  ) => AxiosRequestConfig | Promise<AxiosRequestConfig>

  /**
   * 请求失败时的处理函数
   */
  onRejected?: (error: any) => any
}

/**
 * Axios 响应拦截器的类型定义
 */
export type AxiosResponseInterceptor = {

  /**
   * 响应成功时的处理函数
   */
  onFulfilled?: (
    value: AxiosResponse
  ) => AxiosResponse | Promise<AxiosResponse>

  /**
   * 响应失败时的处理函数
   */
  onRejected?: (error: any) => any
}

/**
 * 返回数据格式化的函数类型定义
 */
export type ResponseFormatter = (source: any) => any

/**
 * HTTP 实例的配置类型定义
 */
export type HttpTypeConfig = {

  /**
   * axios请求配置
   */
  axios: AxiosRequestConfig

  /**
   * 请求拦截器数组
   */
  requestInterceptors: AxiosRequestInterceptor[]

  /**
   * 返回拦截器数组
   */
  responseInterceptors: AxiosResponseInterceptor[]

  /**
   * 返回数据统一格式化函数
   */
  formatter?: ResponseFormatter
}

/**
 * HTTP 实例的接口定义
 */
export type Http = {

  /**
   * 发送 GET 请求
   * @param {string} url 请求的 URL
   * @param {any} [params] 请求参数
   * @returns {Promise<T>} 返回 Promise 对象
   * @template T 返回数据的类型
   */
  get: <T>(url: string, params?: any) => Promise<T>

  /**
   * 发送 POST 请求
   * @param {string} url 请求的 URL
   * @param {any} [data] POST 请求的数据
   * @param {any} [params] 请求参数
   * @returns {Promise<T>} 返回 Promise 对象
   * @template T 返回数据的类型
   */
  post: <T>(url: string, data?: any, params?: any) => Promise<T>
}
