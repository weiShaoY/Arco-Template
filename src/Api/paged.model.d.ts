/**
 * 分页接口返回数据结构  - 通用
 */
export type Paged<T> = {

  /**
   *  总条数
   */
  totalCount: number

  /**
   *  页码
   */
  current: number

  /**
   *  每页条数
   */
  pageSize: number

  /**
   *  总页数
   */
  totalPages: number

  /**
   *  是否有上一页
   */
  hasPrevPages: boolean

  /**
   *  是否有下一页
   */
  hasNextPages: boolean

  /**
   *  分页数据
   */
  items: T[]
}

/**
 *  分页请求参数 - 通用
 */
export type SearchablePage = {

  /**
   * 当前页
   */
  current: number

  /**
   * 每页条数
   */
  pageSize: number

  /**
   * 总条数
   */
  total: number
}
