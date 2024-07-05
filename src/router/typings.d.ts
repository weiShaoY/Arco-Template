import 'vue-router'

declare module 'vue-router' {

  /**
   * 扩展的路由元信息类型
   */
  type RouteMeta = {

    /**
     * 可以访问页面的角色
     */
    roles?: number

    /**
     * 是否需要登录才能访问当前页面（每个路由都必须声明）
     */
    requiresAuth: boolean

    /**
     * 在侧边菜单中显示的图标
     */
    icon?: string

    /**
     * 在侧边菜单和面包屑中显示的区域设置名称
     */
    locale?: string

    /**
     * 如果为 true，则不在侧边菜单中显示
     */
    hideInMenu?: boolean

    /**
     * 如果为 true，则子菜单不显示在侧边菜单中
     */
    hideChildrenInMenu?: boolean

    /**
     * 如果设置了名称，菜单将根据设置的名称进行高亮显示
     */
    activeMenu?: string

    /**
     * 路由菜单项的排序值，值越高越靠前
     */
    order?: number

    /**
     * 如果为 true，则标签不会固定在标签栏中
     */
    noAffix?: boolean

    /**
     * 如果为 true，则页面不会被缓存
     */
    ignoreCache?: boolean
  }
}
