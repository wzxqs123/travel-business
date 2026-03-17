<template>
  <div class="min-w-[1440px] min-h-[100vh] bg-[#F5F7FA] pt-[104px] custom-bg">
    <div class="max-w-[1400px] mx-auto relative z-10 pb-[76px]">
      <div class="pl-[20px] py-[16px] mb-[14px]">
        <Space direction="vertical">
          <Breadcrumb>
            <BreadcrumbItem>
              <icon-home :size="18" />
            </BreadcrumbItem>
            <BreadcrumbItem
              class="text-[#999A9F] cursor-pointer hover:!text-[#fff]"
              @click="() => router.push('/order-center')"
            >
              首页
            </BreadcrumbItem>
            <BreadcrumbItem
              class="!text-[#999A9F] cursor-pointer hover:!text-[#fff]"
              @click="() => router.go(-1)"
            >
              酒店列表
            </BreadcrumbItem>
            <BreadcrumbItem :style="{ color: '#fff' }">
              {{ detailData?.hotelDetail?.hotelName }}
            </BreadcrumbItem>
          </Breadcrumb>
        </Space>
      </div>
      <div class="custom-header">
        <div class="relative z-10 flex items-end">
          <Image
            :src="coverImage"
            fit="cover"
            width="640px"
            height="362px"
            class="rounded-[18px] shrink-0"
            :preview="false"
          />
          <div class="ml-[36px] h-[300px] flex flex-col justify-between">
            <div class="">
              <div class="text-[26px] text-[#2F2F2F] flex items-top">
                <div class="leading-[36px]">
                  {{ detailData?.hotelDetail?.hotelName }}
                </div>
                <div
                  class="w-[83px] h-[36px] text-[12px] shrink-0 ml-[12px] text-[#fff] flex items-center"
                  v-if="detailData?.hotelDetail?.starRate"
                >
                  <div class="h-[24px] custom-start-bg flex-1 flex items-center">
                    <em class="pl-[8px]"> {{ HOTEL_STAR_RATE[detailData.hotelDetail.starRate] }}星级 </em>
                  </div>
                </div>
              </div>
              <div class="text-[18px] text-[#767675] leading-[36px] pt-[6px]">
                <span v-if="detailData?.hotelDetail?.address">{{ detailData?.hotelDetail?.address }},</span>
                <span v-if="detailData?.hotelDetail?.districtName">{{ detailData?.hotelDetail?.districtName }},</span>
                <span v-if="detailData?.hotelDetail?.cityName">{{ detailData?.hotelDetail?.cityName }},</span>
                <span v-if="detailData?.hotelDetail?.countryName">{{ detailData?.hotelDetail?.countryName }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-x-[20px]">
              <div
                class="w-[217px] h-[150px] rounded-[20px] overflow-hidden relative"
                v-for="(item, index) in hotelImages.slice(0, 3)"
                :key="item.thumbnailUrl"
              >
                <Image
                  :src="item.thumbnailUrl || 'https://hx-mp-res.hitrips.cn/b2b-official-website/img-empty.png'"
                  fit="cover"
                  width="100%"
                  height="100%"
                  :preview="false"
                />
                <!-- 查看更多 -->
                <template v-if="index === hotelImages.slice(0, 3).length - 1">
                  <CategoryPhotoWallModal :hotelImages="detailData?.hotelImages || []">
                    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-[5px] text-[#fff] text-[20px] flex items-center justify-center cursor-pointer">查看更多</div>
                  </CategoryPhotoWallModal>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 时间选择 -->
      <div class="my-[20px] h-[86px]">
        <div
          class="searchTime"
          v-if="useStore.scrollTopNum < 740"
        >
          <RangePicker
            v-model="dataTime"
            position="bottom"
            :disabled-date="(current: string | number | Date | dayjs.Dayjs | null | undefined) => dayjs(current).isBefore(dayjs().subtract(1, 'day')) || dayjs(current).isAfter(dayjs().add(1, 'year'))"
          >
            <div class="flex items-center justify-between px-[250px] h-[86px] rounded-[16px] cursor-pointer">
              <div class="">
                <div class="text-[16px] text-[#767675]">入住</div>
                <div class="text-[20px]">
                  {{ searchStore.searchInfo?.startTimeStr }}
                </div>
              </div>

              <div class="text-[16px] flex items-center">
                <div class="w-[86px] h-[1px] bg-[#D8D8D8]"></div>
                <div class="text-[16px] mx-[68px]">{{ searchStore.searchInfo.day }}晚</div>
                <div class="w-[86px] h-[1px] bg-[#D8D8D8]"></div>
              </div>

              <div class="">
                <div class="text-[16px] text-[#767675]">离店</div>
                <div class="text-[20px]">
                  {{ searchStore.searchInfo?.endTimeStr }}
                </div>
              </div>
            </div>
          </RangePicker>
        </div>
      </div>
      <!-- 房型 -->
      <div class="bg-white py-[40px] px-[36px] rounded-[20px] relative">
        <div
          id="roomId"
          class="absolute -top-[100px]"
        ></div>
        <!-- 分类 -->
        <div class="h-[32px] text-center mb-[50px]">
          <CategoryCheck
            :category="category"
            v-model="radioValue"
            @onTapChange="onTapChange"
          ></CategoryCheck>
        </div>
        <!-- 房型列表 -->
        <div
          class=""
          v-for="(room, roomIndex) in isShowMoreRoom ? roomData : roomData.slice(0, 3)"
          :key="room.b2bRoomTypeId"
        >
          <RoomDetailModal
            :imageLists="getRoomImage(room.b2bRoomTypeId)"
            :roomDetail="room"
          >
            <div class="flex items-center mb-[24px] room-title">
              <div class="text-[20px] font-[600] mr-[18px] cursor-pointer">
                {{ room.roomTypeName }}
                <icon-right class="text-[#999A9F] room-icon" />
              </div>
              <div class="text-[#767675] tet-[16px]">
                <Space :size="0">
                  <template #split> 丨 </template>
                  <span v-if="room.bedType">{{ room.bedType }}</span>
                  <span v-if="room.roomArea">{{ room.roomArea }}</span>
                  <span v-if="room.capacity">可入住{{ room.capacity }}</span>
                  <span v-if="room.windowType">{{ room.windowType }}</span>
                </Space>
              </div>
            </div>
          </RoomDetailModal>
          <!-- rp列表 -->
          <div class="flex gap-x-[30px]">
            <div class="basis-[326px] relative img-wrap cursor-pointer">
              <RoomDetailModal
                :imageLists="getRoomImage(room.b2bRoomTypeId)"
                :roomDetail="room"
              >
                <div class="w-[326px] h-[230px] overflow-hidden rounded-[16px]">
                  <Image
                    :src="getRoomImage(room.b2bRoomTypeId)[0]?.normalUrl || 'https://hx-mp-res.hitrips.cn/b2b-official-website/img-empty.png'"
                    fit="cover"
                    width="100%"
                    height="100%"
                    class="hotel-img"
                    :preview="false"
                  />
                </div>
                <div class="cursor-pointer absolute top-[194px] right-[12px] px-[8px] h-[24px] rounded-[54px] bg-[rgba(0,0,0,0.5)] text-white text-[14px]">
                  <PhotoWallModal :images="getRoomImage(room.b2bRoomTypeId)">
                    <div class="flex items-center gap-[4px] h-[24px]">
                      <img
                        src="https://hx-mp-res.hitrips.cn/b2b-official-website/none.png"
                        alt=""
                      />
                      <div class="leading-[14px]">
                        {{ getRoomImage(room.b2bRoomTypeId).length }}
                      </div>
                      <icon-right />
                    </div>
                  </PhotoWallModal>
                </div>
              </RoomDetailModal>
            </div>
            <div class="flex-1">
              <Space
                direction="vertical"
                fill
                :size="20"
              >
                <SkeletonLine
                  :rows="2"
                  v-if="rpLoading"
                  :animation="true"
                  :line-height="105"
                />
                <template v-else>
                  <template
                    v-for="item in room.expand ? room.ratePlanDetails : room.ratePlanDetails.slice(0, 2)"
                    :key="item.id"
                  >
                    <RpDetailModal
                      :imageLists="getRoomImage(room.b2bRoomTypeId)"
                      :roomDetail="room"
                      :rpDetail="item"
                      :hotelDetail="detailData?.hotelDetail"
                      :bookingFacilities="detailData?.bookingNoticeFacilities || []"
                    >
                      <div
                        class="bg-[#F8F8FA] rounded-[20px] pl-[30px] pr-[36px] py-[18px] flex justify-between items-center rp-shadow cursor-pointer box-border"
                        :class="[room.ratePlanDetails.length === 1 ? 'min-h-[230px]' : 'min-h-[105px]']"
                      >
                        <div class="font-[500] text-[18px] cursor-pointer flex-1">
                          <div class="flex-1 grid grid-cols-3 gap-y-[14px] gap-x-[14px]">
                            <div class="flex items-center gap-[8px]">
                              <img
                                :src="`https://hx-mp-res.hitrips.cn/b2b-official-website/${item.breakfast.indexOf('无') === -1 ? 'reserve-active' : 'reserve-grey'}.png`"
                                alt=""
                              />
                              <span :class="[item.breakfast.indexOf('无') === -1 ? 'text-[#05506D]' : 'text-[#767675]']">
                                {{ item.breakfast }}
                              </span>
                            </div>
                            <div class="flex items-center gap-[8px]">
                              <icon-check-circle
                                :size="22"
                                class="text-[#05506D]"
                                v-if="getActive(item)"
                              />
                              <icon-stop
                                class="text-[#767675]"
                                v-else
                              />
                              <span :class="[getActive(item) ? 'text-[#05506D]' : 'text-[#767675]']">
                                {{ item.ratePlanType === 1 ? item.cancelRule?.effectiveRuleCancelName || item.cancelRule?.ruleName : item.hourRule }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="text-[#FF4222] font-[700] flex items-center">
                          <template v-if="typeof item.price == 'number'">
                            <template v-if="item.price >= 0">
                              <span class="text-[20px]">￥</span>
                              <span class="text-[26px]">
                                {{ (item.price / 100).toFixed(2) }}
                              </span>
                            </template>
                            <span v-else>暂无报价</span>
                          </template>
                          <span v-else>-</span>
                        </div>
                      </div>
                    </RpDetailModal>
                  </template>
                </template>
              </Space>
            </div>
          </div>
          <!-- rp收起/展开 -->
          <div
            class="flex items-center justify-end mt-[24px] text-[#FF4222] cursor-pointer"
            v-if="room.ratePlanDetails.length > 2"
            @click="handleExpandRp(room)"
          >
            <!-- @click="room.expand = !room.expand" -->
            {{ room.expand ? '收起其他报价' : `查看其他${room.ratePlanDetails.length - 2}个报价` }}
            <icon-down :class="[room.expand ? 'rotate-180' : '']" />
          </div>
          <!-- 自定义分割线 -->
          <div
            class="h-[10px] bg-[#F5F7FA] -ml-[36px] -mr-[36px] mt-[50px] mb-[40px]"
            v-if="!(roomIndex === roomData.length - 1 && roomData.length <= 3)"
          ></div>
        </div>
        <!-- 房型收起/展开 -->
        <div
          class="flex items-center justify-center"
          v-if="roomData.length > 3"
        >
          <div
            class="text-[#FF590F] text-[18px] border-solid border-[1px] border-[#FF590F] rounded-[8px] bg-[rgba(255,89,15,0.06)] px-[28px] py-[10px] cursor-pointer"
            @click="isShowMoreRoom = !isShowMoreRoom"
          >
            {{ isShowMoreRoom ? '收起房型' : '查看更多房型' }}
            <icon-down :class="[isShowMoreRoom ? 'rotate-180' : '']" />
          </div>
        </div>
      </div>
      <!-- 酒店介绍、政策、设施 -->
      <div class="bg-white rounded-[20px] px-[36px] pt-[36px] pb-[6px] mt-[20px]">
        <!-- 酒店介绍 -->
        <div class="flex items-center mb-[44px] relative overflow-hidden">
          <Image
            src="https://hx-mp-res.hitrips.cn/b2b-official-website/introduce.png"
            fit="cover"
            width="28px"
            height="28px"
            :preview="false"
          />
          <div
            id="introduceId"
            class="absolute -top-[190px]"
          ></div>
          <div class="ml-[4px] text-[24px] font-[700]">酒店介绍</div>
        </div>
        <Space
          direction="vertical"
          fill
          :size="0"
        >
          <template #split>
            <Divider :margin="24" />
          </template>
          <Row>
            <Col
              flex="300px"
              class="font-[700] text-[16px]"
              >基础信息</Col
            >
            <Col
              flex="auto"
              class="text-[16px] w-0"
            >
              <div class="grid grid-cols-[auto_auto_auto_auto]">
                <div>
                  开业日期:
                  {{ detailData?.hotelDetail?.establishmentDate || '-' }}
                </div>
                <div>装修日期: {{ detailData?.hotelDetail?.renovationDate || '-' }}</div>
                <div>客房数量: {{ detailData?.hotelDetail?.roomTotalAmount }}</div>
                <div>
                  酒店类型:
                  {{ detailData?.hotelDetail?.category ? getCategory(detailData.hotelDetail.category) : '暂无数据' }}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              flex="300px"
              class="font-[700] text-[16px]"
              >联系电话</Col
            >
            <Col
              flex="auto"
              class="text-[16px]"
            >
              {{ detailData?.hotelDetail?.phone || '-' }}
            </Col>
          </Row>
          <Row>
            <Col
              flex="300px"
              class="font-[700] text-[16px]"
              >酒店描述</Col
            >
            <Col
              flex="auto"
              class="text-[16px] w-0"
            >
              <div v-html="detailData?.hotelDetail?.introEditor || '-'"></div>
            </Col>
          </Row>
        </Space>
        <Divider :margin="24" />
        <!-- 订房必读 -->
        <div class="flex items-center mb-[54px] pt-[16px] relative">
          <Image
            src="https://hx-mp-res.hitrips.cn/b2b-official-website/read.png"
            fit="cover"
            width="28px"
            height="28px"
            :preview="false"
          />
          <div
            id="policyId"
            class="absolute -top-[176px]"
          ></div>
          <div class="ml-[4px] text-[24px] font-[700]">订房必读</div>
        </div>
        <Space
          direction="vertical"
          fill
          :size="0"
        >
          <template #split>
            <Divider :margin="24" />
          </template>
          <Row>
            <Col
              flex="300px"
              class="font-[700] text-[16px]"
              >重要通知</Col
            >
            <Col
              flex="auto"
              class="text-[16px] w-0"
            >
              {{ detailData?.hotelDetail?.description || '-' }}
            </Col>
          </Row>
          <Row>
            <Col
              flex="300px"
              class="font-[700] text-[16px]"
              >入离时间</Col
            >
            <Col
              flex="auto"
              class="text-[16px] w-0"
            >
              入住时间：{{ detailData?.hotelDetail?.arrivalTime || '-' }}后 退房时间：{{ detailData?.hotelDetail?.departureTime || '-' }}前
            </Col>
          </Row>
        </Space>
        <Divider :margin="24" />
        <!-- 入住政策 -->
        <div class="flex items-center mb-[54px] pt-[16px] relative overflow-hidden">
          <Image
            src="https://hx-mp-res.hitrips.cn/b2b-official-website/check-in-policy.png"
            fit="cover"
            width="28px"
            height="28px"
            :preview="false"
          />

          <div class="ml-[4px] text-[24px] font-[700]">入住政策</div>
        </div>
        <Space
          direction="vertical"
          fill
          :size="0"
        >
          <template #split>
            <Divider :margin="24" />
          </template>
          <div
            class="text-[16px]"
            v-for="item in detailData?.bookingNoticeFacilities ?? []"
            :key="item.Id"
          >
            {{ item.name }}
          </div>
        </Space>
        <Divider :margin="24" />
        <!-- 基础设施 -->
        <template v-if="baseFacility.length > 0">
          <div class="flex items-center mb-[54px] pt-[16px] relative overflow-hidden">
            <Image
              src="https://hx-mp-res.hitrips.cn/b2b-official-website/services-amenities.png"
              fit="cover"
              width="24px"
              height="24px"
              :preview="false"
            />
            <div
              id="facilityId"
              class="absolute -top-[176px]"
            ></div>
            <div class="ml-[10px] text-[24px] font-[700]">基础设施</div>
          </div>
          <template
            v-for="(item, index) in baseFacility"
            :key="index"
          >
            <div class="grid grid-cols-5 text-[16px]">
              <div
                class="flex items-center"
                v-for="subItem in item"
                :key="subItem.Id"
              >
                <span class="w-[6px] h-[6px] rounded-full bg-[#2F2F2F] mr-[6px]"></span>
                {{ subItem.name }}
              </div>
            </div>
            <Divider :margin="24" />
          </template>
        </template>
        <template v-if="serviceFacility.length > 0">
          <div class="flex items-center mb-[54px] pt-[16px] relative overflow-hidden">
            <Image
              src="https://hx-mp-res.hitrips.cn/b2b-official-website/services-amenities.png"
              fit="cover"
              width="24px"
              height="24px"
              :preview="false"
            />
            <div class="ml-[10px] text-[24px] font-[700]">服务设施</div>
          </div>
          <template
            v-for="(item, index) in serviceFacility"
            :key="index"
          >
            <div class="grid grid-cols-5 text-[16px]">
              <div
                class="flex items-center"
                v-for="subItem in item"
                :key="subItem.Id"
              >
                <span class="w-[6px] h-[6px] rounded-full bg-[#2F2F2F] mr-[6px]"></span>
                {{ subItem.name }}
              </div>
            </div>
            <Divider :margin="24" />
          </template>
        </template>
      </div>
    </div>
    <!-- 滚动到一定定位到顶部元素 -->
    <div
      class="fixed top-[96px] left-0 right-0 h-[80px] bg-[#fff] !z-10 shadow-[0px_6px_32px_0px_rgba(0,0,0,0.05)]"
      v-if="useStore.scrollTopNum >= 740"
    >
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <div class="h-[80px] leading-[80px] text-center">
          <!-- {{ radioValue }} -->
          <CategoryCheck
            :category="category"
            v-model="radioValue"
            @onTapChange="onTapChange"
          ></CategoryCheck>
        </div>
        <RangePicker
          v-model="dataTime"
          position="bottom"
          :disabled-date="(current: string | number | Date | dayjs.Dayjs | null | undefined) => dayjs(current).isBefore(dayjs().subtract(1, 'day')) || dayjs(current).isAfter(dayjs().add(1, 'year'))"
        >
          <div class="flex items-center justify-between h-[86px] rounded-[16px] cursor-pointer">
            <div class="flex items-center mr-[20px]">
              <span class="text-[16px] text-[#767675] mr-[12px] shrink-0"> 入住 </span>
              <span class="text-[20px]">
                {{ searchStore.searchInfo?.startTimeStr }}
              </span>
            </div>

            <div class="text-[16px] flex items-center">
              <div class="w-[60px] h-[1px] bg-[#D8D8D8]"></div>
              <div class="text-[16px] mx-[10px] border-solid border-[1px] border-[#D8D8D8] px-[16px] leading-[30px] rounded-full">{{ searchStore.searchInfo.day }}晚</div>
              <div class="w-[60px] h-[1px] bg-[#D8D8D8]"></div>
            </div>

            <div class="flex items-center ml-[20px]">
              <span class="text-[16px] text-[#767675] mr-[12px] shrink-0"> 离店 </span>
              <span class="text-[20px]">
                {{ searchStore.searchInfo?.endTimeStr }}
              </span>
            </div>
          </div>
        </RangePicker>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Space, Breadcrumb, SkeletonLine, BreadcrumbItem, Message, Image, RangePicker, Row, Col, Divider } from '@arco-design/web-vue'
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSearch } from '@/store'
import dayjs from 'dayjs'
import { WEEK_TEXT_MAP, HOTEL_STAR_RATE } from '@/composable/constant'
import RpDetailModal from './components/rp-detail-modal.vue'
import RoomDetailModal from './components/room-detail-modal.vue'
import CategoryPhotoWallModal from './components/category-photo-wall-modal.vue'
import PhotoWallModal from './components/photo-wall-modal.vue'
import CategoryCheck from './components/category-check.vue'
import { useUserStore } from '@/store'
import { useHotel } from '@/composable/hotel/hotel'
import { HotelDetailRes, Facility, RoomTypeDetail, StdRatePlanDetail } from '@/composable/hotel/hotel.d'
import { chunkArray } from '@/utils/array'

const { getHotelDetail, getRatePlanQuote } = useHotel()

const useStore = useUserStore()
const router = useRouter()
const route = useRoute()
const searchStore = useSearch()
const detailData = ref<HotelDetailRes>()
const hotelImages = computed(() => {
  let imagesList = detailData.value?.hotelImages?.find((item) => item.type === 5)?.images || []
  return imagesList.filter((item) => !item.isCover)
})
const coverImage = computed(() => {
  let imagesList = detailData.value?.hotelImages?.find((item) => item.type === 5)?.images || []
  let cover = imagesList.filter((item) => item.isCover)
  if (cover.length === 0 && imagesList?.length) {
    cover = [imagesList[imagesList.length - 1]]
  }
  return cover?.[0]?.fullUrl || 'https://hx-mp-res.hitrips.cn/b2b-official-website/img-empty.png'
})

const category = ref([
  {
    id: 'roomId',
    name: '房间',
  },
  {
    id: 'introduceId',
    name: '介绍',
  },
  {
    id: 'policyId',
    name: '政策',
  },
  {
    id: 'facilityId',
    name: '设施',
  },
])
const isStopWatchScroll = ref(false)

const dataTime = ref<string[]>([searchStore.searchInfo.startTime as string, searchStore.searchInfo.endTime as string])
const radioValue = ref<string>(category.value[0]?.id)
const isShowMoreRoom = ref(false)
const roomData = computed(() => {
  const newData =
    detailData.value?.roomTypeDetails?.map((item: any) => {
      return {
        expand: false,
        ...item,
      }
    }) || []
  return newData
})

const baseFacility = computed(() => {
  return chunkArray<Facility>(detailData.value?.generalFacilities || [], 5)
})
const serviceFacility = computed(() => {
  return chunkArray<Facility>(detailData.value?.serviceFacilities || [], 5)
})

watch(dataTime, (val) => {
  if (val[0] == val[1]) return Message.error('开始和结束时间不能为同一天')

  searchStore.setSearchInfo({
    startTime: val[0],
    endTime: val[1],
    startTimeStr: dayjs(val[0]).format('MM月DD日') + `(${WEEK_TEXT_MAP[dayjs(val[0]).day()]})`,
    endTimeStr: dayjs(val[1]).format('MM月DD日') + `(${WEEK_TEXT_MAP[dayjs(val[1]).day()]})`,
  })
})

const getRoomImage = (b2bRoomTypeId: number) => {
  return detailData.value?.roomImages?.find((item) => item?.b2bRoomTypeId === b2bRoomTypeId)?.images || []
}

const getActive = (item: StdRatePlanDetail) => {
  if (item.ratePlanType === 1) {
    const newRuleName = item.cancelRule?.effectiveRuleCancelName || item.cancelRule?.ruleName
    const flag = newRuleName?.indexOf('不可取消') === -1 && newRuleName.indexOf('未知') === -1
    return flag ? true : false
  } else {
    const flag = item.hourRule?.indexOf('不可取消') === -1 && item.hourRule?.indexOf('未知') === -1
    return flag ? true : false
  }
}

const getCategory = (category: number) => {
  switch (category) {
    case 3:
      return '舒适'
    case 4:
      return '高档'
    case 5:
      return '豪华'
    default:
      return '客栈'
  }
}

const handleExpandRp = (room: RoomTypeDetail) => {
  detailData.value!.roomTypeDetails?.forEach((item) => {
    if (room.b2bRoomTypeId === item.b2bRoomTypeId) {
      item.expand = !item.expand
    }
    return item
  })
}

const b2bRoomTypeId = ref<number[]>([])

const rpLoading = ref(false)
const getQuote = () => {
  if (b2bRoomTypeId.value.length > 0) {
    // 获取报价
    rpLoading.value = true
    getRatePlanQuote({
      b2bHotelId: route.query.id as string,
      b2bRoomTypeId: b2bRoomTypeId.value,
      startDate: searchStore.searchInfo.startTime!,
      endDate: searchStore.searchInfo.endTime!,
    })
      .then((res) => {
        const { ratePriceList = [], ratePlanDetails = [] } = res.data
        if (ratePlanDetails.length > 0) {
          const newRatePlanDetails = ratePlanDetails.map((ratePlan) => {
            ratePlan.price = ratePriceList.find((item) => item.contentId === ratePlan.id)?.price || 0
            return ratePlan
          })
          detailData.value!.roomTypeDetails!.forEach((room) => {
            room.ratePlanDetails = newRatePlanDetails.filter((item) => room.b2bRoomTypeId === item.b2bRoomTypeId)
          })
        }
      })
      .finally(() => {
        rpLoading.value = false
      })
  }
}

const onTapChange = () => {
  isStopWatchScroll.value = true
  setTimeout(() => {
    isStopWatchScroll.value = false
  }, 1000)
}

watch([() => searchStore.searchInfo.startTime, () => searchStore.searchInfo.endTime], () => {
  getQuote()
})

watch(
  () => useStore.scrollTopNum,
  () => {
    if (!isStopWatchScroll.value) {
      const roomIdExample = document.getElementById('roomId')
      const roomIdTop = roomIdExample?.getBoundingClientRect()?.top || 0
      const introduceIdExample = document.getElementById('introduceId')
      const introduceIdTop = introduceIdExample?.getBoundingClientRect()?.top || 0
      const policyIdExample = document.getElementById('policyId')
      const policyIdTop = policyIdExample?.getBoundingClientRect()?.top || 0
      const facilityIdExample = document.getElementById('facilityId')
      const facilityIdTop = facilityIdExample?.getBoundingClientRect()?.top || 0
      if (roomIdTop < 100 && roomIdTop > -100) {
        radioValue.value = 'roomId'
      }
      if (introduceIdTop < 50 && introduceIdTop > -50) {
        radioValue.value = 'introduceId'
      }
      if (policyIdTop < 50 && policyIdTop > -50) {
        radioValue.value = 'policyId'
      }
      if (facilityIdTop < 50 && facilityIdTop > -50) {
        radioValue.value = 'facilityId'
      }
    }
  },
  {
    deep: true,
  }
)
onMounted(() => {
  onTapChange()
  getHotelDetail({ b2bHotelId: route.query.id as string }).then((res) => {
    const { data } = res
    data.roomTypeDetails?.map((room) => {
      b2bRoomTypeId.value.push(room.b2bRoomTypeId as number)
      room.ratePlanDetails = []
      return room
    })
    detailData.value = data

    getQuote()
  })
})
</script>

<style scoped lang="less">
.custom-bg {
  z-index: 0;
  &::after {
    min-width: 1440px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 339px;
    content: '';
    display: block;
    background-image: url('https://hx-mp-res.hitrips.cn/b2b-official-website/hotel-bg.png');
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% auto;
    overflow: hidden;
  }
  &::before {
    min-width: 1440px;
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 393px;
    content: '';
    display: block;
    background-image: linear-gradient(180deg, rgba(21, 29, 49, 0.7) 0%, rgba(24, 29, 44, 0.8) 50%, #f5f7fa 100%);
    backdrop-filter: blur(15px);
  }
}
.custom-header {
  position: relative;
  border-radius: 18px;
  height: 392px;
  padding: 0 30px 30px;
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    display: block;
    border-radius: 18px;
    height: 356px;
    border: 2px solid #ffffff;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 11px 19px 0px rgba(150, 150, 150, 0.05);
  }
}
.custom-start-bg {
  background-image: url('https://hx-mp-res.hitrips.cn/b2b-official-website/start-bg-2.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.searchTime {
  height: 86px;
  border: 3px solid transparent;
  border-radius: 20px;
  background-image: linear-gradient(#fff, #fff), linear-gradient(135deg, rgba(255, 246.0000005364418, 122.00000032782555, 1), rgba(110.57522177696228, 255, 255, 1));
  background-origin: border-box;
  background-clip: content-box, border-box;
  &:hover {
    box-shadow: 0px 8px 32px 0px rgba(25, 55, 17, 0.1);
  }
}
.rp-shadow {
  &:hover {
    box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.1);
  }
}
.arco-divider-horizontal {
  border-bottom: 1px solid #f3f4f8;
}

.img-wrap {
  .hotel-img {
    transition: all 0.3s;
  }
  &:hover .hotel-img {
    transform: scale(1.2);
  }
}
.room-title {
  &:hover {
    color: #ff590f;
    .room-icon {
      color: #ff590f;
    }
  }
}
:deep(.arco-skeleton-line-row) {
  border-radius: 20px;
}
</style>
