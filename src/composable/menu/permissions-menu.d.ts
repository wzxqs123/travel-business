/*
 * @Author: Czy
 * @Date: 2025-05-15 10:41:00
 * @FilePath: /travel-business/src/composable/menu/permissions-menu.d.ts
 *
 */
import { Menu } from './menu.d'

export interface StaffAuthenticationData {
  menus: Menu[]
  perms: string[]
  roles: Role[]
}

export interface Role {
  staffCount: number
  defaultRole: number
  id: string
  type: null | string
  name: string
  bizCode: string
  orderNo: number
  status: number
  remark: null
  tenantId: string
  orgId: null | string
}
