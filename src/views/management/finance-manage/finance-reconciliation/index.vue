<template>
  <div class="grid grid-cols-3 gap-[16px] mb-[14px]">
    <div
      v-for="statistic in statistics"
      :key="statistic.name"
      class="statistics-item"
    >
      <div class="flex items-center mb-[4px]">
        <div class="text-[#2F2F2F] text-[14px]">{{ statistic.name }}</div>
        <Tooltip :content="statistic.tooltip">
          <icon-info-circle
            :size="20"
            class="text-[rgba(0,0,0,0.4)]"
          />
        </Tooltip>
      </div>
      <Statistic
        :value="statistic.price"
        :precision="2"
      />
    </div>
  </div>
  <SearchForm
    :rules="rules"
    :value="searchForm"
    @search="onSearch"
  >
    <template #back>
      <Col
        :span="6"
        :style="{ minWidth: '360px' }"
      >
      </Col>
    </template>
  </SearchForm>
  <div class="mb-[16px]">
    <Button
      type="primary"
      @click="goDownloadRecord"
    >
      账单下载记录
    </Button>
  </div>
  <Table
    :columns="columns"
    :data="data"
    row-key="no"
    :loading="loading"
    :pagination="false"
    :bordered="false"
  >
    <template #billingCycle="{ record }"> {{ record.periodStartDate }} 至 {{ record.periodEndDate }} </template>
    <template #billType="{ record }">
      <DictTag
        text
        type="BILL_TYPE"
        :value="record.billType"
      />
    </template>
    <template #periodType="{ record }">
      <DictTag
        text
        type="B2B_PERIOD_TYPE"
        :value="record.periodType"
      />
    </template>
    <template #billState="{ record }">
      <div class="flex items-center gap-[8px]">
        <div
          class="w-[8px] h-[8px] rounded-full flex items-center justify-center"
          :style="{ backgroundColor: getBgColor(record.billState).opacityBgColor }"
        >
          <div
            class="w-[4px] h-[4px] rounded-full"
            :style="{ backgroundColor: getBgColor(record.billState).bgColor }"
          ></div>
        </div>
        <div :style="{ color: getStyle(record.billState) }">
          <DictTag
            text
            type="BILL_STATE"
            :value="record.billState"
          />
        </div>
      </div>
    </template>
    <template #amount="{ record }">
      <div :class="record.amount < 0 ? 'text-[#FA5151]' : ''">{{ record.amount?.toFixed(2) ?? '-' }}</div>
    </template>
    <template #operate="{ record }">
      <Button
        type="text"
        @click="goOrderRecord(record.no)"
      >
        订单明细
      </Button>
      <Button
        type="text"
        @click="handleExport(record.no)"
      >
        导出
      </Button>
      <Button
        v-if="record.billState === BillState.Paid || record.billState === BillState.Settled || record.billState === BillState.Billed"
        :disabled="record.billState === BillState.Paid || record.billState === BillState.Settled"
        type="text"
        status="danger"
        @click="handleSurePay(record.no, record.amount)"
      >
        确认已付款
      </Button>
    </template>
  </Table>

  <Pagination
    :total="total"
    :page="page"
    @pageChange="pageChange"
    class="mt-[10px] justify-end"
  />
</template>

<script setup lang="ts">
import { Statistic, Tooltip, Col, Table, Button, Modal } from '@arco-design/web-vue'
import { SearchForm, SearchRule } from '@/components/search-form'
import { BillListParams, BillSimpleVO, BillState, BillPageType } from '@/composable/finance-manage/finance-reconciliation/type'
import { useFinanceReconciliation } from '@/composable/finance-manage/finance-reconciliation'
import { DictTag } from '@/components/dictionary/index'
import { usePageQuery } from '@/fetch/use-page-query'
import { RECONCILIATION_GATEWAY } from '@/composable/constant'

import Pagination from '@/components/pagination/index.vue'
const emit = defineEmits<{
  (e: 'changePage', value: BillPageType): void
  (e: 'selectNo', value: string): void
}>()
const { getDashboard, columns, billExport, billPaymentConfirm } = useFinanceReconciliation()

