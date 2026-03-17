<!--
 * @Author: Czy
 * @Date: 2025-02-05 09:57:23
 * @FilePath: /b2b-official-website/src/views/personal-center/components/update-name.vue
 *  修改姓名
-->
<template>
  <div class="text-[20px] font-bold">修改姓名</div>
  <div class="mx-[1px] w-auto h-[1px] bg-[#E5E6EB] mt-[14px]"></div>

  <Space
    direction="vertical"
    size="large"
    class="mt-[24px]"
  >
    <Form
      :model="form"
      layout="vertical"
    >
      <FormItem
        field="fullName"
        label="姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
        :validate-trigger="['change', 'input']"
      >
        <Input
          v-model="form.fullName"
          placeholder="请输入姓名"
          class="!w-[490px]"
        />
      </FormItem>
    </Form>
    <Space size="large">
      <Button
        status="warning"
        class="!bg-[#FF5D15] !rounded-[6px] !w-[60px] !h-[32px]"
        type="primary"
        @click="updateName"
        >确定</Button
      >
      <Button
        class="!rounded-[6px] !text-[#1D2129]"
        @click="updateType()"
        >返回</Button
      >
    </Space>
  </Space>
</template>
<script lang="ts" setup>
  import {
    Space,
    Form,
    FormItem,
    Input,
    Button,
    Message,
  } from "@arco-design/web-vue";
  import { useCompony, B2BCompanyInfoVO } from "@/composable/company/company";

  const props = defineProps<{
    companyInfo: Partial<B2BCompanyInfoVO>;
  }>();

  const { updateCompanyInfo } = useCompony();

  const form = reactive({
    fullName: props.companyInfo.contactInfo?.fullName ?? "",
  });
  const emit = defineEmits(["updateType"]);

  const updateType = (type?: string) => {
    emit("updateType", type);
  };

  const updateName = () => {
    // console.log("1111");
    if (!form.fullName) return Message.error("请输入姓名");
    updateCompanyInfo({
      fullName: form.fullName,
    }).then((res) => {
      if (res.code == 200) {
        Message.success("操作成功");
        updateType();
      }
    });
  };
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
