<!--
 * @Author: Czy
 * @Date: 2025-08-20 17:51:13
 * @FilePath: /b2b-official-website/src/views/management/personal-center/components/enterprise-wallet.vue
 *  
-->
<template>
  <div class="box">
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
              class="text-[rgba(0,0,0,0.4)] ml-[4px]"
            />
          </Tooltip>
        </div>
        <Statistic
          :value="statistic.price"
          :precision="2"
        />
      </div>
    </div>

    <Table
      :columns="columns"
      :data="data"
      row-key="id"
      :loading="loading"
      :pagination="false"
      :bordered="false"
    >
      <template #adjustType="{ record }">
        <DictTag
          :value="record.adjustType"
          type="ERP_COMPANY_ADJUST_TYPE"
          text
        />
      </template>
      <template #adjustAmount="{ record }">
        <div>CNY <span v-if="record.adjustType == AdjustType.Sub">-</span>{{ record.adjustAmount?.toFixed(2) ?? '-' }}</div>
      </template>
      <template #finalAmount="{ record }">
        <div>CNY {{ record.finalAmount?.toFixed(2) ?? '-' }}</div>
      </template>
    </Table>
    <Pagination
      :total="total"
      :page="page"
      @pageChange="pageChange"
      class="mt-[10px]"
    />
  </div>
</template>

<script setup lang="ts">
import { Table, Tooltip, Statistic } from '@arco-design/web-vue'
import Pagination from '@/components/pagination/index.vue'
import { usePageQuery } from '@/fetch/use-page-query'
import { RECONCILIATION_GATEWAY } from '@/composable/constant'
import { TableColumnData } from '@arco-design/web-vue'
import { CompanyBalanceRecordVO, useEnterpriseWallet } from '@/composable/enterprise-wallet/index'
import { AdjustType } from '@/composable/enterprise-wallet/type'

import { PageType } from '@/components/pagination/type'
import { DictTag } from '@/components/dictionary/index'

const { getTotalBalance } = useEnterpriseWallet()

const columns: TableColumnData[] = [
  {
    title: '调整类型',
    dataIndex: 'adjustType',
    slotName: 'adjustType',
    minWidth: 120,
  },
  {
    title: '调整金额',
    dataIndex: 'adjustAmount',
    slotName: 'adjustAmount',
    minWidth: 140,
  },
  {
    title: '调整后余额',
    dataIndex: 'finalAmount',
    slotName: 'finalAmount',
    minWidth: 160,
  },
  {
    title: '调整日期',
    dataIndex: 'adjustDate',
    minWidth: 180,
  },
]

const searchForm = ref<Partial<{ companyId: number }>>({})

const { data, page, total, loading } = usePageQuery<CompanyBalanceRecordVO>(`/app/${RECONCILIATION_GATEWAY}/query/b2b/company/balance-record`, searchForm, { immediate: true })

const statistics = ref([
  {
    name: '可用余额',
    price: 0,
    tooltip: '剩余可用结算余额，若余额不足将影响后续订单结算',
  },
])
const pageChange = (pageObj: PageType) => {
  page.value.pageNum = pageObj.pageNum
  page.value.pageSize = pageObj.pageSize
}

const GetTotalBalance = () => {
  getTotalBalance().then((res) => {
    statistics.value[0].price = res.data.totalBalance
  })
}

onMounted(() => {
  GetTotalBalance()
})
</script>

<style scoped lang="less">
.wrapper {
  min-height: calc(100% - 60px);
}
:deep(.pageHeader) {
  &.arco-page-header {
    padding-bottom: 8px;
  }
  .arco-page-header-header {
    border-bottom: 1px solid #e5e6eb;
    padding-bottom: 8px;
  }
}

.box {
  box-sizing: border-box;
  padding: 30px;
  .box-tit {
    font-size: 20px;
    font-weight: bold;
  }
}
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
