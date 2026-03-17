/**
 * 公司调整余额记录 VO
 *
 * CompanyBalanceRecordVO
 */
export interface CompanyBalanceRecordVO {
  /**
   * 调整金额
   */
  adjustAmount?: number;
  /**
   * 调整日期
   */
  adjustDate?: string;
  /**
   * 调整类型(ADD:充值,SUB:扣减) 字典：ERP_COMPANY_ADJUST_TYPE
   */
  adjustType?: AdjustType;
  /**
   * 调整后金额
   */
  finalAmount?: number;
  /**
   * 唯一 公司ID
   */
  id?: string;
  /**
   * 操作人
   */
  operatorName?: string;
  /**
   * 操作时间
   */
  operatorTime?: string;
  [property: string]: any;
}

/**
* 调整类型(ADD:充值,SUB:扣减) 字典：ERP_COMPANY_ADJUST_TYPE
*/
export enum AdjustType {
  Add = "ADD",
  Sub = "SUB",
}