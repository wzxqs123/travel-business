<template>
  <LayoutHeader
    class="header"
    :class="headClassChange ? 'header-change' : ''"
  >
    <Scrollbar
      :outer-style="{ height: '100%' }"
      style="width: 100%; height: 100%; overflow-x: auto"
    >
      <div class="flex justify-between items-center min-w-[1090px] h-full pr-[50px] head-com">
        <img
          v-if="headClassChange"
          class="w-[146px] cursor-pointer"
          src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/logo-blue.png"
          alt="logo"
          @click="goHome"
        />
        <img
          v-else
          class="w-[146px] cursor-pointer"
          src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/login-b2b/logo.png"
          alt="logo"
          @click="goHome"
        />
        <div
          v-if="props.routerPath !== '/buyer-register'"
          class="flex items-center"
        >
          <div
            v-for="(navItem, navIndex) in navList"
            :key="navIndex"
            class="mx-[32px] text-[16px] leading-[22px] cursor-pointer"
            :class="
              navItem.id === userStore.navSel
                ? headClassChange
                  ? 'text-[#00D7E5] font-bold'
                  : 'text-[#fff] font-bold'
                : headClassChange
                ? 'text-[#2F2F2F] hover:text-[#00D7E5]'
                : 'text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.8)]'
            "
            @click="onTapNav(navItem.id)"
          >
            {{ `${navItem.name}` }}
          </div>
          <div class="w-[1px] h-[21px] mx-[20px] bg-[rgba(255,255,255,0.3)]"></div>
          <div class="flex items-center pl-[26px]">
            <img
              class="w-[34px] h-[22px] cursor-pointer"
              :src="headClassChange ? 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/cn-black.png' : 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/cn.png'"
              alt="中文"
            />
          </div>
          <div class="flex items-center ml-[66px]">
            <div
              class="h-[32px] px-[19px] mx-[10px] text-[14px] leading-[30px] border border-solid rounded-full cursor-pointer hover:text-[#00D7E5] hover:border-[#00D7E5]"
              :class="headClassChange ? 'text-[#2F2F2F] border-[#767675]' : 'text-[#fff] border-[rgba(255,255,255,0.4)]'"
              @click="onBuyerRegister"
            >
              买家注册
            </div>
            <div
              class="h-[32px] px-[19px] mx-[10px] text-[14px] leading-[30px] border border-solid rounded-full cursor-pointer hover:text-[#00D7E5] hover:border-[#00D7E5]"
              :class="headClassChange ? 'text-[#2F2F2F] border-[#767675]' : 'text-[#fff] border-[rgba(255,255,255,0.4)]'"
              @click="onSellerSettled"
            >
              卖家入驻
            </div>
          </div>
          <div
            v-if="!userStore.isLogon"
            class="ml-[30px] text-[16px] leading-[22px] cursor-pointer hover:text-[#00D7E5]"
            :class="headClassChange ? 'text-[#2F2F2F]' : 'text-[#fff]'"
            @click="goLogin"
          >
            登录
          </div>
          <div
            v-else
            class="ml-[30px] text-[16px] leading-[22px] cursor-pointer hover:text-[#00D7E5]"
            :class="headClassChange ? 'text-[#2F2F2F]' : 'text-[#fff]'"
            @click="onLogout"
          >
            退出登录
          </div>
        </div>
      </div>
    </Scrollbar>

    <Toast
      :visible="visible"
      textWord="卖家入驻请及时联系平台商谈合作"
    ></Toast>
    <LogoutModal ref="logoutModalRef"></LogoutModal>
  </LayoutHeader>
</template>
<script setup lang="ts">
import { watch, onMounted, ref, onUnmounted } from 'vue'
import { LayoutHeader, Scrollbar, Message } from '@arco-design/web-vue'
import { useUserStore } from '@/store/user'
import { useRouter, useRoute } from 'vue-router'
import useAuth from '@/auth/use-auth'
import Toast from '@/components/toast/index.vue'
import authStore from '@/auth/auth-store'
import { useCompony } from '@/composable/company/company'
import { AccountStatus } from '@/composable/company/company.d'
import LogoutModal from '@/components/logout-modal/index.vue'

