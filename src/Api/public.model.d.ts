// 公共类型文件
/**
 * 公共类型  分页器类型
 */
export type PagedResponseModel<T> = {

  /**
   *  总条数
   */
  totalCount: number

  /**
   *  页码
   */
  pageNumber: number

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
   * 数据
   */

  /**
   *  分页数据
   */
  items: T[]
}
