<!--
 * @Author: Czy
 * @Date: 2025-02-05 09:57:23
 * @FilePath: /b2b-official-website/src/views/personal-center/components/update-email.vue
 *  修改邮箱
-->
<template>
  <div class="text-[20px] font-bold">修改邮箱</div>
  <div class="mx-[1px] w-auto h-[1px] bg-[#E5E6EB] mt-[14px]"></div>

  <Space
    direction="vertical"
    size="large"
    class="mt-[24px]"
  >
    <Form
      :model="form"
      layout="vertical"
      ref="formRef"
    >
      <FormItem
        field="email"
        label="邮箱"
        :rules="[
          { required: true, message: '企业邮箱不能为空' },
          { required: true, type: 'email', message: '请输入正确邮箱' },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <Space direction="vertical">
          <Input
            v-model="form.oldEmail"
            :max-length="50"
            placeholder="请输入邮箱"
            class="!w-[490px]"
            disabled
          />
          <Input
            v-model="form.email"
            :max-length="50"
            placeholder="请输入新邮箱"
            class="!w-[490px]"
          />
        </Space>
      </FormItem>
    </Form>
    <Space size="large">
      <Button
        status="warning"
        class="!bg-[#FF5D15] !rounded-[6px] !w-[60px] !h-[32px]"
        type="primary"
        @click="updateEmail"
        >确定</Button
      >
      <Button
        class="!rounded-[6px] !text-[#1D2129]"
        @click="updateType()"
        >返回</Button
      >
    </Space>
  </Space>

  <Modal
    v-model:visible="visible"
    simple
    width="480px"
    modal-class="rounded-[30px]"
  >
    <template #title> 修改邮箱</template>
    <div class="px-[30px] font-[18px]">
      <div><icon-check-circle-fill class="text-[#00B578] mr-[4px]" />邮箱修改已成功</div>
      <div class="flex items-center justify-between mt-[10px]">
        <span>当前邮箱地址为{{ form.email }}</span>
        <span
          class="cursor-pointer"
          @click="onCopy(form.email)"
          >复制</span
        >
      </div>
    </div>

    <template #footer>
      <Button
        status="warning"
        class="!bg-[#FF5D15] !rounded-[6px] !w-[380px] !h-[50px]"
        type="primary"
        @click="onSubmit"
        >确定</Button
      >
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { Space, Form, FormItem, Input, Button, Modal, Message } from '@arco-design/web-vue'
import { copyText } from '@/utils/index'
import { useCompony, B2BCompanyInfoVO } from '@/composable/company/company'

const props = defineProps<{
  companyInfo: Partial<B2BCompanyInfoVO>
}>()

const formRef = ref()
const form = reactive({
  oldEmail: props.companyInfo.contactInfo?.email ?? '',
  email: '',
})
const visible = ref(false)

const onSubmit = () => {
  visible.value = false
  updateType()
}

const { updateCompanyInfo } = useCompony()

const updateEmail = () => {
  //

  formRef.value?.validate((res: any) => {
    if (!res) {
      updateCompanyInfo({
        email: form.email,
      }).then((res) => {
        if (res.code == 200) {
          Message.success('操作成功')
          visible.value = true
        }
      })
    }
  })

  // if (!form.email) return Message.error("请输入邮箱");
}
const onCopy = (text: string) => {
  copyText(text)
  Message.success('复制成功')
}

const emit = defineEmits(['updateType'])

const updateType = (type?: string) => {
  emit('updateType', type)
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
</style>
