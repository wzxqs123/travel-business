<!--
 * @Author: Czy
 * @Date: 2025-05-08 15:49:55
 * @FilePath: /b2b-official-website/src/components/order-record/index.vue
 *  
-->
<template>
  <div class="layout-content-div">
    <!-- 面包屑导航 -->
    <Breadcrumb :routes="breadcrumbRoutes">
      <template #item-render="{ route }">
        <icon-home
          v-if="route?.path === '' && route?.label === 'homeIcon'"
          :size="18"
        />
        <span
          v-else-if="route?.path !== ''"
          class="!text-[#999A9F] cursor-pointer hover:!text-[#2F2F2F]"
          @click="goPath(route?.path)"
        >
          {{ route?.label }}
        </span>
        <span v-else>{{ route?.label }}</span>
      </template>
    </Breadcrumb>
    <div class="bg-[#fff] rounded-[8px] py-[30px]">
      <div
        class="py-[36px] px-[102px] rounded-[6px]"
        style="background: rgba(0, 215, 229, 0.04)"
      >
        <!-- 步骤条优化 -->
        <Steps
          label-placement="vertical"
          :current="switchStatus(billOrder?.billState)"
        >
          <Step description="">{{ stepTexts.step1 }}</Step>
          <Step description="">{{ stepTexts.step2 }}</Step>
          <Step description="">{{ stepTexts.step3 }}</Step>
        </Steps>
      </div>
    </div>

    <div class="bg-[#fff] rounded-[8px]">
      <div class="mb-[24px]">
        <div class="flex items-center">
          <span class="text-[#1D2129] text-[18px] lh-[30px] font-bold">账单基础信息</span>
        </div>

        <div class="flex items-center w-full mt-[12px] min-w-[800px] gap-[20px]">
          <div class="bg-[#F7F8FA] rounded-[6px] shrink-0 basis-[360px] h-[127px] p-[20px] flex flex-col">
            <div class="mb-[8px] text-[#4E5969] pl-[14px]">
              账单号： <span class="text-[#1D2129]">{{ billOrder.no || '-' }}</span>
            </div>
            <div class="mb-[8px] text-[#4E5969]">
              账单周期： <span class="text-[#1D2129]">{{ billOrder?.periodStartDate }}至{{ billOrder?.periodEndDate }}</span>
            </div>
            <div class="mb-[8px] text-[#4E5969]">
              业务类型：
              <span class="text-[#1D2129]">
                <DictTag
                  text
                  type="BILL_TYPE"
                  :value="billOrder?.billType"
              /></span>
            </div>
          </div>

          <div class="statistics-item rounded-[6px] h-[127px] flex-auto">
            <div class="flex items-center justify-between mb-[4px]">
              <div class="text-[#2F2F2F] text-[14px]">
                <div class="flex items-center">
                  <span class="truncate font-bold text-[16px]">结算金额：</span>
                  <div class="bg-[rgba(255,93,21,0.1)] truncate px-[8px] leading-[28px] text-[#B34C1E] rounded-[2px]">结算金额 = 订单金额 + 退款金额 + 调账金额</div>
                </div>
              </div>
              <div class="text-[#FF5D15] font-bold text-[20px]">{{ billOrder?.billedAmount?.toFixed(2) ?? 0 }}</div>
            </div>
            <div class="w-full bg-[#E5E6EB] h-[1px] my-[12px]"></div>
            <div class="flex items-center justify-between text-[#767675]">
              <span>退款金额</span>
              <span class="text-[#999A9F] text-[16px]">{{ billOrder?.refundAmount && billOrder?.refundAmount > 0 ? '-' : '' }}{{ billOrder?.refundAmount?.toFixed(2) ?? 0 }}</span>
            </div>

            <div class="flex items-center justify-between text-[#767675]">
              <span>调账金额</span>
              <span class="text-[#999A9F] text-[16px]">{{ billOrder?.adjustmentAmount?.toFixed(2) ?? 0 }}</span>
            </div>
          </div>
        </div>
      </div>

      <SearchForm
        :rules="rules"
        :grid="false"
        :value="searchForm"
        @search="onSearch"
      />
    </div>

    <div class="bg-[#fff] rounded-[8px]">
      <!-- tab优化 -->
      <Tabs
        v-model:active-key="activeKey"
        class="mb-[8px]"
        @change="onTabs"
      >
        <TabPane
          v-for="tab in tabList"
          :key="tab.key"
        >
          <template #title>
            <div class="flex items-center gap-[8px]">
              <span>{{ tab.title }}</span>
              <span v-if="tab.key === '2' && tab.count">{{ tab.count }}</span>
            </div>
          </template>
        </TabPane>
      </Tabs>
      <!-- 订单列表 -->

      <Table
        v-if="activeKey === '1'"
        :columns="columns"
        :data="data"
        row-key="id"
        :loading="loading"
        :pagination="false"
        :bordered="false"
      >
        <template #hotelName="{ record }">
          {{ record?.hotel?.hotelName }}
        </template>

        <template #roomTypeName="{ record }">
          {{ record?.roomType?.roomTypeName }}
        </template>

        <template #checkIn="{ record }">
          <div>{{ record?.checkIn }} 入</div>
          <div>{{ record?.checkOut }} 离</div>
        </template>
        <template #amount="{ record }">
          {{ record?.amount ? record.amount.toFixed(2) : '-' }}
        </template>
        <template #refundAmount="{ record }">
          <div :class="record.refundAmount > 0 ? 'text-[#FA5151]' : ''">{{ record.refundAmount > 0 ? '-' : '' }}{{ record.refundAmount?.toFixed(2) }}</div>
        </template>

        <template #bizStatus="{ record }">
          <div class="flex items-center gap-[8px]">
            <div
              class="w-[8px] h-[8px] rounded-full flex items-center justify-center"
              :style="{ backgroundColor: getBgColor(record.bizStatus).opacityColor }"
            >
              <div
                class="w-[4px] h-[4px] rounded-full"
                :style="{ backgroundColor: getBgColor(record.bizStatus).color }"
              ></div>
            </div>
            <div :style="{ color: getStyle(record.bizStatus) }">
              <DictTag
                text
                type="B2B_ORDER_STATE"
                :value="record.bizStatus"
              />
            </div>
          </div>
        </template>
        <template #operate="{ record }">
          <Button
            type="text"
            @click="goDetail(record.orderId)"
          >
            详情
          </Button>
        </template>
      </Table>

      <!-- 调账明细 -->

      <Table
        v-if="activeKey === '2'"
        :columns="columns2"
        :data="data"
        row-key="id"
        :loading="loading"
        :pagination="false"
        :bordered="false"
      >
        <template #hotelName="{ record }">
          {{ record?.hotel?.hotelName }}
        </template>

        <template #adjustmentType="{ record }">
          <DictTag
            text
            type="BILL_ADJUSTMENT_TYPE"
            :value="record?.adjustmentType"
          />
        </template>

        <template #adjustmentAmount="{ record }">
          <span :class="record.refundAmount < 0 ? 'text-[#FA5151]' : ''">{{ record.adjustmentAmount?.toFixed(2) }}</span>
        </template>
      </Table>

      <Pagination
        class="mt-[10px] float-right"
        :total="total"
        :page="page"
        @pageChange="pageChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Steps, Step, Link, Modal, Breadcrumb, Tabs, TabPane, Space, Table, Button, Divider, Switch } from '@arco-design/web-vue'
