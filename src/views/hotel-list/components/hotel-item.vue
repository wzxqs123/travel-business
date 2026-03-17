<template>
  <Space
    direction="vertical"
    :size="24"
    fill
  >
    <div
      class="rounded-[24px] bg-[#fff] py-[26px] px-[24px] flex hover:shadow-lg"
      v-for="item in props.data"
      :key="item.id"
      @click="handleDetail(item)"
    >
      <div class="shrink-0 w-[280px] h-[154px] mr-[28px] rounded-[20px] overflow-hidden">
        <Image
          :src="item.frontImg || 'https://hx-mp-res.hitrips.cn/b2b-official-website/img-empty.png'"
          fit="cover"
          height="100%"
          width="100%"
          :preview="false"
          class="cursor-pointer"
        />
      </div>
      <div class="flex-1 flex flex-col justify-between py-[14px] cursor-pointer">
        <div class="">
          <div class="flex items-baseline mb-[14px]">
            <div class="text-[20px] leading-[28px]">
              {{ item.hotelName }}
            </div>
            <div
              class="shrink-0 ml-[12px] w-[68px] h-[26px] self-center flex items-center justify-center text-[#fff] custom-bg"
              v-if="item.starRate && item.starRate > 0"
            >
              {{ HOTEL_STAR_RATE[item.starRate] }}星级
            </div>
          </div>
          <div class="text-[16px] text-[#767675] leading-[18px]">
            {{ item.address }}
          </div>
        </div>

        <div class="text-[#FF4222]">
          <template v-if="typeof item.price == 'number'">
            <span class="text-[16px]">￥</span>
            <span class="text-[24px] font-bold">{{ ((item.price || 0) / 100).toFixed(2) }}</span>
            <span class="text-[14px]">起</span>
          </template>
          <template v-else>
            <span>-</span>
          </template>
        </div>
      </div>
      <div class="shrink-0 basis-[150px] flex items-center justify-end">
        <Button
          type="primary"
          class="h-[50px] w-[130px] !rounded-[12px] custom-btn"
          size="large"
        >
          查看详情
        </Button>
      </div>
    </div>
  </Space>
</template>

<script setup lang="ts">
import { Space, Image, Button } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { HotelBaseList } from '@/composable/hotel/hotel.d'
import { HOTEL_STAR_RATE } from '@/composable/constant'

const router = useRouter()

const props = defineProps<{
  data: HotelBaseList[]
}>()

const handleDetail = (record: HotelBaseList) => {
  const selection = window.getSelection()
  if (selection && selection.toString().trim() !== '') {
    return
  }
  router.push({
    path: '/hotel/hotel-detail',
    query: {
      id: record.id,
    },
  })
}
</script>

<style scoped lang="less">
.custom-btn {
  &.arco-btn-primary {
    background-color: #ff5d15;
    &:hover {
      background-color: #f14a00;
    }
    &.arco-btn-disabled {
      opacity: 0.6;
    }
  }
}
.custom-bg {
  background-image: url('https://hx-mp-res.hitrips.cn/b2b-official-website/star-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
