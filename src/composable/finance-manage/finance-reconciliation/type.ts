export type BillPageType = 'home' | 'download' | 'detail'

export interface ReconciliationDetailVO {
  /**
   * 待对账金额
   */
  billedAmount: number
  /**
   * 待确认金额
   */
  paidAmount: number
  /**
   * 待出账金额
   */
  pendingAmount: number
  /**
   * 已结算金额
   */
  settledAmount: number
}

export interface BillListParams {
  /**
   * 账单号
   */
  billNo?: string
  /**
   * 账单状态
   * PENDING
   * BILLED
   * PAID
   * SETTLED
   */
  state?: string
  periodStartTime?: string
  periodEndTime?: string
}

export interface BillSimpleVO {
  /**
   * 账单金额
   */
  amount?: number
  /**
   * 状态
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
   * 企业名称
   */
  companyName?: string
  /**
   * 账单号
   */
  no?: string
  /**
   * 账期结束时间
   */
  periodEndDate?: string
  /**
   * 账期开始时间
   */
  periodStartDate?: string
  /**
   * 结算周期
   */
  periodType?: string
  [property: string]: any
}

/**
 * 状态
 */
export enum BillState {
  /**
   * 待对账
   */
  Billed = 'BILLED',
  /**
   * 已付款
   */
  Paid = 'PAID',
  /**
   * 待出账
   */
  Pending = 'PENDING',
  /**
   * 已结算
   */
  Settled = 'SETTLED',
}

/**
 * 账单类型
 */
export enum BillType {
  HotelOrder = 'HOTEL_ORDER',
}
