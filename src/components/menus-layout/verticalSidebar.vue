<template>
  <LayoutSider
    collapsible
    :collapsed="menuData.collapsed"
    :width="208"
    @collapse="menuData.collapsed = !menuData.collapsed"
    class="sidebar"
    id="mainSider"
  >
    <div
      class="sidebar-head"
      v-if="!hideLogo"
      @click="autoOpenFun"
    >
      <img
        v-if="menuData.collapsed"
        class="sidebar-head-collapse-logo"
        src="./../../assets/logo.png"
        alt=""
      />
      <img
        v-else
        class="sidebar-head-logo"
        src="./../../assets/hx-logo.png"
        alt=""
      />
    </div>
    <div class="menu-wrapper">
      <Menu
        :selected-keys="selectedKeys"
        :open-keys="openKeys"
        @sub-menu-click="onSubMenu"
      >
        <MenuItems
          :menusList="menuData.menus"
          @onMenuGrafanaCurrentMenu="onMenuGrafanaCurrentMenu"
          @onMenu="onMenu"
        ></MenuItems>
      </Menu>
    </div>
  </LayoutSider>
</template>
<script setup lang="ts">
import { Menu, LayoutSider } from '@arco-design/web-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
// import menuGrafanaCurrentMenu from '@/composable/menu/menu-grafana-current-menu'
import { watchOnce } from '@vueuse/shared'
import MenuItems from './menu-items.vue'
const props = defineProps<{
  hideLogo?: boolean
  menuUrl?: string
  name?: string
  params?: any
  isPermissionsMenu?: boolean
}>()
const selectedKeys = ref<string[]>([])
// const { menus, collapsed, permissionsList, roles } = useMenu(props.menuUrl, props.name, props.params, props.isPermissionsMenu)

const menuData = reactive({
  menus: [
    {
      name: '/order-center',
      path: '/order-center',
      hidden: false,
      redirect: null,
      component: 'Layout',
      query: '',
      alwaysShow: null,
      meta: {
        title: '订单管理',
        icon: 'file-list-line',
        noCache: false,
        link: null,
      },
      menuInfo: {
        menuId: '1660954978933927937',
        pathMethod: null,
        menuName: '订单管理',
        parentId: '0',
        sort: 1,
        path: '/order-center',
        component: '',
        query: '',
        isFrame: 1,
        isCache: 0,
        type: 'C',
        hidden: false,
        status: '0',
        icon: 'file-list-line',
        apiPath: null,
        extData: null,
        createBy: '',
        createTime: '2023-05-23 18:25:01',
        updateBy: '',
        updateTime: '2024-11-28 19:27:35',
        remark: '',
        tenantId: '2FBJ9X3RUCFB8KLCDKRJRX4KGB5QRZNJ',
        children: null,
      },
      clientInfo: {
        id: null,
        clientId: 'xxx',
        webServerRedirectUri: null,
        clientName: null,
      },
      children: null,
    },
    {
      name: '/finance-reconciliation',
      path: '/finance-reconciliation',
      hidden: false,
      redirect: null,
      component: 'Layout',
      query: '',
      alwaysShow: null,
      meta: {
        title: '财务对账',
        icon: 'draft-line',
        noCache: false,
        link: null,
      },
      menuInfo: {
        menuId: '1920297407172460592',
        pathMethod: null,
        menuName: '财务对账',
        parentId: '0',
        sort: 2,
        path: '/finance-reconciliation',
        component: '',
        query: '',
        isFrame: 1,
        isCache: 0,
        type: 'C',
        hidden: false,
        status: '0',
        icon: 'draft-line',
        apiPath: null,
        extData: null,
        createBy: '',
        createTime: '2023-05-23 18:25:01',
        updateBy: '',
        updateTime: '2024-11-28 19:27:35',
        remark: '',
        tenantId: '2FBJ9X3RUCFB8KLCDKRJRX4KGB5QRZNJ',
        children: null,
      },
      clientInfo: {
        id: null,
        clientId: 'xxx',
        webServerRedirectUri: null,
        clientName: null,
      },
      children: null,
    },

    {
      name: 'EnterpriseWallet',
      path: '/enterprise-wallet',
      hidden: false,
      redirect: null,
      component: 'Layout',
      query: '',
      alwaysShow: null,
      meta: {
        title: '企业钱包',
        icon: 'draft-line',
        noCache: false,
        link: null,
      },
      menuInfo: {
        menuId: '1920297407172160593',
        pathMethod: null,
        menuName: '企业钱包',
        parentId: '0',
        sort: 2,
        path: '/enterprise-wallet',
        component: '',
        query: '',
        isFrame: 1,
        isCache: 0,
        type: 'C',
        hidden: false,
        status: '0',
        icon: 'draft-line',
        apiPath: null,
        extData: null,
        createBy: '',
        createTime: '2023-05-23 18:25:01',
        updateBy: '',
        updateTime: '2024-11-28 19:27:35',
        remark: '',
        tenantId: '2FBJ9X3RUCFB8KLCKRJRX4KGB5QRZNJ',
        children: null,
      },
      clientInfo: {
        id: null,
        clientId: 'xxx',
        webServerRedirectUri: null,
        clientName: null,
      },
      children: null,
    },
  ],
  collapsed: false,
})