import { SearchForm, SearchRule } from '@/components/search-form'
import { BizStatus } from '@/composable/finance-manage/order-record/type'
import { DictTag } from '@/components/dictionary/index'
import Pagination from '@/components/pagination/index.vue'
import { BillPageType } from '@/composable/finance-manage/finance-reconciliation/type'

import { useOrderRecord, BillDetailVO, ReconciliationOrderVO, AdjustmentVO } from '@/composable/finance-manage/order-record'
import { usePageQuery } from '@/fetch/use-page-query'
// import { Pagination, PageType } from '@vue/pagination'
import { RECONCILIATION_GATEWAY } from '@/composable/constant'
const rules: Ref<SearchRule[]> = computed(() => [
  {
    label: '订单号',
    placeholder: '请输入',
    field: 'orderId',
    type: 'Input',
    props: {
      allowClear: true,
    },
  },
])

const props = defineProps({
  no: {
    type: String,
    default: '',
  },
})

const breadcrumbRoutes = ref([
  {
    path: '',
    label: 'homeIcon',
  },
  {
    path: '/hotel',
    label: '首页',
  },
  {
    path: '#/order-center?activityId=3',
    label: '账单管理',
  },
  {
    path: '',
    label: '订单明细',
  },
])

const searchForm = ref<any>({ billNo: props.no })
const onSearch = (value: any) => {
  page.value.pageNum = 1
  searchForm.value = value
  searchForm.value.billNo = props.no

  query()
}

const emit = defineEmits<{
  (e: 'changePage', value: BillPageType): void
}>()

const tabList = reactive([
  {
    key: '1',
    title: '订单列表',
    count: 0,
  },
  {
    key: '2',
    title: '调账明细',
    count: 0,
  },
])

const onTabs = (key: any) => {
  //   queryForm.value = { status: '' }
  //   queryForm.value.status = tabsTitle.value[key].status as string
  //   tabKey.value = key
  page.value.pageNum = 1
  query()
}

