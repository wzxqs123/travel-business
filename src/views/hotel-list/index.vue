<template>
  <div class="min-w-[1440px] min-h-[100vh] bg-[#F5F7FA]">
    <div class="bg-[#fff] pt-[126px] pb-[50px]">
      <div class="max-w-[1400px] mx-auto">
        <div
          class="h-[144px]"
          v-if="useStore.scrollTopNum >= 300"
        ></div>
        <template v-else>
          <Search
            ref="searchRef"
            @search="handleSearch"
          ></Search>
        </template>
      </div>
    </div>
    <div class="max-w-[1400px] mx-auto pt-[45px] pb-[65px]">
      <!-- 搜索酒店 -->
      <div class="text-[22px] font-bold mb-[24px]">共{{ total }}家酒店</div>
      <template v-if="!loading">
        <div v-if="total > 0">
          <HotelItem :data="dataList"></HotelItem>
          <img
            src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/b2b-loading.gif"
            alt=""
            class="w-[70px] mx-auto mt-[24px]"
            v-show="loading"
          />
          <div
            class="mx-auto w-[127px] h-[46px] leading-[46px] text-center bg-[#F3F4F8] rounded-[34px] text-[18px] mt-[48px] cursor-pointer"
            v-show="!loading && singleDataLength >= 16"
            @click="loadMore"
          >
            加载更多
          </div>
        </div>
        <div v-else>
          <div class="text-center">
            <img
              src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/empty.png"
              alt=""
              class="mx-auto"
            />
            <div class="text-[#767675] text-[20px] my-[28px]">抱歉，暂无相关酒店，请修改条件再次搜索吧</div>
            <div
              class="bg-[#2F2F2F] text-[#fff] rounded-[6px] w-[103px] h-[32px] flex items-center justify-center mx-auto mb-[70px] cursor-pointer"
              @click="resetSearch"
            >
              清空条件
            </div>
          </div>
          <div class="text-[22px] font-bold mb-[24px]">为您推荐与搜索相似的酒店：</div>
          <HotelItem :data="suggestList.slice(0, 10)"></HotelItem>
        </div>
      </template>

      <div
        v-else
        class="flex items-center justify-center pt-[50px]"
      >
        <img
          src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/b2b-loading.gif"
          alt=""
          class="w-[114px] h-[114px]"
        />
      </div>
    </div>
    <div
      class="fixed top-[96px] left-0 right-0 h-[110px] bg-[#fff]"
      v-if="useStore.scrollTopNum >= 300"
    >
      <div class="max-w-[1400px] mx-auto">
        <Search
          ref="searchRef"
          @search="handleSearch"
          simple-style
        ></Search>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '@/components/search/index.vue'
import { ref } from 'vue'
import { useUserStore, useSearch } from '@/store'
import HotelItem from './components/hotel-item.vue'
import { useHotel } from '@/composable/hotel/hotel'
import { HotelBaseList } from '@/composable/hotel/hotel.d'

const useStore = useUserStore()
const searchStore = useSearch()
const { getHotelSearch, getSuggestHotelList, getHotelQuote } = useHotel()

const total = ref(10)
const loading = ref(false)
const singleDataLength = ref(0)
const maxId = ref<null | number>(null)
const dataList = ref<HotelBaseList[]>([])
const suggestList = ref<HotelBaseList[]>([])
// const aaa = ref(1)

const handleSearch = () => {
  dataList.value = []
  suggestList.value = []
  maxId.value = null
  getList(true)
  useStore.updatedIsSetBackTop(true)
}

const getQuote = (data: HotelBaseList[]) => {
  const b2bHotelIdList = data.map((item) => item.id)
  getHotelQuote({
    b2bHotelIdList,
    startDate: searchStore.searchInfo.startTime as string,
    endDate: searchStore.searchInfo.endTime as string,
  }).then((res) => {
    const { rows = [] } = res
    dataList.value.forEach((dataItem) => {
      const priceItem = rows.find((item) => item.b2bHotelId === dataItem.id)
      if (priceItem) {
        dataItem.price = priceItem.price
      }
    })
  })
}

const getSuggestList = () => {
  getSuggestHotelList().then((res) => {
    suggestList.value = res.rows || []
    if (suggestList.value.length > 0) {
      const b2bHotelIdList = suggestList.value.map((item) => item.id)
      getHotelQuote({
        b2bHotelIdList,
        startDate: searchStore.searchInfo.startTime as string,
        endDate: searchStore.searchInfo.endTime as string,
      }).then((res) => {
        const { rows = [] } = res
        suggestList.value.forEach((dataItem) => {
          const priceItem = rows.find((item) => item.b2bHotelId === dataItem.id)
          if (priceItem) {
            dataItem.price = priceItem.price
          }
        })
      })
    }
  })
}

const getList = (init: boolean = false) => {
  loading.value = true
  singleDataLength.value = 0
  getHotelSearch({
    maxId: maxId.value,
    pageSize: 16,
    hotelKeyword: searchStore.searchInfo.keyword || '',
    adCode: searchStore.searchInfo.adCode || '',
  })
    .then((res) => {
      const { b2bHotelBaseList = [] } = res.data
      maxId.value = res.data.maxId
      singleDataLength.value = b2bHotelBaseList.length

      if (init) {
        dataList.value = b2bHotelBaseList
        total.value = Number(res.data.total) || 0
      } else {
        dataList.value.push(...b2bHotelBaseList)
      }
      if (singleDataLength.value > 0) {
        // 获取报价
        getQuote(b2bHotelBaseList)
      }
      if (total.value === 0) {
        // 获取推荐数据
        getSuggestList()
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const loadMore = () => {
  getList()
}

const resetSearch = () => {
  searchStore.setSearchInfo({
    keyword: '',
  })
  getList(true)
}

onMounted(() => {
  getList(true)
})
</script>

<style scoped lang="less"></style>
