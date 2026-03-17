<template>
  <RadioGroup
    :model-value="props.modelValue"
    @change="(value)=>radioChange(value as string)"
  >
    <Radio
      v-for="item in props.category"
      :key="item.id"
      :value="item.id"
    >
      <template #radio="{ checked }">
        <div
          class="rounded-full px-[20px] leading-[32px] h-[32px] hover:text-white hover:bg-[#2F2F2F] hover:font-bold"
          :class="[checked ? 'text-white bg-[#2F2F2F] font-bold' : 'text-[#999A9F] bg-[#EAEAEA] font-normal']"
        >
          {{ item.name }}
        </div>
      </template>
    </Radio>
  </RadioGroup>
</template>

<script setup lang="ts">
import { RadioGroup, Radio } from '@arco-design/web-vue'

const props = defineProps<{
  modelValue: string
  category: { name: string; id: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'onTapChange'): void
}>()

const radioChange = (value: string) => {
  const element = document.getElementById(value)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
    })
  }
  emit('update:modelValue', value)
  emit('onTapChange')
}
</script>
