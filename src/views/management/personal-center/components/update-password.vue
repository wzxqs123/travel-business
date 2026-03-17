<!--
 * @Author: Czy
 * @Date: 2025-02-05 09:57:23
 * @FilePath: /b2b-official-website/src/views/personal-center/components/update-name.vue
 *  修改姓名
-->
<template>
  <!-- 修改姓名的标题 -->
  <div class="text-[20px] font-bold">修改姓名</div>
  <!-- 分隔线 -->
  <div class="mx-[1px] w-auto h-[1px] bg-[#E5E6EB] mt-[14px]"></div>

  <!-- 表单区域 -->
  <Space
    direction="vertical"
    size="large"
    class="mt-[24px]"
  >
    <!-- 姓名输入表单 -->
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
    <!-- 按钮区域 -->
    <Space size="large">
      <Button
        status="warning"
        class="!bg-[#FF5D15] !rounded-[6px] !w-[60px] !h-[32px]"
        type="primary"
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
  // 导入必要的组件
  import { Space, Form, FormItem, Input, Button } from "@arco-design/web-vue";

  // 定义表单数据
  const form = reactive({
    fullName: "",
  });

  // 定义 emit 用于触发父组件的事件
  const emit = defineEmits(["updateType"]);

  // 定义更新类型的方法，用于返回上一级页面
  const updateType = (type?: string) => {
    emit("updateType", type);
  };
</script>
<style lang="less" scoped>
  // 调整表单项标签的样式
  :deep(.arco-form-item-label-required-symbol) {
    display: none;
  }
  // 调整输入框的样式
  :deep(.arco-input-wrapper) {
    border-radius: 6px;
    border: 1px solid #d3d9e0;
    background: #fff;
    padding: 6px 14px;
  }
</style>
