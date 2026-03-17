<template>
  <div>
    <div class="grid grid-cols-3 gap-[16px] mb-[14px]">
      <div
        v-for="statistic in statistics"
        :key="statistic.name"
        class="statistics-item"
      >
        <div class="flex items-center mb-[4px]">
          <div class="text-[#2F2F2F] text-[14px]">{{ statistic.name }}</div>
        </div>
        <Statistic
          :value="statistic.price"
          :precision="2"
        />
        <span class="ml-[6px]">元</span>
      </div>
    </div>
    <!-- 搜索表单组件，包含日期类型选择和日期范围选择 -->
    <SearchForm
      :rules="rules"
      :value="form"
      @search="onSearch"
      @reset="onReset"
    >
      <template #back>
        <Col
          :span="6"
          :style="{ minWidth: '360px' }"
        >
          <div class="search-form-item2">
            <!-- 日期类型选择下拉框 -->
            <Select
              v-model="twoForm.dateType"
              placeholder="日期类型"
              style="width: 100px; margin-left: -12px"
            >
              <Option
                v-for="date in dateArrOptions"
                :key="date.key"
                :value="date.key"
                :label="date.name"
              ></Option>
            </Select>

            <!-- 日期范围选择器 -->
            <RangePicker
              v-model="twoForm.dateRange"
              style="width: 264px; margin-left: -14px"
              show-confirm-btn
            />
          </div>
        </Col>
      </template>
    </SearchForm>

    <!-- 订单状态标签页 -->
    <Tabs
      :active-key="activeKey"
      @change="changeTas"
    >
      <TabPane
        :title="tab.title"
        v-for="tab in tabs"
        :key="tab.key"
      >
      </TabPane>
    </Tabs>
    <Spin
      :loading="loading"
      class="w-full"
    >
      <template #icon>
        <icon-sync />
      </template>

      <!-- 订单列表项 -->
      <template v-if="listData.list?.length">
        <OrderItem
          v-for="(orderInfo, idx) in listData.list"
          :key="idx"
          :orderInfo="orderInfo"
        />
      </template>
      <template v-else>
        <div class="flex flex-col items-center justify-center w-full py-[85px]">
          <img
            src="https://hx-mp-res.hitrips.cn/b2b-official-website/order-list-empty.png"
            alt=""
            class="w-[208px] h-[208px]"
          />
          <span class="text-[#767675] text-[16px]">暂无数据</span>
        </div>
      </template>

      <!-- 分页组件 -->
      <div class="flex justify-end w-full">
        <Pagination
          :total="listData.total"
          @change="handlePageChange"
        />
      </div>
    </Spin>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, Spin, TabPane, Col, Statistic, Select, Option, RangePicker, Pagination } from '@arco-design/web-vue'
import { SearchForm, SearchRule } from '@/components/search-form'
import OrderItem from './components/order-item.vue'
import { useHotelOrder, OrderListRequest, B2BHotelOrderVO } from '@/composable/order/order'

// 获取酒店订单列表的函数
const { getHotelOrderList, getAmountStat } = useHotelOrder()

// 表单数据
const form = ref<Partial<OrderListRequest>>({})

// 订单列表数据
const listData = reactive<{ total: number; list: B2BHotelOrderVO[] }>({ total: 0, list: [] })

// 日期类型选项
const dateArrOptions = [
  { key: 1, name: '预定时间' },
  { key: 2, name: '入住时间' },
  { key: 3, name: '离店时间' },
]

// 当前选中的标签页
const activeKey = ref('ALL')

// 日期范围和分页参数
let twoForm = ref<Partial<{ dateType?: number; dateRange?: string[]; pageNo?: number; pageSize: number }>>({
  dateType: 1,
  dateRange: [],
  pageNo: 1,
  pageSize: 5,
})

// 搜索表单规则
const rules: Ref<SearchRule[]> = computed(() => [
  {
    label: '订单号',
    placeholder: '请输入订单号',
    field: 'id',
    type: 'Input',
    props: {
      allowClear: true,
    },
  },
  {
    label: '酒店名称',
    placeholder: '请输入酒店名称',
    field: 'hotelNameLike',
    type: 'Input',
    props: {
      allowClear: true,
    },
  },
  {
    label: '入住人',
    placeholder: '请输入入住人',
    field: 'guestName',
    type: 'Input',
    props: {
      allowClear: true,
    },
  },
  {
    label: '外部订单号',
    placeholder: '请输入外部订单号',
    field: 'outerOrderSerialNo',
    type: 'Input',
    props: {
      allowClear: true,
    },
  },
])

// 标签页选项
const tabs = [
  { key: 'ALL', title: '全部' },
  { key: 'BOOKING', title: '待确认' },
  { key: 'CONFIRMED', title: '已确认' },
  { key: 'FINISHED', title: '已完成' },
  { key: 'CANCELING', title: '取消中' },
  { key: 'CANCELED', title: '已取消' },
]

// 搜索事件处理函数
const onSearch = (value?: any) => {
  form.value = { ...form.value, ...value }
  queryList()
}

// 重置事件处理函数
const onReset = () => {
  twoForm.value = {
    dateType: 1,
    dateRange: [],
    pageNo: 1,
    pageSize: 5,
  }
}

// 标签页切换事件处理函数
const changeTas = (key: any) => {
  activeKey.value = key
  queryList()
}

const loading = ref(false)
// 查询订单列表
const queryList = () => {
  loading.value = true
  getHotelOrderList({
    ...form.value,
    ...twoForm.value,
    bizStatus: activeKey.value == 'ALL' ? '' : activeKey.value,
  })
    .then((res) => {
      listData.total = res.total
      listData.list = res.rows
    })
    .finally(() => ((loading.value = false), getAmountStatFun()))
}

// 分页事件处理函数
const handlePageChange = (current: number) => {
  twoForm.value.pageNo = current
  queryList()
}

// 组件挂载时初始化数据
onMounted(() => {
  queryList()
})

const getAmountStatFun = () => {
  getAmountStat({ dateRange: twoForm.value.dateRange, dateType: twoForm.value.dateType }).then((res) => {
    // console.log('res',res.data);
    statistics.value[0].price = res.data.totalPayAmount / 100 || 0
    statistics.value[1].price = res.data.totalRefundAmount / 100 || 0
  })
}
const statistics = ref([
  {
    name: '订单支付金额',
    price: 0,
  },
  {
    name: '订单退款金额',
    price: 0,
  },
])
</script>

<style lang="less" scoped>
// 标签页样式
:deep(.arco-tabs) {
  .arco-tabs-tab {
    padding-top: 0;
    margin-right: 36px;
    margin-left: 0;
    font-size: 20px;
    color: #999a9f;
    &.arco-tabs-tab-active {
      color: #2f2f2f;
      font-weight: bold;
    }
  }
  .arco-tabs-nav-ink {
    background-color: #2f2f2f;
    height: 2px;
  }
  .arco-tabs-content {
    padding-top: 24px;
  }
}
:deep(.arco-select-view-single) {
  background: #fff;
  border-width: 0px;
  color: #4e5969;
  .arco-select-view-input {
    padding-top: 0;
    padding-bottom: 0;
  }
  .arco-select-view-value {
    padding: 0;
    min-height: 24px;
  }

  .arco-select-view-suffix {
    padding-left: 0px !important;
    margin-left: -16px !important;
  }
}

:deep(.arco-select-view-focus) {
  //   background: red;
  border: '0px' !important;
}
// 日期选择器样式
:deep(.arco-picker) {
  border: 1px solid #d3d9e0;
  border-radius: 4px;
  background: #fff;
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
</style>
