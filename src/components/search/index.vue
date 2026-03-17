<template>
  <div
    class="flex items-center"
    :class="{ searchWrap: !props.simpleStyle }"
  >
    <div
      class="flex items-center justify-between flex-1"
      :style="{ padding: !props.simpleStyle ? '0 30px' : '0' }"
    >
      <div class="bg-[#F8F8FA] h-[86px] rounded-[16px] flex w-[500px] overflow-hidden">
        <div class="px-[24px] flex flex-col justify-center hover:bg-[#eeeeee]">
          <div class="text-[16px] text-[#767675] mb-[4px]">城市</div>
          <div @click.prevent.stop="searchStore.closeHotelTrigger()">
            <CitySearch ref="cityRef"></CitySearch>
          </div>
        </div>
        <div class="h-[40px] w-[1px] bg-[#C7C7C7] self-center"></div>
        <div class="grow shrink px-[24px] flex flex-col justify-center hover:bg-[#eeeeee]">
          <div class="text-[16px] text-[#767675] mb-[4px]">关键词</div>
          <HotelSearch @clear="handleSearch"></HotelSearch>
        </div>
      </div>

      <RangePicker
        v-model="dataTime"
        position="bottom"
        :disabled-date="(current: string | number | Date | dayjs.Dayjs | null | undefined, type: 'start' | 'end') => {

 return  dayjs(current).isBefore(dayjs().subtract(1, 'day')) || dayjs(current).isAfter(dayjs().add(1, 'year'))
          }"
      >
        <div class="bg-[#F8F8FA] flex items-center justify-between px-[24px] h-[86px] rounded-[16px] w-[540px] cursor-pointer">
          <div class="">
            <div class="text-[16px] text-[#767675] mb-[4px]">入住</div>
            <div class="text-[20px]">
              {{ searchStore.searchInfo?.startTimeStr }}
            </div>
          </div>

          <div class="text-[16px] flex items-center">
            <div class="w-[32px] h-[1px] bg-[#D8D8D8]"></div>
            <div class="text-[16px] mx-[18px]">{{ searchStore.searchInfo.day }}晚</div>
            <div class="w-[32px] h-[1px] bg-[#D8D8D8]"></div>
          </div>

          <div class="">
            <div class="text-[16px] text-[#767675] mb-[4px]">离店</div>
            <div class="text-[20px]">
              {{ searchStore.searchInfo?.endTimeStr }}
            </div>
          </div>
        </div>
      </RangePicker>
      <div
        class="h-[76px] rounded-[16px] w-[240px] cursor-pointer bg-[#00D7E5] hover:bg-[#13D0DC] text-white flex items-center justify-center text-[24px]"
        @click="handleSearch"
        :class="{ customShadow: !props.simpleStyle }"
      >
        搜索
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { WEEK_TEXT_MAP } from '@/composable/constant'
import CitySearch from './city-search.vue'
import HotelSearch from './hotel-search.vue'
import { RangePicker, Message } from '@arco-design/web-vue'
import { ref, watch } from 'vue'
import { useSearch } from '@/store'

const searchStore = useSearch()

const props = defineProps<{
  simpleStyle?: boolean
}>()

const emit = defineEmits<{
  (e: 'search'): void
}>()

const dataTime = ref<string[]>([searchStore.searchInfo.startTime as string, searchStore.searchInfo.endTime as string])

const handleSearch = () => {
  emit('search')
}
const cityRef = ref()
watch(dataTime, (val) => {
  if (val[0] == val[1]) return Message.error('开始和结束时间不能为同一天')
  searchStore.setSearchInfo({
    startTime: val[0],
    endTime: val[1],
    startTimeStr: dayjs(val[0]).format('MM月DD日') + `(${WEEK_TEXT_MAP[dayjs(val[0]).day()]})`,
    endTimeStr: dayjs(val[1]).format('MM月DD日') + `(${WEEK_TEXT_MAP[dayjs(val[1]).day()]})`,
  })
})
</script>

<style lang="less" scoped>
.searchWrap {
  height: 144px;
  border: 3px solid transparent;
  border-radius: 30px;
  background-image: linear-gradient(#fff, #fff), linear-gradient(135deg, rgba(255, 246.0000005364418, 122.00000032782555, 1), rgba(110.57522177696228, 255, 255, 1));
  background-origin: border-box;
  background-clip: content-box, border-box;
}
.customShadow {
  box-shadow: 0px 4px 20px 0px rgba(25, 212, 224, 0.4);
}
</style>
