<!--
 * @Author: Czy
 * @Date: 2025-02-05 09:57:23
 * @FilePath: /b2b-official-website/src/views/personal-center/components/user-info.vue
 *  用户信息
-->
<template>
  <div class="text-[20px] flex items-center justify-between font-bold">
    <span> 用户信息 </span>
    <Button
      class="!rounded-[6px] !text-[#1D2129]"
      @click="updateType('name')"
      >编辑</Button
    >
  </div>
  <div class="mx-[1px] w-auto h-[1px] bg-[#E5E6EB] mt-[14px]"></div>

  <div class="mt-[0px] flex items-center justify-between flex-wrap">
    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">姓名</span>
      <span class="mt-[10px]">{{ companyInfo?.contactInfo?.fullName || '-' }}</span>
    </div>

    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">手机号码</span>
      <span class="mt-[10px]">{{ userStore.userDetails?.ext?.userInfo?.phone || '-' }}</span>
    </div>

    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">邮件</span>
      <span class="mt-[10px]">{{ companyInfo?.contactInfo?.email || '-' }}</span>
    </div>
  </div>

  <div class="text-[20px] font-bold mt-[40px]">安全设置</div>
  <div class="mx-[1px] w-auto h-[1px] bg-[#E5E6EB] mt-[14px]"></div>
  <div class="flex items-center justify-between pb-[20px] flex-no-wrap">
    <div class="bg-[#F8F8FA] box-border min-w-[320px] mt-[20px] mr-[20px] px-[24px] py-[15px] flex items-center justify-between flex-1 rounded-[6px]">
      <div class="flex">
        <img
          src="https://hx-mp-res.hitrips.cn/b2b-official-website/update-email.png"
          mode="scaleToFill"
          class="w-[44px] h-[40px]"
        />
        <div class="flex flex-col ml-[12px]">
          <span>绑定邮箱</span>
          <div class="text-[#999A9F] truncate">用于相关通知接受</div>
        </div>
      </div>

      <Button
        status="warning"
        class="!rounded-[6px] !w-[60px] !h-[32px] custom-btn"
        type="outline"
        @click="updateType('email')"
        >修改</Button
      >
    </div>

    <div class="bg-[#F8F8FA] box-border min-w-[320px] mt-[20px] mr-[20px] px-[24px] py-[15px] flex items-center justify-between flex-1 rounded-[6px]">
      <div class="box-border flex truncate">
        <img
          src="https://hx-mp-res.hitrips.cn/b2b-official-website/update-password.png"
          mode="scaleToFill"
          class="w-[44px] h-[40px]"
        />
        <div class="flex flex-col ml-[12px]">
          <span>登录密码</span>
          <div class="text-[#999A9F]">确保您的账号安全，每个月可以修改3次密码</div>
        </div>
      </div>

      <Button
        status="warning"
        class="!bg-[#FF5D15] !rounded-[6px] !w-[60px] !h-[32px]"
        type="primary"
        @click="updateType('password')"
        >修改</Button
      >
    </div>
  </div>

  <div class="text-[20px] flex items-center justify-between font-bold mt-[40px]">
    <span> 企业信息 </span>
  </div>
  <div class="mx-[1px] w-auto h-[1px] bg-[#E5E6EB] mt-[14px]"></div>

  <div class="mt-[0px] flex items-center justify-between flex-wrap">
    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">营业执照注册号</span>
      <span class="mt-[10px]">{{ companyInfo?.businessLicenseNumber || '-' }}</span>
    </div>

    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">企业名称</span>
      <span class="mt-[10px]">{{ companyInfo?.companyName || '-' }}</span>
    </div>

    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">状态</span>
      <span class="mt-[10px]">
        <DictTag
          text
          type="B2B_ACCOUNT_STATUS"
          :value="companyInfo?.status"
        />
      </span>
    </div>

    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">联系电话</span>
      <span class="mt-[10px]">{{ companyInfo?.contactInfo?.phone || '-' }}</span>
    </div>

    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">城市</span>
      <span class="mt-[10px]">{{ companyInfo?.city?.provinceName || '-' }}-{{ companyInfo?.city?.cityName || '-' }}</span>
    </div>

    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">联系地址</span>
      <span class="mt-[10px]">{{ companyInfo?.address }}</span>
    </div>
  </div>

  <div class="text-[20px] flex items-center justify-between font-bold mt-[40px]">
    <span> 授权信息 </span>

    <Button
      class="!rounded-[6px] !text-[#1D2129]"
      @click="applyAuth()"
      v-if="!apiObj?.apiId"
      >申请授权信息</Button
    >

    <Button
      class="!rounded-[6px] !text-[#1D2129]"
      @click="openResetModal"
      v-else
      >重置SecretKey</Button
    >
  </div>
  <div class="mx-[1px] w-auto h-[1px] bg-[#E5E6EB] mt-[14px]"></div>

  <div class="mt-[0px] flex items-center justify-between flex-wrap">
    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">API ID</span>
      <span class="mt-[10px]">{{ apiObj?.apiId || '-' }}</span>
    </div>

    <div class="w-1/2 flex flex-col text-[16px] mt-[24px]">
      <span class="text-[#999A9F]">SecretKey</span>
      <span
        class="mt-[10px]"
        v-if="!apiObj?.apiId"
        >-</span
      >

      <Trigger
        trigger="click"
        show-arrow
        v-else
      >
        <img
          src="https://hx-mp-res.hitrips.cn/b2b-official-website/reminder-icon.png"
          alt=""
          class="w-[23px] h-[23px] cursor-pointer"
        />
        <template #content>
          <div class="demo-arrow">出于安全考虑，Secretkey不再被明文保存，忘记密钥请点击重置</div>
        </template>
      </Trigger>

      <!-- <Tooltip
        content="出于安全考虑，Secretkey不再被明文保存，忘记密钥请点击重置"
        position="bl"
        background-color="rgba(0,0,0,0.6)"
        v-else
      >
        <img
          src="https://hx-mp-res.hitrips.cn/b2b-official-website/reminder-icon.png"
          alt=""
          class="w-[23px] h-[23px] cursor-pointer"
        />
      </Tooltip> -->
    </div>
  </div>

  <Modal
    v-model:visible="authVisible"
    simple
    width="460px"
    modal-class="rounded-[30px] "
  >
    <template #title>授权信息</template>

    <div class="text-[#FF4222] mt-[30px]">
      <icon-info-circle-fill class="text-[#FF4222]" />
      每个SecretKey只能查看一次，未保存则无法再次获取。这要求开发者在首次获取时务必妥善保存。
    </div>

    <div class="text-[#999A9F] mt-[24px]">API ID</div>

    <div class="flex items-center justify-between mt-[2px]">
      <span>{{ apiObj?.apiId || '-' }}</span>
    </div>

    <div class="text-[#999A9F] mt-[24px]">SecretKey</div>

    <div class="flex items-center justify-between mt-[2px]">
      <span class="break-all">{{ apiObj?.secret || '-' }}</span>
      <span
        class="ml-2 cursor-pointer shrink-0"
        @click="onCopy(apiObj?.secret)"
        >复制</span
      >
    </div>

    <template #footer>
      <Button
        status="warning"
        class="!bg-[#FF5D15] !rounded-[6px] !w-[380px] !h-[50px]"
        type="primary"
        @click=";(authVisible = false), onCopy(apiObj?.secret)"
        >确认并复制</Button
      >
    </template>
  </Modal>

  <Modal
    v-model:visible="resetVerificationVisible"
    simple
    width="460px"
    modal-class="rounded-[30px] "
  >
    <template #title>重置验证</template>
    <Form
      :model="form"
      layout="vertical"
    >
      <FormItem
        field="name"
        label="手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
        :validate-trigger="['change', 'input']"
      >
        <Input
          v-model="form.phone"
          placeholder="请输入手机号"
          :defaultVisibility="false"
          class="!w-[380px]"
          disabled
        />
      </FormItem>

      <FormItem
        field="phone"
        label="验证码"
        :rules="[{ required: true, message: '请输入短信验证码' }]"
        :validate-trigger="['change', 'input']"
      >
        <Input
          v-model="form.operateToken"
          placeholder="请输入短信验证码"
          class="!w-[380px]"
        >
          <template #suffix>
            <div
              class="text-[#FF5D15] text-[14px]"
              v-if="showCountTime"
            >
              {{ countTime }}S
            </div>
            <div
              class="text-[#FF5D15] text-[14px] cursor-pointer"
              v-else
              @click="handleSendCode"
            >
              发送验证码
            </div>
          </template>
        </Input>
      </FormItem>
      <div
        v-if="showCountTime"
        class="flex justify-end flex-1 text-[#767675] text-[14px] -mt-[16px] mb-[10px] w-[380px]"
      >
        验证码已发送，15分钟内输入有效
      </div>
    </Form>

    <div class="text-[#FF4222] mt-[30px]">
      <icon-info-circle-fill class="text-[#FF4222]" />
      每个SecretKey只能查看一次，未保存则无法再次获取。这要求开发者在首次获取时务必妥善保存。
    </div>

    <template #footer>
      <Button
        status="warning"
        class="!bg-[#FF5D15] !rounded-[6px] !w-[380px] !h-[50px]"
        type="primary"
        @click="onGenerate"
        >生成</Button
      >
    </template>
  </Modal>

  <Modal
    v-model:visible="resetVisible"
    simple
    width="460px"
    modal-class="rounded-[30px] "
  >
    <template #title> 重置</template>

    <div class="text-[#FF4222] mt-[30px]">
      <icon-info-circle-fill class="text-[#FF4222]" />
      每个SecretKey只能查看一次，未保存则无法再次获取。这要求开发者在首次获取时务必妥善保存。
    </div>

    <div class="text-[#999A9F] mt-[24px]">SecretKey</div>

    <div class="flex items-center justify-between mt-[2px]">
      <span class="break-all">{{ apiObj?.secret || '-' }}</span>
      <span
        class="ml-2 cursor-pointer shrink-0"
        @click="onCopy(apiObj?.secret)"
        >复制</span
      >
    </div>

    <template #footer>
      <Button
        status="warning"
        class="!bg-[#FF5D15] !rounded-[6px] !w-[380px] !h-[50px]"
        type="primary"
        @click=";(resetVisible = false), onCopy(apiObj?.secret)"
        >确认并复制</Button
      >
    </template>
  </Modal>

  <div class="pb-[30px]"></div>
