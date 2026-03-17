<template>
  <div class="containers">
    <div
      v-if="isShowPage"
      class="head-bg-com"
    >
      <div class="flex items-center">
        <div class="mr-[120px]">
          <div class="mb-[5px] font-bold text-[50px] text-[#fff] tracking-[1px]">欢迎注册嗨行旅游账号</div>
          <div class="text-[#fff] text-[30px] leading-[44px]">让旅游成为快乐的事业</div>
        </div>
        <div
          v-if="userStore.buyerRegisterStatus !== '0'"
          class="box-border w-[884px] min-h-[710px] px-[38px] py-[50px] bg-[#fff] rounded-[30px]"
        >
          <div class="flex justify-center mb-[28px]">
            <div class="flex flex-col items-center justify-center">
              <div class="w-[20px] h-[20px] bg-[#00D7E5] text-[#fff] text-[12px] text-center leading-[20px] rounded-full">1</div>
              <div class="mt-[8px] text-[16px] text-[#2F2F2F] leading-[22px]">信息填写</div>
            </div>
            <div class="w-[136px] h-[1px] mt-[10px] mx-[-16px] bg-[#D8D8D8]"></div>
            <div class="flex flex-col items-center justify-center">
              <div class="w-[20px] h-[20px] bg-[#C7C7C7] text-[#fff] text-[12px] text-center leading-[20px] rounded-full">2</div>
              <div class="mt-[8px] text-[16px] text-[#767675] leading-[22px]">信息审核</div>
            </div>
          </div>
          <Form
            ref="formRef"
            :model="form"
            layout="vertical"
          >
            <Row
              :gutter="24"
              class="mb-[5px]"
            >
              <Col :span="12">
                <FormItem
                  field="contactInfo.fullName"
                  :rules="[{ required: true, message: '姓名不能为空' }]"
                  :validate-trigger="['change', 'input']"
                >
                  <template #label>
                    <span class="text-[16px] text-[#767675]">姓名</span>
                  </template>
                  <Input
                    v-model="form.contactInfo.fullName"
                    placeholder="请输入您的姓名"
                    :max-length="20"
                    class="h-[56px] px-[24px] bg-[rgba(255,255,255,0)] text-[16px] border border-solid border-[#D8D8D8] rounded-[12px] hover:bg-[rgba(255,255,255,0)] hover:border-[#D8D8D8] focus-within:!border-[rgb(var(--primary-6))]"
                  >
                  </Input>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem
                  field="contactInfo.phone"
                  :rules="[
                    { required: true, message: '手机号不能为空' },
                    { required: true, validator: verifyPhone },
                  ]"
                  :validate-trigger="['change', 'input']"
                >
                  <template #label>
                    <span class="text-[16px] text-[#767675]">手机号</span>
                  </template>
                  <Input
                    v-model="form.contactInfo.phone"
                    placeholder="请输入手机号"
                    :max-length="11"
                    class="h-[56px] px-[24px] bg-[rgba(255,255,255,0)] text-[16px] border border-solid border-[#D8D8D8] rounded-[12px] hover:bg-[rgba(255,255,255,0)] hover:border-[#D8D8D8] focus-within:!border-[rgb(var(--primary-6))]"
                  >
                  </Input>
                </FormItem>
              </Col>
            </Row>
            <Row
              :gutter="24"
              class="mb-[5px]"
            >
              <Col :span="12">
                <FormItem
                  field="companyName"
                  :rules="[{ required: true, message: '企业名称不能为空' }]"
                  :validate-trigger="['change', 'input']"
                >
                  <template #label>
                    <span class="text-[16px] text-[#767675]">企业名称</span>
                  </template>
                  <Input
                    v-model="form.companyName"
                    placeholder="请输入真实的企业名称"
                    :max-length="80"
                    class="h-[56px] px-[24px] bg-[rgba(255,255,255,0)] text-[16px] border border-solid border-[#D8D8D8] rounded-[12px] hover:bg-[rgba(255,255,255,0)] hover:border-[#D8D8D8] focus-within:!border-[rgb(var(--primary-6))]"
                  >
                  </Input>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem
                  field="contactInfo.email"
                  :rules="[
                    { required: true, message: '企业邮箱不能为空' },
                    {
                      required: true,
                      type: 'email',
                      message: '请输入正确邮箱',
                    },
                  ]"
                  :validate-trigger="['change', 'input']"
                >
                  <template #label>
                    <span class="text-[16px] text-[#767675]">企业邮箱</span>
                  </template>
                  <Input
                    v-model="form.contactInfo.email"
                    placeholder="请输入您的邮箱"
                    :max-length="50"
                    class="h-[56px] px-[24px] bg-[rgba(255,255,255,0)] text-[16px] border border-solid border-[#D8D8D8] rounded-[12px] hover:bg-[rgba(255,255,255,0)] hover:border-[#D8D8D8] focus-within:!border-[rgb(var(--primary-6))]"
                  >
                  </Input>
                </FormItem>
              </Col>
            </Row>
            <Row
              :gutter="24"
              class="mb-[5px]"
            >
              <Col :span="12">
                <FormItem
                  field="city.locationCode"
                  :rules="[{ required: true, message: '请选择省、市、区' }]"
                >
                  <template #label>
                    <span class="text-[16px] text-[#767675]">企业地址</span>
                  </template>
                  <Cascader
                    v-model="form.city.locationCode"
                    :options="options"
                    :field-names="{
                      value: 'id',
                      label: 'fullName',
                      children: 'subList',
                    }"
                    placeholder="请选择省市区"
                    allow-clear
                    class="h-[56px] px-[24px] bg-[rgba(255,255,255,0)] text-[16px] border border-solid border-[#D8D8D8] rounded-[12px] hover:bg-[rgba(255,255,255,0)] hover:border-[#D8D8D8] focus-within:!border-[rgb(var(--primary-6))]"
                  />
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem
                  field="address"
                  :rules="[{ required: true, message: '详细地址不能为空' }]"
                  :validate-trigger="['change', 'input']"
                >
                  <template #label>
                    <span class="text-[16px] text-[#767675]">详细地址</span>
                  </template>
                  <Input
                    v-model="form.address"
                    placeholder="请输入企业详细地址"
                    :max-length="60"
                    class="h-[56px] px-[24px] bg-[rgba(255,255,255,0)] text-[16px] border border-solid border-[#D8D8D8] rounded-[12px] hover:bg-[rgba(255,255,255,0)] hover:border-[#D8D8D8] focus-within:!border-[rgb(var(--primary-6))]"
                  >
                  </Input>
                </FormItem>
              </Col>
            </Row>
            <Row
              :gutter="24"
              class="mb-[5px]"
            >
              <Col :span="12">
                <FormItem
                  field="cooperationMode"
                  :rules="[{ required: true, message: '请选择合作方式' }]"
                >
                  <template #label>
                    <span class="text-[16px] text-[#767675]">合作方式</span>
                  </template>
                  <Select
                    v-model="form.cooperationMode"
                    placeholder="请选择合作方式"
                    class="h-[56px] px-[24px] bg-[rgba(255,255,255,0)] text-[16px] border border-solid border-[#D8D8D8] rounded-[12px] hover:bg-[rgba(255,255,255,0)] hover:border-[#D8D8D8] focus-within:!border-[rgb(var(--primary-6))]"
                  >
                    <Option
                      v-for="item in cooperationModeList"
                      :key="item.value"
                      :value="item.value"
                    >
                      {{ item.label }}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem
                  field="businessLicenseNumber"
                  :rules="[{ required: true, message: '营业执照注册号不能为空' }]"
                  :validate-trigger="['change', 'input']"
                >
                  <template #label>
                    <span class="text-[16px] text-[#767675]">营业执照注册号</span>
                  </template>
                  <Input
                    v-model="form.businessLicenseNumber"
                    placeholder="请输入营业执照注册号"
                    :max-length="50"
                    class="h-[56px] px-[24px] bg-[rgba(255,255,255,0)] text-[16px] border border-solid border-[#D8D8D8] rounded-[12px] hover:bg-[rgba(255,255,255,0)] hover:border-[#D8D8D8] focus-within:!border-[rgb(var(--primary-6))]"
                  >
                  </Input>
                </FormItem>
              </Col>
            </Row>
            <Button
              type="primary"
              long
              class="h-[50px] mt-[20px] text-[16px] rounded-[12px]"
              :disabled="userStore.buyerRegisterStatus === '2'"
              :loading="isLoading"
              @click="handleSubmit"
            >
              确定
            </Button>
          </Form>
        </div>
        <div
          v-if="userStore.buyerRegisterStatus === '0'"
          class="box-border w-[552px] min-h-[440px] px-[38px] py-[50px] bg-[#fff] rounded-[30px]"
        >
          <div class="flex justify-center mb-[42px]">
            <div class="flex flex-col items-center justify-center">
              <div class="w-[20px] h-[20px] bg-[#C7C7C7] text-[#fff] text-[12px] text-center leading-[20px] rounded-full">1</div>
              <div class="mt-[8px] text-[16px] text-[#767675] leading-[22px]">信息填写</div>
            </div>
            <div class="w-[136px] h-[1px] mt-[10px] mx-[-16px] bg-[#D8D8D8]"></div>
            <div class="flex flex-col items-center justify-center">
              <div class="w-[20px] h-[20px] bg-[#00D7E5] text-[#fff] text-[12px] text-center leading-[20px] rounded-full">2</div>
              <div class="mt-[8px] text-[16px] text-[#2F2F2F] leading-[22px]">信息审核</div>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <img
              class="w-[88px] h-[70px] mb-[15px]"
              src="https://hx-mp-res.hitrips.cn/b2b-official-website/under-review.png"
              alt=""
            />
            <div class="text-[#2F2F2F] text-[18px] leading-[22px] mb-[36px]">正在审核</div>
            <div class="mb-[60px] text-[#767675] text-[16px] leading-[22px] text-center">我们在您提交注册信息后1-10日内会进行信息核对，<br />届时请您留意通知结果短信。。</div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="w-[100%] h-[100vh]"
    >
      <img
        class="w-[100%] h-[100vh]"
        src="https://hx-mp-res.hitrips.cn/b2b-official-website/buyer-register-bg.jpg"
        alt=""
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Form, FormItem, Input, Row, Col, Cascader, Select, Option, Button, Message } from '@arco-design/web-vue'
import { FormQuery, AdCodeProvinceDTO } from '@/composable/buyer-register/buyer-register.d'
import { isMobile } from '@/utils'
import { useBuyerRegister } from '@/composable/buyer-register/buyer-register'
import { useCompony } from '@/composable/company/company'
import { AccountStatus } from '@/composable/company/company.d'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const { companyRegister, adCodeAll } = useBuyerRegister()
const { getCompanyInfo } = useCompony()
const userStore = useUserStore()
const router = useRouter()
const formRef = ref()
const form = ref<FormQuery>({
  contactInfo: {
    fullName: '',
    phone: '',
    email: '',
  },
  companyName: '',
  city: {
    cityId: '',
    cityName: '',
    provinceId: '',
    provinceName: '',
    locationCode: '',
  },
  address: '',
  cooperationMode: 'XML/API系统直连',
  businessLicenseNumber: '',
})
const options = ref<AdCodeProvinceDTO[]>([])
const cooperationModeList = ref([
  {
    value: 'XML/API系统直连',
    label: 'XML/API系统直连',
  },
])
const isLoading = ref(false)
const isShowPage = ref(false)

