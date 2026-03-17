<template>
  <LayoutHeader class="header">
    <div class="flex justify-between items-center min-w-[1090px] h-full pr-[50px]">
      <img
        class="w-[171px] cursor-pointer"
        src="@/assets/logo-white.png"
        alt="logo"
      />
    </div>
  </LayoutHeader>
</template>
<script setup lang="ts">
import { watch, onMounted, ref, onUnmounted } from 'vue'
import { LayoutHeader, Scrollbar } from '@arco-design/web-vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import authStore from '@/auth/auth-store'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  localStorage.setItem('requestName', 'b2b')
  if (!authStore.value.token) {
    userStore.setLogonStatus(false)
    router.push('/')
  }
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
  padding: 0 110px;
}
</style>