// 状态映射表
const statusMaps = {
  billState: {
    BILLED: 2,
    PAID: 3,
    SETTLED: 4,
  },
  bizStatus: {
    finished: { color: '#00B42A', opacityColor: 'rgba(0,180,42,0.4)' },
    canceled: { color: '#999A9F', opacityColor: 'rgba(153,154,159,0.4)' },
  },
  statusText: {
    1: '账单生成中',
    2: '买家待付款',
    4: '平台待确认',
  },
}

// const switchStatus = (status = '') => statusMaps.billState[status] || 1
const switchStatus = (status = '') => (statusMaps.billState as Record<string, number>)[status] || 1

const getBgColor = (status: BizStatus) => {
  if (status === BizStatus.Finished || status === BizStatus.Confirmed) {
    return statusMaps.bizStatus.finished
  }
  if (status === BizStatus.Canceled) {
    return statusMaps.bizStatus.canceled
  }
  return { color: '#FF5D15', opacityColor: 'rgba(255,93,21,0.4)' }
}

// 用计算属性替代模板中的状态文本
const stepTexts = computed(() => {
  const current = switchStatus(billOrder.value?.billState)

  return {
    step1: current == 1 ? '账单生成中' : '账单已生成',
    step2: current == 1 || current == 2 ? '买家待付款' : '买家已付款',
    step3: current == 4 ? '平台已确认' : '平台待确认',
  }
})

const getStyle = (status: BizStatus) => {
  switch (status) {
    case BizStatus.Canceled:
      return '#999A9F'
    // case BizStatus.Booking:
    // case BizStatus.Booking:
    //   return '#fff'
    default:
      return '#1D2129'
  }
}

const goPath = (path: string) => {
  // emit('changeType')
  // router.push(path)
  if (path === '/hotel') {
    router.push(path)
  } else {
    emit('changePage', 'home')
  }
}
const pageChange = (pageObj: any) => {
  page.value.pageNum = pageObj.pageNum
  page.value.pageSize = pageObj.pageSize
  query()
}
const activeKey = ref(tabList[0].key)

const queryForm = computed(() => ({
  ...searchForm.value,
  // activeKey: activeKey.value,
}))

const queryUrl = computed(() => {
  return activeKey.value == '1' ? `/app/${RECONCILIATION_GATEWAY}/query/b2b/bill/orders` : `/app/${RECONCILIATION_GATEWAY}/query/b2b/bill/adjustments`
})

const { data, page, total, loading, query } = usePageQuery<ReconciliationOrderVO | AdjustmentVO>(queryUrl, queryForm, { immediate: false })

const { columns, columns2, GetBillOrder, GetAdjustmentsList } = useOrderRecord()
const router = useRouter()

watch(
  data,
  () => {
    if (activeKey.value == '2') {
      tabList[1].count = total.value == -1 ? 0 : total.value
    }
  },
  {
    deep: true,
  }
)
// const goDownloadRecord = () => {
//   router.push({
//     path: '/finance-manage/download-record',
//   })
// }

const billOrder = ref<BillDetailVO>({})
const getBillOrder = () => {
  if (!props.no) return
  GetBillOrder({ no: props?.no as string }).then((res: any) => {
    //   console.log('resres', res.data)
    billOrder.value = res.data
  })
}
const getAdjustmentsNum = () => {
  GetAdjustmentsList({ ...queryForm.value, pageNum: 1, pageSize: 10 }).then((res: any) => {
    tabList[1].count = res.total == -1 ? 0 : res.total
  })
}
onMounted(() => {
  getBillOrder()
  query()
  getAdjustmentsNum()
})

const goDetail = (id: string) => {
  router.push({
    path: '/hotel-order',
    query: {
      id,
    },
  })
}
</script>
<style lang="less" scoped>
.layout-content-div {
  min-height: calc(100% - 60px);
}

.statistics-item {
  padding: 16px 20px 0;
  border-radius: 6px;
  position: relative;
  background: rgba(255, 93, 21, 0.04);

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 22px;
    left: 0px;
    width: 4px;
    height: 18px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #ff5d15;
  }
}

:deep(.arco-steps-item-process .arco-steps-icon) {
  background: #00d7e5 !important;
}

:deep(.arco-steps-item-finish .arco-steps-icon) {
  background: rgba(0, 215, 229, 0.1);
  color: #00d7e5;
}

// :deep(.arco-steps-item:not(:last-child) .arco-steps-item-tail) {
//   background: red !important;
//   //   height: 20px;
// }
:deep(.arco-steps-item:not(:last-child) .arco-steps-item-tail::after) {
  background: #d8d8d8;
}
</style>
