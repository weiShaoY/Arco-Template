/**
 *   全局公共函数
 */
class CommonApi {
  /**
   *   获取随机背景视频
   */
  async BackgroundVideoUrl(): Promise<string> {
    const res = await fetch('https://v.api.aa1.cn/api/api-fj/index.php?aa1=json')

    const data = await res.json()

    return `https:${data.mp4}`
  }

  /**
   *   获取随机背景图片 (https://api.aa1.cn/doc/bz-v3.html)
   */
  async BackgroundImageUrl(): Promise<string> {
    const res = await fetch('https://v.api.aa1.cn/api/bz-v3/?msg=美女')

    return res.url
  }
}

export default new CommonApi()
