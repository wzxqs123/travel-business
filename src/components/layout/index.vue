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
    <LoginHeader v-if="userStore.isLogon && userStore.buyerRegisterStatus === '1'"></LoginHeader>
    <NoLoginHeader
      v-if="!userStore.isLogon || userStore.buyerRegisterStatus !== '1'"
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
        <Footer v-if="userStore.isLogon && userStore.buyerRegisterStatus === '1'"></Footer>
      </LayoutContent>
    </Scrollbar>

    <BackTop
      target-container="#basic-demo"
      :duration="1000"
      :style="{ position: 'absolute', ZIndex: 9999 }"
    >
      <div class="fixed bottom-[50px] right-[32px] w-[50px] h-[50px] rounded-full">
        <img
          src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/scroll-top.png"
          alt=""
          class="w-full h-full"
        />
      </div>
    </BackTop>
    <div
      v-if="userStore.isLogon && userStore.buyerRegisterStatus === '1'"
      class="absolute bottom-[120px] right-[12px] z-[99]"
    >
      <Trigger
        position="lb"
        :popup-translate="[0, 80]"
        auto-fit-position
        :unmount-on-close="false"
      >
        <img
          src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/customer-service.png"
          alt=""
          class="w-[90px]"
        />
        <template #content>
          <div class="w-[300px] pt-[25px] pb-[15px] px-[18px] bg-[#fff] rounded-[18px] customer-service-pop">
            <div class="flex items-center mb-[25px]">
              <img
                src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/default-service-avatar.png"
                alt=""
                class="w-[44px] h-[44px] mr-[6px]"
              />
              <div>
                <div class="mb-[6px] text-[#2F2F2F] text-[20px] font-[500] leading-[20px]">
                  {{ userStore.customerDetail?.title || '联系嗨行' }}
                </div>
                <div class="text-[#767675] text-[16px] font-[400] leading-[16px]">
                  {{ userStore.customerDetail?.description || '出行、订酒店、定制请联系' }}
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center pt-[20px] pb-[8px] border-[2px] border-solid border-[#fff] rounded-[20px] customer-service-pop-com">
              <div class="qr-code-com-bg mb-[14px]">
                <div class="overflow-hidden p-[10px] bg-[#EEFFF7] rounded-[20px]">
                  <img
                    :src="userStore.customerDetail?.weworkQrCodeUrl || userStore.customerDetail?.wechatQrCodeUrl || 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/service-qr-code.jpg'"
                    alt=""
                    class="w-[160px] h-[160px]]"
                  />
                </div>
              </div>
              <div>
                <div
                  v-if="userStore.customerDetail?.phone"
                  class="flex items-center pb-[6px]"
                >
                  <img
                    src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/blue-phone.png"
                    alt=""
                    class="w-[18px] h-[18px]"
                  />
                  <div class="ml-[8px]">
                    {{ userStore.customerDetail?.phone }}
                  </div>
                </div>
                <div
                  v-if="userStore.customerDetail?.tel"
                  class="flex items-center pb-[6px]"
                >
                  <img
                    src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/blue-phone.png"
                    alt=""
                    class="w-[18px] h-[18px]"
                  />
                  <div class="ml-[8px]">
                    {{ userStore.customerDetail?.tel }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Trigger>
    </div>
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
