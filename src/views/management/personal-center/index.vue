<!--
 * @Author: Czy
 * @Date: 2025-01-23 16:33:24
 * @FilePath: /travel-business/src/views/management/personal-center/index.vue
 *  api调用说明
-->
<template>
  <MenusLayout>
    <div class="box-border bg-[#fff] min-h-[calc(100vh-128px)] p-[30px] rounded-[10px]">
      <!-- 基础信息 -->
      <BaseInfo v-if="activityId == 0" />
      <!-- 消息中心 -->
      <MessageCenter v-if="activityId == 1" />

      <OrderCenter v-if="activityId == 2" />
      <template v-if="activityId == 3">
        <div v-show="pageFlag === 'home'">
          <FinanceReconciliation
            @changePage="(val) => (pageFlag = val)"
            @selectNo="selectNoFun"
          />
        </div>

        <DownloadRecord
          v-if="pageFlag === 'download'"
          @changePage="(val) => (pageFlag = val)"
        ></DownloadRecord>

        <OrderRecord
          v-if="pageFlag === 'detail'"
          :no="selectNo"
          @changePage="(val) => (pageFlag = val)"
        />
      </template>

      <template v-if="activityId == 4">
        <EnterpriseWallet />
      </template>
    </div>
  </MenusLayout>
</template>
<script lang="ts" setup>
import BaseInfo from './base-info.vue'
import MessageCenter from './message-center.vue'
import OrderCenter from './order-center.vue'
import FinanceReconciliation from '@/views/management/finance-manage/finance-reconciliation/index.vue'
import DownloadRecord from '@/views/management/finance-manage/download-record/index.vue'
import TabsLayout from '@/components/tabs-layout/index.vue'
import { useUserStore } from '@/store/user'
import { BillPageType } from '@/composable/finance-manage/finance-reconciliation/type'
import OrderRecord from '@/components/order-record/index.vue'
import MenusLayout from '@/components/menus-layout/index.vue'
import EnterpriseWallet from '@/views/management/personal-center/components/enterprise-wallet.vue'

const route = useRoute()
const router = useRouter()
const pageFlag = ref<BillPageType>('home')
const selectNo = ref('')
const tapTab = (id: number) => {
  activityId.value = id
  if (id === 3) {
    pageFlag.value = 'home'
  }
  if (id == 2) {
    useUserStore().setNavSel('OrderCenter')
  } else {
    useUserStore().setNavSel('')
  }
}

// const query = defineProps<{
//   id: number
// }>()

const activityId = ref(0)

const tabs = ref([
  {
    id: 0,
    name: '基础信息',
    icon: 'https://hx-mp-res.hitrips.cn/b2b-official-website/base-info-icon.png',
    iconSelect: 'https://hx-mp-res.hitrips.cn/b2b-official-website/base-info-select-icon.png',
  },
  {
    id: 2,
    name: '订单中心',
    icon: 'https://hx-mp-res.hitrips.cn/b2b-official-website/order-center-icon.png',
    iconSelect: 'https://hx-mp-res.hitrips.cn/b2b-official-website/order-center-select-icon.png',
  },
  {
    id: 3,
    name: '财务对账',
    icon: 'https://hx-mp-res.hitrips.cn/b2b-official-website/financial-reconciliation.png',
    iconSelect: 'https://hx-mp-res.hitrips.cn/b2b-official-website/financial-reconciliation-select.png',
  },
  {
    id: 4,
    name: '企业钱包',
    icon: 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/financial-reconciliation.png',
    iconSelect: 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/financial-reconciliation-select.png',
  },
  // {
  //   id: 1,
  //   name: "消息中心",
  //   icon: "https://hx-mp-res.hitrips.cn/b2b-official-website/message-center-icon.png",
  //   iconSelect:
  //     "https://hx-mp-res.hitrips.cn/b2b-official-website/message-center-select-icon.png",
  // },
])
watch(
  () => route.fullPath,
  (newVal) => {
    console.log('newVal', newVal)
    if (route.query.activityId) {
      activityId.value = Number(route.query.activityId)
    } else {
      if (newVal == '/order-center') {
        activityId.value = 2
      } else if (newVal == '/finance-reconciliation') {
        activityId.value = 3
      } else if (newVal == '/enterprise-wallet') {
        activityId.value = 4
      } else {
        activityId.value = 0
      }
    }
  },
  {
    immediate: true,
  }
)
onMounted(() => {
  if (route.query.activityId) {
    activityId.value = Number(route.query.activityId)
  }
})

watch(
  () => useUserStore().navSelLogoned,
  (cur) => {
    if (cur == 'OrderCenter') {
      activityId.value = 2
    }
  },
  {
    immediate: true,
  }
)

// onUpdated(() => {
//   console.log('onUpdatedonUpdated')
// })
const selectNoFun = (no: string) => {
  selectNo.value = no
}
</script>
<style lang="less" scoped>
.select-tab {
  background: #f2f3f5;
}
</style>