const getStyle = (status: BillState) => {
  switch (status) {
    case BillState.Settled:
      return '#999A9F'
    case BillState.Pending:
      return '#FF5D15'
    default:
      return '#1D2129'
  }
}

const getBgColor = (status: BillState) => {
  switch (status) {
    case BillState.Paid:
      return {
        bgColor: '#00B42A',
        opacityBgColor: 'rgba(0,180,42,0.4)',
      }
    case BillState.Settled:
      return {
        bgColor: '#999A9F',
        opacityBgColor: 'rgba(153,154,159,0.4)',
      }
    default:
      return {
        bgColor: '#FF5D15',
        opacityBgColor: 'rgba(255,93,21,0.4)',
      }
  }
}

const statistics = ref([
  {
    name: '已付款账单总金额（元）',
    price: 0,
    tooltip: '已确认操作向平台付款，等待平台确认的账单总金额',
  },
  {
    name: '已结算账単总金额（元）',
    price: 0,
    tooltip: '平台已确认企业向平台支付的账单总金额',
  },
  {
    name: '待付款账单总金额（元）',
    price: 0,
    tooltip: '对未确认待对账的账单总金额',
  },
])

const rules: Ref<SearchRule[]> = computed(() => [
  {
    label: '账单周期',
    field: 'billingCycleTime',
    placeholder: ['开始时间', '结束时间'],
    type: 'RangePicker',
    props: {
      allowClear: true,
    },
  },
  {
    label: '账单号',
    placeholder: '请输入',
    field: 'billNo',
    type: 'Input',
    props: {
      allowClear: true,
    },
  },
  {
    label: '账单状态',
    placeholder: '请选择状态',
    field: 'state',
    type: 'DictSelect',
    props: {
      allowClear: true,
      type: ['BILL_STATE'],
    },
  },
])

const searchForm = ref<Partial<BillListParams>>({})

const { data, page, total, loading, query } = usePageQuery<BillSimpleVO>(`/app/${RECONCILIATION_GATEWAY}/query/b2b/bill/list`, searchForm, { immediate: false })

const onQuery = () => {
  query()
  getDashboardData()
}
const onSearch = (value: any) => {
  const [periodStartDate, periodEndDate] = value.billingCycleTime ?? []
  searchForm.value = {
    ...searchForm.value,
    ...value,
    periodStartDate,
    periodEndDate,
  }
  onQuery()
}

const pageChange = (pageObj: any) => {
  page.value.pageNum = pageObj.pageNum
  page.value.pageSize = pageObj.pageSize
  onQuery()
}

const getDashboardData = () => {
  getDashboard().then((res) => {
    statistics.value[0].price = res.data?.paidAmount ?? 0
    statistics.value[1].price = res.data?.settledAmount ?? 0
    statistics.value[2].price = res.data?.billedAmount ?? 0
  })
}

onMounted(() => {
  onQuery()
})

const goOrderRecord = (no: string) => {
  // console.log('no', no)
  // selectNo.value = no
  emit('changePage', 'detail')

  emit('selectNo', no)
}

const handleExport = (no: string) => {
  billExport(no).then(() => {
    goDownloadRecord()
  })
}
const goDownloadRecord = () => {
  emit('changePage', 'download')
}

const handleSurePay = (no: string, amount: number) => {
  Modal.warning({
    title: '确认买家已付款？',
    content: `确认已成功向平台支付账单全部金额￥${amount}`,
    hideCancel: false,
    onOk: () => {
      billPaymentConfirm(no).then((res) => {
        onQuery()
      })
    },
  })
}
</script>

<style scoped lang="less">
.statistics-item {
  padding: 24px 30px;
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  position: relative;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 25px;
    left: -1px;
    width: 4px;
    height: 18px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  &:nth-child(1) {
    border-color: rgba(54, 98, 236, 0.4);
    &::after {
      background-color: #3662ec;
    }
  }
  &:nth-child(2) {
    border-color: rgba(7, 185, 185, 0.4);
    &::after {
      background-color: #07b9b9;
    }
  }
  &:nth-child(3) {
    border-color: rgba(255, 93, 21, 0.4);
    &::after {
      background-color: #ff5d15;
    }
  }
}

:deep(.arco-statistic) {
  .arco-statistic-value {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
