<template>
  <div class="bg-[#F3F5F7] h-full pt-[108px] pb-[20px] box-border">
    <div class="mx-[auto] w-[1440px] mb-[60px] box-border min-h-[calc(100vh-534px)]">
      <div class="pl-[20px] py-[16px] mb-[14px]">
        <Space direction="vertical">
          <Breadcrumb :routes="breadcrumbRoutes">
            <template #item-render="{ route }">
              <icon-home
                v-if="route?.path === '' && route?.label === 'homeIcon'"
                :size="18"
              />
              <Link
                v-else-if="route?.path !== ''"
                :href="route?.path"
                class="!text-[#999A9F] cursor-pointer hover:!text-[#2F2F2F]"
              >
                {{ route?.label }}
              </Link>
              <span v-else>{{ route?.label }}</span>
            </template>
          </Breadcrumb>
        </Space>
      </div>
      <div
        class="flex"
        v-if="Object.keys(hotelDetail)?.length > 0"
      >
        <!-- 左边内容 -->
        <div class="w-[960px] mr-[15px] shrink-1">
          <div class="overflow-hidden mb-[16px] bg-[#F7F8FF] border-[2px] border-solid border-[#fff] rounded-[10px]">
            <!-- 待确认 -->

            <div>
              <div class="flex items-center pt-[26px] mb-[4px]">
                <div
                  class="w-[6px] h-[22px] rounded-r-[4px] mr-[16px]"
                  :class="getColor(hotelDetail?.bizStatus)"
                ></div>

                <Popover
                  position="right"
                  v-if="hotelDetail?.bizStatusLog?.items?.length"
                  trigger="click"
                >
                  <div class="flex items-center cursor-pointer">
                    <div class="text-[#2F2F2F] text-[24px] font-bold">{{ getStatus(hotelDetail?.bizStatus) }}</div>
                    <icon-right
                      :size="20"
                      class="text-[#2F2F2F] font-bold"
                    />
                  </div>

                  <template #content>
                    <div class="w-[420px]">
                      <Steps
                        :current="0"
                        direction="vertical"
                      >
                        <Step v-for="(item, index) in hotelDetail?.bizStatusLog?.items">
                          <div class="flex justify-between w-[360px]">
                            {{ getStatus(item?.bizStatus) }}
                            <span class="text-[#767675] text-[14px]">{{ item.time }}</span>
                          </div>

                          <template #icon>
                            <img
                              v-if="index === hotelDetail?.bizStatusLog?.items.length - 1 && (item.bizStatus === 'CANCELING' || item.bizStatus === 'BOOKING')"
                              src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/order-pending-icon.png"
                              mode="scaleToFill"
                              class="w-[16px] h-[16px] mx-auto mt-[6px]"
                            />
                            <img
                              src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/order-success-icon.png"
                              mode="scaleToFill"
                              class="w-[16px] h-[16px] mx-auto mt-[6px]"
                              v-else
                            />
                          </template>

                          <template #description>
                            <!-- <div class="text-[#767675]">订单正在退款中，请耐心等待...</div> -->
                            <div>
                              <span v-if="hotelDetail?.bizStatus != 'CANCELED'">{{ getDescribe(item?.bizStatus, index, hotelDetail?.bizStatusLog?.items.length) }}</span>
                              <span v-else
                                >订单退款成功，退款金额 <span class="text-[#FA5151]">￥{{ hotelDetail?.refundAmount }}</span></span
                              >
                            </div>
                          </template>
                        </Step>
                        <!-- <Step>
                          <div class="flex justify-between w-[360px]">
                            已确认
                            <span class="text-[#767675] text-[14px]">2025-04-05 15:00:00</span>
                          </div>

                          <template #icon>
                      
                            <div class="bg-[#C7C7C7] w-[10px] h-[10px] rounded-full"></div> </template
                        ></Step>
                        <Step>
                          <div class="flex justify-between w-[360px]">
                            取消中
                            <span class="text-[#767675] text-[14px]">2025-04-05 15:00:00</span>
                          </div>

                          <template #icon>
                            <img
                              src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/order-pending-icon.png"
                              mode="scaleToFill"
                              class="w-[16px] h-[16px] mx-auto mt-[6px]"
                            />
                          </template>

                          <template #description>
                            <div class="text-[#767675]">订单正在退款中，请耐心等待...</div>
                          </template>
                        </Step> -->
                      </Steps>
                    </div>
                  </template>
                </Popover>

                <template v-else>
                  <div class="text-[#2F2F2F] text-[24px] font-bold">
                    {{ getStatus(hotelDetail?.bizStatus) }}
                  </div>

                  <icon-right
                    :size="20"
                    class="text-[#2F2F2F] font-bold"
                  />
                </template>
              </div>

              <div class="pl-[22px] mb-[24px] text-[#767675] text-[14px] leading-[22px]">
                <span v-if="hotelDetail?.bizStatus != 'CANCELED'">{{ getDescribe(hotelDetail?.bizStatus) }}</span>
                <span v-else
                  >订单退款成功，退款金额 <span class="text-[#FA5151]">￥{{ hotelDetail?.refundAmount }}</span></span
                >
              </div>
            </div>

            <div class="py-[20px] px-[22px] bg-white rounded-t-[16px]">
              <div class="box-border flex items-center h-[58px] px-[24px] mb-[24px] bg-[#F8F8FA] rounded-[10px] gap-x-[100px]">
                <div class="flex items-center text-[14px] leading-[22px]">
                  <div class="text-[#767675]">订单号：</div>
                  <div class="text-[#2F2F2F]">{{ hotelDetail?.id }}</div>
                </div>
                <div class="flex items-center text-[14px] leading-[22px]">
                  <div class="text-[#767675]">预订日期：</div>
                  <div class="text-[#2F2F2F]">{{ dayjs(hotelDetail?.bookTime).format('YYYY年MM月DD日 HH:mm:ss') }}</div>
                </div>
              </div>
              <div class="flex justify-between items-center mb-[10px]">
                <div>
                  <div class="mb-[4px] text-[#767675] text-[14px] leading-[22px]">入住</div>
                  <div class="text-[#2F2F2F] font-[600] text-[18px] leading-[30px]">{{ `${dayjs(hotelDetail?.checkInDate).format('MM月DD日')}(${WEEK_TEXT_MAP[dayjs(hotelDetail?.checkInDate).day()]})` }}</div>
                </div>
                <div class="w-[100px] h-[1px] bg-[#D8D8D8] rounded-full"></div>
                <div class="h-[32px] px-[16px] leading-[32px] bg-[#F3F4F8] rounded-[4px] text-[14px] text-[#2F2F2F]">{{ `${dayjs(hotelDetail?.checkOutDate).diff(dayjs(hotelDetail?.checkInDate), 'day')}晚` }}</div>
                <div class="w-[100px] h-[1px] bg-[#D8D8D8] rounded-full"></div>
                <div>
                  <div class="mb-[4px] text-[#767675] text-[14px] leading-[22px]">离店</div>
                  <div class="text-[#2F2F2F] font-[600] text-[18px] leading-[30px]">{{ `${dayjs(hotelDetail?.checkOutDate).format('MM月DD日')}(${WEEK_TEXT_MAP[dayjs(hotelDetail?.checkOutDate).day()]})` }}</div>
                </div>
              </div>
              <div class="flex items-center">
                <icon-info-circle
                  :size="14"
                  class="text-[#C7C7C7] mr-[4px]"
                />
                <div class="text-[#767675] text-[14px] leading-[22px]">入住和退房时间均以酒店当地时间为准</div>
              </div>
              <div class="pt-[30px] mt-[30px] border-t border-t-solid border-t-[#E5E6EB]">
                <div
                  class="flex items-center mb-[14px]"
                  @click="goHotelDetail"
                  :class="hotelDetail?.b2bHotel?.hotelId ? 'cursor-pointer' : ''"
                >
                  <img
                    class="w-[20px] h-[20px] mr-[6px]"
                    src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/hotel-room.png"
                    alt=""
                  />
                  <div class="text-[18px] text-[#2F2F2F] leading-[30px] font-[500]">{{ hotelDetail?.rateplan?.name }}</div>
                  <icon-right
                    :size="16"
                    class="text-[#2F2F2F] ml-[2px]"
                    v-if="hotelDetail?.b2bHotel?.hotelId"
                  />
                </div>
                <div class="pb-[6px]">
                  <Row
                    class="grid-demo"
                    :gutter="[24, 8]"
                  >
                    <Col :span="8">
                      <div class="flex items-center text-[14px] leading-[22px]">
                        <div class="text-[#767675]">房间数：</div>
                        <div class="text-[#2F2F2F]">{{ hotelDetail?.roomCount }}</div>
                      </div>
                    </Col>
                    <Col :span="8">
                      <div class="flex items-center text-[14px] leading-[22px]">
                        <div class="text-[#767675]">床型：</div>
                        <div class="text-[#2F2F2F]">{{ hotelDetail?.rateplan?.roomBedDesc }}</div>
                      </div>
                    </Col>
                    <!-- <Col :span="8">
                      <div class="flex items-center text-[14px] leading-[22px]">
                        <div class="text-[#767675]">窗型：</div>
                        <div class="text-[#2F2F2F]">有窗</div>
                      </div>
                    </Col> -->
                    <Col :span="8">
                      <div class="flex items-center text-[14px] leading-[22px]">
                        <div class="text-[#767675]">面积：</div>
                        <div class="text-[#2F2F2F]">{{ hotelDetail?.rateplan?.area || '-' }}㎡</div>
                      </div>
                    </Col>
                    <Col :span="8">
                      <div class="flex items-center text-[14px] leading-[22px]">
                        <div class="text-[#767675]">餐食：</div>
                        <div class="text-[#2F2F2F]">{{ hotelDetail?.rateplan?.breakfastDesc || '无' }}餐食</div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>

          <div class="p-[24px] bg-white rounded-[10px] mb-[16px]">
            <div class="flex items-center mb-[14px]">
              <img
                class="w-[20px] h-[20px] mr-[6px]"
                src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/cancel-policy.png"
                alt=""
              />
              <div class="text-[16px] text-[#2F2F2F] leading-[30px] font-[600]">取消政策</div>
            </div>
            <!-- 不可取消 #FF5D15 免费取消 #006790 -->
            <div class="text-[#FF5D15] text-[14px] leading-[22px]">不可取消</div>
          </div>

          <div class="p-[24px] bg-white rounded-[10px]">
            <div class="flex items-center mb-[14px]">
              <img
                class="w-[20px] h-[20px] mr-[6px]"
                src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/guest-info.png"
                alt=""
              />
              <div class="text-[16px] text-[#2F2F2F] leading-[30px] font-[600]">客人信息</div>
            </div>
            <Row
              class="grid-demo"
              :gutter="[24, 8]"
            >
              <Col :span="8">
                <div class="flex items-center text-[14px] leading-[22px]">
                  <div class="text-[#767675]">住客姓名：</div>
                  <div class="text-[#2F2F2F]">{{ hotelDetail?.guestNameList?.join('、') || '-' }}</div>
                </div>
              </Col>
              <Col :span="8">
                <div class="flex items-center text-[14px] leading-[22px]">
                  <div class="text-[#767675]">联系电话：</div>
                  <div class="text-[#2F2F2F]">{{ hotelDetail?.contactPhone || '-' }}</div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <!-- 右边内容 -->
        <div class="box-border w-[465px] px-[24px] py-[30px] bg-white rounded-[10px]">
          <div class="flex items-center mb-[36px]">
            <Image
              :src="`${hotelDetail?.b2bHotel?.frontImg}`"
              fit="cover"
              width="70px"
              height="98px"
              class="mr-[12px] rounded-[4px] shrink-0"
              :preview="false"
            />
            <div class="flex-auto overflow-hidden">
              <div
                class="flex mb-[6px]"
                :class="hotelDetail?.b2bHotel?.hotelId ? 'cursor-pointer' : ''"
                @click="goHotelDetail"
              >
                <div class="text-[16px] text-[#2F2F2F] font-bold leading-[22px] ellipsis-2">{{ hotelDetail?.b2bHotel?.hotelName }}</div>
                <icon-right
                  :size="16"
                  class="text-[#2F2F2F] font-bold mt-[2px] shrink-0"
                  v-if="hotelDetail?.b2bHotel?.hotelId"
                />
              </div>
              <div
                v-if="hotelDetail?.b2bHotel?.address"
                class="flex items-center mb-[2px] gap-x-[4px]"
              >
                <img
                  class="w-[15px] h-[15px] shrink-0"
                  src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/address.png"
                  alt=""
                />
                <div class="text-[14px] text-[#767675] leading-[20px] truncate">{{ hotelDetail?.b2bHotel?.address }}</div>
              </div>
              <div class="flex items-center">
                <img
                  class="w-[15px] h-[15px] mr-[4px]"
                  src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/telephone.png"
                  alt=""
                />
                <div class="text-[14px] text-[#767675] leading-[20px] truncate">{{ hotelDetail?.contactPhone || '-' }}</div>
              </div>
            </div>
          </div>
          <div class="pb-[12px]">
            <div class="flex justify-between items-center mb-[4px]">
              <div class="text-[16px] leading-[22px] text-[#2F2F2F] font-[500]">房费</div>
              <div class="text-[14px] leading-[22px] text-[#2F2F2F] font-[500]">{{ `￥${hotelDetail?.priceDetails?.roomFee}` }}</div>
            </div>
            <div
              class="flex justify-between items-center mb-[4px]"
              v-for="(item, index) in hotelDetail?.priceDetails?.roomFeeItems"
            >
              <div class="text-[14px] leading-[22px] text-[#999A9F] font-[500]">{{ item?.date }} {{ item?.breakfastDesc }}餐食</div>
              <div class="text-[14px] leading-[22px] text-[#999A9F] font-[500]">{{ item?.roomCount }} X {{ item?.unitAmount }}</div>
            </div>
          </div>
          <div class="flex justify-between items-center pt-[14px] mb-[50px] border-t-[1px] border-dashed border-t-[#D8D8D8]">
            <div class="text-[16px] leading-[22px] text-[#2F2F2F] font-[700]">支付金额</div>
            <div class="text-[#FA5151] leading-[22px] font-bold">
              <span class="text-[14px]">￥</span>
              <span class="text-[18px]">{{ hotelDetail?.totalAmount }}</span>
            </div>
          </div>
          <div class="mb-[14px] text-[18px] leading-[30px] text-[#2F2F2F] font-[700]">订房必读</div>
          <div class="mb-[18px] text-[14px] leading-[22px]">
            <div class="text-[#2F2F2F]">入离时间</div>
            <div class="text-[#767675]">入住时间：{{ hotelDetail?.b2bHotel?.arrivalTime }}后 退房时间：{{ hotelDetail?.b2bHotel?.departureTime }}前</div>
          </div>
          <div
            class="mb-[18px] text-[14px] leading-[22px]"
            v-if="hotelDetail?.b2bHotel?.description"
          >
            <div class="text-[#2F2F2F]">重要通知</div>
            <div class="text-[#767675]">{{ hotelDetail?.b2bHotel?.description }}</div>
          </div>
        </div>
      </div>

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
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Breadcrumb, Space, Link, Row, Steps, Popover, Step, Col, Image, Message } from '@arco-design/web-vue'
import { useRoute } from 'vue-router'
import { useHotelOrder } from '@/composable/order/order'
import { B2BHotelOrderVO, OrderStatusEnum } from '@/composable/order/order.d'
import dayjs from 'dayjs'
import { WEEK_TEXT_MAP, HOTEL_STAR_RATE } from '@/composable/constant'