const verifyPhone = (value: string, callback: any) => {
  if (!isMobile(value)) {
    callback('手机号不正确')
  } else {
    callback()
  }
}
// 获取公司信息-状态
const getCompanyInfoFunction = () => {
  isShowPage.value = false
  getCompanyInfo()
    .then((res) => {
      userStore.setBuyerRegisterStatus(res.data?.status)
      userStore.setCompanyInfo(res.data)
      if (res.data?.status === AccountStatus.NORMAL) {
        router.push('/order-center')
      } else {
        isShowPage.value = true
        if (res.data?.status === AccountStatus.BAN) {
          Message.error('您的账号已被封禁，请联系客服')
          const { contactInfo, companyName, city, address, cooperationMode, businessLicenseNumber } = res.data
          form.value = {
            contactInfo,
            companyName,
            city: { ...city, locationCode: city.cityId },
            address,
            cooperationMode,
            businessLicenseNumber,
          }
          router.push('/')
        }
      }
    })
    .catch(() => {
      isShowPage.value = true
    })
}
const findLocationPath = (data: AdCodeProvinceDTO[], locationCode: string): { fullName: string; id: string }[] | null => {
  for (const item of data) {
    const { fullName, id } = item
    if (item.id === locationCode) {
      return [{ fullName, id }]
    }

    if (item.subList && item.subList.length > 0) {
      const pathInChildren = findLocationPath(item.subList, locationCode)
      if (pathInChildren) {
        return [{ fullName, id }, ...pathInChildren]
      }
    }
  }

  return null // Not found
}
watch(
  () => form.value?.city?.locationCode,
  () => {
    const locationPath = findLocationPath(options.value, form.value?.city?.locationCode)
    if (locationPath && locationPath.length > 0) {
      form.value.city.provinceId = locationPath[0].id
      form.value.city.provinceName = locationPath[0].fullName
      form.value.city.cityId = locationPath?.[1]?.id
      form.value.city.cityName = locationPath?.[1]?.fullName
    } else {
      form.value.city.provinceId = ''
      form.value.city.provinceName = ''
      form.value.city.cityId = ''
      form.value.city.cityName = ''
    }
  }
)
const handleSubmit = () => {
  formRef.value.validate().then((res: any) => {
    if (!res) {
      const { provinceId, provinceName, cityId, cityName } = form.value.city
      if (provinceId && cityId && provinceName && cityName) {
        isLoading.value = true
        companyRegister(form.value)
          .then(() => {
            userStore.setBuyerRegisterStatus('0')
          })
          .finally(() => {
            isLoading.value = false
          })
      } else {
        Message.error('请选择省市区')
      }
    }
  })
}
// 获取省市区列表
const onAdCodeAll = () => {
  adCodeAll().then((res) => {
    options.value = res.rows
  })
}
onMounted(() => {
  onAdCodeAll()
  getCompanyInfoFunction()
})
</script>
<style scoped lang="less">
.containers {
  width: 100%;
  position: relative;
  min-width: 1440px;
  background-color: #fff;

  .head-bg-com {
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding-top: 96px;
    background-image: url('https://hx-mp-res.hitrips.cn/login-b2b/background-image.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
