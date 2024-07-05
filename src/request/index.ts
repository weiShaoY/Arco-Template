import BusinessDateFormatter from './businessDateFormatter'

import BusinessInterceptor from './BusinessInterceptor'

import HttpStatusInterceptor from './HttpStatusInterceptor'

import AxiosHttp from './axiosHttp'

import type { HttpTypeConfig } from './model'

const defaultConfig: HttpTypeConfig = {
  axios: {},
  formatter: BusinessDateFormatter,
  requestInterceptors: [],
  responseInterceptors: [HttpStatusInterceptor, BusinessInterceptor],
}

/**
 *  创建 AxiosHttp 实例
 */
const ApiRequest = AxiosHttp.Of(
  import.meta.env.VITE_API_URL,
  defaultConfig,
)

export {
  ApiRequest,
}

// 默认用 ApiRequest
export default ApiRequest
