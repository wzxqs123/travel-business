<template>
  <div class="wrapper">
    <div class="img-wrap"></div>
    <div class="content-wrap">
      <div class="mb-[60px]">
        <Search @search="handleSearch"></Search>
      </div>
      <div
        v-if="loading"
        class="flex justify-center w-full"
      >
        <img
          src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/b2b-loading.gif"
          alt=""
          class="w-[114px] h-[114px]"
        />
      </div>

      <template v-if="!loading">
        <template v-if="dataList.length > 0">
          <div
            class="title-wrap text-center mb-[30px]"
            v-if="dataList.length > 0"
          >
            <div class="flex items-center justify-center">
              <div class="w-[120px] border-solid border-[2px] left"></div>
              <div class="text-[30px] mx-[20px]">为你推荐</div>
              <div class="w-[120px] border-solid border-[2px] right"></div>
            </div>
            <div class="text-[18px] text-[#999A9F] mt-[6px] leading-[34px]">热门优选酒店</div>
          </div>
          <div class="grid grid-cols-4 gap-x-[24px] gap-y-[32px]">
            <div
              class="overflow-hidden cursor-pointer hotel-item"
              v-for="item in dataList"
              :key="item.id"
              @click="handleDetail(item.id)"
            >
              <div class="h-[190px] overflow-hidden rounded-[20px]">
                <Image
                  :src="item.frontImg || 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/img-empty.png'"
                  fit="cover"
                  height="100%"
                  width="100%"
                  class="hotel-img"
                  :preview="false"
                />
              </div>
              <div class="text-[18px] leading-[25px] mt-[8px]">
                {{ item.hotelName }}
              </div>
              <div class="text-[#FF4222]">
                <template v-if="typeof item.price == 'number'">
                  <span class="text-[16px]">￥</span>
                  <span class="text-[20px] font-bold">{{ (item.price / 100).toFixed(2) }}</span>
                  <span class="text-[14px] font-bold">起</span>
                </template>

                <template v-else>
                  <span>-</span>
                </template>
              </div>
            </div>
          </div>
        </template>

        <div v-else>
          <div class="flex flex-col items-center justify-center w-full py-[85px]">
            <img
              src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/order-list-empty.png"
              alt=""
              class="w-[208px] h-[208px]"
            />
            <span class="text-[#767675] text-[16px]">暂无数据</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image } from '@arco-design/web-vue'
import Search from '@/components/search/index.vue'
import { useRouter } from 'vue-router'
import { useHotel } from '@/composable/hotel/hotel'
import { HotelBaseList } from '@/composable/hotel/hotel.d'
import { useSearch } from '@/store'

const searchStore = useSearch()
const router = useRouter()
const { getSuggestHotelList, getHotelQuote } = useHotel()

const dataList = ref<HotelBaseList[]>([]) // 显示12个，服务端处理
const loading = ref(false)
const handleSearch = () => {
  router.push({
    path: '/hotel/hotel-list',
  })
}

const handleDetail = (id: string) => {
  router.push({
    path: '/hotel/hotel-detail',
    query: {
      id,
    },
  })
}

const b2bHotelIdList = ref<string[]>([])

const getQuote = () => {
  loading.value = true
  if (b2bHotelIdList.value.length > 0) {
    getHotelQuote({
      b2bHotelIdList: b2bHotelIdList.value,
      startDate: searchStore.searchInfo.startTime as string,
      endDate: searchStore.searchInfo.endTime as string,
    })
      .then((res) => {
        const { rows = [] } = res
        dataList.value.forEach((dataItem) => {
          const priceItem = rows.find((item) => item.b2bHotelId === dataItem.id)
          if (priceItem) {
            dataItem.price = priceItem.price
          }
        })
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    loading.value = false
  }
}

watch([() => searchStore.searchInfo.startTime, () => searchStore.searchInfo.endTime], () => {
  getQuote()
})

onMounted(() => {
  getSuggestHotelList().then((res) => {
    dataList.value = res.rows || []
    b2bHotelIdList.value = dataList.value.map((item) => item.id)
    getQuote()
  })
})
</script>

<style scoped lang="less">
.custom-trigger {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
.wrapper {
  min-width: 1440px;
  .custom-input {
    :deep(.arco-input-size-medium) {
      padding: 0;
      font-size: 19px;
    }
  }
  .img-wrap {
    height: 400px;
    background-image: url('https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/hotel-bg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content-wrap {
    max-width: 1400px;
    margin: -72px auto 94px;
    .title-wrap {
      .left {
        border-image: linear-gradient(270deg, rgba(216.00000232458115, 216.00000232458115, 216.00000232458115, 1), rgba(216.00000232458115, 216.00000232458115, 216.00000232458115, 0)) 2 2;
      }
      .right {
        border-image: linear-gradient(90deg, rgba(216.00000232458115, 216.00000232458115, 216.00000232458115, 1), rgba(216.00000232458115, 216.00000232458115, 216.00000232458115, 0)) 2 2;
      }
    }
  }
}
.hotel-item {
  .hotel-img {
    transition: all 0.3s;
  }
  &:hover .hotel-img {
    transform: scale(1.2);
  }
}
</style>
