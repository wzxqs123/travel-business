<!--
 * @Author: Czy
 * @Date: 2025-05-15 11:03:46
 * @FilePath: /travel-business/src/components/menus-layout/menu-items.vue
 *  
-->
<template>
  <template
    v-for="item in props.menusList"
    :key="item.path"
  >
    <template v-if="item.menuInfo.type == 'M' && item.children?.length">
      <SubMenu :key="item.path">
        <template #icon>
          <Icon
            v-if="!props.isChildrenMenu"
            :type="(item.menuInfo.icon as IconType)"
            :size="22"
          ></Icon>
        </template>
        <template #title>
          {{ item.menuInfo.menuName }}
        </template>

        <!-- <MenuItem
          v-for="child in item.children"
          :key="child.path"
          @click.prevent="onMenu(child)"
        >
          <template #icon> </template>
          {{ `${child.menuInfo.menuName}` }}
        </MenuItem> -->
        <menu-items
          :menusList="item.children"
          :isChildrenMenu="true"
          @onMenuGrafanaCurrentMenu="onMenuGrafanaCurrentMenu"
          @onMenu="onMenuItems"
        ></menu-items>
      </SubMenu>
    </template>
    <MenuItem
      v-else-if="item.menuInfo.type == 'C'"
      @click.prevent="onMenu(item)"
      :key="item.path"
    >
      <template #icon>
        <!-- <div
          class="bg-[red] w-[40px] h-[40px]"
          v-if="!props.isChildrenMenu"
        >
          2
        </div> -->
        <!-- {{ item.menuInfo.icon }} -->
        <Icon
          v-if="item.menuInfo.icon"
          :type="(item.menuInfo.icon as IconType)"
          :size="22"
        ></Icon>
      </template>
      {{ `${item.menuInfo.menuName}` }}
    </MenuItem>
  </template>
</template>
<script setup lang="ts">
import { SubMenu, MenuItem } from '@arco-design/web-vue'
import { Menu as IMenu } from '@/composable/menu/menu'
import { useRouter } from 'vue-router'
import { IconType } from './icon/icon-type'
import { Icon } from './icon'

const props = defineProps<{
  menusList: any[]
  isChildrenMenu?: boolean
}>()
const router = useRouter()
const emit = defineEmits(['onMenu', 'onMenuGrafanaCurrentMenu'])

const onMenuGrafanaCurrentMenu = (val: string) => {
  emit('onMenuGrafanaCurrentMenu', val)
}
const onMenu = (menu: IMenu, item?: IMenu) => {
  if (menu.menuInfo.isFrame == 0) {
    onMenuGrafanaCurrentMenu(menu.path)
    router.push({
      path: '/grafana/iframe',
    })
  } else {
    router.push({
      path: menu.path,
    })
  }
  onMenuItems(menu.path)
}
const onMenuItems = (val: string) => {
  emit('onMenu', val)
}
</script>
<style lang="less" scoped></style>
