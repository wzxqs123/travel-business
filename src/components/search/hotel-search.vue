<template>
  <Trigger
    :popup-visible="searchStore.visible"
    show-arrow
    position="bl"
    :popup-translate="[0, 30]"
    :arrow-style="{
      width: '14px',
      height: '14px',
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
    }"
    update-at-scroll
    :click-to-close="false"
  >
    <Input
      placeholder="酒店名称/品牌"
      allow-clear
      :style="{
        width: '100%',
        padding: 0,
        border: 'none',
        backgroundColor: 'transparent',
      }"
      class="custom-input"
      @input="handleInput"
      @clear="handleClear"
      v-model="searchStore.searchInfo.keyword"
    ></Input>
    <template #content>
      <div class="bg-[#fff] w-[863px] h-[400px] rounded-[16px] pt-[30px] px-[24px] overflow-y-auto custom-trigger relative">
        <!-- 加载动画 -->
        <div
          class="absolute top-[80px] left-[420px]"
          v-if="loading"
        >
          <!-- <Spin
            :loading="loading"
            :size="30"
          ></Spin> -->
          <img
            src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/b2b-loading.gif"
            alt=""
            class="w-[114px] mx-auto mt-[114px]"
            v-show="loading"
          />
        </div>
        <div
          class="mb-[20px] text-[16px] -mr-[24px] -ml-[24px] py-[16px] pl-[24px] bg-gradient-to-r from-[#FFF1EF] to-[#FFFFFF]"
          v-if="!isCurrentCity"
        >
          很抱歉，当前城市无法查询到“酒店”
        </div>
        <!-- 列表数据 -->
        <div class="mb-[20px] font-bold text-[18px]">{{ isCurrentCity ? '当前' : '其他' }}城市的查询结果</div>
        <div class="text-center">
          <div
            class="flex items-center justify-between px-[24px] py-[16px] hover:bg-[#FAFAFA] rounded-[6px] relative cursor-pointer city-item"
            v-for="item in dataList"
            :key="item.id"
            @click="handleClick(item)"
          >
            <div class="flex items-center">
              <Image
                src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/position.png"
                mode="scaleToFill"
              />
              <!-- <div class="ml-[10px] text-[16px]">
                {{ item.hits.join(' | ') }}
              </div> -->

              <div
                class="ml-[10px] text-[16px]"
                v-html="highlightText(item.hits.join(' | '))"
              ></div>
            </div>
            <!-- {{ highlightText(item.typeName) }} -->
            <!-- <div
              class="text-[#999A9F] text-[16px]"
              v-html="highlightText(item.typeName)"
            ></div> -->
            <div class="text-[#999A9F] text-[16px]">{{ item.typeName }}</div>
          </div>
        </div>

        <!-- 空数据 -->
        <div
          class="absolute top-[200px] left-[420px]"
          v-if="dataList.length === 0 && !loading"
        >
          <Empty />
        </div>
      </div>
    </template>
  </Trigger>
</template>

<script setup lang="ts">
import { Image, Input, Trigger, Empty, Spin } from '@arco-design/web-vue'
import { ref } from 'vue'
import { useSearch, useUserStore } from '@/store'
import { useHotel } from '@/composable/hotel/hotel'
import { SuggestRes } from '@/composable/hotel/hotel.d'

const searchStore = useSearch()
const useStore = useUserStore()
const { getHotelSuggest } = useHotel()

watch(
  () => useStore.scrollTopNum,
  () => {
    searchStore.setVisible(false)
  }
)

const loading = ref(false)
const isCurrentCity = ref(true) // 酒店模糊搜索请求当前城市有数据就设为true,否则为false
const timer = ref()
const dataList = ref<SuggestRes[]>([])

const handleInput = () => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
  timer.value = setTimeout(() => {
    loading.value = true
    isCurrentCity.value = true
    getHotelSuggest({
      pageSize: 60,
      hotelKeyword: searchStore.searchInfo.keyword || '',
      adCode: searchStore.searchInfo.adCode || '',
    })
      .then((res) => {
        dataList.value = res.rows || []
        if (dataList.value.length > 0) {
          searchStore.setVisible(true)
          isCurrentCity.value = true
          loading.value = false
        } else {
          isCurrentCity.value = false
          if (!searchStore.searchInfo.adCode) {
            loading.value = false
            // 如果首次查询的城市adcode是空的，就没有必要查第二次
            return
          }
          getHotelSuggest({
            pageSize: 60,
            hotelKeyword: searchStore.searchInfo.keyword || '',
            adCode: '',
          })
            .then((res) => {
              dataList.value = res.rows || []
              if (dataList.value.length > 0) {
                searchStore.setVisible(true)
              }
            })
            .finally(() => {
              loading.value = false
            })
        }
      })
      .catch(() => {
        loading.value = false
      })
  }, 500)
}

const highlightText = (text: string) => {
  if (!searchStore.searchInfo.keyword) return text

  const escapeRegExp = (str: string) => {
    // 转义所有正则表达式的元字符
    return str?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
  const safeSearchTerm = escapeRegExp(searchStore.searchInfo.keyword)
  const regex = new RegExp(safeSearchTerm, 'gi')
  console.log('sssssssssss', regex)

  return `<div style='overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;'>${text.replace(regex, (match) => `<span style="color: #00D7E5;">${match}</span>`)} </div>`
}
const handleClick = (record: SuggestRes) => {
  searchStore.setVisible(false)
  searchStore.setSearchInfo({ keyword: record.hits[0] })
}

const emit = defineEmits(['clear'])

const handleClear = () => {
  searchStore.setSearchInfo({
    keyword: '',
  })
  emit('clear')
}
</script>

<style scoped lang="less">
.custom-trigger {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.custom-input {
  :deep(.arco-input-size-medium) {
    padding: 0;
    font-size: 19px;
  }
}
.city-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 1px;
  background-color: #f3f4f8;
}
</style>
