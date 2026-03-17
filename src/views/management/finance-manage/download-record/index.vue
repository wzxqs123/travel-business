<template>
  <div>
    <PageHeader
      :title="'账单下载记录'"
      class="pageHeader"
      @back="handleBack"
    >
    </PageHeader>

    <Table
      :columns="columns"
      :data="data"
      row-key="id"
      :loading="loading"
      :pagination="false"
      :bordered="false"
    >
      <template #amount="{ record }">
        <div :class="record.amount < 0 ? 'text-[#FA5151]' : ''">{{ record.amount?.toFixed(2) ?? '-' }}</div>
      </template>
      <template #exportState="{ record }">
        <div class="flex items-center gap-[8px]">
          <!--文件生成中 #FF5D15/rgba(255,93,21,0.4)  文件生成成功 #00B42A/rgba(0,180,42,0.4) 文件生成失败 #FA5151/rgba(250,81,81,0.4)-->
          <div
            class="w-[8px] h-[8px] rounded-full bg-[rgba(0,180,42,0.4)] flex items-center justify-center"
            :class="record.exportState === ExportState.Failed ? 'bg-[rgba(250,81,81,0.4)]' : record.exportState === ExportState.Pending ? 'bg-[rgba(255,93,21,0.4)]' : 'bg-[rgba(0,180,42,0.4)]'"
          >
            <div
              class="w-[4px] h-[4px] rounded-full bg-[#00B42A]"
              :class="record.exportState === ExportState.Failed ? 'bg-[#FA5151]' : record.exportState === ExportState.Pending ? 'bg-[#FF5D15]' : 'bg-[#00B42A]'"
            ></div>
          </div>
          <div class="text-[#1D2129]">
            <DictTag
              text
              type="BILL_EXPORT_STATE"
              :value="record.exportState"
            />
          </div>
        </div>
      </template>
      <template #operate="{ record }">
        <Button
          v-if="record.exportState === ExportState.Succeed"
          type="text"
          @click="handleDownload(record.downloadUrl)"
        >
          下载
        </Button>
      </template>
    </Table>
    <Pagination
      :total="total"
      :page="page"
      @pageChange="pageChange"
      class="mt-[10px] justify-end"
    />
  </div>
</template>

<script setup lang="ts">
import { PageHeader, Table, Button } from '@arco-design/web-vue'
import { usePageQuery } from '@/fetch/use-page-query'
import { RECONCILIATION_GATEWAY } from '@/composable/constant'
import { useDownloadRecord } from '@/composable/finance-manage/download-record'
import { BillPageType } from '@/composable/finance-manage/finance-reconciliation/type'
import { BillExportRecordVO, ExportState } from '@/composable/finance-manage/download-record/type'
import { DictTag } from '@/components/dictionary/index'
import Pagination from '@/components/pagination/index.vue'

const emit = defineEmits<{
  (e: 'changePage', value: BillPageType): void
}>()

const { columns } = useDownloadRecord()

const searchForm = ref({})

const { data, page, total, loading } = usePageQuery<BillExportRecordVO>(`/app/${RECONCILIATION_GATEWAY}/query/b2b/bill/export-record`, searchForm, { immediate: true })

const pageChange = (pageObj: any) => {
  page.value.pageNum = pageObj.pageNum
  page.value.pageSize = pageObj.pageSize
}

const handleBack = () => {
  emit('changePage', 'home')
}

const handleDownload = (downloadUrl: string) => {
  window.open(downloadUrl)
}
</script>

<style scoped lang="less">
.wrapper {
  min-height: calc(100% - 60px);
}
:deep(.pageHeader) {
  margin-bottom: 16px;
  &.arco-page-header {
    padding-bottom: 8px;
    .arco-page-header-wrapper {
      padding: 0;
    }
  }
  .arco-page-header-header {
    border-bottom: 1px solid #e5e6eb;
    padding-bottom: 8px;
  }
}
</style>