const props = defineProps<{
  routerPath: string
}>()
const emit = defineEmits<{
  (e: 'setScroll', value?: number): void
}>()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { getCompanyInfo } = useCompony()
const headClassChange = ref(false)
const screenHeight = ref(0)
const navList = ref([
  {
    name: '首页',
    id: 'index',
  },
  {
    name: '酒店',
    id: 'hotel',
  },
  {
    name: '机票',
    id: 'ticket',
  },
  {
    name: '火车票',
    id: 'train',
  },
])
const { login } = useAuth()
const appId = ref('')
const visible = ref(false)
const logoutModalRef = ref()

// 定义一个函数来更新屏幕高度
const updateScreenHeight = () => {
  screenHeight.value = window.innerHeight
}
const onTapNav = (id: string) => {
  userStore.setNavSel(id)
  emit('setScroll', 0)
}
const goLogin = () => {
  login(appId.value, 'b2b').then((res: string) => {
    window.location.href = res
  })
}
// 买家注册
const onBuyerRegister = () => {
  if (authStore.value.token) {
    getCompanyInfo().then((res) => {
      userStore.setBuyerRegisterStatus(res.data?.status)
      userStore.setCompanyInfo(res.data)
      if (userStore.buyerRegisterStatus !== AccountStatus.BAN) {
        router.push('/buyer-register')
      } else {
        Message.error('您的账号已被封禁，请联系客服')
      }
    })
  } else {
    goLogin()
  }
}
const onSellerSettled = () => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 2000)
}
const onLogout = () => {
  logoutModalRef.value.openVisible()
}
const goHome = () => {
  router.push('/')
}
// 获取公司信息-状态
const getCompanyInfoFunction = () => {
  if (!window.location.href.includes('/personal-center')) {
    getCompanyInfo().then((res) => {
      userStore.setBuyerRegisterStatus(res.data?.status)
      userStore.setCompanyInfo(res.data)
      if (res.data?.status === AccountStatus.IN_REVIEW || !res.data) {
        router.push('/buyer-register')
      } else if (res.data?.status === AccountStatus.NORMAL && route.meta.isNoLoginPage) {
        router.push('/hotel')
      } else if (res.data?.status === AccountStatus.BAN) {
        Message.error('您的账号已被封禁，请联系客服')
        router.push('/')
      }
    })
  }
}
watch(
  () => userStore.scrollTopNum,
  (val) => {
    if (val > screenHeight.value - 96) {
      headClassChange.value = true
    } else {
      headClassChange.value = false
    }
  }
)
watch(
  () => route.path,
  () => {
    nextTick(() => {
      if (!window.location.href.includes('/buyer-register') && authStore.value.token && !userStore.buyerRegisterStatus && !route.meta.isNoLoginPage) {
        // 如果当前页面非买家注册页，则执行获取公司信息函数
        getCompanyInfoFunction()
      }
    })
  }
)

onMounted(() => {
  appId.value = import.meta.env.VITE_APP_APPID || ''
  localStorage.setItem('appId', appId.value)
  localStorage.setItem('requestName', 'b2b')
  if (!authStore.value.token) {
    userStore.setLogonStatus(false)
    router.push('/')
  }
  updateScreenHeight()
  // 监听resize事件，以便在窗口大小改变时更新屏幕高度
  window.addEventListener('resize', updateScreenHeight)

  if (!window.location.href.includes('/buyer-register') && authStore.value.token) {
    // 如果当前页面非买家注册页，则执行获取公司信息函数
    getCompanyInfoFunction()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenHeight)
})
</script>
<style scoped lang="less">
.header {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  box-sizing: border-box;
  height: 96px;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(2px);
  padding: 0 110px;
  .head-com {
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
}
.header-change {
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(30px);
  .head-com {
    border-bottom: 1px solid #44beeb;
  }
}
</style>
