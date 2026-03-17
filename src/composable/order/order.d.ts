export interface OrderListRequest {
  /**
   * 时间范围
   */
  dateRange?: string[]
  /**
   * 1:预定时间 2：入住时间 3：离店时间
   */
  dateType?: number
  /**
   * 入住人：精确搜索（命中其中一个完整的人名即可）
   */
  guestName?: string
  hotelNameLike?: string
  id?: number
  /**
   * 页码
   */
  pageNo?: number
  /**
   * 页面大小
   */
  pageSize?: number
  /**
   * 订单状态
   */
  status?: string
  [property: string]: any
}
/**
 * 酒店订单
 *
 * B2bHotelOrderVO
 */
export interface B2BHotelOrderVO {
  /**
   * 酒店详细信息
   */
  b2bHotel?: HotelVO
  /**
   * 酒店id
   */
  b2bHotelId?: string
  /**
   * 入住时间
   */
  checkInDate?: string
  /**
   * 离店时间
   */
  checkOutDate?: string
  /**
   * 预定时间
   */
  createTime?: string
  /**
   * 入住人名字
   */
  guestNameList?: string[]
  /**
   * 订单号
   */
  id?: number
  /**
   * Rateplan
   */
  rateplan?: RateplanVo
  /**
   * 订单状态
   */
  status?: string
  /**
   * 总价
   */
  totalAmount?: number
  /**
   * 房间数
   */
  roomCount?: number
  /**
   * 单价
   */
  unitAmount?: number
  contactPhone?: string
  [property: string]: any
}

/**
 * 酒店详细信息
 *
 * HotelVO
 */
export interface HotelVO {
  /**
   * 酒店地址
   */
  address?: string
  /**
   * 订房必读-入住时间
   */
  arrivalTime?: string
  /**
   * 订房必读-退房时间
   */
  departureTime?: string
  /**
   * 订房必读-重要通知
   */
  description?: string
  /**
   * 酒店封面
   */
  frontImg?: string
  /**
   * 酒店名字
   */
  hotelName?: string
  /**
   * 酒店前台电话集合
   */
  phoneList?: string[]
  [property: string]: any
}

/**
 * Rateplan
 *
 * RateplanVo
 */
export interface RateplanVo {
  /**
   * 餐食
   */
  breakfast?: number
  /**
   * 餐食描述
   */
  breakfastDesc?: string
  /**
   * 名字
   */
  name?: string
  area?: string
  /**
   * 床型
   */
  roomBedDesc?: string
  [property: string]: any
}

export enum OrderStatusEnum {
  Booking = 'BOOKING', // 待确认
  Confirmed = 'CONFIRMED', // 已确认
  Finished = 'FINISHED', // 已完成
  Canceling = 'CANCELING', // 取消中
  Canceled = 'CANCELED', // 已取消
}
