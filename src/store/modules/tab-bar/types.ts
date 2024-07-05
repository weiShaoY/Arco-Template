export type TagProps = {
  title: string
  name: string
  fullPath: string
  query?: any
  ignoreCache?: boolean
}

export type TabBarState = {
  tagList: TagProps[]
  cacheTabList: Set<string>
}
