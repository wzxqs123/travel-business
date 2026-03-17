<!--
 * @Author: Czy
 * @Date: 2025-05-09 17:37:46
 * @FilePath: /b2b-official-website/src/components/pagination/index.vue
 *  
-->
<template>
  <Pagination
    class="pagination"
    :total="props.total"
    :page-size="props.page.pageSize"
    :current="props.page.pageNum"
    :show-total="props.showTotal"
    :show-page-size="props.showPageSize"
    :show-jumper="props.showJumper"
    @change="pageChange"
    @page-size-change="onPageSizeChange"
  />
</template>
<script lang="ts" setup>
import { Pagination } from '@arco-design/web-vue'
import { Page, PageQueryOption, PageResult } from '@/types/page'
import { ref } from 'vue'
import { PageType } from './type'

const props = withDefaults(
  defineProps<{
    total: number
    page: Page
    showTotal?: boolean
    showPageSize?: boolean
    showJumper?: boolean
  }>(),
  {
    showTotal: true,
    showPageSize: true,
    showJumper: true,
  }
)
const emit = defineEmits<{
  (e: 'pageChange', value: PageType): void
}>()

const pageSize = ref<number>(10)

const pageChange = (current: number) => {
  emit('pageChange', {
    pageNum: current,
    pageSize: pageSize.value,
  })
}
const onPageSizeChange = (currentSize: number) => {
  pageSize.value = currentSize
  emit('pageChange', {
    pageNum: 1,
    pageSize: currentSize,
  })
}
</script>

<style lang="less"></style>
