<template>
  <Dropdown @select="handleSelect">
    <InputSearch :placeholder="placeholder" @input="handleInput" :model-value="modelValue?.value" />
    <template #content>
      <div style="width: 300px">
        <Doption v-for="item in doption" :key="item.value" :value="item.value">
          {{ item.content }}
        </Doption>
      </div>
    </template>
  </Dropdown>
</template>
<script lang="ts" setup>
import { InputSearch, Dropdown, Doption } from '@arco-design/web-vue'
import { ref, onMounted } from 'vue';

const selectType = ref()
const curInputVal = ref()
defineProps<{
  modelValue: any,
  placeholder: string,
  doption: {
    value: string,
    content: string,
  }[]
}>()
const emit = defineEmits(['update:modelValue', 'onSearch'])
const checkEffective = () => {
  const check = (val: any) => {
    if (typeof val === 'undefined' || val === null || val === '') {
      return false
    }
    return true
  }
  return check(selectType.value) && check(curInputVal.value)
}



const handleInput = (val: any) => {
  curInputVal.value = val
  emit('update:modelValue', { ...(checkEffective() ? { [selectType.value]: val } : {}), value: val })

}
const handleSelect = (type: any) => {
  selectType.value = type
  emit('update:modelValue', { ...(checkEffective() ? { [type]: curInputVal.value } : {}), value: curInputVal.value })
  if (checkEffective()) {
    emit('onSearch')
  }

}
onMounted(() => {
  emit('update:modelValue', { value: '' })
})
</script>
<style lang="less" scoped></style>
  