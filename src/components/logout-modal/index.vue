<template>
  <Modal
    v-model:visible="visible"
    :width="480"
    :hide-title="true"
    :closable="false"
    :footer="false"
    modal-class="rounded-[30px]"
  >
    <div class="pt-[30px] mb-[40px] text-[##2F2F2F] text-[24px] leading-[34px] font-bold text-center">确定退出登录账号吗？</div>
    <div class="mb-[56px] text-[#2F2F2F] leading-[26px] text-[18px] text-center">退出登录后，你将无法接收到信息通知</div>
    <div class="pb-[26px] flex justify-center items-center">
      <Button
        type="outline"
        class="w-[150px] h-[50px] mx-[20px] !text-[#767675] leading-[50px] text-[16px] rounded-[12px] !border-[#767675]"
        @click="closeModal"
      >
        返回
      </Button>
      <Button
        type="primary"
        class="w-[150px] h-[50px] mx-[20px] !bg-[#FF4222] leading-[50px] text-[16px] rounded-[12px]"
        @click="logout"
      >
        退出
      </Button>
    </div>
  </Modal>
</template>
<script lang="ts" setup>
import { Modal, Button } from '@arco-design/web-vue'
import useAuth from '@/auth/use-auth'

const auth = useAuth()
const visible = ref(false)
const openVisible = () => {
  visible.value = true
}
const closeModal = () => {
  visible.value = false
}
const logout = () => {
  auth.logout()
}
defineExpose({
  openVisible,
})
</script>
<style lang="less" scoped></style>
