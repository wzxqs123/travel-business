/**
 * 账单导出记录 VO
 *
 * BillExportRecordVO
 */
export interface BillExportRecordVO {
  /**
   * 账单金额
   */
  amount?: number
  /**
   * 账单号
   */
  billNo?: string
  /**
   * 下载地址
   */
  downloadUrl?: string
  /**
   * 导出状态
   */
  exportState?: ExportState
  /**
   * 文件拓展名
   */
  fileExtName?: string
  /**
   * 文件名
   */
  fileName?: string
  /**
   * 导出记录 ID
   */
  id?: number
  createTime: string
  /**
   * 操作人
   */
  operator?: string
  [property: string]: any
}

/**
 * 导出状态
 */
export enum ExportState {
  /**
   * 导出失败
   */
  Failed = 'FAILED',
  /**
   * 导出中
   */
  Pending = 'PENDING',
  /**
   * 导出完成
   */
  Succeed = 'SUCCEED',
}
