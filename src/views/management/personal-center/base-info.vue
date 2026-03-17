<!--
 * @Author: Czy
 * @Date: 2025-01-24 18:06:35
 * @FilePath: /b2b-official-website/src/views/personal-center/base-info.vue
 *  
-->
<template>
  <!-- 用户信息 -->
  <UserInfo
    v-if="activityId == 0"
    @updateType="updateType"
    :companyInfo="companyInfo"
  />

  <!-- 修改名字 -->
  <UpdateName
    v-if="activityId == 1"
    @updateType="updateType"
    :companyInfo="companyInfo"
  />

  <!-- 修改邮箱 -->
  <UpdateEmail
    v-if="activityId == 2"
    @updateType="updateType"
    :companyInfo="companyInfo"
  />

  <!-- 修改密码 -->
  <UpdatePassword
    v-if="activityId == 3"
    @updateType="updateType"
    :companyInfo="companyInfo"
  />
</template>
<script lang="ts" setup>
import UserInfo from './components/user-info.vue'
import UpdateEmail from './components/update-email.vue'
import UpdateName from './components/update-name.vue'
import UpdatePassword from './components/update-password.vue'
import { useCompony, B2BCompanyInfoVO } from '@/composable/company/company'
import { useUserStore } from '@/store/user'
import { Message } from '@arco-design/web-vue'
import { AccountStatus } from '@/composable/company/company.d'
import { useRouter } from 'vue-router'

const activityId = ref(0)
const { getCompanyInfo } = useCompony()
const userStore = useUserStore()
const companyInfo = ref<Partial<B2BCompanyInfoVO>>({})
const router = useRouter()

const updateType = (type: string) => {
  if (type == 'name') {
    activityId.value = 1
  } else if (type == 'email') {
    activityId.value = 2
  } else if (type == 'password') {
    activityId.value = 3
  } else {
    activityId.value = 0
    getCompanyInfoFunction()
  }
}

onMounted(() => {
  getCompanyInfoFunction()
})

const getCompanyInfoFunction = () => {
  getCompanyInfo().then((res) => {
    companyInfo.value = res.data
    userStore.setBuyerRegisterStatus(res.data?.status)
    userStore.setCompanyInfo(res.data)
    if (res.data?.status === AccountStatus.BAN) {
      Message.error('您的账号已被封禁，请联系客服')
      router.push('/')
    }
  })
}
</script>

<style lang="less" scoped></style>
