/**
 * 白名单路由列表
 */
export const WHITE_LIST = [
  { name: 'notFound', children: [] },
  { name: 'login', children: [] },
]

/**
 *  404路由
 */
export const NOT_FOUND = {
  name: 'notFound',
}

/**
 *  重定向路由名称
 */
export const REDIRECT_ROUTE_NAME = 'Redirect'

/**
 *  默认路由名称
 */
export const DEFAULT_ROUTE_NAME = 'Category'

/**
 *  默认路由配置
 */
export const DEFAULT_ROUTE = {
  title: '工作台',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/dashboard/workplace',
}
