import { Message } from '@arco-design/web-vue'

import type { AxiosResponseInterceptor } from './model'

// import router from '@/router'

const ArcoMessage = Message

/**
 * 网络请求拦截器（处理http协议层异常 401 403 404 500 503 504）
 */
const HttpStatusInterceptor: AxiosResponseInterceptor = {

  //   error=>拦截response.status为非100-399类

  onRejected(error: any) {
    if (error.response.status === 401)
      ArcoMessage.error('登录以过期,请重新登录')

    // 跳转到登录页
    // router.push('/login')

    else if (error.response.status === 403)
      ArcoMessage.error('禁止访问')

    else if (error.response.status === 404)
      ArcoMessage.error('资源未找到')

    else if (error.response.status === 500)
      ArcoMessage.error('服务器内部错误')

    else if (error.response.status === 503)
      ArcoMessage.error('服务不可用')

    else if (error.response.status === 504)
      ArcoMessage.error('网关超时')

    else ArcoMessage.error('请求失败, 请检查网络')

    //
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('请求失败')
  },
}

export default HttpStatusInterceptor
