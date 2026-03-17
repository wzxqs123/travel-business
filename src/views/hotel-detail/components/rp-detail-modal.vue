<template>
  <div @click="handleClick">
    <slot></slot>
  </div>
  <Modal
    v-if="visible"
    v-model:visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    hide-title
    :footer="false"
    :width="1200"
    modal-class="rounded-[20px] p-[16px] select-none"
  >
    <div
      class="absolute top-0 right-0 cursor-pointer"
      @click="visible = false"
    >
      <Image
        src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/closeBtn.png"
        fit="fill"
        width="30px"
        height="30px"
        :preview="false"
      />
    </div>
    <div class="relative">
      <div class="flex justify-between gap-[24px]">
        <div
          class="basis-[608px] overflow-hidden"
          v-if="props.imageLists.length > 0"
        >
          <div class="w-[608px] h-[468px] rounded-[10px] mb-[10px] relative">
            <Image
              :src="props.imageLists[currentImage]?.fullUrl"
              fit="fill"
              width="608px"
              height="468px"
              class="rounded-[10px]"
              :preview="false"
            />
            <div
              class="w-[36px] h-[36px] bg-white rounded-full absolute left-[20px] top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer hover:bg-[#00D7E5] hover:text-[#fff]"
              @click="prevImage"
            >
              <icon-left />
            </div>
            <div
              class="w-[36px] h-[36px] bg-white rounded-full absolute right-[20px] top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer hover:bg-[#00D7E5] hover:text-[#fff]"
              @click="nextImage"
            >
              <icon-right />
            </div>
          </div>
          <Scrollbar
            ref="scrollRef"
            style="overflow: auto"
          >
            <Space :size="10">
              <div
                v-for="(item, index) in props.imageLists"
                :key="item.url"
                class="w-[165px] h-[110px] overflow-hidden border-[#00D7E5] border-solid rounded-[10px] basis-[165px] shrink-0 cursor-pointer"
                :class="[currentImage === index ? 'border-[2px]' : 'hover:border-[2px]']"
              >
                <Image
                  :src="item.thumbnailUrl"
                  fit="fill"
                  width="100%"
                  height="100%"
                  :preview="false"
                  @click="imageClick(index)"
                />
              </div>
            </Space>
          </Scrollbar>
        </div>
        <div
          class="basis-[608px] h-[588px] w-[608px] rounded-[10px] overflow-hidden"
          v-else
        >
          <Image
            src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/img-empty.png"
            fit="cover"
            width="100%"
            height="100%"
            :preview="false"
          />
        </div>
        <div class="flex-1">
          <Scrollbar
            class="h-full"
            style="height: 594px; overflow-y: auto; padding-right: 12px"
          >
            <div class="text-[24px] font-[700] leading-[34px] mb-[20px]">
              {{ roomDetail.roomTypeName }}-{{ rpDetail.breakfast }}·{{ rpDetail.ratePlanType === 1 ? rpDetail.cancelRule?.effectiveRuleCancelName || rpDetail.cancelRule?.ruleName : rpDetail.hourRule }}
            </div>
            <div class="grid grid-cols-[auto_auto_auto] gap-y-[16px] grid-flow-row-dense">
              <div
                class="flex items-center"
                v-if="roomDetail.roomArea"
              >
                <Image
                  src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/area.png"
                  fit="fill"
                  width="20px"
                  height="20px"
                  :preview="false"
                />
                <div class="ml-[10px]">{{ roomDetail.roomArea }}</div>
              </div>
              <!-- wifi -->
              <div
                class="flex items-center"
                v-if="getFacility(roomDetail.facilities || [], 1378)"
              >
                <Image
                  src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/wifi-square.png"
                  fit="fill"
                  width="20px"
                  height="20px"
                  :preview="false"
                />
                <div class="ml-[10px]">
                  {{ getFacility(roomDetail.facilities || [], 1378) }}
                </div>
              </div>
              <!-- 抽烟 -->
              <div
                class="flex items-center"
                v-if="getFacility(roomDetail.facilities || [], 904)"
              >
                <Image
                  src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/smoke.png"
                  fit="fill"
                  width="20px"
                  height="20px"
                  :preview="false"
                />
                <div class="ml-[10px]">
                  {{ getFacility(roomDetail.facilities || [], 904) }}
                </div>
              </div>
              <div
                class="flex items-center"
                v-if="roomDetail.floor"
              >
                <Image
                  src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/floor.png"
                  fit="fill"
                  width="20px"
                  height="20px"
                  :preview="false"
                />
                <div class="ml-[10px]">{{ roomDetail.floor }}</div>
              </div>
              <div
                class="flex items-center"
                v-if="roomDetail.windowType"
              >
                <Image
                  src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/window.png"
                  fit="fill"
                  width="20px"
                  height="20px"
                  :preview="false"
                />
                <div class="ml-[10px]">{{ roomDetail.windowType }}</div>
              </div>
            </div>
            <Divider />
            <Space
              direction="vertical"
              fill
              :size="16"
            >
              <div
                class="flex items-center"
                v-if="roomDetail.capacity"
              >
                <Image
                  src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/user-square.png"
                  fit="fill"
                  width="20px"
                  height="20px"
                  :preview="false"
                />
                <div class="ml-[10px]">可入住{{ roomDetail.capacity }}</div>
              </div>
              <div
                class="flex items-center"
                v-if="roomDetail.bedType"
              >
                <Image
                  src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/slider.png"
                  fit="fill"
                  width="20px"
                  height="20px"
                  :preview="false"
                />
                <div class="ml-[10px]">
                  {{ roomDetail.bedType }}
                </div>
              </div>
              <div class="flex items-center">
                <Image
                  src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/reserve.png"
                  fit="fill"
                  width="20px"
                  height="20px"
                  :preview="false"
                />
                <div class="ml-[10px]">{{ rpDetail.breakfast }}</div>
              </div>
            </Space>
            <Divider />
            <div class="text-[#2F2F2F] text-[18px] font-[700] mb-[18px]">政策与服务</div>
            <Space
              direction="vertical"
              fill
              :size="30"
            >
              <div class="flex gap-3">
                <div class="shrink-0">特别提示</div>
                <div class="text-[#767675]">
                  <Space
                    direction="vertical"
                    fill
                    :size="8"
                  >
                    <div
                      v-for="item in props.bookingFacilities"
                      :key="item.id"
                    >
                      {{ item.name }}
                    </div>
                  </Space>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="shrink-0 text-[#FF590F]">
                  {{ rpDetail.ratePlanType === 1 ? rpDetail.cancelRule?.effectiveRuleCancelName || rpDetail.cancelRule?.ruleName : rpDetail.hourRule }}
                </div>
                <div
                  class="border-solid border-[#D8D8D8] border-[1px] rounded-[20px] flex-1 overflow-hidden"
                  v-if="props.rpDetail.cancelRule?.items && props.rpDetail.cancelRule?.items?.length > 0"
                >
                  <div class="bg-[#F8F8FA] border-b-[1px] border-solid border-[#D8D8D8] flex">
                    <div class="flex-1 border-r-[1px] border-[#D8D8D8] border-solid pl-[20px] leading-[48px]">北京时间</div>
                    <div class="flex-1 pl-[20px] leading-[48px]">取消&修改费用</div>
                  </div>
                  <div
                    class="flex"
                    v-for="(item, index) in props.rpDetail.cancelRule?.items || []"
                    :class="[index === props.rpDetail.cancelRule!.items!.length - 1 ? '':'border-b-[1px] border-solid border-[rgb(216,216,216)]' ]"
                    :key="index"
                  >
                    <div class="flex-1 border-r-[1px] border-[#D8D8D8] border-solid pl-[20px] leading-[48px]">
                      {{ item.dateFormat }}
                    </div>
                    <div class="flex-1 pl-[20px] leading-[48px]">
                      {{ item.ruleFormat }}
                    </div>
                  </div>
                </div>
              </div>
            </Space>
          </Scrollbar>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal, Image, Space, Scrollbar, Divider } from '@arco-design/web-vue'