</template>
<script lang="ts" setup>
import { Form, FormItem, Input, Button, Modal, Message, Tooltip, Trigger } from '@arco-design/web-vue'
import { copyText } from '@/utils/index'
import { B2BCompanyInfoVO } from '@/composable/company/company'
import { useOpenApi, OpenClientDTO } from '@/composable/open-api/open-api'
import { DictTag } from '@/components/dictionary/index'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const apiObj = ref<OpenClientDTO>({})

const { getClientDetail, createClient, generateCaptcha, refreshSecret } = useOpenApi()

const props = defineProps<{
  companyInfo: Partial<B2BCompanyInfoVO>
}>()
const showCountTime = ref(false)
const countTime = ref(60)
const authVisible = ref(false)
const emit = defineEmits(['updateType'])
const form = reactive({
  phone: userStore.userDetails?.ext?.userInfo?.phone || '',
  operateToken: '',
})
const onCopy = (text?: string) => {
  if (!text) {
    return
  }
  copyText(text)
  Message.success('复制成功')
}
const resetVisible = ref(false)
const resetVerificationVisible = ref(false)
const updateType = (type: string) => {
  if (type === 'password') return goUpdatePwd()
  emit('updateType', type)
}

import useAuth from '@/auth/use-auth'

const { updatePwd } = useAuth()

