<template>
  <LayoutHeader
    class="header"
    :class="navIsOpacity && !headClassChange ? 'header-default' : 'header-change'"
  >
    <Scrollbar
      :outer-style="{ height: '100%' }"
      style="width: 100%; height: 100%; overflow-x: auto"
    >
      <div class="flex justify-between items-center min-w-[980px] px-[10px] h-full mx-[auto]">
        <img
          v-if="navIsOpacity && !headClassChange"
          class="w-[146px] cursor-pointer"
          src="https://hx-mp-res.hitrips.cn/b2b-official-website/logo-white.png"
          alt="logo"
          @click="goHome"
        />
        <img
          v-else
          class="w-[164px] cursor-pointer"
          src="https://hx-mp-res.hitrips.cn/b2b-official-website/tripwise-logo.png"
          alt="logo"
          @click="goHome"
        />
        <div class="flex items-center">
          <!-- <div
            v-for="(navItem, navIndex) in navList"
            :key="navIndex"
            class="flex mx-[20px] text-[16px] leading-[22px] cursor-pointer hover:text-[#00D7E5]"
            :class="navItem.id === userStore.navSelLogoned ? 'text-[#00D7E5]' : navIsOpacity && !headClassChange ? 'text-[#fff]' : 'text-[#2F2F2F]'"
            @click="onTapNav(navItem.id, navItem.url)"
          >
            <img
              v-if="navItem?.iconUrl"
              :src="navItem?.iconUrl"
              alt=""
              class="w-[22px] h-[22px] mr-[6px]"
            />
            <div>{{ navItem.name }}</div>
          </div>
          <div
            class="w-[1px] h-[21px] mx-[55px]"
            :class="navIsOpacity && !headClassChange ? 'bg-[rgba(255,255,255,0.5)]' : 'bg-[#767675]'"
          ></div> -->
          <!-- <div class="ml-[20px]">
          <Popover content-class="px-[0] rounded-[8px]">
            <Badge
              :count="messageNum"
              :max-count="99"
              :offset="[6, -5]"
              :dot-style="{ boxShadow: 'none' }"
            >
              <img
                class="w-[22px] h-[22px]"
                :src="
                  navIsOpacity && !headClassChange
                    ? 'https://hx-mp-res.hitrips.cn/b2b-official-website/message-notification-white.png'
                    : 'https://hx-mp-res.hitrips.cn/b2b-official-website/message-notification.png'
                "
                alt="message"
              />
            </Badge>
            <template #content>
              <Tabs v-model:active-key="selTabItem">
                <template #extra>
                  <Checkbox
                    value="unread"
                    class="mr-[28px] text-[#272E3B] text-[14px]"
                    >未读</Checkbox
                  >
                </template>
                <TabPane
                  v-for="tabItem in tabList"
                  :key="tabItem.id"
                >
                  <template #title>
                    <div
                      class="text-[16px]"
                      :class="
                        selTabItem === tabItem.id
                          ? 'text-[#1D2129] font-bold'
                          : 'text-[#86909C]'
                      "
                    >
                      {{ tabItem.name }}
                    </div>
                  </template>
                </TabPane>
              </Tabs>
              <div
                class="box-border w-[400px] px-[28px] py-[10px] mb-[4px] hover:bg-[#F8F8FA] last:mb-[0]"
              >
                <div class="flex">
                  <div class="relative mt-[4px] mr-[12px]">
                    <img
                      class="w-[36px] h-[36px] block"
                      src="https://hx-mp-res.hitrips.cn/b2b-official-website/blue-bg-logo.png"
                      alt=""
                    />
                    <div
                      class="absolute top-0 right-0 w-[8px] h-[8px] bg-[#FF4222] rounded-full"
                    ></div>
                  </div>
                  <div class="w-[295px]">
                    <div
                      class="text-[#1D2129] text-[14px] font-bold leading-[22px]"
                    >
                      酒店
                    </div>
                    <div
                      class="text-[#767675] text-[14px] leading-[22px] ellipsis-2"
                    >
                      审批请求已发送，请查收。多余换行换行换换换换换换换换换，最多显示两行
                    </div>
                    <div class="mt-[4px] flex justify-between items-center">
                      <div class="text-[#999A9F] text-[12px] leading-[20px]">
                        20分钟前
                      </div>
                      <div
                        class="text-[#2F2F2F] text-[14px] leading-[20px] cursor-pointer"
                      >
                        我已知悉
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex justify-between items-center w-[352px] mt-[10px] mx-[auto] border-t border-t-solid border-[#F3F4F8]"
              >
                <div
                  class="pt-[14px] text-[#767675] text-[14px] leading-[22px] cursor-pointer"
                >
                  全部已读
                </div>
                <div class="flex items-center pt-[14px] cursor-pointer">
                  <div class="mr-[2px]">查看所有通知</div>
                  <IconRight :size="16" />
                </div>
              </div>
            </template>
          </Popover>
        </div> -->
          <div class="ml-[36px]">
            <Popover content-class="rounded-[10px] px-[0] py-[10px]">
              <div class="flex items-center cursor-pointer">
                <div
                  class="text-[16px] leading-[22px]"
                  :class="navIsOpacity && !headClassChange ? 'text-[#fff]' : 'text-[#2F2F2F]'"
                >
                  {{ userStore.companyInfo?.contactInfo?.fullName || userStore.userDetails?.ext?.userInfo?.name || userStore.userDetails?.ext?.userInfo?.nickname || '-' }}
                </div>
                <IconDown
                  :size="16"
                  :class="navIsOpacity && !headClassChange ? 'text-[#fff]' : 'text-[#999A9F]'"
                />
              </div>
              <template #content>
                <!-- <div
                  class="w-[104px] h-[32px] mb-[2px] leading-[32px] text-center text-[#2F2F2F] text-[16px] cursor-pointer hover:bg-[#F3F4F8] last:mb-[0]"
                  @click="onPersonalCenter"
                >
                  个人中心
                </div>
                <div
                  class="w-[104px] h-[32px] mb-[2px] leading-[32px] text-center text-[#2F2F2F] text-[16px] cursor-pointer hover:bg-[#F3F4F8] last:mb-[0]"
                  @click="onOrderCenter"
                >
                  订单中心
                </div>
                <div
                  class="w-[104px] h-[32px] mb-[2px] leading-[32px] text-center text-[#2F2F2F] text-[16px] cursor-pointer hover:bg-[#F3F4F8] last:mb-[0]"
                  @click="onFinancialReconciliation"
                >
                  财务对账
                </div> -->
                <!-- <div
                class="w-[104px] h-[32px] mb-[2px] leading-[32px] text-center text-[#2F2F2F] text-[16px] cursor-pointer hover:bg-[#F3F4F8] last:mb-[0]"
              >
                消息中心
              </div> -->
                <div
                  class="w-[104px] h-[32px] mb-[2px] leading-[32px] text-center text-[#2F2F2F] text-[16px] cursor-pointer hover:bg-[#F3F4F8] last:mb-[0]"
                  @click="logout"
                >
                  退出登录
                </div>
              </template>
            </Popover>
          </div>
        </div>
      </div>
    </Scrollbar>
  </LayoutHeader>
  <LogoutModal ref="logoutModalRef"></LogoutModal>
</template>
<script setup lang="ts">
import { watch, onMounted, ref, onUnmounted, nextTick } from 'vue'
import { LayoutHeader, Popover, Badge, Tabs, TabPane, Checkbox, Scrollbar } from '@arco-design/web-vue'
import { IconDown, IconRight } from '@arco-design/web-vue/es/icon'
import { useUserStore } from '@/store/user'
import { useRoute, useRouter } from 'vue-router'
import { useAccount } from '@/composable/account/use-account'
import LogoutModal from '@/components/logout-modal/index.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { getInfo } = useAccount()
const headClassChange = ref(false)
const navIsOpacity = ref(false)
const logoutModalRef = ref()

const logout = () => {
  logoutModalRef.value.openVisible()
}
const goHome = () => {
  userStore.setNavSel('Hotel')
  router.push('/order-center')
}
const initNavSel = () => {
  nextTick(() => {
    const names = (route.name as string) || ''
    userStore.setNavSel(names)
  })
}
const getUserInfo = () => {
  getInfo().then((res) => {
    userStore.setUserDetails(res.data)
  })
}
watch(
  () => userStore.scrollTopNum,
  (val) => {
    if (val > 80) {
      headClassChange.value = true
    } else {
      headClassChange.value = false
    }
  }
)
watch(
  () => route.meta,
  () => {
    nextTick(() => {
      navIsOpacity.value = !!route.meta.navIsOpacity
    })
  }
)
watch(
  () => route.name,
  () => {
    initNavSel()
  }
)
watch(
  () => route.path,
  () => {
    nextTick(() => {
      if (route.path == '/') {
        router.push('/order-center')
      }
    })
  }
)
onMounted(() => {
  navIsOpacity.value = !!route.meta.navIsOpacity
  initNavSel()
  getUserInfo()
})
</script>
<style scoped lang="less">
.header {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  box-sizing: border-box;
  height: 96px;
  padding: 0 20px;
}
.header-default {
  background-color: rgba(255, 255, 255, 0);
}
.header-change {
  background-color: rgba(255, 255, 255, 1);
}
:deep(.arco-tabs-nav-tab-list) {
  margin-left: 12px;
  .arco-tabs-nav-ink {
    height: 3px;
    background: #2f2f2f;
    border-radius: 22px;
  }
}
</style>