import { HotelImages, RoomTypeDetail, StdRatePlanDetail, Facility, HotelDetail } from '@/composable/hotel/hotel.d'

const props = defineProps<{
  imageLists: HotelImages[]
  roomDetail: RoomTypeDetail
  rpDetail: StdRatePlanDetail
  hotelDetail?: HotelDetail
  bookingFacilities: Facility[]
}>()

const scrollRef = ref()
const visible = ref(false)
const currentImage = ref(0)

const getFacility = (arr: Facility[], id: number) => {
  return arr.find((item) => item.Id === id)?.name
}

const handleClick = () => {
  visible.value = true
}
const handleOk = () => {
  visible.value = false
}
const handleCancel = () => {
  visible.value = false
}

const imageClick = (index: number) => {
  scrollRef.value.scrollLeft(index * 175)
  currentImage.value = index
}
const prevImage = () => {
  if (currentImage.value === 0) {
    currentImage.value = props.imageLists.length - 1
    scrollRef.value.scrollLeft(props.imageLists.length * 175)
  } else {
    currentImage.value -= 1
    scrollRef.value.scrollLeft(currentImage.value * 175)
  }
}
const nextImage = () => {
  if (currentImage.value === props.imageLists.length - 1) {
    currentImage.value = 0
    scrollRef.value.scrollLeft(0)
  } else {
    currentImage.value += 1
    scrollRef.value.scrollLeft(currentImage.value * 175)
  }
}
</script>
