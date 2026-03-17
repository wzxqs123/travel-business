<!--
 * @Author: Czy
 * @Date: 2025-01-23 16:33:24
 * @FilePath: /b2b-official-website/src/components/tabs-layout/index.vue
 *  api调用说明
-->
<template>
  <div class="bg-[#F3F5F7] h-full pt-[120px] pb-[20px] box-border">
    <div class="mx-[auto] w-[1440px] bg-[#fff] rounded-[10px] mb-[60px] min-h-[700px] flex box-border">
      <!-- 左边菜单 -->
      <div class="w-[240px] h-full bg-[#FAFBFB] rounded-[10px] shrink-1">
        <div
          class="bg-[#fff] p-[24px] rounded-[10px] box-border flex items-center justify-center"
          v-for="(tab, idx) in tabs"
          :key="tab.id"
          @click="tapTab(tab.id)"
        >
          <div
            class="w-full h-[88px] rounded-[6px] flex items-center justify-center"
            :class="selectIdx == tab.id ? 'bg-[#F2F3F5] font-bold' : ''"
          >
            <template v-if="tab?.icon">
              <img
                :src="tab?.icon"
                mode="scaleToFill"
                class="w-[48px] h-[48px] mr-[20px]"
                v-if="selectIdx != tab.id"
              />

              <img
                :src="tab?.iconSelect"
                mode="scaleToFill"
                class="w-[48px] h-[48px] mr-[20px]"
                v-else
              />
            </template>

            {{ tab.name }}
          </div>
        </div>
      </div>
      <!-- 右边内容 -->
      <div class="box-border w-[1200px] px-[48px] py-[32px]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Image, Button, Table, Trigger, RangePicker } from '@arco-design/web-vue'

const emit = defineEmits(['tapTab'])

const props = defineProps<{
  tabs: { id: number; name: string; icon?: string; iconSelect?: string }[]
  activityId?: number
}>()

const tapTab = (id: number) => {
  selectIdx.value = id
  emit('tapTab', id)
}

const selectIdx = ref<number>(props.activityId || props.tabs[0].id)

watch(
  () => props.activityId,
  (val) => {
    selectIdx.value = val as number
  }
)
</script>
<style lang="less" scoped></style>
