import { Notification } from '@arco-design/web-vue'

import type { AxiosResponse } from 'axios'

import type { AxiosResponseInterceptor } from './model'

/**
 *  业务数据
 */
type BusinessData = {

  /**
   *  业务状态码
   */
  code: number

  /**
   *  业务消息
   */
  message: string

  /**
   *  业务数据
   */
  data: any

  /**
   *  业务状态
   */
  success: boolean
}

/**
 * 业务数据拦截器，对于业务的异常代码等都在此处拦截处理
 * @type {AxiosResponseInterceptor}
 */
const BusinessInterceptor: AxiosResponseInterceptor = {

  /**
   * 响应成功时的处理函数
   * @param {AxiosResponse<unknown>} response 响应数据
   * @returns {Promise<AxiosResponse<unknown>>} 处理后的响应数据或错误
   */
  async onFulfilled(response: AxiosResponse<unknown>): Promise<AxiosResponse<unknown>> {
    // 判断 HTTP 响应码
    if (response.status !== 200) {
      // ArcoMessage.error('请求失败，请联系管理员解决');
      Notification.error({
        title: '请求失败',
        content: '请联系管理员解决',
      })

      return Promise.reject(response)
    }

    const data = response.data as BusinessData

    // 判断接口返回的业务状态码
    if (data.code === 200) {
      return response
    }
    else {
      // ArcoMessage.error(data.message);
      Notification.error({
        content: data.message,
      })

      return Promise.reject(response)
    }
  },
}

export default BusinessInterceptor
