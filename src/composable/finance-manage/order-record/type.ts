/*
 * @Author: Czy
 * @Date: 2025-05-08 16:38:14
 * @FilePath: /one-stack-app/apps/thi-erp-platform-app/src/composable/b2b/finance-manage/order-record/type.ts
 *
 */
/**
 * BillDetailVO
 */
export interface BillDetailVO {
  /**
   * 调账金额
   */
  adjustmentAmount?: number
  /**
   * 结算金额
   */
  billedAmount?: number
  /**
   * 账单状态
   */
  billState?: BillState
  /**
   * 账单类型
   */
  billType?: BillType
  /**
   * 企业 ID
   */
  companyId?: number
  /**
   * 账单号
   */
  no?: string
  /**
   * 账期结束时间
   */
  periodEndTime?: string
  /**
   * 账期开始时间
   */
  periodStartTime?: string
  /**
   * 结算周期
   */
  periodType?: string
  /**
   * 退款金额
   */
  refundAmount?: number
  [property: string]: any
}

/**
 * 账单状态
 */
export enum BillState {
  Billed = 'BILLED',
  Paid = 'PAID',
  Pending = 'PENDING',
  Settled = 'SETTLED',
}

/**
 * 账单类型
 */
export enum BillType {
  HotelOrder = 'HOTEL_ORDER',
}

/**
 * ReconciliationOrderVO
 */
export interface ReconciliationOrderVO {
  /**
   * 订单金额
   */
  amount?: number
  /**
   * 订单状态
   */
  bizStatus?: BizStatus
  /**
   * 入离时间
   */
  checkInOut?: { [key: string]: any }
  /**
   * 入住人
   */
  guestName?: string
  /**
   * 酒店信息
   */
  hotel?: HotelSimpleVO
  /**
   * 订单 ID
   */
  orderId?: number
  /**
   * 退款金额
   */
  refundAmount?: number
  /**
   * 房型信息
   */
  roomType?: RoomTypeSimpleVO
  [property: string]: any
}

/**
 * 订单状态
 */
export enum BizStatus {
  Booking = 'BOOKING',
  Canceled = 'CANCELED',
  Canceling = 'CANCELING',
  Confirmed = 'CONFIRMED',
  Finished = 'FINISHED',
}

/**
 * 酒店信息
 *
 * HotelSimpleVO
 */
export interface HotelSimpleVO {
  /**
   * 酒店 ID
   */
  hotelId?: string
  /**
   * 酒店名称
   */
  hotelName?: string
  /**
   * 酒店平台
   */
  platform?: string
  [property: string]: any
}

/**
 * 房型信息
 *
 * RoomTypeSimpleVO
 */
export interface RoomTypeSimpleVO {
  /**
   * 平台
   */
  platform?: string
  /**
   * 房型 ID
   */
  roomTypeId?: string
  /**
   * 房型名称
   */
  roomTypeName?: string
  [property: string]: any
}

/**
 * 调账列表项 VO
 *
 * AdjustmentVO
 */
export interface AdjustmentVO {
  /**
   * 调账金额
   */
  adjustmentAmount?: number
  /**
   * 调账状态
   */
  adjustmentState?: AdjustmentState
  /**
   * 调账类型
   */
  adjustmentType?: AdjustmentType
  /**
   * 账单号
   */
  billNo?: string
  /**
   * 酒店
   */
  hotel?: HotelSimpleVO
  /**
   * 调账单 ID
   */
  id?: number
  /**
   * 订单 ID
   */
  orderId?: number
  /**
   * 原因
   */
  reason?: string
  /**
   * 备注
   */
  remark?: string
  [property: string]: any
}

/**
 * 调账状态
 */
export enum AdjustmentState {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Finished = 'FINISHED',
  Pending = 'PENDING',
}

/**
 * 调账类型
 */
export enum AdjustmentType {
  HotelOrder = 'HOTEL_ORDER',
}

/**
 * 酒店
 *
 * HotelSimpleVO
 */