const route = useRoute()
const orderId = ref<string>()
const { getHotelDetail } = useHotelOrder()
const breadcrumbRoutes = ref([
  {
    path: '',
    label: 'homeIcon',
  },
  {
    path: '#/hotel',
    label: '首页',
  },
  {
    path: '#/order-center?activityId=2',
    label: '订单中心',
  },
  {
    path: '',
    label: '酒店订单',
  },
])
const hotelDetail = ref<Partial<B2BHotelOrderVO>>({})
const onHotelDetail = () => {
  if (orderId.value == undefined) return
  getHotelDetail({ id: orderId.value }).then((res) => {
    if (!res?.data) return Message.error('暂无该订单数据')
    hotelDetail.value = res.data
  })
}

const getStatus = (status: string) => {
  switch (status) {
    case OrderStatusEnum.Booking:
      return '待确认'
    case OrderStatusEnum.Finished:
      return '已完成'

    case OrderStatusEnum.Confirmed:
      return '已确认'
    case OrderStatusEnum.Canceling:
      return '取消中'
    case OrderStatusEnum.Canceled:
      return '已取消'

    default:
      break
  }
}
const blueArr = [OrderStatusEnum.Canceled, OrderStatusEnum.Finished, OrderStatusEnum.Confirmed]
const getColor = (status: string) => {
  switch (status) {
    case OrderStatusEnum.Canceled:
    case OrderStatusEnum.Finished:
    case OrderStatusEnum.Confirmed:
      return 'bg-[#00D7E5]'

    case OrderStatusEnum.Booking:
    case OrderStatusEnum.Canceling:
      return 'bg-[#FF5D15]'

    default:
      break
  }
}

const getDescribe = (status: string, idx?: number, max?: number) => {
  // console.log('sssss', idx, max)

  if (max && idx != max - 1) return ''
  switch (status) {
    case OrderStatusEnum.Booking:
      return '订单正在确认中，请耐心等待...'
    case OrderStatusEnum.Finished:
      return '订单已完成，期待您的下次光临'

    case OrderStatusEnum.Confirmed:
      return '房间已为您保留，请安心入住'
    case OrderStatusEnum.Canceling:
      return '订单正在退款中，请耐心等待...'

    default:
      break
  }
}
const router = useRouter()

const goHotelDetail = () => {
  if (!hotelDetail?.value?.b2bHotel?.hotelId) return
  router.push({
    path: '/hotel/hotel-detail',
    query: {
      id: hotelDetail?.value?.b2bHotel?.hotelId,
    },
  })
}

onMounted(() => {
  orderId.value = route.query.id as string
  onHotelDetail()
})
</script>
<style lang="less" scoped>
:deep(.arco-steps-icon) {
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.arco-steps-item-tail) {
  &::after {
    border-style: dashed !important;
    border-width: 1px !important;
    border-color: #c7c7c7 !important;
  }
}
</style>