const openKeys = ref<string[]>([])

const route = useRoute()
const onMenu = (val: string) => {
  selectedKeys.value = [val]
}
const onMenuGrafanaCurrentMenu = (val: string) => {
  // menuGrafanaCurrentMenu.value = val
  console.log('点击', val)
}
const onSubMenu = (key: string) => {
  const openKeysIndex = openKeys.value.indexOf(key)
  if (openKeysIndex == -1) {
    openKeys.value.push(key)
  } else {
    openKeys.value.splice(openKeysIndex, 1)
  }
}
const autoOpenFun = () => {
  if (openKeys.value.length < menuData.menus.length) {
    openKeys.value = menuData.menus.map((menusItem) => {
      return menusItem.path
    })
  } else {
    openKeys.value = []
  }
}
watchOnce(
  () => route.path,
  (newRoute) => {
    selectedKeys.value = [newRoute]
  },
  {
    immediate: true,
  }
)
const emit = defineEmits(['emitMenus', 'onPermissionInfo'])

// watchOnce(
//   () => menus.value,
//   () => {
//     autoOpenFun()
//     emit('emitMenus', menus.value)
//     emit('onPermissionInfo', { permissionsList: permissionsList.value, roles: roles.value })
//   }
// )
</script>
<style lang="less" scoped>
.sidebar {
  // background-color: rgb(249, 253, 255);
  :deep(.arco-menu-light) {
    // background-color: rgb(250, 253, 255, 0);
    .arco-menu-inline {
      .arco-menu-inline-header {
        line-height: 56px;
        // background-color: rgb(250, 253, 255, 0);
        // &:hover {
        //   background-color: rgb(250, 253, 255, 0);
        //   color: rgb(var(--primary-6));
        //   .arco-icon {
        //     color: rgb(var(--primary-6));
        //   }
        // }
      }
      // .arco-menu-inline-header.arco-menu-selected {
      //   background-color: rgb(250, 253, 255, 0);
      //   box-shadow: none;
      // }
    }
    .arco-menu-item {
      line-height: 46px;
      // background-color: rgb(250, 253, 255, 0);
      // &:hover {
      //   color: rgb(var(--primary-6));
      //   background-color: rgb(250, 253, 255, 0);
      // }
    }
    // .arco-menu-selected {
    //   background: #fff;
    //   // box-shadow: 0 4px 16px 0 rgba(0, 65, 102, 0.08);
    //   color: rgb(var(--primary-6));
    // }
  }

  // :deep(.arco-layout-sider-trigger-light) {
  //   background-color: rgb(250, 253, 255, 0);
  // }

  .sidebar-head {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 56px;

    .sidebar-head-logo {
      display: block;
      width: 129px;
      margin-left: 35px;
    }
    .sidebar-head-collapse-logo {
      display: block;
      width: 32px;
      margin: 0 auto;
    }
  }

  .menu-wrapper {
    height: calc(100% - 56px);
    overflow: auto;
    overflow-x: hidden;
    :deep(.arco-menu) {
      height: 100%;
      ::-webkit-scrollbar {
        width: 12px;
        height: 4px;
      }

      ::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        background-clip: padding-box;
        border-radius: 7px;
        background-color: var(--color-text-4);
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-text-3);
      }
    }
  }
}
</style>
