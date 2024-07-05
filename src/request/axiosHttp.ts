import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import axios from 'axios'

import lodash from 'lodash'

import type {
  AxiosRequestInterceptor,
  AxiosResponseInterceptor,
  Http,
  HttpTypeConfig,
  ResponseFormatter,
} from './model'

import { useUserStore } from '~/store'

/**
 * 封装的 HTTP 类，基于 Axios 实现
 * @implements {Http}
 */
export default class AxiosHttp implements Http {
  /**
   *  Axios 实例
   */
  private instance: AxiosInstance

  /**
   *  存储响应格式化器
   */
  private filters: ResponseFormatter[] = []

  /**
   * 构造函数，接收 HttpTypeConfig 类型的配置参数
   * @param {HttpTypeConfig} config HTTP 配置
   */
  private constructor(config: HttpTypeConfig) {
    //  创建 Axios 实例3
    this.instance = axios.create(config.axios)

    // 每个instance都添加拦截器
    this.instance.interceptors.request.use( //  每个实例都添加请求拦截器

      (config: InternalAxiosRequestConfig) => {
        // const token = localStorage.getItem('token')

        // 判断是否有token，如果有的话，则每个http header都加上token
        const token = useUserStore().token || ''

        if (token)

          config.headers.Authorization = `Bearer ${token}`

        return config
      },
      (err) => {
        return err
      },
    )

    /**
     *  使用请求拦截器
     */
    this.useRequestInterceptor(...config.requestInterceptors)

    /**
     *  使用响应拦截器
     */
    this.useResponseInterceptor(...config.responseInterceptors)

    /**
     *  使用响应格式化器
     */
    if (config.formatter)
      this.useResponseFilter(config.formatter)
  }

  /**
   * 创建 AxiosHttp 实例
   * @param {string} url 请求的 URL
   * @param {HttpTypeConfig} config HTTP 配置
   * @returns {Http} AxiosHttp 实例
   */
  static Of(
    url: string,
    config: HttpTypeConfig,
  ): Http {
    // 判断是否为生产环境 来设置 baseURL
    config.axios.baseURL = import.meta.env.PROD
      ? url
      : ''

    //  创建并返回 AxiosHttp 实例
    return new AxiosHttp(config)
  }

  /**
   * 格式化响应数据
   * @private
   * @param {AxiosResponse} source 响应数据
   * @returns {T} 格式化后的数据
   * @template T 返回数据的类型
   */
  private getFormatData<T>(source: AxiosResponse): T {
    //  调用组合函数    使用 lodash.flow 方法将所有响应格式化器组合成一个函数
    const formatter = lodash.flow(...(this.filters as any[]))

    //  返回格式化后的数据
    return formatter(source) as T //  调用组合函数，返回格式化后的数据
  }

  /**
   * 使用请求拦截器
   * @private
   * @param {...AxiosRequestInterceptor[]} interceptors 请求拦截器
   * @returns {Http} 当前实例
   */
  private useRequestInterceptor(...interceptors: AxiosRequestInterceptor[]): Http {
    for (const interceptor of interceptors) {
      this.instance.interceptors.request.use(
        interceptor.onFulfilled as any,
        interceptor.onRejected,
      )
    }

    return this
  }

  /**
   * 使用响应拦截器
   * @private
   * @param {...AxiosResponseInterceptor[]} interceptors 响应拦截器
   * @returns {Http} 当前实例
   */
  private useResponseInterceptor(...interceptors: AxiosResponseInterceptor[]): Http {
    for (const interceptor of interceptors) {
      this.instance.interceptors.response.use(
        interceptor.onFulfilled,
        interceptor.onRejected,
      )
    }

    return this
  }

  /**
   * 使用响应格式化器
   * @private
   * @param {...ResponseFormatter[]} filters 响应格式化器
   * @returns {Http} 当前实例
   */
  private useResponseFilter(...filters: ResponseFormatter[]): Http {
    this.filters.push(...filters)

    return this
  }

  /**
   * 发送 GET 请求
   * @param {string} url 请求的 URL
   * @param {any} [params] 请求参数
   * @returns {Promise<T>} 请求的 Promise 对象
   * @template T 返回数据的类型
   */
  // async get<T>( //  get 方法
  //   url: string,
  //   params?: any,
  // ): Promise<T> {
  //   const response = await this.instance.get(
  //     `${url}?api-version=${import.meta.env.VITE_APP_API_Version}`,
  //     { params },
  //   )

  //   return this.getFormatData<T>(response)
  // }

  async get<T>( //  get 方法
    url: string,
    params?: any,
  ): Promise<T> {
    params = {
      ...params,
      'api-version': import.meta.env.VITE_APP_API_Version,
    }
    const response = await this.instance.get(
      url,
      { params },
    )

    return this.getFormatData<T>(response)
  }

  /**
   *  发送 POST 请求
   * @param {string} url 请求的 URL
   * @param {any} [data] 请求参数
   * @param {any} [params] 请求参数
   * @returns {Promise<T>} 请求的 Promise 对象
   */
  async post<T>( //  post 方法
    url: string,
    data?: any,
    params?: any,
  ): Promise<T> {
    params = {
      ...params,
      'api-version': import.meta.env.VITE_APP_API_Version,
    }
    const response = await this.instance.post(
    `${url}?api-version=`,
    data,
    { params },
    )

    return this.getFormatData<T>(response)
  }
}
