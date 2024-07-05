import type { AxiosResponse } from 'axios'

import type { ResponseFormatter } from './model'

/**
 * 格式化响应数据中间件
 * @param {AxiosResponse<any>} source 响应数据
 * @returns {any} 格式化后的数据
 */
const BusinessDateFormatter: ResponseFormatter = (source: AxiosResponse<any>): any => {
  // 获取响应数据
  const businessResponse = source.data

  // 假设业务数据格式为 { data: any }
  // 返回业务数据中的实际数据部分
  return businessResponse.data
}

export default BusinessDateFormatter
