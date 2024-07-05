/**
 *  客户端-登录模块-注册/登录-请求参数
 */
export type AuthApiRegisterAndLoginRequest = {

  /**
   *  手机号
   */
  phone: string

  /**
   *  手机 验证码
   */
  captcha: string
}