//跳转修改密码
const goUpdatePwd = () => {
  updatePwd(userStore.userDetails?.ext?.userInfo?.phone)
  // window.open(
  //   `https://sso.dev.arltr.cn/#/update-password?phone=${props?.companyInfo?.contactInfo?.phone}`
  // );
}
onMounted(() => {
  getClientDetailFunction()
})

const getClientDetailFunction = (secret?: string) => {
  getClientDetail({ bizCode: 'B2B_OPEN' }).then((res) => {
    // if (res.code == 200) {
    //   openApiInfo.value = res.data;
    // }
    apiObj.value = {
      ...apiObj.value,
      ...res.data,
    }
    apiObj.value.secret = secret || apiObj.value.secret
    // console.log("api", res.data);
  })
}

const openResetModal = () => {
  form.operateToken = ''
  form.phone = userStore.userDetails?.ext?.userInfo?.phone ?? ''
  resetVerificationVisible.value = true
}
const onGenerate = () => {
  if (!form.operateToken) return Message.error('请输入验证码')
  refreshSecret({ apiId: apiObj.value?.apiId, operateToken: '123' }).then((res) => {
    if (res.code == 200) {
      apiObj.value.secret = res.data?.secret
      Message.success('操作成功')
      resetVerificationVisible.value = false
      resetVisible.value = true
    }
  })
}

const handleSendCode = () => {
  if (!apiObj.value?.apiId) return
  generateCaptcha({ apiId: apiObj.value.apiId }).then(() => countDown())
}

const countDown = () => {
  showCountTime.value = true

  if (countTime.value == 0) {
    countTime.value = 60
    showCountTime.value = false
    return
  }

  setTimeout(() => {
    countTime.value--
    countDown()
  }, 1000)
}
const applyAuth = () => {
  createClient().then((res) => {
    apiObj.value = res.data
    getClientDetailFunction(apiObj.value.secret)
  })
  authVisible.value = true
}
</script>
<style lang="less" scoped>
:deep(.arco-form-item-label-required-symbol) {
  display: none;
}
:deep(.arco-input-wrapper) {
  border-radius: 6px;
  border: 1px solid #d3d9e0;
  background: #fff;
  padding: 6px 14px;
}
.demo-arrow {
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0px 5px 30px -12px rgba(71, 71, 71, 0.1);
  border-radius: 10px 10px 10px 10px;
  padding: 13px 16px;
  color: #fff;
}
:deep(.custom-btn) {
  &.arco-btn-outline.arco-btn-status-warning {
    color: #ff5d15;
    border-color: #ff5d15;
  }
}
</style>
