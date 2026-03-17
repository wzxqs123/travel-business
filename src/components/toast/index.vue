<template>
  <Modal
    v-model:visible="props.visible"
    :mask="false"
    :hide-title="true"
    :closable="false"
    :footer="false"
    body-class="bg-[rgba(0,0,0,0.68)] rounded-[8px]"
    modal-class="w-[auto] bg-[rgba(0,0,0,0)]"
  >
    <div class="text-[#fff] text-[18px]">{{ props.textWord }}</div>
  </Modal>
</template>
<script lang="ts" setup>
  import { Modal } from "@arco-design/web-vue";
  const props = defineProps<{
    textWord: string;
    visible: boolean;
  }>();
</script>
<style lang="less" scoped></style>
