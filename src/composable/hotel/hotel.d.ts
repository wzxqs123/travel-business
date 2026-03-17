export interface HotCityRes {
  /**
   * 城市 AdCode
   */
  id: number
  cityName: string
  parentCityName: string
}

export interface HotelSuggestQuery {
  /**
   * 分页 ID，分页时必须传入,第一页传入 null，其他时候请根据返回结构中的 maxId来填入分页 ID
   */
  maxId?: number | null
  pageSize: number
  hotelKeyword: string
  adCode: string
}

export interface SuggestRes {
  /**
   * 酒店 hotelId
   * 城市 adcode
   */
  id: string
  /**
   * 单行关键词，
   * 酒店第一个是酒店名，第二个是省市
   * 城市搜索第一个是城市名，第二个是省份
   */
  hits: string[]
  /**
   * 高亮格式化，(暂时为空)
   */
  heightLightFormat: string
  /**
   * 类型 1:酒店,2:城市
   */
  type: number
  /**
   * 类型名称，前端可直接展示
   */
  typeName: string
}

export interface HotelBaseList {
  id: string
  hotelName: string
  frontImg: string
  address: string
  category: number
  starRate: number
  cityName: string
  areaName: string
  price?: number // 额外添加字段存储匹配价格
  ext: Record<string, any>
}

export interface HotelSearchRes {
  b2bHotelBaseList: HotelBaseList[]
  maxId: number
  total: number
}

export interface HotelQuoteQuery {
  b2bHotelIdList: string[]
  startDate: string
  endDate: string
}

export interface RatePriceList {
  /**
   * B2B酒店 ID
   */
  b2bHotelId: string
  /**
   * 内容 ID，根据B2BHotelQuoteType来确定是哪个 ID
   */
  contentId: string
  /**
   * 报价的类型
   * HOTEL
   * ROOM_TYPE
   * RATE_PLAN
   */
  quoteType: string
  /**
   * 报价（单位是分，前端注意转换）
   */
  price: number
}

export interface HotelQuoteRes {
  ratePriceList: RatePriceList[]
  /**
   * 房型rp计划详情
   */
  ratePlanDetails?: StdRatePlanDetail[]
}

/**
 * 设施通用结构
 *
 * Facility
 */
export interface Facility {
  /**
   * 设施 ID
   */
  Id?: number
  /**
   * 设施名称
   */
  name?: string
  [property: string]: any
}

/**
 * 酒店详情
 *
 * HotelDetail
 */
export interface HotelDetail {
  /**
   * 酒店地址
   */
  address?: string
  /**
   * 最早入住时间
   */
  arrivalTime?: string
  /**
   * 商圈名称
   */
  businessZoneName?: string
  /**
   * 酒店类型
   */
  category?: number
  /**
   * 城市名称
   */
  cityName?: string
  /**
   * 国家名称
   */
  countryName?: string
  /**
   * 最晚离店时间
   */
  departureTime?: string
  /**
   * 酒店备注
   */
  description?: string
  /**
   * 地区名称
   */
  districtName?: string
  /**
   * 开业时间
   */
  establishmentDate?: string
  /**
   * 酒店名称
   */
  hotelName?: string
  /**
   * 酒店介绍
   */
  introEditor?: string
  /**
   * 酒店电话
   */
  phone?: string
  /**
   * 装修时间
   */
  renovationDate?: string
  /**
   * 房间数
   */
  roomTotalAmount?: number
  /**
   * 星级
   */
  starRate?: number
  [property: string]: any
}

/**
 * HotelImages
 */
export interface HotelImages {
  /**
   * 图片集合
   */
  images?: Image[]
  /**
   * 类型，详见<a
   * href="https://open.elong.com/doc/info/cn-api-meta-hotelinfo">https://open.elong.com/doc/info/cn-api-meta-hotelinfo
   * 搜 Image节点</a>
   */
  type?: number
  /**
   * 类型名称
   */
  typeName?: string
  [property: string]: any
}

/**
 * 照片
 *
 * Image
 */
export interface Image {
  /**
   * 全尺寸图片地址
   */
  fullUrl?: string
  /**
   * 是否封面
   */
  isCover?: boolean
  /**
   * 正常图图片地址
   */
  normalUrl?: string
  /**
   * 缩略图地址
   */
  thumbnailUrl?: string
  [property: string]: any
}

/**
 * 房型图片
 *
 * RoomImages
 */
export interface RoomImages {
  /**
   * 房型 ID
   */
  b2bRoomTypeId?: number
  /**
   * 图片集合
   */
  images?: Image[]
  /**
   * 图片类型
   */
  type?: number
  /**
   * 类型名称
   */
  typeName?: string
  [property: string]: any
}

/**
 * 房型信息
 *
 * RoomTypeDetail
 */
export interface RoomTypeDetail {
  /**
   * b2b房型 ID
   */
  b2bRoomTypeId?: number
  /**
   * 床型（前端不需要解析，后端解析好返回字符串直接展示即可）
   */
  bedType?: string
  /**
   * 房间最大入住人数（前端不需要解析，后端解析好返回字符串直接展示即可）
   */
  capacity?: string
  /**
   * 楼层（前端不需要解析，后端解析好返回字符串直接展示即可）
   */
  floor?: string
  /**
   * 房间面积（前端不需要解析，后端解析好返回字符串直接展示即可）
   */
  roomArea?: string
  /**
   * 房型名称
   */
  roomTypeName?: string
  /**
   * 窗型（前端不需要解析，后端解析好返回字符串直接展示即可）
   */
  windowType?: string
  facilities?: Facility[]
  [property: string]: any
}

export interface CancelRuleItem {
  /**
   * 日期格式化,直接展示即可
   */
  dateFormat: string
  /**
   * 格式化后具体规则，直接展示即可
   */
  ruleFormat: string
}

export interface CancelRule {
  items: CancelRuleItem[]
  /**
   * 酒店规则，优先展示effectiveRuleCancelName
   */
  ruleName: string
  /**
   * 实时规则，优先展示，为空则展示 ruleName
   */
  effectiveRuleCancelName: string
}

/**
 * 房型价格计划详情
 *
 * StdRatePlanDetail
 */
export interface StdRatePlanDetail {
  /**
   * 早餐，0无早，1单早，2双早，3三早，4四早，9多早
   */
  breakfast?: string
  /**
   * 取消规则
   */
  cancelRule?: CancelRule
  /**
   * 钟点房规则
   * 第一版没有重点房
   */
  hourRule?: string
  /**
   * rp id
   */
  id?: string
  /**
   * room id
   */
  b2bRoomTypeId?: number
  /**
   * rp类型
   */
  ratePlanType?: number
  [property: string]: any
}

export interface HotelDetailRes {
  /**
   * b2b酒店 ID
   */
  b2bHotelId?: number
  /**
   * 预订须知设施
   */
  bookingNoticeFacilities?: Facility[]
  /**
   * 通用设施
   */
  generalFacilities?: Facility[]
  /**
   * 酒店详情
   */
  hotelDetail?: HotelDetail
  /**
   * 酒店图片
   */
  hotelImages?: HotelImages[]
  /**
   * 房型图片
   */
  roomImages?: RoomImages[]
  /**
   * 房型详情
   */
  roomTypeDetails?: RoomTypeDetail[]
  /**
   * 服务设施
   */
  serviceFacilities?: Facility[]
  [property: string]: any
}

export interface RatePlanQuoteQuery {
  b2bHotelId: string
  /**
   * B2B房型 ID 集合
   */
  b2bRoomTypeId: number[]
  startDate: string
  endDate: string
}
