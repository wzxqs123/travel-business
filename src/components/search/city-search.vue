<template>
  <Input
    placeholder="全部"
    allow-clear
    :style="{
      width: '100px',
      padding: 0,
      border: 'none',
      backgroundColor: 'transparent',
    }"
    class="custom-input"
    @click="handleFocus"
    @input="handleInput"
    @blur="handleBlur"
    @clear="handleClear"
    v-model="cityKeyword"
  ></Input>
  <Trigger
    :popup-visible="searchStore.cityVisible"
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
    <div></div>
    <template #content>
      <div class="bg-[#fff] w-[504px] rounded-[16px] p-[30px] custom-trigger">
        <div class="mb-[20px] flex items-center -ml-[8px]">
          <Image
            src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/hot.png"
            alt=""
          />
          <span class="font-bold text-[18px]"> 热门城市 </span>
        </div>
        <div class="grid grid-cols-6 gap-[20px]">
          <div
            class="cursor-pointer text-[16px] hover:text-[#00D7E5]"
            :class="[searchStore.searchInfo.adCode && item.id === +searchStore.searchInfo.adCode ? 'text-[#00D7E5]' : '']"
            v-for="item in hotCityList"
            :key="item.id"
            @click.stop.prevent="handleSelectHot(item)"
          >
            {{ item.cityName }}
          </div>
        </div>
      </div>
    </template>
  </Trigger>
  <Trigger
    :popup-visible="searchStore.citySearchVisible"
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
    <div></div>
    <template #content>
      <div class="bg-[#fff] w-[863px] h-[400px] rounded-[16px] pt-[30px] px-[24px] overflow-y-auto custom-trigger relative">
        <div class="mb-[20px] font-bold text-[18px]">当前城市的查询结果</div>
        <div
          class="absolute top-[200px] left-[420px]"
          v-if="loading"
        >
          <Spin
            :loading="loading"
            :size="30"
          ></Spin>
        </div>
        <div
          class="absolute top-[200px] left-[420px]"
          v-if="cityList.length === 0 && !loading"
        >
          <Empty />
        </div>
        <div class="text-center">
          <div
            class="flex items-center justify-between px-[24px] py-[16px] hover:bg-[#FAFAFA] rounded-[6px] relative cursor-pointer city-item"
            v-for="item in cityList"
            :key="item.id"
            @click="handleSelect(item)"
          >
            <div class="flex items-center">
              <Image
                src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/position.png"
                mode="scaleToFill"
              />
              <div class="ml-[10px] text-[16px]">
                <!-- <template v-for="(hit, index) in item.hits" :key="hit">
                  <span v-html="hit"></span>
                  <template v-if="index < item.hits.length - 1">，</template>
                </template> -->
                {{ item.hits.join('，') }}
              </div>
            </div>
            <div class="text-[#999A9F] text-[16px]">{{ item.typeName }}</div>
          </div>
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
import { HotCityRes, SuggestRes } from '@/composable/hotel/hotel.d'

const searchStore = useSearch()
const useStore = useUserStore()
const { getHotCityList, getCitySuggest } = useHotel()

watch(
  () => useStore.scrollTopNum,
  () => {
    searchStore.setCityVisible(false)
    searchStore.setCitySearchVisible(false)
  }
)

const loading = ref(false)
const cityKeyword = ref('')
const timer = ref()
const hotCityList = ref<HotCityRes[]>([])
const cityList = ref<SuggestRes[]>([])

const handleFocus = () => {
  searchStore.setCityVisible(true)
}

const handleInput = () => {
  searchStore.setCityVisible(false)
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
  timer.value = setTimeout(() => {
    loading.value = true
    getCitySuggest({
      keyword: cityKeyword.value || '',
    })
      .then((res) => {
        cityList.value = res.rows || []
        if (cityList.value.length > 0) {
          searchStore.setCitySearchVisible(true)
        }
      })
      .finally(() => {
        loading.value = false
      })
  }, 500)
}

const handleSelectHot = (record: HotCityRes) => {
  searchStore.setSearchInfo({
    cityName: record.cityName,
    adCode: record.id + '',
  })
  cityKeyword.value = record.cityName
  handleKeywordClear()
  searchStore.setCityVisible(false)
}

const handleSelect = (record: SuggestRes) => {
  searchStore.setCitySearchVisible(false)
  cityKeyword.value = record.hits[0]
  searchStore.setSearchInfo({
    cityName: record.hits[0],
    adCode: record.id,
  })
  handleKeywordClear()
}

const handleBlur = () => {
  cityKeyword.value = searchStore.searchInfo.cityName || ''
}

const handleClear = () => {
  searchStore.setSearchInfo({
    cityName: '',
    adCode: '',
  })
}
const handleKeywordClear = () => {
  searchStore.setSearchInfo({
    keyword: '',
  })
}

onMounted(() => {
  console.log('sssssssssssssss')

  cityKeyword.value = searchStore.searchInfo.cityName || ''
  getHotCityList().then((res) => {
    hotCityList.value = res.rows || []
  })
})
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
