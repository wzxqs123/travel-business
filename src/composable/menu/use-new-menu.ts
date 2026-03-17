/*
 * @Author: Czy
 * @Date: 2024-03-14 09:30:35
 * @FilePath: /travel-business/src/composable/menu/use-new-menu.ts
 *
 */
import { computed, ref } from 'vue'
import { Menu } from './menu'
import { StaffAuthenticationData, Role } from './permissions-menu.d'
import useFetch from '@/fetch/use-fetch'
import { Result } from '@/types/fetch'

const fetch = useFetch()

//获取菜单信息
const menus = ref<Menu[]>([])
const permissionsList = ref<string[]>([])
const roles = ref<Role[]>([])
const currentAppId = ref<any>(localStorage.getItem('menuId'))
const currentApp = ref<string>('')
let loading = false

const collapsed = ref(false)

const getMenus = (url: string, params?: any) => {
  if (loading) {
    return
  }
  loading = true
  return fetch
    .get<Result<Menu[]>>(url, {
      params,
    })
    .then((res) => {
      menus.value = res.data
      if (currentAppId.value) {
        menus.value.forEach((item) => {
          if (item.menuInfo.menuId == currentAppId.value) {
            currentApp.value = item.path.slice(0)
          }
        })
      } else {
        currentAppId.value = menus.value?.[0]?.menuInfo?.menuId
        currentApp.value = menus.value?.[0]?.path.slice(0)
        localStorage.setItem('menuId', currentAppId.value)
      }
    })
    .finally(() => {
      loading = false
    })
}
const getPermissionsMenu = (url: string) => {
  if (loading) {
    return
  }
  loading = true
  return fetch
    .get<Result<StaffAuthenticationData>>(url)
    .then((res) => {
      menus.value = res.data.menus
      permissionsList.value = res.data.perms
      roles.value = res.data.roles
      if (currentAppId.value) {
        menus.value.forEach((item) => {
          if (item.menuInfo.menuId == currentAppId.value) {
            currentApp.value = item.path.slice(0)
          }
        })
      } else {
        currentAppId.value = menus.value?.[0]?.menuInfo?.menuId
        currentApp.value = menus.value?.[0]?.path.slice(0)
        localStorage.setItem('menuId', currentAppId.value)
      }
    })
    .finally(() => {
      loading = false
    })
}

const useMenu = (url?: string, name?: string, params?: any, isPermissionsMenu?: boolean) => {
  // const menuUrl = `/app/${name ?? apps.requestName.value}${url ? url : '/query/menu/list'}`
  const menuUrl = `/app/${name ?? '123'}${url ? url : '/query/menu/list'}?tenantId=`
  if (isPermissionsMenu) {
    getPermissionsMenu(menuUrl)
  } else {
    getMenus(menuUrl, params)
  }

  const tapAppMenus = (menuId: string, appName: string, isFrame?: boolean) => {
    currentAppId.value = menuId
    currentApp.value = appName
    collapsed.value = isFrame || false
  }

  return {
    menus: computed(() => {
      return menus.value
    }),
    permissionsList: computed(() => {
      return permissionsList.value
    }),
    roles: computed(() => {
      return roles.value
    }),
    collapsed,
    currentAppId,
    currentApp,
    tapAppMenus,
  }
}

export default useMenu
