import { appRoutes } from '../routes'

/**
 *  克隆 appRoutes 数组
 */
const mixinRoutes = [...appRoutes]

/**
 * 将路由配置映射到客户端菜单
 * @type {Array<object>}
 */
const appClientMenus = mixinRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el

  return {
    name,
    path,
    meta,
    redirect,
    children,
  }
})

export default appClientMenus
