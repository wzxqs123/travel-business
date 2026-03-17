<!--
 * @Author: Czy
 * @Date: 2025-02-08 11:37:29
 * @FilePath: /b2b-official-website/src/components/layout/index.vue
 *  
-->
<template>
  <Layout
    class="layout"
    @click="searchStore.closeAllTrigger()"
  >
    <LoginHeader v-if="userStore.isLogon && router.currentRoute.value.path != '/'"></LoginHeader>
    <NoLoginHeader
      v-if="!userStore.isLogon || router.currentRoute.value.path == '/'"
      :routerPath="routerPath"
      @setScroll="setScroll"
    ></NoLoginHeader>
    <!-- style="height: 100vh; overflow: auto" -->
    <Scrollbar
      id="basic-demo"
      @scroll="onScroll"
      ref="scrollRef"
      style="height: 100vh; overflow: auto"
    >
      <LayoutContent class="min-w-[1440px]">
        <RouterView v-slot="{ Component }">
          <keep-alive v-if="needKeep">
            <component :is="Component" />
          </keep-alive>
          <component
            v-if="!needKeep"
            :is="Component"
          />
        </RouterView>
      </LayoutContent>
    </Scrollbar>

    <BackTop
      target-container="#basic-demo"
      :duration="1000"
      :style="{ position: 'absolute', ZIndex: 9999 }"
    >
      <div class="fixed bottom-[50px] right-[32px] w-[50px] h-[50px] rounded-full">
        <img
          src="https://hx-mp-res.hitrips.cn/b2b-official-website/scroll-top.png"
          alt=""
          class="w-full h-full"
        />
      </div>
    </BackTop>
  </Layout>
</template>
<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import { Layout, LayoutContent, Scrollbar, BackTop, Trigger } from '@arco-design/web-vue'
import NoLoginHeader from '@/components/no-login-header/index.vue'
import LoginHeader from '@/components/login-header/index.vue'
import Footer from '@/components/footer/index.vue'
import { useUserStore, useSearch } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import authStore from '@/auth/auth-store'
import { useAccount } from '@/composable/account/use-account'
import WOW from 'wow.js'

const userStore = useUserStore()
const searchStore = useSearch()
const router = useRouter()
const route = useRoute()
const { customerDetail } = useAccount()
const routerPath = ref('/')
const scrollRef = ref()
const needKeep = ref(false)

const onScroll = (e: any) => {
  userStore.setScrollTopNum(e.target.scrollTop)
  if (route.meta.initNoBackTop) {
    userStore.setPrevPageScrollTopNum(e.target.scrollTop)
  }
}
const getCustomerInfo = () => {
  customerDetail().then((res) => {
    userStore.setCustomerDetail(res.data)
  })
}
const setScroll = (val?: number) => {
  nextTick(() => {
    scrollRef?.value?.scrollTo({ top: val || 0 })
  })
}

watch(
  () => router.currentRoute.value,
  (cur) => {
    routerPath.value = router.currentRoute.value.path
    needKeep.value = !!cur?.meta?.keepAlive

    // 获取当前页是否初始化是否要返回页面顶部
    if (!route?.meta?.initNoBackTop) {
      setScroll()
    } else {
      setScroll(userStore.prevPageScrollTopNum)
    }
  },
  {
    immediate: true,
  }
)
watch(
  () => userStore.isSetBackTop,
  () => {
    if (userStore.isSetBackTop) {
      setScroll(0)
      userStore.updatedIsSetBackTop(false)
    }
  }
)

onMounted(() => {
  getCustomerInfo()
  if (authStore.value.token) {
    userStore.setLogonStatus(true)
  } else {
    userStore.setLogonStatus(false)
  }

  const wow = new WOW({
    boxClass: 'wow', // 类名，在用户滚动时显示隐藏的框。
    animateClass: 'animated', // 触发CSS动画的类名称
    offset: 200, // 定义浏览器视口底部与隐藏框顶部之间的距离。当用户滚动并到达此距离时，隐藏的框会显示出来。
    mobile: true, // 在移动设备上打开/关闭WOW.js。
    live: true, // 在页面上同时检查新的WOW元素。
    scrollContainer: '#basic-demo',
  })
  wow.init()
})
</script>
<style src="wow.js/css/libs/animate.css"></style>
<style lang="less" scoped>
.layout {
  position: relative;
  min-height: 100vh;
}
.customer-service-pop {
  box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);
  .customer-service-pop-com {
    background: linear-gradient(180deg, #e6fdff 0%, #ffffff 16%);
    box-shadow: 0px -8px 30px 0px rgba(0, 215, 229, 0.15);
    .qr-code-com-bg {
      box-sizing: border-box;
      width: 184px;
      padding: 3px;
      background: linear-gradient(157deg, rgba(110.57522177696228, 255, 255, 1), rgba(255, 255, 255, 1));
      border-radius: 20px;
    }
  }
}
</style>
