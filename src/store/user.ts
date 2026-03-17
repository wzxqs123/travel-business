import { ref } from 'vue'
import { defineStore } from 'pinia'
import { UserInfo } from '@/composable/account/info'
import { useRouter } from 'vue-router'
import { CustomerDetailVO } from '@/composable/account/info'
import { B2BCompanyInfoVO } from '@/composable/company/company'

const router = useRouter()

export const useUserStore = defineStore('user', () => {
  const isLogon = ref(false)
  const scrollTopNum = ref(0)
  const prevPageScrollTopNum = ref(0) // 上一页滚动条位置
  const isSetBackTop = ref(false)
  const navSel = ref('index')
  const navSelLogoned = ref('Hotel')
  const userDetails = ref<Partial<UserInfo>>({}) // 用户详情
  const buyerRegisterStatus = ref<string | null | undefined>(undefined) // 买家注册审核状态
  const customerDetail = ref<Partial<CustomerDetailVO>>({}) // 客服信息
  const companyInfo = ref<Partial<B2BCompanyInfoVO>>({})
  const setLogonStatus = (status: boolean) => {
    isLogon.value = status
  }
  const setScrollTopNum = (num: number) => {
    scrollTopNum.value = num
  }
  const setPrevPageScrollTopNum = (num: number) => {
    prevPageScrollTopNum.value = num
  }
  const setNavSel = (sel: string) => {
    if (isLogon.value && buyerRegisterStatus.value === '1') {
      navSelLogoned.value = sel
    } else {
      navSel.value = sel
    }
  }
  const setUserDetails = (info: Partial<UserInfo>) => {
    userDetails.value = {
      ...userDetails.value,
      ...info,
    }
  }
  const setBuyerRegisterStatus = (status: string | null | undefined) => {
    buyerRegisterStatus.value = status
  }
  const setCustomerDetail = (val: Partial<CustomerDetailVO>) => {
    customerDetail.value = val
  }
  const setCompanyInfo = (info: Partial<B2BCompanyInfoVO>) => {
    companyInfo.value = {
      ...companyInfo.value,
      ...info,
    }
  }
  const updatedIsSetBackTop = (val: boolean) => {
    isSetBackTop.value = val
  }
  return {
    isLogon,
    scrollTopNum,
    prevPageScrollTopNum,
    navSel,
    navSelLogoned,
    userDetails,
    buyerRegisterStatus,
    customerDetail,
    companyInfo,
    isSetBackTop,
    setLogonStatus,
    setScrollTopNum,
    setNavSel,
    setUserDetails,
    setBuyerRegisterStatus,
    setCustomerDetail,
    setCompanyInfo,
    updatedIsSetBackTop,
    setPrevPageScrollTopNum,
  }
})
