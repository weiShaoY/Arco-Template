// import md5 from 'md5-ts'

import type {
  AuthApiRegisterAndLoginRequest,
} from './model'

import Request from '@/request'

/**
 * 登录注册相关接口封装
 */
class AuthApi {
  /**
   *  客户端-登录模块-获取验证码
   *  @param phone 手机号
   */
  async GetCaptcha(
    phone: string,
  ): Promise<void> {
    return Request.get(
      '/api/Auth/GetCaptcha',
      {
        phone,
      },
    )
  }

  /**
   *  客户端-登录模块-登录/注册
   */
  async RegisterAndLogin(data: AuthApiRegisterAndLoginRequest): Promise<{
    token: string
  } > {
    return Request.post(
      '/api/Auth/RegisterAndLogin',
      data,
    )
  }
}

export default new AuthApi()
