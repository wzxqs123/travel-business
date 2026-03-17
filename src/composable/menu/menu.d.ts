export interface MenuData {
  up: Menu[]
  down: Menu[]
}
export interface Menu {
  name: string
  path: string
  hidden: boolean
  redirect: null | string
  component: string
  query: string
  alwaysShow: boolean | null
  meta: Meta
  menuInfo: MenuInfo
  clientInfo: ClientInfo | null
  children?: Menu[] | null
}
export interface MenuInfo {
  menuId: string
  pathMethod: null
  menuName: string
  parentId: string
  sort: number
  path: string
  component: string
  query: string
  isFrame: number
  isCache: number
  type: string
  hidden: boolean
  status: string
  icon: string
  apiPath: string
  extData: null
  createBy: null
  createTime: null
  updateBy: null
  updateTime: null
  remark: null
  tenantId: string
  children: MenuInfo[] | null
}

export interface Meta {
  title: string
  icon: string
  noCache: boolean
  link: null
}
export interface ClientInfo {
  id: string | null
  clientId: string | null
  webServerRedirectUri: string | null
  clientName: string | null
}
