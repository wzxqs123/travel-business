<!--
 * @Date: 2023-12-08 18:58:55
 * @LastEditTime: 2025-05-15 14:44:27
 * @FilePath: /travel-business/src/components/menus-layout/index.vue
 *  
-->
<template>
  <Layout class="layouts">
    <Layout>
      <verticalSidebar
        v-if="showMenu"
        hideLogo
      ></verticalSidebar>
      <LayoutContent>
        <div class="bg-[#F3F5F7] p-[16px]">
          <slot />
        </div>
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import { Layout, LayoutContent } from '@arco-design/web-vue'
import verticalSidebar from './verticalSidebar.vue'
const router = useRouter()

onMounted(() => {})

let showMenu = ref(true)

onUnmounted(() => {})
const goPath = () => {
  router.push({
    path: '/welcome',
  })
}
</script>
<style lang="less" scoped>
.layouts {
  //   min-height: 100vh;
  width: 100%;
  margin-top: 96px;
}
.header-box {
  // align-items: center;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  // color: #101011;
  // display: flex;
  // flex: 0 0 56px;
  // font-size: 20px;
  // height: 56px;
  // justify-content: space-between;
  // left: 0;
  // padding-left: 8px;
  // padding-right: 24px;
  // position: -webkit-sticky;
  // position: sticky;
  // top: 0;
  // z-index: 500;
}
</style>
