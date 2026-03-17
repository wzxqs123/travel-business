<!--
 * @Author: Czy
 * @Date: 2025-04-23 13:44:40
 * @FilePath: /b2b-official-website/src/views/personal-center/components/order-item.vue
 *  订单item
-->
<template>
  <div class="flex flex-col mb-[24px]">
    <div class="w-full bg-[#F8F8FA] rounded-[4px] py-[11px] px-[20px]">
      <Space class="text-[#000]">
        <template #split>
          <Divider direction="vertical" />
        </template>
        <span>订单号：{{ props.orderInfo.id }}</span>
        <span>预订日期：{{ props.orderInfo.bookTime }}</span>
      </Space>
    </div>
    <div
      class="mt-[8px] flex cursor-pointer hover:shadow-lg bg-[#FFFFFF] border-[1px] border-[#E5E8EF] p-[20px] rounded-[6px]"
      @click="goOrderDetail"
    >
      <img
        src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/case-pic-3.png"
        mode="scaleToFill"
        class="w-[120px] h-[118px] rounded-[8px] mr-[12px]"
      />

      <div class="flex justify-between w-full">
        <div>
          <div class="text-[#2F2F2F] font-bold text-[16px] mb-[6px] ellipsis-2">
            {{ props.orderInfo.b2bHotel?.hotelName || '-' }}
          </div>
          <div class="text-[#767675] lh-[20px] ellipsis-2">{{ props.orderInfo.b2bHotel?.address || '-' }}</div>
          <Space
            class="text-[#767675] text-[14px] lh-[20px]"
            :size="1"
          >
            <template #split>
              <Divider direction="vertical" />
            </template>
            <span>{{ props.orderInfo?.checkInDate || '-' }} 至 {{ props.orderInfo?.checkOutDate || '-' }}</span>
            <div>
              <span
                class="mx-[4px]"
                v-for="guest in props.orderInfo?.guestNameList"
                >{{ guest }}</span
              >
            </div>
            <span>{{ props.orderInfo?.rateplan?.roomName || '-' }}</span>
            <span>{{ props.orderInfo?.rateplan?.breakfastDesc || '-' }}</span>
          </Space>
          <div class="text-[#FF4222]">
            <span>￥</span><span class="text-[20px] font-[700]">{{ props.orderInfo?.totalAmount ?? '0' }}</span>
          </div>
        </div>
        <div>
          <div class="w-[70px] shrink-0">
            <div
              class="flex items-center"
              v-if="props.orderInfo.bizStatus == 'BOOKING'"
            >
              <div class="w-[8px] flex items-center justify-center h-[8px] bg-[#FDD2A5] rounded-full">
                <div class="w-[4px] h-[4px] bg-[#FF8F1F] rounded-full"></div>
              </div>
              <span class="ml-[7px] text-[#1D2129] font-[700]">待确认</span>
            </div>

            <div
              class="flex items-center"
              v-if="props.orderInfo.bizStatus == 'CONFIRMED'"
            >
              <span class="ml-[7px] text-[#1D2129] font-[700]">已确认</span>
            </div>

            <div
              class="flex items-center"
              v-if="props.orderInfo.bizStatus == 'FINISHED'"
            >
              <span class="ml-[7px] text-[#999A9F] font-[700]">已完成</span>
            </div>

            <div
              class="flex items-center"
              v-if="props.orderInfo.bizStatus == 'CANCELED'"
            >
              <span class="ml-[7px] text-[#999A9F] font-[700]">已取消</span>
            </div>

            <div
              class="flex items-center"
              v-if="props.orderInfo.bizStatus == 'CANCELING'"
            >
              <div class="w-[8px] flex items-center justify-center h-[8px] bg-[#FDD2A5] rounded-full">
                <div class="w-[4px] h-[4px] bg-[#FF5D15] rounded-full"></div>
              </div>
              <span class="ml-[7px] text-[#FF5D15] font-[700]">取消中</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Space, Divider } from '@arco-design/web-vue'
import { B2BHotelOrderVO, OrderStatusEnum } from '@/composable/order/order'

const status = ref(4)
const router = useRouter()

const props = defineProps<{ orderInfo: B2BHotelOrderVO }>()

const goOrderDetail = () => {
  // console.log('ssssss', props.orderInfo.id)
  const selection = window.getSelection()
  if (selection && selection.toString().trim() !== '') {
    return
  }
  router.push({
    path: '/hotel-order',
    query: {
      id: props.orderInfo.id,
    },
  })
}
</script>
<style lang="less" scoped></style>
